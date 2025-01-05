import { DoubleLinkedList } from "./DoubleLinkedList.mjs";

class HashData {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size).fill(null).map(() => new DoubleLinkedList());
  }

  hashFunction(number) {
    return number % 10;
  }

  set(key, value) {
    const index = this.hashFunction(key);

    this.table[index].insertAt(0, new HashData(key, value));
  }

  get(key) {
    const index = this.hashFunction(key);
    let currentNode = this.table[index].head;

    while (currentNode != null) {
      if (currentNode.data.key === key) {
        return currentNode.data.value;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  remove(key) {
    let index = this.hashFunction(key);
    let currentNode = this.table[index].head;
    let deletedIndex = 0;

    while (currentNode != null) {
      if (currentNode.data.key === key) {
        return this.table[index].deleteAt(deletedIndex);
      }

      currentNode = currentNode.next;
      deletedIndex++;
    }

    return false;
  }

  printAll() {
    for (let i = 0; i < this.size; i++) {
      console.log(`인덱스 ${i}: `);
      this.table[i].printAll();
    }
  }
}

export { HashTable };
