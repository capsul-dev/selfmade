export const toBase64 = (str) => {
  if (typeof str === "string") {
    let buff = Buffer.from(str, 'utf-8');
    const encodedString = buff.toString('base64');
    return encodedString;
  }
};

export const fromBase64 = (base64) => {
  if (typeof base64 === "string") {
    let buff = Buffer.from(base64, 'base64');
    const decodedString = buff.toString('utf-8');
    return decodedString;
  }
};
