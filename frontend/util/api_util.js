const SERVER_NAME = 'http://10.0.2.2:8000';

export const getSuggestedItems = (activities, limit = 10) => {
  const activitiesString = activities.join("_")
  const url = `${SERVER_NAME}/tag/?activities=${activitiesString}&limit=${limit}`
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
}

export const arrayToIdKeyedObject = (array) => {
  const obj = {};
  array.forEach( item => {
    obj[item.id] = item;
  });
  return obj;
}
