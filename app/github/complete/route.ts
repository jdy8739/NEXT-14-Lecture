import db from '@/libs/db';
import { getSession } from '@/libs/session';
import { notFound, redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    notFound();
  }

  const accessTokenURL = 'https://github.com/login/oauth/access_token';

  const accessTokenParams = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code: code!,
  };

  const formattedAccessTokenParams = new URLSearchParams(
    accessTokenParams,
  ).toString();

  const finalURL = `${accessTokenURL}?${formattedAccessTokenParams}`;

  const accessTokenResponse = await (
    await fetch(finalURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-cache',
    })
  ).json();

  if ('error' in accessTokenResponse) {
    return new Response(null, { status: 400 });
  }

  const { login, id, avatar_url } = await (
    await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    })
  ).json();

  const user = await db.user.findUnique({
    where: {
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });

  if (user) {
    const session = await getSession();
    session.id = user!.id;
    await session.save();
  } else {
    const newUser = await db.user.create({
      data: {
        username: `gh-${login}`,
        github_id: String(id),
        avatar: avatar_url,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = newUser!.id;
    await session.save();
  }

  return redirect('/profile');
};
