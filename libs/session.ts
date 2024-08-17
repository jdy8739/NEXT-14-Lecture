import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const getSession = async () => {
  const session = await getIronSession<{ id: number }>(cookies(), {
    cookieName: 'delicious-cookie',
    password: process.env.COOKIE_PASSWORD!,
  });

  return session;
};
