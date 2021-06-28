import useRouter from "use-react-router";
import { Button, ThemeTemplate, themes } from "../components/export";

export const Main = () => {
	const themeColors = ["light-orange", "light-blue", "orange", "blue", "green"];
	const { history } = useRouter();

	const goToHotelsList = ({ hotelsListLink, breadCrumb }) => {
		if (hotelsListLink) {
			const link = `/hotels${hotelsListLink}`;
			history.push(link);

			localStorage.setItem(
				"hotelListPageData",
				JSON.stringify({
					title: breadCrumb,
					link,
				}),
			);
		} else {
			const link = "/all-hotels";
			history.push(link);

			localStorage.setItem(
				"hotelListPageData",
				JSON.stringify({
					title: "All hotels",
					link,
				}),
			);
		}
	};

	return (
		<div className='main'>
			<section className='main_welcome-section'>
				<h1 className='main_welcome-section_title'>
					<span> Selected hotel</span>
					<span>collection 2021 </span>
				</h1>
				<Button text='View all' variant='secondary' onClick={goToHotelsList} />
			</section>

			<div className='main-themes'>
				<h2 className='main-themes_title'>Choose your mood</h2>
				{themes.map((theme, i) => {
					return (
						<ThemeTemplate
							{...theme}
							className={themeColors[i]}
							goToHotelsList={goToHotelsList}
							key={i}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Main;
