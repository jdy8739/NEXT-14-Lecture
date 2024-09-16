import db from '@/libs/db';
import { formatToTimeAgo } from '@/libs/utils';
import { HandThumbUpIcon } from '@heroicons/react/16/solid';
import { EyeIcon } from '@heroicons/react/24/solid';
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
            likes: true,
          },
        },
      },
    });

    return post;
  } catch (e) {
    return null;
  }
};

const PostDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const numberID = Number(id);

  if (isNaN(numberID)) {
    notFound();
  }

  const post = await getPost(numberID);

  if (!post) {
    notFound();
  }

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
      <div className="*:text-neutral-500">
        <button className="p-3 ring-1 ring-neutral-400 flex items-center gap-2 rounded-full">
          <HandThumbUpIcon className="size-6" />
          <span>공감하기 ({post._count.likes})</span>
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
