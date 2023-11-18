import { createClient } from '@supabase/supabase-js';

const URL = 'https://vhgjnrjouqcrjalwwuni.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZ2pucmpvdXFjcmphbHd3dW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxODgwNzEsImV4cCI6MjAxNTc2NDA3MX0.mFmDOlp5E7PYxZwbNrOTT3ulMFMx2oJ-i-hbmeEqeec';

export const supabase = createClient( URL, API_KEY );

