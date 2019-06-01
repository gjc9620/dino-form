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
      children: children
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
                return (0, _util.sleep)(springConfig.stiffness);

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
                this.setState({
                  children: children,
                  newOrder: (0, _toConsumableArray2.default)(nextProps.order),
                  order: (0, _toConsumableArray2.default)(nextProps.order)
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
      var _this3 = this;

      [this.container].concat((0, _toConsumableArray2.default)(findAllParentNode(this.container))).forEach(function (dom) {
        dom.removeEventListener('scroll', _this3.onScroll);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state4 = this.state,
          mouseY = _this$state4.mouseY,
          isPressed = _this$state4.isPressed,
          originalPosOfLastPressed = _this$state4.originalPosOfLastPressed,
          newOrder = _this$state4.newOrder,
          _this$state4$order = _this$state4.order,
          order = _this$state4$order === void 0 ? [] : _this$state4$order,
          children = _this$state4.children;
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
            var offsetHeight = _this4.childrenMap[(newIndex - index > 0 ? newOrder : order)[i]].ref.offsetHeight;
            nowY += offsetHeight;
          }

          y = newIndex - index > 0 ? nowY : -nowY;
        } else if (index !== newIndex) {
          y = (newIndex - index > 0 ? 1 : -1) * _this4.childrenMap[originalPosOfLastPressed].ref.offsetHeight;
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
            return _this4.Motions[ID] = _ref4;
          }
        }, // console.log(ID, ' ', y);
        // console.trace(ID, ' ', y);
        // console.log('scale', ' ', scale);
        // console.log('shadow', ' ', shadow);
        function (styles) {
          if (!_this4.childrenMap[ID]) _this4.childrenMap[ID] = {};
          _this4.childrenMap[ID].style = {
            y: styles.y
          };
          return _react.default.createElement("div", {
            onMouseDown: function onMouseDown(event) {
              _this4.handleMouseDown(event, ID, y);
            },
            ref: function ref(_ref3) {
              _this4.childrenMap[ID].ref = _ref3;
            },
            onTouchStart: function onTouchStart(event) {
              return _this4.handleTouchStart(event, ID, y);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EcmFnLmpzeCJdLCJuYW1lcyI6WyJmaW5kQWxsUGFyZW50Tm9kZSIsIm5vZGUiLCJlbHMiLCJ3aW5kb3ciLCJjdXJyTm9kZSIsInVuc2hpZnQiLCJwYXJlbnROb2RlIiwicmVpbnNlcnQiLCJhcnIiLCJmcm9tIiwidG8iLCJfYXJyIiwic2xpY2UiLCJ2YWwiLCJzcGxpY2UiLCJhbmltRHVyYXRpb24iLCJzcHJpbmdDb25maWciLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicHJlc3NUaW1lciIsIkRyYWciLCJwcm9wcyIsImNsZWFyVGltZW91dCIsInN0YXRlIiwiaXNQcmVzc2VkIiwic2V0U3RhdGUiLCJtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVRvdWNoTW92ZSIsInBhc3NpdmUiLCJoYW5kbGVNb3VzZVVwIiwiaGFuZGxlTW91c2VNb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImUiLCJmdW5jIiwicmVtb3ZlTGlzdGVuZXIiLCJhZGRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJJRCIsInByZXNzWSIsInBlcnNpc3QiLCJoYW5kbGVTdGFydCIsImV2ZW50IiwidG91Y2hlcyIsInBhZ2VZIiwidG9wRGVsdGFZIiwibW91c2VZIiwib3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkIiwicHJldmVudERlZmF1bHQiLCJuZXdPcmRlciIsImN1cnJJbmRleCIsImluZGV4T2YiLCJyZWFsUm93IiwicmVkdWNlIiwicm93IiwiaW5kZXgiLCJjaGlsZHJlbk1hcCIsInJlZiIsIm9mZnNldEhlaWdodCIsIm9mZnNldFRvcCIsImN1cnJTdHlsZSIsInN0eWxlIiwidG9wIiwieSIsImJvdHRvbSIsImN1cnNvciIsImN1cnNvck9mZnNldFRvcCIsImN1cnNvck9mZnNldEhlaWdodCIsImN1cnNvck1pZGRsZUxpbmUiLCJvcmlnaW5JbmRleCIsIm5leHROZXdPcmRlciIsInIiLCJ0aGVuIiwic2V0TW91c2VZIiwibW92ZWluZyIsIkRhdGUiLCJwcmVUaW1lIiwicmVPcmRlciIsImNoYW5nZURvbmUiLCJjbGVhck1vdGlvbnMiLCJvcmRlciIsInVuZGVmaW5lZCIsImRlbGF5IiwibmV4dFJlbmRlckNsZWFyTW90aW9ucyIsImNvbnRhaW5lciIsImNoaWxkcmVuIiwiTW90aW9ucyIsImZvckVhY2giLCJkb20iLCJvblNjcm9sbCIsIm5leHRQcm9wcyIsIm5leHRDb250ZXh0IiwibGFzdEFjdGlvbk1vdmVJRCIsImxhc3RNb3ZlSUQiLCJsZW5ndGgiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJzbmFwc2hvdCIsInByZXNzZWRNb3Rpb25zIiwibm90UHJlc3NlZE1vdGlvbnMiLCJjcmVhdGVTdHlsZSIsImdldENvbnRhaW5lciIsIm1hcCIsIm5ld0luZGV4Iiwibm93WSIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsImkiLCJzdHlsZXMiLCJoYW5kbGVNb3VzZURvd24iLCJoYW5kbGVUb3VjaFN0YXJ0IiwiekluZGV4IiwicG9zaXRpb24iLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJzY2FsZSIsInNoYWRvdyIsImJveFNoYWRvdyIsInRyYW5zZm9ybSIsIldlYmtpdFRyYW5zZm9ybSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUtBO0FBRUEsU0FBU0EsaUJBQVQsQ0FBMkJDLElBQTNCLEVBQWlDO0FBQy9CLE1BQU1DLEdBQUcsR0FBRyxDQUFDQyxNQUFELENBQVo7QUFDQSxNQUFJQyxRQUFRLEdBQUdILElBQWY7O0FBQ0EsU0FBT0csUUFBUCxFQUFpQjtBQUNmRixJQUFBQSxHQUFHLENBQUNHLE9BQUosQ0FBWUQsUUFBWjtBQUNBQSxJQUFBQSxRQUFRLEdBQUdBLFFBQVEsQ0FBQ0UsVUFBcEI7QUFDRDs7QUFDRCxTQUFPSixHQUFQO0FBQ0Q7O0FBR0QsU0FBU0ssUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUJDLElBQXZCLEVBQTZCQyxFQUE3QixF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QUNWc0QsTUFBQUEsU0FBUyxtQ0FBNEJELE1BQTVCLGdCQUF3QyxJQUFJQSxNQUE1QyxXQURDO0FBRVZFLE1BQUFBLFNBQVMsMkJBQW9CdkQsQ0FBcEIsMEJBQXFDb0QsS0FBckMsTUFGQztBQUdWSSxNQUFBQSxlQUFlLDJCQUFvQnhELENBQXBCLDBCQUFxQ29ELEtBQXJDO0FBSEwsS0FSQztBQUFBO0FBZkssQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTW90aW9uLCBzcHJpbmcgfSBmcm9tICdyZWFjdC1tb3Rpb24nO1xuaW1wb3J0IHJhZlNjaGQgZnJvbSAncmFmLXNjaGQnO1xuaW1wb3J0IHsgcHJlZml4LCBzbGVlcCwgaXNFeGlzdCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB7IHNwcmluZyB9IGZyb20gJ3JlYWN0LW1vdGlvbic7XG5cblxuLy8gdG9kbyBhdXRvIHNjcm9sbFxuXG5mdW5jdGlvbiBmaW5kQWxsUGFyZW50Tm9kZShub2RlKSB7XG4gIGNvbnN0IGVscyA9IFt3aW5kb3ddO1xuICBsZXQgY3Vyck5vZGUgPSBub2RlO1xuICB3aGlsZSAoY3Vyck5vZGUpIHtcbiAgICBlbHMudW5zaGlmdChjdXJyTm9kZSk7XG4gICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBlbHM7XG59XG5cblxuZnVuY3Rpb24gcmVpbnNlcnQoYXJyLCBmcm9tLCB0bykge1xuICBjb25zdCBfYXJyID0gYXJyLnNsaWNlKDApO1xuICBjb25zdCB2YWwgPSBfYXJyW2Zyb21dO1xuICBfYXJyLnNwbGljZShmcm9tLCAxKTtcbiAgX2Fyci5zcGxpY2UodG8sIDAsIHZhbCk7XG4gIHJldHVybiBfYXJyO1xufVxuXG5jb25zdCBhbmltRHVyYXRpb24gPSAzMDA7XG5cbmNvbnN0IHNwcmluZ0NvbmZpZyA9IHsgc3RpZmZuZXNzOiAyMDAsIGRhbXBpbmc6IDIwIH07XG5cbmxldCBwcmVzc1RpbWVyO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWcgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IG9yZGVyLCBjaGlsZHJlbiB9ID0gcHJvcHM7XG5cbiAgICB0aGlzLk1vdGlvbnMgPSB7fTtcbiAgICB0aGlzLm5leHRSZW5kZXJDbGVhck1vdGlvbnMgPSBmYWxzZTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b3BEZWx0YVk6IDAsXG4gICAgICBtb3VzZVk6IDAsXG4gICAgICBpc1ByZXNzZWQ6IGZhbHNlLFxuICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgICBvcmRlcjogWy4uLm9yZGVyXSxcbiAgICAgIG5ld09yZGVyOiBbLi4ub3JkZXJdLFxuICAgICAgY2hpbGRyZW4sXG4gICAgfTtcblxuICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlID0gcmFmU2NoZCh0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgdGhpcy5jaGlsZHJlbk1hcCA9IHt9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgW3RoaXMuY29udGFpbmVyLCAuLi5maW5kQWxsUGFyZW50Tm9kZSh0aGlzLmNvbnRhaW5lcildLmZvckVhY2goKGRvbSkgPT4ge1xuICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAgY29uc3QgeyBvcmRlciwgbmV3T3JkZXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBsYXN0QWN0aW9uTW92ZUlELCBsYXN0TW92ZUlELCBjaGlsZHJlbiB9ID0gbmV4dFByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgb3JkZXIubGVuZ3RoID09PSBuZXh0UHJvcHMub3JkZXIubGVuZ3RoXG4gICAgICAmJiBKU09OLnN0cmluZ2lmeShvcmRlcikgIT09IEpTT04uc3RyaW5naWZ5KG5leHRQcm9wcy5vcmRlcilcbiAgICAgICYmIGlzRXhpc3QobGFzdEFjdGlvbk1vdmVJRClcbiAgICAgICYmIGlzRXhpc3QobGFzdE1vdmVJRClcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMuY2xlYXJNb3Rpb25zKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgLy8gbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IGxhc3RBY3Rpb25Nb3ZlSUQsXG4gICAgICAgIGlzUHJlc3NlZDogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNldE1vdXNlWShcbiAgICAgICAgdGhpcy5jaGlsZHJlbk1hcFtsYXN0TW92ZUlEXS5yZWYub2Zmc2V0VG9wXG4gICAgICAgIC0gdGhpcy5jaGlsZHJlbk1hcFtsYXN0QWN0aW9uTW92ZUlEXS5yZWYub2Zmc2V0VG9wLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSB9KTtcblxuICAgICAgYXdhaXQgc2xlZXAoYW5pbUR1cmF0aW9uKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG5cbiAgICAgIGF3YWl0IHNsZWVwKHNwcmluZ0NvbmZpZy5zdGlmZm5lc3MpO1xuXG4gICAgICBhd2FpdCB0aGlzLmNsZWFyTW90aW9ucygpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLFxuICAgICAgICBvcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogdW5kZWZpbmVkLFxuICAgICAgICBjaGlsZHJlbixcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNoaWxkcmVuLCBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sIG9yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSwgc25hcHNob3QpIHtcbiAgICB0aGlzLm5leHRSZW5kZXJDbGVhck1vdGlvbnMgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIFt0aGlzLmNvbnRhaW5lciwgLi4uZmluZEFsbFBhcmVudE5vZGUodGhpcy5jb250YWluZXIpXS5mb3JFYWNoKChkb20pID0+IHtcbiAgICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc1ByZXNzZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ByZXNzZWQ6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFkZExpc3RlbmVyID0gKHsgbW92ZSA9IHRydWUgfSA9IHt9KSA9PiB7XG4gICAgbW92ZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgICBtb3ZlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICB9XG5cbiAgcmVtb3ZlTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICB9XG5cbiAgaGFuZGxlU3RhcnQgPSAoZSwgZnVuYyA9ICgpID0+IHt9KSA9PiB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuICAgIHRoaXMuYWRkTGlzdGVuZXIoeyBtb3ZlOiBmYWxzZSB9KTtcblxuICAgIC8vIGNvbnN0IGEgPSArbmV3IERhdGUoKTtcbiAgICBpZiAoIXByZXNzVGltZXIpIHtcbiAgICAgIHByZXNzVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHByZXNzVGltZXIgPSB3aW5kb3cuY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygrbmV3IERhdGUoKSAtIGEpO1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoKTtcbiAgICAgICAgZnVuYygpO1xuICAgICAgfSwgNzAwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVUb3VjaFN0YXJ0ID0gKGUsIElELCBwcmVzc1kpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlVG91Y2hTdGFydCcpO1xuICAgIGUucGVyc2lzdCgpO1xuICAgIC8vIGNvbnN0IHsgdG9wIH0gPSBlLmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB0aGlzLmhhbmRsZVN0YXJ0KGUsICgpID0+IHtcbiAgICAgIGNvbnN0IGV2ZW50ID0gZS50b3VjaGVzWzBdO1xuICAgICAgY29uc3QgeyBwYWdlWSB9ID0gZXZlbnQ7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0b3BEZWx0YVk6IHBhZ2VZIC0gcHJlc3NZLFxuICAgICAgICBtb3VzZVk6IHByZXNzWSxcbiAgICAgICAgaXNQcmVzc2VkOiB0cnVlLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IElELFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlTW91c2VEb3duID0gKGUsIElELCBwcmVzc1kpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlTW91c2VEb3duJyk7XG4gICAgY29uc3QgeyBwYWdlWSB9ID0gZTtcblxuICAgIHRoaXMuaGFuZGxlU3RhcnQoZSwgKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2cocGFnZVksIHByZXNzWSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdG9wRGVsdGFZOiBwYWdlWSAtIHByZXNzWSxcbiAgICAgICAgbW91c2VZOiBwcmVzc1ksXG4gICAgICAgIGlzUHJlc3NlZDogdHJ1ZSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiBJRCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZVRvdWNoTW92ZSA9IChlKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZVRvdWNoTW92ZScpO1xuICAgIGNvbnN0IHsgaXNQcmVzc2VkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgLy8gcHJlc3NUaW1lciA9IGNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcblxuICAgIGlmIChpc1ByZXNzZWQpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlKGUudG91Y2hlc1swXSk7XG4gICAgfVxuICB9O1xuXG4gIHJlT3JkZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkLCBuZXdPcmRlcixcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IGN1cnJJbmRleCA9IG5ld09yZGVyLmluZGV4T2Yob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkKTtcbiAgICBjb25zdCByZWFsUm93ID0gbmV3T3JkZXIucmVkdWNlKChyb3csIElEKSA9PiB7XG4gICAgICBpZiAob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCkge1xuICAgICAgICByZXR1cm4gcm93O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmRleCA9IG5ld09yZGVyLmluZGV4T2YoSUQpO1xuICAgICAgY29uc3QgeyByZWY6IHsgb2Zmc2V0SGVpZ2h0LCBvZmZzZXRUb3AgfSwgc3R5bGU6IGN1cnJTdHlsZSB9ID0gdGhpcy5jaGlsZHJlbk1hcFtJRF07XG4gICAgICBjb25zdCB0b3AgPSBvZmZzZXRUb3AgKyBjdXJyU3R5bGUueTtcbiAgICAgIGNvbnN0IGJvdHRvbSA9IHRvcCArIG9mZnNldEhlaWdodDtcblxuICAgICAgLy8gY29uc3QgeyB0b3AsIGJvdHRvbSB9ID0gdGhpcy5jaGlsZHJlbk1hcFtJRF0ucmVmLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgeyByZWY6IGN1cnNvciwgc3R5bGUgfSA9IHRoaXMuY2hpbGRyZW5NYXBbb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkXTtcbiAgICAgIGNvbnN0IHsgb2Zmc2V0VG9wOiBjdXJzb3JPZmZzZXRUb3AsIG9mZnNldEhlaWdodDogY3Vyc29yT2Zmc2V0SGVpZ2h0IH0gPSBjdXJzb3I7XG5cbiAgICAgIGNvbnN0IGN1cnNvck1pZGRsZUxpbmUgPSBjdXJzb3JPZmZzZXRUb3AgKyBzdHlsZS55ICsgKGN1cnNvck9mZnNldEhlaWdodCAvIDIpO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhjdXJzb3JNaWRkbGVMaW5lLCB0b3AgKyAob2Zmc2V0SGVpZ2h0IC8gNCksIGJvdHRvbSAtIChvZmZzZXRIZWlnaHQgLyA0KSwgSUQpO1xuICAgICAgaWYgKFxuICAgICAgICBjdXJzb3JNaWRkbGVMaW5lID4gdG9wICsgKG9mZnNldEhlaWdodCAvIDQpXG4gICAgICAgICYmIGN1cnNvck1pZGRsZUxpbmUgPCBib3R0b20gLSAob2Zmc2V0SGVpZ2h0IC8gNClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICB9XG4gICAgICByZXR1cm4gcm93O1xuICAgIH0sIGN1cnJJbmRleCk7XG5cbiAgICBjb25zdCBvcmlnaW5JbmRleCA9IG5ld09yZGVyLmluZGV4T2Yob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkKTtcblxuICAgIGlmIChvcmlnaW5JbmRleCAhPT0gcmVhbFJvdykge1xuICAgICAgY29uc3QgbmV4dE5ld09yZGVyID0gcmVpbnNlcnQobmV3T3JkZXIsIG9yaWdpbkluZGV4LCByZWFsUm93KTtcbiAgICAgIHJldHVybiBuZXh0TmV3T3JkZXI7XG4gICAgfVxuICAgIHJldHVybiBuZXdPcmRlcjtcbiAgfVxuXG4gIHNldE1vdXNlWSA9IG1vdXNlWSA9PiBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBtb3VzZVkgfSwgKCkgPT4ge1xuICAgICAgc2xlZXAoMzAwKS50aGVuKHIpO1xuICAgIH0pO1xuICB9KVxuXG4gIGhhbmRsZU1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZU1vdmUnKTtcbiAgICBjb25zdCB7IHBhZ2VZIH0gPSBldmVudDtcblxuICAgIGNvbnN0IHtcbiAgICAgIGlzUHJlc3NlZCwgdG9wRGVsdGFZLCBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsIG5ld09yZGVyLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgbW91c2VZID0gcGFnZVkgLSB0b3BEZWx0YVk7XG5cbiAgICB0aGlzLnNldE1vdXNlWShtb3VzZVkpO1xuXG4gICAgaWYgKGlzUHJlc3NlZCAmJiAhdGhpcy5tb3ZlaW5nKSB7XG4gICAgICBpZiAoK25ldyBEYXRlKCkgLSB0aGlzLnByZVRpbWUgPCBhbmltRHVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV4dE5ld09yZGVyID0gdGhpcy5yZU9yZGVyKCk7XG5cbiAgICAgIGlmIChuZXdPcmRlciAhPT0gbmV4dE5ld09yZGVyKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBuZXdPcmRlcjogWy4uLm5leHROZXdPcmRlcl0gfSk7XG5cbiAgICAgICAgdGhpcy5wcmVUaW1lID0gK25ldyBEYXRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIH0pO1xuICB9O1xuXG4gIGNoYW5nZURvbmUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjaGFuZ2VEb25lIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgdGhpcy5jbGVhck1vdGlvbnMoYW5pbUR1cmF0aW9uKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHsgbmV3T3JkZXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbmV3T3JkZXI6IFsuLi5uZXdPcmRlcl0sIG9yZGVyOiBbLi4ubmV3T3JkZXJdIH0pO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRvcERlbHRhWTogMCwgbW91c2VZOiAwLCBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IHVuZGVmaW5lZCB9KTtcbiAgICAgIGNoYW5nZURvbmUobmV3T3JkZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlTW91c2VVcCA9IChlKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNlVXAnKTtcbiAgICBjb25zdCB7IGlzUHJlc3NlZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHByZXNzVGltZXIgPSB3aW5kb3cuY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ByZXNzZWQ6IGZhbHNlIH0pO1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcblxuICAgIGlmIChpc1ByZXNzZWQpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdvbkRyb3AnKTtcbiAgICAgIHRoaXMuY2hhbmdlRG9uZSgpO1xuICAgIH1cbiAgfTtcblxuICBjbGVhck1vdGlvbnMgPWRlbGF5ID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm5leHRSZW5kZXJDbGVhck1vdGlvbnMgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7fSwgcik7XG4gICAgfSwgZGVsYXkpO1xuICB9KVxuXG4gIGdldENvbnRhaW5lciA9IChyZWYpID0+IHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHJlZjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBtb3VzZVksIGlzUHJlc3NlZCwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkLCBuZXdPcmRlciwgb3JkZXIgPSBbXSwgY2hpbGRyZW4sXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCB7XG4gICAgICBjbGVhck1vdGlvbnMsIHByZXNzZWRNb3Rpb25zLCBub3RQcmVzc2VkTW90aW9ucywgY3JlYXRlU3R5bGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7IG5leHRSZW5kZXJDbGVhck1vdGlvbnMgfSA9IHRoaXM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2RyYWctY29udGFpbmVyJyl9ICR7cHJlZml4KCdtYXAtY29udGFpbmVyJyl9YCB9IHJlZj17IHRoaXMuZ2V0Q29udGFpbmVyIH0+XG4gICAgICAgIHtvcmRlci5tYXAoKElELCBpbmRleCkgPT4ge1xuICAgICAgICAgIGxldCB5ID0gMDtcbiAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IG5ld09yZGVyLmluZGV4T2YoSUQpO1xuXG4gICAgICAgICAgaWYgKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgJiYgIWlzUHJlc3NlZCkge1xuICAgICAgICAgIC8vIGlmIChvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICkge1xuICAgICAgICAgICAgbGV0IG5vd1kgPSAwO1xuICAgICAgICAgICAgY29uc3QgeyBzdGFydEluZGV4LCBlbmRJbmRleCB9ID0gbmV3SW5kZXggLSBpbmRleCA+IDBcbiAgICAgICAgICAgICAgPyAoeyBzdGFydEluZGV4OiBpbmRleCwgZW5kSW5kZXg6IG5ld0luZGV4IH0pXG4gICAgICAgICAgICAgIDogKHsgc3RhcnRJbmRleDogbmV3SW5kZXgsIGVuZEluZGV4OiBpbmRleCB9KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICByZWY6IHsgb2Zmc2V0SGVpZ2h0IH0sXG4gICAgICAgICAgICAgIH0gPSB0aGlzLmNoaWxkcmVuTWFwWyhuZXdJbmRleCAtIGluZGV4ID4gMCA/IG5ld09yZGVyIDogb3JkZXIpW2ldXTtcbiAgICAgICAgICAgICAgbm93WSArPSBvZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5ID0gbmV3SW5kZXggLSBpbmRleCA+IDAgPyBub3dZIDogLW5vd1k7XG4gICAgICAgICAgfSBlbHNlIGlmIChpbmRleCAhPT0gbmV3SW5kZXgpIHtcbiAgICAgICAgICAgIHkgPSAobmV3SW5kZXggLSBpbmRleCA+IDAgPyAxIDogLTEpXG4gICAgICAgICAgICAgICAgKiB0aGlzLmNoaWxkcmVuTWFwW29yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZF0ucmVmLm9mZnNldEhlaWdodDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzdHlsZSA9IG5leHRSZW5kZXJDbGVhck1vdGlvbnNcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAuLi5jbGVhck1vdGlvbnMoKSxcbiAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCAmJiBpc1ByZXNzZWRcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgLi4ucHJlc3NlZE1vdGlvbnMoKSxcbiAgICAgICAgICAgICAgICB5OiBzcHJpbmcobW91c2VZLCB7IHN0aWZmbmVzczogNTAwLCBkYW1waW5nOiA1MCB9KSxcbiAgICAgICAgICAgICAgLy8geTogbW91c2VZLFxuICAgICAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgICAgIC4uLm5vdFByZXNzZWRNb3Rpb25zKCksXG4gICAgICAgICAgICAgICAgeTogc3ByaW5nKHksIHNwcmluZ0NvbmZpZyksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxNb3Rpb24gc3R5bGU9eyBzdHlsZSB9IGtleT17IElEIH0gcmVmPXsgcmVmID0+IHRoaXMuTW90aW9uc1tJRF0gPSByZWYgfT5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSUQsICcgJywgeSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLnRyYWNlKElELCAnICcsIHkpO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlJywgJyAnLCBzY2FsZSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2hhZG93JywgJyAnLCBzaGFkb3cpO1xuICAgICAgICAgICAgICAgKHN0eWxlcykgPT4ge1xuICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2hpbGRyZW5NYXBbSURdKSB0aGlzLmNoaWxkcmVuTWFwW0lEXSA9IHt9O1xuICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuTWFwW0lEXS5zdHlsZSA9IHsgeTogc3R5bGVzLnkgfTtcblxuICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXsgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50LCBJRCwgeSk7XG4gICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgIHJlZj17IChyZWYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbk1hcFtJRF0ucmVmID0gcmVmO1xuICAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyBldmVudCA9PiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQoZXZlbnQsIElELCB5KSB9XG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLWl0ZW0td3JhcCcpfSAke29yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgJiYgaXNQcmVzc2VkID8gcHJlZml4KCdncm91cC1pdGVtLXdyYXAtcHJlc3NlZCcpIDogJyd9YCB9XG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHtcbiAgICAgICAgICAgICAgICAgICAgICAgLi4uY3JlYXRlU3R5bGUoeyBzdHlsZXMsIElELCBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgfSksXG4gICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogSUQgPT09IG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA/IDk5IDogSUQsXG4gICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBJRCA9PT0gb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID8gJ3JlbGF0aXZlJyA6ICd1bnNldCcsXG4gICAgICAgICAgICAgICAgICAgICB9IH0+XG4gICAgICAgICAgICAgICAgICAgICB7IGNoaWxkcmVuW0lEXSB9XG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvTW90aW9uPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EcmFnLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hhbmdlRG9uZTogKCkgPT4ge30sXG4gIGNsZWFyTW90aW9uczogKCkgPT4gKHtcbiAgICBzY2FsZTogMSxcbiAgICBzaGFkb3c6IDAsXG4gIH0pLFxuICBwcmVzc2VkTW90aW9uczogKCkgPT4gKHtcbiAgICBzY2FsZTogc3ByaW5nKDAuNiwgc3ByaW5nQ29uZmlnKSxcbiAgICBzaGFkb3c6IHNwcmluZygxNiwgc3ByaW5nQ29uZmlnKSxcbiAgICAvLyB5OiBtb3VzZVksXG4gIH0pLFxuICBub3RQcmVzc2VkTW90aW9uczogKCkgPT4gKHtcbiAgICBzY2FsZTogc3ByaW5nKDEsIHNwcmluZ0NvbmZpZyksXG4gICAgc2hhZG93OiBzcHJpbmcoMCwgc3ByaW5nQ29uZmlnKSxcbiAgfSksXG4gIGNyZWF0ZVN0eWxlOiAoe1xuICAgIHN0eWxlczoge1xuICAgICAgc2NhbGUsXG4gICAgICBzaGFkb3csXG4gICAgICB5LFxuICAgIH0sXG4gICAgLy8gSUQsXG4gICAgLy8gb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkLFxuICB9ID0ge30pID0+ICh7XG4gICAgYm94U2hhZG93OiBgcmdiYSgwLCAwLCAwLCAwLjIpIDBweCAke3NoYWRvd31weCAkezIgKiBzaGFkb3d9cHggMHB4YCxcbiAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke3l9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXG4gICAgV2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHt5fXB4LCAwKSBzY2FsZSgke3NjYWxlfSlgLFxuICB9KSxcbn07XG4iXX0=