'use server';

import db from '@/libs/db';
import { getSession } from '@/libs/session';

export const saveMessage = async (payload: string, chatRoomId: string) => {
  const session = await getSession();

  await db.message.create({
    data: {
      payload,
      userId: session.id,
      chatRoomId,
    },
  });
};
