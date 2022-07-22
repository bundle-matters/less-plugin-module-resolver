# Less Plugin Module Resolver

![Github Action](https://github.com/bundle-matters/less-plugin-module-resolver/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/bundle-matters/less-plugin-module-resolver/branch/main/graph/badge.svg?token=ITYULU4YJ3)](https://codecov.io/gh/bundle-matters/less-plugin-module-resolver) [![Version](https://img.shields.io/npm/v/less-plugin-module-resolver.svg?sanitize=true)](https://www.npmjs.com/package/less-plugin-module-resolver) [![Downloads](https://img.shields.io/npm/dm/less-plugin-module-resolver.svg?sanitize=true)](https://npmcharts.com/compare/less-plugin-module-resolver?minimal=true) [![License](https://img.shields.io/npm/l/less-plugin-module-resolver.svg?sanitize=true)](https://www.npmjs.com/package/less-plugin-module-resolver)

> Inspired by [less-plugin-npm-import](https://github.com/less/less-plugin-npm-import) and [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)

Adds the ability for less to set alias imports. Especially to handle usage like `~` in [webpack](https://webpack.js.org/loaders/less-loader/#imports) when using Rollup or other bundlers.

## Install

```shell
# use npm
npm install less-plugin-module-resolver

# use yarn
yarn add less-plugin-module-resolver

# use pnpm
pnpm install less-plugin-module-resolver
```

## Usage

```less
@import (less) '~normalize.css';
```

```js
const less = require('less');
const { LessPluginModuleResolver } = require('less-plugin-module-resolver');

less.render('input', {
  plugins: [
    new LessPluginModuleResolver({
      alias: {
        '~': '',
      },
    }),
  ],
});
```

## Plugin Options

### **rootDir**

The directory to resolve less files. Default to `''`.

### **alias**

```js
const less = require('less');
const { LessPluginModuleResolver } = require('less-plugin-module-resolver');

less.render('input', {
  plugins: [
    new LessPluginModuleResolver({
      rootDir: path.resolve(__dirname, 'src'),
      alias: {
        $: (_, restPath) => `styles${restPath}`),
        '^@mixins$': 'styles/mixins/index.less',
      },
    }),
  ],
});
```

When using the above configs:

```less
# origin
@import "@mixins";
@import "$/variables/index.less";

# converted to
@import "/User/me/project-foo/src/styles/mixins/index.less";
@import "/User/me/project-foo/src/styles/variables/index.less";
```

The alias config to resolve import less files. Alias key should be string including `regexp string`, corresponding replacer value should be string. You can use function replacer when the situation is more complicated.

**More detailed api about alias see below:**

#### **alias key**

Alias key should be a `normal string` or `regexp string`. Mind that regexp string will pass to `RegexpConstructor` and should be not enclosed between slashes but started with `^` or end with `$`.

##### More docs about `RegexpPatternString`

- [`RegexpPatternString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)
- [`RegExp#literal_notation_and_constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp#literal_notation_and_constructor)

Note that you can use `special replacement patterns` from `String.prototype.replace`, like `$1`, `$n`. See [String_Replace#specifying_a_string_as_a_parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter)

```js
const less = require('less');
const { LessPluginModuleResolver } = require('less-plugin-module-resolver');

less.render('input', {
  plugins: [
    new LessPluginModuleResolver({
      rootDir: path.resolve(__dirname, 'src'),
      alias: {
        '^@theme/(.+)': 'styles/theme/$1.less',
      },
    }),
  ],
});
```

#### **alias value**

Alias value should be a string replacer or function replacer. The function replacer is similar to the 2rd argument/callback in `String.prototype.replace`.

```ts
type StringReplacer = string;

type FunctionReplacer = (substring: string, ...args: any[]) => string;
```

## License

MIT
