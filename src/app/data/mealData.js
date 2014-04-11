class Meal extends BaseObject {
	constructor(name)
	{
		this.name = name;
		this.foodItems = [];
		this.protein = 0;
		this.carbs = 0;
		this.fats = 0;
		this.calories = 0;
	}

	addFoodItem(foodItem)
	{
		this.foodItems.push(foodItem);
		this.calculateMacros();
	}

	calculateMacros()
	{
		var protein = 0, carbs = 0, fats = 0;
		_.forEach(this.foodItems,function (foodItem, total)
		{
			protein += foodItem.getProtein();
			carbs += foodItem.getCarbs();
			fats += foodItem.getFats();
		});
		this.protein = protein;
		this.carbs = carbs;
		this.fats = fats;
		this.calories = protein * 4 + carbs * 4 + fats * 9;
	}

}