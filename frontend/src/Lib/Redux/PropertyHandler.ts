type PropertyHandler<
	A0 = any,
	A1 = any,
	A2 = any,
	A3 = any,
	A4 = any,
	A5 = any,
	A6 = any,
	A7 = any,
	A8 = any,
	A9 = any,
> = [A0] extends [undefined]
	? () => void
	: [A1] extends [undefined]
	? (...args: [A0]) => void
	: [A2] extends [undefined]
	? (...args: [A0, A1]) => void
	: [A3] extends [undefined]
	? (...args: [A0, A1, A2]) => void
	: [A4] extends [undefined]
	? (...args: [A0, A1, A2, A3]) => void
	: [A5] extends [undefined]
	? (...args: [A0, A1, A2, A3, A4]) => void
	: [A6] extends [undefined]
	? (...args: [A0, A1, A2, A3, A4, A5]) => void
	: [A7] extends [undefined]
	? (...args: [A0, A1, A2, A3, A4, A5, A6]) => void
	: [A8] extends [undefined]
	? (...args: [A0, A1, A2, A3, A4, A5, A6, A7]) => void
	: [A9] extends [undefined]
	? (...args: [A0, A1, A2, A3, A4, A5, A6, A7, A8]) => void
	: (...args: [A0, A1, A2, A3, A4, A5, A6, A7, A8, A9]) => void;

export default PropertyHandler;
