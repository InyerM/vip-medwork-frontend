const config = {
  "**/*.{ts?(x),mts}": () => "tsc -p tsconfig.json --noEmit",
  "**/{src,test}/**/*.{ts,tsx}": ["eslint", "prettier --write"],
};

export default config;