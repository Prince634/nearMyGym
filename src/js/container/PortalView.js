import React from 'react'
import { connect } from 'react-redux'
import  Actions from '../action/index.js'
import HelmetTags from '../helpers/HelmetTags.js'
import Header from '../components/Header.js'
import PortalView from '../components/PortalView.js'
class Portal extends React.Component{

	render(){

		return(
			<div className="">
				<Header {...this.props}/>
				<HelmetTags title ="Portal Page" description="Travel buddy is a platform to help travellers to befriend the People who are looking for travelling to the same city"/>
				<PortalView {...this.props}/>
			</div>
			)
	}
}
const mapStateToProps = (state)=>{
	return {
		USER:state.USER
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllCities:(cb)=>dispatch(Actions.getAllCities(cb))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Portal)