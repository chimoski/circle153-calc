import React from "react";

const Button = ({ value, onClick, className }) => {
	return (
		<button className={`btn ${className}`} onClick={onClick}>
			{value}
		</button>
	);
};

export default Button;
