"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
class Tree {
    constructor(rootName) {
        this.root = { name: rootName, children: [] };
    }
    findOrAddNode(name, node) {
        for (let child of node.children)
            if (child.name === name)
                return child;
        return this.addNode(node, name);
    }
    addNode(parentNode, nodeName) {
        if (parentNode) {
            const newNode = { name: nodeName, children: [] };
            parentNode.children.push(newNode);
            return newNode;
        }
        return parentNode;
    }
    getRoot() {
        return this.root;
    }
    formatedTree() {
        let res = "";
        let n = this.root.children.length;
        for (let i = 0; i < n; i++)
            res += this.create(this.root.children[i]);
        return res;
    }
    create(node) {
        let res = "";
        if (node.children.length > 0) {
            res += `{ "${node.name}": [`;
            for (let i = 0; i < node.children.length; i++) {
                res += this.create(node.children[i]);
                if (i < node.children.length - 1)
                    res += ", ";
            }
            res += `] }`;
        }
        else
            res += `"${node.name}"`;
        return res;
    }
}
exports.Tree = Tree;
