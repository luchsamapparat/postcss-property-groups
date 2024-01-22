# postcss-property-groups

[![Build][build]][build-badge]

> PostCSS plugin template.

Brief description describing the purpose of the [PostCSS](https://github.com/postcss/postcss) plugin.

## Install

```bash
yarn add -D postcss-property-groups
# OR
npm i -D postcss-property-groups
```

## Usage

### Node.js

```js
const postcss = require("postcss");
const { plugin } = require("postcss-property-groups");

postcss(plugin)
  .process("* { color: red; }", {
    from: undefined,
  })
  .then((result) => {
    console.log(result.css);
  });
```

### Options

```ts
plugin(options?: Options);

interface Options {
  /**
   * Relative path to processed HTML file
   */
  path?: string;
}
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)
