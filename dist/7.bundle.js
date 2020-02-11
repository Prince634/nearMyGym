(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./src/js/container/ProfileView.js":
/*!*****************************************!*\
  !*** ./src/js/container/ProfileView.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Header.js */ "./src/js/components/Header.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! faker */ "./node_modules/faker/index.js");
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(faker__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var ProductsList =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ProductsList, _React$PureComponent);

  function ProductsList() {
    _classCallCheck(this, ProductsList);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProductsList).apply(this, arguments));
  }

  _createClass(ProductsList, [{
    key: "render",
    value: function render() {
      var _this = this;

      console.log('product list renders');
      var products = this.props.products.map(function (product, index) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Product, {
          key: index,
          product: product,
          onProductChanged: _this.props.onProductChanged
        });
      });
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, products);
    }
  }]);

  return ProductsList;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent);

;

var PureChild =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(PureChild, _React$PureComponent2);

  function PureChild() {
    _classCallCheck(this, PureChild);

    return _possibleConstructorReturn(this, _getPrototypeOf(PureChild).apply(this, arguments));
  }

  _createClass(PureChild, [{
    key: "render",
    value: function render() {
      console.log('rendering PureChild');
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, this.props.value);
    }
  }]);

  return PureChild;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent);

var Product =
/*#__PURE__*/
function (_React$PureComponent3) {
  _inherits(Product, _React$PureComponent3);

  function Product() {
    _classCallCheck(this, Product);

    return _possibleConstructorReturn(this, _getPrototypeOf(Product).apply(this, arguments));
  }

  _createClass(Product, [{
    key: "render",
    // UNCOMMENT THE METHOD BELOW TO SEE THE PERFORMANCE IMPROVEMENT
    // shouldComponentUpdate(nextProps) {
    //    console.log('nextProps is', nextProps.product===this.props.product);
    //    return nextProps.product != this.props.product;
    //  }
    value: function render() {
      var _this2 = this;

      var product = this.props.product; // Log to demonstrate how render is run and to make render slower
      // so the visual lag is visible

      console.log("Product::render");
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, this.props.data, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
        style: {
          'maxWidth': '80%'
        },
        src: product.url
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, product.title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "checkbox",
        checked: product.isFavourite,
        onChange: function onChange() {
          return _this2.props.onProductChanged(_objectSpread({}, product, {
            isFavourite: !product.isFavourite
          }));
        }
      }));
    }
  }]);

  return Product;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent);

var dataLayer = {
  id: '22',
  title: 'HEy Prince',
  url: 'http://lorempixel.com/640/480',
  isFavourite: false
};

