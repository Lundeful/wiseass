import React from "react";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../../components/buttons/buttons";
import { Layout } from "../../components/layout/Layout";

export const About = () => {
	const history = useHistory();
	return (
		<Layout>
			<div>
				<h1>What is this?</h1>
				<hr></hr>
				<p>
					This is a place to share your thoughts, <b>wiseass</b>. Give some life advice or share a joke.
				</p>

				<h1>Who can see what I write?</h1>
				<hr></hr>
				<p>
					<b>Everyone</b>. There is just <b>one public</b> room. Each message is
					visible for <b>one minute</b>. Your <b>name</b> and <b>picture</b> will accompany
					your post.
				</p>

				<h1>How often can I write?</h1>
				<hr></hr>
				<p>
					You can only submit <b>one message</b> per day. There is a length limit to your post<br /><br /> <b>Note:</b> During
					development this limit may be removed. Please don't spam.
				</p>

				<h1>Are there any rules?</h1>
				<hr></hr>
				<p>
					<b>Be civil</b>. Bad behaviour or excessive spamming <b>will</b> result in a lifetime ban.
					Don't post links.
				</p>
			</div>
			<PrimaryButton onClick={() => history.push("/")}>Back</PrimaryButton>
		</Layout>
	);
};
