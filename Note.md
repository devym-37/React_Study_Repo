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

5. Bitwise operator (~)
   > ~ 는 -1을 제외한 truthy한 값을 리턴한다.

```js
if (arr.indexOf(item) > -1) {
}

if (~arr.indexOf(item)) {
}
```

6. Object.entries() / Object.values()
   > Object.entries() 는 객체에 담긴 키 / 값 들을 배열에 짝으로 변환한다.

```js
const credits = { producer: "John", director: "Jane", assistant: "Peter" };
const arr = Object.entries(credits);
console.log(arr);
/*
[ [ 'producer', 'John' ],
  [ 'director', 'Jane' ],
  [ 'assistant', 'Peter' ]
]
*/
```

> Object.values()는 Object.entries()와 같은 기능이지만 키 없이 값만 변환

```js
const credits = { producer: "John", director: "Jane", assistant: "Peter" };
const arr = Object.values(credits);
console.log(arr);
// [ 'John', 'Jane', 'Peter' ]
```

7. Pipeline operator
   : 실험적 기능으로, 표현식의 값을 함수에 전달한다. 파이프 연산자를 활용하면 중첩 함수 호출을 좀 더 읽기 좋은 형식으로 작성할 수 있다.

```js
let url = "%21" |> decodeURI;

// equal
let url = decodeURI("%21");

// expression |> function
// 지정한 expression의 값이 function의 유일한 매개변수로 전달된다.

const double = (n) => n * 2;
const increment = (n) => n + 1;

// 파이프 연산자 없이
double(increment(double(double(5)))); // 42

// 파이프 연산자 사용
5 |> double |> double |> increment |> double; // 42
```

---

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

리액트브 패러다임은 옵저버블(observable)이라는 중요한 장치를 매개로 움직인다. 옵저버블을 이용하면 데이터 스트림을 구독해서 원하는 연산을 합성 및 체이닝하여 처리할 수 있다.

**객체지향 자바스크립트**
: 객체 간의 관계를 하위형 혹은 파생형 이라고 표현하는 건, 이들 사이에 존재하는 프로토타입 관계를 의미한다.

- 객체지향은 데이터와 데이터 관계의 본질에 초점
- 함수형은 해야 할 일, 기능에 초점

프로그램의 상태란 어느 한 시점에 찍은 모든 객체에 저장된 데이터의 스냅샷이다. 자바스크립트 객체는 너무나 동적이어서 언제건 속성을 추가, 삭제, 수정할 수 있다.

```js
Object.freeze();
// 를 사용하여 객체를 동결시킬 수 있다. 하지만, 최상위 객체만 동결되는 얕은 동결(shallow freeze)이다.
```

```js
const square = function (x) {
  return x * x;
}; // 익명함수

const square = (x) => x * x; // 람다 표현식

const obj = {
  method: function (x) {
    return x * x;
  },
};
```

sort() 함수는 comparator 함수에 구현된 정렬 기준에 따라 다르게 작동한다. comparator가 0보다 작은 값을 반환하면 p1이 p2 앞으로 온다. comparator가 0을 반환하면 p1,p2 순서는 그대로이다.

**고계 함수**
: 함수도 작동 원리는 일반 객체와 같아서 함수 인수로 전달하거나 함수를 반환받을 수 있다.

클로저는 함수를 선언할 당시의 환경에 함수를 묶어둔 자료구조이다. 함수 선언부의 물리적 위치에 의존하므로 static scope / lexical scope 라고 한다. 함수가 자신을 둘러싼 주변 상태에 접근할 수 있기 때문에 클로저를 이용하면 명확하고 가독성 높은 코드를 작성할 수 있다. 스코프는 일련의 변수 바인딩을 한데 모아 변수가 정의된 코드 영역을 확정하는데, 사실상 클로저는 함수의 스코프를 상속한 것이다.

**메서드 체이닝**
: 메서드 체이닝은 여러 메서드를 단일 구문으로 호출하는 OOP 패턴이다. 대부분 객체지향 프로그램에서 불변 객체에 많이 적용하는 패턴이지만 함수형 프로그래밍에도 잘 맞는다.

**람다 표현식**
: 람다 함수는 여러 줄로도 표기할 수 있지만, 거의 대부분 한줄로 표기.

```js
const name = (p) => p.fullname;
```

**map**
map(collect)은 배열 각 원소에 이터레이터 함수를 적용하여 크기가 같은 새 배열을 반환하는 고계함수이다.

**Mixin**
: 믹스인은 특정 형식과 연관된 함수를 부분적으로 추상한 객체. 믹스인은 OOP 세계에서 다중 상속을 지원하지 않는 언어에서 다중 상속을 모방하거나, 상속 등의 우회책을 쓰지 않아도 코드를 재사용할 수 있게 한다.

