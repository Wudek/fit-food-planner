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
			cup:'cup',
			tablespoon:'tablespoon',
			unit:'unit'
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
		return _.keys(this.quantityTypes);
	}

	get quantityFactor()
	{
		return this.getQuantityFactorFor(this.quantityType);
	}

	getQuantityFactorFor(quantityType)
	{
		//food macros are always calculated per gram
		switch(quantityType)
		{
			case this.quantityTypes.g:
				return this.quantity;
			case this.quantityTypes.ounce:
				return this.quantity * this.food.gramsPerOunce;
			case this.quantityTypes.cup:
				return this.quantity * this.food.gramsPerCup;
			case this.quantityTypes.unit:
				return this.quantity * this.food.gramsPerUnit;
			case this.quantityTypes.tablespoon:
				return this.quantity * this.food.gramsPerTablespoon;
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