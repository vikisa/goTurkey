import React from "react";

const RadioButton = ({ name, label, checked, onClick }) => {
	return (
		<div className=''>
			<input
				onClick={onClick}
				checked={checked}
				className='radio-btn'
				id={name}
				type='radio'
			/>
			<label className='radio-btn_label' htmlFor={name}>
				{label}
			</label>
		</div>
	);
};

export default RadioButton;
