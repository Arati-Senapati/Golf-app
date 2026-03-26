
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mehxdktbecdxgkubpqjv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laHhka3RiZWNkeGdrdWJwcWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTExNzEsImV4cCI6MjA4OTkyNzE3MX0.x_9FdruFNcGoiWrFvRAsB_NOynYA09k2Gz1Dtex73LE"

export const supabase = createClient(supabaseUrl,supabaseKey)