import fs from 'fs';
import path from 'path';
import UglifyJS from 'uglify-js';

const distFileLocation: fs.PathLike = path.join(__dirname, '..', 'dist', 'SimpleCrypto.js');
const minifiedDistFileLocation: fs.PathLike = path.join(__dirname, '..', 'dist', 'SimpleCrypto.min.js');

const options: UglifyJS.MinifyOptions = {
	toplevel: true,
	ie8: true,
	output: {
		beautify: false,
		shebang: false,
		preamble: `/**
 * MIT License
 * 
 * Copyright (c) 2017 Danang Galuh Tegar Prasetyo
 * -------------------------------------
 */
 `
	}
};

try {
	let distFileContent = fs.readFileSync(distFileLocation, 'utf-8');
	const result: UglifyJS.MinifyOutput = UglifyJS.minify(distFileContent, options);
	if (result.error) {
		console.log(result.error);
		process.exit(2);
	}
	distFileContent = distFileContent.concat(options.output.preamble);
	const minifiedDistFileContent = result.code;
	fs.writeFileSync(distFileLocation, distFileContent, {
		encoding: 'utf-8'
	});
	fs.writeFileSync(minifiedDistFileLocation, minifiedDistFileContent, {
		encoding: 'utf-8'
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}
