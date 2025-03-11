import { BinaryTree } from "./binaryTree.mjs";

class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  insert(data) {
    if (this.root === null) {
      this.root = new BinaryTree(data);
      return;
    }

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode !== null) {
      parentNode = currentNode;

      if (currentNode.getData() > data) {
        currentNode = currentNode.getLeftSubTree();
      } else if (currentNode.getData() < data) {
        currentNode = currentNode.getRightSubTree();
      } else {
        // 중복일 경우 종료처리
        return;
      }
    }

    let newNode = new BinaryTree(data);

    if (parentNode.getData() > data) {
      parentNode.setLeftSubTree(newNode);
    } else {
      parentNode.setRightSubTree(newNode);
    }
  }

  search(targetData) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.getData() === targetData) {
        return currentNode;
      } else if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    return null;
  }

  remove(targetData) {
    let parentRootNode = new BinaryTree(0);
    let parentNode = parentRootNode;
    let currentNode = this.root;
    let deletedNode = null;

    parentRootNode.setRightSubTree(this.root);

    while (currentNode !== null && currentNode.getData() !== targetData) {
      parentNode = currentNode;

      if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    if (currentNode === null) {
      return null;
    }

    deletedNode = currentNode;

    if (
      deletedNode.getLeftSubTree() === null &&
      deletedNode.getRightSubTree() === null
    ) {
      if (parentNode.getLeftSubTree() === deletedNode) {
        parentNode.removeLeftSubTree();
      } else {
        parentNode.removeRightSubTree();
      }
    } else if (
      deletedNode.getLeftSubTree() === null ||
      deletedNode.getRightSubTree() === null
    ) {
      let childNode = null;

      if (deletedNode.getLeftSubTree() !== null) {
        childNode = deletedNode.getLeftSubTree();
      } else {
        childNode = deletedNode.getRightSubTree();
      }

      if (parentNode.getLeftSubTree() === deletedNode) {
        parentNode.setLeftSubTree(childNode);
      } else {
        parentNode.setRightSubTree(childNode);
      }
    } else {
      let replaceNode = deletedNode.getRightSubTree();
      let replaceParentNode = deletedNode;

      while (replaceNode.getRightSubTree() !== null) {
        replaceParentNode = replaceNode;
        replaceNode = replaceNode.getRightSubTree();
      }

      let deletedNodeData = deletedNode.getData();

      deletedNode.setData(replaceNode.getData());

      if (replaceParentNode.getLeftSubTree() === replaceNode) {
        replaceParentNode.setLeftSubTree(replaceNode.getLeftSubTree());
      } else {
        replaceParentNode.setRightSubTree(replaceNode.getLeftSubTree());
      }

      deletedNode = replaceNode;
      deletedNode.setData(deletedNodeData);

      if (parentRootNode.getRightSubTree() !== this.root) {
        this.root = parentRootNode.getRightSubTree();
      }

      return deletedNode;
    }
  }
}

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(18);
binarySearchTree.insert(15);
binarySearchTree.insert(10);
binarySearchTree.insert(6);
binarySearchTree.insert(3);
binarySearchTree.insert(8);
binarySearchTree.insert(12);
binarySearchTree.insert(11);
binarySearchTree.insert(31);
binarySearchTree.insert(27);
binarySearchTree.insert(24);
binarySearchTree.insert(20);
binarySearchTree.insert(33);
binarySearchTree.insert(35);
binarySearchTree.insert(37);
binarySearchTree.root.inOrderTraversal(binarySearchTree.root);

console.log("========== Search 6 ==========");
console.log(binarySearchTree.search(6));

console.log("========== Search 1 ==========");
console.log(binarySearchTree.search(1));

binarySearchTree.remove(10);
binarySearchTree.root.inOrderTraversal(binarySearchTree.root);
