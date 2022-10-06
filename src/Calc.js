import { clear } from "@testing-library/user-event/dist/clear";
import { useReducer } from "react";
import Button from "./components/Button";

const btnValues = [
	["AC", "%", "DEL", "/"],
	["7", "8", "9", "*"],
	["4", "5", "6", "-"],
	["1", "2", "3", "+"],
	["0", ".", "="],
];

const _digits = btnValues
	.flat()
	.filter((item) => item / 1 == item || item === ".");
const _signs = ["/", "*", "-", "+", "%"];

const initialState = {
	previousValues: null,
	currentValue: "0",
	signValues: null,
	overWrite: false,
};

const actions = {
	ADD_DIGIT: "add_digit",
	CLEAR: "clear_values",
	DELETE: "delete_digit",
	CHOOSE_SIGN: "choose_sign",
	EVALUATE: "evaluate",
};
const reducer = (state, { type, payload }) => {
	const { currentValue, previousValues, overWrite, signValues } = state;
	switch (type) {
		case actions.ADD_DIGIT:
			if (payload == "0" && currentValue == "0") return state;
			if (payload == "." && currentValue.includes(".")) return state;
			if (overWrite === true) {
				return {
					...state,
					currentValue: payload,
					overWrite: false,
				};
			}
			if (currentValue == "0" && payload && payload !== ".") {
				return {
					...state,
					currentValue: payload,
				};
			}
			return {
				...state,
				currentValue: `${currentValue ?? ""}${payload}`,
			};

		case actions.CLEAR:
			return {
				previousValues: null,
				currentValue: "0",
				signValues: null,
			};

		case actions.CHOOSE_SIGN:
			if (state.currentValue == "0" && previousValues == null) return state;

			if (currentValue == null) {
				return {
					...state,
					signValues: payload,
				};
			}
			if (previousValues == null) {
				return {
					...state,
					signValues: payload,
					previousValues: currentValue,
					currentValue: null,
				};
			}
			return {
				...state,
				signValues: payload,
				previousValues: _eval(state),
				currentValue: null,
			};
		case actions.EVALUATE:
			if (currentValue && previousValues == null) {
				return {
					...state,
					currentValue: currentValue,
				};
			}
			return {
				previousValues: null,
				currentValue: _eval(state),
				signValues: null,
				overWrite: true,
			};
		case actions.DELETE:
			if (currentValue == null) return state;
			if (overWrite === true) {
				return {
					...state,
					overWrite: false,
					currentValue: "0",
				};
			}
			if (currentValue.length === 1 && !signValues) {
				return {
					...state,
					currentValue: "0",
				};
			}
			if (currentValue && signValues) {
				return {
					...state,
					currentValue: currentValue.slice(0, -1),
				};
			}
			return {
				...state,
				currentValue: currentValue.slice(0, -1),
			};

		default:
			return state;
	}
};
function _eval({ previousValues, currentValue, signValues }) {
	const prev = parseFloat(previousValues);
	const curr = parseFloat(currentValue);

	let computation = "";
	switch (signValues) {
		case "+":
			computation = prev + curr;
			break;
		case "-":
			computation = prev - curr;
			break;
		case "/":
			computation = prev / curr;
			break;
		case "*":
			computation = prev * curr;
			break;
		case "%":
			computation = (prev * curr) / 100;
			break;
		default:
			break;
	}
	return computation.toString();
}

function Calc() {
	const [{ previousValues, currentValue, signValues }, dispatch] = useReducer(
		reducer,
		initialState
	);
	function addDigit(value) {
		dispatch({ type: actions.ADD_DIGIT, payload: value });
	}
	function addSigns(value) {
		dispatch({ type: actions.CHOOSE_SIGN, payload: value });
	}
	return (
		<div className='wrapper'>
			<div className='screen'>
				<div className='prev'>{previousValues}</div>
				<div className='curr'>
					{currentValue}
					{signValues}
				</div>
			</div>
			<div className='button_wrapper'>
				{btnValues.flat().map((value, idx) => (
					<Button
						key={idx}
						value={value}
						onClick={() => {
							_digits.includes(value)
								? addDigit(value)
								: value === "AC"
								? dispatch({ type: actions.CLEAR })
								: _signs.includes(value)
								? addSigns(value)
								: value === "="
								? dispatch({ type: actions.EVALUATE })
								: value === "DEL"
								? dispatch({ type: actions.DELETE })
								: "";
						}}
						className={value === "0" ? "spanMore" : ""}
					/>
				))}
			</div>
		</div>
	);
}

export default Calc;
