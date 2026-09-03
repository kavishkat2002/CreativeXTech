import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = readFileSync(".env.local", "utf8");
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1];
const key = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1];

const supabase = createClient(url, key);

async function run() {
  const dataToSave = {
    number: "99",
    slug: "duplicate-slug",
    title: "Test",
    headline: "Test",
  };
  console.log("inserting two rows...");
  await supabase.from("projects").insert([dataToSave, dataToSave]);
  
  console.log("updating multiple rows with select...");
  let res2 = await supabase.from("projects").update({ title: "Test 2" }).eq("slug", "duplicate-slug").select();
  console.log("update res:", res2.error || "success");
}
run();
