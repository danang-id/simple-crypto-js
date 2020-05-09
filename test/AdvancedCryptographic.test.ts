import {expect} from "chai"

import SimpleCrypto from "../src/SimpleCrypto"

const firstSecretKey = SimpleCrypto.generateRandomWordArray()
const secondSecretKey = SimpleCrypto.generateRandomWordArray()
const firstInstance = new SimpleCrypto(firstSecretKey)
const secondInstance = new SimpleCrypto(firstSecretKey.toString())

const object = {
	SimpleCrypto: "is great.",
	You: "should try it!"
}
const string = "SimpleCrypto is great."
const number = 19960404
const boolean = false

const cipherTextFromObject = firstInstance.update(object).encrypt()
const cipherTextFromString = firstInstance.setEncoder(SimpleCrypto.encoders.Utf16LE)
	.update(string)
	.encrypt()
const cipherTextFromNumber = firstInstance.setEncoder(SimpleCrypto.encoders.Default)
	.update(number)
	.encrypt()
const cipherTextFromBoolean = firstInstance.update(boolean).encrypt()

const cipherTextFromConcatObject = secondInstance.setSecret(secondSecretKey)
	.update(object)
	.append(object)
	.encrypt()
const cipherTextFromConcatString = secondInstance.setSecret(secondSecretKey.toString())
	.update(string)
	.append(string)
	.encrypt()
const cipherTextFromConcatNumber = secondInstance
	.update(number)
	.append(number)
	.encrypt()
const cipherTextFromConcatBoolean = secondInstance
	.update(boolean)
	.append(boolean)
	.encrypt()

const plainExpectsObject = firstInstance.update(cipherTextFromObject).decrypt()
const plainExpectsString = firstInstance.setEncoder(SimpleCrypto.encoders.Utf16LE)
	.update(cipherTextFromString)
	.decrypt()
const plainExpectsNumber = firstInstance.setEncoder(SimpleCrypto.encoders.Default)
	.update(cipherTextFromNumber)
	.decrypt()
const plainExpectsBoolean = firstInstance
	.decrypt(cipherTextFromBoolean, false, SimpleCrypto.encoders.Utf8)

const plainExpectsConcatObject = secondInstance.update(cipherTextFromConcatObject).decrypt()
const plainExpectsConcatString = secondInstance.update(cipherTextFromConcatString).decrypt()
const plainExpectsConcatNumber = secondInstance.update(cipherTextFromConcatNumber).decrypt()
const plainExpectsConcatBoolean = secondInstance.update(cipherTextFromConcatBoolean).decrypt()

function halvesString(src: string): string[] {
	const halfLength = Math.ceil(src.length / 2)
	return [
		src.substr(0, halfLength),
		src.substr(halfLength)
	]
}

