import postgres from 'postgres';
import { POSTGRES_CONFIG } from '@/lib/config/database';

const sql = postgres(POSTGRES_CONFIG.connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export default sql;