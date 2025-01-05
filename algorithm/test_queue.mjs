import { Queue } from "./Queue.mjs";

let queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log("====================");
console.log(queue.front());

queue.dequeue();
console.log(queue.front());
queue.dequeue();
queue.dequeue();
queue.dequeue();

console.log("isEmpty", queue.isEmpty());
