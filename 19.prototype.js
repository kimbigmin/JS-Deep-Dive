// 19.프로토타입 예제 코드


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