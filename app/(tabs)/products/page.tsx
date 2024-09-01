import ProductList from '@/components/product-list/ProductList';
import nextCache from '@/libs/cache';
import db from '@/libs/db';
import { Prisma } from '@prisma/client';

const getInitialProducts = async () => {
  console.log('hit!!');
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      userId: true,
      created_at: true,
    },
    take: 1,
    orderBy: {
      created_at: 'asc',
    },
  });

  return products;
};

const getCachedInitialProducts = nextCache(getInitialProducts, [
  'home-products',
]);

type ProductListType = Prisma.PromiseReturnType<typeof getInitialProducts>;

const ProductsPage = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));

  const initialProducts = await getCachedInitialProducts();

  return (
    <div>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
};

export default ProductsPage;
export type { ProductListType };
