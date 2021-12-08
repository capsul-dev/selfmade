import { fromBase64, toBase64 } from "./encoding";

describe("Encoding", () => {
    test("Sucessfull Encoding and Decoding" , () => {
        const baseText = JSON.stringify({ prop:'value' });
        const encodedString = toBase64(baseText);
        const decodedString = fromBase64(encodedString);
        
        expect(decodedString).toEqual(baseText);
    })
});