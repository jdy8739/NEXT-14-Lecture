const ProductDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 10000));

  return <div>hi {id}</div>;
};

export default ProductDetailPage;
