export const STRIPE_PUBLISHABLE = 	process.env.NODE_ENV === "production" ? "pk_live_q8Dot55Hgdn09tlvEDWDBZLx00YHViMUXY" : "pk_test_veSmzIOx9GKjWUx92TBwl0Qq00NRw7pDpd";

export const PAYMENT_SERVER_URL =
	process.env.NODE_ENV === "production"
		? "http://myapidomain.com"
		: "http://localhost:8080";
