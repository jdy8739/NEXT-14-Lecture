'use client';

import { MessageType } from '@/app/(tabs)/chats/[id]/page';
import { formatToTimeAgo } from '@/libs/utils';
import { ArrowUpCircleIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  initalMessages: MessageType;
  sessionId: number;
};

const MessageList = ({ initalMessages, sessionId }: Props) => {
  const [messages, setMessages] = useState(initalMessages);

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        {messages.map((message) => {
          const isMyMessage = message.userId === sessionId;

          return (
            <div key={message.id}>
              {isMyMessage ? (
                <div className="flex flex-col items-end">
                  <div className="mb-2 flex items-center">
                    <p className="p-2 bg-orange-500 rounded-md">
                      {message.payload}
                    </p>
                  </div>
                  <div className="text-sm">
                    {formatToTimeAgo(new Date(message.created_at).getTime())}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-2 flex items-center">
                    <div className="size-12 mr-2 relative rounded-full overflow-hidden bg-neutral-500">
                      {message.user.avatar && (
                        <Image
                          src={message.user.avatar}
                          alt={message.user.username}
                          fill
                        />
                      )}
                    </div>
                    <p className="p-2 bg-neutral-500 rounded-md">
                      {message.payload}
                    </p>
                  </div>
                  <div className="text-sm">
                    {formatToTimeAgo(new Date(message.created_at).getTime())}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="relative">
        <form>
          <input className="w-full h-9 p-2 pr-8 rounded-full bg-neutral-800 ring-2 ring-neutral-100 outline-none" />
          <button className="absolute top-[2.5px] right-[2.5px]">
            <ArrowUpCircleIcon className="size-8 text-orange-500" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageList;
