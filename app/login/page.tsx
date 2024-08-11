import Link from 'next/link';
import FormInput from '@/components/form-input/FormInput';
import SocialLogin from '@/components/social-login.tsx/SocialLogin';

const Login = () => {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-96 h-4/6 p-5 flex flex-col gap-8">
        <div>
          <div className="text-lg font-semibold">안녕하세요!</div>
          <div className="text-lg font-semibold">
            Log in with emil and password.
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <FormInput
            type="text"
            placeholder="Username"
            required={true}
            errors={['']}
          />
          <FormInput
            type="email"
            placeholder="Email"
            required={true}
            errors={['']}
          />
          <Link
            href="/create-account"
            className="text-center flex justify-center gap-3 primary-btn"
          >
            Create account
          </Link>
        </div>
        <SocialLogin />
      </div>
    </main>
  );
};

export default Login;
