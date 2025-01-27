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
  
    PERMISSION_FAILED: 'Permission update failed',
    CONSENT_LINK_EXPIRED:
      'Data auto-populate consent link expired. Your first attempt has been used.',
    PERMISSION_LIMIT_EXCEEDED:
      'Permission granting limit exceeded. You cannot proceed as the 7-day limit has passed.',
  
    NOT_QBO_CONNECT:
      'Please connect your QuickBooks Online (QBO) account before granting consent requests.',
    QBO_DATA_NOT_FOUND: 'QuickBooks Online (QBO) account not connected!',
    MANUAL_ADD_DATA:
      'The 7-day limit has been exceeded. Please add data manually.',
    MANUAL_ADD_QBO_DATA:
      'Auto population not generated. Please add data manually.',
    CONSENT_NOT_FOUND: 'Consent data not found.',
    ALREADY_APPROVED_OR_PENDING:
      'Consent request is either pending or already approved. You cannot resend the request.',
    SIX_MONTH_MORE: 'Application was created more than six months ago.',
  
    INVALID_USER_TYPE: 'Invalid user type.',
    INVALID_FORM_NAME: 'Invalid form name.',
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
  
    CMS_NOT_FOUND: 'CMS with this application is not available.',
    SURETY_NOT_FOUND: 'Surety with this application is not available.',
    INSURANCE_NOT_FOUND: 'Insurance with this application is not available.',
    BUREAU_NOT_FOUND: 'Credit Bureau with this application is not available.',
    FINANCIALINFO_NOT_FOUND:
      'Financial info with this application is not available.',
    AS_NOT_FOUND: 'Accounting System with this application is not available.',
    BROKERAGE_NOT_FOUND:
      "Sorry, we couldn't find a brokerage for the specified broker.",
    APPLICANT_NOT_FOUND:
      "Sorry, we couldn't find an applicant associated with this brokerage.",
    APPLICANT_NOT_EXIST: 'Applicant not found for the given applicantId.',
    QBO_ACCESS_PENDING: 'Sorry, your QBO connection is still pending.',
    QBO_UPDATE_FAILED: 'QBO state update failed for the user.',
    APPLICANT_CONSENT_PENDING: 'Pending applicant consent for QBO.',
    APPLICATION_NOT_FOUND: 'Application data not found.',
    APP_ALREADY_FINISHED: 'Application already finished.',
    UNAUTH_DATA_FETCH: 'You are unauthorized to retrieve the data.',
  
    // Applicant
    APP_ID_REQUIRED: 'applicantId is required.',
    APPLICANT_EXIST: 'Applicant with the same company name already exists!',
  
    // Application
    APPLICATION_ID_NOT_VALID: 'Application ID is not valid!',
    APP_FINISHED_ERR:
      'Application is finished. Please provide an ongoing application!',
  
    // Brokerage
    BROKERAGE_EXIST: 'Brokerage with the same legal name already exists!',
    BROKERAGE_BLACKLISTED_ERROR:'Email id is blacklisted',
  
    // Data Exist
    AS_EXIST: 'Accounting system data already exists! Please update this.',
    CB_EXIST: 'Credit bureau data already exists! Please update this.',
    FI_EXIST: 'Personal financial info data already exists! Please update this.',
    CMS_EXIST: 'CMS data already exists! Please update this.',
    SURETY_EXIST: 'Surety data already exists! Please update this.',
    INSURANCE_EXIST: 'Insurance data already exists! Please update this.',
  
    // Owner
    OWNER_NOT_FOUND: 'Owner with this ID not found.',
  
    // WIP
    WIP_NOT_FOUND: 'Work in progress report data not found.',
  
    // WIC
    WIC_NOT_FOUND: 'Work in capital report data not found.',
    WIC_MISSING_DATA:
      'Invalid request body. Neither currentLiabilities nor currentAssets provided.',
    WIC_NOT_EDITABLE: "Last Fiscal Year's report is not editable.",
    WIC_NOT_REF: "Last Fiscal Year's report is not refreshable.",
  
    REPORT_REF_FAIL: 'Report refresh failed.',
    REPORT_NOT_FOUND: 'Report data not found.',
    REPORT_ID_INVALID: 'Data not found, report ID is invalid.',
  
    // Profile History
    HISTORY_FAILED: 'History insert failed.',
    HISTORY_NOT_FOUND: 'History data not found.',
  
    // Subscription Plan
    UNAUTH_FOR_PLAN: 'You are unauthorized!',
    UNAUTH_ADMIN: 'You are unauthorized!',
    UNAUTH_USER_PURCHASE: 'You are unauthorized to purchase a plan.',
    DONT_HAVE_PLAN:
      'Your brokerage company does not have any subscription plans. Please purchase one first.',
    DONT_HAVE_APPLICATION:
      'You do not have sufficient remaining applications. Please add a top-up or purchase a new plan.',
  
    EXIST_PLAN_NAME: 'A subscription plan with this name already exists.',
    EXIST_PURCHASHED_PLAN:
      'You already have an active subscription plan. Please add a top-up.',
    PLAN_NOT_FOUND: 'Invalid ID in params. Subscription plan not found.',
    PLAN_NOT_PAID_NOT_ACTIVE:
      "The brokerage's subscription plan is inactive or unpaid. Please update the plan to continue.",
    PLAN_APPLICATION_LIMIT_REACHED: 'The appliaction limit Reached.please renew',
    BROKERAGE_AND_PURCHASEDPLAN_NOT_MATCHING:
      'The purchased plan Not matching to this brokerage',
  
    // QuickBook Reports
    INVALID_REPORT_NAME: 'Invalid report name.',
    REPORT_NAME_REQUIRED: 'Please provide the report name in the query.',
  
    // USER-PROFILE
    NATC_BKRG:
      'You are not allowed to change the brokerage company. Please finish ongoing applications first.',
    FINISH_FIRST: 'Please finish ongoing applications first.',
    NOT_EXIST_BKR: 'No broker exists.',
  
    RESCINDED_FAILED: 'Form is not rescindable.',
  
    INVALID_DUNS_ADDRESS:
      'Invalid address. DUNS only works with the USA & Canada.',
  
    // PDF Preferences
    UPDATE_FAILED_PDF_PREF: 'PDF preferences update failed.',
    INVALID_TOP_UP_PRODUCT: 'This is not Top-up plan',
  
    //  fiscal year end feild
    FISCAL_YEAR_END_EMPTY: 'Fiscal Year End cannot be empty.',
    STATUS_UNVALID:
      'Given status is unvalid, please check, provide correct status',
  
    // Borker Approval status
    BROKER_STATUS_PENDING: 'Your request at Power Brokerage is under review.',
    BROKER_STATUS_DECLINED: 'Your brokerage approval request has been declined.',
    BROKER_STATUS_GRANT: 'You have been granted by the brokerage.',
    BROKER_NOT_APPROVED: 'Broker is not approved.',
    BROKERAGE_DELETED: 'Brokerage is deleted.',
    BROKERAGE_RESTORED: 'Brokerge is restored.',
    BROKERAGE_SUSPENDED: 'Brokerage is suspended.',
    BROKERAGE_ACTIVATED: 'Brokerage is now active.',
    BROKERAGE_BLACKLISTED: 'Brokerage is blacklisted.',
    BROKERAGE_FIRST_SUSPEND: 'You need to first suspended the brokerage.',
    ACCOUNT_SUSPENDED:
      'Account is suspended. Please contact the administrator(support@subtraid.com).',
    ACCOUNT_DELETED:
      'Account is deleted. Please contact the administrator(support@subtraid.com).',
    ACCOUNT_SUSPENDED_BROKER:
      'Account is suspended. Please contact your brokerage.',
    ACCOUNT_DELETED_BROKER:
      'Brokerage company is deleted please contact Brokerage',
    ACCOUNT_DELETED_BROKERAGE:
      'Brokerage company is deleted please contact support@subtraid.com',
    ACCOUNT_SUSPEND_BROKER:
      'Brokerage company is suspended please contact Brokerage',
    ACCOUNT_SUSPEND_BROKERAGE:
      'The brokerage company is suspended please get in touch with support@subtraid.com',
    ACCOUNT_BLACKLIST_BROKERAGE:
      'The brokerage company is blacklisted please get in touch with support@subtraid.com',
    BROKERAGE_HAS_DRAFT_APPLICATIONS:
      'This brokerage has draft applications. Please finish the ongoing applications first.',
    BROKERAGE_HAS_REMAINING_APPLICATIONS:
      'This brokerage has remaining applications. Please finish the ongoing applications first.'
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
  
    // Accountant
    ACCOUNTANT_CREATE: 'Accountant created successfully.',
    ACCOUNTANT_UPDATE: 'Accountant updated successfully.',
    ACCOUNTANT_DELETE: 'Accountant deleted successfully.',
  
    // Owner
    OWNER_CREATE: 'Owner created successfully.',
    OWNER_UPDATE: 'Owner updated successfully.',
    OWNER_DELETE: 'Owner deleted successfully.',
  
    // Application
    APPLICATION_INITIALIZE: 'Application initialized successfully.',
    APPLICATION_SUBMITTED: 'Application is now complete and ready to download.',
    APPLICATION_FINISHED: 'Application finished successfully!',
  
    // WIP
    WIP_CREATE: 'Work in progress report created successfully.',
    WIP_UPDATE: 'Work in progress report updated successfully.',
    WIP_DELETE: 'Work in progress deleted successfully.',
  
    // WIC
    WIC_CREATE: 'Work in capital report created successfully.',
    WIC_UPDATE: 'Work in capital report updated successfully.',
    WIC_DELETE: 'Work in capital deleted successfully.',
  
    REPORT_REF: 'Report refreshed successfully.',
    DUNS_REF: 'Duns data refreshed successfully.',
    REPORT_UPDATE: 'Report updated successfully.',
    REPORT_DELETE: 'Report deleted successfully.',
    REPORT_DELETE_2:
      'All the OCR documents associated to this file will be deleted',
  
    RESCINDED_SUCCESS: 'Assignment from the applicant successfully rescinded.',
    EMAIL_VERIFIED: 'User Email verification successfully completed'
  } as const
  
  export const REPORT_DATE_FORMAT = 'MMMM DD, YYYY'
  export const DATE_FORMAT_REPORT = 'MMM DD, YYYY h:mm a'
  