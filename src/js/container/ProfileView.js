import React from 'react'

class Profile extends React.Component{

	render(){

		return(
			<div>
				<p>Profile Page</p>
				<button className="colr" onClick={()=>this.props.history.push('/')}>Go To Home Page</button>
			</div>
			)
	}
}

export default Profile