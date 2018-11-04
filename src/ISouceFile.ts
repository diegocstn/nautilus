import { ExportDecl, ImportDecl } from "./ImportExportDecl";

export default interface ISouceFile {
  path: string;
  name: string;
  exports: ExportDecl[];
  imports: ImportDecl[];
}
