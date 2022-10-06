export const btnValues = [
	["AC", "%", "DEL", "➗"],
	["7", "8", "9", "✖️"],
	["4", "5", "6", "-"],
	["1", "2", "3", "+"],
	["0", ".", "="],
];
export const _digits = btnValues
	.flat()
	.filter((item) => item / 1 == item || item === ".");
export const operators = ["➗", "✖️", "-", "+", "="];
export const _signs = ["➗", "✖️", "-", "+", "%"];
export const actions = {
	ADD_DIGIT: "add_digits",
	ADD_OPERANDS: "add_operands",
	CLEAR: "clear",
};
