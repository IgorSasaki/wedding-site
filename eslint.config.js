import globals from "globals";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import importHelpersPlugin from "eslint-plugin-import-helpers";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import svgJsxPlugin from "eslint-plugin-svg-jsx";

export default [
  js.configs.recommended,
  {
    // Configurações Globais
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  {
    // Configuração para React e Hooks (Substituindo o Next)
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Vite não precisa de React importado no topo
      "react/prop-types": "off",
      "camelcase": "off",
      "space-before-function-paren": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    // Prettier
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  {
    // Organização de Imports
    plugins: {
      "import-helpers": importHelpersPlugin,
    },
    rules: {
      "import-helpers/order-imports": [
        "warn",
        {
          "newlinesBetween": "always",
          "groups": [
            ["module", "/^react/", "/^@ant/", "/^@fullstory/"],
            "/^@/",
            ["parent", "sibling", "index"]
          ],
          "alphabetize": { "order": "asc", "ignoreCase": true }
        }
      ],
      "sort-imports": "off",
    },
  },

  {
    // Remoção de Imports não usados
    plugins: {
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "none",
          "argsIgnorePattern": "^_"
        }
      ],
    },
  },

  {
    // Organização de código (Interfaces e Props)
    plugins: {
      perfectionist: perfectionistPlugin,
    },
    rules: {
      "perfectionist/sort-interfaces": "error",
      "perfectionist/sort-jsx-props": [
        "error",
        {
          "type": "natural",
          "order": "asc",
          "groups": ["multiline", "unknown", "shorthand"]
        }
      ],
    },
  },

  {
    // SVG em JSX
    plugins: {
      "svg-jsx": svgJsxPlugin,
    },
    rules: {
      "svg-jsx/camel-case-dash": "error",
      "svg-jsx/camel-case-colon": "error",
      "svg-jsx/no-style-string": "error",
    },
  },

  {
    // Regras Gerais de JS
    rules: {
      "no-useless-constructor": "off",
      "no-use-before-define": "off",
    },
  },

  {
    // TypeScript Specific
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "none",
          "argsIgnorePattern": "^_"
        }
      ],
    },
  },

  {
    // Arquivos ignorados (Vite/Build padrão)
    ignores: [
      "dist/",
      "build/",
      "node_modules/",
      "coverage/",
      "vite.config.ts",
    ],
  },
];