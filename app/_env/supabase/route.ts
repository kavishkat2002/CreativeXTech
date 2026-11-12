export const dynamic = "force-dynamic";

const FALLBACK_URL = "https://tkzzonjmpaqymyneufdi.supabase.co";
const FALLBACK_KEY = "sb_publishable_bNbYWo1EJFR8pwtjE93Thw_me9M0UAV";

export async function GET() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    FALLBACK_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    FALLBACK_KEY;

  return Response.json(
    { url, key },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

