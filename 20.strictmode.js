// @ 20장 strict mode 코드 예제 @




// 20.1 strict mode란?

function foo() {
  x = 20; // 변수선언 없이 초기화
}

foo();

console.log(global.x); // x는 그대로 출력 




// 20.2 strict mode의 적용

// 1. 스크립트 전체 적용
'use strict';

function foo() {
  x = 20;
}

foo();

// 2. 함수 내부에서만 적용
function foo() {
    'use strict';
  x = 20;
}

foo();

// 3. 선두에 안쓰면 적용 안됨 
function foo() {
  
  x = 20;
  'use strict';   
}

foo();




// 20.3 전역에 strict mode를 적용하는 것은 피하자 (다른 스크립트에 영향 X non-strict, strict 혼용)

console.log(`
<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';
  </script>

  <script>
    x = 1;   // 에러 발생하지 않는다.
    console.log(x); // 1
  </script>

  <script>
    'use strict';

    y = 1; // ReferenceError : y is not defined.
    console.log(y);
  </script>
</body>
</html>
`)

// 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode 적용한다.
(function () {
  'use strict';
  
  //Do something...
})




// 20.4 함수 단위로 strict mode를 적용하는 것도 피하자

(function () {
  // non-strict mode
  var let = 10; // 에러 발생 x 

  function foo() {
    'use strict';

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }

  foo();
}());




// 20.5 strict mode가 발생시키는 에러

// 1. 암묵적 전역
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: 

}());

// 2. 변수, 함수, 매개변수의 삭제 

(function () {
  'use strict';

  var x = 1; 
  delete x; // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a; // SyntaxError: Delete of an unqualified identifier in strict mode.
  }

  delete foo; // SyntaxError: Delete of an unqualified identifier in strict mode.

}());

// 3. 매개변수 이름의 중복

(function () {
  'use strict';

  // SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }

  console.log(foo(1,2));

}());

// 4. with문의 사용

(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }) {
    console.log(x);
  }

}());




// 20.6 strict mode 적용에 의한 변화

// 1. 일반 함수의 this

(function () {
  'use strict';

  function foo() {
    console.log(this); // 전역객체 대신 undefined 를 출력 (생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 떄문)
  }

  foo();

  function Foo() {  // 생성자 함수
    console.log(this); // Foo 출력
  }

  new Foo();

}());

// 2. arguments 객체

(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1}

}(1));