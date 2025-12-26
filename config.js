import {config} from 'dotenv';

config();

export const PORT = process.env.PORT;
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;