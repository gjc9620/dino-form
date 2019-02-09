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
      debugger;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EcmFnLmpzeCJdLCJuYW1lcyI6WyJmaW5kQWxsUGFyZW50Tm9kZSIsIm5vZGUiLCJlbHMiLCJ3aW5kb3ciLCJjdXJyTm9kZSIsInVuc2hpZnQiLCJwYXJlbnROb2RlIiwicmVpbnNlcnQiLCJhcnIiLCJmcm9tIiwidG8iLCJfYXJyIiwic2xpY2UiLCJ2YWwiLCJzcGxpY2UiLCJhbmltRHVyYXRpb24iLCJzcHJpbmdDb25maWciLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicHJlc3NUaW1lciIsIkRyYWciLCJwcm9wcyIsImNsZWFyVGltZW91dCIsInN0YXRlIiwiaXNQcmVzc2VkIiwic2V0U3RhdGUiLCJtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVRvdWNoTW92ZSIsInBhc3NpdmUiLCJoYW5kbGVNb3VzZVVwIiwiaGFuZGxlTW91c2VNb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImUiLCJmdW5jIiwicmVtb3ZlTGlzdGVuZXIiLCJhZGRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJJRCIsInByZXNzWSIsInBlcnNpc3QiLCJoYW5kbGVTdGFydCIsImV2ZW50IiwidG91Y2hlcyIsInBhZ2VZIiwidG9wRGVsdGFZIiwibW91c2VZIiwib3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkIiwicHJldmVudERlZmF1bHQiLCJuZXdPcmRlciIsImN1cnJJbmRleCIsImluZGV4T2YiLCJyZWFsUm93IiwicmVkdWNlIiwicm93IiwiaW5kZXgiLCJjaGlsZHJlbk1hcCIsInJlZiIsIm9mZnNldEhlaWdodCIsIm9mZnNldFRvcCIsImN1cnJTdHlsZSIsInN0eWxlIiwidG9wIiwieSIsImJvdHRvbSIsImN1cnNvciIsImN1cnNvck9mZnNldFRvcCIsImN1cnNvck9mZnNldEhlaWdodCIsImN1cnNvck1pZGRsZUxpbmUiLCJvcmlnaW5JbmRleCIsIm5leHROZXdPcmRlciIsInIiLCJ0aGVuIiwic2V0TW91c2VZIiwibW92ZWluZyIsIkRhdGUiLCJwcmVUaW1lIiwicmVPcmRlciIsImNoYW5nZURvbmUiLCJjbGVhck1vdGlvbnMiLCJvcmRlciIsInVuZGVmaW5lZCIsImRlbGF5IiwibmV4dFJlbmRlckNsZWFyTW90aW9ucyIsImNvbnRhaW5lciIsImNoaWxkcmVuIiwiTW90aW9ucyIsIm5ld0NoaWxkcmVuIiwiZm9yRWFjaCIsImRvbSIsIm9uU2Nyb2xsIiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJsYXN0QWN0aW9uTW92ZUlEIiwibGFzdE1vdmVJRCIsImxlbmd0aCIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsInNuYXBzaG90IiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiZ2V0Q29udGFpbmVyIiwibWFwIiwibmV3SW5kZXgiLCJub3dZIiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwiaSIsInN0eWxlcyIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZVRvdWNoU3RhcnQiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInNjYWxlIiwic2hhZG93IiwiYm94U2hhZG93IiwidHJhbnNmb3JtIiwiV2Via2l0VHJhbnNmb3JtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBS0E7QUFFQSxTQUFTQSxpQkFBVCxDQUEyQkMsSUFBM0IsRUFBaUM7QUFDL0IsTUFBTUMsR0FBRyxHQUFHLENBQUNDLE1BQUQsQ0FBWjtBQUNBLE1BQUlDLFFBQVEsR0FBR0gsSUFBZjs7QUFDQSxTQUFPRyxRQUFQLEVBQWlCO0FBQ2ZGLElBQUFBLEdBQUcsQ0FBQ0csT0FBSixDQUFZRCxRQUFaO0FBQ0FBLElBQUFBLFFBQVEsR0FBR0EsUUFBUSxDQUFDRSxVQUFwQjtBQUNEOztBQUNELFNBQU9KLEdBQVA7QUFDRDs7QUFHRCxTQUFTSyxRQUFULENBQWtCQyxHQUFsQixFQUF1QkMsSUFBdkIs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RTtBQUFBLG9GQVFULEVBUlM7QUFBQSw2QkFDWFEsTUFEVztBQUFBLFFBRVRPLEtBRlMsZ0JBRVRBLEtBRlM7QUFBQSxRQUdUQyxNQUhTLGdCQUdUQSxNQUhTO0FBQUEsUUFJVHRELENBSlMsZ0JBSVRBLENBSlM7O0FBQUEsV0FRRDtBQUNWdUQsTUFBQUEsU0FBUyxtQ0FBNEJELE1BQTVCLGdCQUF3QyxJQUFJQSxNQUE1QyxXQURDO0FBRVZFLE1BQUFBLFNBQVMsMkJBQW9CeEQsQ0FBcEIsMEJBQXFDcUQsS0FBckMsTUFGQztBQUdWSSxNQUFBQSxlQUFlLDJCQUFvQnpELENBQXBCLDBCQUFxQ3FELEtBQXJDO0FBSEwsS0FSQztBQUFBO0FBZkssQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTW90aW9uLCBzcHJpbmcgfSBmcm9tICdyZWFjdC1tb3Rpb24nO1xuaW1wb3J0IHJhZlNjaGQgZnJvbSAncmFmLXNjaGQnO1xuaW1wb3J0IHsgcHJlZml4LCBzbGVlcCwgaXNFeGlzdCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB7IHNwcmluZyB9IGZyb20gJ3JlYWN0LW1vdGlvbic7XG5cblxuLy8gdG9kbyBhdXRvIHNjcm9sbFxuXG5mdW5jdGlvbiBmaW5kQWxsUGFyZW50Tm9kZShub2RlKSB7XG4gIGNvbnN0IGVscyA9IFt3aW5kb3ddO1xuICBsZXQgY3Vyck5vZGUgPSBub2RlO1xuICB3aGlsZSAoY3Vyck5vZGUpIHtcbiAgICBlbHMudW5zaGlmdChjdXJyTm9kZSk7XG4gICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBlbHM7XG59XG5cblxuZnVuY3Rpb24gcmVpbnNlcnQoYXJyLCBmcm9tLCB0bykge1xuICBjb25zdCBfYXJyID0gYXJyLnNsaWNlKDApO1xuICBjb25zdCB2YWwgPSBfYXJyW2Zyb21dO1xuICBfYXJyLnNwbGljZShmcm9tLCAxKTtcbiAgX2Fyci5zcGxpY2UodG8sIDAsIHZhbCk7XG4gIHJldHVybiBfYXJyO1xufVxuXG5jb25zdCBhbmltRHVyYXRpb24gPSAzMDA7XG5cbmNvbnN0IHNwcmluZ0NvbmZpZyA9IHsgc3RpZmZuZXNzOiAyMDAsIGRhbXBpbmc6IDIwIH07XG5cbmxldCBwcmVzc1RpbWVyO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWcgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IG9yZGVyLCBjaGlsZHJlbiB9ID0gcHJvcHM7XG5cbiAgICB0aGlzLk1vdGlvbnMgPSB7fTtcbiAgICB0aGlzLm5leHRSZW5kZXJDbGVhck1vdGlvbnMgPSBmYWxzZTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b3BEZWx0YVk6IDAsXG4gICAgICBtb3VzZVk6IDAsXG4gICAgICBpc1ByZXNzZWQ6IGZhbHNlLFxuICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgICBvcmRlcjogWy4uLm9yZGVyXSxcbiAgICAgIG5ld09yZGVyOiBbLi4ub3JkZXJdLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBuZXdDaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgfTtcblxuICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlID0gcmFmU2NoZCh0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgdGhpcy5jaGlsZHJlbk1hcCA9IHt9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgW3RoaXMuY29udGFpbmVyLCAuLi5maW5kQWxsUGFyZW50Tm9kZSh0aGlzLmNvbnRhaW5lcildLmZvckVhY2goKGRvbSkgPT4ge1xuICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAgY29uc3QgeyBvcmRlciwgbmV3T3JkZXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBsYXN0QWN0aW9uTW92ZUlELCBsYXN0TW92ZUlELCBjaGlsZHJlbiB9ID0gbmV4dFByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgb3JkZXIubGVuZ3RoID09PSBuZXh0UHJvcHMub3JkZXIubGVuZ3RoXG4gICAgICAmJiBKU09OLnN0cmluZ2lmeShvcmRlcikgIT09IEpTT04uc3RyaW5naWZ5KG5leHRQcm9wcy5vcmRlcilcbiAgICAgICYmIGlzRXhpc3QobGFzdEFjdGlvbk1vdmVJRClcbiAgICAgICYmIGlzRXhpc3QobGFzdE1vdmVJRClcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMuY2xlYXJNb3Rpb25zKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgLy8gbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IGxhc3RBY3Rpb25Nb3ZlSUQsXG4gICAgICAgIGlzUHJlc3NlZDogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNldE1vdXNlWShcbiAgICAgICAgdGhpcy5jaGlsZHJlbk1hcFtsYXN0TW92ZUlEXS5yZWYub2Zmc2V0VG9wXG4gICAgICAgIC0gdGhpcy5jaGlsZHJlbk1hcFtsYXN0QWN0aW9uTW92ZUlEXS5yZWYub2Zmc2V0VG9wLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSB9KTtcblxuICAgICAgYXdhaXQgc2xlZXAoYW5pbUR1cmF0aW9uKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG5cbiAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAgIGF3YWl0IHRoaXMuY2xlYXJNb3Rpb25zKCk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sXG4gICAgICAgIG9yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhck1vdGlvbnMoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGlsZHJlbiwgbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLCBvcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0gfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XG4gICAgdGhpcy5uZXh0UmVuZGVyQ2xlYXJNb3Rpb25zID0gZmFsc2U7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBbdGhpcy5jb250YWluZXIsIC4uLmZpbmRBbGxQYXJlbnROb2RlKHRoaXMuY29udGFpbmVyKV0uZm9yRWFjaCgoZG9tKSA9PiB7XG4gICAgICBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgfSk7XG4gIH1cblxuICBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNQcmVzc2VkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNQcmVzc2VkOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBhZGRMaXN0ZW5lciA9ICh7IG1vdmUgPSB0cnVlIH0gPSB7fSkgPT4ge1xuICAgIG1vdmUgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gICAgbW92ZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgfVxuXG4gIHJlbW92ZUxpc3RlbmVyID0gKCkgPT4ge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgfVxuXG4gIGhhbmRsZVN0YXJ0ID0gKGUsIGZ1bmMgPSAoKSA9PiB7fSkgPT4ge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICB0aGlzLmFkZExpc3RlbmVyKHsgbW92ZTogZmFsc2UgfSk7XG5cbiAgICAvLyBjb25zdCBhID0gK25ldyBEYXRlKCk7XG4gICAgaWYgKCFwcmVzc1RpbWVyKSB7XG4gICAgICBwcmVzc1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwcmVzc1RpbWVyID0gd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coK25ldyBEYXRlKCkgLSBhKTtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCk7XG4gICAgICAgIGZ1bmMoKTtcbiAgICAgIH0sIDcwMCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlVG91Y2hTdGFydCA9IChlLCBJRCwgcHJlc3NZKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZVRvdWNoU3RhcnQnKTtcbiAgICBlLnBlcnNpc3QoKTtcbiAgICAvLyBjb25zdCB7IHRvcCB9ID0gZS5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy5oYW5kbGVTdGFydChlLCAoKSA9PiB7XG4gICAgICBjb25zdCBldmVudCA9IGUudG91Y2hlc1swXTtcbiAgICAgIGNvbnN0IHsgcGFnZVkgfSA9IGV2ZW50O1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdG9wRGVsdGFZOiBwYWdlWSAtIHByZXNzWSxcbiAgICAgICAgbW91c2VZOiBwcmVzc1ksXG4gICAgICAgIGlzUHJlc3NlZDogdHJ1ZSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiBJRCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZU1vdXNlRG93biA9IChlLCBJRCwgcHJlc3NZKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNlRG93bicpO1xuICAgIGNvbnN0IHsgcGFnZVkgfSA9IGU7XG5cbiAgICB0aGlzLmhhbmRsZVN0YXJ0KGUsICgpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhZ2VZLCBwcmVzc1kpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRvcERlbHRhWTogcGFnZVkgLSBwcmVzc1ksXG4gICAgICAgIG1vdXNlWTogcHJlc3NZLFxuICAgICAgICBpc1ByZXNzZWQ6IHRydWUsXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogSUQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVUb3VjaE1vdmUgPSAoZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVUb3VjaE1vdmUnKTtcbiAgICBjb25zdCB7IGlzUHJlc3NlZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIC8vIHByZXNzVGltZXIgPSBjbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG5cbiAgICBpZiAoaXNQcmVzc2VkKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZShlLnRvdWNoZXNbMF0pO1xuICAgIH1cbiAgfTtcblxuICByZU9yZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCwgbmV3T3JkZXIsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBjdXJySW5kZXggPSBuZXdPcmRlci5pbmRleE9mKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCk7XG4gICAgY29uc3QgcmVhbFJvdyA9IG5ld09yZGVyLnJlZHVjZSgocm93LCBJRCkgPT4ge1xuICAgICAgaWYgKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQpIHtcbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5kZXggPSBuZXdPcmRlci5pbmRleE9mKElEKTtcbiAgICAgIGNvbnN0IHsgcmVmOiB7IG9mZnNldEhlaWdodCwgb2Zmc2V0VG9wIH0sIHN0eWxlOiBjdXJyU3R5bGUgfSA9IHRoaXMuY2hpbGRyZW5NYXBbSURdO1xuICAgICAgY29uc3QgdG9wID0gb2Zmc2V0VG9wICsgY3VyclN0eWxlLnk7XG4gICAgICBjb25zdCBib3R0b20gPSB0b3AgKyBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgIC8vIGNvbnN0IHsgdG9wLCBib3R0b20gfSA9IHRoaXMuY2hpbGRyZW5NYXBbSURdLnJlZi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHsgcmVmOiBjdXJzb3IsIHN0eWxlIH0gPSB0aGlzLmNoaWxkcmVuTWFwW29yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZF07XG4gICAgICBjb25zdCB7IG9mZnNldFRvcDogY3Vyc29yT2Zmc2V0VG9wLCBvZmZzZXRIZWlnaHQ6IGN1cnNvck9mZnNldEhlaWdodCB9ID0gY3Vyc29yO1xuXG4gICAgICBjb25zdCBjdXJzb3JNaWRkbGVMaW5lID0gY3Vyc29yT2Zmc2V0VG9wICsgc3R5bGUueSArIChjdXJzb3JPZmZzZXRIZWlnaHQgLyAyKTtcblxuICAgICAgLy8gY29uc29sZS5sb2coY3Vyc29yTWlkZGxlTGluZSwgdG9wICsgKG9mZnNldEhlaWdodCAvIDQpLCBib3R0b20gLSAob2Zmc2V0SGVpZ2h0IC8gNCksIElEKTtcbiAgICAgIGlmIChcbiAgICAgICAgY3Vyc29yTWlkZGxlTGluZSA+IHRvcCArIChvZmZzZXRIZWlnaHQgLyA0KVxuICAgICAgICAmJiBjdXJzb3JNaWRkbGVMaW5lIDwgYm90dG9tIC0gKG9mZnNldEhlaWdodCAvIDQpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJvdztcbiAgICB9LCBjdXJySW5kZXgpO1xuXG4gICAgY29uc3Qgb3JpZ2luSW5kZXggPSBuZXdPcmRlci5pbmRleE9mKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCk7XG5cbiAgICBpZiAob3JpZ2luSW5kZXggIT09IHJlYWxSb3cpIHtcbiAgICAgIGNvbnN0IG5leHROZXdPcmRlciA9IHJlaW5zZXJ0KG5ld09yZGVyLCBvcmlnaW5JbmRleCwgcmVhbFJvdyk7XG4gICAgICByZXR1cm4gbmV4dE5ld09yZGVyO1xuICAgIH1cbiAgICByZXR1cm4gbmV3T3JkZXI7XG4gIH1cblxuICBzZXRNb3VzZVkgPSBtb3VzZVkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgbW91c2VZIH0sICgpID0+IHtcbiAgICAgIHNsZWVwKDMwMCkudGhlbihyKTtcbiAgICB9KTtcbiAgfSlcblxuICBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlTW91c2VNb3ZlJyk7XG4gICAgY29uc3QgeyBwYWdlWSB9ID0gZXZlbnQ7XG5cbiAgICBjb25zdCB7XG4gICAgICBpc1ByZXNzZWQsIHRvcERlbHRhWSwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkLCBuZXdPcmRlcixcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IG1vdXNlWSA9IHBhZ2VZIC0gdG9wRGVsdGFZO1xuXG4gICAgdGhpcy5zZXRNb3VzZVkobW91c2VZKTtcblxuICAgIGlmIChpc1ByZXNzZWQgJiYgIXRoaXMubW92ZWluZykge1xuICAgICAgaWYgKCtuZXcgRGF0ZSgpIC0gdGhpcy5wcmVUaW1lIDwgYW5pbUR1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5leHROZXdPcmRlciA9IHRoaXMucmVPcmRlcigpO1xuXG4gICAgICBpZiAobmV3T3JkZXIgIT09IG5leHROZXdPcmRlcikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbmV3T3JkZXI6IFsuLi5uZXh0TmV3T3JkZXJdIH0pO1xuXG4gICAgICAgIHRoaXMucHJlVGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyB9KTtcbiAgfTtcblxuICBjaGFuZ2VEb25lID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hhbmdlRG9uZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuY2xlYXJNb3Rpb25zKGFuaW1EdXJhdGlvbikudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCB7IG5ld09yZGVyIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV3T3JkZXJdLCBvcmRlcjogWy4uLm5ld09yZGVyXSB9KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b3BEZWx0YVk6IDAsIG1vdXNlWTogMCwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQgfSk7XG4gICAgICBjaGFuZ2VEb25lKG5ld09yZGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlVXAgPSAoZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZVVwJyk7XG4gICAgY29uc3QgeyBpc1ByZXNzZWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBwcmVzc1RpbWVyID0gd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQcmVzc2VkOiBmYWxzZSB9KTtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCk7XG5cbiAgICBpZiAoaXNQcmVzc2VkKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnb25Ecm9wJyk7XG4gICAgICB0aGlzLmNoYW5nZURvbmUoKTtcbiAgICB9XG4gIH07XG5cbiAgY2xlYXJNb3Rpb25zID1kZWxheSA9PiBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5uZXh0UmVuZGVyQ2xlYXJNb3Rpb25zID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgIH0sIGRlbGF5KTtcbiAgfSlcblxuICBnZXRDb250YWluZXIgPSAocmVmKSA9PiB7XG4gICAgdGhpcy5jb250YWluZXIgPSByZWY7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbW91c2VZLCBpc1ByZXNzZWQsIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCwgbmV3T3JkZXIsIG9yZGVyID0gW10sIGNoaWxkcmVuLCBuZXdDaGlsZHJlbixcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGNsZWFyTW90aW9ucywgcHJlc3NlZE1vdGlvbnMsIG5vdFByZXNzZWRNb3Rpb25zLCBjcmVhdGVTdHlsZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBcbiAgICBkZWJ1Z2dlclxuICAgIFxuICAgIGNvbnN0IHsgbmV4dFJlbmRlckNsZWFyTW90aW9ucyB9ID0gdGhpcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZHJhZy1jb250YWluZXInKX0gJHtwcmVmaXgoJ21hcC1jb250YWluZXInKX1gIH0gcmVmPXsgdGhpcy5nZXRDb250YWluZXIgfT5cbiAgICAgICAge29yZGVyLm1hcCgoSUQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgbGV0IHkgPSAwO1xuICAgICAgICAgIGNvbnN0IG5ld0luZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihJRCk7XG5cbiAgICAgICAgICBpZiAob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCAmJiAhaXNQcmVzc2VkKSB7XG4gICAgICAgICAgLy8gaWYgKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgKSB7XG4gICAgICAgICAgICBsZXQgbm93WSA9IDA7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXJ0SW5kZXgsIGVuZEluZGV4IH0gPSBuZXdJbmRleCAtIGluZGV4ID4gMFxuICAgICAgICAgICAgICA/ICh7IHN0YXJ0SW5kZXg6IGluZGV4LCBlbmRJbmRleDogbmV3SW5kZXggfSlcbiAgICAgICAgICAgICAgOiAoeyBzdGFydEluZGV4OiBuZXdJbmRleCwgZW5kSW5kZXg6IGluZGV4IH0pO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHJlZjogeyBvZmZzZXRIZWlnaHQgfSxcbiAgICAgICAgICAgICAgfSA9IHRoaXMuY2hpbGRyZW5NYXBbKG5ld0luZGV4IC0gaW5kZXggPiAwID8gbmV3T3JkZXIgOiBvcmRlcilbaV1dO1xuICAgICAgICAgICAgICBub3dZICs9IG9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHkgPSBuZXdJbmRleCAtIGluZGV4ID4gMCA/IG5vd1kgOiAtbm93WTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ICE9PSBuZXdJbmRleCkge1xuICAgICAgICAgICAgeSA9IChuZXdJbmRleCAtIGluZGV4ID4gMCA/IDEgOiAtMSlcbiAgICAgICAgICAgICAgICAqIHRoaXMuY2hpbGRyZW5NYXBbb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkXS5yZWYub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHN0eWxlID0gbmV4dFJlbmRlckNsZWFyTW90aW9uc1xuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIC4uLmNsZWFyTW90aW9ucygpLFxuICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICYmIGlzUHJlc3NlZFxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAuLi5wcmVzc2VkTW90aW9ucygpLFxuICAgICAgICAgICAgICAgIHk6IHNwcmluZyhtb3VzZVksIHsgc3RpZmZuZXNzOiA1MDAsIGRhbXBpbmc6IDUwIH0pLFxuICAgICAgICAgICAgICAvLyB5OiBtb3VzZVksXG4gICAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgLi4ubm90UHJlc3NlZE1vdGlvbnMoKSxcbiAgICAgICAgICAgICAgICB5OiBzcHJpbmcoeSwgc3ByaW5nQ29uZmlnKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1vdGlvbiBzdHlsZT17IHN0eWxlIH0ga2V5PXsgSUQgfSByZWY9eyByZWYgPT4gdGhpcy5Nb3Rpb25zW0lEXSA9IHJlZiB9PlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhJRCwgJyAnLCB5KTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUudHJhY2UoSUQsICcgJywgeSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGUnLCAnICcsIHNjYWxlKTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzaGFkb3cnLCAnICcsIHNoYWRvdyk7XG4gICAgICAgICAgICAgICAoc3R5bGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZHJlbk1hcFtJRF0pIHRoaXMuY2hpbGRyZW5NYXBbSURdID0ge307XG4gICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5NYXBbSURdLnN0eWxlID0geyB5OiBzdHlsZXMueSB9O1xuXG4gICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249eyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQsIElELCB5KTtcbiAgICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPXsgKHJlZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuTWFwW0lEXS5yZWYgPSByZWY7XG4gICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IGV2ZW50ID0+IHRoaXMuaGFuZGxlVG91Y2hTdGFydChldmVudCwgSUQsIHkpIH1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZ3JvdXAtaXRlbS13cmFwJyl9ICR7b3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCAmJiBpc1ByZXNzZWQgPyBwcmVmaXgoJ2dyb3VwLWl0ZW0td3JhcC1wcmVzc2VkJykgOiAnJ31gIH1cbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsge1xuICAgICAgICAgICAgICAgICAgICAgICAuLi5jcmVhdGVTdHlsZSh7IHN0eWxlcywgSUQsIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiBJRCA9PT0gb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID8gOTkgOiBJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IElEID09PSBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPyAncmVsYXRpdmUnIDogJ3Vuc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgIH0gfT5cbiAgICAgICAgICAgICAgICAgICAgIHsgY2hpbGRyZW5bSURdIH1cbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9Nb3Rpb24+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRyYWcuZGVmYXVsdFByb3BzID0ge1xuICBjaGFuZ2VEb25lOiAoKSA9PiB7fSxcbiAgY2xlYXJNb3Rpb25zOiAoKSA9PiAoe1xuICAgIHNjYWxlOiAxLFxuICAgIHNoYWRvdzogMCxcbiAgfSksXG4gIHByZXNzZWRNb3Rpb25zOiAoKSA9PiAoe1xuICAgIHNjYWxlOiBzcHJpbmcoMC42LCBzcHJpbmdDb25maWcpLFxuICAgIHNoYWRvdzogc3ByaW5nKDE2LCBzcHJpbmdDb25maWcpLFxuICAgIC8vIHk6IG1vdXNlWSxcbiAgfSksXG4gIG5vdFByZXNzZWRNb3Rpb25zOiAoKSA9PiAoe1xuICAgIHNjYWxlOiBzcHJpbmcoMSwgc3ByaW5nQ29uZmlnKSxcbiAgICBzaGFkb3c6IHNwcmluZygwLCBzcHJpbmdDb25maWcpLFxuICB9KSxcbiAgY3JlYXRlU3R5bGU6ICh7XG4gICAgc3R5bGVzOiB7XG4gICAgICBzY2FsZSxcbiAgICAgIHNoYWRvdyxcbiAgICAgIHksXG4gICAgfSxcbiAgICAvLyBJRCxcbiAgICAvLyBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsXG4gIH0gPSB7fSkgPT4gKHtcbiAgICBib3hTaGFkb3c6IGByZ2JhKDAsIDAsIDAsIDAuMikgMHB4ICR7c2hhZG93fXB4ICR7MiAqIHNoYWRvd31weCAwcHhgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYCxcbiAgICBXZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke3l9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXG4gIH0pLFxufTtcbiJdfQ==