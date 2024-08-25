'use server';

import validator from 'validator';
import crypto from 'crypto';
import { z } from 'zod';
import { redirect } from 'next/navigation';

import { mockServerWait } from '@/libs/utils';
import { TOKEN_MAX, TOKEN_MIN } from '@/libs/constants';
import db from '@/libs/db';

const getToken = async (): Promise<string> => {
  const token = String(crypto.randomInt(100000, 999999));

  const exist = await db.sMSToken.findUnique({
    where: {
      token: token,
    },
    select: {
      id: true,
    },
  });

  if (exist) {
    return await getToken();
  }

  return token;
};

const phoneScheme = z
  .string()
  .trim()
  .refine((phone: string) => validator.isMobilePhone(phone, 'ko-KR'), {
    message: 'Wrong phone format!',
    path: ['phone'],
  });

const tokenScheme = z.coerce
  .number()
  .refine((value) => value > TOKEN_MIN, {
    message: `token must be bigger than ${TOKEN_MIN}`,
    path: ['token'],
  })
  .refine((value) => value < TOKEN_MAX, {
    message: `token must be smaller than ${TOKEN_MAX}`,
    path: ['token'],
  });

const smsLoginScheme = z.object({ phone: phoneScheme, token: tokenScheme });

type SmsLoginForm = z.infer<typeof smsLoginScheme>;

const loginSms = async (
  prevData: SmsLoginForm & { isValidPhone: boolean },
  formData: FormData,
) => {
  await mockServerWait();

  if (prevData.isValidPhone) {
    const tokenValidation = tokenScheme.safeParse(formData.get('token'));

    if (tokenValidation.success) {
      return redirect('/');
    } else {
      console.log(tokenValidation.error.flatten());
      return {
        ...prevData,
        errors: tokenValidation.error.flatten().fieldErrors,
      };
    }
  }

  const phoneValidation = phoneScheme.safeParse(formData.get('phone'));

  if (phoneValidation.success) {
    await db.sMSToken.deleteMany({
      where: {
        user: {
          phone: phoneValidation.data,
        },
      },
    });

    const token = await getToken();

    await db.sMSToken.create({
      data: {
        token,
        user: {
          connectOrCreate: {
            where: {
              phone: phoneValidation.data,
            },
            create: {
              username: crypto.randomBytes(10).toString('hex'),
              phone: phoneValidation.data,
            },
          },
        },
      },
    });

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
