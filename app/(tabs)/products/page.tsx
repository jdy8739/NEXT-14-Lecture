const ProductsPage = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 3000));

  return 'products page';
};

export default ProductsPage;
