import React, { useState, useEffect } from "react";
import cx from "classnames";
import useRouter from "use-react-router";
import ReactPaginate from "react-paginate";
import { useWindowSize, useLockBodyScroll } from "react-use";

import { getAllHotels } from "./apiQueries";
import {
	BreadCrumbs,
	Icons,
	FilterPopup,
	HotelsFilter,
	getHotelsArr,
	citiesArr,
} from "../components/export";

export const HotelsList = () => {
	const className = "hotels";
	const { history } = useRouter();
	const { width } = useWindowSize();
	const isMobile = width <= 580;

	const bookingDataLS = JSON.parse(localStorage.getItem("bookingData")) || {
		origin: citiesArr[0],
		destination: citiesArr[1],
		date: {
			date: new Date(),
			dateInterval: 5,
		},
		travellers: {
			adults: 2,
			children: 1,
		},
		travellersValues: {
			adults: new Array(Number(2)).fill({}),
			children: new Array(Number(1)).fill({}),
		},
	};

	const [filterActiveTab, setFilterActiveTab] = useState(false);
	const [filterState, setFilterState] = useState(bookingDataLS);
	useLockBodyScroll(isMobile && filterActiveTab);

	const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
	const handleTabClick = ({ tab, value }) => {
		if (tab?.key === filterActiveTab) {
			setFilterActiveTab(false);
			isMobile && setIsFilterPopupOpen(false);
		} else {
			setFilterActiveTab(tab?.key);
			isMobile && setIsFilterPopupOpen(true);
		}

		if (value) {
			let newState = { ...filterState };
			newState[tab.key] = value;
			setFilterState(newState);
			localStorage.setItem("bookingData", JSON.stringify(newState));
			console.log("filterState", tab, newState);
		}
	};

	const layouts = {
		lines: {
			name: "lines",
			hotelsPerPage: 5,
		},
		squares: {
			name: "squares",
			hotelsPerPage: width <= 480 ? 3 : 10,
		},
	};
	const [layout, setLayout] = useState(layouts.lines);

	const [page, setPage] = useState(1);
	const [hotels, setHotels] = useState([]);
	const [hotelsPage, setHotelsPage] = useState([]);
	const pagesCount = Math.ceil(hotels?.length / layout.hotelsPerPage);

	const sliceHotelsArr = ({ hotels, page = 1 }) => {
		const hotelsCount = page * layout.hotelsPerPage;
		const startIndex = page === 1 ? 0 : hotelsCount - layout.hotelsPerPage;
		const hotelsPage = hotels.slice(
			startIndex,
			startIndex + layout.hotelsPerPage,
		);
		setHotelsPage(hotelsPage);

		console.log(
			"page",
			page,
			"hotelsCount",
			hotelsCount,
			"startIndex,endIndex ",
			startIndex,
			startIndex + layout.hotelsPerPage,
			hotelsPage,
		);
	};

	const handlePageChange = ({ selected }) => {
		const newPage = selected + 1;
		setPage(selected + 1);
		sliceHotelsArr({ hotels, page: newPage });
	};

	// клик по карточке
	const handleHotelCardClick = ({ hotel }) => {
		const link = `/hotel-details/${hotel.id}`;
		history.push(link);

		localStorage.setItem(
			"hotelDetailsPageData",
			JSON.stringify({
				title: hotel.title,
				link,
			}),
		);

		localStorage.setItem(
			"bookingData",
			JSON.stringify({ ...bookingDataLS, hotel }),
		);
	};

	useEffect(() => {
		const hotelsArr = getHotelsArr(25); // удалить строку после подкл. к апи
		setHotels(hotelsArr); // удалить строку после подкл. к апи
		sliceHotelsArr({ hotels: hotelsArr, page }); // удалить строку после подкл. к апи

		// запрос списка отелей
		getAllHotels().then(
			(response) => {
				//	const hotelsArr = getHotelsArr(25); //response.result ||
				setHotels(hotelsArr);
				sliceHotelsArr({ hotels: hotelsArr, page });
				console.log("RESPONSE", response);
			},
			(error) => {
				console.error("Error while geocoding", error);
			},
		);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	return (
		<div className={`container-s ${className}`}>
			<FilterPopup isOpen={isFilterPopupOpen}>
				<HotelsFilter
					filterState={filterState}
					activeTabKey={filterActiveTab}
					handleTabClick={handleTabClick}
				/>
			</FilterPopup>

			{/* хлебные крошки */}
			<BreadCrumbs>
				<div className={`${className}-header_layout`}>
					<Icons.Square
						onClick={() => {
							setFilterActiveTab(false);
							setLayout(layouts.squares);
						}}
						fill={layout.name === "squares" ? "#ED1C24" : "#E7E7E7"}
						className={`${className}-header_layout_squares`}
					/>
					<Icons.Lines
						onClick={() => {
							setFilterActiveTab(false);
							setLayout(layouts.lines);
						}}
						fill={layout.name === "lines" ? "#ED1C24" : "#E7E7E7"}
						className={`${className}-header_layout_lines`}
					/>
				</div>
			</BreadCrumbs>

			{/* список фильтров */}
			<HotelsFilter
				filterState={filterState}
				activeTabKey={isMobile ? false : filterActiveTab}
				handleTabClick={handleTabClick}
			/>

			{/* затеменение фона */}
			{filterActiveTab && !isMobile && (
				<div className={`${className}-overlay`} />
			)}

			{/* карточки  */}
			<div className={`${className}-list`}>
				{hotelsPage.map((hotel, i) => {
					return (
						<HotelCard
							handleHotelCardClick={() => handleHotelCardClick({ hotel })}
							hotel={hotel}
							row={layout.name === "lines"}
							key={i}
						/>
					);
				})}
			</div>

			{/* пагинация */}
			<div className={`${className}-pagination`}>
				<ReactPaginate
					previousLabel={
						<Icons.PaginationArrow
							className={`${className}-pagination_arrow-left`}
						/>
					}
					nextLabel={
						<Icons.PaginationArrow
							className={`${className}-pagination_arrow-right`}
						/>
					}
					breakLabel={"..."}
					pageCount={pagesCount}
					marginPagesDisplayed={1}
					pageRangeDisplayed={2}
					onPageChange={handlePageChange}
					containerClassName={"pagination"}
					pageClassName={"pagination_page"}
					activeClassName='pagination_page--active'
					previousClassName='pagination_prev'
					nextClassName='pagination_next'
				/>
			</div>
		</div>
	);
};

export default HotelsList;

const HotelCard = ({ hotel, row, handleHotelCardClick }) => {
	const className = "hotels-list_card";
	const { img, title, cities, date, price } = hotel;

	return (
		<div
			onClick={handleHotelCardClick}
			className={cx(className, {
				"hotels-list_card-row": row,
				"hotels-list_card-col": !row,
			})}>
			<img className={`${className}-img`} src={img} alt='hotel preview' />
			<div className={`${className}-content`}>
				<div className={`${className}-content_top`}>
					<h3 className={`${className}-title`}>{`${title} №${hotel.id}`}</h3>
					<p className={`${className}-subtitle`}> {cities} </p>
				</div>

				<div className={`${className}-content_bottom`}>
					<p className={`${className}-date`}>{date}</p>
					<p className={`${className}-price`}>{price}</p>
				</div>
			</div>
		</div>
	);
};
