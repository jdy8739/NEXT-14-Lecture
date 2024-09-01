'use server';

export const uploadProduct = async (formData: FormData) => {
  const product = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };

  console.log(product);
};
