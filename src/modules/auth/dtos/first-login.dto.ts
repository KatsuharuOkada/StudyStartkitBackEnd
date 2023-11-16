export type SendCodeFirstLoginDto = {
  email: string;
};

export type VerificationCodeDto = {
  email: string;
  userId: number;
};

export type VerificationTokenDto = {
  verificationToken: string;
};

export type VerifyCodeDto = {
  verificationToken: string;
  verificationCode: string;
};

export type SetPasswordTokenDto = {
  setPasswordToken: string;
};
