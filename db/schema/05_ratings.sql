-- Drop and recreate Ratings table

DROP TABLE IF EXISTS ratings
CASCADE;

CREATE TABLE ratings
(
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL DEFAULT 0,
  created TIMESTAMP
  WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP
  WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);