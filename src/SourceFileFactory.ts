import { parse } from "@babel/parser";
import {
  ImportDeclaration,
  isImportDefaultSpecifier,
} from "@babel/types";

import traverse, { NodePath } from "@babel/traverse";

import path from "path";

import { ExportDecl, ImportDecl } from "./ImportExportDecl";
import ISouceFile from "./SouceFile";

interface ImportSpecifier {
  name: string;
  isDefault: boolean;
}

const getImportNames = (babelNode: ImportDeclaration): ImportSpecifier[] => {
  return babelNode.specifiers.map((spec) => ({
    name: spec.local.name,
    isDefault: isImportDefaultSpecifier(spec),
  }));
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
        ...getImportNames(node).map(({name, isDefault}) => ({
          name,
          location: {
            line: locationStart.line,
            col: locationStart.column,
          },
          source: node.source.value,
          external: false, // TODO is an external dependency?
          isDefault,
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
