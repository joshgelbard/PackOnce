```
tripOverviews: {
  [id]: {
    id: ,
    name: ,
    picture: ,
    tags: [],
  },

  [id]: {
    id: ,
    name: ,
    picture: ,
    tags: [],
  }
},

tripDetail: {
  id: ,
  name: ,
  destinations: [],
  activities: [],
  dateRange: ,
  tripItems: {
    [id]: {
      name: ,
      category: ,
      tripMemberName: ,
      status: ,
      picture:
    },

    [id]: {
      name: ,
      category: ,
      tripMemberName: ,
      status: ,
      picture:
    }
  },

  user: {
    username:
  }
}
````

notes:

tripOverviews gets used for both AllTrips and PreviousTripsPreview

tripDetail gets used for CurrentTripPreview, NewTrip, and TripShow

since tripDetail gets used for both NewTrip and TripShow, tripItem status can signify either, in the first case, whether it will be included in the trip ['INCLUDED', 'REMOVED'], or, in the second case, whether it's been packed ['PACKED, 'UNPACKED', 'DELETED']. keeping them around but marking them as removed/deleted doesn't hurt and will allow for undo functionality later.
