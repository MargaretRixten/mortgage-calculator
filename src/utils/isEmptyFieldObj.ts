/* Функция для проверки объекта на пустоту его полей */
export function isEmptyFieldObj<T>(obj: T) {
	for (const key in obj) {
		if (obj[key] == null || obj[key] === undefined || obj[key] === '') {
			return false;
		}
	}
	return true;
}
