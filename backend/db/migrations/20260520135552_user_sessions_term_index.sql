-- migrate:up
create index user_sessions_term_idx on "user_sessions" (term);

-- migrate:down

