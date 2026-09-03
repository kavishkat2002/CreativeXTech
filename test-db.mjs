import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);

if (urlMatch && keyMatch) {
  const supabase = createClient(urlMatch[1], keyMatch[1]);
  // Test if table exists
  const { data, error } = await supabase.from('subscribers').select('*').limit(1);
  console.log("Subscribers table error:", error?.message || "No error (table exists)");
} else {
  console.log("Env vars not found");
}
