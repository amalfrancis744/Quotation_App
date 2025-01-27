export const STATUS_CODE = {
    OK: 200,
    TRIPLEA: 151,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    INFO: 250,
    NON_AUTHORITATIVE: 203,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    FORBIDDEN: 403,
    RESOURCE_NOT_FOUND: 404,
    PROXY_AUTH_FAILED: 412,
    TOO_MANY_REQUESTS: 429,
    VALIDATION_FAILURE: 450,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    SERVER_TIMEOUT: 504
  } as const
  
  export const ERROR_MSGS = {
    EMAIL_NOT_VERIFIED: 'Email not verified',
    UPDATED_FAILED: 'Update Failed',
    DELETE_FAILED: 'Delete Failed',
    DATA_NOT_FOUND: 'Data not found',
    WENT_WRONG: 'Something went wrong. Please try again later.',
   
    INVALID_VERIFICATION_TOKEN:
      'The provided verification token is invalid or Expired. Please verify and try again.',
    EMAIL_EXISTS: 'Email already exists.',
    EMAIL_SENT: 'Email already sent.',
    DOB_FAILED: 'Sorry, the owner must be at least 18 years old to proceed.',
    ACCOUNT_NOT_FOUND: 'Account not found, invalid email.',
    INVALID_LOGIN: 'Invalid email or password.',
    USER_NOT_FOUND: 'User not found.',
    INVALID_TOKEN: 'Invalid token',
    TOKEN_EXPIRED: 'Token has expired.',
    BAD_AUTH: 'Bad authorization!',
    TOKEN_MISSING: 'Token not provided!',
    BAD_TOKEN: 'Bad token!',
    INVALID_EMAIL: 'Invalid email!',
    RESET_PW_LINK_EXPIRED: 'Reset password link has expired.',
    INVALID_REQUEST: 'Invalid request!',
    INVALID_ROLE: 'Invalid role.',
    EMAIL_ALREADY_VERIFIED: 'Email is already verified',
    UNAUTH_DATA_FETCH: 'You are unauthorized to retrieve the data.',
    INVALID_PASS:'Invalid password'
   

  } as const
  
  export const INFO_MSGS = {
    SUCCESS: 'Request Success',
  
    // Auth
    SUCCESSFUL_REGISTER: 'Registered successfully!',
    SUCCESSFUL_LOGIN: 'Successfully logged in.',
    PASSWORD_CHANGED: 'Your password has been changed successfully.',
    RESET_EMAIL: 'Reset password email sent successfully.',
  
    // QuickBook
    ACCOUNTANT_MAIL_SENT:
      'Successfully sent mail to connect your QuickBooks Online (QBO) account.',
  
    // Permission
    PERMISSION_EMAIL:
      'A consent request will be automatically sent to the applicant.',
    CONSENT_RESEND: 'A consent request was resent to the applicant.',
    PERMISSION_ASSIGN: 'Permission successfully assigned.',
    QBO_GRANTED:
      'Accounting data access is granted because at least one owner/applicant has approved.',
    ESC_GRANTED:
      'Credit data access is granted because all owners/applicants have approved.',
    QBO_PENDING:
      'Accounting data access is pending because no owners/applicants have approved yet.',
    ESC_PENDING:
      'Credit data access is pending because not all owners/applicants have approved.',
  
    
    EMAIL_VERIFIED: 'User Email verification successfully completed'
  } as const
  
  export const REPORT_DATE_FORMAT = 'MMMM DD, YYYY'
  export const DATE_FORMAT_REPORT = 'MMM DD, YYYY h:mm a'
  