import db from '@/libs/db';
import { getSession } from '@/libs/session';
import { notFound, redirect } from 'next/navigation';

const getUser = async () => {
  'use server';

  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (user) {
      return user;
    }
  }

  notFound();
};

const logout = async () => {
  'use server';

  const session = await getSession();

  session.destroy();

  redirect('/');
};

const ProfilePage = async () => {
  const user = await getUser();

  return (
    <>
      <h1>Welcome to Profile {user.username}</h1>
      <form action={logout}>
        <button>log out</button>
      </form>
    </>
  );
};

export default ProfilePage;
