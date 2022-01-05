/*eslint no-unused-vars: "off"*/
let generator = require('generate-password');

// Generate one password with provided list of symbols.
password = generator.generate({
	length: 8, // defaults to 10
	numbers: true, // defaults to false
    symbols: '!@#$%&*', // defaults to false
    lowercase:true,
	uppercase: true, // defaults to true
	strict: true // defaults to false
});
console.log(password);

