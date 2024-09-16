import db from '@/libs/db';
import { getSession } from '@/libs/session';
import { formatToWon } from '@/libs/utils';
import { UserIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const getProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  return product;
};

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const product = await getProduct(Number(id));

  return {
    title: product?.title,
    description: product?.description,
  };
};

// note: Serverside functions using cookies cannot use generateStaticParams below
// and prevent pages from being generated as static pages.
const getIsOwner = async (userId: number) => {
  // const session = await getSession();

  // return session.id === userId;
  return false;
};

const ProductDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));

  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const isOwner = await getIsOwner(product.userId);

  return (
    <div className="h-full">
      <div className="w-full h-3/6 p-4">
        <div className="h-full border-neutral-700 border-2 border-dashed rounded-md flex justify-center items-center text-neutral-700 relative">
          <Image
            src={product.photo}
            alt={product.title}
            fill
            objectFit="cover"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex gap-2">
          <div className="size-9 flex justify-center items-center overflow-hidden rounded-full border-orange-500 border-2">
            {product.user.avatar ? (
              <Image
                src={product.user.avatar}
                alt={product.user.username}
                fill
                objectFit="cover"
              />
            ) : (
              <UserIcon className="size-11" />
            )}
          </div>
          <div>
            <div className="w-32 h-4 mt-1">{product.user.username}</div>
          </div>
        </div>
        <div className="mt-5">
          <p className="w-56 h-4">{product.title}</p>
          <p className="w-full h-4 mt-2">{product.description}</p>
        </div>
      </div>
      <div className="w-full h-16 p-4 bg-neutral-700 flex justify-between items-center absolute bottom-0">
        <div className="font-semibold">{formatToWon(product.price)} WON</div>
        {isOwner ? (
          <button className="p-2 bg-red-500 rounded-md font-semibold">
            삭제하기
          </button>
        ) : (
          <button className="p-2 bg-orange-500 rounded-md font-semibold">
            채팅하기
          </button>
        )}
      </div>
    </div>
  );
};

// note: generate static pages by presetting potential parameters
export const generateStaticParams = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });
  return products.map((product) => ({ id: product.id + '' }));
};

export default ProductDetailPage;
