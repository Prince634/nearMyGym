import React from 'react'

class Home extends React.Component{

	render(){
		console.log('aaaaaaaaaaaaaaaaa');console.log(this.props)
		return(
			<div>
				<p>Home Page</p>
				<button className="colr" onClick={()=>{console.log('aaa');
				this.props.history.push('/profile')}}>Go To Profile</button>
			</div>
			)
	}
}

export default Home