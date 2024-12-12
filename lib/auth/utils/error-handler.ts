import { AuthError } from '@supabase/supabase-js';
import { AUTH_ERRORS } from '../constants';

export function handleAuthError(error: AuthError | Error): string {
  if ('status' in error) {
    switch (error.status) {
      case 400:
        return "Ongeldige gegevens. Controleer uw invoer.";
      case 422:
        return "Dit e-mailadres is al geregistreerd.";
      case 429:
        return "Te veel pogingen. Probeer het later opnieuw.";
      default:
        return "Er is een onverwachte fout opgetreden.";
    }
  }

  if (error.message.includes('already registered')) {
    return AUTH_ERRORS.EMAIL_IN_USE;
  }

  if (error.message.includes('weak password')) {
    return AUTH_ERRORS.WEAK_PASSWORD;
  }

  return error.message || "Er is een onverwachte fout opgetreden.";
}