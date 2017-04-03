items: id, name, suggested_category, picture
  suggested_category based on most common category in existing trip_items of this type

tags: id, name, tag_type, coords, picture
  allowed values for tag_type at present: ‘ACTIVITY’, ‘DESTINATION’, ‘WEATHER’
  coords are destination only; used with trips date_range for grabbing current weather conditions
  picture is also for destination

users: id, name, normal stuff

trip_member: id, name, trip_id
  trips are created with one member, the current user. later you can add more (family members?)

trips: id, status, date_range
  status: active or archived. canceled trips are deleted

trip_item: status, trip_member, category

item_taggings join items, tags

user_trips join users, trips

user_items join users, items
  users can add custom items they want suggested for every trip. eg meds
  possibly this is how 'general' items get added -- all users start with a default list
