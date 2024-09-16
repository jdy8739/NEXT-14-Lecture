import db from '@/libs/db';
import { formatToTimeAgo, mockServerWait } from '@/libs/utils';
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import Link from 'next/link';

const getPosts = async () => {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  return posts;
};

export const metadata: Metadata = {
  title: 'Town Life',
};

const LifePage = async () => {
  await mockServerWait();

  const posts = await getPosts();

  return (
    <div>
      <div className="h-[300vh] relative">
        {posts.map((post) => {
          return (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block border-b-2 border-neutral-700 last:border-none"
            >
              <div className="p-4 h-28 flex flex-col gap-2">
                <div className="w-16 h-4">{post.title}</div>
                <div className="w-32 h-4">{post.description}</div>
                <div className="flex justify-between *:h-4 *:flex *:gap-2">
                  <div>
                    <span>
                      {formatToTimeAgo(new Date(post.created_at).getTime())}
                    </span>
                    <span>*</span>
                    <span>조회 {post.views}</span>
                  </div>
                  <div className="*:w-12 *:flex *:items-center">
                    <span>
                      <HandThumbUpIcon className="size-4 mr-2" />
                      {post._count.likes}
                    </span>
                    <span>
                      <ChatBubbleBottomCenterIcon className="size-4 mr-2" />
                      {post._count.comments}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LifePage;
