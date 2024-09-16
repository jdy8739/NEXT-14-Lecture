'use server';

import db from '@/libs/db';
import { getSession } from '@/libs/session';
import { revalidateTag } from 'next/cache';

export const likePost = async (postID: number) => {
  const session = await getSession();

  try {
    await db.like.create({
      data: {
        postId: postID,
        userId: session.id,
      },
    });
  } finally {
    revalidateTag(`post-like-${postID}`);
  }
};

export const dislikePost = async (postID: number) => {
  const session = await getSession();

  try {
    await db.like.delete({
      where: {
        id: {
          postId: postID,
          userId: session.id,
        },
      },
    });
  } finally {
    revalidateTag(`post-like-${postID}`);
  }
};
