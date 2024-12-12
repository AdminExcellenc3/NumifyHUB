export const SERVER_CONFIG = {
  port: process.env.PORT || 3000,
  dev: process.env.NODE_ENV !== 'production',
  // Add other server configuration as needed
} as const;