const { assert } = require('chai');
const Chef = require('../src/Chef');

const { createRestaurant, addMenuItem } = require('../src/restaurant');

describe('Chef (class)', () => {
  it('should instantiate a chef object', () => {
    const hannah = new Chef('Hannah');

    assert.instanceOf(hannah, Chef);
  });

  it('should have a name', () => {
    const chef = new Chef('Hannah');

    assert.equal(chef.name, 'Hannah');
  });

  it('should be able to have a different name', () => {
    const chef = new Chef('Casey');

    assert.equal(chef.name, 'Casey');
  });

  it('should work at a restaurant', () => {
    const restaurant = createRestaurant('Best Bakery Ever');
    const chef = new Chef('Hannah', restaurant);

    assert.equal(chef.name, 'Hannah');
    assert.deepEqual(chef.restaurant, restaurant);
  });

  it('should be able to work at a different restaurant', () => {
    const restaurant = createRestaurant('Amazing Bakery');
    const chef = new Chef('Scott', restaurant);

    assert.deepEqual(chef.restaurant, restaurant);
  });

  it('should be able to great a customer by name', () => {
    const scott = new Chef('Scott');

    assert.equal(scott.greetCustomer('Will'), 'Hello, Will!');
    assert.equal(scott.greetCustomer('Pam'), 'Hello, Pam!');
  });

  it('should greet a customer differently if it is morning', () => {
    const casey = new Chef('Casey');

    assert.equal(casey.greetCustomer('Scott'), 'Hello, Scott!');
    assert.equal(casey.greetCustomer('Amy', true), 'Good morning, Amy!');
    assert.equal(casey.greetCustomer('Hannah', false), 'Hello, Hannah!');
  });

  it('should confirm if a requested item is on the menu', () => {
    const restaurant = createRestaurant('Average Bakery');
    const chef = new Chef('Hannah', restaurant);

    const foodItem = {
      name: 'Cinnamon Rolls',
      price: '4.49',
      type: 'breakfast',
    };

    addMenuItem(chef.restaurant, foodItem);

    const foodConfirmation = chef.checkForFood(foodItem);

    assert.equal(foodConfirmation, "Yes, we're serving Cinnamon Rolls today!");
  });

  it('should confirm if a requested item is not on the menu', () => {
    const restaurant = createRestaurant('Best Bakery Ever');
    const chef = new Chef('Scott', restaurant);

    const foodItem = {
      name: 'Quiche',
      price: '6.49',
      type: 'lunch',
    };

    const foodConfirmation = chef.checkForFood(foodItem);

    assert.equal(foodConfirmation, "Sorry, we aren't serving Quiche today.");
  });
});
