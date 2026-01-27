export function formatPhone(value: string): string {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos (DDD + 9 dígitos)
  const limitedDigits = digits.slice(0, 11);
  
  // Aplica a máscara
  if (limitedDigits.length <= 2) {
    return limitedDigits;
  } else if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2)}`;
  } else if (limitedDigits.length <= 10) {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 6)}-${limitedDigits.slice(6)}`;
  } else {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 7)}-${limitedDigits.slice(7)}`;
  }
}

export function validatePhone(phone: string): boolean {
  // Valida formato (99) 9999-9999 ou (99) 99999-9999
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
}