> 메서드를 체이닝 (단단한 결합, 제한된 표현성)
> <br /> 함수 파이프라인을 배열 (느슨한 결합, 유연성)

**함수 커링**
: 함수 호출 시 여러 개의 인자를 한 번에 넘기지 않고, 한번에 하나의 인자를 넘기고, 함수를 인자의 개수만큼(여러 번) 호출하는 방식

**setState()**

1. setState()는 비동기로 작동
2. setState()를 연속적으로 호출시 리액트 내부적으로 Batch처리를 한다.
3. setState()를 state객체를 넘겨줄 수 있고, 새로운 state를 반환하는 함수를 인자로 넘겨줄 수 있다.

: state --> object!

```js
const [number, setNumber] = useState(1);

const multiplyBy2AndAddBy1 = () => {
  setNumber(number * 2)
  setNumber(number + 1)
}

const currentState = {
  number : 1
}

const newState = Object.assign(currentState, { number: number * 2 }, {number: number + 1})
// 마지막 객체로 덮어진다.

setNumber(newState);

---

const multiplyBy2AndAddBy1 = () => {
  setNumber(number => number * 2)
  setNumber(number => number + 1)
}

// 이렇게 prevState로 받을 경우 정상 작동 가능

```

**useCallback & useMemo**

1. 함수형 컴포넌트는 그냥 함수다. 함수형 컴포넌트는 단지 jsx를 반환하는 함수이다.
2. 컴포넌트가 렌더링 된다는 것은 누군가가 그 함수를 호출하여서 실행되는 것을 말한다. 함수가 실행될 때마다 내부에 선언되어 있던 표현식도 매번 다시 선언되어 사용된다.
3. 컴포넌트는 자신의 state가 변경되거나, 부모에게서 받는 props가 변경되었을 때마다 리렌더링 된다.(심지어 하위 컴포넌트에 최적화 설정을 해주지 않으면 부모에게서 받는 props가 변경되지 않았더라도 리렌더링 되는게 기본이다.)

#### 성능 향상을 위한 Memoization

- `결과를 캐싱하고, 다음 작업에서 캐싱한 것을 재사용` 하는 비싼 작업의 속도를 높이는 자바스크립트 기술
- `이전 값을 메모리에 저장해 동일한 계산의 반복을 제거해 빠른 처리를 가능하게 하는 기술`
- `캐시에 초기 작업 결과를 저장하여 사용함으로 써 최적화 할 수 있다.` 만약 작업을 다시 수행해야 한다면, 어딘가에 저장되어진 동일한 결과를 단순히 반환 해준다.

#### 언제 React.memo를 사용하지 말아야 하나?

- 일반적으로 class 기반의 컴포넌트를 래핑하는 것도 적절하지 않다. 이 경우 memoization을 해야겠다면, PureComponent를 확장하여 사용하거나 `shouldComponentUpdate()`를 사용 권장

### React Convention

- with~ : 고차 컴포넌트
- set~ : 값 설정
- use~ : Hook API
- PascalCase : type, interface, React component(function, class)
- camelCase : variable(const, let), JavaScript function, custom hook, props
- UPPER_SNAKE_CASE : tuple(as const 등)
- 어떤 값으로부터 다른 값을 계산하는 함수 : get\_\_\_From( ... )
  e.g. getTodayFrom(date: Date, index: number)

### Iterable (feat. Array, Set, Map)

#### Array

```js
const arr = [1, 2, 3];
let iter1 = arr[Symbol.iterator](); // 이터레이터 생성
for (const a of iter1) log(a);

// result : 1 2 3
```

#### Set

```js
const set = new Set([1, 2, 3]);
for (const a of set) log(a);

// result : 1 2 3
```

#### Map

```js
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const a of map) log(a); // result : ["a", 1], ["b", 2], ["c", 3]
for (const a of map.keys()) log(a); // 키 값만 출력됩니다.
for (const a of map.values()) log(a);
for (const a of map.entries()) log(a);
```

- map.keys()는 이터레이터를 리턴. 이 이터레이터는 value에 key만 담는다.
- map.values()는 이터레이터 value에 map의 value 값만 담긴다.
- map.entries()는 map에서 key, value 값을 모두 반환한다.

#### Symbol.iterator

- Symbol을 통해서 어떤 객체에 키로 사용할 수 있다.
- iterable(이터러블) : 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
- iterator(이터레이터) : { value, done } 객체를 리턴하는 next()를 가진 값
- iterable/iterator 프로토콜 : iterable을 for...of, 전개 연산자 등과 함께 동작하도록한 규약

## React 공식 문서

**JSX 이해하기**
: JSX는 React.craeteElement(component, props, ...children)함수에 대한 문법을 제공할 뿐이다.

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>;

