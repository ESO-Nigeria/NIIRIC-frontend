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
    ignores: [
      "/node_modules/**",
      "/.next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
     rules: {
      // ✅ turn off "no-explicit-any"
      "@typescript-eslint/no-explicit-any": "off",

      // (optional) turn off prop-types if using TS
      "react/prop-types": "off",

      // (optional) turn off require-default-props
      "react/require-default-props": "off",
      "@typescript-eslint/no-unused-vars"  : 'off',
      "@next/next/no-img-element": 'off',
      "react-hooks/exhaustive-deps": 'off',
      "react-hooks/rules-of-hooks": 'off',
      "react/no-unescaped-entities": 'off',
      "no-console": 'off',
      "no-unused-vars": 'off',
      "react/no-unknown-property": ['error', { ignore: ['class'] }
      ],
      
    },
  },
];

export default eslintConfig;
