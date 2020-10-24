import React from "react";
import styles from "./Layout.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
			<h1>WiseAss</h1>
		</div>
	);
};

export const Layout = ({ children }) => {
	return (
		<div className={styles.container}>
			<Header />
			{children}
		</div>
	);
};
