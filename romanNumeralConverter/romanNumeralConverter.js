function convertToRoman(num) {

	var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	var roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

	var romanized = '';

	for (var w = 0; w < decimal.length; w++) {
		while (decimal[w] <= num) {
			romanized += roman[w];
			num -= decimal[w];
		}
	}

	return romanized;

}

convertToRoman(36);