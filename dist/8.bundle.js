(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./src/js/container/Project.js":
/*!*************************************!*\
  !*** ./src/js/container/Project.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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

 // state data for 3 counters

var data = [{
  id: 1,
  value: 0
}, {
  id: 2,
  value: 0
}, {
  id: 3,
  value: 0
}, {
  id: 4,
  value: 0
}, {
  id: 5,
  value: 0
}]; // Counter Component

var Counter =
/*#__PURE__*/
function (_Component) {
  _inherits(Counter, _Component);

  function Counter() {
    _classCallCheck(this, Counter);

    return _possibleConstructorReturn(this, _getPrototypeOf(Counter).apply(this, arguments));
  }

  _createClass(Counter, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          id = _this$props.id,
          value = _this$props.value;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "counter"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, value), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "counter-controls"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button is-danger is-small",
        onClick: function onClick() {
          return _this.props.onDecrement(id, 1);
        }
      }, "-"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          return _this.props.onIncrement(id, 1);
        },
        className: "button is-success is-small"
      }, "+")));
    }
  }]);

  return Counter;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]); //New Counter Component


var NewCounter =
/*#__PURE__*/
function (_Component2) {
  _inherits(NewCounter, _Component2);

  function NewCounter() {
    _classCallCheck(this, NewCounter);

    return _possibleConstructorReturn(this, _getPrototypeOf(NewCounter).apply(this, arguments));
  }

  _createClass(NewCounter, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          id = _this$props2.id,
          value = _this$props2.value;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "counter"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, value), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "counter-controls"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button is-danger is-small",
        onChange: function onChange() {
          return _this2.props.changeVal(-1);
        }
      }, "-"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          return _this2.props.changeVal(1);
        },
        className: "button is-success is-small"
      }, "+")));
    }
  }]);

  return NewCounter;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var Total =
