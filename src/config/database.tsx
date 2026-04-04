import postgres from 'postgres'
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
    throw new Error('DATABASE_URL not set');
}
const sql = postgres(connectionString)

export default sql