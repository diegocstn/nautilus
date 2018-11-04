import ISourceLocation from "./SourceLocation";

export interface ImportDecl {
  name: string;
  location: ISourceLocation;
  source: string;
}

export interface ExportDecl {
  name: string;
  location: ISourceLocation;
}
