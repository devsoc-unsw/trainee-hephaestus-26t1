-- migrate:up
alter table "user_sessions"
    add column user_id text references users ("id");

create index user_sessions_user_id_idx on "user_sessions" (user_id);

-- migrate:down