/*#__PURE__*/
function (_Component3) {
  _inherits(Total, _Component3);

  function Total() {
    _classCallCheck(this, Total);

    return _possibleConstructorReturn(this, _getPrototypeOf(Total).apply(this, arguments));
  }

  _createClass(Total, [{
    key: "render",
    value: function render() {
      var total_count = 0;
      {
        this.props.total_counter.map(function (counter) {
          return total_count += counter.value;
        });
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Total Count = ".concat(total_count));
    }
  }]);

  return Total;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var App =
/*#__PURE__*/
function (_Component4) {
  _inherits(App, _Component4);

  function App(props, context) {
    var _this3;

    _classCallCheck(this, App);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this3), "onIncrement", function (id, val) {
      var newCounterData = _this3.state.localState.map(function (x) {
        if (x.id == id) {
          return {
            id: id,
            value: x.value + val
          };
        } else {
          return x;
        }
      });

      _this3.setState({
        localState: newCounterData
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "onDecrement", function (id, val) {
      var newCounterData = _this3.state.localState.map(function (x) {
        if (x.id == id) {
          return {
            id: id,
            value: x.value > 0 ? x.value - val : x.value
          };
        } else {
          return x;
        }
      });

      _this3.setState({
        localState: newCounterData
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "changeVal", function (val) {
      var newCounterData = _this3.state.localState.map(function (x) {
        if (x.id == 5) {
          return {
            id: 5,
            value: x.value >= 0 ? x.value + val : x.value
          };
        } else {
          return x;
        }
      });

      _this3.setState({
        localState: newCounterData
      });
    });

    _this3.state = {
      localState: data
    };
    return _this3;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.state.localState.map(function (counter) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, counter.id == 5 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NewCounter, {
          key: counter.id,
          id: counter.id,
          value: counter.value,
          changeVal: _this4.changeVal
        }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Counter, {
          key: counter.id,
          id: counter.id,
          value: counter.value,
          onIncrement: _this4.onIncrement,
          onDecrement: _this4.onDecrement
        }));
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Total, {
        total_counter: this.state.localState
      }));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVyL1Byb2plY3QuanMiXSwibmFtZXMiOlsiZGF0YSIsImlkIiwidmFsdWUiLCJDb3VudGVyIiwicHJvcHMiLCJvbkRlY3JlbWVudCIsIm9uSW5jcmVtZW50IiwiQ29tcG9uZW50IiwiTmV3Q291bnRlciIsImNoYW5nZVZhbCIsIlRvdGFsIiwidG90YWxfY291bnQiLCJ0b3RhbF9jb3VudGVyIiwibWFwIiwiY291bnRlciIsIkFwcCIsImNvbnRleHQiLCJ2YWwiLCJuZXdDb3VudGVyRGF0YSIsInN0YXRlIiwibG9jYWxTdGF0ZSIsIngiLCJzZXRTdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBRUE7O0FBQ0EsSUFBTUEsSUFBSSxHQUFHLENBQ1g7QUFBRUMsSUFBRSxFQUFFLENBQU47QUFBU0MsT0FBSyxFQUFFO0FBQWhCLENBRFcsRUFFWDtBQUFFRCxJQUFFLEVBQUUsQ0FBTjtBQUFTQyxPQUFLLEVBQUU7QUFBaEIsQ0FGVyxFQUdYO0FBQUVELElBQUUsRUFBRSxDQUFOO0FBQVNDLE9BQUssRUFBRTtBQUFoQixDQUhXLEVBSVg7QUFBRUQsSUFBRSxFQUFFLENBQU47QUFBU0MsT0FBSyxFQUFFO0FBQWhCLENBSlcsRUFLWDtBQUFFRCxJQUFFLEVBQUUsQ0FBTjtBQUFTQyxPQUFLLEVBQUU7QUFBaEIsQ0FMVyxDQUFiLEMsQ0FRQTs7SUFDTUMsTzs7Ozs7Ozs7Ozs7Ozs2QkFDSztBQUFBOztBQUFBLHdCQUNlLEtBQUtDLEtBRHBCO0FBQUEsVUFDQ0gsRUFERCxlQUNDQSxFQUREO0FBQUEsVUFDS0MsS0FETCxlQUNLQSxLQURMO0FBRVAsYUFDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNFLHNFQUFJQSxLQUFKLENBREYsRUFFRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNFO0FBQVEsaUJBQVMsRUFBQywyQkFBbEI7QUFBOEMsZUFBTyxFQUFFO0FBQUEsaUJB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RUFBSSxNQUFJLENBQUNJLFdBSm5CO0FBS0QscUJBQVcsRUFBRSxNQUFJLENBQUNEO0FBTGpCLFVBUlAsQ0FEZ0M7QUFBQSxPQUFqQyxDQURILEVBdUJFLDJEQUFDLEtBQUQ7QUFBTyxxQkFBYSxFQUFFLEtBQUtjLEtBQUwsQ0FBV0M7QUFBakMsUUF2QkYsQ0FERjtBQTJCRDs7OztFQXZFZWIsK0M7O0FBMEVIUSxrRUFBZixFIiwiZmlsZSI6IjguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuLy8gc3RhdGUgZGF0YSBmb3IgMyBjb3VudGVyc1xuY29uc3QgZGF0YSA9IFtcbiAgeyBpZDogMSwgdmFsdWU6IDAgfSxcbiAgeyBpZDogMiwgdmFsdWU6IDAgfSxcbiAgeyBpZDogMywgdmFsdWU6IDAgfSxcbiAgeyBpZDogNCwgdmFsdWU6IDAgfSxcbiAgeyBpZDogNSwgdmFsdWU6IDAgfVxuXTtcblxuLy8gQ291bnRlciBDb21wb25lbnRcbmNsYXNzIENvdW50ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpZCwgdmFsdWUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY291bnRlclwiPlxuICAgICAgICA8Yj57dmFsdWV9PC9iPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvdW50ZXItY29udHJvbHNcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbiBpcy1kYW5nZXIgaXMtc21hbGxcIiBvbkNsaWNrPXsoKT0+dGhpcy5wcm9wcy5vbkRlY3JlbWVudChpZCwgMSl9Pi08L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT50aGlzLnByb3BzLm9uSW5jcmVtZW50KGlkLCAxKX0gY2xhc3NOYW1lPVwiYnV0dG9uIGlzLXN1Y2Nlc3MgaXMtc21hbGxcIj4rPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG4vL05ldyBDb3VudGVyIENvbXBvbmVudFxuY2xhc3MgTmV3Q291bnRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlkLCB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb3VudGVyXCI+XG4gICAgICAgIDxiPnt2YWx1ZX08L2I+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY291bnRlci1jb250cm9sc1wiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uIGlzLWRhbmdlciBpcy1zbWFsbFwiIG9uQ2hhbmdlPXsoKT0+dGhpcy5wcm9wcy5jaGFuZ2VWYWwoLTEpfT4tPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKT0+dGhpcy5wcm9wcy5jaGFuZ2VWYWwoMSl9IGNsYXNzTmFtZT1cImJ1dHRvbiBpcy1zdWNjZXNzIGlzLXNtYWxsXCI+KzwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgVG90YWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKXtcbiAgIGxldCB0b3RhbF9jb3VudCA9ICAwXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnByb3BzLnRvdGFsX2NvdW50ZXIubWFwKGNvdW50ZXIgPT4gKFxuICAgICAgICAgICAgdG90YWxfY291bnQgKz0gY291bnRlci52YWx1ZVxuICAgICAgICApKVxuICAgICAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAge2BUb3RhbCBDb3VudCA9ICR7dG90YWxfY291bnR9YH1cbiAgICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBsb2NhbFN0YXRlOiBkYXRhXG4gICAgfVxuICB9XG4gXG5vbkluY3JlbWVudCA9IChpZCwgdmFsKT0+e1xuICBsZXQgbmV3Q291bnRlckRhdGEgPSB0aGlzLnN0YXRlLmxvY2FsU3RhdGUubWFwKCh4KT0+e1xuICAgIGlmKHguaWQgPT0gaWQpe1xuICAgICAgcmV0dXJuIHtpZDogaWQsIHZhbHVlOiB4LnZhbHVlK3ZhbH1cbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSlcblxuICB0aGlzLnNldFN0YXRlKHtsb2NhbFN0YXRlOm5ld0NvdW50ZXJEYXRhfSk7XG59XG5cbm9uRGVjcmVtZW50ID0gKGlkLCB2YWwpID0+e1xuICBsZXQgbmV3Q291bnRlckRhdGEgPSB0aGlzLnN0YXRlLmxvY2FsU3RhdGUubWFwKCh4KT0+e1xuICAgIGlmKHguaWQgPT0gaWQpe1xuICAgICAgcmV0dXJuIHtpZDogaWQsIHZhbHVlOiB4LnZhbHVlPjA/eC52YWx1ZS12YWw6eC52YWx1ZX1cbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSlcbiAgdGhpcy5zZXRTdGF0ZSh7bG9jYWxTdGF0ZTpuZXdDb3VudGVyRGF0YX0pO1xufVxuXG5cbmNoYW5nZVZhbCA9ICh2YWwpPT4ge1xuICBsZXQgbmV3Q291bnRlckRhdGEgPSB0aGlzLnN0YXRlLmxvY2FsU3RhdGUubWFwKCh4KT0+e1xuICAgIGlmKHguaWQgPT0gNSl7XG4gICAgICByZXR1cm4ge2lkOiA1LCB2YWx1ZTogeC52YWx1ZT49MD94LnZhbHVlK3ZhbDp4LnZhbHVlfVxuICAgIH1lbHNle1xuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KVxuICB0aGlzLnNldFN0YXRlKHtsb2NhbFN0YXRlOm5ld0NvdW50ZXJEYXRhfSk7XG59XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5zdGF0ZS5sb2NhbFN0YXRlLm1hcChjb3VudGVyID0+IChcbiAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvdW50ZXIuaWQ9PTU/XG4gICAgICAgICAgICAgIDxOZXdDb3VudGVyXG4gICAgICAgICAgICAgIGtleT17Y291bnRlci5pZH1cbiAgICAgICAgICAgICAgaWQ9e2NvdW50ZXIuaWR9XG4gICAgICAgICAgICAgIHZhbHVlPXtjb3VudGVyLnZhbHVlfVxuICAgICAgICAgICAgICBjaGFuZ2VWYWw9e3RoaXMuY2hhbmdlVmFsfVxuICAgICAgICAgICAgICAvPjo8Q291bnRlclxuICAgICAgICAgICAgICAgIGtleT17Y291bnRlci5pZH1cbiAgICAgICAgICAgICAgICBpZD17Y291bnRlci5pZH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17Y291bnRlci52YWx1ZX1cbiAgICAgICAgICAgICAgICBvbkluY3JlbWVudCA9IHt0aGlzLm9uSW5jcmVtZW50fVxuICAgICAgICAgICAgICAgIG9uRGVjcmVtZW50PXt0aGlzLm9uRGVjcmVtZW50fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgIFxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgIFxuICAgICAgICApKX1cbiAgICAgICAgPFRvdGFsIHRvdGFsX2NvdW50ZXI9e3RoaXMuc3RhdGUubG9jYWxTdGF0ZX0vPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7Il0sInNvdXJjZVJvb3QiOiIifQ==