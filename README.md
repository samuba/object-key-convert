# object-key-convert

Convert (nested) object keys to snake case or camel case with type safety.

- Outputs proper Typescript types
- No runtimes dependencies
- Works in: Browsers, Nodejs

Especially useful for interacting with auto generated types from e.g. SQL databases where column names are usually snake cased.

## Usage

```javascript
import { keysToCamelCase, keysToSnakeCase } from "object-key-convert";

const resultCameled = keysToCamelCase({
  lorem_ipsum: 1,
  dolor_sit: [{ amet_consec: "tetur" }],
});
assert(resultCameled.loremIpsum === 1);
assert(resultCameled.dolorSit[0].ametConsec === "tetur");

const resultSnaked = keysToSnakeCase({
  loremIpsum: 1,
  dolorSit: [{ ametConsec: "tetur" }],
});
assert(resultSnaked.lorem_ipsum === 1);
assert(resultSnaked.dolor_sit[0].amet_consec === "est");
```
