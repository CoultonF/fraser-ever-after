module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:astro/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    "semi": "always"
    },
    "overrides": [
      {
        // Define the configuration for `.astro` file.
        "files": ['*.astro'],
        // Allows Astro components to be parsed.
        "parser": 'astro-eslint-parser',
        // Parse the script in `.astro` as TypeScript by adding the following configuration.
        // It's the setting you need when using TypeScript.
        "parserOptions": {
          "parser": '@typescript-eslint/parser',
          "extraFileExtensions": ['.astro'],
        },
        "rules": {
          // override/add rules settings here, such as:
          // "astro/no-set-html-directive": "error"
        },
      },
      // ...
    ],
}