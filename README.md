# Less Plugin Module Resolver

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
