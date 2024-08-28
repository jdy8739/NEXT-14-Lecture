import Image from 'next/image';
import Link from 'next/link';

interface ListProductProps {
  id: number;
  title: string;
  price: number;
  photo: string;
  userId: number;
  created_at: Date;
}

const ListProduct = ({
  id,
  title,
  price,
  photo,
  userId,
  created_at,
}: ListProductProps) => {
  return (
    <Link href={`/products/${id}`} className="p-4 flex gap-4">
      <div className="size-32 rounded-md overflow-hidden">
        <Image
          className="w-full h-full"
          src={photo}
          alt={title}
          objectFit="cover"
          width={100}
          height={100}
          quality={100}
        />
      </div>
      <div className="w-40 flex flex-col gap-2">
        <span>{title}</span>
        <span className="text-sm text-neutral-400">
          {created_at.toString()}
        </span>
        <span>{price}</span>
      </div>
    </Link>
  );
};

export default ListProduct;
