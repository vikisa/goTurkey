import React from "react";
import { Header, Footer } from "../export";

const LayoutApp = ({ children }) => {
	return (
		<div className='app'>
			<Header />
			<div className='appp'>{children}</div>
			<Footer />
		</div>
	);
};

export default LayoutApp;
