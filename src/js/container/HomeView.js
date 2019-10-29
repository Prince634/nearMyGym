import React from 'react'
import { connect } from 'react-redux'
import  Actions from '../action/index.js'
import HelmetTags from '../helpers/HelmetTags.js'
import Header from '../components/Header.js'
import CarouselView from '../components/CarouselView.js'

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
		if(this.props.USER.selectedLocation && this.props.USER.selectedLocation.description) {
			this.setState({ searchLocationString: this.props.USER.selectedLocation.description })
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.USER.selectedLocation && prevProps.USER.selectedLocation.description && this.props.USER.selectedLocation!= prevProps.USER.selectedLocation) {
			this.setState({ searchLocationString: this.props.USER.selectedLocation.description })
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

			<React.Fragment>
				<Header {...this.props}/>
				<HelmetTags title ="Home Page" description="Travel buddy is a platform to help travellers to befriend the People who are looking for travelling to the same city"/>
				<div id="home">
					{
						false && this.props.USER && this.props.USER.user_list && this.props.USER.user_list.length?
						this.props.USER.user_list.map((user, i)=>{
							return <p key={i}>{user.name}</p>
						})
						:''
					}

					<div className="prtlBody">
						<div className="srch-bar">
							<input type="text" className="srch-text-bar" value={this.state.searchLocationString} onChange={(e)=>{this.inputHandler(e.target.value)}} placeholder="Search Location"/>
							{
								this.state.searchLocationString && this.state.searchLocationString.length>0 && <img className="cross-icn" src={ASSETS_BASE_URL+"/red-cut.png"} onClick={()=>this.setState({searchLocationString: ''})}/>
							}
							
						</div>
						{
							this.state.searchCities && this.state.searchCities.length>0 && <div className="srch-list">
							{
								this.state.searchCities.map((city, key)=>{
									return <div className="srch-card" key={key} onClick={this.selectLocation.bind(this, city)}>{city.description}</div>
								})
							}
							</div>
						}
					</div>
					<CarouselView />
					<CarouselView />
					<CarouselView />
					
				</div>
				
			</React.Fragment>
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