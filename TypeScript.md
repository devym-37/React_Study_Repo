# TypeScript

#### 타입 지정

: 타입스크립트는 일반 변수, 매개 변수(Parameter), 객체 속성(Property) 등에 `: TYPE`과 같은 형태로 타입을 지정할 수 있다.

```js
function someFunc(a: TYPE_A, b: TYPE_B): TYPE_RETURN {
  return a + b;
}
let some: TYPE_SOME = someFunc(1, 2);
```

#### 타입 선언

1. Boolean

```js
let isBoolean: boolean;
let isDone: boolean = false;
```

2. Number

```js
let num: number;
let integer: number = 6;
let float: number = 3.14;
let hex: number = 0xf00d; // 61453
let binary: number = 0b1010; // 10
let octal: number = 0o744; // 484
let infinity: number = Infinity;
let nan: number = NaN;
```

3. String

```js
let str: string;
let red: string = 'Red';
let green: string = 'Green';
let myColor: string = `My color is ${red}.`;
let yourColor: string = 'Your color is' + green;
```

4. Array

```js
// 문자열만 가지는 배열
let fruits: string[] = ['Apple', 'Banana', 'Mango'];
// Or
let fruits: Array<string> = ['Apple', 'Banana', 'Mango'];

// 숫자만 가지는 배열
let oneToSeven: number[] = [1, 2, 3, 4, 5, 6, 7];
// Or
let oneToSeven: Array<number> = [1, 2, 3, 4, 5, 6, 7];

// 다중 타입 선언
let array: (string | number)[] = ['Apple', 1, 2, 'Banana', 'Mango', 3];
// Or
let array: Array<string | number> = ['Apple', 1, 2, 'Banana', 'Mango', 3];

// 항목의 값을 단언할 수 없다면
let someArr: any[] = [0, 1, {}, [], 'str', false];

// 인터페이스나 커스텀 타입을 사용할 수도 있다
interface IUser {
  name: string;
  age: number;
  isValid: boolean;
}
let userArr: IUser[] = [
  {
    name: 'Neo',
    age: 85,
    isValid: true,
  },
  {
    name: 'Lewis',
    age: 52,
    isValid: false,
  },
  {
    name: 'Evan',
    age: 36,
    isValid: true,
  },
];

// 읽기 전용 배열을 생성할 수도 있다
let arrA: readonly number[] = [1, 2, 3, 4];
let arrB: ReadonlyArray<number> = [0, 9, 8, 7];

arrA[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
arrA.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.

arrB[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
arrB.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.
```

#### Tuple

: 배열과 매우 유사하다. 하지만 `정해진 타입의 고정된 길이 배열`을 표현한다

```js
let tuple: [string, number];
tuple = ['a', 1];
tuple = ['a', 1, 2]; // Error - TS2322
tuple = [1, 'a']; // Error - TS2322

// 데이터를 개별 변수로 지정하지 않고, 단일 tuple타입으로 지정해 사용할 수 있다
// Variables
let userId: number = 1234;
let userName: string = 'HEROPY';
let isValid: boolean = true;

// Tuple
let user: [number, string, boolean] = [1234, 'HEROPY', true];
console.log(user[0]); // 1234
console.log(user[1]); // 'HEROPY'
console.log(user[2]); // true

let tuple: [1, number];
tuple = [1, 2];
tuple = [1, 3];
tuple = [2, 3]; // Error - TS2322: Type '2' is not assignable to type '1'.
```

Tuple은 `정해진 타입의 고정된 길이 배열`을 표현하지만, 이는 할당에 국한된다. `.push() / .splice()` 등을 통해 값을 넣는 행위는 막을 수 있다

```js
let tuple: [string, number];
tuple = ['a', 1];
tuple = ['b', 2];
tuple.push(3);
console.log(tuple); // ['b', 2, 3];
tuple.push(true); // Error - TS2345: Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

#### Unknown

: Any와 같이 최상위 타입인 Unknown은 알 수 없는 타입을 의미한다. 어떤 타입의 값도 할당할 수 있지만, 다른 타입에는 할당할 수 없다.

```js
let a: any = 123;
let u: unknown = 123;

let v1: boolean = a; // 모든 타입(any)은 어디든 할당할 수 있습니다.
let v2: number = u; // 알 수 없는 타입(unknown)은 모든 타입(any)을 제외한 다른 타입에 할당할 수 없습니다.
let v3: any = u; // OK!
let v4: number = u as number; // 타입을 단언하면 할당할 수 있습니다.
```

#### Null / Undefined

: 기본적으로 Null과 Undefined는 모든 타입의 하위 타입으로, 다음과 같이 각 타입에 할당할 수 있다.

```js
let num: number = undefined;
let str: string = null;
let obj: { a: 1, b: false } = undefined;
let arr: any[] = null;
let und: undefined = null;
let nul: null = undefined;
let voi: void = null;
// ...
```

#### Void

: void는 일반적으로 값을 반환하지 않는 함수에서 사용한다. 값을 반환하지 않는 함수는 실제로는 undefined를 반환한다.

```js
function hello(msg: string): void {
  console.log(`Hello ${msg}`);
}

function hello(msg: string): void {
  console.log(`Hello ${msg}`);
}
const hi: void = hello('world'); // Hello world
console.log(hi); // undefined
```

#### Intersection

: `&`를 사용해 2개 이상의 타입을 조합하는 경우, 이를 인터섹션이라고 한다. 인터섹션은 새로운 타입을 생성하지 않고 기존의 타입들을 조합할 수 있기 때문에 유용하지만, 자주 사용되는 방법은 아니다.

```js
// 기존 타입들이 조합 가능하다면 인터섹션을 활용할 수 있습니다.
interface IUser {
  name: string;
  age: number;
}
interface IValidation {
  isValid: boolean;
}
const heropy: IUser = {
  name: 'Heropy',
  age: 36,
  isValid: true, // Error -  TS2322: Type '{ name: string; age: number; isValid: boolean; }' is not assignable to type 'IUser'.
};
const neo: IUser & IValidation = {
  name: 'Neo',
  age: 85,
  isValid: true,
};

// 혹은 기존 타입(IUser, IValidation)과 비슷하지만, 정확히 일치하는 타입이 없다면 새로운 타입을 생성해야 합니다.
interface IUserNew {
  name: string;
  age: number;
  isValid: boolean;
}
const evan: IUserNew = {
  name: 'Evan',
  age: 36,
  isValid: false,
};
```

#### Function

```js
// myFunc는 2개의 숫자 타입 인수를 가지고, 숫자 타입을 반환하는 함수.
let myFunc: (arg1: number, arg2: number) => number;
myFunc = function (x, y) {
  return x + y;
};

// 인수가 없고, 반환도 없는 경우.
let yourFunc: () => void;
yourFunc = function () {
  console.log('Hello world~');
};
```

#### 타입 추론(Inference)

: 명시적으로 타입 선언이 되어있지 않은 경우, 타입스크립트는 타입을 추론해 제공한다. (추론: 어떠한 판단을 근거로 삼아 다른 판단을 이끌어 낸다)

- 초기화된 변수
- 기본값이 설정된 매개 변수
- 반환 값이 있는 함수

```js
// 초기화된 변수 `num`
let num = 12;

// 기본값이 설정된 매개 변수 `b`
function add(a: number, b: number = 2): number {
  // 반환 값(`a + b`)이 있는 함수
  return a + b;
}
```
