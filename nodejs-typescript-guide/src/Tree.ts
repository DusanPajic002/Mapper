
export type TreeNode = {
    name: string;
    children: TreeNode[];
};

export class Tree {
    private root: TreeNode;

    constructor(rootName: string) {
        this.root = { name: rootName, children: [] };
    }

    findOrAddNode(name: string, node: TreeNode): TreeNode {
        for (let child of node.children)
            if (child.name === name)
                return child;

        return this.addNode(node, name);
    }

    private addNode(parentNode: TreeNode, nodeName: string): TreeNode {
        if (parentNode) {
            const newNode: TreeNode = { name: nodeName, children: [] };
            parentNode.children.push(newNode);
            return newNode;
        }
        return parentNode;
    }

    getRoot(): TreeNode {
        return this.root;
    }

    formatedTree(): string {
        let res = ""
        let n = this.root.children.length;
        for (let i = 0; i < n; i++)
            res += this.create(this.root.children[i])
        return res;
    }

    private create(node: TreeNode): string {
        let res = "";
        if (node.children.length > 0) {
            res += `{ "${node.name}": [`;
            for (let i = 0; i < node.children.length; i++) {
                res += this.create(node.children[i]);
                if (i < node.children.length - 1)
                    res += ", ";
            }
            res += `] }`;
        } else res += `"${node.name}"`;

        return res;
    }

}
