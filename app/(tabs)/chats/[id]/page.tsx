import MessageList from '@/components/message-list/MessageList';
import db from '@/libs/db';
import { getSession } from '@/libs/session';
import { Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';

const getRoom = async (id: string) => {
  const chatroom = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      },
    },
  });

  return chatroom;
};

const getMessages = async (chatRoomId: string) => {
  const messages = await db.message.findMany({
    where: {
      chatRoomId,
    },
    include: {
      user: {
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      },
    },
  });

  return messages;
};

type MessageType = Prisma.PromiseReturnType<typeof getMessages>;

const ChatRoomPage = async ({ params: { id } }: { params: { id: string } }) => {
  const chatroom = await getRoom(id);

  if (!chatroom) {
    notFound();
  }

  const session = await getSession();

  if (!chatroom.users.some((user) => user.id === session.id)) {
    notFound();
  }

  const messages = await getMessages(id);

  const userData = chatroom.users.find((user) => user.id === session.id);

  const roomOwnerData = chatroom.users.find((user) => user.id !== session.id);

  return (
    <div className="p-4 h-full">
      <MessageList
        initalMessages={messages}
        sessionId={session.id}
        chatroomId={id}
        userAvatar={userData!.avatar!}
        username={userData!.username}
        roomOwnerId={roomOwnerData!.id}
        roomOwnerAvatar={roomOwnerData!.avatar}
        roomOwnerName={roomOwnerData!.username}
      />
    </div>
  );
};

export default ChatRoomPage;
export type { MessageType };
