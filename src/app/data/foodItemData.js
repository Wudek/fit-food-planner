class FoodItem extends BaseObject {
	constructor(food = null, quantity = 0, quantityType = null)
	{
		this.food = food;
		this.quantity = quantity;
		this.quantityType = quantityType;
		this.quantityTypes ={
			g: 'g',
			ounce: 'ounce',
			cup:'cup'
		};
	}

	get carbs(){
		return this.food.carbs * this.quantityFactor;
	}

	get protein()
	{
		return this.food.protein* this.quantityFactor;
	}

	get fats()
	{
		return this.food.fats * this.quantityFactor;
	}

	get calories()
	{
		return this.carbs * 4 + this.protein * 4 + this.fats * 9;
	}

	get quantityTypesCollection()
	{
		return [this.quantityTypes.g, this.quantityTypes.ounce, this.quantityTypes.cup];
	}

	get quantityFactor()
	{
		return this.getQuantityFactorFor(this.quantityType);
	}

	getQuantityFactorFor(quantityType)
	{
		//food macros are always calculated by 100g
		switch(quantityType)
		{
			case this.quantityTypes.g:
				return this.quantity / 100;
			case this.quantityTypes.ounce:
				return this.quantity / 3.5274;
			case this.quantityTypes.cup:
				return this.quantity * 1.28;
		}
		return 0;
	}

	adjustQuantity(from, to)
	{
		var fromFactor = this.getQuantityFactorFor(from);
		var toFactor = this.getQuantityFactorFor(to);
		this.quantity *= fromFactor / toFactor;
	}
}