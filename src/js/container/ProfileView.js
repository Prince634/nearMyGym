import React from 'react'
import Header from '../components/Header.js'

class Profile extends React.Component{

	render(){

		return(
			<div>
				<Header {...this.props}/>
				<p>Profile Page</p>
				<button className="colr" onClick={()=>this.props.history.push('/')}>Go To Home Page</button>
			</div>
			)
	}
}

export default Profile