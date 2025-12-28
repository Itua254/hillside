-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Teams Table
create table if not exists teams (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  category text, -- 'first-team', 'academy', 'women'
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table teams enable row level security;

-- Policies for teams
drop policy if exists "Allow generic read access" on teams;
create policy "Allow generic read access" on teams for select using (true);

drop policy if exists "Allow full access to service role" on teams;
create policy "Allow full access to service role" on teams for all to service_role using (true) with check (true);

-- Players Table
create table if not exists players (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  number integer,
  position text,
  team_id uuid references teams(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table players enable row level security;

-- Policies for players
drop policy if exists "Allow generic read access" on players;
create policy "Allow generic read access" on players for select using (true);

drop policy if exists "Allow full access to service role" on players;
create policy "Allow full access to service role" on players for all to service_role using (true) with check (true);

-- Player Team Junction Table
create table if not exists player_team (
  id uuid default uuid_generate_v4() primary key,
  player_id uuid references players(id) not null,
  team_id uuid references teams(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(player_id)
);

alter table player_team enable row level security;

-- Policies for player_team
drop policy if exists "Allow generic read access" on player_team;
create policy "Allow generic read access" on player_team for select using (true);

drop policy if exists "Allow full access to service role" on player_team;
create policy "Allow full access to service role" on player_team for all to service_role using (true) with check (true);


-- Matches Table
create table if not exists matches (
  id uuid default uuid_generate_v4() primary key,
  home_team_id uuid references teams(id) not null,
  away_team_id uuid references teams(id) not null,
  match_date timestamp with time zone not null,
  final_home_goals integer default 0,
  final_away_goals integer default 0,
  is_finished boolean default false,
  season text, -- e.g. '2024-2025'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table matches enable row level security;

-- Policies for matches
drop policy if exists "Allow generic read access" on matches;
create policy "Allow generic read access" on matches for select using (true);

drop policy if exists "Allow full access to service role" on matches;
create policy "Allow full access to service role" on matches for all to service_role using (true) with check (true);

-- Match Stats Table
create table if not exists match_stats (
  id uuid default uuid_generate_v4() primary key,
  match_id uuid references matches(id) not null,
  player_id uuid references players(id),
  event_type text not null, -- 'goal', 'assist', 'yellow_card', 'red_card'
  event_minute integer,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table match_stats enable row level security;

-- Policies for match_stats
drop policy if exists "Allow generic read access" on match_stats;
create policy "Allow generic read access" on match_stats for select using (true);

drop policy if exists "Allow full access to service role" on match_stats;
create policy "Allow full access to service role" on match_stats for all to service_role using (true) with check (true);

-- Player Season Stats Table
create table if not exists player_season_stats (
  id uuid default uuid_generate_v4() primary key,
  player_id uuid references players(id) not null,
  season text not null,
  goals integer default 0,
  assists integer default 0,
  matches_played integer default 0,
  yellow_cards integer default 0,
  red_cards integer default 0,
  unique(player_id, season)
);

alter table player_season_stats enable row level security;

-- Policies for player_season_stats
drop policy if exists "Allow generic read access" on player_season_stats;
create policy "Allow generic read access" on player_season_stats for select using (true);

drop policy if exists "Allow full access to service role" on player_season_stats;
create policy "Allow full access to service role" on player_season_stats for all to service_role using (true) with check (true);

-- RPC: Upsert Player Season Stat
create or replace function upsert_player_season_stat(
  p_player_id uuid,
  p_season text,
  p_goals integer,
  p_assists integer
)
returns void
language plpgsql
security definer
as $$
begin
  insert into player_season_stats (player_id, season, goals, assists)
  values (p_player_id, p_season, p_goals, p_assists)
  on conflict (player_id, season)
  do update set
    goals = player_season_stats.goals + excluded.goals,
    assists = player_season_stats.assists + excluded.assists;
end;
$$;
