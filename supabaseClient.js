/* eslint-disable @typescript-eslint/no-require-imports */
// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const data = require('./appsettings.json');

const supabaseUrl = data.Supabase.Url;
const supabaseAnonKey = data.Supabase.AnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
