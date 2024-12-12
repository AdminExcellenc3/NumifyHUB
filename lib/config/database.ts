if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL environment variable');
}

export const POSTGRES_CONFIG = {
  connectionString: process.env.DATABASE_URL,
  poolSize: 10,
  idleTimeout: 20,
  connectTimeout: 10,
} as const;