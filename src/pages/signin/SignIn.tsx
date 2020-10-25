import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { fireAuth } from "../../fireApp";
import firebase from 'firebase';
import { AuthContext } from "../../auth/Auth";
import { PrimaryButton } from "../../components/buttons/buttons";
import { Layout } from "../../components/layout/Layout";
import styles from './signin.module.css';
import {AiOutlineGoogle} from 'react-icons/ai';

export const SignIn = () => {
	const [popup, setPopup] = useState(false);
	const history = useHistory();

	const {user} = useContext(AuthContext);
	if (!!user) return <Redirect to={"/"} />;

	const googleSignIn = () => {
		setPopup(true);
		const auth = fireAuth;
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider).then(() => setPopup(false));
	}

	return (
		<Layout>
			<div className={styles.container}>
				<h2>Welcome, sign in to get started</h2>
				<PrimaryButton onClick={googleSignIn}><AiOutlineGoogle className={styles.gIcon} />Sign in with Google</PrimaryButton>
				{popup && <p>Use the pop-up window to sign in with Google</p>}
				<PrimaryButton onClick={() => history.push("/about")}>About this app</PrimaryButton>
			</div>
		</Layout>
	);
};
