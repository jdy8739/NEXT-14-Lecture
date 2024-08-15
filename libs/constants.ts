export const BASIC_CREATE_ACCOUNT_FORM_PARAMS = {
  required_error: 'This field is required.',
  invalid_type_error: 'This field must be string',
} as const;

export const USERNAME_MIN = 3;
export const USERNAME_MAX = 10;
export const PASSWORD_MIN = 10;

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/;
export const PASSWORD_REGEX_MESSAGE =
  'Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-';
