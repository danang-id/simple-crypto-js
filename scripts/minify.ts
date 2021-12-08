import fs from "fs"
import path from "path"
import UglifyJS from "uglify-js"
import { version } from "../package.json"

const distFileLocation: fs.PathLike = path.join(__dirname, "..", "dist", "SimpleCrypto.js")
const minifiedDistFileLocation: fs.PathLike = path.join(__dirname, "..", "dist", "SimpleCrypto.min.js")

const options: UglifyJS.MinifyOptions = {
	toplevel: true,
	ie8: true,
	output: {
		beautify: false,
		shebang: true,
	},
}

const preamble = `/**
 * SimpleCrypto v${version}
 *
 * Copyright © ${new Date().getFullYear()} Danang Galuh Tegar Prasetyo.
 * This library is licensed under the MIT License.
 * -------------------------------------
 */
`

try {
	let distFileContent = fs.readFileSync(distFileLocation, "utf-8")
	const result: UglifyJS.MinifyOutput = UglifyJS.minify(distFileContent, options)
	if (result.error) {
		console.log(result.error)
		process.exit(-1)
	}
	distFileContent = preamble.concat(distFileContent)
	const minifiedDistFileContent = preamble.concat(result.code)
	fs.writeFileSync(distFileLocation, distFileContent, {
		encoding: "utf-8",
	})
	fs.writeFileSync(minifiedDistFileLocation, minifiedDistFileContent, {
		encoding: "utf-8",
	})
} catch (error) {
	console.log(error)
	process.exit(1)
}
