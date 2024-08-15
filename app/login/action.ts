'use server';

const handleAction = async (prevData: FormData, formData: FormData) => {
  console.log(formData.get('userName'), formData.getAll('email'));
  console.log(prevData);
  return {
    errors: ['wrong password!', 'password too short!'],
  };
};

export { handleAction };
