class Food extends BaseObject {
	constructor(name, protein, carbs, fats, gramsPerCup, gramsPerUnit, gramsPerTablespoon = 14, gramsPerOunce = 28)
	{
		this.name = name;
		this.protein = protein;
		this.carbs = carbs;
		this.fats = fats;
		this.gramsPerCup = gramsPerCup;
		this.gramsPerUnit = gramsPerUnit;
		this.gramsPerTablespoon = gramsPerTablespoon;
		this.gramsPerOunce = gramsPerOunce;
	}
}