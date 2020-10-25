import React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingComponent } from "../components/loadingcomponent/loadingComponent";
import { fireApp, fireAuth } from "../fireApp";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user] = useAuthState(fireAuth);    

	useEffect(() => {
		fireApp.auth().onAuthStateChanged(() => {
			setIsLoading(false);
		});
	},[]);
    
	if (isLoading) return <LoadingComponent />;

	return (
		<AuthContext.Provider value={{ user: user }}>
			{children}
		</AuthContext.Provider>
	);
};