### ES11
1. Optional Chaining(?.)
?. 연산자는 왼쪽 연산자 값이 null이나, undefined 일 경우 실행을 멈추고
undefined를 return하는 연산자이다.

**장점으로는 존재하지 않을 수도 있는 값에 대하여 예외처리를 쉽게 할 수 있다.**

```js
const data = {
    user: {
        name: 'foo',
        getName() {
            return this.name
        }
    }
}

const user1 = data?.user // {...}
// 아래와 동일한 동작
const user2 = data !== undefined && data !== null ? data.user : undefined // {...}

const userName = data?.user.getName?.() // foo
const firstFriend = data?.user.friends?.[0] // undefined
```

사용하기 위해선 @babel/plugin-proposal-optional-chaining을 적용하거나,
typescript 3.7.2 버전 이상을 사용 해야 한다.

2. Nullish coalescing Operator(??)
??는 왼쪽 피연산자 값이 null이나 undefined일 경우 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 return하는 연산자이다.

기본 값 할당이나 분기처리에서 데이터 맞춰볼때 || 쓰는 부분에서 0, '', NaN 같은 falsy 값들을 유효한 값으로 생각한 경우 예기치 않은 결과가 발생 할 수 있는데, ??를 사용하면 null or undefined인 경우에만 기본 값을 할당해주기 때문에 좀 더 안전한 코드를 작성할 수 있다.

```js
const data = {
    title: 'foo',
    desc: ''
}

const description = data.desc ?? 'default value' // ''

const deacription1 = data.desc || 'default value' // default value

```
@babel/plugin-proposal-nullish-coalescing-operator을 적용하거나, 
typescript 3.7.2 버전 이상을 사용 해야 합니다.

3. Array.prototype.flat, Array.prototype.flatMap
```js
['abc', 'def', ['a',['b']]].flat() // ['abc','def','a',['b']]
['abc', 'def', ['a',['b']]].flat(2) // ['abc','def','a','b']
```

4. Optional Catch
```js
try {
  new Error('hello')
} catch (error) {
  console.error('error 안쓰지만');
}

try {
  new Error('hello');
} catch {
  console.error('error 쓰지않아도 사용 가능');
}

```
