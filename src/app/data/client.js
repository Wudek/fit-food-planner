class Client{
	constructor(id, name, isMale = true, category = '', height = 0, weight = 0, details = {}){
		this.id = id;
		this.name = name;
		this.isMale = isMale;
		this.category = '';
		this.height = height;
		this.weight = weight;
		this.details = details;
	}

//	get isAlive() { return true; }
//	print() {
//		console.log(this.name);
//	}
	getJson(){
		return JSON.stringify(this);
	}

}
