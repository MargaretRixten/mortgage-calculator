/* Функция по расчету ежемесячного платежа */
export function getPayment(sum: number, period: number) {
	const per = 5 / 12 / 100;

	const koef = (per * Math.pow(1 + per, period * 12)) / (Math.pow(1 + per, period * 12) - 1);

	const result = sum * koef;

	return Number(result.toFixed());
}
