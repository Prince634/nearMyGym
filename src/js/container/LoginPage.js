import React from 'react'
import Header from '../components/Header.js'

class LoginView extends React.Component{

	render(){

		return(

			<div className="container">
				<Header {...this.props}/>
				<div className="box">
					<h1 className="heading">Sign Up</h1>
					<p className="hd-txt">It's free and only takes a minute</p>
					<div className="blck">
						<p>First Name</p>
						<input className="lbl" type="text" name="fname"/>	
					</div>
					<div className="blck">
						<p>Last Name</p>
						<input className="lbl" type="text" name="fname"/>	
					</div>
					<div className="blck">
						<p>Email</p>
						<input className="lbl" type="text" name="fname"/>	
					</div>
					<button className="btn">Register</button>
					<div className="log-txt">By clicking you agree to the terms & conditions of the company.It agrees to the company </div>
				</div>
				<div className="footer">Already have an account ? <span className="log">Login Here</span></div>
			</div>
			)
	}
}

export default LoginView;