import React from 'react';
import Tilt from 'react-tilt'
import Brain from './brain.png'
import './Logo.css'

const Logo = () =>{
	return(
	<div className='ma4 mt0'>
		<Tilt className="Tilt br3 pa3 shadow-2" options={{ max : 40 }} style={{ height: 150, width: 150 }} >
 		 <div className="Tilt-inner"> 
 			<img alt='logo' src={Brain}/>
 		 </div>
		</Tilt>
	</div>
	);
}

export default Logo;