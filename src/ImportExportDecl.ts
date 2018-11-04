import ISourceLocation from "./SourceLocation";

/**
 * Import declaration abstraction
 */
export interface ImportDecl {
  /**
   * identifier
   */
  name: string;
  /**
   * location (based on import token)
   */
  location: ISourceLocation;

  /**
   * source module name
   */
  source: string;

  /**
   * is an external dependecy?
   */
  external: boolean;

  /**
   * is a default import specifier?
   */
  isDefault: boolean;
}

export interface ExportDecl {
  name: string;
  location: ISourceLocation;
}
