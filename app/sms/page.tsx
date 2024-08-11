import FormInput from '@/components/form-input/FormInput';
import FormButton from '@/components/form-btn/FormButton';

import SocialLogin from '@/components/social-login.tsx/SocialLogin';

const SMSLogIn = () => {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-96 h-4/6 p-5 flex flex-col gap-8">
        <div>
          <div className="text-lg font-semibold">SMS Login</div>
          <div className="text-lg font-semibold">Verify your phone number.</div>
        </div>
        <div className="flex flex-col gap-3">
          <FormInput
            type="number"
            placeholder="Phone number"
            required={true}
            errors={['']}
          />
          <FormInput
            type="number"
            placeholder="Verification code"
            required={true}
            errors={['']}
          />
          <FormButton loading={false} text="Verify" />
        </div>
      </div>
    </main>
  );
};

export default SMSLogIn;
