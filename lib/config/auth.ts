export const AUTH_CONFIG = {
  sessionKey: 'supabase.auth.token',
  redirects: {
    afterLogin: '/',
    afterLogout: '/login',
    afterSignUp: '/login',
  },
  providers: {
    google: {
      scope: ['email', 'profile'],
    },
  },
} as const;