class BinaryTree{
    constructor(data, leftTree = null, rightTree = null){
        this.data = data;
        this.leftSubTree = leftTree;
        this.rightSubTree = rightTree;
        this.height = 1;
    }

    getData(){
        return this.data;
    }

    setData(data){
        this.data = data;
    }

    getLeftSubTree(){
        return this.leftSubTree;
    }

    getRightSubTree(){
        return this.rightSubTree;
    }

    setLeftSubTree(tree){
        this.leftSubTree = tree;
    }

    setRightSubTree(tree){
        this.rightSubTree = tree;
    }

    preOrderTraversal(tree){
        if(tree == null) return;

        console.log(tree.data);
        this.preOrderTraversal(tree.getLeftSubTree());
        this.preOrderTraversal(tree.getRightSubTree());
    }

    inOrderTraversal(tree){
        if(tree == null) return;

        this.inOrderTraversal(tree.getLeftSubTree());
        console.log(tree.data);
        this.inOrderTraversal(tree.getRightSubTree());
    }

    postOrderTraversal(tree){
        if(tree == null) return;

        this.postOrderTraversal(tree.getLeftSubTree());
        this.postOrderTraversal(tree.getRightSubTree());
        console.log(tree.data);
    }

    removeLeftSubTree(){
        let deletingNode = this.getLeftSubTree();
        this.setLeftSubTree(null);
        return deletingNode;
    }

    removeRightSubTree(){
        let deletingNode = this.getRightSubTree();
        this.setRightSubTree(null);
        return deletingNode;
    }
}

export { BinaryTree };