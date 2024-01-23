# postcss-property-groups

## Install

```bash
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

interface Options {}
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)
