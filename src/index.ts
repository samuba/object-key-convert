import {
  CamelCasedPropertiesDeepPatched,
  SnakeCasedPropertiesDeepPatched,
} from "./typeFestPatch";

export type SnakeCasedPropertiesDeep<T> = SnakeCasedPropertiesDeepPatched<T>;

export type CamelCasedPropertiesDeep<T> = CamelCasedPropertiesDeepPatched<T>;

export const keysToCamelCase = <T>(
  obj: T
): CamelCasedPropertiesDeepPatched<T> => convertFields(obj, "camel");

export const keysToSnakeCase = <T>(
  obj: T
): SnakeCasedPropertiesDeepPatched<T> => convertFields(obj, "snake");

const toCamel = (str: string) => {
  return str.replace(/([-_][a-z])/gi, (x) => {
    return x.toUpperCase().replace("-", "").replace("_", "");
  });
};

const toSnake = (str: string) => {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};

const isObject = (obj: unknown) =>
  obj === Object(obj) &&
  !Array.isArray(obj) &&
  typeof obj !== "function" &&
  !(obj instanceof Date);

const convertFields = (obj: any, format: "snake" | "camel"): any => {
  const toFormat = format === "snake" ? toSnake : toCamel;
  if (isObject(obj)) {
    const n: Record<string, any> = {};
    Object.keys(obj).forEach(
      (k) => (n[toFormat(k)] = convertFields(obj[k], format))
    );
    return n;
  }
  if (Array.isArray(obj)) {
    return obj.map((i) => convertFields(i, format));
  }
  return obj;
};
