import React from "react";
import { Link } from "react-router-dom";

const ThemeBanner = ({ title, subtitle, link }) => {
	return (
		<Link to={link} className='container-m theme-banner'>
			<h2 className='theme-banner_title'> {title} </h2>
			<p className='theme-banner_subtitle'>{subtitle}</p>
		</Link>
	);
};

export default ThemeBanner;
