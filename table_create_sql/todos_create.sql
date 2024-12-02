create table todos (
  id serial primary key,
  task text not null,
  is_completed boolean default false,
  created_at timestamp default now()
);
