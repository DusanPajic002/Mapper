import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

type TreeNode = {
    name: string;
    children: TreeNode[];
};


router.get('/files', async (req: Request, res: Response) => {
    try {
        const tree = new Tree("root");
        const response = await axios.get("https://rest-test-eight.vercel.app/api/test");
        const data = response.data.items; 
        for (let i = 0; i < data.length; i++) {
            let line = data[i].fileUrl;
            if (!isValidURL(line)){ 
                continue;
            }
            line = line.slice(("https://").length);
            line = line.split("/");
            let node: TreeNode = tree.findOrAddNode(line[0], tree.getRoot());
            for (let j = 1; j < line.length - 1; j++) {
                node = tree.findOrAddNode(line[j], node);
            }
        }

        let print = tree.returnTree();
        res.setHeader('Content-Type', 'application/json');
        res.send(print);
    } catch (error) {
        res.status(500).send('Error fetching files');
    }
});

function isValidURL(line: string) {
    try {
      new URL(line);
      return true;
    } catch (e) {
        console.log(line)
      return false;
    }
  }

class Tree {
    private root: TreeNode;

    constructor(rootName: string) {
        this.root = { name: rootName, children: [] };
    }

    findOrAddNode(name: string, node: TreeNode): TreeNode {
        for (let child of node.children) {
            if (child.name === name) {
                return child;
            }
        }
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

    returnTree(): string {
        let res = ""
        let n = this.root.children.length;
        for (let i = 0; i < n; i++) {
            res += this.createTree(this.root.children[i])
        }
        return res;
    }

    private createTree(node: TreeNode, childNumber: number = 0): string {
        let res = '';

        if (node.children.length > 0) {
            res += `{`;
            res += `\"${node.name}\": [`;
            for (let i = 0; i < node.children.length; i++)
                res += this.createTree(node.children[i], node.children.length - i);
            res += `]`;
            res += (childNumber == 1) ? "}," : "}";
        } else
            res += (childNumber == 1) ? `\"${node.name}\"` : `\"${node.name}\",`;

        return res;
    }
}
 
export default router;
