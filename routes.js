import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from 'react-loadable';
import Header from './src/js/components/Header.js'
//import HomeView from './src/js/container/HomeView.js'
//import ProfileView from './src/js/container/ProfileView.js'
const LoadingComponent = () => <Header loader={true}/>


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

const LoginView = loadable({
	loader: () => import('./src/js/container/LoginPage.js'),
	loading: LoadingComponent,
	modules: ['./src/js/container/LoginPage.js'],
  	webpack: () => [require.resolveWeak('./src/js/container/LoginPage.js')]
})

const Portal = loadable({
	loader: () => import('./src/js/container/PortalView.js'),
	loading: LoadingComponent,
	modules: ['./src/js/container/PortalView.js'],
  	webpack: () => [require.resolveWeak('./src/js/container/PortalView.js')]
})

const ProductDescription = loadable({
	loader: () => import('./src/js/container/ProductDescription.js'),
	loading: LoadingComponent,
	modules: ['./src/js/container/ProductDescription.js'],
  	webpack: () => [require.resolveWeak('./src/js/container/ProductDescription.js')]
})

const ChatView = loadable({
	loader: () => import('./src/js/container/ChatView.js'),
	loading: LoadingComponent,
	modules: ['./src/js/container/ChatView.js'],
  	webpack: () => [require.resolveWeak('./src/js/container/ChatView.js')]
})

const Project = loadable({
	loader: () => import('./src/js/container/Project.js'),
	loading: LoadingComponent,
	modules: ['./src/js/container/Project.js'],
  	webpack: () => [require.resolveWeak('./src/js/container/Project.js')]
})

const TodoView = loadable({
	loader: () => import('./src/js/container/TodoView.js'),
	loading: LoadingComponent,
	modules: ['./src/js/container/TodoView.js'],
  	webpack: () => [require.resolveWeak('./src/js/container/TodoView.js')]
})

const routes = [
	{ path: '/', component: HomeView, renderOnServer: true},
	{ path: '/profile', component: ProfileView, renderOnServer: true},
	{ path: '/login', component: LoginView, renderOnServer: true},
	{ path: '/portal', component: Portal },
	{ path: '/pdp', component: ProductDescription },
	{ path: '/chat', component: ChatView },
	{ path: '/work', component: TodoView },
	{path: '/demo', component: Project}
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