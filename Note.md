### ES11

1. Optional Chaining(?.)
   ?. 연산자는 왼쪽 연산자 값이 null이나, undefined 일 경우 실행을 멈추고
   undefined를 return하는 연산자이다.

**장점으로는 존재하지 않을 수도 있는 값에 대하여 예외처리를 쉽게 할 수 있다.**

```js
const data = {
  user: {
    name: "foo",
    getName() {
      return this.name;
    },
  },
};

const user1 = data?.user; // {...}
// 아래와 동일한 동작
const user2 = data !== undefined && data !== null ? data.user : undefined; // {...}

const userName = data?.user.getName?.(); // foo
const firstFriend = data?.user.friends?.[0]; // undefined
```

사용하기 위해선 @babel/plugin-proposal-optional-chaining을 적용하거나,
typescript 3.7.2 버전 이상을 사용 해야 한다.

2. Nullish coalescing Operator(??)
   ??는 왼쪽 피연산자 값이 null이나 undefined일 경우 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 return하는 연산자이다.

기본 값 할당이나 분기처리에서 데이터 맞춰볼때 || 쓰는 부분에서 0, '', NaN 같은 falsy 값들을 유효한 값으로 생각한 경우 예기치 않은 결과가 발생 할 수 있는데, ??를 사용하면 null or undefined인 경우에만 기본 값을 할당해주기 때문에 좀 더 안전한 코드를 작성할 수 있다.

```js
const data = {
  title: "foo",
  desc: "",
};

const description = data.desc ?? "default value"; // ''

const deacription1 = data.desc || "default value"; // default value
```

@babel/plugin-proposal-nullish-coalescing-operator을 적용하거나,
typescript 3.7.2 버전 이상을 사용 해야 합니다.

3. Array.prototype.flat, Array.prototype.flatMap

```js
["abc", "def", ["a", ["b"]]]
  .flat() // ['abc','def','a',['b']]
  [("abc", "def", ["a", ["b"]])].flat(2); // ['abc','def','a','b']
```

4. Optional Catch

```js
try {
  new Error("hello");
} catch (error) {
  console.error("error 안쓰지만");
}

try {
  new Error("hello");
} catch {
  console.error("error 쓰지않아도 사용 가능");
}
```

---

### 함수형 프로그래밍이란 ?

: 부수효과를 방지하고 상태변이를 감소하기 위해 데이터의 제어 흐름과 연산을 추상하는 것

더 작은 조각들로 프로그램을 나눈 후, 전체적으로 더 헤아리기 쉬운 형태의 프로그램으로 다시 조합하는 과정.

**기본 개념**

- 선언적 프로그래밍
- 순수함수
- 참조 투명성
- 불변성

선언적 프로그래밍 패러다임 : 내부적으로 코드를 어떻게 구현했는지, 데이터는 어떻게 흘러가는지 밝힞 않은 채 연산/작업을 표현하는 사상. 자바, C#, C++ 등의 구조적/객체지향 언어가 지원하는 명령형 또는 절차적 모델이 더 많이 쓰인다.

```js
let array = [0,1,2,3,4,5];
for(let i = 0, i < array.elngth; i++){
  array[i] = Math.pow(array[i], 2);
}
array; // -> [0,1,4,9,16,25];
// 명령형 프로그래밍
```

--> 선언적 프로그래밍은 프로그램의 서술부와 평가부를 분리하여, 제어 흐름이나 상태 변화를 특정하지 않고도 프로그램 로직이 무엇인지를 표현식으로 나타낸다.

```js
// es6 람다 표현식
num => Math.pow(num, 2)

// 같은 함수
function(num){
  return Math.pow(num, 2);
}
```

: 루프는 반복할 때마다 값이나 상태가 계속 바뀐다. 그러나 함수형 프로그래밍은 무상태성(statelessness)과 불변성(immutability)을 지향한다. 무상태 코드는 전역 상태를 바꾸거나 혼선을 일으킬 가능성이 단 1%도 없다. 상태를 두지 않으려면 부수효과와 상태 변이를 일으키지 않는 순수함수를 써야 한다.

**불변 데이터 유지하기**
: 자바스크립트의 모든 기본형(원시 자료형)은 처음부터 불변이다. 그러나 배열 등의 객체는 불변이 아니어서 함수 인수로 전달해도 원래 내용이 변경되어 부수효과가 발생할 소지가 남아 있다.

```js
let sortDesc = arr = {
  arr.sort((a, b) => b -a)
}
// 상태적 함수인 Array.sort는 원본 레퍼런스가 가리키는 배열의 원소를 정렬하는 부수효과를 일으킨다.
// 다른 함수를 인수로 받는 함수 -> 고계함수
```
