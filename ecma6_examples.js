//https://github.com/google/traceur-compiler/wiki/LanguageFeatures#arrow-functions
//Array Comprehension
var array = [for (x of [0, 1, 2]) for (y of [0, 1, 2]) x + '' + y];

//Arrow Functions
var square = (x) => {
	return x * x;
};
var square2 = x => x * x;

//Classes
class Character {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Monster extends Character {
	constructor(x, y, name)
	{
		super(x, y);
		this.name = name;
	}
}

var m = new Monster(1,2,'monster_name');

//Default Parameters
function f(list, indexA = 0, indexB = list.length) {
  return [list, indexA, indexB];
}

// Iterators and For Of
var res = [];
for (var element of [1, 2, 3]) {
  res.push(element * element);
}
expect(res).to.be.eql([1, 4, 9]);

//Property Method Assignment
var object = {
  value: 42,
  toString() {
    return this.value;
  }
};
expect(object.toString()).to.be.eql(42);

//Object Initializer Shorthand
function getPoint() {
  var x = 1;
  var y = 10;

  return {x, y};
}
expect(getPoint()).to.be.eql({
  x: 1,
  y: 10
});

//Rest Parameters
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
  });
}
var res = [];
push(res, 1, 2, 3);
expect(res).to.be.eql([1, 2, 3]);

//Spread Parameters
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

var numbers = [4, 38];

expect(add(...numbers)).to.be.eql(42);
var a = [1];
var b = [2, 3, 4];
var c = [6, 7];
var d = [0, ...a, ...b, 5, ...c];
expect(d).to.be.eql([0, 1, 2, 3, 4, 5, 6, 7]);

//Template Literals
var name = 'world';
var greeting = `hello ${name}`;
expect(greeting).to.be.eql('hello world');