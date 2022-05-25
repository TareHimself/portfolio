import '../../css/home.css';
import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from 'react-icons/fi';

function Intro() {


    return (<div className="outer-section">
        <section id='Intro'>
            <div className='content-row'>
                <h2>Hi, my name is <mark>Oyintare Ebelo</mark>. I am a..</h2>
                <h1>Full Stack Developer</h1>
            </div>

            <button onClick={() => { document.getElementById('Projects').scrollIntoView(); }}><FiChevronDown /></button>
        </section >

    </div >);
}

export default Intro;