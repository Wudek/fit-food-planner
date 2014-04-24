class Client extends BaseObject {
	constructor(id, name, isMale = true, category = 'None', height = 0, weight = 0)
	{
		this.id = id;
		this.name = name;
		this.isMale = isMale;
		this.category = category;
		this.height = height;
		this.weight = weight;
		this.diet = null;
	}
}
