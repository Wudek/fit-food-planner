class Diet extends BaseObject {
	constructor(name)
	{
		this.name = name;
		this.meals = [];
	}

	addMeal(meal)
	{
		this.meals.push(meal);
	}

	get protein(){
		return _.reduce(this.meals, (sum, meal) =>meal.protein + sum , 0);
	}
	get carbs(){
		return _.reduce(this.meals, (sum, meal) =>meal.carbs + sum , 0);
	}
	get fats(){
		return _.reduce(this.meals, (sum, meal) =>meal.fats + sum , 0);
	}
	get calories(){
		return _.reduce(this.meals, (sum, meal) =>meal.calories + sum , 0);
	}
}