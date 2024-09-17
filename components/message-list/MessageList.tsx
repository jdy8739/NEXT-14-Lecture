'use client';

import { MessageType } from '@/app/(tabs)/chats/[id]/page';
import { formatToTimeAgo } from '@/libs/utils';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  initalMessages: MessageType;
  sessionId: number;
};

const MessageList = ({ initalMessages, sessionId }: Props) => {
  const [messages, setMessages] = useState(initalMessages);

  return (
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
  );
};

export default MessageList;
