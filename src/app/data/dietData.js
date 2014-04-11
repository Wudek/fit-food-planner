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
}