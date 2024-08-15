'use server';

import { z } from 'zod';

const BASIC_PARAMS = {
  required_error: 'This field is required.',
  invalid_type_error: 'This field must be string',
} as const;

const refineUsername = (userName: string) => !userName.includes('admin');

const refinePasswordConfirm = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => password === passwordConfirm;

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/;

const createAccountFormScheme = z
  .object({
    userName: z
      .string(BASIC_PARAMS)
      .min(3, 'User name must be longer than 2')
      .max(10, 'User name must be shorter than 11')
      .refine(refineUsername, {
        message: 'User name cannot include word admin',
      }),
    email: z
      .string(BASIC_PARAMS)
      .email({ message: 'email must be form of an email' }),
    password: z
      .string(BASIC_PARAMS)
      .min(10)
      .regex(
        passwordRegex,
        'Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-',
      ),
    passwordConfirm: z.string(BASIC_PARAMS).min(10),
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
