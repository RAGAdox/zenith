import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat( {
  baseDirectory: import.meta.dirname, // Use import.meta.dirname instead of __dirname in ESM
} );

const eslintConfig = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Specify which files to lint
    ignores: ["node_modules/", "dist/", ".next/"], // Exclude unwanted folders

    ...compat.extends( "next/core-web-vitals", "next/typescript" ),

    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;