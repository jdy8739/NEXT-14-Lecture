'use client';

import FormButton from '@/components/form-btn/FormButton';
import FormInput from '@/components/form-input/FormInput';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';
import { uploadProduct } from './action';

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const AddProduct = () => {
  const [preview, setPreview] = useState('');

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];

      if (file) {
        const blobURL = URL.createObjectURL(file);

        if (file.size > MAX_FILE_SIZE) {
          alert('File size too big!!!');
        } else {
          setPreview(blobURL);
        }
      }
    },
    [],
  );

  return (
    <div className="w-96 h-full p-5 flex flex-col gap-8">
      <form className="h-full flex flex-col gap-3" action={uploadProduct}>
        <label
          className="w-full h-3/6 flex justify-center 
        items-center border-neutral-700 border-2 
        border-dashed rounded-md cursor-pointer
        bg-cover
        "
          style={preview ? { backgroundImage: `url(${preview})` } : {}}
        >
          {!preview && (
            <div>
              <PhotoIcon className="w-full h-16" />
              <span>사진을 추가해주세요.</span>
            </div>
          )}
          <input
            className="hidden"
            name="photo"
            type="file"
            accept="image/*"
            required
            onChange={handleOnChange}
          />
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
