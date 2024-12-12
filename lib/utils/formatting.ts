export function formatCurrency(amount: number, locale = 'nl-NL', currency = 'EUR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date, locale = 'nl-NL'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format based on length and first digits
  if (cleaned.startsWith('31')) {
    // Dutch number
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4)}`;
  }
  
  // Default formatting
  return cleaned.replace(/(\d{2})(\d{8})/, '+$1 $2');
}

export function formatVATNumber(vatNumber: string): string {
  // Remove spaces and convert to uppercase
  const cleaned = vatNumber.replace(/\s/g, '').toUpperCase();
  
  // Format NL VAT numbers
  if (cleaned.startsWith('NL')) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 11)} ${cleaned.slice(11)}`;
  }
  
  return cleaned;
}