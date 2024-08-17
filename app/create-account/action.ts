'use server';

import { z } from 'zod';

import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
  USERNAME_MAX,
  USERNAME_MIN,
  BASIC_CREATE_ACCOUNT_FORM_PARAMS,
} from '@/libs/constants';
import { mockServerWait } from '@/libs/utils';
import db from '@/libs/db';

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

  return !user;
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

  return !user;
};

const createAccountFormScheme = z
  .object({
    userName: z
      .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
      .min(USERNAME_MIN, 'User name must be longer than 2')
      .max(USERNAME_MAX, 'User name must be shorter than 11')
      .refine(refineUsername, {
        message: 'User name cannot include word admin',
      })
      .refine(refineUniqueUserName, { message: 'duplicate username!' }),
    email: z
      .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
      .toLowerCase()
      .email({ message: 'email must be form of an email' })
      .refine(refineUniqueEmail, { message: 'duplicate email!' }),
    password: z
      .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
      .min(USERNAME_MIN)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE),
    passwordConfirm: z
      .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
      .min(USERNAME_MIN),
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
    return {
      /** data in result exists only when success case happens */
      ...validationResult.data,
    };
  }

  return {
    ...data,
    errors: validationResult.error?.flatten().fieldErrors,
  };
};

export { createAccount };
export type { CreateAccountForm };