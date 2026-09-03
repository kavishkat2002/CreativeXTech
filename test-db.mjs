import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf-8");
const url = env.split("\n").find(l => l.startsWith("NEXT_PUBLIC_SUPABASE_URL=")).split("=")[1];
const key = env.split("\n").find(l => l.startsWith("NEXT_PUBLIC_SUPABASE_ANON_KEY=")).split("=")[1].replace(/"/g, "");

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.from("projects").select("*").limit(1);
  if (error) {
    console.error("Error", error);
  } else {
    console.log("Columns:", Object.keys(data[0] || {}));
  }
}
check();
