
// 19.프로토타입 예제 코드




// 19.2 상속과 프로토타입 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function Circle(radius) {
  this.radius = radius;
  this.getArea = function() {
    return Math.PI * this.radius ** 2;
  }
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea); // false 서로 메서드가 다르다. 메모리 따로 차지

//-----------------------

function Circle(radius) {
  this.radius = radius;
}

// 프로포타입에 상속
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);
console.log(circle1.getArea === circle2.getArea); // true 메서드는 단 하나만 생성되어 Circle.prototype 에 메서드로 할당되었다.






// 19.3 프로토타입 객체 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//---------19.3.1 __proto__ 접근자 프로퍼티

// 1. __proto__ 는 접근자 프로퍼티이다.
const obj = {};
const parent = { x: 1 };

console.log(obj.__proto__); // 프로토타입을 반환 
console.log(obj.prototype); // undefined --> because : prototype 객체는 함수객체에서만 생성되기 때문 일반 객체에선 생성 X

obj.__proto__ = parent; // 프로토타입 즉, 부모 유전자를 parent 로 설정

console.log(obj.x); // 1 



// 2. __proto__ 접근자 프로퍼티는 상속을 통해 사용된다.
const person = { name: 'kim' };

console.log(person.hasOwnProperty('__proto__')); // false
// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티이다. 
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__ 를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true



// 3. __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
// 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해 (즉, 양방향 체인(검색) => 검색 무한루프)
// __proto__ 는 상호 참조시 에러를 발생시키기 때문에 
const parent = {};
const child = {};

child.__proto__ = parent;
parent.__proto__ = child; // TypeError : ~~~>.. 


// 4. __proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장 X
// 모든 객체가 __proto__ 를 사용할 수 있는 것이 아니기 때문 , 직접 상속의 경우 Object.prototype을 상속받지 X

// obj 는 체인의 종점이다. 따라서 Object.__proto__을 상속 받을 수 없다.
const obj = Object.create(null); 

console.log(obj.__proto__); // undefined
console.log(Object.getPrototypeOf(obj)); // null 을 제대로 출력

const obj = {};
const parent = { x: 1 };

// __proto__ 를 직접 쓰는 것보다 아래 메서드를 사용하는 것을 권장
Object.getPrototypeOf(obj); // obj.__proto__; 와 같다.
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent; 와 같다. 




//---------19.3.2 함수 객체의 prototype 프로퍼티

// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty('prototype'); //true

// 일반 객체는 소유 x
({}).hasOwnProperty('prototype'); // false 

// 화살표 함수, ES6 메서드 축약 표현도 prototype 프로퍼티 소유 X
const Person = name => {
  this.name = name;
}

console.log(Person.hasOwnProperty('prototype')); // false
console.log(Person.prototype); // undefined

// 화살표 함수, ES6 메서드 축약 표현도 prototype 프로퍼티 소유 X
const obj = {
  foo() {}
};
console.log(obj.foo.hasOwnProperty('prototype')); // false
console.log(obj.foo.prototype); // undefined

//----------------------
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('kim');
// 결국 Person.prototype 과 me.__proto__는 동일한 프로포타입을 가리킨다.
console.log(Person.prototype === me.__proto__); // true



//---------19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수

// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('kim');

// me 객체의 생성자 함수는 Person 이다.
console.log(me.constructor === Person); // true





// 19.4 리터럴 표기법으로 생성된 객체의 생성자 함수와 프로토타입 @@@@@@@@@@@@@@@@@@@@@@@@@@@@





// 19.11 직접 상속 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//---------------------- 19.11.1 Object.create()에 의한 직접 상속

let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null);

//----------

obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype);

//----------


obj = Object.create(null);

obj = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true } 
});

console.log(obj.x);
console.log(Object.getPrototypeOf(obj) === Object.prototype);


const myProto = { x: 10 };

obj = Object.create(myProto);

console.log(obj.x);
console.log(Object.getPrototypeOf(obj) === myProto);

//---------------

function Person(name) {
  this.name = name;
}

obj = Object.create(Person.prototype);
obj.name = 'Lee';
console.log(obj.name);
console.log(Object.getPrototypeOf(obj) === Person.prototype);


//----------------

const obj2 = { a: 10 };

console.log(obj2.hasOwnProperty('a'));
console.log(obj2.propertyIsEnumerable('a'));

//----------------

const obj3 = Object.create(null);
obj3.a = 4;

console.log(Object.getPrototypeOf(obj3) === null);
// console.log(obj3.hasOwnProperty('a'));   // 타입에러가 뜨게 된다.  즉 프로포타입이 최종 목적지인 null 로 Object.prototype와 같은 위치에 있기에 해당 메서드를 사용하지 못하게 된다.

console.log(Object.prototype.hasOwnProperty.call(obj3, 'a')); // 간접 호출 방법 .. 결과값 : true

