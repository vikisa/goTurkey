import { lazy } from "react";

const Main = lazy(() => import("./Main"));
const HotelsList = lazy(() => import("./HotelsList"));
const HotelDetails = lazy(() => import("./HotelDetails"));
const Purchase = lazy(() => import("./Purchase"));

export const AppRoutes = [
	{
		path: "/",
		exact: true,
		Component: Main,
	},
	{
		path: "/all-hotels",
		exact: true,
		Component: HotelsList,
		breadCrumb: "All hotels",
	},
	{
		path: "/hotels",
		exact: false,
		Component: HotelsList,
	},
	{
		path: "/hotel-details/:id",
		exact: false,
		Component: HotelDetails,
	},
	{
		path: "/hotel-details/:id/purchase",
		exact: false,
		Component: HotelDetails,
	},
	{
		path: "/hotel-details/:id/travellers",
		exact: false,
		Component: HotelDetails,
	},
];
