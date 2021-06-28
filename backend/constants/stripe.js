const configureStripe = require("stripe");

const STRIPE_SECRET_KEY =
	process.env.NODE_ENV === "production"
		? "pk_live_q8Dot55Hgdn09tlvEDWDBZLx00YHViMUXY"
		: "pk_test_veSmzIOx9GKjWUx92TBwl0Qq00NRw7pDpd";

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
