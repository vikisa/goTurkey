import React from "react";
import cx from "classnames";
import { Icons } from "../export";

const Input = ({ input, placeholder, className = "", arrow, onClick }) => {
	return (
		<div
			className={cx(
				`input-wrapper`,
				{
					"input-wrapper--arrow": arrow,
				},
				className,
			)}>
			<input
				className='input input-arrow'
				placeholder={placeholder}
				{...input}
				onClick={onClick && onClick}
			/>
			{arrow && <Icons.DropArrow />}
		</div>
	);
};

export default Input;
