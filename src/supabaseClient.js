import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqmwbqqmfbvhfxyxkbxc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxbXdicXFtZmJ2aGZ4eXhrYnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMTIxMDAsImV4cCI6MjA2OTg4ODEwMH0.IzhwLa3QK09yTefyAMqULayz__Cciiuh4ghqhVL-qRk';

export const supabase = createClient(supabaseUrl, supabaseKey);
