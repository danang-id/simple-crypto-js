import { expect } from "chai"

import SimpleCrypto from "../src/SimpleCrypto"

const secretKey = SimpleCrypto.generateRandomWordArray()
const instance = new SimpleCrypto(secretKey)

const object = {
	SimpleCrypto: "is great.",
	You: "should try it!",
}
const emptyString = ""
const string = "SimpleCrypto is great."
const stringThatStartsWithNumber = "49ers are my favorite team!"
const number = 19960404
const boolean = false

const cipherTextFromObject = instance.encryptObject(object)
const cipherTextFromString = instance.encrypt(string)
const cipherTextFromEmptyString = instance.encrypt(emptyString)
const cipherTextFromStringThatStartsWithNumber = instance.encrypt(stringThatStartsWithNumber)
const cipherTextFromNumber = instance.encrypt(number)
const cipherTextFromBoolean = instance.encrypt(boolean)

const plainExpectsObject = instance.decryptObject(cipherTextFromObject)
const plainExpectsString = instance.decrypt(cipherTextFromString, SimpleCrypto.encoders.Utf8)
const plainExpectsEmptyString = instance.decrypt(cipherTextFromEmptyString)
const plainExpectsStringThatStartsWithNumber = instance.decrypt(cipherTextFromStringThatStartsWithNumber)
const plainExpectsNumber = instance.decrypt(cipherTextFromNumber, false)
const plainExpectsBoolean = instance.decrypt(cipherTextFromBoolean)

describe("Cryptographic: Encryption", () => {
	it("should be able to encrypt from object", () => {
		expect(cipherTextFromObject).to.be.a("string")
		expect(cipherTextFromObject).to.have.length(216)
		expect(cipherTextFromObject.substr(149, 1)).not.to.be.equals("=")
		expect(cipherTextFromObject.substr(150, 2)).to.be.equals("==")
	})

	it("should be able to encrypt from string", () => {
		expect(cipherTextFromString).to.be.a("string")
		expect(cipherTextFromString).to.have.length(172)
		expect(cipherTextFromString.substr(106, 1)).not.to.be.equals("=")
		expect(cipherTextFromString.substr(107, 1)).to.be.equals("=")
	})

	it("should be able to encrypt from empty string", () => {
		expect(cipherTextFromEmptyString).to.be.a("string")
		expect(cipherTextFromEmptyString).to.have.length(152)
		expect(cipherTextFromEmptyString.substr(85, 1)).not.to.be.equals("=")
		expect(cipherTextFromEmptyString.substr(86, 2)).to.be.equals("==")
	})

	it("should be able to encrypt from empty string that starts with number", () => {
		expect(cipherTextFromStringThatStartsWithNumber).to.be.a("string")
		expect(cipherTextFromStringThatStartsWithNumber).to.have.length(172)
		expect(cipherTextFromStringThatStartsWithNumber.substr(106, 1)).not.to.be.equals("=")
		expect(cipherTextFromStringThatStartsWithNumber.substr(107, 1)).to.be.equals("=")
	})

	it("should be able to encrypt from number", () => {
		expect(cipherTextFromNumber).to.be.a("string")
		expect(cipherTextFromNumber).to.have.length(152)
		expect(cipherTextFromNumber.substr(85, 1)).not.to.be.equals("=")
		expect(cipherTextFromNumber.substr(86, 2)).to.be.equals("==")
	})

	it("should be able to encrypt from boolean", () => {
		expect(cipherTextFromBoolean).to.be.a("string")
		expect(cipherTextFromBoolean).to.have.length(152)
		expect(cipherTextFromBoolean.substr(85, 1)).not.to.be.equals("=")
		expect(cipherTextFromBoolean.substr(86, 2)).to.be.equals("==")
	})
})

describe("Cryptographic: Decryption", () => {
	it("should be able to decrypt to object", () => {
		expect(plainExpectsObject).to.be.a("object")
		expect(plainExpectsObject).to.be.eql(object)
	})

	it("should be able to decrypt to string", () => {
		expect(plainExpectsString).to.be.a("string")
		expect(plainExpectsString).to.be.eql(string)
	})

	it("should be able to decrypt to empty string", () => {
		expect(plainExpectsEmptyString).to.be.a("string")
		expect(plainExpectsEmptyString).to.be.eql(emptyString)
	})

	it("should be able to decrypt to string that starts with number", () => {
		expect(plainExpectsStringThatStartsWithNumber).to.be.a("string")
		expect(plainExpectsStringThatStartsWithNumber).to.be.eql(stringThatStartsWithNumber)
	})

	it("should be able to decrypt to number", () => {
		expect(plainExpectsNumber).to.be.a("number")
		expect(plainExpectsNumber).to.be.eql(number)
	})

	it("should be able to decrypt to boolean", () => {
		expect(plainExpectsBoolean).to.be.a("boolean")
		expect(plainExpectsBoolean).to.be.eql(boolean)
	})
})
