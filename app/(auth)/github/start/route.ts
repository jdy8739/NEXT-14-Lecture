import { NextResponse } from 'next/server';

export const GET = () => {
  const baseURL = 'https://github.com/login/oauth/authorize';

  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    allow_signup: 'true',
    scope: 'read:user,user:email',
  };

  const formattedParams = new URLSearchParams(params).toString();

  const finalURL = `${baseURL}?${formattedParams}`;

  return Response.redirect(finalURL);
};
