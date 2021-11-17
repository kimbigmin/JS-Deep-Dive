// 22장 this 코드 예제 정리

// 22.1 this 키워드

const circle = {
    // 프로퍼티
    radius: 5,
    // 메서드
    getDiameter() {
      return 2 * circle.radius;
    }
};

console.log(circle.getDiameter()); // 10

//----

function Circle(radius) {
    this.radius = radius;
}

Circle.prototype.getDiameter = function() {
    return 2 * this.radius;
}

const circle = new Circle(5);
console.log(circle.getDiameter()); // 10

//----

console.log(this);

function square(number) {
  console.log(this); // window
  return number * number;
}

square(2);

const person = {
  name: 'Lee',
  getName() {
    console.log(this); // {name: 'Lee', getName: f} 
    return this.name;
  }
}

console.log(person.getName()); // Lee


function Person(name) {
  this.name = name;

  console.log(this); // Person {name : "Lee"}
}

const me = new Person('Lee');





// 22.2 함수 호출 방식과 this 바인딩

const foo = function () {
    console.dir(this);
};


//1. 일반 함수 호출
foo(); // window

//2. 메서드 호출
const obj = { foo };
obj.foo(); // obj

//3. 생성자 함수 호출
new foo(); // foo {}

//4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
const bar = { name: 'bar' };

foo.call(bar); // bar
foo.apply(bar); // bar
foo.bind(bar)(); // bar


// 22.2.1 일반 함수 호출

function foo() {
  console.log("foo's this: ", this); // window
  function bar() {
      console.log("bar's this: ", this); // window
  }
  bar();
}

foo();


function foo() {
  'use strict';

  console.log("foo's this: ", this); // undefined
  function bar() {
      console.log("bar's this: ", this); // undefined
  }
  bar();
}

foo();


//-----

var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // { value: 100, foo: f }
    console.log("foo's this.value: ", this.value); // 100
    
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }
  
    bar();
  }
};
obj.foo();






// 22.2.2 메서드 호출

// 예제 1
const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
      return this.name;
  }
};

// 메서드 getName을 호출한 객체는 person이다. 
console.log(person.getName()); // Lee


// 예제 2

const anotherPerson = {
  name: 'Kim'
};

anotherPerson.getName = person.getName;

console.log(anotherPerson.getName()); // Kim

const getName = person.getName;

console.log(getName()); // ''


// 예제 3

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person('Lee');

console.log(me.getName()); // 'Lee'

Person.prototype.name = 'Kim';

console.log(Person.prototype.getName()); // Kim