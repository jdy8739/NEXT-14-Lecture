'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';

import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
  USERNAME_MAX,
  USERNAME_MIN,
  BASIC_CREATE_ACCOUNT_FORM_PARAMS,
} from '@/libs/constants';

import db from '@/libs/db';
import { mockServerWait } from '@/libs/utils';
import { createSession } from '@/libs/session';

import { redirect } from 'next/navigation';

const refineUsername = (userName: string) => !userName.includes('admin');

const refinePasswordConfirm = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => password === passwordConfirm;

const refineUniqueUserName = async (userName: string) => {
  const user = await db.user.findUnique({
    where: {
      username: userName,
    },
    select: {
      id: true,
    },
  });

  return !!user?.id;
};

const refineUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !!user?.id;
};

const createAccountFormScheme = z
  .object({
    userName: z
      .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
      .min(USERNAME_MIN, 'User name must be longer than 2')
      .max(USERNAME_MAX, 'User name must be shorter than 11')
      .refine(refineUsername, {
        message: 'User name cannot include word admin',
      }),
    email: z
      .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
      .toLowerCase()
      .email({ message: 'email must be form of an email' }),
    password: z
      .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
      .min(USERNAME_MIN)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE),
    passwordConfirm: z
      .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
      .min(USERNAME_MIN),
  })
  .superRefine(async ({ userName }, ctx) => {
    const userExists = await refineUniqueUserName(userName);

    if (userExists) {
      ctx.addIssue({
        code: 'custom',
        path: ['userName'],
        message: 'duplicate username!',
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const userExists = await refineUniqueEmail(email);

    if (userExists) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'duplicate email!',
        fatal: true,
      });
    }
  })
  .refine(refinePasswordConfirm, {
    message: 'password confirm must be same with password',
    path: ['passwordConfirm'],
  });

type CreateAccountForm = z.infer<typeof createAccountFormScheme>;

const createAccount = async (
  prevData: CreateAccountForm,
  formData: FormData,
) => {
  await mockServerWait();

  const data: Record<string, unknown> = Object.keys(prevData).reduce(
    (a, b) => ({ ...a, [b]: formData.get(b) }),
    {},
  );

  const validationResult = await createAccountFormScheme.safeParseAsync(data);

  if (validationResult.success) {
    const hashedPassword = await bcrypt.hash(
      validationResult.data.password,
      12,
    );

    /** data in result exists only when success case happens */
    const createdUser = await db.user.create({
      data: {
        username: validationResult.data.userName,
        email: validationResult.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const cookie = await createSession();

    cookie.id = createdUser.id;
    await cookie.save();

    redirect('/home');
  }

  return {
    ...data,
    errors: validationResult.error?.flatten().fieldErrors,
  };
};

export { createAccount };
export type { CreateAccountForm };