//---------------- 19.11.2 객체 리터럴 내부에서 __proto__ 를 이용한 직접 상속

const myProto1 = { x: 10 };

const obj4 = {
  y: 20,
  __proto__: myProto1
};

console.log( obj4.y, obj4.x );
console.log(Object.getPrototypeOf(obj4) === myProto1);


// 19.12 정적 프로퍼티 / 메서드 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




function Person(name) {
  this.name = name;

}

// 프로토타입 메서드로 prototype을 함께 써주어 자식들이 체인을 통해 검색이 가능하도록하여 접근이 가능하다. 
Person.prototype.sayHello = function () {
  console.log(`Hello My name is ${this.name}`);
}

Person.staticProp = 'static prop';

// 정적메서드는 prototype 객체를 빼고 Person 생성자 함수 객체에 직접 넣어서 자식들이 체인을 통해 접근할 수 없다.
Person.staticMethod = function () {   
  console.log('This is Static Method!')
};

const me = new Person('Lee');

Person.staticMethod(); // 직접 선언

me.staticMethod(); // 인스턴스가 해당 메서드를 체인을 통해 찾을 수 없어서 TypeError 가 뜬다.

//--------------------------

// Object.create 는 정적메서드로 Object 를 넣어 직접 호출해야한다.
const obj5 = Object.create({ name: 'Lee' }); 

// hasOwnProperty 는 프로포타입에 속한 객체의 메서드(Object.prototype.hasOwnProperty)
obj5.hasOwnProperty('name'); // false;


//--------------------------

// 프로토타입 메서드는 호출하려면 인스턴스를 생성해야 한다.
function Foo() {}

Foo.prototype.x = function () {
  console.log('x')
}

const foo = new Foo();

foo.x();

// 정적 메서드는 인스턴스 생성없이 호출할 수 있다.
Foo.x = function () {
  console.log('y');
};

Foo.x();


// 19.13 프로퍼티 존재 확인  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//---------------19.13.1 in 연산자

const person = {
  name: 'Lee',
  address: 'Seoul'
};

console.log('name' in person); // true
console.log('address' in person); // true
console.log('age' in person); // false

console.log('toString' in person); // true

// ES6 in 연산자 대신 쓸 수 있는 Reflect.has 메서드
console.log(Reflect.has(person, 'name'));
console.log(Reflect.has(person, 'toString'));


//---------------19.13.2 Object.prototype.hasOwnProperty 메서드

console.log(person.hasOwnProperty('name')); // true
console.log(person.hasOwnProperty('age')); // false
console.log(person.hasOwnProperty('toString')); // false 자신의 고유 프로퍼티만 확인 (상속프로퍼티 체인X)





// 19.14 프로퍼티 열거  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//---------------19.14.1 for... in 문
// Syntax: for (변수 선언문 in 객체) {...}

const person = {
  name: 'Lee',
  address: 'Seoul'
}

// for..in 문은 상속 프로퍼티까지 모두 출력하는데 왜 toString 은 안나오는 것인가?
// answer: toString 프로퍼티는 [[Enumerable]] 값이 false 이기 때문이다. 즉, 저 값이 true 일 경우만 출력한다.
for (const key in person) {
  console.log(person[key]); // 값 출력
  console.log(key); // 키 출력
}

// prototype 에 객체 삽입하여 age 프로퍼티를 상속받는다.
person.__proto__ = { age: 40 };


for (const key in person) {
  console.log(key); // 키 출력
  console.log(person[key]); // 값 출력
}
// age 가 출력된다.

//----------------------

// 심볼값인 프로퍼티는 for in 문으로 출력하지 않는다. 
const sym = Symbol();
const obj = {
  a: 1,
  [sym]: 10
};

for (const key in obj) {
  console.log(`${key} : ${obj[key]}`);
} // a: 1 만 출력한다.

//-----------------------

// for...in 문과 Object#hasOwnProperty 메서드 사용하여 고유 프로퍼티만 출력하기
const person = {
  name: 'Lee',
  address: 'Seoul',
  __proto__: { age: 50 }
};

for (const key in person) {
  if (!(person.hasOwnProperty(key))) continue;

  console.log(`${key} : ${person[key]}`);
} // name, address 만 출력



//---------------19.14.2 Object.keys/values/entries (정적)메서드

// 배열로 반환 --> 이 메서드들을 가장 많이 쓰는 것 같다.


const person = {
  name: 'Lee',
  address: 'Seoul',
  __proto__: { age: 50 }
};

console.log(Object.keys(person)); // (2) ['name', 'address'] 
console.log(Object.values(person)); // (2) ['Lee', 'Seoul']
console.log(Object.entries(person)); // (2) [["name", "Lee"], ["address", "Seoul"]]

Object.entries(person).forEach(([key, value]) => console.log(key, value));
/* 
name Lee
address Seoul 
*/