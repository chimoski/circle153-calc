import Button from "./components/Button";

const btnValues = [
	["c", "%", "DEL", "/"],
	["7", "8", "9", "*"],
	["4", "5", "6", "-"],
	["1", "2", "3", "+"],
	["0", ".", "="],
];
function App() {
	return (
		<div className='wrapper'>
			<div className='screen'>
				<input type='text' className='input' value='0' />
			</div>
			<div className='button_wrapper'>
				{btnValues.flat().map((value, idx) => (
					<Button
						key={idx}
						value={value}
						onClick={() => {
							console.log(value);
						}}
						className={value === "0" ? "spanMore" : ""}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
