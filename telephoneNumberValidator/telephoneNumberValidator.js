// Using a regex works to

function telephoneCheck(str) {
	// Good luck!

	/*This create a String without chracters regex \W*/
	let splitStr = str.split(/\W+/).join("");
	console.log(`${str} da un array ${splitStr}`);
	/*strLen only has numbers*/
	let strLen = splitStr.length;

	let regex = /[?]/;
	/*We check is there are letters in the str*/
	if (parseInt(splitStr) == NaN) {
		return false;
	}
	/*We check is it begins with a number or parenthesis*/
	if (parseInt(str[0]) == NaN && str[0] != "(") {
		return false;
	}

	if (regex.test(str)) {
		return false;
	}

	/*
	*We check if it is long enough
	*IF it is 11 char long we check is the 
	*first number is 1 (number from EEUU)
	*/
	if (strLen != 10 && strLen != 11) {
		console.log(`${str} No son 10 ni 11 numeros`);
		return false;
	} else if (strLen == 11) {
		if (splitStr[0] != 1) {
			console.log(`${str} comienza por ${splitStr[0]} no es de EEUU`);
			return false;
		}
	}

	/*
	*Now we have to use the original string to verify is there are
	*Parentheses
	*/
	let parLIndex = str.indexOf("(");
	let parRIndex = str.indexOf(")");

	/*If there are parenthesis verify them*/
	if (parLIndex != -1 || parRIndex != -1) {
		if (parLIndex == -1 && parRIndex != -1) {
			console.log(`${str} missing left parenthesis`);
			return false;
		} else if (parLIndex != -1 && parRIndex == -1) {
			console.log(`${str} missing right parenthesis`);
			return false;
		} else if (parRIndex != parLIndex + 4) {
			console.log(`${str} parenthesis must contain only 3 numbers`);
			return false;
		}

		/*We verify the parenthesis begin ok*/
		if (strLen == 11) {
			if (str[1] == " ") {
				if (parLIndex != 2) {
					return false;
				}
			} else {
				if (parLIndex != 1) {
					console.log("If it use area code the parenthesis must go after it");
					return false;
				}
			}

		} else if (strLen == 10) {
			if (parLIndex != 0) {
				console.log("If it use parenthesis and not area code the number must begin with them");
				return false;
			}
		}
	}


	return true;
}

telephoneCheck("555-555-5555");