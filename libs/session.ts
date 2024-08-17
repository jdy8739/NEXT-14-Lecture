import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const createSession = async () => {
  const cookie = await getIronSession<{ id: number }>(cookies(), {
    cookieName: 'delicious-cookie',
    password: process.env.COOKIE_PASSWORD!, // ! means it does exist
  });

  return cookie;
};
