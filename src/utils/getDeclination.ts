/* Функция для склонения слов */
export function getDeclination(count: number, wordsArray: string[]) {
	const options = [2, 0, 1, 1, 1, 2];
	return wordsArray[count % 100 > 4 && count % 100 < 20 ? 2 : options[Math.min(count % 10, 5)]];
}
