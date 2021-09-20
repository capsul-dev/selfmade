export const toBase64 = (s) => {
  return typeof btoa !== "function"
    ? new Buffer(s).toString("base64")
    : btoa(s);
};

export const fromBase64 = (s) => {
  return typeof atob !== "function"
    ? new Buffer(s, "base64").toString()
    : atob(s);
};
