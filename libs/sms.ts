import { Twilio } from 'twilio';

const smsClinet = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!,
);

const sendSmsMessage = async (token: string) => {
  await smsClinet.messages.create({
    body: `Your Karrot verification code is: ${token}`,
    from: process.env.TWILIO_PHONE_NUMBER!,
    to: process.env.MY_PHONE_NUMBER!,
  });
};

export { sendSmsMessage };
