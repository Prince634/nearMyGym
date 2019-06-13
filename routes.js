import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from 'react-loadable';

//import HomeView from './src/js/container/HomeView.js'
//import ProfileView from './src/js/container/ProfileView.js'
const LoadingComponent = () => <h3>please wait...</h3>;


const HomeView = loadable({
	loader: () => import('./src/js/container/HomeView.js'),
	loading: LoadingComponent,
	modules: ['./src/js/container/HomeView.js'],
  	webpack: () => [require.resolveWeak('./src/js/container/HomeView.js')]
})

const ProfileView = loadable({
	loader: () => import('./src/js/container/ProfileView.js'),
	loading: LoadingComponent,
	modules: ['./src/js/container/ProfileView.js'],
  	webpack: () => [require.resolveWeak('./src/js/container/ProfileView.js')]
})

const routes = [
	{ path: '/', component: HomeView, renderOnServer: true},
	{ path: '/profile', component: ProfileView, renderOnServer: true}
]

class Routes extends React.Component{

	static ROUTES = routes
	
	render(){

		return(
			<Switch>
				{
					routes.map((route, i)=>{
						return <Route key={i} exact path ={route.path} component={route.component} />
					})
				}
			</Switch>
			)
	}
}
export default Routes