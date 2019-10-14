import React, { useState } from 'react';
import SearchBar from './SearchBar.js'
//import from FilteredData from './getFiteredSearchList.js'


export default (props)=>{

	const [selectedOption, setOptions] = useState()
	function clickHandled(e){

	}
	console.log(selectedOption);
	return(
		<React.Fragment>
			<div className="prgHead">
				<span>Book Appointment</span>
				<span>Appointment Accepted</span>
				<span>Payment Pending</span>
				<span>Payment Done</span>
			</div>
			<ul className="prgBar">
				<li className={`prg-line ${selectedOption>=1 && 'active'}`}><span>1</span></li>
				<li className={`prg-line ${selectedOption>=2 && 'active'}`}><span>2</span></li>
				<li className={`prg-line ${selectedOption>=3 && 'active'}`}><span>3</span></li>
				<li className={`prg-line ${selectedOption>=4 && 'active'}`}><span>4</span></li>
			</ul>
			<SearchBar {...props}/> 
			<label htmlFor="select-optn">Choose the Status</label>
			<select className="slctOptn" onChange={(e)=>setOptions(e.target.value)}>
				<option value="">Select Option</option>
				<option value="1">Booked</option>
				<option value="2">Accepted</option>
				<option value="3">Payment Pending</option>
				<option value="4">Payment Done</option>
			</select>
		</React.Fragment>
		)
}
