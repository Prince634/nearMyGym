/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./App.js":
/*!****************!*\
  !*** ./App.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes.js */ "./routes.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _src_js_reducers_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/js/reducers/index.js */ "./src/js/reducers/index.js");
/* harmony import */ var _src_style_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/style.css */ "./src/style.css");
/* harmony import */ var _src_style_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_src_style_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _src_js_helpers_storage_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/js/helpers/storage.js */ "./src/js/helpers/storage.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./socket.js */ "./socket.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 //import './src/js/style.css'










var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _src_js_helpers_storage_js__WEBPACK_IMPORTED_MODULE_9__["default"].registerServiceWorker();
      _socket_js__WEBPACK_IMPORTED_MODULE_10__["default"].init(function () {
        console.log('clent socket');
      });

      if (_socket_js__WEBPACK_IMPORTED_MODULE_10__["default"] && _socket_js__WEBPACK_IMPORTED_MODULE_10__["default"].instance) {
        _socket_js__WEBPACK_IMPORTED_MODULE_10__["default"].instance.on('countUpdated', function (count) {
          console.log('updated on client', count);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var middleWare = [redux_thunk__WEBPACK_IMPORTED_MODULE_5__["default"]];
      var logger = Object(redux_logger__WEBPACK_IMPORTED_MODULE_6__["createLogger"])();
      middleWare.push(logger);
      var store = Object(redux__WEBPACK_IMPORTED_MODULE_4__["createStore"])(_src_js_reducers_index_js__WEBPACK_IMPORTED_MODULE_7__["default"], window.INITIAL_STATE, redux__WEBPACK_IMPORTED_MODULE_4__["applyMiddleware"].apply(void 0, middleWare));
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
        store: store
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_routes_js__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./routes.js":
/*!*******************!*\
  !*** ./routes.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loadable */ "./node_modules/react-loadable/lib/index.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_js_components_Header_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/js/components/Header.js */ "./src/js/components/Header.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 //import HomeView from './src/js/container/HomeView.js'
//import ProfileView from './src/js/container/ProfileView.js'

var LoadingComponent = function LoadingComponent() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_js_components_Header_js__WEBPACK_IMPORTED_MODULE_3__["default"], {
    loader: true
  });
};

var HomeView = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
  loader: function loader() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! ./src/js/container/HomeView.js */ "./src/js/container/HomeView.js"));
  },
  loading: LoadingComponent,
  modules: ['./src/js/container/HomeView.js'],
  webpack: function webpack() {
    return [/*require.resolve*/(/*! ./src/js/container/HomeView.js */ "./src/js/container/HomeView.js")];
  }
});
var ProfileView = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
  loader: function loader() {
    return Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ./src/js/container/ProfileView.js */ "./src/js/container/ProfileView.js"));
  },
  loading: LoadingComponent,
  modules: ['./src/js/container/ProfileView.js'],
  webpack: function webpack() {
    return [/*require.resolve*/(/*! ./src/js/container/ProfileView.js */ "./src/js/container/ProfileView.js")];
  }
});
var LoginView = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
  loader: function loader() {
    return __webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! ./src/js/container/LoginPage.js */ "./src/js/container/LoginPage.js"));
  },
  loading: LoadingComponent,
  modules: ['./src/js/container/LoginPage.js'],
  webpack: function webpack() {
    return [/*require.resolve*/(/*! ./src/js/container/LoginPage.js */ "./src/js/container/LoginPage.js")];
  }
});
var Portal = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
  loader: function loader() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ./src/js/container/PortalView.js */ "./src/js/container/PortalView.js"));
  },
  loading: LoadingComponent,
  modules: ['./src/js/container/PortalView.js'],
  webpack: function webpack() {
    return [/*require.resolve*/(/*! ./src/js/container/PortalView.js */ "./src/js/container/PortalView.js")];
  }
});
var ProductDescription = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
  loader: function loader() {
    return __webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! ./src/js/container/ProductDescription.js */ "./src/js/container/ProductDescription.js"));
  },
  loading: LoadingComponent,
  modules: ['./src/js/container/ProductDescription.js'],
  webpack: function webpack() {
    return [/*require.resolve*/(/*! ./src/js/container/ProductDescription.js */ "./src/js/container/ProductDescription.js")];
  }
});
var ChatView = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
  loader: function loader() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ./src/js/container/ChatView.js */ "./src/js/container/ChatView.js"));
  },
  loading: LoadingComponent,
  modules: ['./src/js/container/ChatView.js'],
  webpack: function webpack() {
    return [/*require.resolve*/(/*! ./src/js/container/ChatView.js */ "./src/js/container/ChatView.js")];
  }
});
var Project = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
  loader: function loader() {
    return __webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ./src/js/container/Project.js */ "./src/js/container/Project.js"));
  },
  loading: LoadingComponent,
  modules: ['./src/js/container/Project.js'],
  webpack: function webpack() {
    return [/*require.resolve*/(/*! ./src/js/container/Project.js */ "./src/js/container/Project.js")];
  }
});
var routes = [{
  path: '/',
  component: HomeView,
  renderOnServer: true
}, {
  path: '/profile',
  component: ProfileView,
  renderOnServer: true
}, {
  path: '/login',
  component: LoginView,
  renderOnServer: true
}, {
  path: '/portal',
  component: Portal
}, {
  path: '/pdp',
  component: ProductDescription
}, {
  path: '/chat',
  component: ChatView
}, {
  path: '/demo',
  component: Project
}];

