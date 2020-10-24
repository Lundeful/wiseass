import React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingComp } from "../components/LoadingComp";
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
    
	if (isLoading) return <LoadingComp />;

	return (
		<AuthContext.Provider value={{ user: user }}>
			{children}
		</AuthContext.Provider>
	);
};