import { HashTable } from "./HashTable.mjs";

class HashSet {
  constructor() {
    this.hashTable = new HashTable();
  }

  add(value) {
    if (this.hashTable.get(value) === null) {
      this.hashTable.set(value, -1);
    }
  }

  isContain(value) {
    return this.hashTable.get(value) !== null;
  }

  remove(value) {
    this.hashTable.remove(value);
  }

  clear() {
    for (let i = 0; i < this.hashTable.size; i++) {
      this.hashTable.table[i].clear();
    }
  }

  isEmpty() {
    for (let i = 0; i < this.hashTable.size; i++) {
      if (this.hashTable.table[i].head !== null) {
        return false;
      }
    }

    return true;
  }

  printAll() {
    for (let i = 0; i < this.hashTable.size; i++) {
      let currentNode = this.hashTable.table[i].head;
      while (currentNode !== null) {
        console.log(currentNode.data.key);
        currentNode = currentNode.next;
      }
    }
  }
}

export { HashSet };
