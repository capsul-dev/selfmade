export const isStringFilled = (s, len) =>
  typeof s === "string" && s.length > (len ? len : 0);
