DROP TABLE location;

CREATE TABLE IF NOT EXISTS location(
  id SERIAL PRIMARY KEY,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  city VARCHAR(255)
);

INSERT INTO location (latitude, longitude, city) VALUES (47.6062095, -122.3320708, 'seattle');