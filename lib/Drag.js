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
          y: (0, _reactMotion.spring)(mouseY, {
            stiffness: 500,
            damping: 50
          }) // y: mouseY,

        }) : (0, _objectSpread2.default)({}, notPressedMotions(), {
          y: (0, _reactMotion.spring)(y, springConfig)
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
              zIndex: ID === originalPosOfLastPressed ? 99 : ID,
              position: ID === originalPosOfLastPressed ? 'relative' : 'unset'
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
      scale: (0, _reactMotion.spring)(0.6, springConfig),
      shadow: (0, _reactMotion.spring)(16, springConfig) // y: mouseY,

    };
  },
  notPressedMotions: function notPressedMotions() {
    return {
      scale: (0, _reactMotion.spring)(1, springConfig),
      shadow: (0, _reactMotion.spring)(0, springConfig)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EcmFnLmpzeCJdLCJuYW1lcyI6WyJmaW5kQWxsUGFyZW50Tm9kZSIsIm5vZGUiLCJlbHMiLCJ3aW5kb3ciLCJjdXJyTm9kZSIsInVuc2hpZnQiLCJwYXJlbnROb2RlIiwicmVpbnNlcnQiLCJhcnIiLCJmcm9tIiwidG8iLCJfYXJyIiwic2xpY2UiLCJ2YWwiLCJzcGxpY2UiLCJhbmltRHVyYXRpb24iLCJzcHJpbmdDb25maWciLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicHJlc3NUaW1lciIsIkRyYWciLCJwcm9wcyIsImNsZWFyVGltZW91dCIsInN0YXRlIiwiaXNQcmVzc2VkIiwic2V0U3RhdGUiLCJtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVRvdWNoTW92ZSIsInBhc3NpdmUiLCJoYW5kbGVNb3VzZVVwIiwiaGFuZGxlTW91c2VNb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImUiLCJmdW5jIiwicmVtb3ZlTGlzdGVuZXIiLCJhZGRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJJRCIsInByZXNzWSIsInBlcnNpc3QiLCJoYW5kbGVTdGFydCIsImV2ZW50IiwidG91Y2hlcyIsInBhZ2VZIiwidG9wRGVsdGFZIiwibW91c2VZIiwib3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkIiwicHJldmVudERlZmF1bHQiLCJuZXdPcmRlciIsImN1cnJJbmRleCIsImluZGV4T2YiLCJyZWFsUm93IiwicmVkdWNlIiwicm93IiwiaW5kZXgiLCJjaGlsZHJlbk1hcCIsInJlZiIsIm9mZnNldEhlaWdodCIsIm9mZnNldFRvcCIsImN1cnJTdHlsZSIsInN0eWxlIiwidG9wIiwieSIsImJvdHRvbSIsImN1cnNvciIsImN1cnNvck9mZnNldFRvcCIsImN1cnNvck9mZnNldEhlaWdodCIsImN1cnNvck1pZGRsZUxpbmUiLCJvcmlnaW5JbmRleCIsIm5leHROZXdPcmRlciIsInIiLCJ0aGVuIiwic2V0TW91c2VZIiwibW92ZWluZyIsIkRhdGUiLCJwcmVUaW1lIiwicmVPcmRlciIsImNoYW5nZURvbmUiLCJjbGVhck1vdGlvbnMiLCJvcmRlciIsInVuZGVmaW5lZCIsImRlbGF5IiwibmV4dFJlbmRlckNsZWFyTW90aW9ucyIsImNvbnRhaW5lciIsImNoaWxkcmVuIiwiTW90aW9ucyIsIm5ld0NoaWxkcmVuIiwiZm9yRWFjaCIsImRvbSIsIm9uU2Nyb2xsIiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJsYXN0QWN0aW9uTW92ZUlEIiwibGFzdE1vdmVJRCIsImxlbmd0aCIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsInNuYXBzaG90IiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiZ2V0Q29udGFpbmVyIiwibWFwIiwibmV3SW5kZXgiLCJub3dZIiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwiaSIsInN0eWxlcyIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZVRvdWNoU3RhcnQiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInNjYWxlIiwic2hhZG93IiwiYm94U2hhZG93IiwidHJhbnNmb3JtIiwiV2Via2l0VHJhbnNmb3JtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBS0E7QUFFQSxTQUFTQSxpQkFBVCxDQUEyQkMsSUFBM0IsRUFBaUM7QUFDL0IsTUFBTUMsR0FBRyxHQUFHLENBQUNDLE1BQUQsQ0FBWjtBQUNBLE1BQUlDLFFBQVEsR0FBR0gsSUFBZjs7QUFDQSxTQUFPRyxRQUFQLEVBQWlCO0FBQ2ZGLElBQUFBLEdBQUcsQ0FBQ0csT0FBSixDQUFZRCxRQUFaO0FBQ0FBLElBQUFBLFFBQVEsR0FBR0EsUUFBUSxDQUFDRSxVQUFwQjtBQUNEOztBQUNELFNBQU9KLEdBQVA7QUFDRDs7QUFHRCxTQUFTSyxRQUFULENBQWtCQyxHQUFsQixFQUF1QkMsSUFBdkIs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QSxvRkFRVCxFQVJTO0FBQUEsNkJBQ1hRLE1BRFc7QUFBQSxRQUVUTyxLQUZTLGdCQUVUQSxLQUZTO0FBQUEsUUFHVEMsTUFIUyxnQkFHVEEsTUFIUztBQUFBLFFBSVR0RCxDQUpTLGdCQUlUQSxDQUpTOztBQUFBLFdBUUQ7QUFDVnVELE1BQUFBLFNBQVMsbUNBQTRCRCxNQUE1QixnQkFBd0MsSUFBSUEsTUFBNUMsV0FEQztBQUVWRSxNQUFBQSxTQUFTLDJCQUFvQnhELENBQXBCLDBCQUFxQ3FELEtBQXJDLE1BRkM7QUFHVkksTUFBQUEsZUFBZSwyQkFBb0J6RCxDQUFwQiwwQkFBcUNxRCxLQUFyQztBQUhMLEtBUkM7QUFBQTtBQWZLLENBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1vdGlvbiwgc3ByaW5nIH0gZnJvbSAncmVhY3QtbW90aW9uJztcbmltcG9ydCByYWZTY2hkIGZyb20gJ3JhZi1zY2hkJztcbmltcG9ydCB7IHByZWZpeCwgc2xlZXAsIGlzRXhpc3QgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgeyBzcHJpbmcgfSBmcm9tICdyZWFjdC1tb3Rpb24nO1xuXG5cbi8vIHRvZG8gYXV0byBzY3JvbGxcblxuZnVuY3Rpb24gZmluZEFsbFBhcmVudE5vZGUobm9kZSkge1xuICBjb25zdCBlbHMgPSBbd2luZG93XTtcbiAgbGV0IGN1cnJOb2RlID0gbm9kZTtcbiAgd2hpbGUgKGN1cnJOb2RlKSB7XG4gICAgZWxzLnVuc2hpZnQoY3Vyck5vZGUpO1xuICAgIGN1cnJOb2RlID0gY3Vyck5vZGUucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gZWxzO1xufVxuXG5cbmZ1bmN0aW9uIHJlaW5zZXJ0KGFyciwgZnJvbSwgdG8pIHtcbiAgY29uc3QgX2FyciA9IGFyci5zbGljZSgwKTtcbiAgY29uc3QgdmFsID0gX2Fycltmcm9tXTtcbiAgX2Fyci5zcGxpY2UoZnJvbSwgMSk7XG4gIF9hcnIuc3BsaWNlKHRvLCAwLCB2YWwpO1xuICByZXR1cm4gX2Fycjtcbn1cblxuY29uc3QgYW5pbUR1cmF0aW9uID0gMzAwO1xuXG5jb25zdCBzcHJpbmdDb25maWcgPSB7IHN0aWZmbmVzczogMjAwLCBkYW1waW5nOiAyMCB9O1xuXG5sZXQgcHJlc3NUaW1lcjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgeyBvcmRlciwgY2hpbGRyZW4gfSA9IHByb3BzO1xuXG4gICAgdGhpcy5Nb3Rpb25zID0ge307XG4gICAgdGhpcy5uZXh0UmVuZGVyQ2xlYXJNb3Rpb25zID0gZmFsc2U7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9wRGVsdGFZOiAwLFxuICAgICAgbW91c2VZOiAwLFxuICAgICAgaXNQcmVzc2VkOiBmYWxzZSxcbiAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogdW5kZWZpbmVkLFxuICAgICAgb3JkZXI6IFsuLi5vcmRlcl0sXG4gICAgICBuZXdPcmRlcjogWy4uLm9yZGVyXSxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgbmV3Q2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIH07XG5cbiAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZSA9IHJhZlNjaGQodGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgIHRoaXMuY2hpbGRyZW5NYXAgPSB7fTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIFt0aGlzLmNvbnRhaW5lciwgLi4uZmluZEFsbFBhcmVudE5vZGUodGhpcy5jb250YWluZXIpXS5mb3JFYWNoKChkb20pID0+IHtcbiAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuICAgIGNvbnN0IHsgb3JkZXIsIG5ld09yZGVyIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgbGFzdEFjdGlvbk1vdmVJRCwgbGFzdE1vdmVJRCwgY2hpbGRyZW4gfSA9IG5leHRQcm9wcztcblxuICAgIGlmIChcbiAgICAgIG9yZGVyLmxlbmd0aCA9PT0gbmV4dFByb3BzLm9yZGVyLmxlbmd0aFxuICAgICAgJiYgSlNPTi5zdHJpbmdpZnkob3JkZXIpICE9PSBKU09OLnN0cmluZ2lmeShuZXh0UHJvcHMub3JkZXIpXG4gICAgICAmJiBpc0V4aXN0KGxhc3RBY3Rpb25Nb3ZlSUQpXG4gICAgICAmJiBpc0V4aXN0KGxhc3RNb3ZlSUQpXG4gICAgKSB7XG4gICAgICBhd2FpdCB0aGlzLmNsZWFyTW90aW9ucygpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIC8vIG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiBsYXN0QWN0aW9uTW92ZUlELFxuICAgICAgICBpc1ByZXNzZWQ6IHRydWUsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5zZXRNb3VzZVkoXG4gICAgICAgIHRoaXMuY2hpbGRyZW5NYXBbbGFzdE1vdmVJRF0ucmVmLm9mZnNldFRvcFxuICAgICAgICAtIHRoaXMuY2hpbGRyZW5NYXBbbGFzdEFjdGlvbk1vdmVJRF0ucmVmLm9mZnNldFRvcCxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0gfSk7XG5cbiAgICAgIGF3YWl0IHNsZWVwKGFuaW1EdXJhdGlvbik7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ByZXNzZWQ6IGZhbHNlIH0pO1xuXG4gICAgICBhd2FpdCBzbGVlcCgyMDApO1xuXG4gICAgICBhd2FpdCB0aGlzLmNsZWFyTW90aW9ucygpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLFxuICAgICAgICBvcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogdW5kZWZpbmVkLFxuICAgICAgICBjaGlsZHJlbixcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2xlYXJNb3Rpb25zKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgY2hpbGRyZW4sIG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSwgb3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlLCBzbmFwc2hvdCkge1xuICAgIHRoaXMubmV4dFJlbmRlckNsZWFyTW90aW9ucyA9IGZhbHNlO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgW3RoaXMuY29udGFpbmVyLCAuLi5maW5kQWxsUGFyZW50Tm9kZSh0aGlzLmNvbnRhaW5lcildLmZvckVhY2goKGRvbSkgPT4ge1xuICAgICAgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzUHJlc3NlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGlzdGVuZXIgPSAoeyBtb3ZlID0gdHJ1ZSB9ID0ge30pID0+IHtcbiAgICBtb3ZlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIG1vdmUgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gIH1cblxuICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gIH1cblxuICBoYW5kbGVTdGFydCA9IChlLCBmdW5jID0gKCkgPT4ge30pID0+IHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCk7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcih7IG1vdmU6IGZhbHNlIH0pO1xuXG4gICAgLy8gY29uc3QgYSA9ICtuZXcgRGF0ZSgpO1xuICAgIGlmICghcHJlc3NUaW1lcikge1xuICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5jbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCtuZXcgRGF0ZSgpIC0gYSk7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcigpO1xuICAgICAgICBmdW5jKCk7XG4gICAgICB9LCA3MDApO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVRvdWNoU3RhcnQgPSAoZSwgSUQsIHByZXNzWSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVUb3VjaFN0YXJ0Jyk7XG4gICAgZS5wZXJzaXN0KCk7XG4gICAgLy8gY29uc3QgeyB0b3AgfSA9IGUuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRoaXMuaGFuZGxlU3RhcnQoZSwgKCkgPT4ge1xuICAgICAgY29uc3QgZXZlbnQgPSBlLnRvdWNoZXNbMF07XG4gICAgICBjb25zdCB7IHBhZ2VZIH0gPSBldmVudDtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRvcERlbHRhWTogcGFnZVkgLSBwcmVzc1ksXG4gICAgICAgIG1vdXNlWTogcHJlc3NZLFxuICAgICAgICBpc1ByZXNzZWQ6IHRydWUsXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogSUQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVNb3VzZURvd24gPSAoZSwgSUQsIHByZXNzWSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZURvd24nKTtcbiAgICBjb25zdCB7IHBhZ2VZIH0gPSBlO1xuXG4gICAgdGhpcy5oYW5kbGVTdGFydChlLCAoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhwYWdlWSwgcHJlc3NZKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0b3BEZWx0YVk6IHBhZ2VZIC0gcHJlc3NZLFxuICAgICAgICBtb3VzZVk6IHByZXNzWSxcbiAgICAgICAgaXNQcmVzc2VkOiB0cnVlLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IElELFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlVG91Y2hNb3ZlID0gKGUpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlVG91Y2hNb3ZlJyk7XG4gICAgY29uc3QgeyBpc1ByZXNzZWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAvLyBwcmVzc1RpbWVyID0gY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuXG4gICAgaWYgKGlzUHJlc3NlZCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVNb3VzZU1vdmUoZS50b3VjaGVzWzBdKTtcbiAgICB9XG4gIH07XG5cbiAgcmVPcmRlciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsIG5ld09yZGVyLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgY3VyckluZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQpO1xuICAgIGNvbnN0IHJlYWxSb3cgPSBuZXdPcmRlci5yZWR1Y2UoKHJvdywgSUQpID0+IHtcbiAgICAgIGlmIChvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEKSB7XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihJRCk7XG4gICAgICBjb25zdCB7IHJlZjogeyBvZmZzZXRIZWlnaHQsIG9mZnNldFRvcCB9LCBzdHlsZTogY3VyclN0eWxlIH0gPSB0aGlzLmNoaWxkcmVuTWFwW0lEXTtcbiAgICAgIGNvbnN0IHRvcCA9IG9mZnNldFRvcCArIGN1cnJTdHlsZS55O1xuICAgICAgY29uc3QgYm90dG9tID0gdG9wICsgb2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAvLyBjb25zdCB7IHRvcCwgYm90dG9tIH0gPSB0aGlzLmNoaWxkcmVuTWFwW0lEXS5yZWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCB7IHJlZjogY3Vyc29yLCBzdHlsZSB9ID0gdGhpcy5jaGlsZHJlbk1hcFtvcmlnaW5hbFBvc09mTGFzdFByZXNzZWRdO1xuICAgICAgY29uc3QgeyBvZmZzZXRUb3A6IGN1cnNvck9mZnNldFRvcCwgb2Zmc2V0SGVpZ2h0OiBjdXJzb3JPZmZzZXRIZWlnaHQgfSA9IGN1cnNvcjtcblxuICAgICAgY29uc3QgY3Vyc29yTWlkZGxlTGluZSA9IGN1cnNvck9mZnNldFRvcCArIHN0eWxlLnkgKyAoY3Vyc29yT2Zmc2V0SGVpZ2h0IC8gMik7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnNvck1pZGRsZUxpbmUsIHRvcCArIChvZmZzZXRIZWlnaHQgLyA0KSwgYm90dG9tIC0gKG9mZnNldEhlaWdodCAvIDQpLCBJRCk7XG4gICAgICBpZiAoXG4gICAgICAgIGN1cnNvck1pZGRsZUxpbmUgPiB0b3AgKyAob2Zmc2V0SGVpZ2h0IC8gNClcbiAgICAgICAgJiYgY3Vyc29yTWlkZGxlTGluZSA8IGJvdHRvbSAtIChvZmZzZXRIZWlnaHQgLyA0KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByb3c7XG4gICAgfSwgY3VyckluZGV4KTtcblxuICAgIGNvbnN0IG9yaWdpbkluZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQpO1xuXG4gICAgaWYgKG9yaWdpbkluZGV4ICE9PSByZWFsUm93KSB7XG4gICAgICBjb25zdCBuZXh0TmV3T3JkZXIgPSByZWluc2VydChuZXdPcmRlciwgb3JpZ2luSW5kZXgsIHJlYWxSb3cpO1xuICAgICAgcmV0dXJuIG5leHROZXdPcmRlcjtcbiAgICB9XG4gICAgcmV0dXJuIG5ld09yZGVyO1xuICB9XG5cbiAgc2V0TW91c2VZID0gbW91c2VZID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG1vdXNlWSB9LCAoKSA9PiB7XG4gICAgICBzbGVlcCgzMDApLnRoZW4ocik7XG4gICAgfSk7XG4gIH0pXG5cbiAgaGFuZGxlTW91c2VNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNlTW92ZScpO1xuICAgIGNvbnN0IHsgcGFnZVkgfSA9IGV2ZW50O1xuXG4gICAgY29uc3Qge1xuICAgICAgaXNQcmVzc2VkLCB0b3BEZWx0YVksIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCwgbmV3T3JkZXIsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBtb3VzZVkgPSBwYWdlWSAtIHRvcERlbHRhWTtcblxuICAgIHRoaXMuc2V0TW91c2VZKG1vdXNlWSk7XG5cbiAgICBpZiAoaXNQcmVzc2VkICYmICF0aGlzLm1vdmVpbmcpIHtcbiAgICAgIGlmICgrbmV3IERhdGUoKSAtIHRoaXMucHJlVGltZSA8IGFuaW1EdXJhdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0TmV3T3JkZXIgPSB0aGlzLnJlT3JkZXIoKTtcblxuICAgICAgaWYgKG5ld09yZGVyICE9PSBuZXh0TmV3T3JkZXIpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV4dE5ld09yZGVyXSB9KTtcblxuICAgICAgICB0aGlzLnByZVRpbWUgPSArbmV3IERhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gfSk7XG4gIH07XG5cbiAgY2hhbmdlRG9uZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNoYW5nZURvbmUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICB0aGlzLmNsZWFyTW90aW9ucyhhbmltRHVyYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgeyBuZXdPcmRlciB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBuZXdPcmRlcjogWy4uLm5ld09yZGVyXSwgb3JkZXI6IFsuLi5uZXdPcmRlcl0gfSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdG9wRGVsdGFZOiAwLCBtb3VzZVk6IDAsIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogdW5kZWZpbmVkIH0pO1xuICAgICAgY2hhbmdlRG9uZShuZXdPcmRlcik7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVNb3VzZVVwID0gKGUpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlTW91c2VVcCcpO1xuICAgIGNvbnN0IHsgaXNQcmVzc2VkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcHJlc3NUaW1lciA9IHdpbmRvdy5jbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuXG4gICAgaWYgKGlzUHJlc3NlZCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ29uRHJvcCcpO1xuICAgICAgdGhpcy5jaGFuZ2VEb25lKCk7XG4gICAgfVxuICB9O1xuXG4gIGNsZWFyTW90aW9ucyA9ZGVsYXkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubmV4dFJlbmRlckNsZWFyTW90aW9ucyA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHt9LCByKTtcbiAgICB9LCBkZWxheSk7XG4gIH0pXG5cbiAgZ2V0Q29udGFpbmVyID0gKHJlZikgPT4ge1xuICAgIHRoaXMuY29udGFpbmVyID0gcmVmO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1vdXNlWSwgaXNQcmVzc2VkLCBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsIG5ld09yZGVyLCBvcmRlciA9IFtdLCBjaGlsZHJlbiwgbmV3Q2hpbGRyZW4sXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCB7XG4gICAgICBjbGVhck1vdGlvbnMsIHByZXNzZWRNb3Rpb25zLCBub3RQcmVzc2VkTW90aW9ucywgY3JlYXRlU3R5bGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zIH0gPSB0aGlzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdkcmFnLWNvbnRhaW5lcicpfSAke3ByZWZpeCgnbWFwLWNvbnRhaW5lcicpfWAgfSByZWY9eyB0aGlzLmdldENvbnRhaW5lciB9PlxuICAgICAgICB7b3JkZXIubWFwKChJRCwgaW5kZXgpID0+IHtcbiAgICAgICAgICBsZXQgeSA9IDA7XG4gICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBuZXdPcmRlci5pbmRleE9mKElEKTtcblxuICAgICAgICAgIGlmIChvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICYmICFpc1ByZXNzZWQpIHtcbiAgICAgICAgICAvLyBpZiAob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCApIHtcbiAgICAgICAgICAgIGxldCBub3dZID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhcnRJbmRleCwgZW5kSW5kZXggfSA9IG5ld0luZGV4IC0gaW5kZXggPiAwXG4gICAgICAgICAgICAgID8gKHsgc3RhcnRJbmRleDogaW5kZXgsIGVuZEluZGV4OiBuZXdJbmRleCB9KVxuICAgICAgICAgICAgICA6ICh7IHN0YXJ0SW5kZXg6IG5ld0luZGV4LCBlbmRJbmRleDogaW5kZXggfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgcmVmOiB7IG9mZnNldEhlaWdodCB9LFxuICAgICAgICAgICAgICB9ID0gdGhpcy5jaGlsZHJlbk1hcFsobmV3SW5kZXggLSBpbmRleCA+IDAgPyBuZXdPcmRlciA6IG9yZGVyKVtpXV07XG4gICAgICAgICAgICAgIG5vd1kgKz0gb2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeSA9IG5ld0luZGV4IC0gaW5kZXggPiAwID8gbm93WSA6IC1ub3dZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggIT09IG5ld0luZGV4KSB7XG4gICAgICAgICAgICB5ID0gKG5ld0luZGV4IC0gaW5kZXggPiAwID8gMSA6IC0xKVxuICAgICAgICAgICAgICAgICogdGhpcy5jaGlsZHJlbk1hcFtvcmlnaW5hbFBvc09mTGFzdFByZXNzZWRdLnJlZi5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc3R5bGUgPSBuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgLi4uY2xlYXJNb3Rpb25zKCksXG4gICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgJiYgaXNQcmVzc2VkXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIC4uLnByZXNzZWRNb3Rpb25zKCksXG4gICAgICAgICAgICAgICAgeTogc3ByaW5nKG1vdXNlWSwgeyBzdGlmZm5lc3M6IDUwMCwgZGFtcGluZzogNTAgfSksXG4gICAgICAgICAgICAgIC8vIHk6IG1vdXNlWSxcbiAgICAgICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAgICAuLi5ub3RQcmVzc2VkTW90aW9ucygpLFxuICAgICAgICAgICAgICAgIHk6IHNwcmluZyh5LCBzcHJpbmdDb25maWcpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TW90aW9uIHN0eWxlPXsgc3R5bGUgfSBrZXk9eyBJRCB9IHJlZj17IHJlZiA9PiB0aGlzLk1vdGlvbnNbSURdID0gcmVmIH0+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKElELCAnICcsIHkpO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS50cmFjZShJRCwgJyAnLCB5KTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZScsICcgJywgc2NhbGUpO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NoYWRvdycsICcgJywgc2hhZG93KTtcbiAgICAgICAgICAgICAgIChzdHlsZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoaWxkcmVuTWFwW0lEXSkgdGhpcy5jaGlsZHJlbk1hcFtJRF0gPSB7fTtcbiAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbk1hcFtJRF0uc3R5bGUgPSB7IHk6IHN0eWxlcy55IH07XG5cbiAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCwgSUQsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgICByZWY9eyAocmVmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5NYXBbSURdLnJlZiA9IHJlZjtcbiAgICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgZXZlbnQgPT4gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KGV2ZW50LCBJRCwgeSkgfVxuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1pdGVtLXdyYXAnKX0gJHtvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICYmIGlzUHJlc3NlZCA/IHByZWZpeCgnZ3JvdXAtaXRlbS13cmFwLXByZXNzZWQnKSA6ICcnfWAgfVxuICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7XG4gICAgICAgICAgICAgICAgICAgICAgIC4uLmNyZWF0ZVN0eWxlKHsgc3R5bGVzLCBJRCwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IElEID09PSBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPyA5OSA6IElELFxuICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogSUQgPT09IG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA/ICdyZWxhdGl2ZScgOiAndW5zZXQnLFxuICAgICAgICAgICAgICAgICAgICAgfSB9PlxuICAgICAgICAgICAgICAgICAgICAgeyBjaGlsZHJlbltJRF0gfVxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L01vdGlvbj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRHJhZy5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoYW5nZURvbmU6ICgpID0+IHt9LFxuICBjbGVhck1vdGlvbnM6ICgpID0+ICh7XG4gICAgc2NhbGU6IDEsXG4gICAgc2hhZG93OiAwLFxuICB9KSxcbiAgcHJlc3NlZE1vdGlvbnM6ICgpID0+ICh7XG4gICAgc2NhbGU6IHNwcmluZygwLjYsIHNwcmluZ0NvbmZpZyksXG4gICAgc2hhZG93OiBzcHJpbmcoMTYsIHNwcmluZ0NvbmZpZyksXG4gICAgLy8geTogbW91c2VZLFxuICB9KSxcbiAgbm90UHJlc3NlZE1vdGlvbnM6ICgpID0+ICh7XG4gICAgc2NhbGU6IHNwcmluZygxLCBzcHJpbmdDb25maWcpLFxuICAgIHNoYWRvdzogc3ByaW5nKDAsIHNwcmluZ0NvbmZpZyksXG4gIH0pLFxuICBjcmVhdGVTdHlsZTogKHtcbiAgICBzdHlsZXM6IHtcbiAgICAgIHNjYWxlLFxuICAgICAgc2hhZG93LFxuICAgICAgeSxcbiAgICB9LFxuICAgIC8vIElELFxuICAgIC8vIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCxcbiAgfSA9IHt9KSA9PiAoe1xuICAgIGJveFNoYWRvdzogYHJnYmEoMCwgMCwgMCwgMC4yKSAwcHggJHtzaGFkb3d9cHggJHsyICogc2hhZG93fXB4IDBweGAsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHt5fXB4LCAwKSBzY2FsZSgke3NjYWxlfSlgLFxuICAgIFdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYCxcbiAgfSksXG59O1xuIl19