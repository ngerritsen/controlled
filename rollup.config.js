import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "lib/index.js",
      exports: "named",
      format: "cjs",
    },
    plugins: [typescript({ useTsconfigDeclarationDir: true })],
  },
];
