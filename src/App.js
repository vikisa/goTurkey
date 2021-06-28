import React, { Suspense, useEffect } from "react";

import { Router, Switch, Route } from "react-router";
import { createBrowserHistory } from "history";

import { AppRoutes } from "./routes/routes";

import { LayoutApp } from "./components/export";
import "./styles/main.scss";

export const AppHistory = createBrowserHistory();

function App() {
	return (
		<Suspense fallback={"  "}>
			<Router basename={"/"} history={AppHistory}>
				<div>
					<Switch>
						{AppRoutes.map((route, i) => {
							const { Component } = route;

							return (
								<Route
									key={i}
									hasChildren={true}
									path={route.path}
									exact={route.exact}
									component={(props) => (
										<LayoutApp>
											<Component />
										</LayoutApp>
									)}
								/>
							);
						})}
					</Switch>
				</div>
			</Router>
		</Suspense>
	);
}

export default App;
