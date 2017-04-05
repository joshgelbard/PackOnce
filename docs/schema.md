items: id, name, suggested_category, picture
  suggested_category based on most common category in existing trip_items of this type

tags: id, name, tag_type, coords, picture
  allowed values for tag_type at present: ‘ACTIVITY’, ‘DESTINATION’, ‘WEATHER’
  coords are destination only; used with trips date_range for grabbing current weather conditions
  picture is also for destination

trips: id, name, status, date_range
  status: active or archived. canceled trips are deleted

trip_item: name, status, category

item_taggings join items, tags


# Schema Information

## items
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
name               | string    | not null, indexed, unique
suggested_category | string    | not null
picture            | string    | not null

## trips
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
name           | string    | not null
completed      | boolean   | not null
date_range     | string    | not null

## trip_item
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
completed   | boolean   | not null
category    | string    | not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
tag_coords  | string    | not null
picture     | string    | not null

## item_tagging
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
item_id     | integer   | not null, foreign key (references businesses)
tag_id      | integer   | not null, foreign key (references tags)
