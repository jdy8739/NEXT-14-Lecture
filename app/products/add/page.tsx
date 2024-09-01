'use client';

import FormButton from '@/components/form-btn/FormButton';
import FormInput from '@/components/form-input/FormInput';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';
import { ProductType, uploadProduct } from './action';
import { useFormState } from 'react-dom';

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const AddProduct = () => {
  const [preview, setPreview] = useState('');

  const [state, action] = useFormState<
    ProductType & { errors?: Record<keyof ProductType, string[] | undefined> }
  >(uploadProduct as any, {
    photo: '',
    title: '',
    description: '',
    price: 0,
  });

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
      <form className="h-full flex flex-col gap-3" action={action}>
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
          errors={state.errors?.title}
        />
        <FormInput
          type="number"
          name="price"
          placeholder="price"
          required={true}
          errors={state.errors?.price}
        />
        <FormInput
          type="text"
          name="description"
          placeholder="description"
          required={true}
          errors={state.errors?.description}
        />
        <FormButton text="작성 완료" />
      </form>
    </div>
  );
};

export default AddProduct;
