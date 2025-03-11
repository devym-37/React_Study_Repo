import { BinaryTree } from "./binaryTree.mjs";

let tree1 = new BinaryTree(1);
let tree2 = new BinaryTree(2);
let tree3 = new BinaryTree(3);
let tree4 = new BinaryTree(4);
let tree5 = new BinaryTree(5);
let tree6 = new BinaryTree(6);
let tree7 = new BinaryTree(7);

tree1.setLeftSubTree(tree2);
tree1.setRightSubTree(tree3);
tree2.setLeftSubTree(tree4);
tree2.setRightSubTree(tree5);
tree3.setLeftSubTree(tree6);
tree3.setRightSubTree(tree7);

console.log(tree1.getData()); // 1
console.log(tree1.getLeftSubTree().getData()); // 2
console.log(tree1.getRightSubTree().getData()); // 3
console.log(tree1.getLeftSubTree().getLeftSubTree().getData()); // 4
console.log(tree1.getLeftSubTree().getRightSubTree().getData()); // 5
console.log(tree1.getRightSubTree().getLeftSubTree().getData()); // 6
console.log(tree1.getRightSubTree().getRightSubTree().getData()); // 7
