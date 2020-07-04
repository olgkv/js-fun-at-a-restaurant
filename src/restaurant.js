function createRestaurant(name) {
  return {
    name,
    menus: {
      breakfast: [],
      lunch: [],
      dinner: [],
    },
  };
}

function addMenuItem(restaurant, item) {
  if (restaurant.menus[item.type].includes(item)) {
    return;
  }

  restaurant.menus[item.type].push(item);
}

function removeMenuItem(restaurant, name, type) {
  if (typeof type === 'undefined') {
    return `Sorry, we don't sell ${name}, try adding a new recipe!`;
  }

  const result = [];
  let message = '';

  for (const item of restaurant.menus[type]) {
    if (item.name !== name) {
      result.push(item);
    }

    if (item.name === name) {
      message += `No one is eating our ${name} - it has been removed from the ${type} menu!`;
    }
  }

  restaurant.menus[type] = result;

  return message;
}

module.exports = {
  createRestaurant,
  addMenuItem,
  removeMenuItem,
};
