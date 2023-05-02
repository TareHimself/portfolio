import React, { SyntheticEvent } from "react";

function Contact() {
	function handleForm(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<div className="outer-section">
			<section id="Contact">
				<h2>Contact</h2>
				<form onSubmit={handleForm}>
					<span>
						<label>
							Email
							<input
								type="text"
								placeholder="Your email please."
							/>
						</label>
						<label>
							Name
							<input
								type="text"
								placeholder="How do I address you ?"
							/>
						</label>
					</span>
					<span>
						<label>
							Subject
							<input
								type="text"
								placeholder={"What's the message about?"}
							/>
						</label>
					</span>
					<span>
						<label>
							Content
							<textarea placeholder="Message To Send" />
						</label>
					</span>
					<span className="contact-submit">
						<button>Send</button>
					</span>
				</form>
			</section>
		</div>
	);
}

export default Contact;
