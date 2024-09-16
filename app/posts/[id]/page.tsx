import nextCache from '@/libs/cache';
import db from '@/libs/db';
import { getSession } from '@/libs/session';
import { formatToTimeAgo } from '@/libs/utils';
import { HandThumbUpIcon } from '@heroicons/react/16/solid';
import { HandThumbUpIcon as HandThumbUpIconOutline } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';
import { revalidateTag } from 'next/cache';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const getPost = async (id: number) => {
  try {
    const post = db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return post;
  } catch (e) {
    return null;
  }
};

const getLikeStatus = async (postId: number, userId: number) => {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });

  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });

  return {
    isLiked: !!isLiked,
    likeCount,
  };
};

const getCachedPostDetail = nextCache(getPost, ['post-detail'], {
  tags: ['post-detail'],
});

const getCachedLikeStatus = (
  postId: number,
  userId: number,
): Promise<{
  isLiked: boolean;
  likeCount: number;
}> => {
  const cacheLikeStatus = nextCache(getLikeStatus, ['post-like-status'], {
    tags: [`post-like-${postId}`],
  });

  return cacheLikeStatus(postId, userId);
};

const PostDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const postID = Number(id);

  if (isNaN(postID)) {
    notFound();
  }

  const post = await getCachedPostDetail(postID);

  if (!post) {
    notFound();
  }

  const session = await getSession();

  const { isLiked, likeCount } = await getCachedLikeStatus(postID, session.id);

  const likePost = async () => {
    'use server';

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

  const dislikePost = async () => {
    'use server';

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

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="size-12 relative rounded-full overflow-hidden">
          {post.user.avatar && (
            <Image src={post.user.avatar} alt={post.user.username} fill />
          )}
        </div>
        <div>
          <div>{post.user.username}</div>
          <div>{formatToTimeAgo(new Date(post.created_at).getTime())}</div>
        </div>
      </div>
      <div>
        <p className="text-lg font-extrabold">{post.description}</p>
      </div>
      <div className="flex items-center gap-2 *:text-neutral-400">
        <EyeIcon className="size-6 inline-block" />
        <span>조회 {post.views}</span>
      </div>
      <div className="*:text-neutral-400">
        <form action={isLiked ? dislikePost : likePost}>
          {isLiked ? (
            <button className="p-3 flex items-center gap-2 rounded-full bg-orange-500 text-neutral-50">
              <HandThumbUpIcon className="size-6" />
              <span>({likeCount})</span>
            </button>
          ) : (
            <button className="p-3 ring-1 ring-neutral-400 flex items-center gap-2 rounded-full">
              <HandThumbUpIconOutline className="size-6" />
              <span>공감하기 ({likeCount})</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
