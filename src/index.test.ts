import { assert, test } from "vitest";
import {
  CamelCasedPropertiesDeep,
  keysToCamelCase,
  keysToSnakeCase,
  SnakeCasedPropertiesDeep,
} from "./index";

test("demo", () => {
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
});

test("primitive types", () => {
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
});

test("custom types", () => {
  type test = { fooBar: number; looMoo: boolean; blaBla: string };
  type test2 = Omit<test, "fooBar">;
  type snakedType = SnakeCasedPropertiesDeep<test2>;
  type cameledType = Omit<snakedType, "loo_moo">;
  type finalType = CamelCasedPropertiesDeep<cameledType & { bl_ob: number }>;
  const _: finalType = { blaBla: "test", blOb: 1 };
});
