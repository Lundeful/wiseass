import React from "react";
import { PrimaryButton } from "../../components/buttons/buttons";
import { Layout } from "../../components/layout/Layout";
import { fireAuth } from "../../fireApp";
import styles from "./chatroom.module.css";
import { ChatMessage } from "../../components/chatmessage/chatmessage";
import { InputField } from "../../components/inputField/inputField";
import { useHistory } from "react-router-dom";

export const ChatRoom = () => {
	const history = useHistory();

	const signOut = () => {
		fireAuth.signOut();
	};

	return (
		<Layout>
			<div className={styles.container}>
				<ChatMessage />
				<InputField />
				<PrimaryButton onClick={signOut}>Sign out</PrimaryButton>
				<PrimaryButton onClick={() => history.push("/about")}>About this app</PrimaryButton>
			</div>
		</Layout>
	);
};
