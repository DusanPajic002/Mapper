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
            if (!isValidURL(line))
                continue;
        
            line = line.slice(("https://").length);
            line = line.split("/");
            let node: TreeNode = tree.findOrAddNode(line[0].split(":")[0], tree.getRoot());
            for (let j = 1; j < line.length - 1; j++)
                node = tree.findOrAddNode(line[j], node);
            
        }

        const formatedTree = tree.formatedTree();
        res.setHeader('Content-Type', 'application/json');
        res.send(formatedTree);
    } catch (error) {
        res.status(500).send('Error fetching files');
    }
});

function isValidURL(line: string) {
    const regex = /^[a-zA-Z0-9,\\._\-/:%]+$/;
    console.log(regex.test(line));
    return regex.test(line);
}

class Tree {
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
        } else  res += `"${node.name}"`;
        
        return res;
    }


}

export default router;
