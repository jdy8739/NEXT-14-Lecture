import FormInput from '@/components/form-input/FormInput';
import FormButton from '@/components/form-btn/FormButton';

import SocialLogin from '@/components/social-login.tsx/SocialLogin';

const CreateAccountPage = () => {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-96 h-4/6 p-5 flex flex-col gap-8">
        <div>
          <div className="text-lg font-semibold">안녕하세요!</div>
          <div className="text-lg font-semibold">
            Fill in the form below to join!
          </div>
        </div>
        <form className="flex flex-col gap-3">
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
          <FormInput
            type="password"
            name="password"
            placeholder="Confirm Password"
            required={true}
            errors={['']}
          />
          <FormInput
            type="password"
            name="passwordConfirm"
            placeholder="Password"
            required={true}
            errors={['']}
          />
          <FormButton text="Create account" />
        </form>
        <SocialLogin />
      </div>
    </main>
  );
};

export default CreateAccountPage;
