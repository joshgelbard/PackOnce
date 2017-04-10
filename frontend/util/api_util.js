const SERVER_NAME = 'http://10.0.2.2:8000';
// const SERVER_NAME = 'https://fierce-citadel-80546.herokuapp.com/';

export const getSuggestedItems = (activities, limit = 10) => {

  let hype = activities.map((activity) => {
    return activity.split(' ').join('-');
  });

  const activitiesString = hype.join("_");
  const url = `${SERVER_NAME}/tag/?activities=${activitiesString}&limit=${limit}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
};

export const arrayToIdKeyedObject = (array) => {
  const obj = {};
  array.forEach( item => {
    obj[item.id] = item;
  });
  return obj;
};


export const sendTaggedTripItems = (items, activities, categories) => {
  const hype = activities.map((activity) => {
    activity.split(' ').join('-');
  });
  const activitiesString = hype.join("_");
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
