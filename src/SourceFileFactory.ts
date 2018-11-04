import { parse } from "@babel/parser";
import {
  ImportDeclaration,
} from "@babel/types";

import traverse, { NodePath } from "@babel/traverse";

import path from "path";

import { ExportDecl, ImportDecl } from "./ImportExportDecl";
import ISouceFile from "./ISouceFile";

const getImportNames = (babelNode: ImportDeclaration): string[] => {
  return babelNode.specifiers.map((value) => value.local.name);
};

const parseFile = (filePath: string, source: string): ISouceFile => {
  const ast = parse(source, {
    plugins: ["typescript", "jsx"],
    sourceType: "module",
  });

  const exports: ExportDecl[] = [];
  const imports: ImportDecl[] = [];

  traverse(ast, {
    ImportDeclaration(nodePath: NodePath<ImportDeclaration>) {
      const { node } = nodePath;
      const { loc } = node;
      const locationStart = (loc || { start: { line: -1, column: -1 } }).start;
      imports.push(
        ...getImportNames(node).map((name) => ({
          name,
          location: {
            line: locationStart.line,
            col: locationStart.column,
          },
          source: node.source.value,
        })),
      );
    },
  });

  const res = {
    name: path.basename(filePath),
    path: filePath,
    exports,
    imports,
  };

  return res;
};

export default { parseFile };
