'use client';

import { CreateAccountForm, createAccount } from './action';

import { useFormState } from 'react-dom';

import FormInput from '@/components/form-input/FormInput';
import FormButton from '@/components/form-btn/FormButton';

import SocialLogin from '@/components/social-login.tsx/SocialLogin';

import { PASSWORD_MIN, USERNAME_MAX, USERNAME_MIN } from '@/libs/constants';

const INITIAL_FORM_STATE: CreateAccountForm = {
  userName: '',
  email: '',
  password: '',
  passwordConfirm: '',
} as const;

const CreateAccountPage = () => {
  const [formState, dispatch] = useFormState<
    CreateAccountForm & {
      errors?: Record<keyof CreateAccountForm, string[] | undefined>;
    }
  >(createAccount as any, INITIAL_FORM_STATE);

  return (
    <div className="w-96 full p-5 flex flex-col gap-8">
      <div>
        <div className="text-lg font-semibold">안녕하세요!</div>
        <div className="text-lg font-semibold">
          Fill in the form below to join!
        </div>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <FormInput
          type="text"
          name="userName"
          placeholder="Username"
          required={true}
          errors={formState.errors?.userName}
          min={USERNAME_MIN}
          max={USERNAME_MAX}
        />
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          errors={formState.errors?.email}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Confirm Password"
          required={true}
          errors={formState.errors?.password}
          min={PASSWORD_MIN}
        />
        <FormInput
          type="password"
          name="passwordConfirm"
          placeholder="Password"
          required={true}
          errors={formState.errors?.passwordConfirm}
          min={PASSWORD_MIN}
        />
        <FormButton text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default CreateAccountPage;
