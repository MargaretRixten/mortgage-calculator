// Маска для расстановки запятых в инпутах
export function divisionByRank(number: any) {
	return number
		.toString()
		.replace(/\D/g, '')
		.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}