//
React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click Me");
// 이렇게 컴파일
```

JSX 태그의 첫 부분은 React element의 타입을 결정한다. 대문자로 시작하는 JSX 태그는 React 컴포넌트를 지정한다. 만약 <Foo />와 같은 JSX 표현을 쓰려고 한다면 Foo가 반드시 스코프 내에 존재해야 한다. `React가 스코프 내에 존재해야 한다` JSX는 React.createElement를 호출하는 코드로 컴파일 되기 때문에 React 라이브러리 역시 JSX 코드와 같은 스코프 내에 존재해야 한다.

Props의 기본값은 "True"이다.

```js
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
// 동일한 표현

function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}

const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
```

**함수를 자식으로 사용하기**
: 보통 JSX에 삽입된 Javascript 표현식은 문자열, React element 혹은 이들의 배열로 환산된다. 하지만, props.children은 다른 prop들과 마찬가지로 React가 렌더링 할 수 있는 데이터의 형태뿐만 아니라 어떤 형태의 데이터도 넘겨질 수 있다. 예시와 같은 컴포넌트가 있다면 props.children을 통해서 콜백을 넘겨받을 수 있다.

```js
// 자식 콜백인 numTimes를 호출하여 반복되는 컴포넌트를 생성합니다.
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

**Portals**
: Portal은 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링하는 최고의 방법을 제공한다.

```js
ReactDOM.createPortal(child, container);
```

첫번째 인자(child)는 엘리먼트, 문자열, 혹은 fragment와 같은 어떤 종류이든 렌더링할 수 있는 React자식이다. 두번째 인자(container)는 DOM 엘리먼트이다.

```js
render() {
  // React는 새로운 div를 마운트하고 그 안에 자식을 렌더링합니다.
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

**Ref와 DOM**
: Ref는 render 메서드에서 생성된 DOM 노드나 React 엘리먼트에 접근하는 방법을 제공한다.
일반적인 React의 데이터 플로우에서 props는 부모 컴포넌트가 자식과 상호작용할 수 있는 유일한 수단이다. 자식을 수정하려면 새로운 props를 전달하여 자식을 다시 렌더링해야 한다. 하지만, 일반적인 데이터 플로우에서 벗어나 직접적으로 자식을 수정해야 하는 경우에 React 컴포넌트의 인스턴스일 수도 있고, DOM 엘리먼트일 수도 있다.

#### Ref를 사용해야 할 때

- 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때
- 애니메이션을 직접적으로 실행시킬 때
- 서드 파티 DOM 라이브러리를 React와 같이 사용할 때

**선언적으로 해결될 수 있는 문제에서는 ref 사용을 지양**

#### Ref를 남용하지 않는다

: ref는 애플리케이션에 '어떤 일이 일어나게'할 때 사용될 수도 있다. 그럴 때는 잠시 멈추고 어느 컴포넌트 계층에서 상태를 소유해야 하는지 신중하게 생각해본다. 대부분의 경우, 상태를 소유해야 하는 적절한 장소가 더 높은 계층이라는 결론이 난다.

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

**Ref에 접근하기**
: render 메서드 안에서 ref가 엘리먼트에게 전달되었을 때, 그 노드를 향한 참조는 ref의 current 어트리뷰트에 담기게 된다.

```js
const node = this.myRef.current;
```

컴포넌트가 마운트될 때 React는 current 프로퍼티에 DOM 엘리먼트를 대입하고, 컴포넌트의 마운트가 해제될 때 current 프로퍼티를 다시 null로 돌려 놓는다. ref를 수정하는 작업은 componentDidMount 또는 componentDidUpdate 생명주기 메서드가 호출되기 전에 이루어진다.

**Ref와 함수 컴포넌트**

- 함수 컴포넌트는 인스턴스가 없기 때문에 함수 컴포넌트에 ref 어트리뷰트를 사용할 수 없다.

```js
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // 이 코드는 동작하지 않습니다.
    return <MyFunctionComponent ref={this.textInput} />;
  }
}
```

: 함수 컴포넌트에 ref에 사용할 수 있도록 하려면, forwardRef를 사용하거나 클래스 컴포넌트로 변경할 수 있다.

다만, DOM엘리먼트나 클래스 컴포넌트의 인스턴스에 접근하기 위해 ref 어트리뷰트를 함수 컴포넌트에서 사용하는 것은 된다.

```js
function CustomTextInput(props) {
  // textInput은 ref 어트리뷰트를 통해 전달되기 위해서
  // 이곳에서 정의되어야만 합니다.
  const textInput = useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}
```

ref 콜백들은 componentDidMount 또는 componentDidUpdate가 호출되기 전에 호출된다.
