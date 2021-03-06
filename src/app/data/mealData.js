class Meal extends BaseObject {
	constructor(name)
	{
		this.name = name;
		this.foodItems = [];
	}

	addFoodItem(foodItem)
	{
		this.foodItems.push(foodItem);
	}

	removeFoodItem(value)
	{
		_.remove(this.foodItems, (foodItem) => foodItem === value);
	}

	get protein(){
		return _.reduce(this.foodItems, (sum, foodItem) =>foodItem.protein + sum , 0);
	}
	get carbs(){
		return _.reduce(this.foodItems, (sum, foodItem) =>foodItem.carbs + sum , 0);
	}
	get fats(){
		return _.reduce(this.foodItems, (sum, foodItem) =>foodItem.fats + sum , 0);
	}
	get proteinCalories(){
		return this.protein * 4;
	}
	get carbsColories(){
		return this.carbs * 4;
	}
	get fatsColories(){
		return this.fats * 9;
	}
	get calories(){
		return _.reduce(this.foodItems, (sum, foodItem) =>foodItem.calories + sum , 0);
	}

}