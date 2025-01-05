import { HashSet } from "./HashSet.mjs";

let hashSet = new HashSet();

hashSet.add(1);
hashSet.add(2);
hashSet.add(3);
hashSet.add(11);
hashSet.add(11);

// console.log(hashSet.isContain(1));
hashSet.printAll();
