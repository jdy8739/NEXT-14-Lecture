'use client';

import { saveMessage } from '@/app/(tabs)/chats/[id]/action';
import { MessageType } from '@/app/(tabs)/chats/[id]/page';
import { formatToTimeAgo } from '@/libs/utils';
import { ArrowUpCircleIcon } from '@heroicons/react/16/solid';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  initalMessages: MessageType;
  sessionId: number;
  chatroomId: string;
  userAvatar: string | null;
  username: string;
  roomOwnerId: number;
  roomOwnerAvatar: string | null;
  roomOwnerName: string;
};

const MessageList = ({
  initalMessages,
  sessionId,
  chatroomId,
  userAvatar,
  username,
  roomOwnerId,
  roomOwnerAvatar,
  roomOwnerName,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const channelRef = useRef<unknown>(null);

  const [messages, setMessages] = useState(initalMessages);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const payload = inputRef.current!.value;

      if (payload) {
        const now = new Date(Date.now() - 100);

        setMessages((prevMessages) => {
          return [
            ...prevMessages,
            {
              id: Math.random(),
              payload,
              created_at: now,
              updated_at: now,
              chatRoomId: chatroomId,
              userId: sessionId,
              user: {
                id: sessionId,
                username,
                avatar: userAvatar,
              },
            },
          ];
        });

        const channel: RealtimeChannel = channelRef.current as RealtimeChannel;

        channel.send({
          type: 'broadcast',
          event: 'message',
          payload: { payload },
        });

        await saveMessage(payload, chatroomId);

        inputRef.current!.value = '';
      }
    },
    [chatroomId, sessionId, userAvatar, username],
  );

  useEffect(() => {
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    );

    channelRef.current = supabaseClient.channel(`room-${chatroomId}`);

    const channel: RealtimeChannel = channelRef.current as RealtimeChannel;

    channel
      .on('broadcast', { event: 'message' }, ({ payload: { payload } }) => {
        const now = new Date(Date.now() - 100);

        setMessages((prevMessages) => {
          return [
            ...prevMessages,
            {
              id: Math.random(),
              payload,
              created_at: now,
              updated_at: now,
              chatRoomId: chatroomId,
              userId: roomOwnerId,
              user: {
                id: roomOwnerId,
                username: roomOwnerName,
                avatar: roomOwnerAvatar,
              },
            },
          ];
        });
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [chatroomId, roomOwnerId, roomOwnerAvatar, roomOwnerName, sessionId]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-2">
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
        <form onSubmit={onSubmit}>
          <input
            className="w-full h-9 p-2 pr-8 rounded-full bg-neutral-800 ring-2 ring-neutral-100 outline-none"
            ref={inputRef}
          />
          <button className="absolute top-[2.5px] right-[2.5px]">
            <ArrowUpCircleIcon className="size-8 text-orange-500" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageList;
