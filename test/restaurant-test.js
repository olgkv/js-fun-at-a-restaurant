const chai = require('chai');

const { assert } = chai;

const {
  createRestaurant,
  addMenuItem,
  removeMenuItem,
} = require('../src/restaurant');

describe('restaurant.js', () => {
  describe('createRestaurant', () => {
    it('should be a function', () => {
      assert.isFunction(createRestaurant);
    });

    it('should have a name', () => {
      const pizzaRestaurant = createRestaurant('Sexy Pizza');
      assert.equal(pizzaRestaurant.name, 'Sexy Pizza');
    });

    it('should be able to have a different name', () => {
      const arepaRestaurant = createRestaurant('Quiero Arepas');

      assert.equal(arepaRestaurant.name, 'Quiero Arepas');
    });

    it('should have menus', () => {
      const pizzaRestaurant = createRestaurant('Sexy Pizza');

      assert.isObject(pizzaRestaurant.menus);
    });

    it('should have different types of menus', () => {
      const pizzaRestaurant = createRestaurant('Sexy Pizza');

      assert.deepEqual(pizzaRestaurant.menus.breakfast, []);
      assert.deepEqual(pizzaRestaurant.menus.lunch, []);
      assert.deepEqual(pizzaRestaurant.menus.dinner, []);
    });
  });

  describe('addMenuItem', () => {
    it('should be a function', () => {
      assert.isFunction(addMenuItem);
    });

    it('should add an item to the lunch menu', () => {
      const pizzaRestaurant = createRestaurant('Sexy Pizza');
      const bbqPizza = {
        name: 'BBQ Chicken',
        price: '12.49',
        type: 'lunch',
      };

      addMenuItem(pizzaRestaurant, bbqPizza);

      assert.equal(pizzaRestaurant.menus.lunch[0], bbqPizza);
    });

    it('should add menu items to the correct menu automatically', () => {
      const pizzaRestaurant = createRestaurant('Sexy Pizza');
      const bbqPizza = {
        name: 'BBQ Chicken Pizza',
        price: '12.49',
        type: 'lunch',
      };

      const baconEggsPizza = {
        name: 'Bacon and Eggs Pizza',
        price: '13.49',
        type: 'breakfast',
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);

      assert.equal(pizzaRestaurant.menus.lunch[0], bbqPizza);
      assert.equal(pizzaRestaurant.menus.breakfast[0], baconEggsPizza);
    });

    it("shouldn't add the same menu item more than once", () => {
      const pizzaRestaurant = createRestaurant('Sexy Pizza');
      const bbqPizza = {
        name: 'BBQ Chicken Pizza',
        price: '12.49',
        type: 'lunch',
      };

      const baconEggsPizza = {
        name: 'Bacon and Eggs Pizza',
        price: '13.49',
        type: 'breakfast',
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);

      assert.deepEqual(pizzaRestaurant.menus, {
        breakfast: [baconEggsPizza],
        lunch: [bbqPizza],
        dinner: [],
      });
    });
  });

  describe('removeMenuItem', () => {
    it('should be a function', () => {
      assert.isFunction(removeMenuItem);
    });

    it('should remove an item from the menu to update it', () => {
      const pizzaRestaurant = createRestaurant('Sexy Pizza');
      const bbqPizza = {
        name: 'BBQ Chicken Pizza',
        price: '12.49',
        type: 'lunch',
      };

      const veggiePizza = {
        name: 'Veggie Pizza',
        price: '11.49',
        type: 'dinner',
      };

      const baconEggsPizza = {
        name: 'Bacon and Eggs Pizza',
        price: '13.49',
        type: 'breakfast',
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, veggiePizza);

      const result = removeMenuItem(
        pizzaRestaurant,
        'Bacon and Eggs Pizza',
        'breakfast',
      );

      assert.deepEqual(pizzaRestaurant.menus, {
        breakfast: [],
        lunch: [bbqPizza],
        dinner: [veggiePizza],
      });
      assert.equal(
        result,
        'No one is eating our Bacon and Eggs Pizza - it has been removed from the breakfast menu!',
      );
    });

    it('should remove a different item from the menu to update it', () => {
      const pizzaRestaurant = createRestaurant('Sexy Pizza');
      const bbqPizza = {
        name: 'BBQ Chicken Pizza',
        price: '12.49',
        type: 'lunch',
      };

      const veggiePizza = {
        name: 'Veggie Pizza',
        price: '11.49',
        type: 'dinner',
      };

      const baconEggsPizza = {
        name: 'Bacon and Eggs Pizza',
        price: '13.49',
        type: 'breakfast',
      };

      addMenuItem(pizzaRestaurant, bbqPizza);
      addMenuItem(pizzaRestaurant, baconEggsPizza);
      addMenuItem(pizzaRestaurant, veggiePizza);

      const result = removeMenuItem(pizzaRestaurant, 'Veggie Pizza', 'dinner');

      assert.deepEqual(pizzaRestaurant.menus, {
        breakfast: [baconEggsPizza],
        lunch: [bbqPizza],
        dinner: [],
      });
      assert.equal(
        result,
        'No one is eating our Veggie Pizza - it has been removed from the dinner menu!',
      );
    });

    it('should only remove a menu item if it is on the menu', () => {
      const arepaRestaurant = createRestaurant('Quiero Arepas');
      const error = removeMenuItem(arepaRestaurant, "Mom's Spaghetti");

      assert.equal(
        error,
        "Sorry, we don't sell Mom's Spaghetti, try adding a new recipe!",
      );
    });
  });
});
