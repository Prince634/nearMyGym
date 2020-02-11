(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

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

/***/ "./src/js/components/PortalView.js":
/*!*****************************************!*\
  !*** ./src/js/components/PortalView.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SearchBar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchBar.js */ "./src/js/components/SearchBar.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


 //import from FilteredData from './getFiteredSearchList.js'

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(),
      _useState2 = _slicedToArray(_useState, 2),
      selectedOption = _useState2[0],
      setOptions = _useState2[1];

  function clickHandled(e) {}

  console.log(selectedOption);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "prgHead"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Book Appointment"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Appointment Accepted"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Payment Pending"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Payment Done")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "prgBar"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "prg-line ".concat(selectedOption >= 1 && 'active')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "1")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "prg-line ".concat(selectedOption >= 2 && 'active')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "2")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "prg-line ".concat(selectedOption >= 3 && 'active')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "3")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "prg-line ".concat(selectedOption >= 4 && 'active')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "4"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchBar_js__WEBPACK_IMPORTED_MODULE_1__["default"], props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "select-optn"
  }, "Choose the Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "slctOptn",
    onChange: function onChange(e) {
      return setOptions(e.target.value);
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: ""
  }, "Select Option"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "1"
  }, "Booked"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "2"
  }, "Accepted"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "3"
  }, "Payment Pending"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "4"
  }, "Payment Done")));
});

/***/ }),

/***/ "./src/js/components/SearchBar.js":
/*!****************************************!*\
  !*** ./src/js/components/SearchBar.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getFilteredSearchList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getFilteredSearchList.js */ "./src/js/components/getFilteredSearchList.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(props.USER && props.USER.selectedCity ? props.USER.selectedCity : ''),
      _useState2 = _slicedToArray(_useState, 2),
      searchString = _useState2[0],
      setSearchString = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      search_list = _useState4[0],
      setSearchList = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState6 = _slicedToArray(_useState5, 2),
      filtered_list = _useState6[0],
      getFilterList = _useState6[1];

  function handleInput(e) {
    setSearchString(e.target.value);
    var getFilteredData = Object(_getFilteredSearchList_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target.value, search_list);
    getFilterList(getFilteredData);
  }

  function getSearchList() {
    setSearchString('');
    props.getAllCities(function (resp) {
      getFilterList(resp);
      setSearchList(resp);
    });
  }

  function handleBlur(e) {}

  function handleCrossClick() {
    getFilterList(search_list);
    setSearchString([]);
  }

  function handleCardClicked(data) {
    setSearchString(data.name);
    props.saveUserCity(data.name);
    setSearchList([]);
    getFilterList([]);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "prtlBody"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "srch-bar"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    className: "srch-text-bar",
    placeholder: "Search Your City",
    onChange: function onChange(e) {
      return handleInput(e);
    },
    onFocus: function onFocus() {
      return getSearchList();
    },
    value: searchString,
    onBlur: function onBlur(e) {
      return handleBlur(e);
    }
  }), searchString && searchString.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "cross-icn",
    src: "/images" + "/red-cut.png",
    onClick: function onClick() {
      return handleCrossClick();
    }
  })), filtered_list && filtered_list.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "srch-list"
  }, filtered_list.map(function (data, key) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "srch-card",
      key: key,
      onClick: function onClick() {
        return handleCardClicked(data);
      }
    }, data.name);
  })));
});

/***/ }),

/***/ "./src/js/components/getFilteredSearchList.js":
/*!****************************************************!*\
  !*** ./src/js/components/getFilteredSearchList.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["default"] = (function (searchText, searchList) {
  var list_data = [];

  for (var i = 0; i < searchList.length; i++) {
    var index = searchList[i].name.toLowerCase().indexOf(searchText.toLowerCase());

    if (index > -1) {
      list_data.push(_objectSpread({}, searchList[i], {
        rank: index
      }));
    }
  }

  list_data = list_data.sort(function (a, b) {
    return a.rank - b.rank;
  });
  return list_data;
});

/***/ }),

