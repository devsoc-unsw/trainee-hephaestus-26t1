-- migrate:up

-- Remove username fields from users table, as we're removing the username plugin.
alter table "users"
    drop column "username",
    drop column "displayUsername";


-- migrate:down

