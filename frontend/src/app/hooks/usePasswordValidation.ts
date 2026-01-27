import { useState, useEffect } from 'react';

interface UsePasswordValidationProps {
  passwordValue: string;
  confirmPasswordValue: string;
}

export function usePasswordValidation({
  passwordValue,
  confirmPasswordValue,
}: UsePasswordValidationProps) {
  const [isSamePassword, setIsSamePassword] = useState(true);

  const passwordValidations = {
    hasMinChars: passwordValue.length >= 6,
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasSpecialChar: /[^A-Za-z0-9]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
  };

  const isPasswordStrong = Object.values(passwordValidations).every(Boolean);

  useEffect(() => {
    if (confirmPasswordValue?.length > 0) {
      setIsSamePassword(passwordValue === confirmPasswordValue);
    } else {
      setIsSamePassword(true);
    }
  }, [passwordValue, confirmPasswordValue]);

  const canSubmit = isPasswordStrong && isSamePassword && confirmPasswordValue.length > 0;

  return {
    passwordValidations,
    isPasswordStrong,
    isSamePassword,
    canSubmit,
  };
}