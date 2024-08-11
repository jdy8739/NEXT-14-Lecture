interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

const FormInput = ({ type, placeholder, required, errors }: FormInputProps) => {
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
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <div key={`${error}_${index}`} className="text-sm text-red-500">
          {error}
        </div>
      ))}
    </div>
  );
};

export default FormInput;
