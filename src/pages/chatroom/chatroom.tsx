import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/Auth";
import { PrimaryButton } from "../../components/buttons/buttons";
import { Layout } from "../../components/layout/Layout";
import { fireApp, fireAuth } from "../../fireApp";
import styles from "./chatroom.module.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
	ChatMessage,
	IChatMessage,
} from "../../components/chatmessage/chatmessage";
import { IoIosSend } from "react-icons/io";
import * as firebase from "firebase/app";

export const ChatRoom = () => {
	// User input
	const [input, setInput] = useState("");

	// User info
	const user: firebase.User = useContext(AuthContext).user;

	// Get message from firestore
	const firestore = fireApp.firestore();
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt", "desc").limit(1);
	const [messages]: any = useCollectionData(query, { idField: "id" });

	const sendChat = async (chat: IChatMessage) => {
		await messagesRef.add(chat);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (input === "uuddlrlrbaba") {
			alert("Easter Egg Found: Konami Code");
		} else if (input.trim().length > 0 && !!user) {
			const newChat: IChatMessage = {
				message: input.trim(),
				username: user.displayName,
				photoURL: user.photoURL,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			};
			sendChat(newChat).then(() => setInput(""));
		}
	};

	const signOut = () => {
		fireAuth.signOut();
	};

	console.log(messages);

	return (
		<Layout>
			<div className={styles.container}>
				{messages?.length > 0 ? (
					<ChatMessage
						message={messages[0].message}
						key={messages[0].id}
						username={messages[0].username}
						createdAt={messages[0].createdAt}
						photoURL={messages[0].photoURL}
					/>
				) : (
					<h2 className={styles.noChatMessage}>
						The spot is empty, share something!!
					</h2>
				)}
				<form onSubmit={onSubmit} className={styles.userInput}>
					<input
						onChange={(event) => setInput(event.target.value)}
						value={input}
						placeholder="Share your wisdom here"
						maxLength={120}
						type="text"
					/>
					<button type="submit">
						<IoIosSend className={styles.sendIcon} />
					</button>
				</form>
				<PrimaryButton onClick={signOut}>Sign out</PrimaryButton>
			</div>
		</Layout>
	);
};
