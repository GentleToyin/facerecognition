import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
	return(
		<div>
			<p className='f3'>
			{'This Magic Brain Will Detect Faces In Your Pictures. Just Input Image URL Below'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 br2 w-70 center' type='text' onChange={onInputChange}/>
					<button className='w-30 br2 grow f4 link ph3 pv2 dib white' onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
		
	);
}

export default ImageLinkForm;