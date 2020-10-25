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
import * as firebase from 'firebase/app';

export const ChatRoom = () => {
	// User input
	const [input, setInput] = useState("");
	// User info
	const user: firebase.User = useContext(AuthContext).user;

	// Messages from firestore
	const firestore = fireApp.firestore();
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy('createdAt', 'desc').limit(25);
	const [messages]: any = useCollectionData(query, {idField: 'id'});	

	const sendChat = async (chat: IChatMessage) => {
		await messagesRef.add(chat);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (input?.length > 0) {
			const newChat: IChatMessage = {
				message: input.trim(),
				username: user.displayName,
				photoURL: user.photoURL,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),

			};
			sendChat(newChat).then(() => setInput(''));
		}		
	};

	const signOut = () => {
		fireAuth.signOut();
	};

	return (
		<Layout>
			<div>
				{messages &&
					messages.map((m) => {
						return (
							<ChatMessage
								message={m.message}
								key={m.id}
								username={m.username}
								createdAt={m.createdAt}
								photoURL={m.photoURL}
							/>
						);
					})}
				<form onSubmit={onSubmit} className={styles.userInput}>
					<input onChange={(event) => setInput(event.target.value)} value={input} placeholder="Share your wisdom here"/>
					<button type="submit">
						<IoIosSend className={styles.sendIcon} />
					</button>
				</form>
				<PrimaryButton onClick={signOut}>Sign out</PrimaryButton>
			</div>
		</Layout>
	);
};
