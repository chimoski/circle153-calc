import { logDOM } from "@testing-library/react";
import { useReducer } from "react";
import Button from "./components/Button";
import { actions, btnValues, operators, _digits, _signs } from "./Initials";

const initialState = {
	currValue: "0",
	prevValue: null,
	operands: null,
};
const reducer = (state, { type, payload }) => {
	const { currValue } = state;
	switch (type) {
		case actions.ADD_DIGIT:
			if (currValue == "0" && payload == "0") return state;
			if (payload == "." && currValue.includes(".")) return state;

			// here we removed the initial zeros
			if (currValue == "0" && payload !== "0") {
				return {
					...state,
					currValue: payload,
				};
			}
			//
			return {
				...state,
				currValue: `${currValue || ""}${payload}`,
			};

		case actions.ADD_OPERANDS:
			if (currValue == "0" && prevValue == null) return state;
			// if (currValue == null) {
			// 	return {
			// 		...state,
			// 		operands: payload,
			// 	};
			// }
			if (prevValue == null) {
				return {
					...state,
					operands: payload,
					prevValue: currValue,
					currValue: null,
				};
			}
			return {
				...state,
				prevValue: calculate(state),
				operands: payload,
				currValue: null,
			};
		case actions.CLEAR:
			return {
				currValue: "0",
				prevValue: null,
				operands: null,
			};

		default:
			break;
	}
};

function calculate({ currValue, prevValue, operands }) {
	const prev = parseFloat(prevValue);
	const curr = parseFloat(currValue);
	let calcutlated = "";
	if (isNaN(prev) || isNaN(curr)) return "";
	switch (operands) {
		case "+":
			calcutlated = prev + curr;
			break;
		case "-":
			calcutlated = prev - curr;
			break;
		case "➗":
			calcutlated = prev / curr;
			break;
		case "✖️":
			calcutlated = prev * curr;
			break;
		case "%":
			calcutlated = (prev * curr) / 100;
			break;
		default:
			break;
	}

	return calcutlated.toString();
}
function App() {
	const [{ currValue, prevValue, operands }, dispatch] = useReducer(
		reducer,
		initialState
	);
	return (
		<div className='wrapper'>
			<div className='screen'>
				<div className='screen1'>{prevValue}</div>
				<div className='screen2'>
					{currValue}
					{operands}
				</div>
			</div>
			<div className='button_wrapper'>
				{btnValues.flat().map((value, idx) => (
					<Button
						key={idx}
						value={value}
						onClick={() => {
							_digits.includes(value)
								? dispatch({ type: actions.ADD_DIGIT, payload: value })
								: value === "AC"
								? dispatch({ type: actions.CLEAR })
								: _signs.includes(value)
								? dispatch({ type: actions.ADD_OPERANDS, payload: value })
								: "null";
						}}
						className={
							value === "0"
								? "spanMore"
								: operators.includes(value)
								? "oprStyle"
								: ""
						}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
