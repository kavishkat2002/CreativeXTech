-- CreativeXTech Employee Management System (EMS) Schema for Supabase
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/tkzzonjmpaqymyneufdi/sql)

-- 1. Main Employees Table
create table if not exists public.ems_employees (
  id text primary key,
  employee_id text unique not null,
  name text not null,
  email text unique not null,
  password text,
  role text not null default 'employee',
  designation text not null,
  department text not null,
  supervisor_id text,
  supervisor_name text,
  joining_date text,
  contract_type text,
  work_location text,
  phone text,
  allocated_territory text,
  status text not null default 'active',
  avatar text,
  bio text,
  kpis jsonb not null default '[]'::jsonb,
  weekly_reviews jsonb not null default '[]'::jsonb,
  attendance jsonb not null default '[]'::jsonb,
  leads jsonb not null default '[]'::jsonb,
  checklist jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Live B2B Deal Pipeline Table
create table if not exists public.ems_leads (
  id text primary key,
  employee_id text references public.ems_employees(id) on delete cascade,
  client_name text not null,
  contact_person text not null,
  channel text not null,
  corridor text not null,
  deal_value text not null,
  stage text not null default 'New Lead',
  next_follow_up text,
  notes text,
  assigned_by text,
  assigned_to text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Day-to-Day Operational Workflow Tasks Table
create table if not exists public.ems_workflow_tasks (
  id text primary key,
  employee_id text references public.ems_employees(id) on delete cascade,
  task text not null,
  time_slot text not null,
  completed boolean not null default false,
  category text not null default 'Outreach',
  priority text default 'normal',
  shift_block text default 'morning',
  notes text,
  completed_at text,
  assigned_by text,
  assigned_to text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. End-of-Day (EOD) Operations Handover Reports Table
create table if not exists public.ems_eod_reports (
  id text primary key default gen_random_uuid()::text,
  employee_id text references public.ems_employees(id) on delete cascade,
  employee_name text not null,
  supervisor_name text not null,
  deliverables_count text not null,
  accomplishments text not null,
  blockers text,
  submitted_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.ems_employees enable row level security;
alter table public.ems_leads enable row level security;
alter table public.ems_workflow_tasks enable row level security;
alter table public.ems_eod_reports enable row level security;

-- Policies for anon & authenticated access
create policy "Allow all on ems_employees"
  on public.ems_employees for all
  using (true)
  with check (true);

create policy "Allow all on ems_leads"
  on public.ems_leads for all
  using (true)
  with check (true);

create policy "Allow all on ems_workflow_tasks"
  on public.ems_workflow_tasks for all
  using (true)
  with check (true);

create policy "Allow all on ems_eod_reports"
  on public.ems_eod_reports for all
  using (true)
  with check (true);

-- Seed Initial Profiles
insert into public.ems_employees (
  id, employee_id, name, email, password, role, designation, department,
  supervisor_id, supervisor_name, joining_date, contract_type, work_location, phone, status, bio
) values 
(
  'emp-admin-001', 'CX-EMP-001', 'Kavishka Thilakarathna', 'tkavishka101@gmail.com', '@Kavishka2002',
  'admin', 'Founder & Chief Technology Officer', 'Executive Management & Product Engineering',
  'board-001', 'Board of Directors / Strategic Council', '2024-01-01', 'Founder / Permanent Full-Time',
  'Colombo HQ & Global Distributed', '+94 77 123 4567', 'active',
  'Leading software engineering, systems design, edge client delivery, and strategic oversight across all CreativeX product initiatives.'
),
(
  'emp-bdi-001', 'CX-EMP-041', 'Kavindu Senanayake', 'intern.bd@creativexlab.online', '@Intern2026',
  'employee', 'Business Development Intern (IT & Software Products)', 'Business Development & Sales',
  'emp-sup-001', 'Dinithi Perera (Lead BD Manager) & Kavishka T.', '2026-10-15', 'Full-Time Remote Internship (6 Months)',
  'Remote · Rajagiriya / Colombo, Sri Lanka (9:00 AM – 6:00 PM)', '+94 77 412 8990', 'active',
  ''
)
on conflict (id) do nothing;

-- 6. Enable Supabase Realtime CDC for instant bidirectional synchronization
alter publication supabase_realtime add table public.ems_employees;
alter publication supabase_realtime add table public.ems_leads;
alter publication supabase_realtime add table public.ems_workflow_tasks;
alter publication supabase_realtime add table public.ems_eod_reports;


