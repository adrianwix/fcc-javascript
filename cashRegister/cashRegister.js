function checkCashRegister(price, cash, cid) {

	let change = parseFloat(cash) - parseFloat(price),
		start,
		cashValue = [
			["PENNY", 0.01],
			["NICKEL", 0.05],
			["DIME", 0.1],
			["QUARTER", 0.25],
			["ONE", 1],
			["FIVE", 5],
			["TEN", 10],
			["TWENTY", 20],
			["ONE HUNDRED", 100]
		];

	var changeObj = {
		status: "",
		change: []
	};

	/*
	*Let see beforehand if we have enough cid to return 
	*/
	let cidReduce = Math.round10(cid.map((x) => x[1]).reduce((a, b) => a + b), -2);

	if (cidReduce < change) {

		changeObj.status = "INSUFFICIENT_FUNDS";
		return changeObj;

	} else if (cidReduce == change) {

		changeObj.status = "CLOSED";
		changeObj.change = [...cid];
		return changeObj;

	}
	console.log("Cid reduced is " + cidReduce);

	/*
	*Lets turn the input cash-in-drawer to 
	*How many of each type of cash we have
	*/

	let totalCash = cid.map(function (value, index) {
		if (value[1] == 0) {
			return 0;
		} else {
			return Math.round10(value[1] / cashValue[index][1], -1);
		}
	});

	/* 
	*We can´t return a coin with more value than the change
	*We use an inverse loop to find out where to start looking
	*/
	for (let w = cashValue.length - 1; w > -1; w--) {
		if (change >= cashValue[w][1] && totalCash[w] != 0) {
			start = w;
			console.log(`We start at ${cashValue[start]}`);
			break;
		}
	}

	/*We begin from start point to penny*/
	let currentChange = change;
	let changeReady = false;

	for (let w = start; w > -1; w--) {

		if (totalCash[w] == 0) {
			continue;
		} else if (currentChange < cashValue[w][1]) {
			console.log("Llegue aqui");
			continue;
		}

		let modulus = Math.round10(currentChange % cashValue[w][1], -2);
		let coins = Math.round10((currentChange - modulus) / cashValue[w][1]);

		console.log(`Estamos usando el ${cashValue[w][0]} el cambio es de ${change} y el cambio actual es ${currentChange}. El mudulus es ${modulus} y necesitamos ${coins} monedas`);

		if (modulus === 0) {

			changeObj.status = "OPEN";
			changeObj.change.push([cashValue[w][0], cashValue[w][1] * coins]);
			changeReady = true;

		} else if (modulus > 0 && modulus < cashValue[w][1]) {
			console.log(`Necesitamos ${coins} y tenemos ${totalCash[w]}`);
			if (coins < totalCash[w]) {
				changeObj.change.push([cashValue[w][0], cashValue[w][1] * coins]);
				currentChange = modulus;

			} else {
				changeObj.change.push([cashValue[w][0], cashValue[w][1] * totalCash[w]]);
				currentChange = Math.round10(currentChange - (totalCash[w] * cashValue[w][1]), -2);
			}

		} else if ((cashValue[start][1] * totalCash[start]) < change) {
			changeObj.status = "INSUFFICIENT_FUNDS";
			return changeObj;
		}

		if (changeReady) {
			break;
		}

	}

	console.log(changeObj);

	return changeObj;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

/*This MDN function will help us handle better the decimals*/
/*https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/ceil*/

(function () {
    /**
     * Ajuste decimal de un número.
     *
     * @param {String}  type  El tipo de ajuste.
     * @param {Number}  value El número.
     * @param {Integer} exp   El exponente (El logaritmo de ajuste en base 10).
     * @returns {Number} El valor ajustado.
     */
	function decimalAdjust(type, value, exp) {
		// Si exp es undefined o cero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// Si el valor no es un número o exp no es un entero...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function (value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
})();

checkCashRegister(19.5, 20, [["PENNY", 0.05], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);