/***/ "./src/js/container/PortalView.js":
/*!****************************************!*\
  !*** ./src/js/container/PortalView.js ***!
  \****************************************/
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
/* harmony import */ var _components_PortalView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PortalView.js */ "./src/js/components/PortalView.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Portal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    _classCallCheck(this, Portal);

    return _possibleConstructorReturn(this, _getPrototypeOf(Portal).apply(this, arguments));
  }

  _createClass(Portal, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: ""
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header_js__WEBPACK_IMPORTED_MODULE_4__["default"], this.props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_HelmetTags_js__WEBPACK_IMPORTED_MODULE_3__["default"], {
        title: "Nearby Gym-The one place Where you can take care of your helathy lifestyle, Where you can enjoy various games.",
        description: "Travel buddy is a platform to help travellers to befriend the People who are looking for travelling to the same city"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PortalView_js__WEBPACK_IMPORTED_MODULE_5__["default"], this.props));
    }
  }]);

  return Portal;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    USER: state.USER
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getAllCities: function getAllCities(cb) {
      return dispatch(_action_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].getAllCities(cb));
    },
    saveUserCity: function saveUserCity(data) {
      return dispatch(_action_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].saveUserCity(data));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Portal));

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYWN0aW9uL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYWN0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hY3Rpb24vdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9Qb3J0YWxWaWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1NlYXJjaEJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9nZXRGaWx0ZXJlZFNlYXJjaExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRhaW5lci9Qb3J0YWxWaWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXJzL0hlbG1ldFRhZ3MuanMiXSwibmFtZXMiOlsiQVBJX0dFVCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiQXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJBUElfUE9TVCIsInBvc3REYXRhIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJoZWFkZXJzIiwiVVNFUiIsImdldEluaXRpYWxEYXRhIiwiZGlzcGF0Y2giLCJyZXNwIiwidHlwZSIsIkxPQURfSU5JVElBTF9EQVRBIiwicGF5bG9hZCIsImdldFNlcnZlckluaXRpYWxEYXRhIiwiTE9BRF9TU1JfSU5JVElBTF9EQVRBIiwiZ2V0R2VvSVBMb2NhdGlvbiIsImZpbmRQbGFjZXMiLCJzZWFyY2hTdHJpbmciLCJjYiIsInNlbGVjdExvY2F0aW9uIiwiY2l0eSIsIlNFTEVDVF9MT0NBVElPTiIsImdldEFsbENpdGllcyIsInNhdmVVc2VyQ2l0eSIsIlNBVkVfVVNFUl9DSVRZIiwicHJvcHMiLCJ1c2VTdGF0ZSIsInNlbGVjdGVkT3B0aW9uIiwic2V0T3B0aW9ucyIsImNsaWNrSGFuZGxlZCIsInRhcmdldCIsInZhbHVlIiwic2VsZWN0ZWRDaXR5Iiwic2V0U2VhcmNoU3RyaW5nIiwic2VhcmNoX2xpc3QiLCJzZXRTZWFyY2hMaXN0IiwiZmlsdGVyZWRfbGlzdCIsImdldEZpbHRlckxpc3QiLCJoYW5kbGVJbnB1dCIsImdldEZpbHRlcmVkRGF0YSIsIkZpbHRlcmVkU2VhcmNoIiwiZ2V0U2VhcmNoTGlzdCIsImhhbmRsZUJsdXIiLCJoYW5kbGVDcm9zc0NsaWNrIiwiaGFuZGxlQ2FyZENsaWNrZWQiLCJuYW1lIiwibGVuZ3RoIiwiQVNTRVRTX0JBU0VfVVJMIiwibWFwIiwia2V5Iiwic2VhcmNoVGV4dCIsInNlYXJjaExpc3QiLCJsaXN0X2RhdGEiLCJpIiwiaW5kZXgiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJwdXNoIiwicmFuayIsInNvcnQiLCJhIiwiYiIsIlBvcnRhbCIsIlJlYWN0IiwiQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJBY3Rpb25zIiwiY29ubmVjdCIsIkhlbG1ldFRhZ3MiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRU8sSUFBTUEsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ0MsR0FBRCxFQUFRO0FBRTlCLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFvQjtBQUN0QyxRQUFHO0FBQ0YsYUFBT0MsNENBQUssQ0FBQ0MsR0FBTixDQUFVTCxHQUFWLEVBQWVNLElBQWYsQ0FBb0IsVUFBQ0MsUUFBRCxFQUFZO0FBQ3RDTCxlQUFPLENBQUNLLFFBQVEsQ0FBQ0MsSUFBVixDQUFQO0FBQ0EsT0FGTSxDQUFQO0FBR0EsS0FKRCxDQUlDLE9BQU1DLENBQU4sRUFBUTtBQUNSQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCRixDQUE3QjtBQUNBO0FBQ0QsR0FSTSxDQUFQO0FBU0EsQ0FYTTtBQWFBLElBQU1H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QUFBQSx3QkFFdUIsS0FBSzdDLEtBRjVCO0FBQUEsVUFFRDhDLEtBRkMsZUFFREEsS0FGQztBQUFBLFVBRU9DLFdBRlAsZUFFT0EsV0FGUDtBQUdQLGFBQ0Msd0VBQ0MsMkRBQUMsbURBQUQsUUFDQywwRUFBUUQsS0FBUixDQURELEVBRUM7QUFBTSxnQkFBUSxFQUFDLFVBQWY7QUFBMEIsZUFBTyxFQUFJQztBQUFyQyxRQUZELENBREQsQ0FERDtBQVFBOzs7O0VBYnVCVCw0Q0FBSyxDQUFDQyxTOztBQWdCaEJNLHlFQUFmLEUiLCJmaWxlIjoiMy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnXG5cbmV4cG9ydCBjb25zdCBBUElfR0VUID0gKHVybCk9PiB7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdHRyeXtcblx0XHRcdHJldHVybiBBeGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSk9Pntcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZS5kYXRhKVxuXHRcdFx0fSlcblx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRjb25zb2xlLmxvZygnZXJyb3IgYXQgYXBpICcsIGUpXG5cdFx0fVxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgQVBJX1BPU1QgPSAodXJsLCBwb3N0RGF0YSk9PiB7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdHJldHVybiBBeGlvcy5jcmVhdGUoe1xuXHRcdFx0ICBiYXNlVVJMOiB1cmwsXG5cdFx0XHQgIHRpbWVvdXQ6IDEwMDAsXG5cdFx0XHQgIGhlYWRlcnM6IHsnWC1DdXN0b20tSGVhZGVyJzogJ2Zvb2JhcicsJ0FjY2VwdC1FbmNvZGluZyc6J2d6aXAnfVxuXHRcdFx0fSkudGhlbigocmVzcG9uc2UpPT57XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcblx0XHRcdH0pXG5cblxuXHRcdC8vIEF4aW9zLnBvc3QodXJsLCBwb3N0RGF0YSkudGhlbigocmVzcG9uc2UpPT57XG5cdFx0Ly8gXHRyZXNvbHZlKHJlc3BvbnNlLmRhdGEpXG5cdFx0Ly8gfSlcblx0fSlcbn0iLCJpbXBvcnQgKiBhcyBVU0VSIGZyb20gJy4vdXNlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgVVNFUiIsImltcG9ydCB7IExPQURfSU5JVElBTF9EQVRBLCBMT0FEX1NTUl9JTklUSUFMX0RBVEEsIFNFTEVDVF9MT0NBVElPTiwgU0FWRV9VU0VSX0NJVFkgfSBmcm9tICcuLi9oZWxwZXJzL3R5cGUuanMnXG5pbXBvcnQgeyBBUElfR0VULCBBUElfUE9TVCB9IGZyb20gJy4vYXBpLmpzJ1xuXG5leHBvcnQgY29uc3QgZ2V0SW5pdGlhbERhdGEgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0cmV0dXJuIEFQSV9HRVQoJ2h0dHBzOi8vcmVhY3Qtc3NyLWFwaS5oZXJva3VhcHAuY29tL3VzZXJzJykudGhlbigocmVzcCk9Pntcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBMT0FEX0lOSVRJQUxfREFUQSxcblx0XHRcdHBheWxvYWQ6IHJlc3Bcblx0XHR9KVx0XG5cdH0pXG5cdFxufSBcblxuZXhwb3J0IGNvbnN0IGdldFNlcnZlckluaXRpYWxEYXRhID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IExPQURfU1NSX0lOSVRJQUxfREFUQVxuXHRcdH0pXG5cdFxufVxuXG5leHBvcnQgY29uc3QgZ2V0R2VvSVBMb2NhdGlvbiA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRcblx0QVBJX1BPU1QoJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2dlb2xvY2F0aW9uL3YxL2dlb2xvY2F0ZT9rZXk9QUl6YVN5RFdURWhET2dOcXlfc2xmaEZyazdmYW5QQ1BaSzlPMVZzJywge30pLnRoZW4oKHJlc3ApPT57XG5cdFx0Y29uc29sZS5sb2cocmVzcClcblx0XHRkaXNwYXRjaCh7XG5cblx0XHR9KVxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZmluZFBsYWNlcyA9IChzZWFyY2hTdHJpbmc9JycsIGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0XG5cdHJldHVybiBBUElfR0VUKGBodHRwOi8vbG9jYWxob3N0OjQwMDEvc2VhcmNoUGxhY2U/c2VhcmNoU3RyaW5nPSR7c2VhcmNoU3RyaW5nfWApLnRoZW4oKHJlc3ApPT57XG5cdFx0aWYoY2IpY2IocmVzcClcdFxuXHR9KVxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0TG9jYXRpb24gPSAoY2l0eSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdGRpc3BhdGNoKHtcblx0XHR0eXBlOiBTRUxFQ1RfTE9DQVRJT04sXG5cdFx0cGF5bG9hZDogY2l0eVxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0QWxsQ2l0aWVzID0gKGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0cmV0dXJuIEFQSV9HRVQoYGh0dHBzOi8vZG9jcHJpbWUuY29tL2FwaS92MS9kaWFnbm9zdGljL2FsbG1hdHJpeGNpdGllc2ApLnRoZW4oKHJlc3ApPT57XG5cdFx0aWYoY2IpY2IocmVzcClcblx0fSkuY2F0Y2goKGUpPT57XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IHNhdmVVc2VyQ2l0eSA9IChkYXRhKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0ZGlzcGF0Y2goe1xuXHRcdHR5cGU6IFNBVkVfVVNFUl9DSVRZLFxuXHRcdHBheWxvYWQ6IGRhdGFcblx0fSlcbn0iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gJy4vU2VhcmNoQmFyLmpzJ1xuLy9pbXBvcnQgZnJvbSBGaWx0ZXJlZERhdGEgZnJvbSAnLi9nZXRGaXRlcmVkU2VhcmNoTGlzdC5qcydcblxuXG5leHBvcnQgZGVmYXVsdCAocHJvcHMpPT57XG5cblx0Y29uc3QgW3NlbGVjdGVkT3B0aW9uLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlKClcblx0ZnVuY3Rpb24gY2xpY2tIYW5kbGVkKGUpe1xuXG5cdH1cblx0Y29uc29sZS5sb2coc2VsZWN0ZWRPcHRpb24pO1xuXHRyZXR1cm4oXG5cdFx0PFJlYWN0LkZyYWdtZW50PlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwcmdIZWFkXCI+XG5cdFx0XHRcdDxzcGFuPkJvb2sgQXBwb2ludG1lbnQ8L3NwYW4+XG5cdFx0XHRcdDxzcGFuPkFwcG9pbnRtZW50IEFjY2VwdGVkPC9zcGFuPlxuXHRcdFx0XHQ8c3Bhbj5QYXltZW50IFBlbmRpbmc8L3NwYW4+XG5cdFx0XHRcdDxzcGFuPlBheW1lbnQgRG9uZTwvc3Bhbj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PHVsIGNsYXNzTmFtZT1cInByZ0JhclwiPlxuXHRcdFx0XHQ8bGkgY2xhc3NOYW1lPXtgcHJnLWxpbmUgJHtzZWxlY3RlZE9wdGlvbj49MSAmJiAnYWN0aXZlJ31gfT48c3Bhbj4xPC9zcGFuPjwvbGk+XG5cdFx0XHRcdDxsaSBjbGFzc05hbWU9e2BwcmctbGluZSAke3NlbGVjdGVkT3B0aW9uPj0yICYmICdhY3RpdmUnfWB9PjxzcGFuPjI8L3NwYW4+PC9saT5cblx0XHRcdFx0PGxpIGNsYXNzTmFtZT17YHByZy1saW5lICR7c2VsZWN0ZWRPcHRpb24+PTMgJiYgJ2FjdGl2ZSd9YH0+PHNwYW4+Mzwvc3Bhbj48L2xpPlxuXHRcdFx0XHQ8bGkgY2xhc3NOYW1lPXtgcHJnLWxpbmUgJHtzZWxlY3RlZE9wdGlvbj49NCAmJiAnYWN0aXZlJ31gfT48c3Bhbj40PC9zcGFuPjwvbGk+XG5cdFx0XHQ8L3VsPlxuXHRcdFx0PFNlYXJjaEJhciB7Li4ucHJvcHN9Lz4gXG5cdFx0XHQ8bGFiZWwgaHRtbEZvcj1cInNlbGVjdC1vcHRuXCI+Q2hvb3NlIHRoZSBTdGF0dXM8L2xhYmVsPlxuXHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9XCJzbGN0T3B0blwiIG9uQ2hhbmdlPXsoZSk9PnNldE9wdGlvbnMoZS50YXJnZXQudmFsdWUpfT5cblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBPcHRpb248L29wdGlvbj5cblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIjFcIj5Cb29rZWQ8L29wdGlvbj5cblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIjJcIj5BY2NlcHRlZDwvb3B0aW9uPlxuXHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiM1wiPlBheW1lbnQgUGVuZGluZzwvb3B0aW9uPlxuXHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiNFwiPlBheW1lbnQgRG9uZTwvb3B0aW9uPlxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0PC9SZWFjdC5GcmFnbWVudD5cblx0XHQpXG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsdGVyZWRTZWFyY2ggZnJvbSAnLi9nZXRGaWx0ZXJlZFNlYXJjaExpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IChwcm9wcyk9PntcblxuXHRjb25zdCBbc2VhcmNoU3RyaW5nLCBzZXRTZWFyY2hTdHJpbmddID0gIHVzZVN0YXRlKHByb3BzLlVTRVIgJiYgcHJvcHMuVVNFUi5zZWxlY3RlZENpdHk/cHJvcHMuVVNFUi5zZWxlY3RlZENpdHk6JycpOyBcblx0Y29uc3QgW3NlYXJjaF9saXN0LCBzZXRTZWFyY2hMaXN0XSA9ICB1c2VTdGF0ZShbXSlcblx0Y29uc3QgW2ZpbHRlcmVkX2xpc3QsIGdldEZpbHRlckxpc3RdID0gdXNlU3RhdGUoW10pXG5cdFxuXHRmdW5jdGlvbiBoYW5kbGVJbnB1dChlKXtcblx0XHRzZXRTZWFyY2hTdHJpbmcoZS50YXJnZXQudmFsdWUpO1xuXHRcdGxldCBnZXRGaWx0ZXJlZERhdGEgPSBGaWx0ZXJlZFNlYXJjaChlLnRhcmdldC52YWx1ZSwgc2VhcmNoX2xpc3QpO1xuXHRcdGdldEZpbHRlckxpc3QoZ2V0RmlsdGVyZWREYXRhKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldFNlYXJjaExpc3QoKXtcblx0XHRzZXRTZWFyY2hTdHJpbmcoJycpO1xuXHRcdHByb3BzLmdldEFsbENpdGllcygocmVzcCk9Pntcblx0XHRcdGdldEZpbHRlckxpc3QocmVzcCk7XG5cdFx0XHRzZXRTZWFyY2hMaXN0KHJlc3ApO1xuXHRcdH0pXG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVCbHVyKGUpIHtcblxuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlQ3Jvc3NDbGljaygpIHtcblx0XHRnZXRGaWx0ZXJMaXN0KHNlYXJjaF9saXN0KVxuXHRcdHNldFNlYXJjaFN0cmluZyhbXSlcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZUNhcmRDbGlja2VkKGRhdGEpe1xuXHRcdHNldFNlYXJjaFN0cmluZyhkYXRhLm5hbWUpO1xuXHRcdHByb3BzLnNhdmVVc2VyQ2l0eShkYXRhLm5hbWUpO1xuXHRcdHNldFNlYXJjaExpc3QoW10pO1xuXHRcdGdldEZpbHRlckxpc3QoW10pO1xuXHR9XG5cblx0cmV0dXJuKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwicHJ0bEJvZHlcIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic3JjaC1iYXJcIj5cblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwic3JjaC10ZXh0LWJhclwiIHBsYWNlaG9sZGVyID1cIlNlYXJjaCBZb3VyIENpdHlcIiBvbkNoYW5nZT17KGUpPT5oYW5kbGVJbnB1dChlKX0gb25Gb2N1cz17KCk9PmdldFNlYXJjaExpc3QoKX0gdmFsdWU9e3NlYXJjaFN0cmluZ30gb25CbHVyPXsoZSk9PmhhbmRsZUJsdXIoZSl9Lz5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdHNlYXJjaFN0cmluZyAmJiBzZWFyY2hTdHJpbmcubGVuZ3RoPjAgJiYgPGltZyBjbGFzc05hbWU9XCJjcm9zcy1pY25cIiBzcmM9e0FTU0VUU19CQVNFX1VSTCtcIi9yZWQtY3V0LnBuZ1wifSBvbkNsaWNrPXsoKT0+aGFuZGxlQ3Jvc3NDbGljaygpfS8+XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdHtcblx0XHRcdFx0ZmlsdGVyZWRfbGlzdCAmJiBmaWx0ZXJlZF9saXN0Lmxlbmd0aD4wICYmIDxkaXYgY2xhc3NOYW1lPVwic3JjaC1saXN0XCI+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmaWx0ZXJlZF9saXN0Lm1hcCgoZGF0YSwga2V5KT0+e1xuXHRcdFx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic3JjaC1jYXJkXCIga2V5PXtrZXl9IG9uQ2xpY2s9eygpPT5oYW5kbGVDYXJkQ2xpY2tlZChkYXRhKX0+e2RhdGEubmFtZX08L2Rpdj5cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0fVxuXHRcdDwvZGl2PlxuXHRcdClcbn0iLCJleHBvcnQgZGVmYXVsdCAoc2VhcmNoVGV4dCwgc2VhcmNoTGlzdCk9Pntcblx0bGV0IGxpc3RfZGF0YSA9IFtdXG5cdGZvcihsZXQgaSA9MDtpPHNlYXJjaExpc3QubGVuZ3RoO2krKyl7XG5cblx0XHRsZXQgaW5kZXggPSBzZWFyY2hMaXN0W2ldLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSk7XG5cdFx0aWYoaW5kZXg+LTEpIHtcblx0XHRcdGxpc3RfZGF0YS5wdXNoKHsuLi5zZWFyY2hMaXN0W2ldLCByYW5rOiBpbmRleH0pXG5cdFx0fVxuXHR9XG5cdGxpc3RfZGF0YSA9IGxpc3RfZGF0YS5zb3J0KChhLGIpPT57XG5cdFx0cmV0dXJuIGEucmFuay1iLnJhbmtcblx0fSlcblxuXHRyZXR1cm4oXG5cdFx0bGlzdF9kYXRhXG5cdFx0KVxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCAgQWN0aW9ucyBmcm9tICcuLi9hY3Rpb24vaW5kZXguanMnXG5pbXBvcnQgSGVsbWV0VGFncyBmcm9tICcuLi9oZWxwZXJzL0hlbG1ldFRhZ3MuanMnXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvSGVhZGVyLmpzJ1xuaW1wb3J0IFBvcnRhbFZpZXcgZnJvbSAnLi4vY29tcG9uZW50cy9Qb3J0YWxWaWV3LmpzJ1xuY2xhc3MgUG9ydGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG5cdHJlbmRlcigpe1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJcIj5cblx0XHRcdFx0PEhlYWRlciB7Li4udGhpcy5wcm9wc30vPlxuXHRcdFx0XHQ8SGVsbWV0VGFncyB0aXRsZSA9XCJOZWFyYnkgR3ltLVRoZSBvbmUgcGxhY2UgV2hlcmUgeW91IGNhbiB0YWtlIGNhcmUgb2YgeW91ciBoZWxhdGh5IGxpZmVzdHlsZSwgV2hlcmUgeW91IGNhbiBlbmpveSB2YXJpb3VzIGdhbWVzLlwiIGRlc2NyaXB0aW9uPVwiVHJhdmVsIGJ1ZGR5IGlzIGEgcGxhdGZvcm0gdG8gaGVscCB0cmF2ZWxsZXJzIHRvIGJlZnJpZW5kIHRoZSBQZW9wbGUgd2hvIGFyZSBsb29raW5nIGZvciB0cmF2ZWxsaW5nIHRvIHRoZSBzYW1lIGNpdHlcIi8+XG5cdFx0XHRcdDxQb3J0YWxWaWV3IHsuLi50aGlzLnByb3BzfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0fVxufVxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKT0+e1xuXHRyZXR1cm4ge1xuXHRcdFVTRVI6c3RhdGUuVVNFUlxuXHR9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuXHRyZXR1cm4ge1xuXHRcdGdldEFsbENpdGllczooY2IpPT5kaXNwYXRjaChBY3Rpb25zLmdldEFsbENpdGllcyhjYikpLFxuXHRcdHNhdmVVc2VyQ2l0eTogKGRhdGEpID0+IGRpc3BhdGNoKEFjdGlvbnMuc2F2ZVVzZXJDaXR5KGRhdGEpKVxuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQb3J0YWwpIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgSGVsbWV0IH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5jbGFzcyBIZWxtZXRUYWdzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRyZW5kZXIoKXtcblxuXHRcdGxldCB7IHRpdGxlICwgZGVzY3JpcHRpb24gfSA9IHRoaXMucHJvcHNcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8SGVsbWV0PlxuXHRcdFx0XHRcdDx0aXRsZT57dGl0bGV9PC90aXRsZT5cblx0XHRcdFx0XHQ8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudCA9IHtkZXNjcmlwdGlvbn0vPlxuXHRcdFx0XHQ8L0hlbG1ldD5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlbG1ldFRhZ3MiXSwic291cmNlUm9vdCI6IiJ9