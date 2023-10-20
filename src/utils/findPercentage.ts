/* Находит процент первоначального взноса от стоимости недвижимости.
Применяется в случае, когда первоначальноый взнос указывается больше стоимости недвижимости
 */

export const findPercentage = (value: number, newValue: number) => {
	return Math.round((newValue * 100) / value);
};
