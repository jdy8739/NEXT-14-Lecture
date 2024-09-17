import db from '@/libs/db';
import { getSession } from '@/libs/session';
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
        },
      },
    },
  });

  return chatroom;
};

const ChatRoomPage = async ({ params: { id } }: { params: { id: string } }) => {
  const chatroom = await getRoom(id);

  if (!chatroom) {
    notFound();
  }

  const session = await getSession();

  if (!chatroom.users.some((user) => user.id === session.id)) {
    notFound();
  }

  return <div>chat room! {id}</div>;
};

export default ChatRoomPage;
