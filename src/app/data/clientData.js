class Client extends BaseObject {
	constructor(id, name, isMale = true, category = 'None', height = 0, weight = 0)
	{
		this.id = id;
		this.name = name;
		this.isMale = isMale;
		this.category = category;
		this.height = height;
		this.weight = weight;
		this.currentDietIndex = -1;
		this.diets = [];
	}

	addDiet(diet)
	{
		this.diets.push(diet);
		this.currentDietIndex === -1 ? this.currentDietIndex = 0 : null;
	}

	getCurrentDiet()
	{
		return this.currentDietIndex === -1 ? null : this.diets[this.currentDietIndex];
	}
}
