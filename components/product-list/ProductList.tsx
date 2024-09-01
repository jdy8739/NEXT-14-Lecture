'use client';

import { ProductListType } from '@/app/(tabs)/products/page';
import ListProduct from '../list-product/ListProduct';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getMoreProducts } from '@/app/(tabs)/products/action';

interface Props {
  initialProducts: ProductListType;
}

const ProductList = ({ initialProducts }: Props) => {
  const triggerDivRef = useRef<HTMLDivElement>(null);

  const [productList, setProductList] =
    useState<ProductListType>(initialProducts);

  const onLoadMoreProducts = useCallback(async () => {
    const moreProducts = await getMoreProducts(productList.length);

    setProductList((prev) => [...prev, ...moreProducts]);
  }, [productList]);

  useEffect(() => {
    const io = new IntersectionObserver(([trigger]) => {
      if (trigger && trigger.isIntersecting) {
        onLoadMoreProducts();
      }
    });

    if (triggerDivRef.current) {
      io.observe(triggerDivRef.current);
    }

    return () => {
      io.disconnect();
    };
  }, [onLoadMoreProducts]);

  return (
    <div className="h-[300vh] relative">
      {productList.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      <div ref={triggerDivRef} className="w-full absolute bottom-0 text-center">
        observer trigger
      </div>
    </div>
  );
};

export default ProductList;
