import React from 'react'
import Header from '../components/Header.js'


class TodoView extends React.Component {

	render(){

		return(
			<React.Fragment>
				<Header {...this.props}/>
				<h3>What we do</h3>
			</React.Fragment>
			)
	}
}

export default TodoView