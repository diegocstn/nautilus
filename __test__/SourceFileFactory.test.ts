import SourceFileFactory from "../src/SourceFileFactory";

describe("SourceFileFactory", () => {

  const extDependencies = new Set(["awesome_node_module_dependecy"]);

  it("should parse a default ImportDeclaration", () => {
    const src =
      `import NodeModule from "awesome_node_module_dependecy";\nimport LocalModule from "./local_module";`;
    expect(SourceFileFactory.parseFile("./module/local-module.js", src, extDependencies)).toEqual({
      name: "local-module.js",
      path: "./module/local-module.js",
      imports: [
        {
          name: "NodeModule",
          location: {
            line: 1,
            col: 0,
          },
          isDefault: true,
          external: true,
          source: "awesome_node_module_dependecy",
        },
        {
          name: "LocalModule",
          location: {
            line: 2,
            col: 0,
          },
          isDefault: true,
          external: false,
          source: "./local_module",
        },
      ],
      exports: [],
    });
  });

  it("should parse a multiple specifier ImportDeclaration", () => {
    const src =
      `import { fn1 } from "awesome_node_module_dependecy";\n` +
      `import { concat, pick } from "./local_module";`;
    expect(SourceFileFactory.parseFile("./module/local-module.js", src, extDependencies)).toEqual({
      name: "local-module.js",
      path: "./module/local-module.js",
      imports: [
        {
          name: "fn1",
          location: {
            line: 1,
            col: 0,
          },
          isDefault: false,
          external: true,
          source: "awesome_node_module_dependecy",
        },
        {
          name: "concat",
          location: {
            line: 2,
            col: 0,
          },
          isDefault: false,
          external: false,
          source: "./local_module",
        },
        {
          name: "pick",
          location: {
            line: 2,
            col: 0,
          },
          isDefault: false,
          external: false,
          source: "./local_module",
        },
      ],
      exports: [],
    });
  });

  it("should parse a multiple specifier ImportDeclaration", () => {
    const src =
      `import moduleName, { fn1 } from "awesome_node_module_dependecy";`;
    expect(SourceFileFactory.parseFile("./module/local-module.js", src, extDependencies)).toEqual({
      name: "local-module.js",
      path: "./module/local-module.js",
      imports: [
        {
          name: "moduleName",
          location: {
            line: 1,
            col: 0,
          },
          isDefault: true,
          external: true,
          source: "awesome_node_module_dependecy",
        },
        {
          name: "fn1",
          location: {
            line: 1,
            col: 0,
          },
          isDefault: false,
          external: true,
          source: "awesome_node_module_dependecy",
        },
      ],
      exports: [],
    });
  });

});
