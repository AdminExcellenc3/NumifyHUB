-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text unique not null,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create companies table
create table public.companies (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  email text,
  phone text,
  address text,
  city text,
  postal_code text,
  country text,
  vat_number text,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to handle user profile creation
create or replace function public.create_user_profile(
  p_user_id uuid,
  p_full_name text,
  p_email text,
  p_phone text,
  p_company_name text
) returns void as $$
begin
  -- Insert profile
  insert into public.profiles (id, full_name, email, phone)
  values (p_user_id, p_full_name, p_email, p_phone);

  -- Insert company
  insert into public.companies (user_id, name, email, phone)
  values (p_user_id, p_company_name, p_email, p_phone);
end;
$$ language plpgsql security definer;

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.companies enable row level security;

-- Create policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view own company"
  on public.companies for select
  using (auth.uid() = user_id);

create policy "Users can update own company"
  on public.companies for update
  using (auth.uid() = user_id);