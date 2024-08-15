import SocialLogin from '@/components/social-login.tsx/SocialLogin';
import FormInput from '@/components/form-input/FormInput';
import FormButton from '@/components/form-btn/FormButton';

const Login = () => {
  const handleAction = async (formData: FormData) => {
    'use server';

    console.log(formData.get('userName'), formData.getAll('email'));
  };

  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-96 h-4/6 p-5 flex flex-col gap-8">
        <div>
          <div className="text-lg font-semibold">안녕하세요!</div>
          <div className="text-lg font-semibold">
            Log in with emil and password.
          </div>
        </div>
        <form className="flex flex-col gap-3" action={handleAction}>
          <FormInput
            type="text"
            name="userName"
            placeholder="Username"
            required={true}
            errors={['']}
          />
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            required={true}
            errors={['']}
          />
          <FormButton loading={false} text="Create account" />
        </form>
        <SocialLogin />
      </div>
    </main>
  );
};

export default Login;
