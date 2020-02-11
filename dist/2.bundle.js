(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

function extract(str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
}

function parse(str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: parse(extract(str), opts)
	};
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ "./src/js/action/api.js":
/*!******************************!*\
  !*** ./src/js/action/api.js ***!
  \******************************/
/*! exports provided: API_GET, API_POST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_GET", function() { return API_GET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_POST", function() { return API_POST; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var API_GET = function API_GET(url) {
  return new Promise(function (resolve, reject) {
    try {
      return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(function (response) {
        resolve(response.data);
      });
    } catch (e) {
      console.log('error at api ', e);
    }
  });
};
var API_POST = function API_POST(url, postData) {
  return new Promise(function (resolve, reject) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
      baseURL: url,
      timeout: 1000,
      headers: {
        'X-Custom-Header': 'foobar',
        'Accept-Encoding': 'gzip'
      }
    }).then(function (response) {
      console.log(response);
      resolve(response.data);
    }); // Axios.post(url, postData).then((response)=>{
    // 	resolve(response.data)
    // })
  });
};

/***/ }),

/***/ "./src/js/action/index.js":
/*!********************************!*\
  !*** ./src/js/action/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.js */ "./src/js/action/user.js");

/* harmony default export */ __webpack_exports__["default"] = (_user_js__WEBPACK_IMPORTED_MODULE_0__);

/***/ }),

/***/ "./src/js/action/user.js":
/*!*******************************!*\
  !*** ./src/js/action/user.js ***!
  \*******************************/
/*! exports provided: getInitialData, getServerInitialData, getGeoIPLocation, findPlaces, selectLocation, getAllCities, saveUserCity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialData", function() { return getInitialData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerInitialData", function() { return getServerInitialData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGeoIPLocation", function() { return getGeoIPLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findPlaces", function() { return findPlaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectLocation", function() { return selectLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllCities", function() { return getAllCities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveUserCity", function() { return saveUserCity; });
/* harmony import */ var _helpers_type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/type.js */ "./src/js/helpers/type.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./src/js/action/api.js");


var getInitialData = function getInitialData() {
  return function (dispatch) {
    return Object(_api_js__WEBPACK_IMPORTED_MODULE_1__["API_GET"])('https://react-ssr-api.herokuapp.com/users').then(function (resp) {
      dispatch({
        type: _helpers_type_js__WEBPACK_IMPORTED_MODULE_0__["LOAD_INITIAL_DATA"],
        payload: resp
      });
    });
  };
};
var getServerInitialData = function getServerInitialData() {
  return function (dispatch) {
    dispatch({
      type: _helpers_type_js__WEBPACK_IMPORTED_MODULE_0__["LOAD_SSR_INITIAL_DATA"]
    });
  };
};
var getGeoIPLocation = function getGeoIPLocation() {
  return function (dispatch) {
    Object(_api_js__WEBPACK_IMPORTED_MODULE_1__["API_POST"])('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDWTEhDOgNqy_slfhFrk7fanPCPZK9O1Vs', {}).then(function (resp) {
      console.log(resp);
      dispatch({});
    });
  };
};
var findPlaces = function findPlaces() {
  var searchString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var cb = arguments.length > 1 ? arguments[1] : undefined;
  return function (dispatch) {
    return Object(_api_js__WEBPACK_IMPORTED_MODULE_1__["API_GET"])("http://localhost:4001/searchPlace?searchString=".concat(searchString)).then(function (resp) {
      if (cb) cb(resp);
    });
  };
};
var selectLocation = function selectLocation(city) {
  return function (dispatch) {
    dispatch({
      type: _helpers_type_js__WEBPACK_IMPORTED_MODULE_0__["SELECT_LOCATION"],
      payload: city
    });
  };
};
var getAllCities = function getAllCities(cb) {
  return function (dispatch) {
    return Object(_api_js__WEBPACK_IMPORTED_MODULE_1__["API_GET"])("https://docprime.com/api/v1/diagnostic/allmatrixcities").then(function (resp) {
      if (cb) cb(resp);
    })["catch"](function (e) {});
  };
};
var saveUserCity = function saveUserCity(data) {
  return function (dispatch) {
    dispatch({
      type: _helpers_type_js__WEBPACK_IMPORTED_MODULE_0__["SAVE_USER_CITY"],
      payload: data
    });
  };
};

/***/ }),

/***/ "./src/js/components/ChatView.js":
/*!***************************************!*\
  !*** ./src/js/components/ChatView.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../socket.js */ "./socket.js");
/* harmony import */ var _helpers_useManageRooms_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/useManageRooms.js */ "./src/js/helpers/useManageRooms.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");

function ChatView(props) {
  var parsed = queryString.parse(props.location.search);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      msg = _useState2[0],
      inputMsg = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState4 = _slicedToArray(_useState3, 2),
      sndMsg = _useState4[0],
      sendMessage = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(parsed.name),
      _useState6 = _slicedToArray(_useState5, 2),
      userName = _useState6[0],
      setName = _useState6[1];

  var chatData = Object(_helpers_useManageRooms_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    fname: userName,
    lname: "kumar",
    email: "princekumar7b@gmail.com",
    msg: sndMsg,
    roomId: "kumar",
    roomData: {
      fname: parsed.name,
      lname: "kumar",
      email: "princekumar7b@gmail.com",
      msg: sndMsg,
      roomId: "kumar"
    }
  });

  var sendClicked = function sendClicked() {
    setName(parsed.name);
    sendMessage(msg);
    inputMsg('');
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (_socket_js__WEBPACK_IMPORTED_MODULE_1__["default"] && _socket_js__WEBPACK_IMPORTED_MODULE_1__["default"].instance) {
      _socket_js__WEBPACK_IMPORTED_MODULE_1__["default"].instance.on('roomMessage', function (data) {
        console.log('EMIIIIIIIT');
        console.log(data);
        setName(data.fname);
        sendMessage(data.msg);
      });
    }
  });

  var inputHandler = function inputHandler(event) {
    inputMsg(event.target.value);
  };

  var handleEnterPress = function handleEnterPress(event) {
    if (event.key === 'Enter') {
      sendClicked();
    }
  };

  console.log('cahtView main');
  console.log(chatData);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chat-main"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chat-content"
  }, chatData && chatData.msg && chatData.msg.length ? chatData.msg.map(function (x, id) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: id,
      className: x.fname == parsed.name ? "chat-rght" : "chat-lft"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, x.msg));
  }) : ''), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chat-input"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "chat-txt",
    type: "text",
    value: msg,
    onChange: function onChange(e) {
      return inputHandler(e);
    },
    onKeyPress: function onKeyPress(e) {
      return handleEnterPress(e);
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "crsr",
    onClick: sendClicked
  }, "Send")));
}

