import React from "react";

const RadioButton = ({ name, label, checked, onClick }) => {
	return (
		<div className='radio-btn_wrapper'>
			<input checked={checked} className='radio-btn' id={name} type='radio' />

			<button onClick={onClick} className='radio-btn-visible' />
			<label className='radio-btn_label' htmlFor={name}>
				{label}
			</label>
		</div>
	);
};

export default RadioButton;
