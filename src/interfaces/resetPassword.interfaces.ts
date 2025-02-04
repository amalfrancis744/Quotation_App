export interface IResetPassword {
  userId: string;
  resetToken: string;
  expiresAt: Date;
}
