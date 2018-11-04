import { ExportDecl, ImportDecl } from "./ImportExportDecl";

export default interface SouceFile {
  path: string;
  name: string;
  exports: ExportDecl[];
  imports: ImportDecl[];
}
