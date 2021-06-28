import React from "react";

import { Link } from "react-router-dom";

const ButtonBase = ({
	variant = "primary",
	size = "middle",
	type = "button",
	disabled = false,
	text,
	onClick,
	className = "",
}) => {
	const variants = {
		primary: "primary",
		secondary: "secondary",
		gray: "gray",
		round: "round",
	};

	const sizes = {
		small: "small",
		middle: "middle",
		big: "big",
	};

	return (
		<button
			onClick={onClick}
			className={`btn btn--${sizes[size]} btn--${variants[variant]} ${className}`}
			type={type}
			disabled={disabled}>
			{text}
		</button>
	);
};

const Button = (props) => {
	const { link, href } = props;
	return link ? (
		<Link to={link} className='btn-link'>
			<ButtonBase {...props} />
		</Link>
	) : href ? (
		<a href={href}>
			<ButtonBase {...props} />
		</a>
	) : (
		<ButtonBase {...props} />
	);
};

export default Button;
