import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  const { data, error } = await supabase.from('solutions').select('*').limit(1);
  if (error) {
    console.log("Error or table does not exist:", error);
  } else {
    console.log("Table exists! Found rows:", data.length);
  }
}
main();
