'use client';

import { dislikePost, likePost } from '@/app/posts/[id]/action';
import { HandThumbUpIcon } from '@heroicons/react/16/solid';
import { HandThumbUpIcon as HandThumbUpIconOutline } from '@heroicons/react/24/outline';
import { useOptimistic } from 'react';

type LikeStatus = {
  isLiked: boolean;
  likeCount: number;
};

const LikeButton = ({
  isLiked,
  likeCount,
  postId,
}: LikeStatus & { postId: number }) => {
  const [state, reducer] = useOptimistic(
    { isLiked, likeCount },
    (prev: LikeStatus, payload: string) => {
      console.log(`This is the payload of reducer: ${payload}`);

      return {
        isLiked: !prev.isLiked,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      };
    },
  );

  return (
    <>
      {state.isLiked ? (
        <button
          className="p-3 flex items-center gap-2 rounded-full bg-orange-500 text-neutral-50"
          onClick={() => {
            reducer('payload!!!');
            dislikePost(postId);
          }}
        >
          <HandThumbUpIcon className="size-6" />
          <span>({state.likeCount})</span>
        </button>
      ) : (
        <button
          className="p-3 ring-1 ring-neutral-400 flex items-center gap-2 rounded-full"
          onClick={() => {
            reducer('payload!!!');
            likePost(postId);
          }}
        >
          <HandThumbUpIconOutline className="size-6" />
          <span>공감하기 ({state.likeCount})</span>
        </button>
      )}
    </>
  );
};

export default LikeButton;
