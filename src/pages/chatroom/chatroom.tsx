import React, { useContext } from "react";
import { AuthContext } from "../../auth/Auth";
import { PrimaryButton } from "../../components/buttons/buttons";
import { Layout } from "../../components/layout/Layout";
import { fireAuth } from "../../fireApp";
import styles from "./chatroom.module.css";

type Props = {};

const signOut = () => {
	fireAuth.signOut();
};

const TempInfo = () => {
	const user: firebase.User = useContext(AuthContext).user;
	console.log(user);

	const photoUrl = user.photoURL;

	return (
		<div className={styles.tempinfo}>
			<hr />
			<h1>Congratulations, you're logged in</h1>
			{photoUrl && <img src={photoUrl} alt="user"/>}
			<h4>User</h4>
			<p>{user.displayName}</p>
			<h4>Email</h4>
			<p>{user.email}</p>
			<hr />
			<p>This app is under construction. Come back for more, sooooooon.</p>
		</div>
	);
};

export function ChatRoom(props: Props) {
	return (
		<Layout>
			<div>
				<TempInfo />
				<PrimaryButton onClick={signOut}>Sign out</PrimaryButton>
			</div>
		</Layout>
	);
}
