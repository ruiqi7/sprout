CREATE TABLE IF NOT EXISTS users (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( CYCLE ),
    username text NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT username_unique UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS posts (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( CYCLE ),
    username text NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    category text NOT NULL,
    "time" timestamp with time zone NOT NULL,
    comments integer[] NOT NULL DEFAULT '{}'::integer[],
    title_tokens tsvector NOT NULL,
    body_tokens tsvector NOT NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS comments (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( CYCLE ),
    username text NOT NULL,
    content text NOT NULL,
    "time" timestamp with time zone NOT NULL,
    CONSTRAINT comments_pkey PRIMARY KEY (id)
);