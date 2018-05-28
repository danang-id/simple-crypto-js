import * as mocha from "mocha";
import * as chai from "chai";

import SimpleCrypto from "../src/SimpleCrypto";

const expect = chai.expect;
const secretKey = SimpleCrypto.generateRandom();
const instance = new SimpleCrypto(secretKey);

const object = {
  SimpleCrypto: "is great.",
  You: "should try it!"
};
const string = "SimpleCrypto is great.";
const number = 19960404;
const boolean = false;

const cipherTextFromObject = instance.encrypt(object);
const cipherTextFromString = instance.encrypt(string);
const cipherTextFromNumber = instance.encrypt(number);
const cipherTextFromBoolean = instance.encrypt(boolean);

const plainExpectsObject = instance.decrypt(cipherTextFromObject, true);
const plainExpectsString = instance.decrypt(cipherTextFromString);
const plainExpectsNumber = instance.decrypt(cipherTextFromNumber);
const plainExpectsBoolean = instance.decrypt(cipherTextFromBoolean);

describe("Crpytographic: Encryption", () => {
  it("should be able to encrypt from object", () => {
    expect(cipherTextFromObject).to.be.a("string");
    expect(cipherTextFromObject).to.have.length(152);
    expect(cipherTextFromObject.substr(150, 2)).to.be.equals("==");
  });

  it("should be able to encrypt from string", () => {
    expect(cipherTextFromString).to.be.a("string");
    expect(cipherTextFromString).to.have.length(108);
    expect(cipherTextFromString.substr(107, 1)).to.be.equals("=");
  });

  it("should be able to encrypt from number", () => {
    expect(cipherTextFromNumber).to.be.a("string");
    expect(cipherTextFromNumber).to.have.length(88);
    expect(cipherTextFromNumber.substr(86, 2)).to.be.equals("==");
  });

  it("should be able to encrypt from boolean", () => {
    expect(cipherTextFromBoolean).to.be.a("string");
    expect(cipherTextFromBoolean).to.have.length(88);
    expect(cipherTextFromBoolean.substr(86, 2)).to.be.equals("==");
  });
});

describe("Crpytographic: Decrpytion", () => {
  it("should be able to decrypt to object", () => {
    expect(plainExpectsObject).to.be.a("object");
    expect(plainExpectsObject).to.be.eql(object);
  });

  it("should be able to decrypt to string", () => {
    expect(plainExpectsString).to.be.a("string");
    expect(plainExpectsString).to.be.eql(string);
  });

  it("should be able to decrypt to number", () => {
    expect(plainExpectsNumber).to.be.a("string");
    expect(plainExpectsNumber).to.be.eql(number.toString());
    expect(parseInt(plainExpectsNumber.toString())).to.be.a("number");
    expect(parseInt(plainExpectsNumber.toString())).to.be.eql(number);
  });

  it("should be able to decrypt to boolean", () => {
    expect(plainExpectsBoolean).to.be.a("string");
    expect(plainExpectsBoolean).to.be.eql(boolean.toString());
    expect(plainExpectsNumber === "true").to.be.a("boolean");
    expect(plainExpectsNumber === "true").to.be.eql(boolean);
  });
});
