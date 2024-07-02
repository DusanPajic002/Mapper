"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidURL = isValidURL;
exports.map = map;
const Tree_1 = require("./Tree");
function isValidURL(line) {
    const regex = /^[a-zA-Z0-9,\\._\-/:%]+$/;
    return regex.test(line);
}
function map(data) {
    const tree = new Tree_1.Tree("root");
    for (let i = 0; i < data.length; i++) {
        let line = data[i].fileUrl;
        if (line && isValidURL(line)) {
            line = line.slice(("https://").length);
            let lineSplit = line.split("/");
            let node = tree.findOrAddNode(lineSplit[0].split(":")[0], tree.getRoot());
            for (let j = 1; j < lineSplit.length - 1; j++)
                node = tree.findOrAddNode(lineSplit[j], node);
        }
    }
    return tree.formatedTree();
}
