-- migrate:up

-- Remove username fields from users table, as we're removing the username plugin.
-- Add year and major columns to users table.
alter table "users"
    drop column "username",
    drop column "displayUsername",
    add column "year"  integer default null,
    add column "major" text    default null;

create table "user_courses"
(
    user_id     text not null references users (id),
    course_name text not null,
    primary key (user_id, course_name)
)


-- migrate:down

