/**
 * Seed script — push all static projects into Supabase database.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-projects.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { staticProjects } from "../lib/projects.js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log(`Starting sync of ${staticProjects.length} projects to Supabase...`);

  for (const proj of staticProjects) {
    const { icon: _icon, ...rest } = proj;
    const dbPayload = {
      ...rest,
      has_case_study: proj.hasCaseStudy,
      case_study_href: proj.caseStudyHref,
      opportunity_title: proj.opportunityTitle,
      opportunity_copy: proj.opportunityCopy,
      concept_status: proj.conceptStatus,
      system_direction_title: proj.systemDirectionTitle,
      system_direction_copy: proj.systemDirectionCopy,
      system_console: proj.systemConsole,
      build_version_title: proj.buildVersionTitle,
    };

    const { data, error } = await supabase
      .from("projects")
      .upsert(dbPayload, { onConflict: "slug" })
      .select();

    if (error) {
      console.error(`❌ Failed to upsert ${proj.slug}:`, error.message);
    } else {
      console.log(`✅ Synced: ${proj.slug} (${proj.title})`);
    }
  }

  console.log("Sync complete!");
}

seed().catch(console.error);
