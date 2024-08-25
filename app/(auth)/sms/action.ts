'use server';

import validator from 'validator';
import crypto from 'crypto';
import { z } from 'zod';
import { redirect } from 'next/navigation';

import { TOKEN_MAX, TOKEN_MIN } from '@/libs/constants';
import db from '@/libs/db';
import { updateSession } from '@/libs/session';
import { sendSmsMessage } from '@/libs/sms';

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

const refineTokne = async (token: number) => {
  const exist = await db.sMSToken.findUnique({
    where: {
      token: String(token),
    },
    select: {
      id: true,
    },
  });

  return !!exist;
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
  })
  .refine(refineTokne, {
    message: 'This token does not exist!',
    path: ['token'],
  });

const smsLoginScheme = z.object({ phone: phoneScheme, token: tokenScheme });

type SmsLoginForm = z.infer<typeof smsLoginScheme>;

const loginSms = async (
  prevData: SmsLoginForm & { isValidPhone: boolean },
  formData: FormData,
) => {
  if (prevData.isValidPhone) {
    const tokenValidation = await tokenScheme.safeParseAsync(
      formData.get('token'),
    );

    if (tokenValidation.success) {
      const smsToken = await db.sMSToken.findUnique({
        where: {
          token: String(tokenValidation.data),
          phone: prevData.phone,
        },
        select: {
          id: true,
          userId: true,
        },
      });

      if (smsToken) {
        updateSession(smsToken.userId);
        await db.sMSToken.delete({ where: { id: smsToken.id } });
      }

      return redirect('/');
    } else {
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
        phone: phoneValidation.data,
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

    sendSmsMessage(token);

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
