/* Нахождение значения, деленного на процент */
export const getValueDivisionByPercent = (value: number, per: number) => {
	return Math.round(value * (per / 100));
};
