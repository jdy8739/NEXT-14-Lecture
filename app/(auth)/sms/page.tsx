'use client';

import { useFormState } from 'react-dom';
import loginSms, { SmsLoginForm } from './action';

import FormInput from '@/components/form-input/FormInput';
import FormButton from '@/components/form-btn/FormButton';
import { TOKEN_MAX, TOKEN_MIN } from '@/libs/constants';

const SMSLogIn = () => {
  const [state, action] = useFormState<{
    errors?: Record<keyof SmsLoginForm, string[] | undefined>;
    isValidPhone: boolean;
  }>(loginSms as any, {
    isValidPhone: false,
  });

  return (
    <div className="w-96 h-full p-5 flex flex-col gap-8">
      <div>
        <div className="text-lg font-semibold">SMS Login</div>
        <div className="text-lg font-semibold">Verify your phone number.</div>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        {state.isValidPhone ? (
          <FormInput
            key="token"
            type="number"
            name="token"
            placeholder="Verification code"
            required={true}
            errors={state.errors?.token}
            min={TOKEN_MIN}
            max={TOKEN_MAX}
          />
        ) : (
          <FormInput
            key="phone"
            type="number"
            name="phone"
            placeholder="Phone number"
            required={true}
            errors={state.errors?.phone}
          />
        )}
        <FormButton text={state.isValidPhone ? 'verify sms' : 'verify phone'} />
      </form>
    </div>
  );
};

export default SMSLogIn;
