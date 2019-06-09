const express = require('express')

const app = express()

const path = require('path')
import Main from './src/js/container/HomeView.js'
import React from 'react'
import  ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import Routes from './routes.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './src/js/reducers/index.js'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'

/*

*/
app.use(express.static('public'));
app.all('*', function(req, res) {

	let store = createStore(reducers, {}, applyMiddleware(thunk))
	let route_matched = null
	let promise = []
	let matched_path = []
	Routes.ROUTES.map((route)=>{
		const match = matchPath(req.path, route)
		if(match){
			matched_path.push(match)
		}
        
        if(match && route.component && route.component.loadData){
        	promise.push(route.component.loadData(store))	
        }
        
	})

	Promise.all(promise).then(()=>{

		let context = {}
		let content = ReactDOMServer.renderToString(
				<Provider store = {store}>
					<StaticRouter context={context} location={req.url}>
						<Routes/>
					</StaticRouter>
				</Provider>)

		let helmet = Helmet.renderStatic()
		
		let html = 
		`<!doctype html> 
		<html>
			<head>
				${helmet.title.toString()}
				${helmet.meta.toString()}
			</head>
			<body>
				<div id ="root">${content}</div>
				<script>
					window.INITIAL_STATE = ${serialize(store.getState())}
				</script>
				<script src="main.bundle.js"></script>
			</body>
		</html>`
		res.send(html)
	})



	//res.render(path.join(__dirname, 'dist', 'index.ejs'), {metaData:'Im prince'})
})

// Serve the files on port 3000.
app.listen(4000, function () {
  console.log('Example app listening on port 4000!\n');
});