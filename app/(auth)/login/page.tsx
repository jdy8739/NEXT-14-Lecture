'use client';

import { useFormState } from 'react-dom';

import SocialLogin from '@/components/social-login.tsx/SocialLogin';
import FormInput from '@/components/form-input/FormInput';
import FormButton from '@/components/form-btn/FormButton';
import { LoginForm, handleAction } from './action';
import { PASSWORD_MIN, PASSWORD_REGEX } from '@/libs/constants';

const Login = () => {
  const [state, action] = useFormState<
    LoginForm & {
      errors?: Record<keyof LoginForm, string[] | undefined>;
    }
  >(handleAction as any, {
    email: '',
    password: '',
  });

  return (
    <div className="w-96 h-full p-5 flex flex-col gap-8">
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
          errors={state.errors?.email}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          min={PASSWORD_MIN}
          errors={state.errors?.password}
        />
        <FormButton text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;
