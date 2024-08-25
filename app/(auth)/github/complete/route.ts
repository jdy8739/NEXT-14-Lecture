import db from '@/libs/db';
import { updateSession } from '@/libs/session';
import { notFound, redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const fetchUserData = async <T>({
  accessToken,
  endPoint = '',
}: {
  accessToken: string;
  endPoint?: string;
}) => {
  const userData = await (
    await fetch(`https://api.github.com/user${endPoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).json();

  return userData as T;
};

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

  const { login, id, avatar_url } = await fetchUserData<{
    login: string;
    id: number;
    avatar_url: string;
  }>({ accessToken: accessTokenResponse.access_token });

  const emailAddresses = await fetchUserData<
    [
      {
        email: string;
      },
    ]
  >({ accessToken: accessTokenResponse.access_token, endPoint: '/emails' });

  const user = await db.user.findFirst({
    where: {
      OR: [{ github_id: String(id) }, { email: emailAddresses[0].email }],
    },
    select: {
      id: true,
    },
  });

  if (user) {
    await updateSession(user!.id);
  } else {
    const newUser = await db.user.create({
      data: {
        username: `gh-${login}`,
        github_id: String(id),
        avatar: avatar_url,
        email: emailAddresses[0].email,
      },
      select: {
        id: true,
      },
    });

    await updateSession(newUser!.id);
  }

  return redirect('/profile');
};
