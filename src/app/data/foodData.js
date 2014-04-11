class Food extends BaseObject {
	constructor(name, protein = 0 , carbs = 0, fats = 0)
	{
		this.name = name;
		this.protein = protein;
		this.carbs = carbs;
		this.fats = fats;
	}
}