import '../../css/home.css';
import React from "react";

function Contact() {

    return (<div className="outer-section">
        <section id="Contact">
            <form>
                <div aria-rowindex={0}>
                    <label>
                        <h3>Email</h3>
                        <input type="text" />
                    </label>
                    <label>
                        <h3>Name</h3>
                        <input type="text" />
                    </label>
                </div>
                <div aria-rowindex={1}>
                    <label>
                        <h3>Subject</h3>
                        <input type="text" />
                    </label>
                </div>
                <label aria-label='areaContainer'>
                    <h3>Content</h3>
                    <textarea />
                </label>

            </form>
        </section>
    </div>);
}

export default Contact;