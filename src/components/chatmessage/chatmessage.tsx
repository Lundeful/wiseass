import React from "react";
import styles from "./chatmessage.module.css";
import { FaUserSecret, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export interface IChatMessage {
	message: string;
	username?: string;
	photoURL?: string;
	createdAt: any;
};

export const ChatMessage = (props: IChatMessage) => {
	const { message, username, photoURL } = props;
	const image = <img src={photoURL} alt="user portrait"/>;
	const icon = <FaUserSecret className={styles.icon} />
	
	return (
		<div className={styles.container}>
			<div className={styles.message}>
				<FaQuoteLeft className={styles.iconLeft} />
				<p className={styles.quote}>{message}</p>
				<FaQuoteRight className={styles.iconRight} />
			</div>
			<div className={styles.userContainer}>
				{photoURL ? image : icon}
				<p>{username || 'anon'}</p>
			</div>
		</div>
	);
};
