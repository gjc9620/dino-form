"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;
exports.isExist = isExist;
exports.isNotExist = isNotExist;
exports.mapObject = mapObject;
exports.mapObjectAsync = mapObjectAsync;
exports.getValueFromEvent = getValueFromEvent;
exports.isEventObj = isEventObj;
exports.prefix = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _isNan = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/is-nan"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

function sleep(time) {
  return new _promise.default(function (r) {
    setTimeout(r, time);
  });
}

function isExist(value) {
  return value !== undefined && value !== null && !(0, _isNan.default)(value);
}

function isNotExist(value) {
  return !isExist(value);
}

function mapObject(obj, callback) {
  var mapedObj = {};

  var _arr = (0, _entries.default)(obj);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
        key = _arr$_i[0],
        value = _arr$_i[1];

    (0, _assign.default)(mapedObj, callback(key, value, obj));
  }

  return mapedObj;
}

function mapObjectAsync(_x, _x2) {
  return _mapObjectAsync.apply(this, arguments);
}

function _mapObjectAsync() {
  _mapObjectAsync = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(obj, callback) {
    var mapedObj, _arr2, _i2, _arr2$_i, key, value;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mapedObj = {};
            _arr2 = (0, _entries.default)(obj);
            _i2 = 0;

          case 3:
            if (!(_i2 < _arr2.length)) {
              _context.next = 14;
              break;
            }

            _arr2$_i = (0, _slicedToArray2.default)(_arr2[_i2], 2), key = _arr2$_i[0], value = _arr2$_i[1];
            _context.t0 = _assign.default;
            _context.t1 = mapedObj;
            _context.next = 9;
            return callback(key, value, obj);

          case 9:
            _context.t2 = _context.sent;
            (0, _context.t0)(_context.t1, _context.t2);

          case 11:
            _i2++;
            _context.next = 3;
            break;

          case 14:
            return _context.abrupt("return", mapedObj);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _mapObjectAsync.apply(this, arguments);
}

function getValueFromEvent(e) {
  var target = e.target;
  return target.type === 'checkbox' ? target.checked : target.value;
}

function isEventObj(obj) {
  if (obj === null || (0, _typeof2.default)(obj) !== 'object') {
    return false;
  }

  return obj.target !== undefined && typeof obj.preventDefault === 'function';
}

var prefix = function prefix(className) {
  return "dino-form-".concat(className);
};

exports.prefix = prefix;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbInNsZWVwIiwidGltZSIsInIiLCJzZXRUaW1lb3V0IiwiaXNFeGlzdCIsInZhbHVlIiwidW5kZWZpbmVkIiwiaXNOb3RFeGlzdCIsIm1hcE9iamVjdCIsIm9iaiIsImNhbGxiYWNrIiwibWFwZWRPYmoiLCJrZXkiLCJtYXBPYmplY3RBc3luYyIsImdldFZhbHVlRnJvbUV2ZW50IiwiZSIsInRhcmdldCIsInR5cGUiLCJjaGVja2VkIiwiaXNFdmVudE9iaiIsInByZXZlbnREZWZhdWx0IiwicHJlZml4IiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNPLFNBQVNBLEtBQVQsQ0FBZUMsSUFBZixFQUFxQjtBQUMxQixTQUFPLHFCQUFZLFVBQUNDLENBQUQsRUFBTztBQUN4QkMsSUFBQUEsVUFBVSxDQUFDRCxDQUFELEVBQUlELElBQUosQ0FBVjtBQUNELEdBRk0sQ0FBUDtBQUdEOztBQUVNLFNBQVNHLE9BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCO0FBQzdCLFNBQ0VBLEtBQUssS0FBS0MsU0FBVixJQUNHRCxLQUFLLEtBQUssSUFEYixJQUVHLENBQUMsb0JBQWFBLEtBQWIsQ0FITjtBQUtEOztBQUVNLFNBQVNFLFVBQVQsQ0FBb0JGLEtBQXBCLEVBQTJCO0FBQ2hDLFNBQU8sQ0FBQ0QsT0FBTyxDQUFDQyxLQUFELENBQWY7QUFDRDs7QUFFTSxTQUFTRyxTQUFULENBQW1CQyxHQUFuQixFQUF3QkMsUUFBeEIsRUFBa0M7QUFDdkMsTUFBTUMsUUFBUSxHQUFHLEVBQWpCOztBQUR1QyxhQUVaLHNCQUFlRixHQUFmLENBRlk7O0FBRXZDLDJDQUFnRDtBQUFBO0FBQUEsUUFBcENHLEdBQW9DO0FBQUEsUUFBL0JQLEtBQStCOztBQUM5Qyx5QkFBY00sUUFBZCxFQUF3QkQsUUFBUSxDQUFDRSxHQUFELEVBQU1QLEtBQU4sRUFBYUksR0FBYixDQUFoQztBQUNEOztBQUNELFNBQU9FLFFBQVA7QUFDRDs7U0FFcUJFLGM7Ozs7Ozs7NEJBQWYsaUJBQThCSixHQUE5QixFQUFtQ0MsUUFBbkM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNDQyxZQUFBQSxRQURELEdBQ1ksRUFEWjtBQUFBLG9CQUVzQixzQkFBZUYsR0FBZixDQUZ0QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsb0VBRU9HLEdBRlAsZ0JBRVlQLEtBRlo7QUFBQTtBQUFBLDBCQUdXTSxRQUhYO0FBQUE7QUFBQSxtQkFHMkJELFFBQVEsQ0FBQ0UsR0FBRCxFQUFNUCxLQUFOLEVBQWFJLEdBQWIsQ0FIbkM7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsNkNBS0VFLFFBTEY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQVFBLFNBQVNHLGlCQUFULENBQTJCQyxDQUEzQixFQUE4QjtBQUFBLE1BQzNCQyxNQUQyQixHQUNoQkQsQ0FEZ0IsQ0FDM0JDLE1BRDJCO0FBRW5DLFNBQU9BLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQixVQUFoQixHQUE2QkQsTUFBTSxDQUFDRSxPQUFwQyxHQUE4Q0YsTUFBTSxDQUFDWCxLQUE1RDtBQUNEOztBQUdNLFNBQVNjLFVBQVQsQ0FBb0JWLEdBQXBCLEVBQXlCO0FBQzlCLE1BQUlBLEdBQUcsS0FBSyxJQUFSLElBQWdCLHNCQUFPQSxHQUFQLE1BQWUsUUFBbkMsRUFBNkM7QUFDM0MsV0FBTyxLQUFQO0FBQ0Q7O0FBRUQsU0FDRUEsR0FBRyxDQUFDTyxNQUFKLEtBQWVWLFNBQWYsSUFDRyxPQUFPRyxHQUFHLENBQUNXLGNBQVgsS0FBOEIsVUFGbkM7QUFJRDs7QUFFTSxJQUFNQyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFBQyxTQUFTO0FBQUEsNkJBQWlCQSxTQUFqQjtBQUFBLENBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICBzZXRUaW1lb3V0KHIsIHRpbWUpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhpc3QodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgJiYgdmFsdWUgIT09IG51bGxcbiAgICAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOb3RFeGlzdCh2YWx1ZSkge1xuICByZXR1cm4gIWlzRXhpc3QodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwT2JqZWN0KG9iaiwgY2FsbGJhY2spIHtcbiAgY29uc3QgbWFwZWRPYmogPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIE9iamVjdC5hc3NpZ24obWFwZWRPYmosIGNhbGxiYWNrKGtleSwgdmFsdWUsIG9iaikpO1xuICB9XG4gIHJldHVybiBtYXBlZE9iajtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1hcE9iamVjdEFzeW5jKG9iaiwgY2FsbGJhY2spIHtcbiAgY29uc3QgbWFwZWRPYmogPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIE9iamVjdC5hc3NpZ24obWFwZWRPYmosIGF3YWl0IGNhbGxiYWNrKGtleSwgdmFsdWUsIG9iaikpO1xuICB9XG4gIHJldHVybiBtYXBlZE9iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlRnJvbUV2ZW50KGUpIHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gIHJldHVybiB0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/IHRhcmdldC5jaGVja2VkIDogdGFyZ2V0LnZhbHVlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0V2ZW50T2JqKG9iaikge1xuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICBvYmoudGFyZ2V0ICE9PSB1bmRlZmluZWRcbiAgICAmJiB0eXBlb2Ygb2JqLnByZXZlbnREZWZhdWx0ID09PSAnZnVuY3Rpb24nXG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBwcmVmaXggPSBjbGFzc05hbWUgPT4gYGRpbm8tZm9ybS0ke2NsYXNzTmFtZX1gO1xuIl19