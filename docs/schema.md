items: id, name, suggested_category, picture
  suggested_category based on most common category in existing trip_items of this type

tags: id, name, tag_type, coords, picture
  allowed values for tag_type at present: ‘ACTIVITY’, ‘DESTINATION’, ‘WEATHER’
  coords are destination only; used with trips date_range for grabbing current weather conditions
  picture is also for destination

trips: id, status, date_range
  status: active or archived. canceled trips are deleted

trip_item: name, status, category

item_taggings join items, tags
