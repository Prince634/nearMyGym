import React from 'react'

class Header extends React.Component {

	navigateTo(page){
		this.props.history.push(`/${page}`)
	}

	render(){
		return(
			<header>
				<div className="left-nav">
					<span className="nrby-txt">nearbyGym</span>
				</div>
				<div className="right-nav">
					<span className="right-spn" onClick={this.navigateTo.bind(this, '')}>Home</span>
					<span class="right-spn" onClick={this.navigateTo.bind(this, 'profile')}>About</span>
					<span className="right-spn" onClick={this.navigateTo.bind(this, 'login')}>Login</span>
				</div>
				<span className="clear-float"></span>
			</header>
			)
	}
}

export default Header