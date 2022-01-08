import { keysToCamelCase, keysToSnakeCase } from ".";

const assert = (expr: any) => {
  if (!expr) {
    throw new Error(`Assertion failed for ${JSON.stringify(expr, null, 2)}`);
  }
};

const resultSnaked = keysToSnakeCase({
  loRem: 1,
  ipSum: [
    {
      sanTor: "est",
    },
  ],
});

assert(resultSnaked.lo_rem === 1);
assert(resultSnaked.ip_sum[0].san_tor === "est");

const resultCameled = keysToCamelCase({
  lo_rem: 1,
  ip_sum: [
    {
      san_tor: "es_t",
    },
  ],
});

assert(resultCameled.loRem === 1);
assert(resultCameled.ipSum[0].sanTor === "es_t");
