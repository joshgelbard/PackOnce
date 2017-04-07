const SERVER_NAME = 'http://10.0.2.2:8000';

export const getSuggestedItems = (activities, limit = 10) => {
  const activitiesString = activities.join("_")
  const url = `${SERVER_NAME}/tag/?activities=${activitiesString}&limit=${limit}`
  console.log(url)
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
}
