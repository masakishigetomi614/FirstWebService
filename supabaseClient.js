// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ryqdrbesnvwtpkztzxpl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cWRyYmVzbnZ3dHBrenR6eHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3NzQzNjAsImV4cCI6MjA0NjM1MDM2MH0.KoTnRdortmG8vjoQ1BNXOy4euapZxeCNsgVzxbyziQs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
