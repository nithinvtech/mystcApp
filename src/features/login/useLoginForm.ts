import { useState } from 'react';
import { validateLogin, type LoginErrors } from './validation';

export function useLoginForm(
  onLogin: (lineNumber: string, password: string) => Promise<void> | void,
) {
  const [lineNumber, setLineNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const canSubmit =
    !isLoading && !!lineNumber.trim() && !!password.trim();

  async function submit() {
    if (isLoading) return;

    const nextErrors = validateLogin(lineNumber, password);
    setErrors(nextErrors);
    setSubmitError('');

    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    try {
      await onLogin(lineNumber.trim(), password);
    } catch {
      setSubmitError('Unable to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    lineNumber,
    password,
    errors,
    isLoading,
    submitError,
    canSubmit,
    setLineNumber: (value: string) => {
      setLineNumber(value);
      setErrors(current => ({ ...current, lineNumber: undefined }));
    },
    setPassword: (value: string) => {
      setPassword(value);
      setErrors(current => ({ ...current, password: undefined }));
    },
    submit,
  };
}
