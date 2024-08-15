'use server';

import { z } from 'zod';

import {
  BASIC_CREATE_ACCOUNT_FORM_PARAMS,
  PASSWORD_MIN,
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
} from '@/libs/constants';
import { mockServerWait } from '@/libs/utils';

const loginScheme = z.object({
  email: z.string(BASIC_CREATE_ACCOUNT_FORM_PARAMS).email(),
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

  const validationResult = loginScheme.safeParse(data);

  return {
    ...data,
    errors: validationResult.error?.flatten().fieldErrors,
  };
};

export { handleAction };
export type { LoginForm };
