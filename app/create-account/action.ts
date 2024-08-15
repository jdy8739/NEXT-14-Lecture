'use server';

import { z } from 'zod';

import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
  USERNAME_MAX,
  USERNAME_MIN,
  BASIC_CREATE_ACCOUNT_FORM_PARAMS,
} from '@/libs/constants';

const refineUsername = (userName: string) => !userName.includes('admin');

const refinePasswordConfirm = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => password === passwordConfirm;

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
      .email({ message: 'email must be form of an email' }),
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

const mockServerWait = () =>
  new Promise((resolve) => setTimeout(resolve, 1500));

const createAccount = async (
  prevData: CreateAccountForm,
  formData: FormData,
) => {
  await mockServerWait();

  const data = Object.keys(prevData).reduce(
    (a, b) => ({ ...a, [b]: formData.get(b) }),
    {},
  );

  const validationResult = createAccountFormScheme.safeParse(data);

  return {
    ...data,
    errors: validationResult.error?.flatten().fieldErrors,
  };
};

export { createAccount };
export type { CreateAccountForm };
