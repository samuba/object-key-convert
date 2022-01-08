import { keysToCamelCase, keysToSnakeCase } from ".";

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

const advancedTypesTest = () => {
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

const assert = (expr: any) => {
  if (!expr) {
    throw new Error(`Assertion failed for ${JSON.stringify(expr, null, 2)}`);
  }
};

demoTest();
advancedTypesTest();
