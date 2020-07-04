class Chef {
  constructor(name, restaurant) {
    this.name = name;
    this.restaurant = restaurant;
  }

  greetCustomer(customerName, isMorning = false) {
    return isMorning
      ? `Good morning, ${customerName}!`
      : `Hello, ${customerName}!`;
  }

  checkForFood(food) {
    if (this.restaurant.menus[food.type].includes(food)) {
      return `Yes, we're serving ${food.name} today!`;
    }
    return `Sorry, we aren't serving ${food.name} today.`;
  }
}

module.exports = Chef;
