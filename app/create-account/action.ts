'use server';

import { z } from 'zod';

const createAccountFormScheme = z.object({
  userName: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(10),
  passwordConfirm: z.string().min(10),
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
