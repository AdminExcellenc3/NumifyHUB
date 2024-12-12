export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleDatabaseError(error: any): AppError {
  console.error('Database error:', error);

  if (error.code === '23505') {
    return new AppError(
      'A record with this information already exists.',
      'DUPLICATE_RECORD',
      409
    );
  }

  if (error.code === '23503') {
    return new AppError(
      'Referenced record does not exist.',
      'FOREIGN_KEY_VIOLATION',
      400
    );
  }

  return new AppError(
    'An unexpected database error occurred.',
    'DATABASE_ERROR',
    500
  );
}

export function handleAuthError(error: any): AppError {
  console.error('Auth error:', error);

  if (error.message.includes('Email not confirmed')) {
    return new AppError(
      'Please verify your email address.',
      'EMAIL_NOT_VERIFIED',
      401
    );
  }

  if (error.message.includes('Invalid login credentials')) {
    return new AppError(
      'Invalid email or password.',
      'INVALID_CREDENTIALS',
      401
    );
  }

  return new AppError(
    'An unexpected authentication error occurred.',
    'AUTH_ERROR',
    500
  );
}