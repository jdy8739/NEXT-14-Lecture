'use client';

import { XMarkIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

const ModalCloseButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <XMarkIcon className="size-12" />
    </button>
  );
};

export default ModalCloseButton;
