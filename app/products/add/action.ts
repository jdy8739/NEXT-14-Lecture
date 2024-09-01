'use server';

import db from '@/libs/db';
import { getSession } from '@/libs/session';
import fs from 'fs/promises';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const productScheme = z.object({
  photo: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
});

export type ProductType = z.infer<typeof productScheme>;

export const uploadProduct = async (
  prevData: ProductType,
  formData: FormData,
) => {
  const product = Object.keys(prevData).reduce(
    (a, b) => ({ ...a, [b]: formData.get(b) }),
    {},
  ) as Omit<ProductType, 'photo'> & { photo: File | string };

  if (product.photo instanceof File) {
    const photoData = await product.photo.arrayBuffer();

    await fs.appendFile(
      `./public/${product.photo.name}`,
      Buffer.from(photoData),
    );

    product.photo = `/${product.photo.name}`;

    const result = productScheme.safeParse(product);

    if (!result.success) {
      return result.error.flatten();
    } else {
      const session = await getSession();

      const newProduct = await db.product.create({
        data: {
          title: result.data.title,
          photo: result.data.photo,
          price: result.data.price,
          description: result.data.description,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      redirect(`/products/${newProduct.id}`);
    }
  }
};
