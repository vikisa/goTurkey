import React, {useEffect} from "react";
import { useWindowSize } from "react-use";
import {
	CarouselProvider,
	Slider,
	ButtonBack,
	ButtonNext,
	Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { Icons, ThemeBanner, apiMethods } from "../export";

const ThemeTemplate = ({
	banner,
	theme,
	link,
	hotels,
	goToHotelsList,
	className,
}) => {
	const { width } = useWindowSize();
	const goToHotelsListByTheme = () => {
		goToHotelsList({ hotelsListLink: link, breadCrumb: theme.title });
	};
	return (
		<section className={`theme `}>
			{banner && <ThemeBanner {...banner} link='/hotels' />}
			<div className='container-l theme-slider'>
				<div
					onClick={goToHotelsListByTheme}
					className={`container-m theme-card theme-card--${className} `}>
					<img className='theme-card_img' src={theme.img} alt='theme' />
					<div className={`theme-card_border`} />

					<div className='theme-card_overlay' />
					<h3 className='theme-card_title'> {theme.title} </h3>
					<h4 className='theme-card_subtitle'>{theme.cities}</h4>
				</div>

				<CarouselProvider
					infinite={false}
					dragStep={1}
					isIntrinsicHeight={true}
					visibleSlides={width < 1200 ? 2 : 3}
					naturalSlideWidth={100}
					naturalSlideHeight={100}
					totalSlides={hotels?.length}>
					<Slider>
						{hotels.map((hotel, i) => (
							<Slide
								{...hotel}
								index={i}
								goToHotelsListByTheme={goToHotelsListByTheme}
								key={i}
							/>
						))}
					</Slider>
					<ButtonBack className='theme-slider_btn theme-slider_btn-back'>
						<Icons.SliderArrow />
					</ButtonBack>
					<ButtonNext className='theme-slider_btn theme-slider_btn-next'>
						<Icons.SliderArrow />
					</ButtonNext>

					<div className='theme-slider_dots'>
						{new Array(Number(hotels?.length)).fill(0).map((dot, i) => (
							<Dot slide={i} />
						))}
					</div>
				</CarouselProvider>

				<div onClick={goToHotelsListByTheme} className='theme_view-all'>
					View all
				</div>
			</div>
		</section>
	);
};

export default ThemeTemplate;

const Slide = ({ title, cities, price, img, id,  index, goToHotelsListByTheme }) => {
	const className = "theme-slider_slide";

	return (
		<div onClick={goToHotelsListByTheme} className={`${className}`}>
			<img className={`${className}_img`} src={img} alt='hotel preview' />
			<div className={`${className}_content`}>
				<h3 className={`${className}_title`}>{`${title} ${index}`}</h3>
				<div className={`${className}_content-bottom`}>
					<h4 className={`${className}_subtitle`}> {cities} </h4>
					<p className={`${className}_price`}> {price} </p>
				</div>
			</div>
		</div>
	);
};
