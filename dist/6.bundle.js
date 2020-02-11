(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./src/js/container/LoginPage.js":
/*!***************************************!*\
  !*** ./src/js/container/LoginPage.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Header.js */ "./src/js/components/Header.js");
/* harmony import */ var _helpers_useManageRooms_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/useManageRooms.js */ "./src/js/helpers/useManageRooms.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      fname = _useState2[0],
      setFname = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState4 = _slicedToArray(_useState3, 2),
      lname = _useState4[0],
      setLname = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState6 = _slicedToArray(_useState5, 2),
      email = _useState6[0],
      setEmail = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      _useState8 = _slicedToArray(_useState7, 2),
      room = _useState8[0],
      setRoomData = _useState8[1];

  var addedUser = Object(_helpers_useManageRooms_js__WEBPACK_IMPORTED_MODULE_2__["default"])(room);

  var addRoom = function addRoom() {
    setRoomData({
      'roomId': lname,
      'roomData': {
        fname: fname,
        lname: lname,
        email: email
      }
    });
  };

  var startChat = function startChat() {
    props.history.push("/chat?name=".concat(fname));
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header_js__WEBPACK_IMPORTED_MODULE_1__["default"], props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "box"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "heading"
  }, "Sign Up"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "hd-txt"
  }, "It's free and only takes a minute"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "blck"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "First Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "lbl",
    type: "text",
    name: "fname",
    onChange: function onChange(event) {
      return setFname(event.target.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "blck"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Last Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "lbl",
    type: "text",
    name: "lname",
    onChange: function onChange(event) {
      return setLname(event.target.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "blck"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "lbl",
    type: "text",
    name: "email",
    onChange: function onChange(event) {
      return setEmail(event.target.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn",
    onClick: addRoom
  }, "ADD ROOM"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn",
    onClick: startChat
  }, "START CHAT"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "log-txt"
  }, "By clicking you agree to the terms & conditions of the company.It agrees to the company ")));
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVyL0xvZ2luUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVycy91c2VNYW5hZ2VSb29tcy5qcyJdLCJuYW1lcyI6WyJwcm9wcyIsInVzZVN0YXRlIiwiZm5hbWUiLCJzZXRGbmFtZSIsImxuYW1lIiwic2V0TG5hbWUiLCJlbWFpbCIsInNldEVtYWlsIiwicm9vbSIsInNldFJvb21EYXRhIiwiYWRkZWRVc2VyIiwidXNlQ2hhdFJvb21zIiwiYWRkUm9vbSIsInN0YXJ0Q2hhdCIsImhpc3RvcnkiLCJwdXNoIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInVzZU1hbmFnZVJvb21zIiwiY29uc29sZSIsImxvZyIsInVzZXJSb29tcyIsInNldFJvb21JZCIsImN1cnJlbnRSb29tIiwic2V0Q3VycmVudFJvb20iLCJtc2ciLCJzYXZlTWVzc2FnZSIsImFsbFJvb21zIiwicm9vbUlkIiwiU09DS0VUIiwiaW5zdGFuY2UiLCJlbWl0Iiwicm9vbURhdGEiLCJyZW1vdmVSb29tIiwidXNlRWZmZWN0IiwiY3VyZW50Um9vbU1zZyIsImZpbHRlciIsIngiLCJ0aW1lIiwiRGF0ZSIsInNlbmRNZXNzYWdlVG9Sb29tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUdlLHlFQUFDQSxLQUFELEVBQVU7QUFBQSxrQkFFQUMsc0RBQVEsQ0FBQyxFQUFELENBRlI7QUFBQTtBQUFBLE1BRWxCQyxLQUZrQjtBQUFBLE1BRVhDLFFBRlc7O0FBQUEsbUJBR0FGLHNEQUFRLENBQUMsRUFBRCxDQUhSO0FBQUE7QUFBQSxNQUdsQkcsS0FIa0I7QUFBQSxNQUdYQyxRQUhXOztBQUFBLG1CQUlBSixzREFBUSxDQUFDLEVBQUQsQ0FKUjtBQUFBO0FBQUEsTUFJbEJLLEtBSmtCO0FBQUEsTUFJWEMsUUFKVzs7QUFBQSxtQkFLRU4sc0RBQVEsQ0FBQyxFQUFELENBTFY7QUFBQTtBQUFBLE1BS2xCTyxJQUxrQjtBQUFBLE1BS1pDLFdBTFk7O0FBT3hCLE1BQU1DLFNBQVMsR0FBR0MsMEVBQVksQ0FBQ0gsSUFBRCxDQUE5Qjs7QUFFQSxNQUFJSSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFJO0FBQ2pCSCxlQUFXLENBQUM7QUFBQyxnQkFBU0wsS0FBVjtBQUFpQixrQkFBWTtBQUFDRixhQUFLLEVBQUxBLEtBQUQ7QUFBUUUsYUFBSyxFQUFMQSxLQUFSO0FBQWVFLGFBQUssRUFBTEE7QUFBZjtBQUE3QixLQUFELENBQVg7QUFDQSxHQUZEOztBQUdBLE1BQUlPLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQUk7QUFDbkJiLFNBQUssQ0FBQ2MsT0FBTixDQUFjQyxJQUFkLHNCQUFpQ2IsS0FBakM7QUFDQSxHQUZEOztBQUlBLFNBRUM7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNDLDJEQUFDLDZEQUFELEVBQVlGLEtBQVosQ0FERCxFQUVDO0FBQUssYUFBUyxFQUFDO0FBQWYsS0FDQztBQUFJLGFBQVMsRUFBQztBQUFkLGVBREQsRUFFQztBQUFHLGFBQVMsRUFBQztBQUFiLHlDQUZELEVBR0M7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNDLG1GQURELEVBRUM7QUFBTyxhQUFTLEVBQUMsS0FBakI7QUFBdUIsUUFBSSxFQUFDLE1BQTVCO0FBQW1DLFFBQUksRUFBQyxPQUF4QztBQUFnRCxZQUFRLEVBQUUsa0JBQUNnQixLQUFEO0FBQUEsYUFBU2IsUUFBUSxDQUFDYSxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsS0FBZCxDQUFqQjtBQUFBO0FBQTFELElBRkQsQ0FIRCxFQU9DO0FBQUssYUFBUyxFQUFDO0FBQWYsS0FDQyxrRkFERCxFQUVDO0FBQU8sYUFBUyxFQUFDLEtBQWpCO0FBQXVCLFFBQUksRUFBQyxNQUE1QjtBQUFtQyxRQUFJLEVBQUMsT0FBeEM7QUFBZ0QsWUFBUSxFQUFFLGtCQUFDRixLQUFEO0FBQUEsYUFBU1gsUUFBUSxDQUFDVyxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsS0FBZCxDQUFqQjtBQUFBO0FBQTFELElBRkQsQ0FQRCxFQVdDO0FBQUssYUFBUyxFQUFDO0FBQWYsS0FDQyw4RUFERCxFQUVDO0FBQU8sYUFBUyxFQUFDLEtBQWpCO0FBQXVCLFFBQUksRUFBQyxNQUE1QjtBQUFtQyxRQUFJLEVBQUMsT0FBeEM7QUFBZ0QsWUFBUSxFQUFFLGtCQUFDRixLQUFEO0FBQUEsYUFBU1QsUUFBUSxDQUFDUyxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsS0FBZCxDQUFqQjtBQUFBO0FBQTFELElBRkQsQ0FYRCxFQWVDO0FBQVEsYUFBUyxFQUFDLEtBQWxCO0FBQXdCLFdBQU8sRUFBRU47QUFBakMsZ0JBZkQsRUFnQkM7QUFBUSxhQUFTLEVBQUMsS0FBbEI7QUFBd0IsV0FBTyxFQUFFQztBQUFqQyxrQkFoQkQsRUFrQkM7QUFBSyxhQUFTLEVBQUM7QUFBZixnR0FsQkQsQ0FGRCxDQUZEO0FBMEJBLENBMUNELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7O0FBR0EsU0FBU00sY0FBVCxDQUF3Qm5CLEtBQXhCLEVBQThCO0FBQzdCb0IsU0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjtBQUEwQkQsU0FBTyxDQUFDQyxHQUFSLENBQVlyQixLQUFaOztBQURHLGtCQUdDQyxzREFBUSxDQUFDLEVBQUQsQ0FIVDtBQUFBO0FBQUEsTUFHdkJxQixTQUh1QjtBQUFBLE1BR1pDLFNBSFk7O0FBQUEsbUJBSVF0QixzREFBUSxDQUFDLEVBQUQsQ0FKaEI7QUFBQTtBQUFBLE1BSXZCdUIsV0FKdUI7QUFBQSxNQUlWQyxjQUpVOztBQUFBLG1CQUtIeEIsc0RBQVEsQ0FBQyxFQUFELENBTEw7QUFBQTtBQUFBLE1BS3ZCeUIsR0FMdUI7QUFBQSxNQUtsQkMsV0FMa0I7O0FBTzdCLFdBQVNmLE9BQVQsR0FBa0I7QUFDakIsUUFBSWdCLFFBQVEscUJBQU9OLFNBQVAsQ0FBWjs7QUFDQSxRQUFHTSxRQUFRLENBQUM1QixLQUFLLENBQUM2QixNQUFQLENBQVgsRUFBMkIsQ0FFMUIsQ0FGRCxNQUVLO0FBQ0pDLHdEQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQWhCLENBQXFCLE1BQXJCLEVBQTZCO0FBQUM5QixhQUFLLEVBQUVGLEtBQUssQ0FBQ0UsS0FBZDtBQUFxQndCLFdBQUcsRUFBRTFCLEtBQUssQ0FBQzBCLEdBQWhDO0FBQXFDRyxjQUFNLEVBQUU3QixLQUFLLENBQUM2QjtBQUFuRCxPQUE3QjtBQUNBOztBQUNERCxZQUFRLENBQUM1QixLQUFLLENBQUM2QixNQUFQLENBQVIsR0FBeUI3QixLQUFLLENBQUNpQyxRQUEvQjtBQUNBVixhQUFTLENBQUNLLFFBQUQsQ0FBVDtBQUNBSCxrQkFBYyxDQUFDekIsS0FBSyxDQUFDNkIsTUFBUCxDQUFkO0FBQ0E7O0FBRUQsV0FBU0ssVUFBVCxHQUFxQjtBQUNwQixRQUFJTixRQUFRLHFCQUFPTixTQUFQLENBQVo7O0FBQ0EsUUFBR00sUUFBUSxDQUFDNUIsS0FBSyxDQUFDNkIsTUFBUCxDQUFYLEVBQTJCO0FBQzFCLGFBQU9ELFFBQVEsQ0FBQzVCLEtBQUssQ0FBQzZCLE1BQVAsQ0FBZjtBQUNBOztBQUNETixhQUFTLENBQUNLLFFBQUQsQ0FBVDtBQUNBSCxrQkFBYyxDQUFDLEVBQUQsQ0FBZDtBQUNBOztBQUVEVSx5REFBUyxDQUFDLFlBQUk7QUFDYixRQUFHbkMsS0FBSyxDQUFDNkIsTUFBVCxFQUFnQjtBQUNmVCxhQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCckIsS0FBSyxDQUFDNkIsTUFBaEM7QUFDQWpCLGFBQU87QUFDUCxLQUhELE1BR00sSUFBR1osS0FBSyxDQUFDa0MsVUFBVCxFQUFxQjtBQUMxQmQsYUFBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNBYSxnQkFBVTtBQUNWO0FBQ0QsR0FSUSxFQVFOLENBQUNsQyxLQUFLLENBQUM2QixNQUFQLEVBQWU3QixLQUFLLENBQUNrQyxVQUFyQixDQVJNLENBQVQ7QUFVQUMseURBQVMsQ0FBQyxZQUFJO0FBQ2IsUUFBR25DLEtBQUssQ0FBQzBCLEdBQU4sSUFBYTFCLEtBQUssQ0FBQzZCLE1BQXRCLEVBQThCO0FBQzdCLFVBQUlPLGFBQWEsR0FBR1YsR0FBRyxDQUFDVyxNQUFKLENBQVcsVUFBQUMsQ0FBQztBQUFBLGVBQUVBLENBQUMsQ0FBQ1QsTUFBRixJQUFZN0IsS0FBSyxDQUFDNkIsTUFBcEI7QUFBQSxPQUFaLENBQXBCO0FBQ0FPLG1CQUFhLENBQUNyQixJQUFkLENBQW1CO0FBQUNjLGNBQU0sRUFBRTdCLEtBQUssQ0FBQzZCLE1BQWY7QUFBdUJILFdBQUcsRUFBRTFCLEtBQUssQ0FBQzBCLEdBQWxDO0FBQXVDYSxZQUFJLEVBQUUsSUFBSUMsSUFBSixFQUE3QztBQUF5RHRDLGFBQUssRUFBRUYsS0FBSyxDQUFDRTtBQUF0RSxPQUFuQixFQUY2QixDQUc3Qjs7QUFDQTRCLHdEQUFNLENBQUNXLGlCQUFQLENBQXlCO0FBQUNaLGNBQU0sRUFBRTdCLEtBQUssQ0FBQzZCLE1BQWY7QUFBdUJILFdBQUcsRUFBRTFCLEtBQUssQ0FBQzBCLEdBQWxDO0FBQXVDYSxZQUFJLEVBQUUsSUFBSUMsSUFBSixFQUE3QztBQUF5RHRDLGFBQUssRUFBRUYsS0FBSyxDQUFDRTtBQUF0RSxPQUF6QjtBQUVBeUIsaUJBQVcsQ0FBQ1MsYUFBRCxDQUFYO0FBQ0E7QUFDRCxHQVRRLEVBU04sQ0FBQ3BDLEtBQUssQ0FBQzBCLEdBQVAsRUFBWTFCLEtBQUssQ0FBQzZCLE1BQWxCLENBVE0sQ0FBVDtBQVdBVCxTQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBRCxTQUFPLENBQUNDLEdBQVIsQ0FBWUMsU0FBWjtBQUNBRixTQUFPLENBQUNDLEdBQVIsQ0FBWUssR0FBWjtBQUNBTixTQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaOztBQUNBLE1BQUdyQixLQUFLLENBQUM2QixNQUFOLElBQWdCUCxTQUFTLENBQUN0QixLQUFLLENBQUM2QixNQUFQLENBQTVCLEVBQTJDO0FBQzFDLFdBQU87QUFBQ0ksY0FBUSxFQUFFWCxTQUFTLENBQUN0QixLQUFLLENBQUM2QixNQUFQLENBQXBCO0FBQW9DTCxpQkFBVyxFQUFFQSxXQUFqRDtBQUE4REUsU0FBRyxFQUFFQSxHQUFuRTtBQUF3RXhCLFdBQUssRUFBRUYsS0FBSyxDQUFDRTtBQUFyRixLQUFQO0FBQ0EsR0FGRCxNQUVNO0FBQ0wsV0FBTyxJQUFQO0FBQ0E7QUFDRDs7QUFFY2lCLDZFQUFmLEUiLCJmaWxlIjoiNi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSAncmVhY3QnXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvSGVhZGVyLmpzJ1xuaW1wb3J0IHVzZUNoYXRSb29tcyBmcm9tICcuLi9oZWxwZXJzL3VzZU1hbmFnZVJvb21zLmpzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IChwcm9wcykgPT57XG5cblx0Y29uc3RbZm5hbWUsIHNldEZuYW1lXT0gdXNlU3RhdGUoJycpXG5cdGNvbnN0W2xuYW1lLCBzZXRMbmFtZV09IHVzZVN0YXRlKCcnKVxuXHRjb25zdFtlbWFpbCwgc2V0RW1haWxdPSB1c2VTdGF0ZSgnJylcblx0Y29uc3Rbcm9vbSwgc2V0Um9vbURhdGFdPSB1c2VTdGF0ZSh7fSlcblxuXHRjb25zdCBhZGRlZFVzZXIgPSB1c2VDaGF0Um9vbXMocm9vbSlcblxuXHR2YXIgYWRkUm9vbSA9ICgpPT57XG5cdFx0c2V0Um9vbURhdGEoeydyb29tSWQnOmxuYW1lLCAncm9vbURhdGEnOiB7Zm5hbWUsIGxuYW1lLCBlbWFpbH0gfSlcblx0fVxuXHR2YXIgc3RhcnRDaGF0ID0gKCk9Pntcblx0XHRwcm9wcy5oaXN0b3J5LnB1c2goYC9jaGF0P25hbWU9JHtmbmFtZX1gKTtcblx0fVx0XG5cblx0cmV0dXJuKFxuXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cblx0XHRcdDxIZWFkZXIgey4uLnByb3BzfS8+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJveFwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwiaGVhZGluZ1wiPlNpZ24gVXA8L2gxPlxuXHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJoZC10eHRcIj5JdCdzIGZyZWUgYW5kIG9ubHkgdGFrZXMgYSBtaW51dGU8L3A+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYmxja1wiPlxuXHRcdFx0XHRcdDxwPkZpcnN0IE5hbWU8L3A+XG5cdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImxibFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImZuYW1lXCIgb25DaGFuZ2U9eyhldmVudCk9PnNldEZuYW1lKGV2ZW50LnRhcmdldC52YWx1ZSl9Lz5cdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJibGNrXCI+XG5cdFx0XHRcdFx0PHA+TGFzdCBOYW1lPC9wPlxuXHRcdFx0XHRcdDxpbnB1dCBjbGFzc05hbWU9XCJsYmxcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJsbmFtZVwiIG9uQ2hhbmdlPXsoZXZlbnQpPT5zZXRMbmFtZShldmVudC50YXJnZXQudmFsdWUpfS8+XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYmxja1wiPlxuXHRcdFx0XHRcdDxwPkVtYWlsPC9wPlxuXHRcdFx0XHRcdDxpbnB1dCBjbGFzc05hbWU9XCJsYmxcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIG9uQ2hhbmdlPXsoZXZlbnQpPT5zZXRFbWFpbChldmVudC50YXJnZXQudmFsdWUpfS8+XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwiYnRuXCIgb25DbGljaz17YWRkUm9vbX0+QUREIFJPT008L2J1dHRvbj5cblx0XHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJidG5cIiBvbkNsaWNrPXtzdGFydENoYXR9PlNUQVJUIENIQVQ8L2J1dHRvbj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImxvZy10eHRcIj5CeSBjbGlja2luZyB5b3UgYWdyZWUgdG8gdGhlIHRlcm1zICYgY29uZGl0aW9ucyBvZiB0aGUgY29tcGFueS5JdCBhZ3JlZXMgdG8gdGhlIGNvbXBhbnkgPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQpXG59IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU09DS0VUIGZyb20gJy4uLy4uLy4uL3NvY2tldC5qcyc7XG5cblxuZnVuY3Rpb24gdXNlTWFuYWdlUm9vbXMocHJvcHMpe1xuXHRjb25zb2xlLmxvZygnQ0hBVHR0dHR0dCcpO2NvbnNvbGUubG9nKHByb3BzKTtcblxuXHRjb25zdFt1c2VyUm9vbXMsIHNldFJvb21JZF0gPSB1c2VTdGF0ZSh7fSk7XG5cdGNvbnN0W2N1cnJlbnRSb29tLCBzZXRDdXJyZW50Um9vbV0gPSB1c2VTdGF0ZSgnJylcblx0Y29uc3RbbXNnLCBzYXZlTWVzc2FnZV0gPSB1c2VTdGF0ZShbXSlcblxuXHRmdW5jdGlvbiBhZGRSb29tKCl7XG5cdFx0bGV0IGFsbFJvb21zID0gey4uLnVzZXJSb29tc307XG5cdFx0aWYoYWxsUm9vbXNbcHJvcHMucm9vbUlkXSkge1xuXG5cdFx0fWVsc2V7XG5cdFx0XHRTT0NLRVQuaW5zdGFuY2UuZW1pdCgnam9pbicsIHtmbmFtZTogcHJvcHMuZm5hbWUsIG1zZzogcHJvcHMubXNnLCByb29tSWQ6IHByb3BzLnJvb21JZH0pXG5cdFx0fVxuXHRcdGFsbFJvb21zW3Byb3BzLnJvb21JZF0gPSBwcm9wcy5yb29tRGF0YVxuXHRcdHNldFJvb21JZChhbGxSb29tcylcblx0XHRzZXRDdXJyZW50Um9vbShwcm9wcy5yb29tSWQpXG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVSb29tKCl7XG5cdFx0bGV0IGFsbFJvb21zID0gey4uLnVzZXJSb29tc307XG5cdFx0aWYoYWxsUm9vbXNbcHJvcHMucm9vbUlkXSkge1xuXHRcdFx0ZGVsZXRlIGFsbFJvb21zW3Byb3BzLnJvb21JZF07XG5cdFx0fVxuXHRcdHNldFJvb21JZChhbGxSb29tcylcblx0XHRzZXRDdXJyZW50Um9vbSgnJylcblx0fVxuXG5cdHVzZUVmZmVjdCgoKT0+e1xuXHRcdGlmKHByb3BzLnJvb21JZCl7XG5cdFx0XHRjb25zb2xlLmxvZygnUm9vbSBhZGRlZCcsIHByb3BzLnJvb21JZClcblx0XHRcdGFkZFJvb20oKTtcblx0XHR9ZWxzZSBpZihwcm9wcy5yZW1vdmVSb29tKSB7XG5cdFx0XHRjb25zb2xlLmxvZygncm9vbSByZW1vdmVkJyk7XG5cdFx0XHRyZW1vdmVSb29tKCk7XG5cdFx0fVxuXHR9LCBbcHJvcHMucm9vbUlkLCBwcm9wcy5yZW1vdmVSb29tIF0pXHRcblxuXHR1c2VFZmZlY3QoKCk9Pntcblx0XHRpZihwcm9wcy5tc2cgJiYgcHJvcHMucm9vbUlkKSB7XG5cdFx0XHRsZXQgY3VyZW50Um9vbU1zZyA9IG1zZy5maWx0ZXIoeD0+eC5yb29tSWQgPT0gcHJvcHMucm9vbUlkKVxuXHRcdFx0Y3VyZW50Um9vbU1zZy5wdXNoKHtyb29tSWQ6IHByb3BzLnJvb21JZCwgbXNnOiBwcm9wcy5tc2csIHRpbWU6IG5ldyBEYXRlKCksIGZuYW1lOiBwcm9wcy5mbmFtZX0pXG5cdFx0XHQvL1NlbmQgTWVzc2FnIFRvIFNvY2tldFxuXHRcdFx0U09DS0VULnNlbmRNZXNzYWdlVG9Sb29tKHtyb29tSWQ6IHByb3BzLnJvb21JZCwgbXNnOiBwcm9wcy5tc2csIHRpbWU6IG5ldyBEYXRlKCksIGZuYW1lOiBwcm9wcy5mbmFtZSB9KTtcblx0XHRcdFxuXHRcdFx0c2F2ZU1lc3NhZ2UoY3VyZW50Um9vbU1zZylcblx0XHR9XG5cdH0sIFtwcm9wcy5tc2csIHByb3BzLnJvb21JZF0pXG5cblx0Y29uc29sZS5sb2coXCJTVEFSVCBVU0UgU1RBVEVcIik7XG5cdGNvbnNvbGUubG9nKHVzZXJSb29tcyk7XG5cdGNvbnNvbGUubG9nKG1zZyk7XG5cdGNvbnNvbGUubG9nKFwiRU5EIFVTRSBTVEFURVwiKTtcblx0aWYocHJvcHMucm9vbUlkICYmIHVzZXJSb29tc1twcm9wcy5yb29tSWRdKXtcblx0XHRyZXR1cm4ge3Jvb21EYXRhOiB1c2VyUm9vbXNbcHJvcHMucm9vbUlkXSwgY3VycmVudFJvb206IGN1cnJlbnRSb29tLCBtc2c6IG1zZywgZm5hbWU6IHByb3BzLmZuYW1lfVxuXHR9ZWxzZSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlTWFuYWdlUm9vbXM7Il0sInNvdXJjZVJvb3QiOiIifQ==