import { Tree, TreeNode } from "./Tree";

interface ResultData {
    fileUrl?: string;
}

export function isValidURL(line: string): boolean {
    const regex = /^[a-zA-Z0-9,\\._\-/:%]+$/;
    return regex.test(line);
}

export function map(data: ResultData[]): string {
    const tree = new Tree("root");
    for (let i = 0; i < data.length; i++) {
        let line = data[i].fileUrl;
        if (line && isValidURL(line)) {
            line = line.slice(("https://").length);
            let lineSplit = line.split("/");
            let node: TreeNode = tree.findOrAddNode(lineSplit[0].split(":")[0], tree.getRoot());
            for (let j = 1; j < lineSplit.length - 1; j++)
                node = tree.findOrAddNode(lineSplit[j], node);
        }
    }

    return tree.formatedTree();
}