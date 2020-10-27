import React, { useEffect } from "react";
import styles from "./chatmessage.module.css";
import { FaUserSecret, FaQuoteLeft } from "react-icons/fa";
import { fireApp } from "../../fireApp";
import * as firebase from 'firebase/app';
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
	const updateIntervalInSeconds = 15;

	useEffect(() => {
		const interval = setInterval(() => updateMessage(), updateIntervalInSeconds * 1000);
		return () => clearInterval(interval);
	}, []);

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

export const updateMessage = async () => {
	const timeToLive = 60;
	const db = fireApp.firestore();
	db.collection("info")
		.doc("currentTime")
		.set({ time: firebase.firestore.FieldValue.serverTimestamp() })
		.then(() => {
			db.collection("info")
				.doc("currentTime")
				.get()
				.then((timeObj) => {
					const currentTime = timeObj.data()?.time?.seconds;					
					db.collection("messages")
						.orderBy("createdAt", 'asc')
						.limit(2)
						.get()
						.then((messages) => {
							if (messages.docs.length > 0) {
								const oldestMessage = messages.docs[0].data();
								if (oldestMessage.displayedAt == null) {
									db.collection("messages").doc(messages.docs[0].id).update({displayedAt: currentTime});
								} else if (currentTime - oldestMessage.displayedAt > timeToLive) {
									db.collection("messages").doc(messages.docs[0].id).delete();
									if (messages.docs.length > 1) {
										db.collection("messages").doc(messages.docs[1].id).update({displayedAt: currentTime});	
									}
								}
							}
						});
				});
		});
};