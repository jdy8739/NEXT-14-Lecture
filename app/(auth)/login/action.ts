'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';

import {
  BASIC_CREATE_ACCOUNT_FORM_PARAMS,
  PASSWORD_MIN,
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
} from '@/libs/constants';
import db from '@/libs/db';
import { mockServerWait } from '@/libs/utils';
import { updateSession } from '@/libs/session';
import { redirect } from 'next/navigation';

const refineEmail = async (email: string) => {
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

const loginScheme = z.object({
  email: z
    .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
    .email()
    .refine(refineEmail, { message: 'no registered email found!' }),
  password: z
    .string(BASIC_CREATE_ACCOUNT_FORM_PARAMS)
    .min(PASSWORD_MIN)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE),
});

type LoginForm = z.infer<typeof loginScheme>;

const handleAction = async (prevData: LoginForm, formData: FormData) => {
  await mockServerWait();

  const data = Object.keys(prevData).reduce(
    (a, b) => ({ ...a, [b]: formData.get(b) }),
    {},
  );

  const validationResult = await loginScheme.safeParseAsync(data);

  if (validationResult.success) {
    const user = await db.user.findUnique({
      where: {
        email: validationResult.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const passwordIdentical = await bcrypt.compare(
      validationResult.data.password,
      user?.password || '',
    );

    if (passwordIdentical) {
      updateSession(user!.id);

      redirect('/profile');
    } else {
      return {
        ...validationResult.data,
        errors: {
          password: ['password does not match!'],
        },
      };
    }
  }

  return {
    ...data,
    errors: validationResult.error?.flatten().fieldErrors,
  };
};

export { handleAction };
export type { LoginForm };
