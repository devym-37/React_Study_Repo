import { Stack } from "./Stack.mjs";

let stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log(stack.pop().data);
console.log(stack.pop().data);
console.log(stack.pop().data);
console.log(stack.pop().data);

console.log("=====================");

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log("peek:", stack.peek().data);

console.log("=====================");

console.log("isEmpty:", stack.isEmpty());
