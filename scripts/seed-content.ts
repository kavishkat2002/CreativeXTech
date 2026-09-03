import { services } from "../lib/services";
import { staticSolutions as solutions } from "../lib/solutions";
import { staticProjects as projects } from "../lib/projects";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Missing Supabase credentials in environment");
  process.exit(1);
}

async function upsertData(table: string, data: readonly any[]) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  
  // Remove the 'icon' properties since they are Lucide components and can't be JSON serialized
  const cleanData = data.map(({ icon, ...rest }) => rest);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY as string,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    } as HeadersInit,
    body: JSON.stringify(cleanData),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upsert to ${table} failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function seed() {
  console.log("🌱 Seeding content into Supabase...");

  try {
    const srvData = await upsertData("services", services);
    console.log(`✅ Seeded ${srvData.length} services`);

    const solData = await upsertData("solutions", solutions);
    console.log(`✅ Seeded ${solData.length} solutions`);

    const projData = await upsertData("projects", projects);
    console.log(`✅ Seeded ${projData.length} projects`);
  } catch (err: any) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
