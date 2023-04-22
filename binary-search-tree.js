const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
};

class Tree {
    constructor(inputArray) {
        this.inputArray = this.removeDuplicates(inputArray).sort(function(a, b){return a - b});
        this.root = this.buildTree(this.inputArray, 0, this.inputArray.length -1);
    }
    
    buildTree(inputArray, start, end) {
        if (start > end) return null;

        let mid = parseInt((start + end) / 2);
        let root = new Node(inputArray[mid]);
        
        root.left = this.buildTree(inputArray, start, mid - 1);
        root.right = this.buildTree(inputArray, mid + 1, end);
        return root;
    }

    insert(value, root=this.root) {
        // If the tree is empty, return a new node
        if (root == null) {
            root = new Node(value);
            return root;
        }
 
        /* Otherwise, recur down the tree */
        if (value < root.data)
            root.left = this.insert(value, root.left);
        else if (value > root.data)
            root.right = this.insert(value, root.right);
 
        /* return the (unchanged) node pointer */
        return root;
    }

    delete(value, root=this.root) {
        /* Base Case: If the tree is empty */
        if (root == null)
            return root;
  
        /* Otherwise, recur down the tree */
        if (value < root.data)
            root.left = this.delete(value, root.left);
        else if (value > root.data)
            root.right = this.delete(value, root.right);
  
        // if key is same as root's
        // key, then This is the
        // node to be deleted
        else {
            // node with only one child or no child
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;
  
            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            root.data = minValue(root.right);
  
            // Delete the inorder successor
            root.right = this.delete(root.right, root.data);
        }
        return root
    }

    find(value, root=this.root) {
        // Base Cases: root is null
        // or key is present at root
        if (root == null ||
            root.data == value) {
            return root;
            }
    
        // Key is greater than root's key
        if (root.data < value) {
            return this.find(value, root.right);
        }
        else {
    
        // Key is smaller than root's key
            return this.find(value, root.left);
        }
    }

    levelOrder(root=this.root) {
        const queue = [];
        const result = [];

        if (root == null) return;

        queue.push(root);

        while (queue.length > 0) {
            let current = queue.shift(root);
            result.push(current.data);
            
            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }
        return result;
    }

    inorder(root, result = []) {
        if (root) {
            // Traverse left subtree
            this.inorder(root.left, result);
            
            // Visit node
            result.push(root.data)
            
            // Traverse right subtree
            this.inorder(root.right, result);
        }
        return result
    }

    preorder(root, result = []) {
        //root=this.buildTree(this.newArray, 0, this.newArray.length -1)
  
        if (root == null) return;
        else {
        result.push(root.data)
            
        this.preorder(root.left, result);
        this.preorder(root.right, result);
        }
        return result  
    }
    
    postorder(root, result = []) {
        if (root === null) {
          return;
        }
        else {
        // Traverse left subtree
        this.postorder(root.left, result);
       
        // Traverse right subtree
        this.postorder(root.right, result);
       
        // Visit Node
        result.push(root.data)
        }
        return result
    }

    depth(value, root=this.root, depthCount=0) {
        if (root === null) return;
        if (root.data === value) return depthCount;
    
        if (root.data < value) {
          return this.depth(value, root.right, (depthCount + 1));
        } else {
          return this.depth(value, root.left, (depthCount + 1));
        }
    }

    height(root = this.root) {
        if (root == null)
            return -1;
        else {
            /* compute the depth of each subtree */
            let lDepth = this.height(root.left);
            let rDepth = this.height(root.right);
   
            /* use the larger one */
            if (lDepth > rDepth)
                return (lDepth + 1);
             else
                return (rDepth + 1);
        }
    }

    isBalanced(root){
        // Base condition
        if(root == null)
            return true
     
        // for left and right subtree height
        let lh = this.height(root.left)
        let rh = this.height(root.right)
     
        // allowed values for (lh - rh) are 1, -1, 0
        if (Math.abs(lh - rh) <= 1)
            return true
     
        // if we reach here means tree is not
        // height-balanced tree
        return false
    }
    
    // This functions converts an unbalanced BST to
    // a balanced BST
    rebalance(root=this.root, result = []) {
        // Store nodes of given BST in sorted order
        this.storeBSTNodes(root, result);
        
        // Constructs BST from nodes[]
        this.root = this.buildTree(result, 0, result.length -1);
        return this.root
    }

    /* This function traverse the skewed binary tree and
    stores its nodes pointers in vector nodes[] */
    storeBSTNodes(root, nodes) {
        // Base case
        if (root == null)
            return;
   
        // Store nodes in Inorder (which is sorted
        // order for BST)
        this.storeBSTNodes(root.left, nodes);
        nodes.push(root.data);
        this.storeBSTNodes(root.right, nodes);
    }

    minValue(root) {
        let min = root.data;
            while (root.left != null)
            {
                min = root.left.data;
                root = root.left;
            }
            return min;
    }

    removeDuplicates(inputArray) {
        return [...new Set(inputArray)];
    };
}

const input = [7,5,7,14,8,4,8,4,4,36,96,6];
let newTree = new Tree(input)
prettyPrint(newTree.root)
console.log(newTree.isBalanced(newTree.root))
console.log(newTree.levelOrder())
console.log(newTree.preorder(newTree.root))
console.log(newTree.postorder(newTree.root))
console.log(newTree.inorder(newTree.root))
prettyPrint(newTree.insert(101));
prettyPrint(newTree.insert(200));
prettyPrint(newTree.insert(300));
console.log(newTree.isBalanced(newTree.root))
prettyPrint(newTree.rebalance())
console.log(newTree.isBalanced(newTree.root))
console.log(newTree.levelOrder())
console.log(newTree.preorder(newTree.root))
console.log(newTree.postorder(newTree.root))
console.log(newTree.inorder(newTree.root))
//console.log(prettyPrint(newTree.find(7)));

//console.log(newTree.depth(-1))
//console.log(newTree.height())

