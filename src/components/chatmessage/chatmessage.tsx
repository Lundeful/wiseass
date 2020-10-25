import React, { useEffect } from "react";
import styles from "./chatmessage.module.css";
import { FaUserSecret, FaQuoteLeft } from "react-icons/fa";
import { fireApp } from "../../fireApp";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { updateMessage } from "../inputField/inputField";

export interface IChatMessage {
	message: string;
	username?: string;
	photoURL?: string;
	createdAt: any;
	displayedAt: any;
}

export const ChatMessage = () => {
	const db = fireApp.firestore();
	const msgRef = db.collection("messages");
	const query = msgRef.orderBy("createdAt", "asc").limit(1);
	const [msg, loading, error]: [
		IChatMessage[] | undefined,
		boolean,
		Error | undefined
	] = useCollectionData(query, { idField: "id" });

	useEffect(() => {
		updateMessage();
	}, [msg]);

	if (loading) {
		return <h2 className={styles.noChatMessage}>loading...</h2>;
	}

	if (error ) {
		return <h2 className={styles.noChatMessage}>There was an error. Try reloading or signing out and back in</h2>;
	}

	if (msg && msg.length > 0) {
		const icon = <FaUserSecret className={styles.icon} />;
		const image = <img src={msg[0].photoURL} alt="user" />;

		return (
			<div className={styles.container}>
				<div className={styles.message}>
					<FaQuoteLeft className={styles.iconLeft} />
					<span className={styles.quote}>{msg[0].message}</span>
				</div>
				<div className={styles.userContainer}>
					{msg[0].photoURL ? image : icon}
					<p>{msg[0].username || "anon"}</p>
				</div>
			</div>
		);
	};

	return (
		<h2 className={styles.noChatMessage}>
			The spot is empty, share something!!
		</h2>
	);
};
