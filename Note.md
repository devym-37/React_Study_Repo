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