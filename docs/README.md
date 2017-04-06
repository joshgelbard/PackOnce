sqlite3## PackOnce

### Background

When a person decides to travel, the most difficult challenge during the process is what to bring and remembering to actually bring it. This app is designed to allow users to keep track of their packing list. First, users will be able to search the most popular cities that packing lists have been created for. When they find their correct city, the user will be taken to a new packing list. Within this new packing list, users will be able to add all of their packing items they will need to bring. In addition, suggestion items  will be given to the user based on previous experiences from other users in that city. After creating the list, users will be able to add other items at will as well as check off items they have officially packed. Users will then be able to archive all finished trips.

To make this this application as user-friendly and efficient as possible, this app will be on mobile. This will ensure that users who are not near their desktops will be able to find items that they might need to purchase for their trip.

### Functionality and MVPs

The minimum functionality required to make this app useful:

- [ ] customize packing list for a trip before beginning to pack
- [ ] check things off a list while packing; archive a finished list
- [ ] access past trips

Bonus:

- [ ] users get "add to list for next time?" notifications while on their trip, in case they forgot something
- [ ] display weather forecast and adjust suggestions accordingly
- [ ] users can purchase items they're missing on amazon (if they pack early enough)
- [ ] Categories within lists. Recognized items are categorized automatically (“Toothbrush” goes in category Toiletries)

### Wireframes

[link](./wireframes)

### Component Hierarchy

[link](./component_hierarchy.md)

### Sample State

[link](./sample_state.md)

### Technologies and Technical Challenges

#### Create React Native App / Expo

To avoid spending a lot of time setting up our development environments just right, and to ease the process of developing simultaneously for both iOS and Android, we will develop this app with [Create React Native App](https://github.com/react-community/create-react-native-app). CRNA uses [Expo](https://expo.io/) to simplify the process of developing React Native apps for both iOS and Android but doesn’t require you to use the Expo Development Environment. The tradeoff for using Expo or CRNA is that we will be limited to the tools available within either the core React Native library or the Expo SDK, but those should be enough to make this app work. If they’re not, it’s always possible to `eject` from CRNA and continue development as a standalone app.

#### Data storage

To offer destination-based packing suggestions, this app will need to record completed trip data in a database. When a user starts a new trip, it will query the database to see what the most popular items are for that destination. User authentication will require database access as well. Other data (active and archived trips for the local user) can be stored and updated locally with [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html). We’ll use a sqlite3 database hosted on AWS and write the backend in Django. Our frontend components will trigger data retrieval asynchronously with the React Native Fetch API.

### Group Members & Work Breakdown

Our group consists of three members: Qadir, Jon, and Josh.

Qadir’s responsibilities:
  -  Learn Python & Django. Implement backend for TripShow component and set up barebones structure of frontend. Finish frontend structure of TripShow and add adequate styling. Implement smart suggestions feature for newTrip and TripShow. Create and design demo page.

Josh’s responsibilities:
- Learn Python & Django. Implement backend for NewTrip component and set up barebones structure of frontend. Finish frontend  features and structure of NewTrip and begin to add adequate styling. Finish frontend features and structure of NewTrip and    finish adequate styling. Add app to google play store

Jon’s responsibilities:
  - Learn Python & Django. Implement backend for AllTrips component and set up barebones structure of frontend. Finish frontend structure of AllTrips and add adequate styling. Create seed data. Set up emulator for demo


### Implementation Timeline


* Monday
  - Learn Python & Django(all)
* Tuesday
  - Implement backend for individual components
    + NewTrip component(Josh)
    + TripShow component(Qadir)
    + AllTrips component(Jon)
  - Set up barebones frontend display for each component with data
  -  NewTrip feature "pick an activity" (Josh)
* Wednesday
  - Finish frontend structure of each assigned component and complete adequate for the styling
    + NewTrip component(Josh)
    + TripShow component(Qadir)
    + AllTrips component(Jon)
* Thursday
  - Create seed data (Jon)
  - Smart suggestions (Qadir)
  - Adequate styling on NewTrip component(Josh)

* Friday
  - Add app to google play store(Josh)
  - Create and design demo page(Qadir)
  - Set up Android emulator for demo (Jon)
  - Market application to 10 friend each as well as post on sub-reddit forum(all)
