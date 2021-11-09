// 21장 빌트인 객체 예제 코드

// 21.2 표준 필트인 객체

// 예제 1
const strObj = new String('Lee'); // String {"Lee"}
console.log(typeof strObj); // object

const numObj = new Number(123); // Number {123}
console.log(typeof numObj); // object

// ... 등


// 예제 2
const strObj = new String('Lee');

console.log(Object.getPrototypeOf(strObj) === String.prototype); // true


// 예제 3
const numObj = new Number(1.5);

// toFixed는 Number.prototype의 프로토타입 메서드이다. 소수점 자리 반올림하여 문자열로 반환
console.log(numObj.toFixed()); // 2

// Number.isInteger은 인수가 정수인지 검사하여 그 결과를 불리언으로 반환
console.log(Number.isInteger(0.5)); // false     



// 21.3 원시값과 래퍼 객체

//예제 1

const str = 'hello';
// 원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작한다.
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO

console.log(typeof str); // string


//예제 2

const str = 'hello';

//래퍼객체 암묵적 생성
str.name = 'Lee';

// 다시 원시값으로 돌아왔기 때문에 찾을 수 없다.
console.log(str.name); // undefined

console.log(typeof str); // string hello


// 예제 3

const num = 1.5;

// string 래퍼 객체로 변환 
console.log(num.toFixed()); // 2

// 다시 원시값으로 전환
console.log(typeof num, num); // number 1.5




// 21.4 전역 객체

// 예제 1
window.parseInt('F', 16); // 15
// window 생략 가능
parseInt('F', 16); // 15

window.parseInt === parseInt; // true


// 예제 2
var foo = 1;
console.log(window.foo); // 1

bar = 2; // window.bar = 2
console.log(window.bar); // 2

function baz() { return 3; }
console.log(window.baz()); // 3


// 예제 3

let foo = 3;
console.log(window.foo); // undefined




// 21.4.1 빌트인 전역 프로퍼티

// Infinity

console.log(window.Infinity === Infinity); // true

console.log(3/0); // Infinity 양의 무한대
console.log(-3/0); // -Infinity 음의 무한대
console.log(typeof Infinity); // number


// NaN

console.log(window.NaN); // NaN

console.log(Number('xyz')); // NaN
console.log(1 * 'string'); // NaN
console.log(typeof NaN); // number


// undefined

console.log(window.undefined);

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined





// 21.4.2 빌트인 전역 함수


// eval 생략


// isFinite

isFinite(0); // true
isFinite(2e64); // true
isFinite('10'); // true : '10' -> 10
isFinite(null); // true : null -> 0

isFinite(Infinity); // false
isFinite(-Infinity); // false

isFinite(NaN); // false
isFinite('Hello'); // false
isFinite('2005/12/12'); // false

console.log(+null); // 0


// isNaN

isNaN(NaN); // true
isNaN(10); // false

isNaN('blabla'); // true: 'blabla' => NaN
isNaN('10'); // false: '10' -> 10
isNaN(''); // false : '' -> 0
isNaN(' '); // false : ' ' -> 0

isNaN(true); // false: true -> 1
isNaN(false); // false: false -> 0

isNaN(null); // false: null -> 0

isNaN(undefined); // true 
isNaN({}); // true

isNaN(new Date()); // false: number
isNaN(new Date().toString()); // true


// parseFloat

parseFloat('3.14'); // 3.14

parseFloat('34 45 66'); // 34
parseFloat('40 years'); // 40

parseFloat('He was 40'); // NaN
parseFloat('  60  '); // 60


// parseInt

parseInt('10'); // 10
parseInt('10.124') // 10

// 2진수로 해석후 10진수로 반환
parseInt('10', 2); // 2

// 8진수로 해석후 10진수로 반환
parseInt('10', 8); // 8

// 16진수로 해석후 10진수로 반환
parseInt('10', 16); // 16


// 10진수 -> 2,8,16 진수 변환

const x = 15;

// 2진수로 변환후 문자열로 반환
x.toString(2); // '1111'
parseInt(x.toString(2), 2); // 15 다시 10진수로 반환


// 8진수로 변환후 문자열로 반환
x.toString(8); // '17'
parseInt(x.toString(8), 8); // 15 다시 10진수로 반환


// 2진수로 변환후 문자열로 반환
x.toString(16); // 'f'
parseInt(x.toString(16), 16); // 15 다시 10진수로 반환

x.toString(); // 15 


parseInt('0xf'); // 15
parseInt('f', 16); // 15

parseInt('0b10'); // 0  : 2진수 리터럴은 제대로 해석하지 못한다.. 0 이후가 무시
parseInt('0o10'); // 0  : 8진수 리터럴은 제대로 해석 X 0 이후가 무시

// 위예제 말고 이 예제로 변환해야한다.
parseInt('10', 2); // 2
parseInt('10', 8); // 8 



// encodeURI / decodeURI

// encode
const uri = 'http://example.com?name=이웅모&job=programmer&teacher';

const enc = encodeURI(uri);
console.log(enc); // http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher


// decode

const uri = 'http://example.com?name=이웅모&job=programmer&teacher';

const enc = encodeURI(uri);
console.log(enc); // http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

const dec = decodeURI(enc);
console.log(dec); // 'http://example.com?name=이웅모&job=programmer&teacher';



// encodeURIComponent / decodeURIComponent

const uriComp = 'name=이웅모&job=programmer&teacher';

let enc = encodeURIComponent(uriComp);

console.log(enc); // name%3D%EC%9D%B4%EC%9B%85%EB%AA%A8%26job%3Dprogrammer%26teacher

let dec = decodeURIComponent(enc);
console.log(dec); // name=이웅모&job=programmer&teacher






// 21.4.3 암묵적 전역


// 예제 1
var x = 10; // 전역 변수

function foo () {
  y = 20;  // 선언하지 않은 식별자에 값 할당 => window.y = 20;
}

foo();

console.log(x + y); // 30 : 선언 안한 식별자 y를 전역에서 참조 가능


// 예제 2
console.log(x); // undefined : 호이스팅 발생

console.log(y); // ReferenceError : y is not defined

var x = 10; // 전역 변수

function foo () {
  y = 20;
}

foo();

console.log(x + y); // 30



// 예제 3

var x = 10; // 전역 변수

function foo () {
  y = 20;
}

foo();

console.log(window.x); // 10
console.log(window.y); // 20

delete x; // 삭제 x
delete y; // 삭제 o

console.log(window.x); // 10
console.log(window.y); // undefined








