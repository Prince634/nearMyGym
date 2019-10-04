import React from 'react'
import { connect } from 'react-redux'
import  Actions from '../action/index.js'
import HelmetTags from '../helpers/HelmetTags.js'
import Header from '../components/Header.js'
import UserInfo from '../components/userInfoForm.js'

class Home extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			searchLocationString: '',
			searchCities: []
		}
	}

	static loadData(store){
		return store.dispatch(Actions.getInitialData())
	}

	componentDidMount(){
		//this.props.getInitialData()

	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.USER.selectedLocation && nextProps.USER.selectedLocation.description && this.props.USER.selectedLocation!= nextProps.USER.selectedLocation) {
			this.setState({ searchLocationString: nextProps.USER.selectedLocation.description })
		}
	}

	inputHandler(value) {
		this.setState({searchLocationString: value})
		setTimeout(()=>{
			this.props.findPlaces(value, (resp)=>{
				this.setState({searchCities: resp && resp.predictions?resp.predictions:[]})
			})
		},500)
	}

	selectLocation(city) {
		this.props.selectLocation(city)
		this.setState({searchCities: []})
	}

	render(){
		
		return(

			<div className="">
				<Header {...this.props}/>
				<HelmetTags title ="Home Page" description="Travel buddy is a platform to help travellers to befriend the People who are looking for travelling to the same city"/>

				{/*<div id="home">
					<h1>Home View</h1>
					<p>Home Page &copy;<kbd>Ctrl + S</kbd></p>
					{
						false && this.props.USER && this.props.USER.user_list && this.props.USER.user_list.length?
						this.props.USER.user_list.map((user, i)=>{
							return <p key={i}>{user.name}</p>
						})
						:''
					}
					<input type="text" value={this.state.searchLocationString} onChange={(e)=>{this.inputHandler(e.target.value)}} placeholder="Search Location"/>
					<button className="colr" onClick={()=>this.setState({searchLocationString: ''})}>Clear Location</button>
					{
						this.state.searchCities && this.state.searchCities.length ?
						<div>	
							{
								this.state.searchCities.map((city, key)=>{
									return <p key={key} onClick={this.selectLocation.bind(this, city)}>{city.description}</p>
								})
							}
						</div>:''
					}
					<button className="colr" onClick={()=>{
					this.props.history.push('/profile')}}>Go To Profile</button>
					
				</div>*/}

				<UserInfo {...this.props}/>
				
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
		getInitialData:()=>dispatch(Actions.getInitialData()),
		getGeoIPLocation: ()=>dispatch(Actions.getGeoIPLocation()),
		findPlaces: (value, cb) => dispatch(Actions.findPlaces(value, cb)),
		selectLocation: (city) => dispatch(Actions.selectLocation(city))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)