import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    //
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
    })
  ).json();

  if ('error' in accessTokenResponse) {
    return new Response(null, { status: 400 });
  }

  return Response.json({ accessTokenResponse });
};