describe("Advanced Cryptographic: Encryption", () => {
	it("should be able to encrypt from object using advanced method", () => {

		expect(cipherTextFromObject).to.be.a("string")
		expect(cipherTextFromObject).to.have.length(216)
		expect(cipherTextFromObject.substr(149, 1)).not.to.be.equals("=")
		expect(cipherTextFromObject.substr(150, 2)).to.be.equals("==")

		expect(cipherTextFromConcatObject).to.be.a("string")
		expect(cipherTextFromConcatObject).to.have.length(280)
		expect(cipherTextFromConcatObject.substr(213, 1)).not.to.be.equals("=")
		expect(cipherTextFromConcatObject.substr(214, 2)).to.be.equals("==")

	})

	it("should be able to encrypt from string using advanced method", () => {

		expect(cipherTextFromString).to.be.a("string")
		expect(cipherTextFromString).to.have.length(172)
		expect(cipherTextFromString.substr(106, 1)).not.to.be.equals("=")
		expect(cipherTextFromString.substr(107, 1)).to.be.equals("=")

		expect(cipherTextFromConcatString).to.be.a("string")
		expect(cipherTextFromConcatString).to.have.length(192)
		expect(cipherTextFromConcatString.substr(126, 2)).not.to.be.equals("==")

	})

	it("should be able to encrypt from number using advanced method", () => {

		expect(cipherTextFromNumber).to.be.a("string")
		expect(cipherTextFromNumber).to.have.length(152)
		expect(cipherTextFromNumber.substr(85, 1)).not.to.be.equals("=")
		expect(cipherTextFromNumber.substr(86, 2)).to.be.equals("==")

		expect(cipherTextFromConcatNumber).to.be.a("string")
		expect(cipherTextFromConcatNumber).to.have.length(172)
		expect(cipherTextFromConcatNumber.substr(106, 1)).not.to.be.equals("=")
		expect(cipherTextFromConcatNumber.substr(107, 1)).to.be.equals("=")

	})

	it("should be able to encrypt from boolean using advanced method", () => {

		expect(cipherTextFromBoolean).to.be.a("string")
		expect(cipherTextFromBoolean).to.have.length(152)
		expect(cipherTextFromBoolean.substr(85, 1)).not.to.be.equals("=")
		expect(cipherTextFromBoolean.substr(86, 2)).to.be.equals("==")

		expect(cipherTextFromConcatBoolean).to.be.a("string")
		expect(cipherTextFromConcatBoolean).to.have.length(152)
		expect(cipherTextFromConcatBoolean.substr(85, 1)).not.to.be.equals("=")
		expect(cipherTextFromConcatBoolean.substr(86, 2)).to.be.equals("==")

	})
})

describe("Advanced Cryptographic: Decryption", () => {
	it("should be able to decrypt to object using advanced method", () => {

		expect(plainExpectsObject).to.be.a("object")
		expect(plainExpectsObject).to.be.eql(object)

		expect(plainExpectsConcatObject).to.be.a("string")
		const halfObject = halvesString(<string>plainExpectsConcatObject)
		expect(halfObject[0]).to.be.eql(halfObject[1])
		expect(halfObject[0]).to.be.eql(JSON.stringify(object))
		expect(JSON.parse(halfObject[0])).to.be.a("object")
		expect(JSON.parse(halfObject[0])).to.be.eql(object)

	})

	it("should be able to decrypt to string using advanced method", () => {

		expect(plainExpectsString).to.be.a("string")
		expect(plainExpectsString).to.be.eql(string)

		expect(plainExpectsConcatString).to.be.a("string")
		const halfString = halvesString(<string>plainExpectsConcatString)
		expect(halfString[0]).to.be.eql(halfString[1])
		expect(halfString[0]).to.be.eql(string)
		expect(halfString[0]).to.be.a("string")
	})

	it("should be able to decrypt to number using advanced method", () => {

		expect(plainExpectsNumber).to.be.a("number")
		expect(plainExpectsNumber).to.be.eql(number)

		expect(plainExpectsConcatNumber).to.be.a("number")
		const halfNumber = halvesString(<string>plainExpectsConcatNumber.toString())
		expect(halfNumber[0]).to.be.eql(halfNumber[1])
		expect(halfNumber[0]).to.be.eql(number.toString())
		expect(parseInt(halfNumber[0].toString())).to.be.a("number")
		expect(parseInt(halfNumber[0].toString())).to.be.eql(number)
	})

	it("should be able to decrypt to boolean using advanced method", () => {

		expect(plainExpectsBoolean).to.be.a("boolean")
		expect(plainExpectsBoolean).to.be.eql(boolean)

		expect(plainExpectsConcatBoolean).to.be.a("string")
		const halfBoolean = halvesString(<string>plainExpectsConcatBoolean)
		expect(halfBoolean[0]).to.be.eql(halfBoolean[1])
		expect(halfBoolean[0]).to.be.eql(boolean.toString())
		expect(halfBoolean[0] === "true" || halfBoolean[0] === "false").to.be.eql(true)
		expect(halfBoolean[0] === boolean.toString()).to.be.eql(true)

	})
})
