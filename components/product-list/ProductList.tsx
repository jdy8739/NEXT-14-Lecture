'use client';

import { ProductListType } from '@/app/(tabs)/products/page';
import ListProduct from '../list-product/ListProduct';
import { useState } from 'react';
import { getMoreProducts } from '@/app/(tabs)/products/action';

interface Props {
  initialProducts: ProductListType;
}

const ProductList = ({ initialProducts }: Props) => {
  const [productList, setProductList] =
    useState<ProductListType>(initialProducts);

  const onLoadMoreProducts = async () => {
    const moreProducts = await getMoreProducts(productList.length);

    setProductList((prev) => [...prev, ...moreProducts]);
  };

  return (
    <div>
      {productList.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      <button onClick={onLoadMoreProducts}>load more</button>
    </div>
  );
};

export default ProductList;
