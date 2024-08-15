'use client';

import { useFormState } from 'react-dom';

import SocialLogin from '@/components/social-login.tsx/SocialLogin';
import FormInput from '@/components/form-input/FormInput';
import FormButton from '@/components/form-btn/FormButton';
import { handleAction } from './action';

const Login = () => {
  const [state, action] = useFormState<{ errors: string[] }>(
    handleAction as any,
    {
      errors: [],
    },
  );

  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-96 h-4/6 p-5 flex flex-col gap-8">
        <div>
          <div className="text-lg font-semibold">안녕하세요!</div>
          <div className="text-lg font-semibold">
            Log in with emil and password.
          </div>
        </div>
        <form className="flex flex-col gap-3" action={action}>
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            required={true}
            errors={['']}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            errors={state.errors}
          />
          <FormButton text="Create account" />
        </form>
        <SocialLogin />
      </div>
    </main>
  );
};

export default Login;
