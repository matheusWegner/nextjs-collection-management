import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_BASE_URL;

export const sendTwoFactorTokenEmail = async (
  email,
  token
) => {
  await resend.emails.send({
    from: "contato@matheuswegner.com.br",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`
  });
};

export const sendPasswordResetEmail = async (
  email,
  token,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`
  await resend.emails.send({
    from: "contato@matheuswegner.com.br",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  });
};

export const sendVerificationEmail = async (
  email, 
  token
) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;
  console.log(email);
  await resend.emails.send({
    from: "contato@matheuswegner.com.br",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  });
};