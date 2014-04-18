class FoodItem extends BaseObject {
	constructor(food = null, quantity = 0, quantityType = null)
	{
		this.food = food;
		this.quantity = quantity;
		this.quantityType = quantityType === null ? this.quantityTypes.g : quantityType;
	}

	get quantityTypes()
	{
		return {
			g: 'g',
			ounce: 'ounce',
			cup:'cup'
		};
	}

	get food()
	{
		return this._food;
	}

	set food(value)
	{
		this._food = value;
	}

	get carbs(){
		return this.food ? this.food.carbs * this.quantityFactor : 0;
	}

	get protein()
	{
		return this.food ? this.food.protein* this.quantityFactor : 0;
	}

	get fats()
	{
		return this.food ? this.food.fats * this.quantityFactor : 0;
	}

	get calories()
	{
		return this.carbs * 4 + this.protein * 4 + this.fats * 9;
	}

	set quantityType(value)
	{
		this.adjustQuantity(this._quantityType, value);
		this._quantityType = value;
	}

	get quantityType()
	{
		return this._quantityType;
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
		if(from !== undefined && to !== undefined)
		{
			var fromFactor = this.getQuantityFactorFor(from);
			var toFactor = this.getQuantityFactorFor(to);
			this.quantity *= fromFactor / toFactor;
		}
	}
}