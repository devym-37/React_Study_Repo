import { HashTable } from "./HashTable.mjs";

let hashTable = new HashTable();

hashTable.set(1, "첫 번째");
hashTable.set(2, "두 번째");
hashTable.set(3, "세 번째");
hashTable.set(11, "열한 번째");

console.log(hashTable.get(1));
console.log(hashTable.get(2));
console.log(hashTable.get(3));
console.log(hashTable.get(11));

hashTable.remove(1);
hashTable.remove(2);
hashTable.remove(3);
hashTable.remove(11);

console.log(hashTable.get(1));
console.log(hashTable.get(2));
console.log(hashTable.get(3));
console.log(hashTable.get(11));
