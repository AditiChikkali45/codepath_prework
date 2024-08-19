import { createClient } from '@supabase/supabase-js';

const URL = 'https://cbfqlcwfevchtclghtcr.supabase.co';

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiZnFsY3dmZXZjaHRjbGdodGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1MDQ0OTAsImV4cCI6MjAzOTA4MDQ5MH0.ra9O_5tU09uu5mFRvaKClG0TyIVSWSK4-0zHm152P3Q';

export const supabase = createClient(URL, API_KEY);
