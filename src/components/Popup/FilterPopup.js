import React, { useState } from "react";
import cx from "classnames";

import { Button } from "../export";

const FilterPopup = ({ isOpen, children }) => {
	return (
		<div
			className={cx("popup-wrapper", {
				"popup-wrapper--open": isOpen,
			})}>
			<div
				className={cx("popup", {
					"popup-open": isOpen,
				})}>
				{children}
			</div>
		</div>
	);
};

export default FilterPopup;
