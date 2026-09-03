import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = readFileSync(".env.local", "utf8");
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1];
const key = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1];

const supabase = createClient(url, key);

async function run() {
  const dataToSave = {
    number: "99",
    slug: "test-save-error-test-123",
    title: "Test",
    headline: "Test",
  };
  console.log("inserting without select...");
  let res = await supabase.from("projects").insert([dataToSave]);
  console.log("insert res:", res.error || "success");
  
  console.log("updating without select...");
  let res2 = await supabase.from("projects").update({ title: "Test 2" }).eq("slug", "test-save-error-test-123");
  console.log("update res:", res2.error || "success");
}
run();
