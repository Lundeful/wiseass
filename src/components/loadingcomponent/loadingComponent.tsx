import React from "react";
import styles from "./loadingComponent.module.css";

export const LoadingComponent = () => {
	return (
		<div className={styles.container}>
			<h2 className={styles.scaleUp}>Loading</h2>
			<p>Please wait...</p>
		</div>
	);
};
