// 전위 순회 : root node -> left subtree -> right subtree 출력
// 중위 순회 : left subtree -> root node -> right subtree 출력
// 후위 순회 : left subtree -> right subtree -> root node 출력

class BinaryTree {
  constructor(data, leftTree = null, rightTree = null) {
    this.data = data;
    this.leftSubTree = leftTree;
    this.rightSubTree = rightTree;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getLeftSubTree() {
    return this.leftSubTree;
  }

  getRightSubTree() {
    return this.rightSubTree;
  }

  setLeftSubTree(leftTree) {
    this.leftSubTree = leftTree;
  }

  setRightSubTree(rightTree) {
    this.rightSubTree = rightTree;
  }

  preOrderTraversal(tree) {
    if (tree) {
      console.log(tree.data);
      this.preOrderTraversal(tree.getLeftSubTree());
      this.preOrderTraversal(tree.getRightSubTree());
    }
  }

  inOrderTraversal(tree) {
    if (tree) {
      this.inOrderTraversal(tree.getLeftSubTree());
      console.log(tree.data);
      this.inOrderTraversal(tree.getRightSubTree());
    }
  }

  postOrderTraversal(tree) {
    if (tree) {
      this.postOrderTraversal(tree.getLeftSubTree());
      this.postOrderTraversal(tree.getRightSubTree());
      console.log(tree.data);
    }
  }

  removeLeftSubTree() {
    let deletedNode = this.getLeftSubTree();
    this.setLeftSubTree(null);

    return deletedNode;
  }

  removeRightSubTree() {
    let deletedNode = this.getRightSubTree();
    this.setRightSubTree(null);

    return deletedNode;
  }
}

export { BinaryTree };
