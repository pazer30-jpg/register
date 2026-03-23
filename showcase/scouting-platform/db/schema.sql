CREATE TABLE sources (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  freshness_interval TEXT,
  coverage_percent INTEGER,
  parser_errors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE players (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  birth_year INTEGER,
  dominant_foot TEXT,
  primary_position TEXT NOT NULL,
  secondary_positions JSONB NOT NULL DEFAULT '[]'::jsonb,
  current_team TEXT,
  current_league TEXT,
  contract_end_year INTEGER,
  fit_score NUMERIC(5,2),
  upside_score NUMERIC(5,2),
  risk_score NUMERIC(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE player_source_records (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT REFERENCES players(id),
  source_id BIGINT REFERENCES sources(id),
  external_player_id TEXT NOT NULL,
  source_player_name TEXT NOT NULL,
  raw_payload JSONB NOT NULL,
  fetched_at TIMESTAMPTZ NOT NULL,
  parse_status TEXT NOT NULL DEFAULT 'parsed',
  confidence_score NUMERIC(5,2),
  UNIQUE (source_id, external_player_id)
);

CREATE TABLE player_metrics (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT NOT NULL REFERENCES players(id),
  season_label TEXT NOT NULL,
  metric_key TEXT NOT NULL,
  metric_value NUMERIC,
  metric_display TEXT,
  per_90_value NUMERIC,
  percentile_value NUMERIC,
  sample_minutes INTEGER,
  source_id BIGINT REFERENCES sources(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE player_news_items (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT NOT NULL REFERENCES players(id),
  source_id BIGINT REFERENCES sources(id),
  headline TEXT NOT NULL,
  snippet TEXT,
  published_at TIMESTAMPTZ,
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE player_video_links (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT NOT NULL REFERENCES players(id),
  source_id BIGINT REFERENCES sources(id),
  title TEXT NOT NULL,
  url TEXT,
  video_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE player_ai_summaries (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT NOT NULL REFERENCES players(id),
  why_relevant TEXT,
  strengths JSONB NOT NULL DEFAULT '[]'::jsonb,
  weaknesses JSONB NOT NULL DEFAULT '[]'::jsonb,
  risk_flags JSONB NOT NULL DEFAULT '[]'::jsonb,
  trend_summary TEXT,
  recommendation TEXT,
  model_version TEXT,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE watchlists (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  owner_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE watchlist_players (
  watchlist_id BIGINT NOT NULL REFERENCES watchlists(id),
  player_id BIGINT NOT NULL REFERENCES players(id),
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (watchlist_id, player_id)
);

CREATE TABLE scout_notes (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT NOT NULL REFERENCES players(id),
  author_slug TEXT NOT NULL,
  note_body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
