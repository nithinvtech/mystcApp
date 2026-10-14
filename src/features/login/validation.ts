export type LoginErrors = {
  lineNumber?: string;
  password?: string;
};

export function validateLogin(
  lineNumber: string,
  password: string,
): LoginErrors {
  const errors: LoginErrors = {};
  const line = lineNumber.trim();

  if (!line) {
    errors.lineNumber = 'Enter your line number';
  } else if (!/^\d{8}$/.test(line)) {
    errors.lineNumber = 'Enter a valid 8-digit line number';
  }

  if (!password.trim()) {
    errors.password = 'Enter your password';
  }

  return errors;
}
