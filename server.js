const express = require('express')

const app = express()

const path = require('path')
import Main from './src/js/container/HomeView.js'
import React from 'react'
import  ReactDOMServer from 'react-dom/server'
/*import { StaticRouter } from 'react-router'
import Routes from './routes.js'
*/
/*

*/
app.use(express.static(path.join(__dirname, 'dist')));
app.all('*', function(req, res) {
	let content = ReactDOMServer.renderToString(<Main/>)
	let html = 
	`<html>
		<head></head>
		<body>
			<div id ="root">${content}</div>
			<script src="main.bundle.js"></script>
		</body>
	</html>`
	res.send(html)
	//res.render(path.join(__dirname, 'dist', 'index.ejs'), {metaData:'Im prince'})
})

// Serve the files on port 3000.
app.listen(4000, function () {
  console.log('Example app listening on port 4000!\n');
});