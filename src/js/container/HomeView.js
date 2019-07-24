import React from 'react'
import { connect } from 'react-redux'
import  Actions from '../action/index.js'
import HelmetTags from '../helpers/HelmetTags.js'
import Header from '../components/Header.js'

class Home extends React.Component{

	static loadData(store){
		return store.dispatch(Actions.getInitialData())
	}

	componentDidMount(){
		this.props.getInitialData()
	}

	render(){
		
		return(

			<div className="">
				<Header {...this.props}/>
				<HelmetTags title ="Home Page" description="Travel buddy is a platform to help travellers to befriend the People who are looking for travelling to the same city"/>

				<div id="home">
					<h1>Home View</h1>
					<p>Home Page &copy;<kbd>Ctrl + S</kbd></p>
					{
						this.props.USER && this.props.USER.user_list.length?
						this.props.USER.user_list.map((user, i)=>{
							return <p key={i}>{user.name}</p>
						})
						:''
					}
					<button className="colr" onClick={()=>{
					this.props.history.push('/profile')}}>Go To &nbsp; &nbsp; Profile</button>
					
				</div>
				
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
		getInitialData:()=>dispatch(Actions.getInitialData())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)