import {
  CamelCasedPropertiesDeep,
  keysToCamelCase,
  keysToSnakeCase,
  SnakeCasedPropertiesDeep,
} from "../lib";

const demoTest = () => {
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
  assert(resultSnaked.dolor_sit[0].amet_consec === "tetur");
};

const primitiveTypesTest = () => {
  const now = new Date();
  const originalSnaked = {
    lorem_ipsum: 1,
    dolor_sit: [{ amet_consec: now }],
  };
  const originalCameled = {
    loremIpsum: 1,
    dolorSit: [{ ametConsec: now }],
  };

  const resultCameled: typeof originalCameled = keysToCamelCase(originalSnaked);
  assert(resultCameled.loremIpsum === 1);
  assert(resultCameled.dolorSit[0].ametConsec === now);

  const resultSnaked: typeof originalSnaked = keysToSnakeCase(originalCameled);
  assert(resultSnaked.lorem_ipsum === 1);
  assert(resultSnaked.dolor_sit[0].amet_consec === now);
};

const customTypesTest = () => {
  type test = { fooBar: number; looMoo: boolean; blaBla: string };
  type test2 = Omit<test, "fooBar">;
  type snakedType = SnakeCasedPropertiesDeep<test2>;
  type cameledType = Omit<snakedType, "loo_moo">;
  type finalType = CamelCasedPropertiesDeep<cameledType & { bl_ob: number }>;
  const _ = { blaBla: "test", blOb: 1 } as finalType;
};

const assert = (expr: any) => {
  if (!expr) {
    throw new Error(`Assertion failed for ${JSON.stringify(expr, null, 2)}`);
  }
};

demoTest();
primitiveTypesTest();
customTypesTest();
