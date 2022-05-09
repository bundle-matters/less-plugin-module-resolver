# less-plugin-module-resolver


## Usage

```js
const less = require('less');
const ModuleResolverPlugin = require('less-plugin-module-resolver');

less.render('input', {
  plugins: [new ModuleResolverPlugin()],
});
```