const package =  require('./package.json');

module.exports = {
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true,
          // "browsers": package.browserslist,
        }
      }
    ]
  ],
  "plugins": [
    '@babel/plugin-proposal-class-properties',
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": true
      }
    ]
  ]
};
