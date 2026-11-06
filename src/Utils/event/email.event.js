import { EventEmitter } from 'node:events';
import { template } from '../email/verify.email.template.js';
import { sendEmail } from '../email/send.email.js';
import { OTPEnum } from '../enums/otp.enums.js';

export const emailEvents = new EventEmitter();

emailEvents.on(OTPEnum.CONFIRM_EMAIL, async data => {
  try {
    const { otp, username, ...emailData } = data;

    const subject = 'Confirm Your Email';

    await sendEmail({
      ...emailData,
      subject,
      html: template(otp, username, subject)
    });

    console.log('Confirmation Email Sent Successfully');
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
});

emailEvents.on(OTPEnum.FORGET_PASSWORD, async data => {
  try {
    const { otp, username, ...emailData } = data;

    const subject = 'Reset Your Password';

    await sendEmail({
      ...emailData,
      subject,
      html: template(otp, username, subject)
    });

    console.log('Reset Password Email Sent Successfully');
  } catch (error) {
    console.error('Failed to send reset password email:', error);
  }
});
