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

	getCarbs()
	{
		return this.food.carbs * this.getQuantityFactor();
	}

	getProtein()
	{
		return this.food.protein* this.getQuantityFactor();
	}

	getFats()
	{
		return this.food.fats * this.getQuantityFactor();
	}

	getQuantityTypes()
	{
		return [this.quantityTypes.g, this.quantityTypes.ounce, this.quantityTypes.cup];
	}

	getQuantityFactor()
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