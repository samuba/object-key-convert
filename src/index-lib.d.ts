// will overwrite lib/index.d.ts on build because typescript inlines the return type of the functions in a way that IDEs can not recognize the nested results
import {
  CamelCasedPropertiesDeepPatched,
  SnakeCasedPropertiesDeepPatched,
} from "./typeFestPatch";

export declare type SnakeCasedPropertiesDeep<T> =
  SnakeCasedPropertiesDeepPatched<T>;
export declare type CamelCasedPropertiesDeep<T> =
  CamelCasedPropertiesDeepPatched<T>;

export declare const keysToCamelCase: <T>(
  obj: T
) => CamelCasedPropertiesDeep<T>;
export declare const keysToSnakeCase: <T>(
  obj: T
) => SnakeCasedPropertiesDeep<T>;
