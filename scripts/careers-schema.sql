-- CreativeXTech Careers & ATS Database Schema for Supabase
-- Run this in your Supabase SQL Editor when using production Supabase.

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  number text not null default '01',
  title text not null,
  department text not null default 'Engineering',
  location text not null default 'Remote / Colombo',
  type text not null default 'Full-time',
  level text not null default 'Mid-Senior',
  salary_range text default '',
  summary text not null default '',
  description text not null default '',
  responsibilities jsonb not null default '[]'::jsonb,
  requirements jsonb not null default '[]'::jsonb,
  required_skills jsonb not null default '[]'::jsonb,
  nice_to_have jsonb not null default '[]'::jsonb,
  benefits jsonb not null default '[]'::jsonb,
  media_url text,
  ats_threshold integer not null default 60,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id text,
  job_slug text not null,
  job_title text not null,
  applicant_name text not null,
  applicant_email text not null,
  phone text,
  linkedin_url text,
  portfolio_url text,
  years_experience integer,
  resume_filename text,
  resume_url text,
  resume_text text not null,
  cover_letter text,
  ats_score integer not null default 0,
  ats_status text not null default 'review',
  ats_matched_skills jsonb not null default '[]'::jsonb,
  ats_missing_skills jsonb not null default '[]'::jsonb,
  ats_bonus_skills jsonb not null default '[]'::jsonb,
  ats_jd_matches jsonb not null default '[]'::jsonb,
  ats_signals jsonb,
  ats_summary text not null default '',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;

-- Public read access for published jobs; authenticated admin write access
create policy "Public can view published jobs"
  on public.jobs for select
  using (published = true or auth.role() = 'authenticated');

create policy "Authenticated users can manage jobs"
  on public.jobs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Public can submit applications; authenticated admin can read/update/delete
create policy "Anyone can submit job applications"
  on public.job_applications for insert
  with check (true);

create policy "Authenticated users can manage job applications"
  on public.job_applications for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update job applications"
  on public.job_applications for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete job applications"
  on public.job_applications for delete
  using (auth.role() = 'authenticated');

