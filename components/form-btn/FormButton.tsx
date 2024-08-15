'use client';

import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  text: string;
}

const FormButton = ({ text }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        className="primary-btn disabled:bg-slate-500 disabled:cursor-not-allowed"
        disabled={pending}
      >
        {pending ? 'loading...' : text}
      </button>
    </div>
  );
};

export default FormButton;
