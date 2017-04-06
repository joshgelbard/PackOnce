# Schema Information

## items
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
name               | string    | not null
suggested_category | string    | not null


## trips
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
name           | string    | not null
status         | boolean   | not null
date_range     | string    | not null

## trip_items
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
category    | string    | not null
trip_id     | integer   | not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
tag_coords  | string    | not null

## trip_tagging
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
trip_id     | integer   | not null, foreign key
tag_id      | integer   | not null, foreign key
