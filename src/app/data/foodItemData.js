class FoodItem extends BaseObject {
	constructor(food = null, quantity = 0, quantityType = null)
	{
		this.food = food;
		this.quantity = quantity;
		this.quantityType = quantityType;
	}

	getCarbs()
	{
		return this.food.carbs / 100 * this.quantity;
	}

	getProtein()
	{
		return this.food.protein / 100 * this.quantity;
	}

	getFats()
	{
		return this.food.fats / 100 * this.quantity;
	}
}