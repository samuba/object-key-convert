/* eslint-disable @typescript-eslint/ban-types */
// patch inspired from https://github.com/sindresorhus/type-fest/pull/327

import type { CamelCase } from "./typeFestCopies/camel-case";
import type { DelimiterCase } from "./typeFestCopies/delimiter-case";

export type SnakeCasedPropertiesDeepPatched<Value> = DelimiterCasedPropertiesDeepPatched<
  Value,
  "_",
  Date | number | string | boolean
>;

export type CamelCasedPropertiesDeepPatched<Value> = CamelCasedPropertiesDeepPatchedInternal<
  Value,
  Date | number | string | boolean
>;

type DelimiterCasedPropertiesDeepPatched<Value, Delimiter extends string, Exclude = never> = Value extends
  | Exclude
  | Function
  ? Value
  : Value extends Array<infer U>
  ? Array<DelimiterCasedPropertiesDeepPatched<U, Delimiter, Exclude>>
  : Value extends Set<infer U>
  ? Set<DelimiterCasedPropertiesDeepPatched<U, Delimiter, Exclude>>
  : {
    [K in keyof Value as DelimiterCase<K, Delimiter>]: DelimiterCasedPropertiesDeepPatched<
      Value[K],
      Delimiter,
      Exclude
    >;
  };

type CamelCasedPropertiesDeepPatchedInternal<Value, Exclude = never> = Value extends Exclude | Function
  ? Value
  : Value extends Array<infer U>
  ? Array<CamelCasedPropertiesDeepPatchedInternal<U, Exclude>>
  : Value extends Set<infer U>
  ? Set<CamelCasedPropertiesDeepPatchedInternal<U, Exclude>>
  : {
    [K in keyof Value as CamelCase<K>]: CamelCasedPropertiesDeepPatchedInternal<Value[K], Exclude>;
  };