/* harmony default export */ __webpack_exports__["default"] = (ChatView);

/***/ }),

/***/ "./src/js/container/ChatView.js":
/*!**************************************!*\
  !*** ./src/js/container/ChatView.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _action_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../action/index.js */ "./src/js/action/index.js");
/* harmony import */ var _helpers_HelmetTags_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/HelmetTags.js */ "./src/js/helpers/HelmetTags.js");
/* harmony import */ var _components_Header_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Header.js */ "./src/js/components/Header.js");
/* harmony import */ var _components_ChatView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ChatView.js */ "./src/js/components/ChatView.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Chat =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Chat, _React$Component);

  function Chat(props) {
    var _this;

    _classCallCheck(this, Chat);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Chat).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getSelectedChat", function (e) {
      console.log(e.target.value);

      _this.setState({
        selectedRoom: e.target.value
      });
    });

    _this.state = {
      selectedRoom: ''
    };
    return _this;
  }

  _createClass(Chat, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {}
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header_js__WEBPACK_IMPORTED_MODULE_4__["default"], this.props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_HelmetTags_js__WEBPACK_IMPORTED_MODULE_3__["default"], {
        title: "Gym House | Hub of all Gym's Near You With Best Offers Applicable",
        description: "Gym House is collaboration of all local gym available.We Provide you best offers on your nearby gym with Personal Fitness Trainer & Diet Plans prepared by certified Gym Trainers."
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        onChange: this.getSelectedChat
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "doctor"
      }, "Doctor"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "admin"
      }, "Admin")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ChatView_js__WEBPACK_IMPORTED_MODULE_5__["default"], this.props));
    }
  }], [{
    key: "loadData",
    value: function loadData(store) {
      return store.dispatch(_action_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].getInitialData());
    }
  }]);

  return Chat;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    USER: state.USER
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getInitialData: function getInitialData() {
      return dispatch(_action_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].getInitialData());
    },
    getGeoIPLocation: function getGeoIPLocation() {
      return dispatch(_action_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].getGeoIPLocation());
    },
    findPlaces: function findPlaces(value, cb) {
      return dispatch(_action_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].findPlaces(value, cb));
    },
    selectLocation: function selectLocation(city) {
      return dispatch(_action_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].selectLocation(city));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Chat));

/***/ }),

/***/ "./src/js/helpers/HelmetTags.js":
/*!**************************************!*\
  !*** ./src/js/helpers/HelmetTags.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/lib/Helmet.js");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var HelmetTags =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HelmetTags, _React$Component);

  function HelmetTags() {
    _classCallCheck(this, HelmetTags);

    return _possibleConstructorReturn(this, _getPrototypeOf(HelmetTags).apply(this, arguments));
  }

  _createClass(HelmetTags, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          description = _this$props.description;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__["Helmet"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
        property: "og:title",
        content: description
      })));
    }
  }]);

  return HelmetTags;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (HelmetTags);

/***/ }),

/***/ "./src/js/helpers/useManageRooms.js":
/*!******************************************!*\
  !*** ./src/js/helpers/useManageRooms.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../socket.js */ "./socket.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




