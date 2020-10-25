import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/Auth";
import * as firebase from "firebase/app";
import { fireApp } from "../../fireApp";
import { IChatMessage } from "../chatmessage/chatmessage";
import styles from "./inputField.module.css";
import { IoIosSend } from "react-icons/io";

export const InputField = () => {
	const [userInput, setUserInput] = useState("");
	const userInfo: firebase.User = useContext(AuthContext).user;

	const db = fireApp.firestore();
	const msgRef = db.collection("messages");

	const sendChat = async (chat: IChatMessage) => {
		await msgRef.add(chat).then(() => updateMessage());
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (userInput === "uuddlrlrbaba") {
			alert("Easter Egg Found: Konami Code");
		} else if (userInput.trim().length > 0 && !!userInfo) {
			const newChat: IChatMessage = {
				message: userInput.trim(),
				username: userInfo.displayName,
				photoURL: userInfo.photoURL,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				displayedAt: null,
			};
			sendChat(newChat).then(() => setUserInput(""));
		}
	};

	return (
		<form onSubmit={onSubmit} className={styles.userInput}>
			<input
				onChange={(event) => setUserInput(event.target.value)}
				value={userInput}
				placeholder="Share your wisdom here"
				maxLength={120}
				type="text"
			/>
			<button type="submit">
				<IoIosSend className={styles.sendIcon} />
			</button>
		</form>
	);
};

export const updateMessage = async () => {
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
									console.log("YES");
									db.collection("messages").doc(messages.docs[0].id).update({displayedAt: currentTime});
								} else if (currentTime - oldestMessage.displayedAt > 30) {
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
