# PackOnce

PackOnce is a mobile app that aims to make it easier to pack for trips.

## Background

PackOnce attempts to solve two simple, related problems:

1. People make and re-make packing lists that are largely the same every time they take a vacation
2. If fifty people go camping and make packing lists, the fifty-first person to go doesn't get any benefit from their effort.

PackOnce users don't have to start from scratch when they're building their packing list. By selecting what kind of trip they're going on, they can access suggestions based on what people have brought on similar trips in the past. When they finish packing and mark a list as completed, that data will contribute to making the suggestions list better for future users.

## Demo

You can try PackOnce in your browser on a simulated phone at its [webpage](https://joshgelbard.github.io/PackOnce).

![Home Screen Screenshot](/docs/home_screen.png)

## How it works

PackOnce was built using React Native. Data about past trips is stored on a PostgreSQL database accessed via a Django backend, hosted on Heroku.

We used Redux to manage application state and make debugging easier. In general, anything that affects something other than the local component does so by dispatching an action, making it easy to follow the chain of events. Information is stored and retrieved asynchronously whether it's local to the phone or remotely to/from our backend -- in the former case, with React Native's [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html) and in the latter by using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Rather than doing the work of incrementing a primary key when saving trip data locally, which would be easy to screw up we simply generate a UUID for any trip that doesn't already have one.

Saving a trip locally:
```
// storage_util.js
export const saveTrip = async (trip) => {
  const tripWithId = trip.id ? trip : Object.assign({}, trip, { id: uuidV4() })
  const key = tripKey(tripWithId.id)
  try {
    await AsyncStorage.setItem(key, JSON.stringify(tripWithId))
    return tripWithId
  } catch (error) {
    console.log('saveTrip: error saving data: ', error)
  }
}

// trip_actions.js
export const receiveTrip = trip => ({
  type: RECEIVE_TRIP,
  trip
});

export const saveTrip = trip => dispatch => {
  return StorageUtil.saveTrip(trip)
    .then(res => dispatch(receiveTrip(res)));
};

```

The application is divided into "screens" linked together in `router.js` using [React Navigation](https://reactnavigation.org/docs/intro/). It's currently one of many competing solutions, but one that seems likely to become the standard.

The only data we need to store to provide suggestions is how many times a particular item was brought on a particular type of trip. When a user archives a completed packing list we assume they went on that trip. For each item they brought, and for each activity that trip was tagged with, that combination of `item_name` and `activity` has its `count` increased by one in our database. This data is used to build suggestions lists for future users who start similar trips.


Sending data back to the server:
```
export const sendTaggedTripItems = (items, activities, categories) => {
  const activitiesString = activities.join("_");
  const itemsString = items.join("_");
  const categoriesString = categories.join("_");
  const url = `${SERVER_NAME}/taggings/`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items: itemsString, activities: activitiesString,
      categories: categoriesString
    })
  });
};
```

## Future of this project

Over the coming weeks and months, we'd like to add:

* suggestions based on destination, time, and weather forecast
* personal lists that get added to every new trip for that user but not reported to the database
* smarter parsing of item names, so that "red umbrella, camping" isn't a separate row from "umbrella, camping"
