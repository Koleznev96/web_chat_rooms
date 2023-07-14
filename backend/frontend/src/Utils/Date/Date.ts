export const getMonthName = (month: number) => {
	const date = new Date(2019, month, 1);
	return date.toLocaleString('default', {month: 'long'});
};
