import Main from './src/js/container/HomeView.js'
import React from 'react'
import ReactDOM from 'react-dom'

console.log('aaaaaaaaaaaaaaaClient Side')
ReactDOM.hydrate(<Main/>,document.getElementById('root'))