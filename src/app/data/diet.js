class Diet{
	constructor(name){
		this.name = name;
	}

	get isAlive() { return true; }
	print() {
		console.log(this.name);
	}
}