function useManageRooms(props) {
  console.log('CHATtttttt');
  console.log(props);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      _useState2 = _slicedToArray(_useState, 2),
      userRooms = _useState2[0],
      setRoomId = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState4 = _slicedToArray(_useState3, 2),
      currentRoom = _useState4[0],
      setCurrentRoom = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState6 = _slicedToArray(_useState5, 2),
      msg = _useState6[0],
      saveMessage = _useState6[1];

  function addRoom() {
    var allRooms = _objectSpread({}, userRooms);

    if (allRooms[props.roomId]) {} else {
      _socket_js__WEBPACK_IMPORTED_MODULE_1__["default"].instance.emit('join', {
        fname: props.fname,
        msg: props.msg,
        roomId: props.roomId
      });
    }

    allRooms[props.roomId] = props.roomData;
    setRoomId(allRooms);
    setCurrentRoom(props.roomId);
  }

  function removeRoom() {
    var allRooms = _objectSpread({}, userRooms);

    if (allRooms[props.roomId]) {
      delete allRooms[props.roomId];
    }

    setRoomId(allRooms);
    setCurrentRoom('');
  }

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (props.roomId) {
      console.log('Room added', props.roomId);
      addRoom();
    } else if (props.removeRoom) {
      console.log('room removed');
      removeRoom();
    }
  }, [props.roomId, props.removeRoom]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (props.msg && props.roomId) {
      var curentRoomMsg = msg.filter(function (x) {
        return x.roomId == props.roomId;
      });
      curentRoomMsg.push({
        roomId: props.roomId,
        msg: props.msg,
        time: new Date(),
        fname: props.fname
      }); //Send Messag To Socket

      _socket_js__WEBPACK_IMPORTED_MODULE_1__["default"].sendMessageToRoom({
        roomId: props.roomId,
        msg: props.msg,
        time: new Date(),
        fname: props.fname
      });
      saveMessage(curentRoomMsg);
    }
  }, [props.msg, props.roomId]);
  console.log("START USE STATE");
  console.log(userRooms);
  console.log(msg);
  console.log("END USE STATE");

  if (props.roomId && userRooms[props.roomId]) {
    return {
      roomData: userRooms[props.roomId],
      currentRoom: currentRoom,
      msg: msg,
      fname: props.fname
    };
  } else {
    return null;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (useManageRooms);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVjb2RlLXVyaS1jb21wb25lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5LXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FjdGlvbi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYWN0aW9uL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQ2hhdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRhaW5lci9DaGF0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVycy9IZWxtZXRUYWdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXJzL3VzZU1hbmFnZVJvb21zLmpzIl0sIm5hbWVzIjpbIkFQSV9HRVQiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIkF4aW9zIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsImUiLCJjb25zb2xlIiwibG9nIiwiQVBJX1BPU1QiLCJwb3N0RGF0YSIsImNyZWF0ZSIsImJhc2VVUkwiLCJ0aW1lb3V0IiwiaGVhZGVycyIsIlVTRVIiLCJnZXRJbml0aWFsRGF0YSIsImRpc3BhdGNoIiwicmVzcCIsInR5cGUiLCJMT0FEX0lOSVRJQUxfREFUQSIsInBheWxvYWQiLCJnZXRTZXJ2ZXJJbml0aWFsRGF0YSIsIkxPQURfU1NSX0lOSVRJQUxfREFUQSIsImdldEdlb0lQTG9jYXRpb24iLCJmaW5kUGxhY2VzIiwic2VhcmNoU3RyaW5nIiwiY2IiLCJzZWxlY3RMb2NhdGlvbiIsImNpdHkiLCJTRUxFQ1RfTE9DQVRJT04iLCJnZXRBbGxDaXRpZXMiLCJzYXZlVXNlckNpdHkiLCJTQVZFX1VTRVJfQ0lUWSIsInF1ZXJ5U3RyaW5nIiwicmVxdWlyZSIsIkNoYXRWaWV3IiwicHJvcHMiLCJwYXJzZWQiLCJwYXJzZSIsImxvY2F0aW9uIiwic2VhcmNoIiwidXNlU3RhdGUiLCJtc2ciLCJpbnB1dE1zZyIsInNuZE1zZyIsInNlbmRNZXNzYWdlIiwibmFtZSIsInVzZXJOYW1lIiwic2V0TmFtZSIsImNoYXREYXRhIiwidXNlQ2hhdFJvb21zIiwiZm5hbWUiLCJsbmFtZSIsImVtYWlsIiwicm9vbUlkIiwicm9vbURhdGEiLCJzZW5kQ2xpY2tlZCIsInVzZUVmZmVjdCIsIlNPQ0tFVCIsImluc3RhbmNlIiwib24iLCJpbnB1dEhhbmRsZXIiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlRW50ZXJQcmVzcyIsImtleSIsImxlbmd0aCIsIm1hcCIsIngiLCJpZCIsIkNoYXQiLCJzZXRTdGF0ZSIsInNlbGVjdGVkUm9vbSIsInN0YXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiZ2V0U2VsZWN0ZWRDaGF0Iiwic3RvcmUiLCJBY3Rpb25zIiwiUmVhY3QiLCJDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJjb25uZWN0IiwiSGVsbWV0VGFncyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJ1c2VNYW5hZ2VSb29tcyIsInVzZXJSb29tcyIsInNldFJvb21JZCIsImN1cnJlbnRSb29tIiwic2V0Q3VycmVudFJvb20iLCJzYXZlTWVzc2FnZSIsImFkZFJvb20iLCJhbGxSb29tcyIsImVtaXQiLCJyZW1vdmVSb29tIiwiY3VyZW50Um9vbU1zZyIsImZpbHRlciIsInB1c2giLCJ0aW1lIiwiRGF0ZSIsInNlbmRNZXNzYWdlVG9Sb29tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYix1QkFBdUIsRUFBRTtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFZTixLQUFLLENBQUNrQixNQUFsQixDQVRNLENBQVQ7QUFXQWhELFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaO0FBQ0FELFNBQU8sQ0FBQ0MsR0FBUixDQUFZa0YsU0FBWjtBQUNBbkYsU0FBTyxDQUFDQyxHQUFSLENBQVltQyxHQUFaO0FBQ0FwQyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaOztBQUNBLE1BQUc2QixLQUFLLENBQUNrQixNQUFOLElBQWdCbUMsU0FBUyxDQUFDckQsS0FBSyxDQUFDa0IsTUFBUCxDQUE1QixFQUEyQztBQUMxQyxXQUFPO0FBQUNDLGNBQVEsRUFBRWtDLFNBQVMsQ0FBQ3JELEtBQUssQ0FBQ2tCLE1BQVAsQ0FBcEI7QUFBb0NxQyxpQkFBVyxFQUFFQSxXQUFqRDtBQUE4RGpELFNBQUcsRUFBRUEsR0FBbkU7QUFBd0VTLFdBQUssRUFBRWYsS0FBSyxDQUFDZTtBQUFyRixLQUFQO0FBQ0EsR0FGRCxNQUVNO0FBQ0wsV0FBTyxJQUFQO0FBQ0E7QUFDRDs7QUFFY3FDLDZFQUFmLEUiLCJmaWxlIjoiMi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgdG9rZW4gPSAnJVthLWYwLTldezJ9JztcbnZhciBzaW5nbGVNYXRjaGVyID0gbmV3IFJlZ0V4cCh0b2tlbiwgJ2dpJyk7XG52YXIgbXVsdGlNYXRjaGVyID0gbmV3IFJlZ0V4cCgnKCcgKyB0b2tlbiArICcpKycsICdnaScpO1xuXG5mdW5jdGlvbiBkZWNvZGVDb21wb25lbnRzKGNvbXBvbmVudHMsIHNwbGl0KSB7XG5cdHRyeSB7XG5cdFx0Ly8gVHJ5IHRvIGRlY29kZSB0aGUgZW50aXJlIHN0cmluZyBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoY29tcG9uZW50cy5qb2luKCcnKSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIERvIG5vdGhpbmdcblx0fVxuXG5cdGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiBjb21wb25lbnRzO1xuXHR9XG5cblx0c3BsaXQgPSBzcGxpdCB8fCAxO1xuXG5cdC8vIFNwbGl0IHRoZSBhcnJheSBpbiAyIHBhcnRzXG5cdHZhciBsZWZ0ID0gY29tcG9uZW50cy5zbGljZSgwLCBzcGxpdCk7XG5cdHZhciByaWdodCA9IGNvbXBvbmVudHMuc2xpY2Uoc3BsaXQpO1xuXG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmNhbGwoW10sIGRlY29kZUNvbXBvbmVudHMobGVmdCksIGRlY29kZUNvbXBvbmVudHMocmlnaHQpKTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChpbnB1dCk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdHZhciB0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcblxuXHRcdGZvciAodmFyIGkgPSAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpbnB1dCA9IGRlY29kZUNvbXBvbmVudHModG9rZW5zLCBpKS5qb2luKCcnKTtcblxuXHRcdFx0dG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChpbnB1dCkge1xuXHQvLyBLZWVwIHRyYWNrIG9mIGFsbCB0aGUgcmVwbGFjZW1lbnRzIGFuZCBwcmVmaWxsIHRoZSBtYXAgd2l0aCB0aGUgYEJPTWBcblx0dmFyIHJlcGxhY2VNYXAgPSB7XG5cdFx0JyVGRSVGRic6ICdcXHVGRkZEXFx1RkZGRCcsXG5cdFx0JyVGRiVGRSc6ICdcXHVGRkZEXFx1RkZGRCdcblx0fTtcblxuXHR2YXIgbWF0Y2ggPSBtdWx0aU1hdGNoZXIuZXhlYyhpbnB1dCk7XG5cdHdoaWxlIChtYXRjaCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBEZWNvZGUgYXMgYmlnIGNodW5rcyBhcyBwb3NzaWJsZVxuXHRcdFx0cmVwbGFjZU1hcFttYXRjaFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMF0pO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlY29kZShtYXRjaFswXSk7XG5cblx0XHRcdGlmIChyZXN1bHQgIT09IG1hdGNoWzBdKSB7XG5cdFx0XHRcdHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuXHR9XG5cblx0Ly8gQWRkIGAlQzJgIGF0IHRoZSBlbmQgb2YgdGhlIG1hcCB0byBtYWtlIHN1cmUgaXQgZG9lcyBub3QgcmVwbGFjZSB0aGUgY29tYmluYXRvciBiZWZvcmUgZXZlcnl0aGluZyBlbHNlXG5cdHJlcGxhY2VNYXBbJyVDMiddID0gJ1xcdUZGRkQnO1xuXG5cdHZhciBlbnRyaWVzID0gT2JqZWN0LmtleXMocmVwbGFjZU1hcCk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gUmVwbGFjZSBhbGwgZGVjb2RlZCBjb21wb25lbnRzXG5cdFx0dmFyIGtleSA9IGVudHJpZXNbaV07XG5cdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5LCAnZycpLCByZXBsYWNlTWFwW2tleV0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbmNvZGVkVVJJKSB7XG5cdGlmICh0eXBlb2YgZW5jb2RlZFVSSSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBgZW5jb2RlZFVSSWAgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCwgZ290IGAnICsgdHlwZW9mIGVuY29kZWRVUkkgKyAnYCcpO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRlbmNvZGVkVVJJID0gZW5jb2RlZFVSSS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcblxuXHRcdC8vIFRyeSB0aGUgYnVpbHQgaW4gZGVjb2RlciBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIEZhbGxiYWNrIHRvIGEgbW9yZSBhZHZhbmNlZCBkZWNvZGVyXG5cdFx0cmV0dXJuIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJpY3RVcmlFbmNvZGUgPSByZXF1aXJlKCdzdHJpY3QtdXJpLWVuY29kZScpO1xudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBkZWNvZGVDb21wb25lbnQgPSByZXF1aXJlKCdkZWNvZGUtdXJpLWNvbXBvbmVudCcpO1xuXG5mdW5jdGlvbiBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0cykge1xuXHRzd2l0Y2ggKG9wdHMuYXJyYXlGb3JtYXQpIHtcblx0XHRjYXNlICdpbmRleCc6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/IFtcblx0XHRcdFx0XHRlbmNvZGUoa2V5LCBvcHRzKSxcblx0XHRcdFx0XHQnWycsXG5cdFx0XHRcdFx0aW5kZXgsXG5cdFx0XHRcdFx0J10nXG5cdFx0XHRcdF0uam9pbignJykgOiBbXG5cdFx0XHRcdFx0ZW5jb2RlKGtleSwgb3B0cyksXG5cdFx0XHRcdFx0J1snLFxuXHRcdFx0XHRcdGVuY29kZShpbmRleCwgb3B0cyksXG5cdFx0XHRcdFx0J109Jyxcblx0XHRcdFx0XHRlbmNvZGUodmFsdWUsIG9wdHMpXG5cdFx0XHRcdF0uam9pbignJyk7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSBudWxsID8gZW5jb2RlKGtleSwgb3B0cykgOiBbXG5cdFx0XHRcdFx0ZW5jb2RlKGtleSwgb3B0cyksXG5cdFx0XHRcdFx0J1tdPScsXG5cdFx0XHRcdFx0ZW5jb2RlKHZhbHVlLCBvcHRzKVxuXHRcdFx0XHRdLmpvaW4oJycpO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSBudWxsID8gZW5jb2RlKGtleSwgb3B0cykgOiBbXG5cdFx0XHRcdFx0ZW5jb2RlKGtleSwgb3B0cyksXG5cdFx0XHRcdFx0Jz0nLFxuXHRcdFx0XHRcdGVuY29kZSh2YWx1ZSwgb3B0cylcblx0XHRcdFx0XS5qb2luKCcnKTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0cykge1xuXHR2YXIgcmVzdWx0O1xuXG5cdHN3aXRjaCAob3B0cy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpIHtcblx0XHRcdFx0cmVzdWx0ID0gL1xcWyhcXGQqKVxcXSQvLmV4ZWMoa2V5KTtcblxuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxkKlxcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB7fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV1bcmVzdWx0WzFdXSA9IHZhbHVlO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikge1xuXHRcdFx0XHRyZXN1bHQgPSAvKFxcW1xcXSkkLy5leGVjKGtleSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXF0kLywgJycpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBlbHNlIGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW3ZhbHVlXTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikge1xuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiBlbmNvZGUodmFsdWUsIG9wdHMpIHtcblx0aWYgKG9wdHMuZW5jb2RlKSB7XG5cdFx0cmV0dXJuIG9wdHMuc3RyaWN0ID8gc3RyaWN0VXJpRW5jb2RlKHZhbHVlKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGtleXNTb3J0ZXIoaW5wdXQpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGlucHV0LnNvcnQoKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGtleXNTb3J0ZXIoT2JqZWN0LmtleXMoaW5wdXQpKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRyZXR1cm4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpO1xuXHRcdH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRyZXR1cm4gaW5wdXRba2V5XTtcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdChzdHIpIHtcblx0dmFyIHF1ZXJ5U3RhcnQgPSBzdHIuaW5kZXhPZignPycpO1xuXHRpZiAocXVlcnlTdGFydCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblx0cmV0dXJuIHN0ci5zbGljZShxdWVyeVN0YXJ0ICsgMSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0cykge1xuXHRvcHRzID0gb2JqZWN0QXNzaWduKHthcnJheUZvcm1hdDogJ25vbmUnfSwgb3B0cyk7XG5cblx0dmFyIGZvcm1hdHRlciA9IHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdHMpO1xuXG5cdC8vIENyZWF0ZSBhbiBvYmplY3Qgd2l0aCBubyBwcm90b3R5cGVcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmcvaXNzdWVzLzQ3XG5cdHZhciByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRzdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoL15bPyMmXS8sICcnKTtcblxuXHRpZiAoIXN0cikge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRzdHIuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuXHRcdHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG5cdFx0Ly8gRmlyZWZveCAocHJlIDQwKSBkZWNvZGVzIGAlM0RgIHRvIGA9YFxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvcXVlcnktc3RyaW5nL3B1bGwvMzdcblx0XHR2YXIga2V5ID0gcGFydHMuc2hpZnQoKTtcblx0XHR2YXIgdmFsID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzLmpvaW4oJz0nKSA6IHVuZGVmaW5lZDtcblxuXHRcdC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG5cdFx0Ly8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuXHRcdHZhbCA9IHZhbCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGRlY29kZUNvbXBvbmVudCh2YWwpO1xuXG5cdFx0Zm9ybWF0dGVyKGRlY29kZUNvbXBvbmVudChrZXkpLCB2YWwsIHJldCk7XG5cdH0pO1xuXG5cdHJldHVybiBPYmplY3Qua2V5cyhyZXQpLnNvcnQoKS5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwga2V5KSB7XG5cdFx0dmFyIHZhbCA9IHJldFtrZXldO1xuXHRcdGlmIChCb29sZWFuKHZhbCkgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsKSkge1xuXHRcdFx0Ly8gU29ydCBvYmplY3Qga2V5cywgbm90IHZhbHVlc1xuXHRcdFx0cmVzdWx0W2tleV0gPSBrZXlzU29ydGVyKHZhbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdFtrZXldID0gdmFsO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufVxuXG5leHBvcnRzLmV4dHJhY3QgPSBleHRyYWN0O1xuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcblx0dmFyIGRlZmF1bHRzID0ge1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJ1xuXHR9O1xuXG5cdG9wdHMgPSBvYmplY3RBc3NpZ24oZGVmYXVsdHMsIG9wdHMpO1xuXG5cdGlmIChvcHRzLnNvcnQgPT09IGZhbHNlKSB7XG5cdFx0b3B0cy5zb3J0ID0gZnVuY3Rpb24gKCkge307XG5cdH1cblxuXHR2YXIgZm9ybWF0dGVyID0gZW5jb2RlckZvckFycmF5Rm9ybWF0KG9wdHMpO1xuXG5cdHJldHVybiBvYmogPyBPYmplY3Qua2V5cyhvYmopLnNvcnQob3B0cy5zb3J0KS5tYXAoZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciB2YWwgPSBvYmpba2V5XTtcblxuXHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh2YWwgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRzKTtcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cblx0XHRcdHZhbC5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKHZhbDIpIHtcblx0XHRcdFx0aWYgKHZhbDIgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGZvcm1hdHRlcihrZXksIHZhbDIsIHJlc3VsdC5sZW5ndGgpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJyYnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0cykgKyAnPScgKyBlbmNvZGUodmFsLCBvcHRzKTtcblx0fSkuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG5cdFx0cmV0dXJuIHgubGVuZ3RoID4gMDtcblx0fSkuam9pbignJicpIDogJyc7XG59O1xuXG5leHBvcnRzLnBhcnNlVXJsID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuXHRyZXR1cm4ge1xuXHRcdHVybDogc3RyLnNwbGl0KCc/JylbMF0gfHwgJycsXG5cdFx0cXVlcnk6IHBhcnNlKGV4dHJhY3Qoc3RyKSwgb3B0cylcblx0fTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHR9KTtcbn07XG4iLCJpbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnXG5cbmV4cG9ydCBjb25zdCBBUElfR0VUID0gKHVybCk9PiB7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdHRyeXtcblx0XHRcdHJldHVybiBBeGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSk9Pntcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZS5kYXRhKVxuXHRcdFx0fSlcblx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRjb25zb2xlLmxvZygnZXJyb3IgYXQgYXBpICcsIGUpXG5cdFx0fVxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgQVBJX1BPU1QgPSAodXJsLCBwb3N0RGF0YSk9PiB7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdHJldHVybiBBeGlvcy5jcmVhdGUoe1xuXHRcdFx0ICBiYXNlVVJMOiB1cmwsXG5cdFx0XHQgIHRpbWVvdXQ6IDEwMDAsXG5cdFx0XHQgIGhlYWRlcnM6IHsnWC1DdXN0b20tSGVhZGVyJzogJ2Zvb2JhcicsJ0FjY2VwdC1FbmNvZGluZyc6J2d6aXAnfVxuXHRcdFx0fSkudGhlbigocmVzcG9uc2UpPT57XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcblx0XHRcdH0pXG5cblxuXHRcdC8vIEF4aW9zLnBvc3QodXJsLCBwb3N0RGF0YSkudGhlbigocmVzcG9uc2UpPT57XG5cdFx0Ly8gXHRyZXNvbHZlKHJlc3BvbnNlLmRhdGEpXG5cdFx0Ly8gfSlcblx0fSlcbn0iLCJpbXBvcnQgKiBhcyBVU0VSIGZyb20gJy4vdXNlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgVVNFUiIsImltcG9ydCB7IExPQURfSU5JVElBTF9EQVRBLCBMT0FEX1NTUl9JTklUSUFMX0RBVEEsIFNFTEVDVF9MT0NBVElPTiwgU0FWRV9VU0VSX0NJVFkgfSBmcm9tICcuLi9oZWxwZXJzL3R5cGUuanMnXG5pbXBvcnQgeyBBUElfR0VULCBBUElfUE9TVCB9IGZyb20gJy4vYXBpLmpzJ1xuXG5leHBvcnQgY29uc3QgZ2V0SW5pdGlhbERhdGEgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0cmV0dXJuIEFQSV9HRVQoJ2h0dHBzOi8vcmVhY3Qtc3NyLWFwaS5oZXJva3VhcHAuY29tL3VzZXJzJykudGhlbigocmVzcCk9Pntcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBMT0FEX0lOSVRJQUxfREFUQSxcblx0XHRcdHBheWxvYWQ6IHJlc3Bcblx0XHR9KVx0XG5cdH0pXG5cdFxufSBcblxuZXhwb3J0IGNvbnN0IGdldFNlcnZlckluaXRpYWxEYXRhID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IExPQURfU1NSX0lOSVRJQUxfREFUQVxuXHRcdH0pXG5cdFxufVxuXG5leHBvcnQgY29uc3QgZ2V0R2VvSVBMb2NhdGlvbiA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRcblx0QVBJX1BPU1QoJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2dlb2xvY2F0aW9uL3YxL2dlb2xvY2F0ZT9rZXk9QUl6YVN5RFdURWhET2dOcXlfc2xmaEZyazdmYW5QQ1BaSzlPMVZzJywge30pLnRoZW4oKHJlc3ApPT57XG5cdFx0Y29uc29sZS5sb2cocmVzcClcblx0XHRkaXNwYXRjaCh7XG5cblx0XHR9KVxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZmluZFBsYWNlcyA9IChzZWFyY2hTdHJpbmc9JycsIGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0XG5cdHJldHVybiBBUElfR0VUKGBodHRwOi8vbG9jYWxob3N0OjQwMDEvc2VhcmNoUGxhY2U/c2VhcmNoU3RyaW5nPSR7c2VhcmNoU3RyaW5nfWApLnRoZW4oKHJlc3ApPT57XG5cdFx0aWYoY2IpY2IocmVzcClcdFxuXHR9KVxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0TG9jYXRpb24gPSAoY2l0eSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdGRpc3BhdGNoKHtcblx0XHR0eXBlOiBTRUxFQ1RfTE9DQVRJT04sXG5cdFx0cGF5bG9hZDogY2l0eVxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0QWxsQ2l0aWVzID0gKGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0cmV0dXJuIEFQSV9HRVQoYGh0dHBzOi8vZG9jcHJpbWUuY29tL2FwaS92MS9kaWFnbm9zdGljL2FsbG1hdHJpeGNpdGllc2ApLnRoZW4oKHJlc3ApPT57XG5cdFx0aWYoY2IpY2IocmVzcClcblx0fSkuY2F0Y2goKGUpPT57XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IHNhdmVVc2VyQ2l0eSA9IChkYXRhKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0ZGlzcGF0Y2goe1xuXHRcdHR5cGU6IFNBVkVfVVNFUl9DSVRZLFxuXHRcdHBheWxvYWQ6IGRhdGFcblx0fSlcbn0iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFNPQ0tFVCBmcm9tICcuLi8uLi8uLi9zb2NrZXQuanMnO1xuaW1wb3J0IHVzZUNoYXRSb29tcyBmcm9tICcuLi9oZWxwZXJzL3VzZU1hbmFnZVJvb21zLmpzJ1xuY29uc3QgcXVlcnlTdHJpbmcgPSByZXF1aXJlKCdxdWVyeS1zdHJpbmcnKTtcblxuXG5mdW5jdGlvbiBDaGF0Vmlldyhwcm9wcyl7XG5cblx0Y29uc3QgcGFyc2VkID0gcXVlcnlTdHJpbmcucGFyc2UocHJvcHMubG9jYXRpb24uc2VhcmNoKTtcblx0Y29uc3RbbXNnLCBpbnB1dE1zZ10gPSB1c2VTdGF0ZSgnJylcblx0Y29uc3Rbc25kTXNnLCBzZW5kTWVzc2FnZV0gPSB1c2VTdGF0ZSgnJylcblx0Y29uc3RbdXNlck5hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUocGFyc2VkLm5hbWUpXG5cdHZhciBjaGF0RGF0YSA9IHVzZUNoYXRSb29tcyh7Zm5hbWU6IHVzZXJOYW1lLCBsbmFtZTogXCJrdW1hclwiLCBlbWFpbDogXCJwcmluY2VrdW1hcjdiQGdtYWlsLmNvbVwiLCBtc2c6IHNuZE1zZywgcm9vbUlkOiBcImt1bWFyXCIsIHJvb21EYXRhOnsgZm5hbWU6IHBhcnNlZC5uYW1lLCBsbmFtZTogXCJrdW1hclwiLCBlbWFpbDogXCJwcmluY2VrdW1hcjdiQGdtYWlsLmNvbVwiLCBtc2c6IHNuZE1zZywgcm9vbUlkOiBcImt1bWFyXCIgfX0pO1xuXG5cdHZhciBzZW5kQ2xpY2tlZCA9ICgpPT57XG5cdFx0c2V0TmFtZShwYXJzZWQubmFtZSk7XG5cdFx0c2VuZE1lc3NhZ2UobXNnKTtcblx0XHRpbnB1dE1zZygnJyk7XG5cdH1cblxuXHR1c2VFZmZlY3QoKCk9Pntcblx0XHRpZihTT0NLRVQgJiYgU09DS0VULmluc3RhbmNlKSB7XG5cdFx0XHRTT0NLRVQuaW5zdGFuY2Uub24oJ3Jvb21NZXNzYWdlJywgKGRhdGEpPT57XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdFTUlJSUlJSUlUJyk7Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdHNldE5hbWUoZGF0YS5mbmFtZSk7XG5cdFx0XHRcdHNlbmRNZXNzYWdlKGRhdGEubXNnKTtcblx0XHRcdH0pXHRcblx0XHR9XG5cdH0pXG5cdFxuXG5cdHZhciBpbnB1dEhhbmRsZXIgPSAoZXZlbnQpPT4ge1xuXHRcdGlucHV0TXNnKGV2ZW50LnRhcmdldC52YWx1ZSk7XG5cdH1cblxuXHR2YXIgaGFuZGxlRW50ZXJQcmVzcyA9IChldmVudCkgPT4ge1xuXHRcdGlmKGV2ZW50LmtleT09PSdFbnRlcicpIHtcblx0XHRcdHNlbmRDbGlja2VkKCk7XG5cdFx0fVxuXHR9XG5cdGNvbnNvbGUubG9nKCdjYWh0VmlldyBtYWluJyk7XG5cdGNvbnNvbGUubG9nKGNoYXREYXRhKTtcblx0cmV0dXJuKFxuXHQ8ZGl2IGNsYXNzTmFtZT1cImNoYXQtbWFpblwiPlxuXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJjaGF0LWNvbnRlbnRcIj5cblx0XHRcdHtcblx0XHRcdFx0Y2hhdERhdGEgJiYgY2hhdERhdGEubXNnICYmIGNoYXREYXRhLm1zZy5sZW5ndGg/XG5cdFx0XHRcdGNoYXREYXRhLm1zZy5tYXAoKHgsIGlkKT0+e1xuXHRcdFx0XHRcdHJldHVybiA8ZGl2IGtleT17aWR9IGNsYXNzTmFtZT17eC5mbmFtZT09cGFyc2VkLm5hbWU/XCJjaGF0LXJnaHRcIjpcImNoYXQtbGZ0XCJ9PlxuXHRcdFx0XHRcdFx0PHA+e3gubXNnfTwvcD5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0fSlcblx0XHRcdFx0OicnXG5cdFx0XHR9XG5cdFx0PC9kaXY+XG5cdFx0PGRpdiBjbGFzc05hbWU9XCJjaGF0LWlucHV0XCI+XG5cdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiY2hhdC10eHRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXttc2d9IG9uQ2hhbmdlPXsoZSk9PmlucHV0SGFuZGxlcihlKX0gb25LZXlQcmVzcz17KGUpPT5oYW5kbGVFbnRlclByZXNzKGUpfS8+XG5cdFx0XHQ8cCBjbGFzc05hbWU9XCJjcnNyXCIgb25DbGljaz17c2VuZENsaWNrZWR9PlNlbmQ8L3A+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxuXHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0ICBBY3Rpb25zIGZyb20gJy4uL2FjdGlvbi9pbmRleC5qcydcbmltcG9ydCBIZWxtZXRUYWdzIGZyb20gJy4uL2hlbHBlcnMvSGVsbWV0VGFncy5qcydcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9IZWFkZXIuanMnXG5pbXBvcnQgQ2hhdFZpZXcgZnJvbSAnLi4vY29tcG9uZW50cy9DaGF0Vmlldy5qcydcblxuY2xhc3MgQ2hhdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdHNlbGVjdGVkUm9vbTonJ1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBsb2FkRGF0YShzdG9yZSl7XG5cdFx0cmV0dXJuIHN0b3JlLmRpc3BhdGNoKEFjdGlvbnMuZ2V0SW5pdGlhbERhdGEoKSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcblx0XHRcblx0fVxuXG5cdGdldFNlbGVjdGVkQ2hhdCA9IChlKT0+e1xuXHRcdGNvbnNvbGUubG9nKGUudGFyZ2V0LnZhbHVlKTtcblx0XHR0aGlzLnNldFN0YXRlKHtzZWxlY3RlZFJvb206IGUudGFyZ2V0LnZhbHVlfSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdFxuXHRcdHJldHVybihcblxuXHRcdFx0PFJlYWN0LkZyYWdtZW50PlxuXHRcdFx0XHQ8SGVhZGVyIHsuLi50aGlzLnByb3BzfS8+XG5cdFx0XHRcdDxIZWxtZXRUYWdzIHRpdGxlID1cIkd5bSBIb3VzZSB8IEh1YiBvZiBhbGwgR3ltJ3MgTmVhciBZb3UgV2l0aCBCZXN0IE9mZmVycyBBcHBsaWNhYmxlXCIgZGVzY3JpcHRpb249XCJHeW0gSG91c2UgaXMgY29sbGFib3JhdGlvbiBvZiBhbGwgbG9jYWwgZ3ltIGF2YWlsYWJsZS5XZSBQcm92aWRlIHlvdSBiZXN0IG9mZmVycyBvbiB5b3VyIG5lYXJieSBneW0gd2l0aCBQZXJzb25hbCBGaXRuZXNzIFRyYWluZXIgJiBEaWV0IFBsYW5zIHByZXBhcmVkIGJ5IGNlcnRpZmllZCBHeW0gVHJhaW5lcnMuXCIvPlxuXHRcdFx0XHQ8c2VsZWN0IG9uQ2hhbmdlPXt0aGlzLmdldFNlbGVjdGVkQ2hhdH0+XG5cdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cImRvY3RvclwiPkRvY3Rvcjwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJhZG1pblwiPkFkbWluPC9vcHRpb24+XG5cdFx0XHRcdDwvc2VsZWN0PlxuXHRcdFx0XHQ8Q2hhdFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG5cdFx0XHRcdFxuXHRcdFx0PC9SZWFjdC5GcmFnbWVudD5cblx0XHRcdClcblx0fVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpPT57XG5cdHJldHVybiB7XG5cdFx0VVNFUjpzdGF0ZS5VU0VSXG5cdH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG5cdHJldHVybiB7XG5cdFx0Z2V0SW5pdGlhbERhdGE6KCk9PmRpc3BhdGNoKEFjdGlvbnMuZ2V0SW5pdGlhbERhdGEoKSksXG5cdFx0Z2V0R2VvSVBMb2NhdGlvbjogKCk9PmRpc3BhdGNoKEFjdGlvbnMuZ2V0R2VvSVBMb2NhdGlvbigpKSxcblx0XHRmaW5kUGxhY2VzOiAodmFsdWUsIGNiKSA9PiBkaXNwYXRjaChBY3Rpb25zLmZpbmRQbGFjZXModmFsdWUsIGNiKSksXG5cdFx0c2VsZWN0TG9jYXRpb246IChjaXR5KSA9PiBkaXNwYXRjaChBY3Rpb25zLnNlbGVjdExvY2F0aW9uKGNpdHkpKVxuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShDaGF0KVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgSGVsbWV0IH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5jbGFzcyBIZWxtZXRUYWdzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRyZW5kZXIoKXtcblxuXHRcdGxldCB7IHRpdGxlICwgZGVzY3JpcHRpb24gfSA9IHRoaXMucHJvcHNcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8SGVsbWV0PlxuXHRcdFx0XHRcdDx0aXRsZT57dGl0bGV9PC90aXRsZT5cblx0XHRcdFx0XHQ8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudCA9IHtkZXNjcmlwdGlvbn0vPlxuXHRcdFx0XHQ8L0hlbG1ldD5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlbG1ldFRhZ3MiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTT0NLRVQgZnJvbSAnLi4vLi4vLi4vc29ja2V0LmpzJztcblxuXG5mdW5jdGlvbiB1c2VNYW5hZ2VSb29tcyhwcm9wcyl7XG5cdGNvbnNvbGUubG9nKCdDSEFUdHR0dHR0Jyk7Y29uc29sZS5sb2cocHJvcHMpO1xuXG5cdGNvbnN0W3VzZXJSb29tcywgc2V0Um9vbUlkXSA9IHVzZVN0YXRlKHt9KTtcblx0Y29uc3RbY3VycmVudFJvb20sIHNldEN1cnJlbnRSb29tXSA9IHVzZVN0YXRlKCcnKVxuXHRjb25zdFttc2csIHNhdmVNZXNzYWdlXSA9IHVzZVN0YXRlKFtdKVxuXG5cdGZ1bmN0aW9uIGFkZFJvb20oKXtcblx0XHRsZXQgYWxsUm9vbXMgPSB7Li4udXNlclJvb21zfTtcblx0XHRpZihhbGxSb29tc1twcm9wcy5yb29tSWRdKSB7XG5cblx0XHR9ZWxzZXtcblx0XHRcdFNPQ0tFVC5pbnN0YW5jZS5lbWl0KCdqb2luJywge2ZuYW1lOiBwcm9wcy5mbmFtZSwgbXNnOiBwcm9wcy5tc2csIHJvb21JZDogcHJvcHMucm9vbUlkfSlcblx0XHR9XG5cdFx0YWxsUm9vbXNbcHJvcHMucm9vbUlkXSA9IHByb3BzLnJvb21EYXRhXG5cdFx0c2V0Um9vbUlkKGFsbFJvb21zKVxuXHRcdHNldEN1cnJlbnRSb29tKHByb3BzLnJvb21JZClcblx0fVxuXG5cdGZ1bmN0aW9uIHJlbW92ZVJvb20oKXtcblx0XHRsZXQgYWxsUm9vbXMgPSB7Li4udXNlclJvb21zfTtcblx0XHRpZihhbGxSb29tc1twcm9wcy5yb29tSWRdKSB7XG5cdFx0XHRkZWxldGUgYWxsUm9vbXNbcHJvcHMucm9vbUlkXTtcblx0XHR9XG5cdFx0c2V0Um9vbUlkKGFsbFJvb21zKVxuXHRcdHNldEN1cnJlbnRSb29tKCcnKVxuXHR9XG5cblx0dXNlRWZmZWN0KCgpPT57XG5cdFx0aWYocHJvcHMucm9vbUlkKXtcblx0XHRcdGNvbnNvbGUubG9nKCdSb29tIGFkZGVkJywgcHJvcHMucm9vbUlkKVxuXHRcdFx0YWRkUm9vbSgpO1xuXHRcdH1lbHNlIGlmKHByb3BzLnJlbW92ZVJvb20pIHtcblx0XHRcdGNvbnNvbGUubG9nKCdyb29tIHJlbW92ZWQnKTtcblx0XHRcdHJlbW92ZVJvb20oKTtcblx0XHR9XG5cdH0sIFtwcm9wcy5yb29tSWQsIHByb3BzLnJlbW92ZVJvb20gXSlcdFxuXG5cdHVzZUVmZmVjdCgoKT0+e1xuXHRcdGlmKHByb3BzLm1zZyAmJiBwcm9wcy5yb29tSWQpIHtcblx0XHRcdGxldCBjdXJlbnRSb29tTXNnID0gbXNnLmZpbHRlcih4PT54LnJvb21JZCA9PSBwcm9wcy5yb29tSWQpXG5cdFx0XHRjdXJlbnRSb29tTXNnLnB1c2goe3Jvb21JZDogcHJvcHMucm9vbUlkLCBtc2c6IHByb3BzLm1zZywgdGltZTogbmV3IERhdGUoKSwgZm5hbWU6IHByb3BzLmZuYW1lfSlcblx0XHRcdC8vU2VuZCBNZXNzYWcgVG8gU29ja2V0XG5cdFx0XHRTT0NLRVQuc2VuZE1lc3NhZ2VUb1Jvb20oe3Jvb21JZDogcHJvcHMucm9vbUlkLCBtc2c6IHByb3BzLm1zZywgdGltZTogbmV3IERhdGUoKSwgZm5hbWU6IHByb3BzLmZuYW1lIH0pO1xuXHRcdFx0XG5cdFx0XHRzYXZlTWVzc2FnZShjdXJlbnRSb29tTXNnKVxuXHRcdH1cblx0fSwgW3Byb3BzLm1zZywgcHJvcHMucm9vbUlkXSlcblxuXHRjb25zb2xlLmxvZyhcIlNUQVJUIFVTRSBTVEFURVwiKTtcblx0Y29uc29sZS5sb2codXNlclJvb21zKTtcblx0Y29uc29sZS5sb2cobXNnKTtcblx0Y29uc29sZS5sb2coXCJFTkQgVVNFIFNUQVRFXCIpO1xuXHRpZihwcm9wcy5yb29tSWQgJiYgdXNlclJvb21zW3Byb3BzLnJvb21JZF0pe1xuXHRcdHJldHVybiB7cm9vbURhdGE6IHVzZXJSb29tc1twcm9wcy5yb29tSWRdLCBjdXJyZW50Um9vbTogY3VycmVudFJvb20sIG1zZzogbXNnLCBmbmFtZTogcHJvcHMuZm5hbWV9XG5cdH1lbHNlIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VNYW5hZ2VSb29tczsiXSwic291cmNlUm9vdCI6IiJ9