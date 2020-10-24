import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

export const ProtectedRoute = ({ component: RouteComp, ...rest }) => {
	const { user } = useContext(AuthContext);
	const isAuth = !!user;

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth) {
					return <RouteComp {...rest} {...props} />;
				} else {
					return <Redirect to={"/signin"} />;
				}
			}}
		/>
	);
};
