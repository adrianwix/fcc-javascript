function rot13(str) { // LBH QVQ VG!

	var desCipher = "";
	for (var w = 0; w < str.length; w++) {

		var a = str.charCodeAt(w);
		var b = (90 - str.charCodeAt(w));

		if (a < 65 || a > 90) {

			desCipher += String.fromCharCode(a);

		} else if (b < 13) {

			var c = 13 - b;
			desCipher += String.fromCharCode(64 + c);

		} else {

			desCipher += String.fromCharCode(a + 13);

		}
	} //End of For Loop

	return desCipher;

}

// Change the inputs below to test
rot13("SERR PBQR PNZC");