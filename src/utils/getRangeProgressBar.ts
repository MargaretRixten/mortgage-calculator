/* Функция для нахождения длины прогресс-бара в input range */
export const getRangeProgressBar = (value: number, min: number, max: number) => {
	if (((value - min) / (max - min)) * 100 < 1) {
		return 0;
	}
	return ((value - min) / (max - min)) * 100;
};
