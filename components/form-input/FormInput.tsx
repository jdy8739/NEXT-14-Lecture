import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: HTMLInputElement['name'];
}

const FormInput = ({ errors = [], name, ...rest }: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="
        w-full
        p-[6px]
        bg-transparent 
        outline-none 
        ring-1
        ring-neutral-400 
        focus:ring-2
        focus:ring-orange-500 
        transition-shadow 
        rounded-md
        text-neutral-300
        placeholder:text-neutral-500"
        name={name}
        {...rest}
      />
      <ul className="list-disc px-4">
        {errors.map((error, index) => (
          <li key={`${error}_${index}`} className="text-sm text-red-500">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormInput;
