import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Ignorar carpeta src/lib y node_modules
    ignorePatterns: ["src/lib/**", "node_modules/**"],
    rules: {
      // Puedes también bajar severidad de reglas estrictas
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/ban-ts-comment": "warn",
      // etc, según convenga
    },
  },
];

export default eslintConfig;
