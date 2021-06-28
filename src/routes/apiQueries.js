const headers = {
	method: "GET",
	mode: "cors",
	cache: "no-cache",
	credentials: "same-origin",
	headers: {
		"Content-Type": "application/json",
	},
	redirect: "follow",
	referrerPolicy: "no-referrer",
};

const ENDPOINT = "https://apitest.fun:9595/api/v1";

const fetchApi = async ({ url }) => {
	const response = await fetch(`${ENDPOINT}/${url}`, headers);
	return await response.json();
};
export const getAllHotels = () => fetchApi({ url: "hotels" });

export const getHotelById = (id) => fetchApi({ url: `hotels?id=${id}` });

export const getAllTours = () => fetchApi({ url: "tours" });

export const getHotelImages = (id) =>
	fetchApi({ url: `hotel-images?id=${id}` });

export const getHotelTypes = () => fetchApi({ url: "hotel-types" });

export const getHotelFeatures = () => fetchApi({ url: "hotel-features" });

export const getHotelClasses = () => fetchApi({ url: "hotel-classes" });

export const getHotelChains = () => fetchApi({ url: "hotel-chains" });

export const getHotelsFormats = () => fetchApi({ url: "hotel-formats" });

export const getHotelsDescriptions = () =>
	fetchApi({ url: "hotel-descriptions" });

export const getFlightsByID = (id) => fetchApi({ url: `flights?id=${id}` });

export const flightsSearch = ({
	fly_from,
	fly_to,
	date_from,
	date_to,
	limit = 4,
}) =>
	fetchApi({
		url: `flights/search?fly_from=${fly_from}&fly_to=${fly_to}&date_from=${date_from}&date_to=${date_to}&limit=${limit}`,
	});

export const saveBooking = ({
	bags = 0,
	booking_token,
	currency = "USD",
	lang,
	locale,
	passengers = [
		// {
		// 	birthday,
		// 	cardno,
		// 	category,
		// 	email,
		// 	expiration,
		// 	name: firstName,
		// 	nationality,
		// 	phone,
		// 	surname,
		// 	title,
		// },
	],
}) =>
	fetchApi({
		url: `bookings/save?bags=${bags}&booking_token=${booking_token}&currency=${currency}&passengers=${passengers}`,
	});
