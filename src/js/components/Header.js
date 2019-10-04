import React from 'react'

class Header extends React.Component {

	navigateTo(page){
		this.props.history.push(`/${page}`)
	}

	render(){
		return(
			<div className="header">
				<div className="left-nav">
					<span className="nrby-txt">nearbyGym</span>
				</div>
				<div className="right-nav">
					<span className="right-spn" onClick={this.navigateTo.bind(this, '')}>Home</span>
					<span className="right-spn" onClick={this.navigateTo.bind(this, 'profile')}>About</span>
					<span className="right-spn" onClick={this.navigateTo.bind(this, 'portal')}>Portal</span>
					<span className="right-spn" onClick={this.navigateTo.bind(this, 'login')}>Login</span>
				</div>
			</div>
			)
	}
}

export default Header