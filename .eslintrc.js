module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "airbnb",
  ],
  parser: 'babel-eslint',
  rules: {
    //general
    "global-require": "off",
    "class-methods-use-this": "off",
    "import/no-unresolved": "off",
    "no-underscore-dangle": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    'no-unused-expressions': ["error", { "allowShortCircuit": true }],
    "no-plusplus": 'off',
    "no-await-in-loop": 'off',
    "no-nested-ternary": 'off',
    "no-continue": 'off',
    "no-restricted-syntax": 'off',
    
    //react
    "react/no-multi-comp": "off",
    "react/no-array-index-key": "off",
    "react/jsx-no-bind": "off",
    "react/destructuring-assignment": "off",
    "react/props-validation": "off",
    "react/prop-types": "off",
    'react/button-has-type': 'off',
    'react/prefer-stateless-function': 'off',
    "react/jsx-curly-spacing": [2, "always", {
      "allowMultiline": true,
      "spacing": {"objectLiterals": "always"}
    }],
    "react/jsx-one-expression-per-line": "off",
    'react/jsx-closing-bracket-location': [1, {selfClosing: 'props-aligned', nonEmpty: 'after-props'}],
    "react/sort-comp": [2, {
      order: [
        'static-methods',
        'lifecycle',
        'everything-else',
        'rendering',
      ],
      groups: {
        rendering: [
          '/^render.+$/',
          'render'
        ]
      }
    }],
    
    //jsx-a11y
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};

