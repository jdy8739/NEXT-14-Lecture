'use server';

import db from '@/libs/db';

export const getMoreProducts = async (skip: number) => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      userId: true,
      created_at: true,
    },
    skip,
    take: 1,
    orderBy: {
      created_at: 'asc',
    },
  });

  return products;
};
