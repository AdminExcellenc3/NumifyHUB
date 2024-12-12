export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid login credentials',
  EMAIL_IN_USE: 'Email address is already registered',
  WEAK_PASSWORD: 'Password is too weak',
  INVALID_EMAIL: 'Invalid email format',
  SERVER_ERROR: 'An unexpected error occurred',
} as const;

export const AUTH_MESSAGES = {
  VERIFICATION_SENT: 'Verificatie e-mail verzonden',
  CHECK_EMAIL: 'Controleer uw e-mail om uw account te verifiëren',
  LOGIN_SUCCESS: 'Succesvol ingelogd',
  REGISTRATION_SUCCESS: 'Account succesvol aangemaakt',
  LOGOUT_SUCCESS: 'Succesvol uitgelogd',
} as const;

export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  CALLBACK: '/auth/callback',
  HOME: '/',
} as const;