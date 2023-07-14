const initialUser = {
	email: '',
	token: '',
	refreshToken: '',
};

const sevenDays = 7 * 24 * 60 * 60 * 1000;

function getWithExpiry(key: string) {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item;
}

export {initialUser, sevenDays, getWithExpiry};
