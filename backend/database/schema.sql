CREATE TYPE session_types AS ENUM ('ASSIGNMENT', 'EXAM', 'LAB', 'TUTORIAL', 'LECTURE', 'OTHER');

CREATE TABLE users (
  id        bigint PRIMARY KEY, 
  family    text, 
  given     text, 
  name      text NOT NULL, 
  email     text NOT NULL,
  password  text NOT NULL,
  sessions  bigint REFERENCES sessions(id)
);

CREATE TABLE semesters (
  id        bigint PRIMARY KEY, 
  year      integer NOT NULL,
  term      text    NOT NULL,
  name      text,
  starting  date    NOT NULL,
  ending    date    NOT NULL
);

CREATE TABLE subjects (
  id        bigint PRIMARY KEY,
  code      text NOT NULL,
  name      text NOT NULL,
  uoc       integer
);

CREATE TABLE courses (
  id        bigint PRIMARY KEY,
  subject   bigint NOT NULL REFERENCES subjects(id),
  semester  bigint NOT NULL REFERENCES semesters(id)
);

CREATE TABLE course_enrolments (
  student   bigint NOT NULL REFERENCES students(id),
  course    bigint NOT NULL REFERENCES courses(id),
  mark      integer,
  grade     text,
  PRIMARY KEY(student, course)
);

CREATE TABLE sessions (
  id          bigint PRIMARY KEY,
  type        session_types NOT NULL, 
  course      bigint NOT NULL REFERENCES courses(id),
  duration    time, 
  completed   boolean NOT NULL, 
  created_at  timestamp DEFAULT NOW() 
);
