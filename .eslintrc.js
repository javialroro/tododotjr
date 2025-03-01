module.exports = {
  extends: ["next/core-web-vitals"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^(Course|Task)$",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
};
