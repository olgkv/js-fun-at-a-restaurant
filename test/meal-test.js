const chai = require('chai');

const { assert } = chai;

const {
  nameMenuItem,
  createMenuItem,
  addIngredients,
  formatPrice,
  decreasePrice,
  createRecipe,
} = require('../src/meal');

describe('meal.js', () => {
  describe('nameMenuItem', () => {
    it('should be a function', () => {
      assert.isFunction(nameMenuItem);
    });

    it('should take in a name and make a delicious name', () => {
      const menuItemName = nameMenuItem('Pizza');
      assert.equal(menuItemName, 'Delicious Pizza');
    });

    it('should be able to create many delicious titles', () => {
      const burritoItem = nameMenuItem('Burrito');
      const sushiItem = nameMenuItem('Pizza');
      const tacoItem = nameMenuItem('Taco');

      assert.equal(burritoItem, 'Delicious Burrito');
      assert.equal(sushiItem, 'Delicious Pizza');
      assert.equal(tacoItem, 'Delicious Taco');
    });
  });

  describe('createMenuItem', () => {
    it('should be a function', () => {
      assert.isFunction(createMenuItem);
    });

    it('should create a menu item object', () => {
      const menuItemName = nameMenuItem('French Toast');
      const menuItem = createMenuItem(menuItemName, 10.99, 'breakfast');

      assert.equal(menuItem.name, 'Delicious French Toast');
      assert.equal(menuItem.price, 10.99);
      assert.equal(menuItem.type, 'breakfast');
    });
  });

  describe('addIngredients', () => {
    it('should be a function', () => {
      assert.isFunction(addIngredients);
    });

    it('should be able to add ingredients to an array', () => {
      const ingredients = [];

      addIngredients('cheese', ingredients);

      assert.equal(ingredients.length, 1);
      assert.deepEqual(ingredients, ['cheese']);
    });

    it('should be able to add ingredients to an array that already contains ingredients', () => {
      const ingredients = [];

      addIngredients('cheese', ingredients);
      addIngredients('peppers', ingredients);

      assert.equal(ingredients.length, 2);
      assert.deepEqual(ingredients, ['cheese', 'peppers']);
    });

    it('should only add unique ingredients', () => {
      const ingredients = [];

      addIngredients('cheese', ingredients);
      addIngredients('peppers', ingredients);
      addIngredients('peppers', ingredients);

      assert.equal(ingredients.length, 2);
      assert.deepEqual(ingredients, ['cheese', 'peppers']);
    });
  });

  describe('formatPrice', () => {
    it('should be a function', () => {
      assert.isFunction(formatPrice);
    });

    it('should add a dollar sign in front of the price', () => {
      const menuItemName = nameMenuItem('French Toast');
      const menuItem = createMenuItem(menuItemName, 10.99, 'breakfast');
      const initialPrice = menuItem.price;

      const formattedPrice = formatPrice(initialPrice);
      assert.equal(formattedPrice, '$10.99');
    });

    it('should add a dollar sign in front of a different price', () => {
      const menuItemName = nameMenuItem('Carrot Cake');
      const menuItem = createMenuItem(menuItemName, 5.99, 'dessert');
      const initialPrice = menuItem.price;

      const formattedPrice = formatPrice(initialPrice);
      assert.equal(formattedPrice, '$5.99');
    });
  });

  describe('decreasePrice', () => {
    it('should be a function', () => {
      assert.isFunction(decreasePrice);
    });

    it('should decrease the price by 10%', () => {
      const menuItemName = nameMenuItem('Fajitas');
      const menuItem = createMenuItem(menuItemName, 6.0, 'dessert');
      const decreasedPrice = decreasePrice(menuItem.price);

      assert.equal(decreasedPrice, 5.4);
    });
  });

  describe('createRecipe', () => {
    it('should be a function', () => {
      assert.isFunction(createRecipe);
    });

    it('should return a recipe object', () => {
      const ingredients = [];
      addIngredients('eggs', ingredients);
      addIngredients('bacon', ingredients);

      const title = nameMenuItem('Eggs & Bacon');
      const price = formatPrice('10.85');
      const menuItem = createMenuItem(title, price, 'breakfast');
      const menuItemType = menuItem.type;

      const recipe = createRecipe(title, ingredients, menuItemType);
      assert.equal(recipe.title, 'Delicious Eggs & Bacon');
      assert.deepEqual(recipe.ingredients, ['eggs', 'bacon']);
      assert.equal(recipe.type, 'breakfast');
    });
  });
});