var Routes =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Routes, _React$Component);

  function Routes() {
    _classCallCheck(this, Routes);

    return _possibleConstructorReturn(this, _getPrototypeOf(Routes).apply(this, arguments));
  }

  _createClass(Routes, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, routes.map(function (route, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
          key: i,
          exact: true,
          path: route.path,
          component: route.component
        });
      }));
    }
  }]);

  return Routes;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

_defineProperty(Routes, "ROUTES", routes);

/* harmony default export */ __webpack_exports__["default"] = (Routes);

/***/ }),

/***/ "./socket.js":
/*!*******************!*\
  !*** ./socket.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var socket = {
  instance: null,
  initialize: null,
  init: function init(cb) {
    if (typeof io == "function") {
      if (!socket.instance) {
        socket.instance = io();
      }

      cb();
    }
  },
  clicked: function clicked() {
    socket.instance.emit('increment');
  },
  sendMessageToRoom: function sendMessageToRoom() {
    var dataParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    socket.instance.emit('join', dataParams);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (socket);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../App.js */ "./App.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-loadable */ "./node_modules/react-loadable/lib/index.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_3__);




react_loadable__WEBPACK_IMPORTED_MODULE_3___default.a.preloadReady().then(function () {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App_js__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById('root'));
});

/***/ }),

/***/ "./src/js/components/Header.js":
/*!*************************************!*\
  !*** ./src/js/components/Header.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Header =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "navigateTo",
    value: function navigateTo(page) {
      this.props.history.push("/".concat(page));
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "left-nav"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nrby-txt",
        onClick: this.navigateTo.bind(this, '')
      }, "nearbyGym")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "right-nav"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "right-spn",
        onClick: this.navigateTo.bind(this, '')
      }, "Home"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "right-spn",
        onClick: this.navigateTo.bind(this, 'profile')
      }, "About"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "right-spn",
        onClick: this.navigateTo.bind(this, 'portal')
      }, "Portal"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "right-spn",
        onClick: this.navigateTo.bind(this, 'login')
      }, "Login")), this.props.loader ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Loading......") : '');
    }
  }]);

  return Header;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./src/js/helpers/storage.js":
/*!***********************************!*\
  !*** ./src/js/helpers/storage.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var STORAGE = {
  registerServiceWorker: function registerServiceWorker() {
    var dataParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/enableGymNetworkRequest.js').then(function (registration) {
          console.log('Service Worker registration Success', registration.scope);
        }, function (err) {
          //registration Failed
          console.log('Service Worker registration Failed', err);
        });
      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (STORAGE);

/***/ }),

/***/ "./src/js/helpers/type.js":
/*!********************************!*\
  !*** ./src/js/helpers/type.js ***!
  \********************************/
