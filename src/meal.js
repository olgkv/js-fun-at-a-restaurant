function nameMenuItem(item) {
  return `Delicious ${item}`;
}

function createMenuItem(name, price, type) {
  return { name, price, type };
}

function addIngredients(name, ingredients) {
  if (ingredients.includes(name)) { return; }

  ingredients.push(name);
}

function formatPrice(price) {
  return `$${price}`;
}


function decreasePrice(price) {
  return price * 0.9;
}

function createRecipe(title, ingredients, type) {
  return { title, ingredients, type };
}

module.exports = {
  nameMenuItem,
  createMenuItem,
  addIngredients,
  formatPrice,
  decreasePrice,
  createRecipe,
};
