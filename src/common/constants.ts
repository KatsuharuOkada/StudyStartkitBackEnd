export enum EmailTemplate {
  RESET_PASSWORD = 'reset-password',
  VERIY_EMAIL = 'verify-email',
  VERIFY_TWO2FA = 'verify-two2fa',
  VERIFY_EMAIL_SUCCESS = 'verify-email-success',
  SEND_CODE_ACTIVE_ACCOUNT = 'send-code-active-account',
}

export enum GENDER {
  NA = 'N/A',
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum ROLES {
  CLINIC_MASTER = 'CLINIC_MASTER',
  DOCTOR = 'DOCTOR',
}

export enum REDIS_KEYS {
  // User
  USER_AUTH = 'USER_AUTH',
  USER_ACTIVE_ACCOUNT = 'USER_ACTIVE_ACCOUNT',
  // Doctor
  DOCTOR_AUTH = 'DOCTOR_AUTH',
  // Admin
  ADMIN_AUTH = 'ADMIN_AUTH',
}

export enum JWT_ERRORS {
  EXPIRED_TOKEN = 'TokenExpiredError',
  INVALID_TOKEN = 'JsonWebTokenError',
  NOT_BEFORE = 'NotBeforeError',
}
