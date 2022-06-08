import '../../css/home.css';
import React, { useCallback } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function Intro() {

	const onProjectClicked = useCallback(() => {
		document.getElementById('Projects')?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (<div className="outer-section">
		<section id='Intro'>
			<div className='content-row'>
				<h2>Hi, my name is <mark>Oyintare Ebelo</mark>. I am a..</h2>
				<h1>Web Developer</h1>
			</div>

			<button onClick={onProjectClicked}><FiChevronDown /></button>
		</section >

	</div >);
}

export default Intro;