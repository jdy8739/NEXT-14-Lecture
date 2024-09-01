import { getProduct } from '@/app/products/[id]/page';
import Image from 'next/image';
import ModalCloseButton from './close-button';

const ProductModal = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await getProduct(Number(id));

  return (
    <div
      className="w-full h-[100vh] pt-20 px-8 absolute flex flex-col items-center"
      style={{ backgroundColor: 'rgba(60, 60, 60, 0.4)' }}
    >
      <div className="w-full flex justify-end">
        <ModalCloseButton />
      </div>
      {product && (
        <div className="w-full h-80 border-2 border-dashed rounded-md relative">
          <Image
            src={product.photo}
            alt={product.title}
            fill
            objectFit="cover"
          />
        </div>
      )}
    </div>
  );
};

export default ProductModal;