var App =
/*#__PURE__*/
function (_React$PureComponent4) {
  _inherits(App, _React$PureComponent4);

  function App(props) {
    var _this3;

    _classCallCheck(this, App);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));

    _defineProperty(_assertThisInitialized(_this3), "handleProductChanged", function (changedProduct) {
      var newProducts = _this3.state.products.map(function (product) {
        if (product.id == changedProduct.id) {
          return changedProduct;
        }

        return product;
      });

      _this3.setState({
        products: newProducts
      });
    });

    _this3.state = {
      products: _this3.generateRandomList(600),
      time: 100,
      id: null,
      abc: 'pppppp',
      url: {
        id: '22',
        title: 'HEy Prince',
        url: 'http://lorempixel.com/640/480',
        isFavourite: false
      }
    };
    return _this3;
  }

  _createClass(App, [{
    key: "generateRandomList",
    value: function generateRandomList(length) {
      var randomList = [];

      for (var i = 0; i < length; i++) {
        randomList.push({
          id: faker__WEBPACK_IMPORTED_MODULE_2___default.a.random.uuid(),
          title: faker__WEBPACK_IMPORTED_MODULE_2___default.a.company.companyName(),
          url: faker__WEBPACK_IMPORTED_MODULE_2___default.a.image.imageUrl(),
          isFavourite: false
        });
      }

      return randomList;
    }
  }, {
    key: "setTime",
    value: function setTime() {
      var _this4 = this;

      var timer = setInterval(function () {
        console.log('aaab');

        _this4.setState({
          time: _this4.state.time + 1,
          id: timer
        });
      }, 100);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.id) {
        clearInterval(this.state.id);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Header_js__WEBPACK_IMPORTED_MODULE_0__["default"], this.props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Profile Page"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
        className: "colr",
        onClick: function onClick() {
          return _this5.props.history.push('/');
        }
      }, "Go To Home Page"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
        className: "colr",
        onClick: function onClick() {
          return _this5.setTime();
        }
      }, "START TIMER ", this.state.time), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ProductsList, {
        products: this.state.products,
        onProductChanged: this.handleProductChanged
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PureChild, {
        value: "Prince"
      }));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVyL1Byb2ZpbGVWaWV3LmpzIl0sIm5hbWVzIjpbIlByb2R1Y3RzTGlzdCIsImNvbnNvbGUiLCJsb2ciLCJwcm9kdWN0cyIsInByb3BzIiwibWFwIiwicHJvZHVjdCIsImluZGV4Iiwib25Qcm9kdWN0Q2hhbmdlZCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIlB1cmVDaGlsZCIsInZhbHVlIiwiUHJvZHVjdCIsImRhdGEiLCJ1cmwiLCJ0aXRsZSIsImlzRmF2b3VyaXRlIiwiZGF0YUxheWVyIiwiaWQiLCJBcHAiLCJjaGFuZ2VkUHJvZHVjdCIsIm5ld1Byb2R1Y3RzIiwic3RhdGUiLCJzZXRTdGF0ZSIsImdlbmVyYXRlUmFuZG9tTGlzdCIsInRpbWUiLCJhYmMiLCJsZW5ndGgiLCJyYW5kb21MaXN0IiwiaSIsInB1c2giLCJmYWtlciIsInJhbmRvbSIsInV1aWQiLCJjb21wYW55IiwiY29tcGFueU5hbWUiLCJpbWFnZSIsImltYWdlVXJsIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJoaXN0b3J5Iiwic2V0VGltZSIsImhhbmRsZVByb2R1Y3RDaGFuZ2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBOztJQUVNQSxZOzs7Ozs7Ozs7Ozs7OzZCQUVJO0FBQUE7O0FBQ1BDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0EsVUFBTUMsUUFBUSxHQUFHLEtBQUtDLEtBQUwsQ0FBV0QsUUFBWCxDQUFvQkUsR0FBcEIsQ0FBd0IsVUFBQ0MsT0FBRCxFQUFVQyxLQUFWLEVBQW9CO0FBQzNELGVBQU8sMkRBQUMsT0FBRDtBQUFTLGFBQUcsRUFBRUEsS0FBZDtBQUFxQixpQkFBTyxFQUFFRCxPQUE5QjtBQUF1QywwQkFBZ0IsRUFBRSxLQUFJLENBQUNGLEtBQUwsQ0FBV0k7QUFBcEUsVUFBUDtBQUNELE9B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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvSGVhZGVyLmpzJ1xuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBmYWtlciBmcm9tICdmYWtlcic7XG5cbmNsYXNzIFByb2R1Y3RzTGlzdCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuXG4gIHJlbmRlcigpe1xuICBcdGNvbnNvbGUubG9nKCdwcm9kdWN0IGxpc3QgcmVuZGVycycpO1xuICBcdGNvbnN0IHByb2R1Y3RzID0gdGhpcy5wcm9wcy5wcm9kdWN0cy5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiB7XG5cdCAgICByZXR1cm4gPFByb2R1Y3Qga2V5PXtpbmRleH0gcHJvZHVjdD17cHJvZHVjdH0gb25Qcm9kdWN0Q2hhbmdlZD17dGhpcy5wcm9wcy5vblByb2R1Y3RDaGFuZ2VkfSAvPlxuXHQgIH0pO1xuXG5cdCAgcmV0dXJuIChcblx0ICAgICAgPHVsPlxuXHQgICAgICAgIHtwcm9kdWN0c31cblx0ICAgICAgPC91bD5cblx0ICApO1xuICB9XG4gIFxufTtcblxuXG5jbGFzcyBQdXJlQ2hpbGQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcgUHVyZUNoaWxkJylcbiAgICByZXR1cm4gPGRpdj57dGhpcy5wcm9wcy52YWx1ZX08L2Rpdj5cbiAgfVxufVxuXG5jbGFzcyBQcm9kdWN0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgLy8gVU5DT01NRU5UIFRIRSBNRVRIT0QgQkVMT1cgVE8gU0VFIFRIRSBQRVJGT1JNQU5DRSBJTVBST1ZFTUVOVFxuICAgICAvLyBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgIC8vICAgIGNvbnNvbGUubG9nKCduZXh0UHJvcHMgaXMnLCBuZXh0UHJvcHMucHJvZHVjdD09PXRoaXMucHJvcHMucHJvZHVjdCk7XG4gICAgIC8vICAgIHJldHVybiBuZXh0UHJvcHMucHJvZHVjdCAhPSB0aGlzLnByb3BzLnByb2R1Y3Q7XG4gICAgXHRcbiAgICAgLy8gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3Byb2R1Y3R9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIExvZyB0byBkZW1vbnN0cmF0ZSBob3cgcmVuZGVyIGlzIHJ1biBhbmQgdG8gbWFrZSByZW5kZXIgc2xvd2VyXG4gICAgLy8gc28gdGhlIHZpc3VhbCBsYWcgaXMgdmlzaWJsZVxuICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdDo6cmVuZGVyXCIpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGxpPnt0aGlzLnByb3BzLmRhdGF9XG4gICAgICAgICAgPGltZyBzdHlsZT17eydtYXhXaWR0aCc6ICc4MCUnfX0gc3JjPXtwcm9kdWN0LnVybH0vPlxuICAgICAgICAgIDxoMz57cHJvZHVjdC50aXRsZX08L2gzPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtwcm9kdWN0LmlzRmF2b3VyaXRlfVxuICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gdGhpcy5wcm9wcy5vblByb2R1Y3RDaGFuZ2VkKHsuLi5wcm9kdWN0LCBpc0Zhdm91cml0ZTogIXByb2R1Y3QuaXNGYXZvdXJpdGV9KX0vPlxuICAgICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbmNvbnN0IGRhdGFMYXllciA9IHtpZDonMjInLCB0aXRsZTonSEV5IFByaW5jZScsIHVybDonaHR0cDovL2xvcmVtcGl4ZWwuY29tLzY0MC80ODAnLCBpc0Zhdm91cml0ZTpmYWxzZX1cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHByb2R1Y3RzOiB0aGlzLmdlbmVyYXRlUmFuZG9tTGlzdCg2MDApLFxuICAgICAgdGltZTogMTAwLFxuICAgICAgaWQ6IG51bGwsXG4gICAgICBhYmM6J3BwcHBwcCcsXG4gICAgICB1cmw6e2lkOicyMicsIHRpdGxlOidIRXkgUHJpbmNlJywgdXJsOidodHRwOi8vbG9yZW1waXhlbC5jb20vNjQwLzQ4MCcsIGlzRmF2b3VyaXRlOmZhbHNlfVxuICAgIH1cbiAgfVxuXG5cblxuICBnZW5lcmF0ZVJhbmRvbUxpc3QobGVuZ3RoKSB7XG4gICAgY29uc3QgcmFuZG9tTGlzdCA9IFtdO1xuXG4gICAgZm9yKGxldCBpPTA7IGk8bGVuZ3RoOyBpKyspIHtcbiAgICAgIHJhbmRvbUxpc3QucHVzaCh7XG4gICAgICAgIGlkOiBmYWtlci5yYW5kb20udXVpZCgpLFxuICAgICAgICB0aXRsZTogZmFrZXIuY29tcGFueS5jb21wYW55TmFtZSgpLFxuICAgICAgICB1cmw6IGZha2VyLmltYWdlLmltYWdlVXJsKCksXG4gICAgICAgIGlzRmF2b3VyaXRlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmRvbUxpc3Q7XG4gIH1cblxuICBoYW5kbGVQcm9kdWN0Q2hhbmdlZD0oY2hhbmdlZFByb2R1Y3QpID0+e1xuICAgIGxldCBuZXdQcm9kdWN0cyA9IHRoaXMuc3RhdGUucHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiB7XG4gICAgICBpZihwcm9kdWN0LmlkID09IGNoYW5nZWRQcm9kdWN0LmlkKSB7XG4gICAgICAgIHJldHVybiBjaGFuZ2VkUHJvZHVjdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb2R1Y3Q7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgcHJvZHVjdHM6IG5ld1Byb2R1Y3RzIH0pO1xuICB9XG4gIHNldFRpbWUoKXtcbiAgXHRsZXQgdGltZXIgPSBzZXRJbnRlcnZhbCgoKT0+e1xuICBcdFx0Y29uc29sZS5sb2coJ2FhYWInKTtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe3RpbWU6IHRoaXMuc3RhdGUudGltZSsxLCBpZDogdGltZXJ9KVxuICBcdH0sMTAwKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgXHRpZih0aGlzLnN0YXRlLmlkKXtcbiAgXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pZCk7XG4gIFx0fVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuXHRcdDxIZWFkZXIgey4uLnRoaXMucHJvcHN9Lz5cblx0XHQ8cD5Qcm9maWxlIFBhZ2U8L3A+XG5cdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJjb2xyXCIgb25DbGljaz17KCk9PnRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvJyl9PkdvIFRvIEhvbWUgUGFnZTwvYnV0dG9uPlxuXHRcdDxidXR0b24gY2xhc3NOYW1lPVwiY29sclwiIG9uQ2xpY2s9eygpPT50aGlzLnNldFRpbWUoKX0+U1RBUlQgVElNRVIge3RoaXMuc3RhdGUudGltZX08L2J1dHRvbj5cbiAgICAgICAgPFByb2R1Y3RzTGlzdCBwcm9kdWN0cz17dGhpcy5zdGF0ZS5wcm9kdWN0c30gb25Qcm9kdWN0Q2hhbmdlZD17dGhpcy5oYW5kbGVQcm9kdWN0Q2hhbmdlZH0vPlxuICAgICAgICB7Lyo8UHJvZHVjdCBkYXRhID17dGhpcy5zdGF0ZS5hYmN9IHByb2R1Y3Q9e3tpZDonMjInLCB0aXRsZTonSEV5IFByaW5jZScsIHVybDonaHR0cDovL2xvcmVtcGl4ZWwuY29tLzY0MC80ODAnLCBpc0Zhdm91cml0ZTpmYWxzZX19Lz5cbiAgICAgICAgKi99PFB1cmVDaGlsZCB2YWx1ZT1cIlByaW5jZVwiLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwOyJdLCJzb3VyY2VSb290IjoiIn0=