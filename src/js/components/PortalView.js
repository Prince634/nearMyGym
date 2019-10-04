import React, { useState } from 'react';
import SearchBar from './SearchBar.js'
//import from FilteredData from './getFiteredSearchList.js'


export default (props)=>{

	return(
		<React.Fragment>
			<SearchBar {...props}/> 
		</React.Fragment>
		)
}
