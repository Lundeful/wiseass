import React from "react";
import styles from "./buttons.module.css";

type Props = {
	children: any;
	onClick: any;
	condensed?: boolean;
	primary?: boolean;
	secondary?: boolean;
};

const Button = (props: Props) => {
	const { children, onClick, condensed, primary, secondary } = props;

	// Add classes
	const classes = [styles.button];
	if (primary) classes.push(styles.primaryButton);
	else if (secondary) classes.push(styles.secondaryButton)
	if (condensed) classes.push(styles.condensed);

	return (
		<button className={classes.join(" ")} onClick={onClick}>
			{children}
		</button>
	);
}

export const PrimaryButton = (props: Props) => {
	return <Button primary {...props}/>
};

export const SecondaryButton = (props: Props) => {
	return <Button secondary {...props}/>
};
