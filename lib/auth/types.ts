export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: AuthError | null;
}