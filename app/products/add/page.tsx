'use client';

import FormButton from '@/components/form-btn/FormButton';
import FormInput from '@/components/form-input/FormInput';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';

const AddProduct = () => {
  const [preview, setPreview] = useState('');

  const handleOnChange = useCallback(() => {
    //
  }, []);

  return (
    <div className="w-96 h-full p-5 flex flex-col gap-8">
      <form className="h-full flex flex-col gap-3">
        <label
          className="w-full h-3/6 flex justify-center 
        items-center border-neutral-700 border-2 
        border-dashed rounded-md cursor-pointer"
        >
          <div>
            <PhotoIcon className="w-full h-16" />
            <span>사진을 추가해주세요.</span>
          </div>
          <input className="hidden" type="file" onChange={handleOnChange} />
        </label>
        <FormInput
          type="text"
          name="title"
          placeholder="text"
          required={true}
        />
        <FormInput
          type="text"
          name="price"
          placeholder="price"
          required={true}
        />
        <FormInput
          type="text"
          name="description"
          placeholder="description"
          required={true}
        />
        <FormButton text="작성 완료" />
      </form>
    </div>
  );
};

export default AddProduct;
