import React, { useState } from 'react';
import Header from './Header.js'
import ProductImgView from './ProductImgView.js'

export default (props)=>{

	return(
		<React.Fragment>
			<Header history={props.history}/>
			<ProductImgView />
		</React.Fragment>
		)
}