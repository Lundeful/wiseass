import React from "react";
import { Link } from "react-router-dom";
import styles from "./Layout.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
			<Link to="/">
				<div className={styles.logo}>
					<h1>WiseAss</h1>
				</div>
			</Link>
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
