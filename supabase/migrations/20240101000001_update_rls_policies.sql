-- Enable RLS
alter table auth.users enable row level security;

-- Allow public access for registration
create policy "Allow public registration"
  on auth.users for insert
  with check (true);

-- Allow users to view and update their own data
create policy "Users can view own data"
  on auth.users for select
  using (auth.uid() = id);

create policy "Users can update own data"
  on auth.users for update
  using (auth.uid() = id);

-- Add insert policies for profiles and companies
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can insert own company"
  on public.companies for insert
  with check (auth.uid() = user_id);

-- Add trigger to automatically create profile and company
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'phone_number'
  );

  insert into public.companies (user_id, name, email, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'company_name',
    new.email,
    new.raw_user_meta_data->>'phone_number'
  );

  return new;
end;
$$ language plpgsql security definer;

-- Create the trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();