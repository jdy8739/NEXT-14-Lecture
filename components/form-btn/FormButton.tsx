interface FormButtonProps {
  loading: boolean;
  text: string;
}

const FormButton = ({ loading, text }: FormButtonProps) => {
  return (
    <div>
      <button
        className="primary-btn disabled:bg-slate-500 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'loading...' : text}
      </button>
    </div>
  );
};

export default FormButton;
