# Less Plugin Module Resolver

![Github Action](https://github.com/vagusX/less-plugin-module-resolver/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/vagusX/less-plugin-module-resolver/branch/main/graph/badge.svg?token=ITYULU4YJ3)](https://codecov.io/gh/vagusX/less-plugin-module-resolver)

Inspired by [less-plugin-npm-import](https://github.com/less/less-plugin-npm-import) and [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver).

## Usage

```js
const less = require('less');
const ModuleResolverPlugin = require('less-plugin-module-resolver');

less.render('input', {
  plugins: [
    new ModuleResolverPlugin({
      '~': '',
    }),
  ],
});
```
