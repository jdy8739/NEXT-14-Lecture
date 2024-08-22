import { IronSession, getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const getSession = async () => {
  const session = await getIronSession<{ id: number }>(cookies(), {
    cookieName: 'delicious-cookie',
    password: process.env.COOKIE_PASSWORD!,
  });

  return session;
};

export const saveSession = async (
  session: IronSession<{ id: number }>,
  id: number,
) => {
  session.id = id;
  await session.save();
};

export const updateSession = async (id: number) => {
  const session = await getSession();
  await saveSession(session, id);
};

export const clearSession = async () => {
  const session = await getSession();
  session.destroy();
};
