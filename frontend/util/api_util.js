const SERVER_NAME = 'http://localhost';

export const getSuggestedItems = activities => {
  activitiesString = activities.join("_")
  const url = `${SERVER_NAME}/items/suggestions?activities=${activitiesString}`
  console.log(url)
  return fetch(url, {
    method: 'GET'
  })
}
