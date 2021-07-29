import React, { useState, useEffect } from "react";
import { Input, Button } from "../export";
import { Field, Form } from "react-final-form";
import useRouter from "use-react-router";

import { Checkbox } from "../export";
import Visa from "../../assets/visa.svg";
import Paypal from "../../assets/paypal.svg";
import Mastercard from "../../assets/master_card.svg";
import Mir from "../../assets/mir.svg";

export const BookingForm = ({ handlePay }) => {
	const className = "trevellers-form";
	const { history } = useRouter();
	const pathname = history?.location?.pathname;

	const travellersInputs = {
		name: "",
		birthDate: "",
		phone: "",
		passportNumber: "",
		issuingCountry: "",
		dateOfExpiry: "",
	};

	const getBookingLSData = () =>
		JSON.parse(localStorage.getItem("bookingData"));
	const travellersCountLSData = getBookingLSData()?.travellers;
	const travellersLSData = getBookingLSData()?.travellersValues;

	const [travellersForm, setTravellersForm] = useState({
		isOpen: pathname?.includes("travellers"),
		activePersonIndex: false,
		activeTravellersKey: "adults",
		travellers: {
			adults: new Array(Number(travellersCountLSData?.adults)).fill(
				travellersInputs,
			),
			children: new Array(Number(travellersCountLSData?.children)).fill(
				travellersInputs,
			),
		},
	});
	console.log("bookingLSData", getBookingLSData());
	const activePersonLSData =
		travellersLSData[travellersForm.activeTravellersKey] &&
		travellersLSData[travellersForm.activeTravellersKey][
			travellersForm?.activePersonIndex
		];

	const openTravellersForm = ({ index, activeTravellersKey }) => {
		history.push(`/hotel-details/${getBookingLSData()?.hotel?.id}/travellers`);

		localStorage.setItem(
			"hotelDetailsPageData",
			JSON.stringify({
				title: "Travellers",
				link: `/hotel-details/${getBookingLSData()?.hotel?.id}`,
				bookingForm: false,
				travellersForm: true,
			}),
		);

		setTravellersForm({
			...travellersForm,
			isOpen: true,
			activePersonIndex: index,
			activeTravellersKey,
		});
	};

	const onSubmitTravellersForm = ({ formState }) => {
		const travellersValues = travellersForm.travellers;
		const activeTravellersKey = travellersForm.activeTravellersKey;
		const activePersonIndex = travellersForm.activePersonIndex;

		let newTravellersState = { ...travellersValues };
		newTravellersState[activeTravellersKey][activePersonIndex] = formState;
		console.log("formState", newTravellersState);

		setTravellersForm({
			...travellersForm,
			isOpen: false,
			travellers: newTravellersState,
		});

		localStorage.setItem(
			"bookingData",
			JSON.stringify({
				...getBookingLSData(),
				travellersValues: newTravellersState,
			}),
		);
	};

	useEffect(() => {
		// console.log(hotelDetailsPageDataFromLS);
		setTravellersForm({
			...travellersForm,
			isOpen: pathname?.includes("travellers"),
		});
	}, [pathname]);

	return (
		<Form onSubmit={handlePay} initialValues={activePersonLSData}>
			{({ handleSubmit, values, form, invalid }) => {
				return (
					<form className={className} onSubmit={handleSubmit}>
						{!travellersForm.isOpen && (
							<div>
								<p className={`${className}_title`}>Travellers</p>
								{travellersForm.travellers.adults.map((input, i) => {
									const adultsLS = travellersLSData?.adults;
									const name = adultsLS[i]?.name || "";

									console.log("adultsLS", name);

									return (
										<Field
											// value={name}
											initialValue={name}
											name={`adult${i + 1}`}
											placeholder={`Adult ${i + 1}`}
											arrow
											onClick={() =>
												openTravellersForm({
													index: i,
													activeTravellersKey: "adults",
												})
											}
											validate={(value) => (value ? undefined : true)}
											key={i}
											component={Input}
										/>
									);
								})}
								{travellersForm.travellers.children.map((input, i) => {
									const childrenFromLS = travellersLSData?.children;

									return (
										<Input
											input={{
												value: childrenFromLS[i] && childrenFromLS[i].name,
											}}
											placeholder={`Kid ${i + 1}`}
											arrow
											onClick={() =>
												openTravellersForm({
													index: i,
													activeTravellersKey: "children",
												})
											}
											key={i}
										/>
									);
								})}

								<div className={`${className}_pay-block`}>
									<p className={`${className}_title`}>Pay with</p>

									<ul className={`${className}_pay-methods`}>
										<p className={`${className}_pay-methods_title`}>
											Payment method
										</p>

										<div className='row-bw-center'>
											{[Visa, Paypal, Mastercard, Mir].map((item, i) => (
												<img src={item} alt='pay methods' key={i} />
											))}
										</div>
									</ul>
								</div>
								<Field
									validate={(value) => (value ? undefined : true)}
									name='agree'
									label={
										"I agree to the Privacy Policy and the Terms of Service"
									}
									component={Checkbox}
								/>
								<Button text='Pay' type='submit' disabled={invalid} />
							</div>
						)}
						{travellersForm.isOpen && (
							<TravellersForm
								onSubmit={() => {
									onSubmitTravellersForm({ formState: values });
									form.reset();
								}}
							/>
						)}
					</form>
				);
			}}
		</Form>
	);
};

export default BookingForm;

export const TravellersForm = ({ onSubmit }) => {
	const className = "trevellers-form_person";
	const inputs = [
		{
			name: "name",
			placeholder: "Name",
		},
		{
			name: "birthDate",
			placeholder: "Date of Birth",
		},
		{
			name: "phone",
			placeholder: "Phone number",
			required: false,
		},
		{
			name: "passportNumber",
			placeholder: "Number",
		},
		{
			name: "issuingCountry",
			placeholder: "Issuing Country",
		},
		{
			name: "expiryDate",
			placeholder: "Date of expiry",
		},
	];

	const required = (value) => (value ? undefined : true);

	return (
		<div className={className}>
			{inputs.slice(0, 3).map((input, i) => {
				return <Field {...input} key={i} component={Input} />;
			})}

			<p className={`${className}-passport_title`}>Passport</p>
			{inputs.slice(3).map((input, i) => {
				return (
					<Field
						{...input}
						validate={input.required ? required : false}
						key={i}
						component={Input}
					/>
				);
			})}

			<Button text='Ok' onClick={onSubmit} />
		</div>
	);
};
