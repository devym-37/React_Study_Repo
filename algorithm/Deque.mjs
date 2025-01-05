import { DoubleLinkedList } from "./DoubleLinkedList.mjs";

class Deque {
  constructor() {
    this.list = new DoubleLinkedList();
  }

  addFront(data) {
    this.list.insertAt(0, data);
  }

  addRear(data) {
    this.list.insertAt(this.list.count, data);
  }

  removeFront() {
    try {
      return this.list.deleteAt(0);
    } catch (e) {
      return null;
    }
  }

  removeRear() {
    try {
      return this.list.deleteLast();
    } catch (e) {
      return null;
    }
  }

  front() {
    return this.list.head;
  }

  rear() {
    return this.list.tail;
  }

  printAll() {
    this.list.printAll();
  }

  isEmpty() {
    return this.list.count === 0;
  }
}

export { Deque };
