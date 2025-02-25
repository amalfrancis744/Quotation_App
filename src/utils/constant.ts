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
    COMPANY_DELETED:"Company deleted successfully",
    INVALID_COMPANY_ID:"Invalid company ID",
    COMPANY_ALREADY_USE:"This company is already associated with another user.",
    USER_NOT_ACTIVE :"User is not active",
    DELETE_FAILED: 'Delete Failed',
    DATA_NOT_FOUND: 'Data not found',
    COMPANY_ALREADY_EXISTS:'CompanyName already exists',
    WENT_WRONG: 'Something went wrong. Please try again later.',
    EMAIL_ALREADY_EXISTS:"Company with email, already exists",
    COMPANY_ID_REQUIRED:"CompanyId is required",
    INVALID_PRODUCT_ID:"Invalid productId",
    PRODUCT_NOT_FOUND:"Product not found",
    PRODUCT_ALREADY_EXISTS:"Product with this SKU code already exists",
    COMPANY_CREATION_FAILED:"Company creation failed",
    USERNAME_EXITS:"Username already exists",
    REGISTER_USER_FAILED:"An error occurred while registering the user.",    
    FILE_SIZE_EXCEEDED:"File is too large",
    JNO_ALREADY_EXISTS: "Quotation already exists with JNo",
    PRODUCT_ID_REQUIRED:"Product id is required",
    QUOTATION_NOT_FOUND:"Quotation not found",
    QUOTATION_DELETE_FAILED:"Quotation deletion failed",
    NO_ITEMS_IN_QUOTATION :"Items not found in the quotation",
    QUOTATION_ITEM_NOT_FOUND:"Quotation of item not found ",
    ITEM_UPDATION_FAILED:"Item update is failed",


    
    INVALID_VERIFICATION_TOKEN:
      'The provided verification token is invalid or Expired. Please verify and try again.',
    EMAIL_EXISTS: 'Email already exists.',
    EMAIL_SENT: 'Email already sent.',
    DOB_FAILED: 'Sorry, the owner must be at least 18 years old to proceed.',
    ACCOUNT_NOT_FOUND: 'Account not found, invalid email.',
    INVALID_LOGIN: 'Invalid email or password.',
    USER_NOT_FOUND: 'User not found.',
    AUTH_FAILED : "Unauthorized access",

    COMAPNY_NOT_FOUND:"Invalid company or invalid company data",
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
    INVALID_PASS:'Invalid password',
    INVALID_CREDENTIALS:"Credentials are missing",
    INVALID_PASSWORD: 'Invalid password',
    NO_TOKEN: 'No authentication token provided.',
    INVALID_FILE_TYPE:"Invalid file type",
    FILE_TOO_LARGE:"File type to large",
    IMAGE_REQUIRED:'Product image is required',
    MISSING_FEILDS:'Please provide all required fields',
    VALIDATION_ERROR:'Validation failed',
    INTERNAL_ERROR:'Internal server error',
    INVALID_ID:'Invalid companyId',
    PASSWORD_MIN_LENGTH:'Password minimum need 6 character',
    INVALID_PHONE:'Invalid phone number',
    
    CUSTOMER_ALREADY_EXISTS : "Customer already exists the given details",
    NO_CUSTOMERS_FOUND:"No customers are connected with this company",
    CUSTOMER_NOT_FOUND:"Customer data not found",
    PRODUCT_NAME_EXISTS:"Product with this name already exists",
    INVALID_ITEMS:"Product items are empty",
    NO_QUOTATION_FOUND:"No quotation found"
     
  } as const
  
  export const INFO_MSGS = {
    SUCCESS: 'Request Success',
  
    // Auth
    SUCCESSFUL_REGISTER: 'Registered successfully!',
    SUCCESSFUL_LOGIN: 'Successfully logged in.',
    PASSWORD_CHANGED: 'Your password has been changed successfully.',
    RESET_EMAIL: 'Reset password email sent successfully.',
    COMPANY_CREATED_SUCCESSFULLY:"Company created successfully",
    COMPANY_FETCHED:"Company fetched successfully",
    COMPANY_UPDATED_SUCCESSFULLY:"Company data updated successfully",
    ALL_COMPANY_FETCHED:"Companies fetched successfully.",

    EMAIL_VERIFIED: 'User Email verification successfully completed',
    TOKEN_VALID:'Token validation is completed successfully',
    USER_DATA_FETCHED:"User data fetched successfully",
    COMPANY_PRODUCT_FETCHED :"Products retrieved successfully",
    PRODUCT_FETCHED:'Product fetched successfully',
    PRODUCT_CREATED_SUCCESSFULLY:'Product created successfully',
    PRODUCT_UPDATED_SUCCESSFULLY:'Product data updated successfully',
    PRODUCT_DELETED_SUCCESSFULLY:'Product deleted successfully',

    CUSTOMER_CREATED: "Customer created successfully",
    CUSTOMER_RETRIEVED:"Customer fetched successfully",
    CUSTOMERS_LISTED: "Company customers list fetched successfully",
    CUSTOMER_UPDATED:"Customer updating completed successfully",
    CUSTOMER_DELETED:"Customer deleted successfully",


    QUOTATION_CREATED:"Quotation created successfully",
    QUOTATION_RETRIEVED:"Quotation fetched successfully",
    QUOTATION_UPDATED:"Quotation updating completed successfully",
    QUOTATION_DELETED_SUCCESSFULL:"Quotation delete  successfully",
    ITEMS_FETCHED:"Items fetched successfully",
    ITEM_UPDATION_SUCCESSFULLY:"Item updated successfully",
    QUOTATION_ITEM_DELETED_SUCCESSFULLY:"Item deleted successfully"
    
  } as const
  

  