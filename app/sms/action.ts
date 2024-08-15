'use server';

import validator from 'validator';
import { z } from 'zod';

import { mockServerWait } from '@/libs/utils';
import { TOKEN_MAX, TOKEN_MIN } from '@/libs/constants';

const smsLoginScheme = z.object({
  phone: z.string().trim().refine(validator.isMobilePhone),
  token: z.coerce.number().min(TOKEN_MIN).max(TOKEN_MAX).nullable(),
});

type SmsLoginForm = z.infer<typeof smsLoginScheme>;

const loginSms = async (prevData: SmsLoginForm, formData: FormData) => {
  await mockServerWait();

  const data = Object.keys(prevData).reduce(
    (a, b) => ({ ...a, [b]: formData.get(b) }),
    {},
  );

  const validationResult = smsLoginScheme.safeParse(data);

  return {
    ...data,
    errors: validationResult.error?.flatten().fieldErrors,
  };
};

export default loginSms;
export type { SmsLoginForm };
