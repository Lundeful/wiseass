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
		await msgRef.add(chat);
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
