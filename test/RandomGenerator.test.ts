import * as mocha from "mocha";
import * as chai from "chai";

import SimpleCrypto from "../src/SimpleCrypto";

const expect = chai.expect;
const keyLength = {
  default: 128,
  custom: 256
};

describe("Random Generator", () => {
  it("expects random string", () => {
    const random = SimpleCrypto.generateRandom();
    expect(random).to.be.a("string");
  });

  it("expects random string (using default key length)", () => {
    const usedKeyLength = keyLength.default;
    const random = SimpleCrypto.generateRandom(usedKeyLength);
    expect(random).to.be.a("string");
    expect(random).to.have.lengthOf(usedKeyLength / 4);
  });

  it("expects random string (using customised key length)", () => {
    const usedKeyLength = keyLength.custom;
    const random = SimpleCrypto.generateRandom(usedKeyLength);
    expect(random).to.be.a("string");
    expect(random).to.have.lengthOf(usedKeyLength / 4);
  });

  it("expects random WordArray (using default key length)", () => {
    const usedKeyLength = keyLength.default;
    const random = SimpleCrypto.generateRandom(usedKeyLength, true);
    expect(random).to.be.a("object");
    expect(random).to.have.keys(["words", "sigBytes"]);
    expect(random["words"]).to.be.a("array");
    expect(random["words"].length).to.be.equals(usedKeyLength / 32);
    expect(random["sigBytes"]).to.be.equals(usedKeyLength / 8);
  });

  it("expects random WordArray (using customised key length)", () => {
    const usedKeyLength = keyLength.custom;
    const random = SimpleCrypto.generateRandom(usedKeyLength, true);
    expect(random).to.be.a("object");
    expect(random).to.have.keys(["words", "sigBytes"]);
    expect(random["words"]).to.be.a("array");
    expect(random["words"].length).to.be.equals(usedKeyLength / 32);
    expect(random["sigBytes"]).to.be.equals(usedKeyLength / 8);
  });
});