/*! exports provided: LOAD_INITIAL_DATA, LOAD_SSR_INITIAL_DATA, SELECT_LOCATION, SAVE_USER_CITY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOAD_INITIAL_DATA", function() { return LOAD_INITIAL_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOAD_SSR_INITIAL_DATA", function() { return LOAD_SSR_INITIAL_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT_LOCATION", function() { return SELECT_LOCATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SAVE_USER_CITY", function() { return SAVE_USER_CITY; });
var LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA';
var LOAD_SSR_INITIAL_DATA = 'LOAD_SSR_INITIAL_DATA';
var SELECT_LOCATION = 'SELECT_LOCATION';
var SAVE_USER_CITY = 'SAVE_USER_CITY';

/***/ }),

/***/ "./src/js/reducers/index.js":
/*!**********************************!*\
  !*** ./src/js/reducers/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.js */ "./src/js/reducers/user.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");



var allReducers = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  USER: _user_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  form: redux_form__WEBPACK_IMPORTED_MODULE_2__["reducer"]
});
/* harmony default export */ __webpack_exports__["default"] = (allReducers);

/***/ }),

/***/ "./src/js/reducers/user.js":
/*!*********************************!*\
  !*** ./src/js/reducers/user.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/type.js */ "./src/js/helpers/type.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultState = {
  user_list: [],
  loadedSSR: false,
  selectedLocation: {},
  selectedCity: ''
};
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOAD_INITIAL_DATA':
      {
        var newState = _objectSpread({}, state);

        newState.user_list = action.payload;
        return newState;
      }

    case 'LOAD_SSR_INITIAL_DATA':
      {
        var _newState = _objectSpread({}, state);

        _newState.loadedSSR = true;
        return _newState;
      }

    case 'SELECT_LOCATION':
      {
        var _newState2 = _objectSpread({}, state);

        _newState2.selectedLocation = action.payload;
        return _newState2;
      }

    case _helpers_type_js__WEBPACK_IMPORTED_MODULE_0__["SAVE_USER_CITY"]:
      {
        var _newState3 = _objectSpread({}, state);

        _newState3.selectedCity = action.payload;
        return _newState3;
      }

    default:
      return state;
  }

  return state;
});

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQXBwLmpzIiwid2VicGFjazovLy8uL3JvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVycy9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXJzL3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZHVjZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWR1Y2Vycy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3M/YzY2YiJdLCJuYW1lcyI6WyJBcHAiLCJTVE9SQUdFIiwicmVnaXN0ZXJTZXJ2aWNlV29ya2VyIiwiU09DS0VUIiwiaW5pdCIsImNvbnNvbGUiLCJsb2ciLCJpbnN0YW5jZSIsIm9uIiwiY291bnQiLCJtaWRkbGVXYXJlIiwidGh1bmsiLCJsb2dnZXIiLCJjcmVhdGVMb2dnZXIiLCJwdXNoIiwic3RvcmUiLCJjcmVhdGVTdG9yZSIsInJlZHVjZXJzIiwid2luZG93IiwiSU5JVElBTF9TVEFURSIsImFwcGx5TWlkZGxld2FyZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiTG9hZGluZ0NvbXBvbmVudCIsIkhvbWVWaWV3IiwibG9hZGFibGUiLCJsb2FkZXIiLCJsb2FkaW5nIiwibW9kdWxlcyIsIndlYnBhY2siLCJyZXF1aXJlIiwiUHJvZmlsZVZpZXciLCJMb2dpblZpZXciLCJQb3J0YWwiLCJQcm9kdWN0RGVzY3JpcHRpb24iLCJDaGF0VmlldyIsIlByb2plY3QiLCJyb3V0ZXMiLCJwYXRoIiwiY29tcG9uZW50IiwicmVuZGVyT25TZXJ2ZXIiLCJSb3V0ZXMiLCJtYXAiLCJyb3V0ZSIsImkiLCJzb2NrZXQiLCJpbml0aWFsaXplIiwiY2IiLCJpbyIsImNsaWNrZWQiLCJlbWl0Iiwic2VuZE1lc3NhZ2VUb1Jvb20iLCJkYXRhUGFyYW1zIiwiTG9hZGFibGUiLCJwcmVsb2FkUmVhZHkiLCJ0aGVuIiwiUmVhY3REb20iLCJoeWRyYXRlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkhlYWRlciIsInBhZ2UiLCJwcm9wcyIsImhpc3RvcnkiLCJuYXZpZ2F0ZVRvIiwiYmluZCIsIm5hdmlnYXRvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXJ2aWNlV29ya2VyIiwicmVnaXN0ZXIiLCJyZWdpc3RyYXRpb24iLCJzY29wZSIsImVyciIsIkxPQURfSU5JVElBTF9EQVRBIiwiTE9BRF9TU1JfSU5JVElBTF9EQVRBIiwiU0VMRUNUX0xPQ0FUSU9OIiwiU0FWRV9VU0VSX0NJVFkiLCJhbGxSZWR1Y2VycyIsImNvbWJpbmVSZWR1Y2VycyIsIlVTRVIiLCJmb3JtIiwiZm9ybVJlZHVjZXIiLCJkZWZhdWx0U3RhdGUiLCJ1c2VyX2xpc3QiLCJsb2FkZWRTU1IiLCJzZWxlY3RlZExvY2F0aW9uIiwic2VsZWN0ZWRDaXR5Iiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwibmV3U3RhdGUiLCJwYXlsb2FkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSwwQ0FB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O0FBQ0EsZUFBT0QsVUFBUDtBQUNBOztBQUNEO0FBQVMsYUFBT0gsS0FBUDtBQWxDVjs7QUFvQ0EsU0FBT0EsS0FBUDtBQUNBLEM7Ozs7Ozs7Ozs7O0FDaERELHVDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1haW5cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5idW5kbGUuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9pbmRleC5qc1wiLFwidmVuZG9yfm1haW5cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUm91dGVzIGZyb20gJy4vcm91dGVzLmpzJ1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG4vL2ltcG9ydCAnLi9zcmMvanMvc3R5bGUuY3NzJ1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcbmltcG9ydCByZWR1Y2VycyBmcm9tICcuL3NyYy9qcy9yZWR1Y2Vycy9pbmRleC5qcydcbmltcG9ydCBTdHlsZSBmcm9tICcuL3NyYy9zdHlsZS5jc3MnXG5pbXBvcnQgU1RPUkFHRSBmcm9tICcuL3NyYy9qcy9oZWxwZXJzL3N0b3JhZ2UuanMnXG5pbXBvcnQgU09DS0VUIGZyb20gJy4vc29ja2V0LmpzJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0U1RPUkFHRS5yZWdpc3RlclNlcnZpY2VXb3JrZXIoKTtcblx0XHRTT0NLRVQuaW5pdCgoKT0+e1xuXHRcdFx0Y29uc29sZS5sb2coJ2NsZW50IHNvY2tldCcpO1xuXHRcdH0pO1xuXG5cdFx0aWYoU09DS0VUICYmIFNPQ0tFVC5pbnN0YW5jZSkge1xuXHRcdFx0U09DS0VULmluc3RhbmNlLm9uKCdjb3VudFVwZGF0ZWQnLCAoY291bnQpPT57XG5cdFx0XHRcdGNvbnNvbGUubG9nKCd1cGRhdGVkIG9uIGNsaWVudCcsIGNvdW50KTtcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IG1pZGRsZVdhcmUgPSBbdGh1bmtdXG5cdFx0Y29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKClcblx0XHRtaWRkbGVXYXJlLnB1c2gobG9nZ2VyKVxuXHRcdGxldCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXJzLCB3aW5kb3cuSU5JVElBTF9TVEFURSwgYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZVdhcmUpKVxuXHRcdFxuXHRcdHJldHVybihcblx0XHRcdFx0PFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG5cdFx0XHRcdDxCcm93c2VyUm91dGVyPlxuXHRcdFx0XHRcdDxSb3V0ZXMgLz5cblx0XHRcdFx0PC9Ccm93c2VyUm91dGVyPlxuXHRcdFx0XHQ8L1Byb3ZpZGVyPlxuXHRcdFx0KVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IGxvYWRhYmxlIGZyb20gJ3JlYWN0LWxvYWRhYmxlJztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9zcmMvanMvY29tcG9uZW50cy9IZWFkZXIuanMnXG4vL2ltcG9ydCBIb21lVmlldyBmcm9tICcuL3NyYy9qcy9jb250YWluZXIvSG9tZVZpZXcuanMnXG4vL2ltcG9ydCBQcm9maWxlVmlldyBmcm9tICcuL3NyYy9qcy9jb250YWluZXIvUHJvZmlsZVZpZXcuanMnXG5jb25zdCBMb2FkaW5nQ29tcG9uZW50ID0gKCkgPT4gPEhlYWRlciBsb2FkZXI9e3RydWV9Lz5cblxuXG5jb25zdCBIb21lVmlldyA9IGxvYWRhYmxlKHtcblx0bG9hZGVyOiAoKSA9PiBpbXBvcnQoJy4vc3JjL2pzL2NvbnRhaW5lci9Ib21lVmlldy5qcycpLFxuXHRsb2FkaW5nOiBMb2FkaW5nQ29tcG9uZW50LFxuXHRtb2R1bGVzOiBbJy4vc3JjL2pzL2NvbnRhaW5lci9Ib21lVmlldy5qcyddLFxuICBcdHdlYnBhY2s6ICgpID0+IFtyZXF1aXJlLnJlc29sdmVXZWFrKCcuL3NyYy9qcy9jb250YWluZXIvSG9tZVZpZXcuanMnKV1cbn0pXG5cbmNvbnN0IFByb2ZpbGVWaWV3ID0gbG9hZGFibGUoe1xuXHRsb2FkZXI6ICgpID0+IGltcG9ydCgnLi9zcmMvanMvY29udGFpbmVyL1Byb2ZpbGVWaWV3LmpzJyksXG5cdGxvYWRpbmc6IExvYWRpbmdDb21wb25lbnQsXG5cdG1vZHVsZXM6IFsnLi9zcmMvanMvY29udGFpbmVyL1Byb2ZpbGVWaWV3LmpzJ10sXG4gIFx0d2VicGFjazogKCkgPT4gW3JlcXVpcmUucmVzb2x2ZVdlYWsoJy4vc3JjL2pzL2NvbnRhaW5lci9Qcm9maWxlVmlldy5qcycpXVxufSlcblxuY29uc3QgTG9naW5WaWV3ID0gbG9hZGFibGUoe1xuXHRsb2FkZXI6ICgpID0+IGltcG9ydCgnLi9zcmMvanMvY29udGFpbmVyL0xvZ2luUGFnZS5qcycpLFxuXHRsb2FkaW5nOiBMb2FkaW5nQ29tcG9uZW50LFxuXHRtb2R1bGVzOiBbJy4vc3JjL2pzL2NvbnRhaW5lci9Mb2dpblBhZ2UuanMnXSxcbiAgXHR3ZWJwYWNrOiAoKSA9PiBbcmVxdWlyZS5yZXNvbHZlV2VhaygnLi9zcmMvanMvY29udGFpbmVyL0xvZ2luUGFnZS5qcycpXVxufSlcblxuY29uc3QgUG9ydGFsID0gbG9hZGFibGUoe1xuXHRsb2FkZXI6ICgpID0+IGltcG9ydCgnLi9zcmMvanMvY29udGFpbmVyL1BvcnRhbFZpZXcuanMnKSxcblx0bG9hZGluZzogTG9hZGluZ0NvbXBvbmVudCxcblx0bW9kdWxlczogWycuL3NyYy9qcy9jb250YWluZXIvUG9ydGFsVmlldy5qcyddLFxuICBcdHdlYnBhY2s6ICgpID0+IFtyZXF1aXJlLnJlc29sdmVXZWFrKCcuL3NyYy9qcy9jb250YWluZXIvUG9ydGFsVmlldy5qcycpXVxufSlcblxuY29uc3QgUHJvZHVjdERlc2NyaXB0aW9uID0gbG9hZGFibGUoe1xuXHRsb2FkZXI6ICgpID0+IGltcG9ydCgnLi9zcmMvanMvY29udGFpbmVyL1Byb2R1Y3REZXNjcmlwdGlvbi5qcycpLFxuXHRsb2FkaW5nOiBMb2FkaW5nQ29tcG9uZW50LFxuXHRtb2R1bGVzOiBbJy4vc3JjL2pzL2NvbnRhaW5lci9Qcm9kdWN0RGVzY3JpcHRpb24uanMnXSxcbiAgXHR3ZWJwYWNrOiAoKSA9PiBbcmVxdWlyZS5yZXNvbHZlV2VhaygnLi9zcmMvanMvY29udGFpbmVyL1Byb2R1Y3REZXNjcmlwdGlvbi5qcycpXVxufSlcblxuY29uc3QgQ2hhdFZpZXcgPSBsb2FkYWJsZSh7XG5cdGxvYWRlcjogKCkgPT4gaW1wb3J0KCcuL3NyYy9qcy9jb250YWluZXIvQ2hhdFZpZXcuanMnKSxcblx0bG9hZGluZzogTG9hZGluZ0NvbXBvbmVudCxcblx0bW9kdWxlczogWycuL3NyYy9qcy9jb250YWluZXIvQ2hhdFZpZXcuanMnXSxcbiAgXHR3ZWJwYWNrOiAoKSA9PiBbcmVxdWlyZS5yZXNvbHZlV2VhaygnLi9zcmMvanMvY29udGFpbmVyL0NoYXRWaWV3LmpzJyldXG59KVxuXG5jb25zdCBQcm9qZWN0ID0gbG9hZGFibGUoe1xuXHRsb2FkZXI6ICgpID0+IGltcG9ydCgnLi9zcmMvanMvY29udGFpbmVyL1Byb2plY3QuanMnKSxcblx0bG9hZGluZzogTG9hZGluZ0NvbXBvbmVudCxcblx0bW9kdWxlczogWycuL3NyYy9qcy9jb250YWluZXIvUHJvamVjdC5qcyddLFxuICBcdHdlYnBhY2s6ICgpID0+IFtyZXF1aXJlLnJlc29sdmVXZWFrKCcuL3NyYy9qcy9jb250YWluZXIvUHJvamVjdC5qcycpXVxufSlcblxuY29uc3Qgcm91dGVzID0gW1xuXHR7IHBhdGg6ICcvJywgY29tcG9uZW50OiBIb21lVmlldywgcmVuZGVyT25TZXJ2ZXI6IHRydWV9LFxuXHR7IHBhdGg6ICcvcHJvZmlsZScsIGNvbXBvbmVudDogUHJvZmlsZVZpZXcsIHJlbmRlck9uU2VydmVyOiB0cnVlfSxcblx0eyBwYXRoOiAnL2xvZ2luJywgY29tcG9uZW50OiBMb2dpblZpZXcsIHJlbmRlck9uU2VydmVyOiB0cnVlfSxcblx0eyBwYXRoOiAnL3BvcnRhbCcsIGNvbXBvbmVudDogUG9ydGFsIH0sXG5cdHsgcGF0aDogJy9wZHAnLCBjb21wb25lbnQ6IFByb2R1Y3REZXNjcmlwdGlvbiB9LFxuXHR7IHBhdGg6ICcvY2hhdCcsIGNvbXBvbmVudDogQ2hhdFZpZXcgfSxcblx0e3BhdGg6ICcvZGVtbycsIGNvbXBvbmVudDogUHJvamVjdH1cbl1cblxuY2xhc3MgUm91dGVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG5cdHN0YXRpYyBST1VURVMgPSByb3V0ZXNcblx0XG5cdHJlbmRlcigpe1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PFN3aXRjaD5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvdXRlcy5tYXAoKHJvdXRlLCBpKT0+e1xuXHRcdFx0XHRcdFx0cmV0dXJuIDxSb3V0ZSBrZXk9e2l9IGV4YWN0IHBhdGggPXtyb3V0ZS5wYXRofSBjb21wb25lbnQ9e3JvdXRlLmNvbXBvbmVudH0gLz5cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHQ8L1N3aXRjaD5cblx0XHRcdClcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgUm91dGVzIiwiY29uc3Qgc29ja2V0ID0ge1xuXG5cdGluc3RhbmNlOiBudWxsLFxuXHRpbml0aWFsaXplOiBudWxsLFxuXG5cdGluaXQ6KGNiKT0+e1xuXHRcdGlmKHR5cGVvZiBpbz09XCJmdW5jdGlvblwiKXtcblxuXHRcdFx0aWYoIXNvY2tldC5pbnN0YW5jZSkge1xuXHRcdFx0XHRzb2NrZXQuaW5zdGFuY2UgPSBpbygpO1x0XG5cdFx0XHR9XG5cdFx0XHRjYigpO1xuXHRcdH1cblx0fSxcblx0Y2xpY2tlZDogKCk9Pntcblx0XHRzb2NrZXQuaW5zdGFuY2UuZW1pdCgnaW5jcmVtZW50Jyk7XG5cdH0sXG5cdHNlbmRNZXNzYWdlVG9Sb29tKGRhdGFQYXJhbXM9e30pIHtcblx0XHRzb2NrZXQuaW5zdGFuY2UuZW1pdCgnam9pbicsIGRhdGFQYXJhbXMpXG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IHNvY2tldFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0RG9tIGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCBBcHAgZnJvbSAnLi4vQXBwLmpzJ1xuaW1wb3J0IExvYWRhYmxlIGZyb20gJ3JlYWN0LWxvYWRhYmxlJztcblxuXG5Mb2FkYWJsZS5wcmVsb2FkUmVhZHkoKS50aGVuKCgpID0+IHtcblx0UmVhY3REb20uaHlkcmF0ZSg8QXBwLz4sZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSlcbn0pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdG5hdmlnYXRlVG8ocGFnZSl7XG5cdFx0dGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC8ke3BhZ2V9YClcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibGVmdC1uYXZcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJucmJ5LXR4dFwiIG9uQ2xpY2s9e3RoaXMubmF2aWdhdGVUby5iaW5kKHRoaXMsICcnKX0+bmVhcmJ5R3ltPC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyaWdodC1uYXZcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJyaWdodC1zcG5cIiBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlVG8uYmluZCh0aGlzLCAnJyl9PkhvbWU8L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwicmlnaHQtc3BuXCIgb25DbGljaz17dGhpcy5uYXZpZ2F0ZVRvLmJpbmQodGhpcywgJ3Byb2ZpbGUnKX0+QWJvdXQ8L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwicmlnaHQtc3BuXCIgb25DbGljaz17dGhpcy5uYXZpZ2F0ZVRvLmJpbmQodGhpcywgJ3BvcnRhbCcpfT5Qb3J0YWw8L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwicmlnaHQtc3BuXCIgb25DbGljaz17dGhpcy5uYXZpZ2F0ZVRvLmJpbmQodGhpcywgJ2xvZ2luJyl9PkxvZ2luPC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMucHJvcHMubG9hZGVyP1xuXHRcdFx0XHRcdDxwPkxvYWRpbmcuLi4uLi48L3A+XG5cdFx0XHRcdFx0OicnXG5cdFx0XHRcdH1cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlciIsImNvbnN0IFNUT1JBR0UgPSB7XG5cdHJlZ2lzdGVyU2VydmljZVdvcmtlcjogKGRhdGFQYXJhbXM9e30pPT57XG4gICAgICAgIGlmKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PntcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL2VuYWJsZUd5bU5ldHdvcmtSZXF1ZXN0LmpzJykudGhlbihmdW5jdGlvbiAocmVnaXN0cmF0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2UgV29ya2VyIHJlZ2lzdHJhdGlvbiBTdWNjZXNzJywgcmVnaXN0cmF0aW9uLnNjb3BlKVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIC8vcmVnaXN0cmF0aW9uIEZhaWxlZFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2VydmljZSBXb3JrZXIgcmVnaXN0cmF0aW9uIEZhaWxlZCcsIGVycilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNUT1JBR0UiLCJleHBvcnQgY29uc3QgTE9BRF9JTklUSUFMX0RBVEEgPSAnTE9BRF9JTklUSUFMX0RBVEEnXG5leHBvcnQgY29uc3QgTE9BRF9TU1JfSU5JVElBTF9EQVRBID0gJ0xPQURfU1NSX0lOSVRJQUxfREFUQSdcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT04gPSAnU0VMRUNUX0xPQ0FUSU9OJ1xuZXhwb3J0IGNvbnN0IFNBVkVfVVNFUl9DSVRZID0gJ1NBVkVfVVNFUl9DSVRZJyIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IFVTRVIgZnJvbSAnLi91c2VyLmpzJ1xuaW1wb3J0IHsgcmVkdWNlciBhcyBmb3JtUmVkdWNlciB9IGZyb20gJ3JlZHV4LWZvcm0nXG5jb25zdCBhbGxSZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG5cdFVTRVI6VVNFUixcblx0Zm9ybTogZm9ybVJlZHVjZXJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGFsbFJlZHVjZXJzXG4iLCJpbXBvcnQgeyBMT0FEX0lOSVRJQUxfREFUQSwgTE9BRF9TU1JfSU5JVElBTF9EQVRBLCBTRUxFQ1RfTE9DQVRJT04sIFNBVkVfVVNFUl9DSVRZIH0gZnJvbSAnLi4vaGVscGVycy90eXBlLmpzJ1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG5cdHVzZXJfbGlzdDogW10sXG5cdGxvYWRlZFNTUjpmYWxzZSxcblx0c2VsZWN0ZWRMb2NhdGlvbjoge30sXG5cdHNlbGVjdGVkQ2l0eTogJydcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pe1xuXG5cdHN3aXRjaChhY3Rpb24udHlwZSl7XG5cblx0XHRjYXNlICdMT0FEX0lOSVRJQUxfREFUQScgOiB7XG5cdFx0XHRsZXQgbmV3U3RhdGUgPSB7XG5cdFx0XHRcdC4uLnN0YXRlXG5cdFx0XHR9XG5cdFx0XHRuZXdTdGF0ZS51c2VyX2xpc3QgPSBhY3Rpb24ucGF5bG9hZFxuXHRcdFx0cmV0dXJuIG5ld1N0YXRlXG5cdFx0fVxuXG5cdFx0Y2FzZSAnTE9BRF9TU1JfSU5JVElBTF9EQVRBJzoge1xuXHRcdFx0bGV0IG5ld1N0YXRlID0ge1xuXHRcdFx0XHQuLi5zdGF0ZVxuXHRcdFx0fVxuXHRcdFx0bmV3U3RhdGUubG9hZGVkU1NSID0gdHJ1ZVxuXHRcdFx0cmV0dXJuIG5ld1N0YXRlXG5cdFx0fVxuXG5cdFx0Y2FzZSAnU0VMRUNUX0xPQ0FUSU9OJyA6IHtcblx0XHRcdGxldCBuZXdTdGF0ZSA9IHtcblx0XHRcdFx0Li4uc3RhdGVcblx0XHRcdH1cblxuXHRcdFx0bmV3U3RhdGUuc2VsZWN0ZWRMb2NhdGlvbiA9IGFjdGlvbi5wYXlsb2FkXG5cdFx0XHRyZXR1cm4gbmV3U3RhdGVcblx0XHR9XG5cblx0XHRjYXNlIFNBVkVfVVNFUl9DSVRZOiB7XG5cdFx0XHRsZXQgbmV3U3RhdGUgPSB7XG5cdFx0XHRcdC4uLnN0YXRlXG5cdFx0XHR9XG5cdFx0XHRuZXdTdGF0ZS5zZWxlY3RlZENpdHkgPSBhY3Rpb24ucGF5bG9hZFxuXHRcdFx0cmV0dXJuIG5ld1N0YXRlXG5cdFx0fVxuXHRcdGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=