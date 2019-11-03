function palindrome(str) {
	//Transform the string to lower case
	str = str.toLowerCase();

	//Use a regExp to select anything that is not a word character from the basic Latin alphabet
	str = str.replace(/[^A-Za-z0-9]/g, "");

	//Reverse the string
	var pal = str.split("").reverse().join("");

	//Check if the reversed string is equal to itself before reversing
	if (pal == str) {
		return true;
	} else {
		return false;
	}
}

palindrome("eye");