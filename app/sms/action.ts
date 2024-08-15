'use server';

import validator from 'validator';
import { z } from 'zod';
import { redirect } from 'next/navigation';

import { mockServerWait } from '@/libs/utils';
import { TOKEN_MAX, TOKEN_MIN } from '@/libs/constants';

const phoneScheme = z
  .string()
  .trim()
  .refine((phone: string) => validator.isMobilePhone(phone, 'ko-KR'), {
    message: 'Wrong phone format!',
    path: ['phone'],
  });

const tokenScheme = z.coerce.number().min(TOKEN_MIN).max(TOKEN_MAX);

const smsLoginScheme = z.object({ phone: phoneScheme, token: tokenScheme });

type SmsLoginForm = z.infer<typeof smsLoginScheme>;

const loginSms = async (
  prevData: SmsLoginForm & { isValidPhone: boolean },
  formData: FormData,
) => {
  await mockServerWait();

  const phoneValidation = phoneScheme.safeParse(formData.get('phone'));

  if (prevData.isValidPhone) {
    const tokenValidation = tokenScheme.safeParse(formData.get('token'));

    if (tokenValidation.success) {
      return redirect('/');
    } else {
      return prevData;
    }
  }

  if (phoneValidation.success) {
    return { isValidPhone: true };
  } else {
    return {
      isValidPhone: false,
      errors: phoneValidation.error.flatten().fieldErrors,
    };
  }
};

export default loginSms;
export type { SmsLoginForm };
