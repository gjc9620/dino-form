"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "spring", {
  enumerable: true,
  get: function get() {
    return _reactMotion.spring;
  }
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactMotion = require("react-motion");

var _rafSchd = _interopRequireDefault(require("raf-schd"));

var _util = require("./util");

// todo auto scroll
function findAllParentNode(node) {
  var els = [window];
  var currNode = node;

  while (currNode) {
    els.unshift(currNode);
    currNode = currNode.parentNode;
  }

  return els;
}

function reinsert(arr, from, to) {
  var _arr = arr.slice(0);

  var val = _arr[from];

  _arr.splice(from, 1);

  _arr.splice(to, 0, val);

  return _arr;
}

var animDuration = 300;
var springConfig = {
  stiffness: 200,
  damping: 20
};
var pressTimer;

var Drag =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Drag, _Component);

  function Drag(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Drag);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Drag).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onScroll", function () {
      clearTimeout(pressTimer);

      if (_this.state.isPressed) {
        _this.setState({
          isPressed: false
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "addListener", function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$move = _ref.move,
          move = _ref$move === void 0 ? true : _ref$move;

      move && window.addEventListener('touchmove', _this.handleTouchMove, {
        passive: false
      });
      window.addEventListener('touchend', _this.handleMouseUp);
      move && window.addEventListener('mousemove', _this.handleMouseMove);
      window.addEventListener('mouseup', _this.handleMouseUp);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "removeListener", function () {
      window.removeEventListener('touchmove', _this.handleTouchMove);
      window.removeEventListener('touchend', _this.handleMouseUp);
      window.removeEventListener('mousemove', _this.handleMouseMove);
      window.removeEventListener('mouseup', _this.handleMouseUp);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleStart", function (e) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      _this.removeListener();

      _this.addListener({
        move: false
      }); // const a = +new Date();


      if (!pressTimer) {
        pressTimer = window.setTimeout(function () {
          pressTimer = window.clearTimeout(pressTimer); // console.log(+new Date() - a);

          _this.removeListener();

          _this.addListener();

          func();
        }, 700);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTouchStart", function (e, ID, pressY) {
      // console.log('handleTouchStart');
      e.persist(); // const { top } = e.currentTarget.getBoundingClientRect();

      _this.handleStart(e, function () {
        var event = e.touches[0];
        var pageY = event.pageY;

        _this.setState({
          topDeltaY: pageY - pressY,
          mouseY: pressY,
          isPressed: true,
          originalPosOfLastPressed: ID
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDown", function (e, ID, pressY) {
      // console.log('handleMouseDown');
      var pageY = e.pageY;

      _this.handleStart(e, function () {
        // console.log(pageY, pressY);
        _this.setState({
          topDeltaY: pageY - pressY,
          mouseY: pressY,
          isPressed: true,
          originalPosOfLastPressed: ID
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTouchMove", function (e) {
      // console.log('handleTouchMove');
      var isPressed = _this.state.isPressed; // pressTimer = clearTimeout(pressTimer);

      if (isPressed) {
        e.preventDefault();

        _this.handleMouseMove(e.touches[0]);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "reOrder", function () {
      var _this$state = _this.state,
          originalPosOfLastPressed = _this$state.originalPosOfLastPressed,
          newOrder = _this$state.newOrder;
      var currIndex = newOrder.indexOf(originalPosOfLastPressed);
      var realRow = newOrder.reduce(function (row, ID) {
        if (originalPosOfLastPressed === ID) {
          return row;
        }

        var index = newOrder.indexOf(ID);
        var _this$childrenMap$ID = _this.childrenMap[ID],
            _this$childrenMap$ID$ = _this$childrenMap$ID.ref,
            offsetHeight = _this$childrenMap$ID$.offsetHeight,
            offsetTop = _this$childrenMap$ID$.offsetTop,
            currStyle = _this$childrenMap$ID.style;
        var top = offsetTop + currStyle.y;
        var bottom = top + offsetHeight; // const { top, bottom } = this.childrenMap[ID].ref.getBoundingClientRect();

        var _this$childrenMap$ori = _this.childrenMap[originalPosOfLastPressed],
            cursor = _this$childrenMap$ori.ref,
            style = _this$childrenMap$ori.style;
        var cursorOffsetTop = cursor.offsetTop,
            cursorOffsetHeight = cursor.offsetHeight;
        var cursorMiddleLine = cursorOffsetTop + style.y + cursorOffsetHeight / 2; // console.log(cursorMiddleLine, top + (offsetHeight / 4), bottom - (offsetHeight / 4), ID);

        if (cursorMiddleLine > top + offsetHeight / 4 && cursorMiddleLine < bottom - offsetHeight / 4) {
          return index;
        }

        return row;
      }, currIndex);
      var originIndex = newOrder.indexOf(originalPosOfLastPressed);

      if (originIndex !== realRow) {
        var nextNewOrder = reinsert(newOrder, originIndex, realRow);
        return nextNewOrder;
      }

      return newOrder;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setMouseY", function (mouseY) {
      return new _promise.default(function (r) {
        _this.setState({
          mouseY: mouseY
        }, function () {
          (0, _util.sleep)(300).then(r);
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseMove", function (event) {
      // console.log('handleMouseMove');
      var pageY = event.pageY;
      var _this$state2 = _this.state,
          isPressed = _this$state2.isPressed,
          topDeltaY = _this$state2.topDeltaY,
          originalPosOfLastPressed = _this$state2.originalPosOfLastPressed,
          newOrder = _this$state2.newOrder;
      var mouseY = pageY - topDeltaY;

      _this.setMouseY(mouseY);

      if (isPressed && !_this.moveing) {
        if (+new Date() - _this.preTime < animDuration) {
          return;
        }

        var nextNewOrder = _this.reOrder();

        if (newOrder !== nextNewOrder) {
          _this.setState({
            newOrder: (0, _toConsumableArray2.default)(nextNewOrder)
          });

          _this.preTime = +new Date();
        }
      } // });

    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "changeDone", function () {
      var changeDone = _this.props.changeDone;

      _this.clearMotions(animDuration).then(function () {
        var newOrder = _this.state.newOrder;

        _this.setState({
          newOrder: (0, _toConsumableArray2.default)(newOrder),
          order: (0, _toConsumableArray2.default)(newOrder)
        });

        _this.setState({
          topDeltaY: 0,
          mouseY: 0,
          originalPosOfLastPressed: undefined
        });

        changeDone(newOrder);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseUp", function (e) {
      // console.log('handleMouseUp');
      var isPressed = _this.state.isPressed;
      pressTimer = window.clearTimeout(pressTimer);

      _this.setState({
        isPressed: false
      });

      _this.removeListener();

      if (isPressed) {
        // console.log('onDrop');
        _this.changeDone();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "clearMotions", function (delay) {
      return new _promise.default(function (r) {
        setTimeout(function () {
          _this.nextRenderClearMotions = true;

          _this.setState({}, r);
        }, delay);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getContainer", function (ref) {
      _this.container = ref;
    });
    var order = props.order,
        children = props.children;
    _this.Motions = {};
    _this.nextRenderClearMotions = false;
    _this.state = {
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: undefined,
      order: (0, _toConsumableArray2.default)(order),
      newOrder: (0, _toConsumableArray2.default)(order),
      children: children,
      newChildren: children
    };
    _this.handleMouseMove = (0, _rafSchd.default)(_this.handleMouseMove);
    _this.childrenMap = {};
    return _this;
  }

  (0, _createClass2.default)(Drag, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      [this.container].concat((0, _toConsumableArray2.default)(findAllParentNode(this.container))).forEach(function (dom) {
        dom.addEventListener('scroll', _this2.onScroll);
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function () {
      var _componentWillReceiveProps = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(nextProps, nextContext) {
        var _this3 = this;

        var _this$state3, order, newOrder, lastActionMoveID, lastMoveID, children;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state3 = this.state, order = _this$state3.order, newOrder = _this$state3.newOrder;
                lastActionMoveID = nextProps.lastActionMoveID, lastMoveID = nextProps.lastMoveID, children = nextProps.children;

                if (!(order.length === nextProps.order.length && (0, _stringify.default)(order) !== (0, _stringify.default)(nextProps.order) && (0, _util.isExist)(lastActionMoveID) && (0, _util.isExist)(lastMoveID))) {
                  _context.next = 18;
                  break;
                }

                _context.next = 5;
                return this.clearMotions();

              case 5:
                this.setState({
                  // newOrder: [...nextProps.order],
                  originalPosOfLastPressed: lastActionMoveID,
                  isPressed: true
                });
                _context.next = 8;
                return this.setMouseY(this.childrenMap[lastMoveID].ref.offsetTop - this.childrenMap[lastActionMoveID].ref.offsetTop);

              case 8:
                this.setState({
                  newOrder: (0, _toConsumableArray2.default)(nextProps.order)
                });
                _context.next = 11;
                return (0, _util.sleep)(animDuration);

              case 11:
                this.setState({
                  isPressed: false
                });
                _context.next = 14;
                return (0, _util.sleep)(200);

              case 14:
                _context.next = 16;
                return this.clearMotions();

              case 16:
                this.setState({
                  newOrder: (0, _toConsumableArray2.default)(nextProps.order),
                  order: (0, _toConsumableArray2.default)(nextProps.order),
                  originalPosOfLastPressed: undefined,
                  children: children
                });
                return _context.abrupt("return");

              case 18:
                this.clearMotions().then(function () {
                  _this3.setState({
                    children: children,
                    newOrder: (0, _toConsumableArray2.default)(nextProps.order),
                    order: (0, _toConsumableArray2.default)(nextProps.order)
                  });
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillReceiveProps(_x, _x2) {
        return _componentWillReceiveProps.apply(this, arguments);
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      this.nextRenderClearMotions = false;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this4 = this;

      [this.container].concat((0, _toConsumableArray2.default)(findAllParentNode(this.container))).forEach(function (dom) {
        dom.removeEventListener('scroll', _this4.onScroll);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state4 = this.state,
          mouseY = _this$state4.mouseY,
          isPressed = _this$state4.isPressed,
          originalPosOfLastPressed = _this$state4.originalPosOfLastPressed,
          newOrder = _this$state4.newOrder,
          _this$state4$order = _this$state4.order,
          order = _this$state4$order === void 0 ? [] : _this$state4$order,
          children = _this$state4.children,
          newChildren = _this$state4.newChildren;
      var _this$props = this.props,
          clearMotions = _this$props.clearMotions,
          pressedMotions = _this$props.pressedMotions,
          notPressedMotions = _this$props.notPressedMotions,
          createStyle = _this$props.createStyle;
      var nextRenderClearMotions = this.nextRenderClearMotions;
      return _react.default.createElement("div", {
        className: "".concat((0, _util.prefix)('drag-container'), " ").concat((0, _util.prefix)('map-container')),
        ref: this.getContainer
      }, order.map(function (ID, index) {
        var y = 0;
        var newIndex = newOrder.indexOf(ID);

        if (originalPosOfLastPressed === ID && !isPressed) {
          // if (originalPosOfLastPressed === ID ) {
          var nowY = 0;

          var _ref2 = newIndex - index > 0 ? {
            startIndex: index,
            endIndex: newIndex
          } : {
            startIndex: newIndex,
            endIndex: index
          },
              startIndex = _ref2.startIndex,
              endIndex = _ref2.endIndex;

          for (var i = startIndex; i < endIndex; i++) {
            var offsetHeight = _this5.childrenMap[(newIndex - index > 0 ? newOrder : order)[i]].ref.offsetHeight;
            nowY += offsetHeight;
          }

          y = newIndex - index > 0 ? nowY : -nowY;
        } else if (index !== newIndex) {
          y = (newIndex - index > 0 ? 1 : -1) * _this5.childrenMap[originalPosOfLastPressed].ref.offsetHeight;
        }

        var style = nextRenderClearMotions ? (0, _objectSpread2.default)({}, clearMotions(), {
          y: 0
        }) : originalPosOfLastPressed === ID && isPressed ? (0, _objectSpread2.default)({}, pressedMotions(), {
          y: spring(mouseY, {
            stiffness: 500,
            damping: 50
          }) // y: mouseY,

        }) : (0, _objectSpread2.default)({}, notPressedMotions(), {
          y: spring(y, springConfig)
        });
        return _react.default.createElement(_reactMotion.Motion, {
          style: style,
          key: ID,
          ref: function ref(_ref4) {
            return _this5.Motions[ID] = _ref4;
          }
        }, // console.log(ID, ' ', y);
        // console.trace(ID, ' ', y);
        // console.log('scale', ' ', scale);
        // console.log('shadow', ' ', shadow);
        function (styles) {
          if (!_this5.childrenMap[ID]) _this5.childrenMap[ID] = {};
          _this5.childrenMap[ID].style = {
            y: styles.y
          };
          return _react.default.createElement("div", {
            onMouseDown: function onMouseDown(event) {
              _this5.handleMouseDown(event, ID, y);
            },
            ref: function ref(_ref3) {
              _this5.childrenMap[ID].ref = _ref3;
            },
            onTouchStart: function onTouchStart(event) {
              return _this5.handleTouchStart(event, ID, y);
            },
            className: "".concat((0, _util.prefix)('group-item-wrap'), " ").concat(originalPosOfLastPressed === ID && isPressed ? (0, _util.prefix)('group-item-wrap-pressed') : ''),
            style: (0, _objectSpread2.default)({}, createStyle({
              styles: styles,
              ID: ID,
              originalPosOfLastPressed: originalPosOfLastPressed
            }), {
              zIndex: ID === originalPosOfLastPressed ? 99 : ID
            })
          }, children[ID]);
        });
      }));
    }
  }]);
  return Drag;
}(_react.Component);

exports.default = Drag;
Drag.defaultProps = {
  changeDone: function changeDone() {},
  clearMotions: function clearMotions() {
    return {
      scale: 1,
      shadow: 0
    };
  },
  pressedMotions: function pressedMotions() {
    return {
      scale: spring(0.6, springConfig),
      shadow: spring(16, springConfig) // y: mouseY,

    };
  },
  notPressedMotions: function notPressedMotions() {
    return {
      scale: spring(1, springConfig),
      shadow: spring(0, springConfig)
    };
  },
  createStyle: function createStyle() {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref5$styles = _ref5.styles,
        scale = _ref5$styles.scale,
        shadow = _ref5$styles.shadow,
        y = _ref5$styles.y;

    return {
      boxShadow: "rgba(0, 0, 0, 0.2) 0px ".concat(shadow, "px ").concat(2 * shadow, "px 0px"),
      transform: "translate3d(0, ".concat(y, "px, 0) scale(").concat(scale, ")"),
      WebkitTransform: "translate3d(0, ".concat(y, "px, 0) scale(").concat(scale, ")")
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EcmFnLmpzeCJdLCJuYW1lcyI6WyJmaW5kQWxsUGFyZW50Tm9kZSIsIm5vZGUiLCJlbHMiLCJ3aW5kb3ciLCJjdXJyTm9kZSIsInVuc2hpZnQiLCJwYXJlbnROb2RlIiwicmVpbnNlcnQiLCJhcnIiLCJmcm9tIiwidG8iLCJfYXJyIiwic2xpY2UiLCJ2YWwiLCJzcGxpY2UiLCJhbmltRHVyYXRpb24iLCJzcHJpbmdDb25maWciLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicHJlc3NUaW1lciIsIkRyYWciLCJwcm9wcyIsImNsZWFyVGltZW91dCIsInN0YXRlIiwiaXNQcmVzc2VkIiwic2V0U3RhdGUiLCJtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVRvdWNoTW92ZSIsInBhc3NpdmUiLCJoYW5kbGVNb3VzZVVwIiwiaGFuZGxlTW91c2VNb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImUiLCJmdW5jIiwicmVtb3ZlTGlzdGVuZXIiLCJhZGRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJJRCIsInByZXNzWSIsInBlcnNpc3QiLCJoYW5kbGVTdGFydCIsImV2ZW50IiwidG91Y2hlcyIsInBhZ2VZIiwidG9wRGVsdGFZIiwibW91c2VZIiwib3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkIiwicHJldmVudERlZmF1bHQiLCJuZXdPcmRlciIsImN1cnJJbmRleCIsImluZGV4T2YiLCJyZWFsUm93IiwicmVkdWNlIiwicm93IiwiaW5kZXgiLCJjaGlsZHJlbk1hcCIsInJlZiIsIm9mZnNldEhlaWdodCIsIm9mZnNldFRvcCIsImN1cnJTdHlsZSIsInN0eWxlIiwidG9wIiwieSIsImJvdHRvbSIsImN1cnNvciIsImN1cnNvck9mZnNldFRvcCIsImN1cnNvck9mZnNldEhlaWdodCIsImN1cnNvck1pZGRsZUxpbmUiLCJvcmlnaW5JbmRleCIsIm5leHROZXdPcmRlciIsInIiLCJ0aGVuIiwic2V0TW91c2VZIiwibW92ZWluZyIsIkRhdGUiLCJwcmVUaW1lIiwicmVPcmRlciIsImNoYW5nZURvbmUiLCJjbGVhck1vdGlvbnMiLCJvcmRlciIsInVuZGVmaW5lZCIsImRlbGF5IiwibmV4dFJlbmRlckNsZWFyTW90aW9ucyIsImNvbnRhaW5lciIsImNoaWxkcmVuIiwiTW90aW9ucyIsIm5ld0NoaWxkcmVuIiwiZm9yRWFjaCIsImRvbSIsIm9uU2Nyb2xsIiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJsYXN0QWN0aW9uTW92ZUlEIiwibGFzdE1vdmVJRCIsImxlbmd0aCIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsInNuYXBzaG90IiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiZ2V0Q29udGFpbmVyIiwibWFwIiwibmV3SW5kZXgiLCJub3dZIiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwiaSIsInNwcmluZyIsInN0eWxlcyIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZVRvdWNoU3RhcnQiLCJ6SW5kZXgiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJzY2FsZSIsInNoYWRvdyIsImJveFNoYWRvdyIsInRyYW5zZm9ybSIsIldlYmtpdFRyYW5zZm9ybSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUtBO0FBRUEsU0FBU0EsaUJBQVQsQ0FBMkJDLElBQTNCLEVBQWlDO0FBQy9CLE1BQU1DLEdBQUcsR0FBRyxDQUFDQyxNQUFELENBQVo7QUFDQSxNQUFJQyxRQUFRLEdBQUdILElBQWY7O0FBQ0EsU0FBT0csUUFBUCxFQUFpQjtBQUNmRixJQUFBQSxHQUFHLENBQUNHLE9BQUosQ0FBWUQsUUFBWjtBQUNBQSxJQUFBQSxRQUFRLEdBQUdBLFFBQVEsQ0FBQ0UsVUFBcEI7QUFDRDs7QUFDRCxTQUFPSixHQUFQO0FBQ0Q7O0FBR0QsU0FBU0ssUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUJDLElBQXZCLEVB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RVRNLEtBRlMsZ0JBRVRBLEtBRlM7QUFBQSxRQUdUQyxNQUhTLGdCQUdUQSxNQUhTO0FBQUEsUUFJVHRELENBSlMsZ0JBSVRBLENBSlM7O0FBQUEsV0FRRDtBQUNWdUQsTUFBQUEsU0FBUyxtQ0FBNEJELE1BQTVCLGdCQUF3QyxJQUFJQSxNQUE1QyxXQURDO0FBRVZFLE1BQUFBLFNBQVMsMkJBQW9CeEQsQ0FBcEIsMEJBQXFDcUQsS0FBckMsTUFGQztBQUdWSSxNQUFBQSxlQUFlLDJCQUFvQnpELENBQXBCLDBCQUFxQ3FELEtBQXJDO0FBSEwsS0FSQztBQUFBO0FBZkssQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTW90aW9uIH0gZnJvbSAncmVhY3QtbW90aW9uJztcbmltcG9ydCByYWZTY2hkIGZyb20gJ3JhZi1zY2hkJztcbmltcG9ydCB7IHByZWZpeCwgc2xlZXAsIGlzRXhpc3QgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgeyBzcHJpbmcgfSBmcm9tICdyZWFjdC1tb3Rpb24nO1xuXG5cbi8vIHRvZG8gYXV0byBzY3JvbGxcblxuZnVuY3Rpb24gZmluZEFsbFBhcmVudE5vZGUobm9kZSkge1xuICBjb25zdCBlbHMgPSBbd2luZG93XTtcbiAgbGV0IGN1cnJOb2RlID0gbm9kZTtcbiAgd2hpbGUgKGN1cnJOb2RlKSB7XG4gICAgZWxzLnVuc2hpZnQoY3Vyck5vZGUpO1xuICAgIGN1cnJOb2RlID0gY3Vyck5vZGUucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gZWxzO1xufVxuXG5cbmZ1bmN0aW9uIHJlaW5zZXJ0KGFyciwgZnJvbSwgdG8pIHtcbiAgY29uc3QgX2FyciA9IGFyci5zbGljZSgwKTtcbiAgY29uc3QgdmFsID0gX2Fycltmcm9tXTtcbiAgX2Fyci5zcGxpY2UoZnJvbSwgMSk7XG4gIF9hcnIuc3BsaWNlKHRvLCAwLCB2YWwpO1xuICByZXR1cm4gX2Fycjtcbn1cblxuY29uc3QgYW5pbUR1cmF0aW9uID0gMzAwO1xuXG5jb25zdCBzcHJpbmdDb25maWcgPSB7IHN0aWZmbmVzczogMjAwLCBkYW1waW5nOiAyMCB9O1xuXG5sZXQgcHJlc3NUaW1lcjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgeyBvcmRlciwgY2hpbGRyZW4gfSA9IHByb3BzO1xuXG4gICAgdGhpcy5Nb3Rpb25zID0ge307XG4gICAgdGhpcy5uZXh0UmVuZGVyQ2xlYXJNb3Rpb25zID0gZmFsc2U7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9wRGVsdGFZOiAwLFxuICAgICAgbW91c2VZOiAwLFxuICAgICAgaXNQcmVzc2VkOiBmYWxzZSxcbiAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogdW5kZWZpbmVkLFxuICAgICAgb3JkZXI6IFsuLi5vcmRlcl0sXG4gICAgICBuZXdPcmRlcjogWy4uLm9yZGVyXSxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgbmV3Q2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIH07XG5cbiAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZSA9IHJhZlNjaGQodGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgIHRoaXMuY2hpbGRyZW5NYXAgPSB7fTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIFt0aGlzLmNvbnRhaW5lciwgLi4uZmluZEFsbFBhcmVudE5vZGUodGhpcy5jb250YWluZXIpXS5mb3JFYWNoKChkb20pID0+IHtcbiAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuICAgIGNvbnN0IHsgb3JkZXIsIG5ld09yZGVyIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgbGFzdEFjdGlvbk1vdmVJRCwgbGFzdE1vdmVJRCwgY2hpbGRyZW4gfSA9IG5leHRQcm9wcztcblxuICAgIGlmIChcbiAgICAgIG9yZGVyLmxlbmd0aCA9PT0gbmV4dFByb3BzLm9yZGVyLmxlbmd0aFxuICAgICAgJiYgSlNPTi5zdHJpbmdpZnkob3JkZXIpICE9PSBKU09OLnN0cmluZ2lmeShuZXh0UHJvcHMub3JkZXIpXG4gICAgICAmJiBpc0V4aXN0KGxhc3RBY3Rpb25Nb3ZlSUQpXG4gICAgICAmJiBpc0V4aXN0KGxhc3RNb3ZlSUQpXG4gICAgKSB7XG4gICAgICBhd2FpdCB0aGlzLmNsZWFyTW90aW9ucygpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIC8vIG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiBsYXN0QWN0aW9uTW92ZUlELFxuICAgICAgICBpc1ByZXNzZWQ6IHRydWUsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5zZXRNb3VzZVkoXG4gICAgICAgIHRoaXMuY2hpbGRyZW5NYXBbbGFzdE1vdmVJRF0ucmVmLm9mZnNldFRvcFxuICAgICAgICAtIHRoaXMuY2hpbGRyZW5NYXBbbGFzdEFjdGlvbk1vdmVJRF0ucmVmLm9mZnNldFRvcCxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0gfSk7XG5cbiAgICAgIGF3YWl0IHNsZWVwKGFuaW1EdXJhdGlvbik7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ByZXNzZWQ6IGZhbHNlIH0pO1xuXG4gICAgICBhd2FpdCBzbGVlcCgyMDApO1xuXG4gICAgICBhd2FpdCB0aGlzLmNsZWFyTW90aW9ucygpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLFxuICAgICAgICBvcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogdW5kZWZpbmVkLFxuICAgICAgICBjaGlsZHJlbixcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2xlYXJNb3Rpb25zKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgY2hpbGRyZW4sIG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSwgb3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlLCBzbmFwc2hvdCkge1xuICAgIHRoaXMubmV4dFJlbmRlckNsZWFyTW90aW9ucyA9IGZhbHNlO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgW3RoaXMuY29udGFpbmVyLCAuLi5maW5kQWxsUGFyZW50Tm9kZSh0aGlzLmNvbnRhaW5lcildLmZvckVhY2goKGRvbSkgPT4ge1xuICAgICAgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzUHJlc3NlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGlzdGVuZXIgPSAoeyBtb3ZlID0gdHJ1ZSB9ID0ge30pID0+IHtcbiAgICBtb3ZlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIG1vdmUgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gIH1cblxuICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gIH1cblxuICBoYW5kbGVTdGFydCA9IChlLCBmdW5jID0gKCkgPT4ge30pID0+IHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCk7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcih7IG1vdmU6IGZhbHNlIH0pO1xuXG4gICAgLy8gY29uc3QgYSA9ICtuZXcgRGF0ZSgpO1xuICAgIGlmICghcHJlc3NUaW1lcikge1xuICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5jbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCtuZXcgRGF0ZSgpIC0gYSk7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcigpO1xuICAgICAgICBmdW5jKCk7XG4gICAgICB9LCA3MDApO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVRvdWNoU3RhcnQgPSAoZSwgSUQsIHByZXNzWSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVUb3VjaFN0YXJ0Jyk7XG4gICAgZS5wZXJzaXN0KCk7XG4gICAgLy8gY29uc3QgeyB0b3AgfSA9IGUuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRoaXMuaGFuZGxlU3RhcnQoZSwgKCkgPT4ge1xuICAgICAgY29uc3QgZXZlbnQgPSBlLnRvdWNoZXNbMF07XG4gICAgICBjb25zdCB7IHBhZ2VZIH0gPSBldmVudDtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRvcERlbHRhWTogcGFnZVkgLSBwcmVzc1ksXG4gICAgICAgIG1vdXNlWTogcHJlc3NZLFxuICAgICAgICBpc1ByZXNzZWQ6IHRydWUsXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogSUQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVNb3VzZURvd24gPSAoZSwgSUQsIHByZXNzWSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZURvd24nKTtcbiAgICBjb25zdCB7IHBhZ2VZIH0gPSBlO1xuXG4gICAgdGhpcy5oYW5kbGVTdGFydChlLCAoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhwYWdlWSwgcHJlc3NZKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0b3BEZWx0YVk6IHBhZ2VZIC0gcHJlc3NZLFxuICAgICAgICBtb3VzZVk6IHByZXNzWSxcbiAgICAgICAgaXNQcmVzc2VkOiB0cnVlLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IElELFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlVG91Y2hNb3ZlID0gKGUpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlVG91Y2hNb3ZlJyk7XG4gICAgY29uc3QgeyBpc1ByZXNzZWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAvLyBwcmVzc1RpbWVyID0gY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuXG4gICAgaWYgKGlzUHJlc3NlZCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVNb3VzZU1vdmUoZS50b3VjaGVzWzBdKTtcbiAgICB9XG4gIH07XG5cbiAgcmVPcmRlciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsIG5ld09yZGVyLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgY3VyckluZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQpO1xuICAgIGNvbnN0IHJlYWxSb3cgPSBuZXdPcmRlci5yZWR1Y2UoKHJvdywgSUQpID0+IHtcbiAgICAgIGlmIChvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEKSB7XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihJRCk7XG4gICAgICBjb25zdCB7IHJlZjogeyBvZmZzZXRIZWlnaHQsIG9mZnNldFRvcCB9LCBzdHlsZTogY3VyclN0eWxlIH0gPSB0aGlzLmNoaWxkcmVuTWFwW0lEXTtcbiAgICAgIGNvbnN0IHRvcCA9IG9mZnNldFRvcCArIGN1cnJTdHlsZS55O1xuICAgICAgY29uc3QgYm90dG9tID0gdG9wICsgb2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAvLyBjb25zdCB7IHRvcCwgYm90dG9tIH0gPSB0aGlzLmNoaWxkcmVuTWFwW0lEXS5yZWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCB7IHJlZjogY3Vyc29yLCBzdHlsZSB9ID0gdGhpcy5jaGlsZHJlbk1hcFtvcmlnaW5hbFBvc09mTGFzdFByZXNzZWRdO1xuICAgICAgY29uc3QgeyBvZmZzZXRUb3A6IGN1cnNvck9mZnNldFRvcCwgb2Zmc2V0SGVpZ2h0OiBjdXJzb3JPZmZzZXRIZWlnaHQgfSA9IGN1cnNvcjtcblxuICAgICAgY29uc3QgY3Vyc29yTWlkZGxlTGluZSA9IGN1cnNvck9mZnNldFRvcCArIHN0eWxlLnkgKyAoY3Vyc29yT2Zmc2V0SGVpZ2h0IC8gMik7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnNvck1pZGRsZUxpbmUsIHRvcCArIChvZmZzZXRIZWlnaHQgLyA0KSwgYm90dG9tIC0gKG9mZnNldEhlaWdodCAvIDQpLCBJRCk7XG4gICAgICBpZiAoXG4gICAgICAgIGN1cnNvck1pZGRsZUxpbmUgPiB0b3AgKyAob2Zmc2V0SGVpZ2h0IC8gNClcbiAgICAgICAgJiYgY3Vyc29yTWlkZGxlTGluZSA8IGJvdHRvbSAtIChvZmZzZXRIZWlnaHQgLyA0KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByb3c7XG4gICAgfSwgY3VyckluZGV4KTtcblxuICAgIGNvbnN0IG9yaWdpbkluZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQpO1xuXG4gICAgaWYgKG9yaWdpbkluZGV4ICE9PSByZWFsUm93KSB7XG4gICAgICBjb25zdCBuZXh0TmV3T3JkZXIgPSByZWluc2VydChuZXdPcmRlciwgb3JpZ2luSW5kZXgsIHJlYWxSb3cpO1xuICAgICAgcmV0dXJuIG5leHROZXdPcmRlcjtcbiAgICB9XG4gICAgcmV0dXJuIG5ld09yZGVyO1xuICB9XG5cbiAgc2V0TW91c2VZID0gbW91c2VZID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG1vdXNlWSB9LCAoKSA9PiB7XG4gICAgICBzbGVlcCgzMDApLnRoZW4ocik7XG4gICAgfSk7XG4gIH0pXG5cbiAgaGFuZGxlTW91c2VNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNlTW92ZScpO1xuICAgIGNvbnN0IHsgcGFnZVkgfSA9IGV2ZW50O1xuXG4gICAgY29uc3Qge1xuICAgICAgaXNQcmVzc2VkLCB0b3BEZWx0YVksIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCwgbmV3T3JkZXIsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBtb3VzZVkgPSBwYWdlWSAtIHRvcERlbHRhWTtcblxuICAgIHRoaXMuc2V0TW91c2VZKG1vdXNlWSk7XG5cbiAgICBpZiAoaXNQcmVzc2VkICYmICF0aGlzLm1vdmVpbmcpIHtcbiAgICAgIGlmICgrbmV3IERhdGUoKSAtIHRoaXMucHJlVGltZSA8IGFuaW1EdXJhdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0TmV3T3JkZXIgPSB0aGlzLnJlT3JkZXIoKTtcblxuICAgICAgaWYgKG5ld09yZGVyICE9PSBuZXh0TmV3T3JkZXIpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV4dE5ld09yZGVyXSB9KTtcblxuICAgICAgICB0aGlzLnByZVRpbWUgPSArbmV3IERhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gfSk7XG4gIH07XG5cbiAgY2hhbmdlRG9uZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNoYW5nZURvbmUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICB0aGlzLmNsZWFyTW90aW9ucyhhbmltRHVyYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgeyBuZXdPcmRlciB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBuZXdPcmRlcjogWy4uLm5ld09yZGVyXSwgb3JkZXI6IFsuLi5uZXdPcmRlcl0gfSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdG9wRGVsdGFZOiAwLCBtb3VzZVk6IDAsIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogdW5kZWZpbmVkIH0pO1xuICAgICAgY2hhbmdlRG9uZShuZXdPcmRlcik7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVNb3VzZVVwID0gKGUpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlTW91c2VVcCcpO1xuICAgIGNvbnN0IHsgaXNQcmVzc2VkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcHJlc3NUaW1lciA9IHdpbmRvdy5jbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuXG4gICAgaWYgKGlzUHJlc3NlZCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ29uRHJvcCcpO1xuICAgICAgdGhpcy5jaGFuZ2VEb25lKCk7XG4gICAgfVxuICB9O1xuXG4gIGNsZWFyTW90aW9ucyA9ZGVsYXkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubmV4dFJlbmRlckNsZWFyTW90aW9ucyA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHt9LCByKTtcbiAgICB9LCBkZWxheSk7XG4gIH0pXG5cbiAgZ2V0Q29udGFpbmVyID0gKHJlZikgPT4ge1xuICAgIHRoaXMuY29udGFpbmVyID0gcmVmO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1vdXNlWSwgaXNQcmVzc2VkLCBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsIG5ld09yZGVyLCBvcmRlciA9IFtdLCBjaGlsZHJlbiwgbmV3Q2hpbGRyZW4sXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCB7XG4gICAgICBjbGVhck1vdGlvbnMsIHByZXNzZWRNb3Rpb25zLCBub3RQcmVzc2VkTW90aW9ucywgY3JlYXRlU3R5bGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zIH0gPSB0aGlzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdkcmFnLWNvbnRhaW5lcicpfSAke3ByZWZpeCgnbWFwLWNvbnRhaW5lcicpfWAgfSByZWY9eyB0aGlzLmdldENvbnRhaW5lciB9PlxuICAgICAgICB7b3JkZXIubWFwKChJRCwgaW5kZXgpID0+IHtcbiAgICAgICAgICBsZXQgeSA9IDA7XG4gICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBuZXdPcmRlci5pbmRleE9mKElEKTtcblxuICAgICAgICAgIGlmIChvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICYmICFpc1ByZXNzZWQpIHtcbiAgICAgICAgICAvLyBpZiAob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCApIHtcbiAgICAgICAgICAgIGxldCBub3dZID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhcnRJbmRleCwgZW5kSW5kZXggfSA9IG5ld0luZGV4IC0gaW5kZXggPiAwXG4gICAgICAgICAgICAgID8gKHsgc3RhcnRJbmRleDogaW5kZXgsIGVuZEluZGV4OiBuZXdJbmRleCB9KVxuICAgICAgICAgICAgICA6ICh7IHN0YXJ0SW5kZXg6IG5ld0luZGV4LCBlbmRJbmRleDogaW5kZXggfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgcmVmOiB7IG9mZnNldEhlaWdodCB9LFxuICAgICAgICAgICAgICB9ID0gdGhpcy5jaGlsZHJlbk1hcFsobmV3SW5kZXggLSBpbmRleCA+IDAgPyBuZXdPcmRlciA6IG9yZGVyKVtpXV07XG4gICAgICAgICAgICAgIG5vd1kgKz0gb2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeSA9IG5ld0luZGV4IC0gaW5kZXggPiAwID8gbm93WSA6IC1ub3dZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggIT09IG5ld0luZGV4KSB7XG4gICAgICAgICAgICB5ID0gKG5ld0luZGV4IC0gaW5kZXggPiAwID8gMSA6IC0xKVxuICAgICAgICAgICAgICAgICogdGhpcy5jaGlsZHJlbk1hcFtvcmlnaW5hbFBvc09mTGFzdFByZXNzZWRdLnJlZi5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc3R5bGUgPSBuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgLi4uY2xlYXJNb3Rpb25zKCksXG4gICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgJiYgaXNQcmVzc2VkXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIC4uLnByZXNzZWRNb3Rpb25zKCksXG4gICAgICAgICAgICAgICAgeTogc3ByaW5nKG1vdXNlWSwgeyBzdGlmZm5lc3M6IDUwMCwgZGFtcGluZzogNTAgfSksXG4gICAgICAgICAgICAgIC8vIHk6IG1vdXNlWSxcbiAgICAgICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAgICAuLi5ub3RQcmVzc2VkTW90aW9ucygpLFxuICAgICAgICAgICAgICAgIHk6IHNwcmluZyh5LCBzcHJpbmdDb25maWcpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TW90aW9uIHN0eWxlPXsgc3R5bGUgfSBrZXk9eyBJRCB9IHJlZj17IHJlZiA9PiB0aGlzLk1vdGlvbnNbSURdID0gcmVmIH0+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKElELCAnICcsIHkpO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS50cmFjZShJRCwgJyAnLCB5KTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZScsICcgJywgc2NhbGUpO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NoYWRvdycsICcgJywgc2hhZG93KTtcbiAgICAgICAgICAgICAgIChzdHlsZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoaWxkcmVuTWFwW0lEXSkgdGhpcy5jaGlsZHJlbk1hcFtJRF0gPSB7fTtcbiAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbk1hcFtJRF0uc3R5bGUgPSB7IHk6IHN0eWxlcy55IH07XG5cbiAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCwgSUQsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgICByZWY9eyAocmVmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5NYXBbSURdLnJlZiA9IHJlZjtcbiAgICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgZXZlbnQgPT4gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KGV2ZW50LCBJRCwgeSkgfVxuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1pdGVtLXdyYXAnKX0gJHtvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICYmIGlzUHJlc3NlZCA/IHByZWZpeCgnZ3JvdXAtaXRlbS13cmFwLXByZXNzZWQnKSA6ICcnfWAgfVxuICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7XG4gICAgICAgICAgICAgICAgICAgICAgIC4uLmNyZWF0ZVN0eWxlKHsgc3R5bGVzLCBJRCwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IElEID09PSBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPyA5OSA6IElELFxuICAgICAgICAgICAgICAgICAgICAgfSB9PlxuICAgICAgICAgICAgICAgICAgICAgeyBjaGlsZHJlbltJRF0gfVxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L01vdGlvbj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRHJhZy5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoYW5nZURvbmU6ICgpID0+IHt9LFxuICBjbGVhck1vdGlvbnM6ICgpID0+ICh7XG4gICAgc2NhbGU6IDEsXG4gICAgc2hhZG93OiAwLFxuICB9KSxcbiAgcHJlc3NlZE1vdGlvbnM6ICgpID0+ICh7XG4gICAgc2NhbGU6IHNwcmluZygwLjYsIHNwcmluZ0NvbmZpZyksXG4gICAgc2hhZG93OiBzcHJpbmcoMTYsIHNwcmluZ0NvbmZpZyksXG4gICAgLy8geTogbW91c2VZLFxuICB9KSxcbiAgbm90UHJlc3NlZE1vdGlvbnM6ICgpID0+ICh7XG4gICAgc2NhbGU6IHNwcmluZygxLCBzcHJpbmdDb25maWcpLFxuICAgIHNoYWRvdzogc3ByaW5nKDAsIHNwcmluZ0NvbmZpZyksXG4gIH0pLFxuICBjcmVhdGVTdHlsZTogKHtcbiAgICBzdHlsZXM6IHtcbiAgICAgIHNjYWxlLFxuICAgICAgc2hhZG93LFxuICAgICAgeSxcbiAgICB9LFxuICAgIC8vIElELFxuICAgIC8vIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCxcbiAgfSA9IHt9KSA9PiAoe1xuICAgIGJveFNoYWRvdzogYHJnYmEoMCwgMCwgMCwgMC4yKSAwcHggJHtzaGFkb3d9cHggJHsyICogc2hhZG93fXB4IDBweGAsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHt5fXB4LCAwKSBzY2FsZSgke3NjYWxlfSlgLFxuICAgIFdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYCxcbiAgfSksXG59O1xuIl19