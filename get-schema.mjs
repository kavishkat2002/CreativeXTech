import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);

if (urlMatch && keyMatch) {
  const supabase = createClient(urlMatch[1], keyMatch[1]);
  const { data, error } = await supabase.from('services').select('*').limit(1);
  if (error) {
    console.error("Error fetching services:", error.message);
  } else {
    console.log("Services schema sample (or empty array if no rows):", data);
  }
}
