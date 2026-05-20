-- migrate:up
alter table "user_courses"
    add column "term" text not null default '26T1';

alter table "user_courses"
    drop constraint user_courses_pkey,
    add primary key ("user_id", "term", "course_name");

-- migrate:down

