import React from 'react'
import ProductView from '../components/ProductView.js'

class ProductDescriptionView extends React.Component {

	render(){
		return(
			<ProductView {...this.props}/>
			)
	}

}

export default ProductDescriptionView