import React from "react";

const Checkbox = ({ label, input, className = "" }) => {
	return (
		<div className={`checkbox-wrapper ${className}`}>
			<input id={input.name} {...input} type='checkbox' className='checkbox' />
			<label className='checkbox-label' htmlFor={input.name}>
				{label}
			</label>
		</div>
	);
};

export default Checkbox;
