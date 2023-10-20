function getPayment(sum: number, period: number) {
	const per = 5;

	let koef, result;

	koef = (i * Math.pow(1 + i, period * 12)) / (Math.pow(1 + i, period * 12) - 1);

	result = sum * koef;

	return result.toFixed();
}
