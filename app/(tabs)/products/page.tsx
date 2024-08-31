import ListProduct from '@/components/list-product/ListProduct';
import db from '@/libs/db';

const getProducts = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      userId: true,
      created_at: true,
    },
  });

  return products;
};

const ProductsPage = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));

  const products = await getProducts();

  return (
    <div>
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsPage;
