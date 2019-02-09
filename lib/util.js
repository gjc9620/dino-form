"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;
exports.isExist = isExist;
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

  return obj.type !== undefined && obj.target !== undefined && typeof obj.preventDefault === 'function';
}

var prefix = function prefix(className) {
  return "dino-form-".concat(className);
};

exports.prefix = prefix;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbInNsZWVwIiwidGltZSIsInIiLCJzZXRUaW1lb3V0IiwiaXNFeGlzdCIsInZhbHVlIiwidW5kZWZpbmVkIiwibWFwT2JqZWN0Iiwib2JqIiwiY2FsbGJhY2siLCJtYXBlZE9iaiIsImtleSIsIm1hcE9iamVjdEFzeW5jIiwiZ2V0VmFsdWVGcm9tRXZlbnQiLCJlIiwidGFyZ2V0IiwidHlwZSIsImNoZWNrZWQiLCJpc0V2ZW50T2JqIiwicHJldmVudERlZmF1bHQiLCJwcmVmaXgiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTyxTQUFTQSxLQUFULENBQWVDLElBQWYsRUFBcUI7QUFDMUIsU0FBTyxxQkFBWSxVQUFDQyxDQUFELEVBQU87QUFDeEJDLElBQUFBLFVBQVUsQ0FBQ0QsQ0FBRCxFQUFJRCxJQUFKLENBQVY7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFTSxTQUFTRyxPQUFULENBQWlCQyxLQUFqQixFQUF3QjtBQUM3QixTQUNFQSxLQUFLLEtBQUtDLFNBQVYsSUFDR0QsS0FBSyxLQUFLLElBRGIsSUFFRyxDQUFDLG9CQUFhQSxLQUFiLENBSE47QUFLRDs7QUFFTSxTQUFTRSxTQUFULENBQW1CQyxHQUFuQixFQUF3QkMsUUFBeEIsRUFBa0M7QUFDdkMsTUFBTUMsUUFBUSxHQUFHLEVBQWpCOztBQUR1QyxhQUVaLHNCQUFlRixHQUFmLENBRlk7O0FBRXZDLDJDQUFnRDtBQUFBO0FBQUEsUUFBcENHLEdBQW9DO0FBQUEsUUFBL0JOLEtBQStCOztBQUM5Qyx5QkFBY0ssUUFBZCxFQUF3QkQsUUFBUSxDQUFDRSxHQUFELEVBQU1OLEtBQU4sRUFBYUcsR0FBYixDQUFoQztBQUNEOztBQUNELFNBQU9FLFFBQVA7QUFDRDs7U0FFcUJFLGM7Ozs7Ozs7NEJBQWYsaUJBQThCSixHQUE5QixFQUFtQ0MsUUFBbkM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNDQyxZQUFBQSxRQURELEdBQ1ksRUFEWjtBQUFBLG9CQUVzQixzQkFBZUYsR0FBZixDQUZ0QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsb0VBRU9HLEdBRlAsZ0JBRVlOLEtBRlo7QUFBQTtBQUFBLDBCQUdXSyxRQUhYO0FBQUE7QUFBQSxtQkFHMkJELFFBQVEsQ0FBQ0UsR0FBRCxFQUFNTixLQUFOLEVBQWFHLEdBQWIsQ0FIbkM7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsNkNBS0VFLFFBTEY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQVFBLFNBQVNHLGlCQUFULENBQTJCQyxDQUEzQixFQUE4QjtBQUFBLE1BQzNCQyxNQUQyQixHQUNoQkQsQ0FEZ0IsQ0FDM0JDLE1BRDJCO0FBRW5DLFNBQU9BLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQixVQUFoQixHQUE2QkQsTUFBTSxDQUFDRSxPQUFwQyxHQUE4Q0YsTUFBTSxDQUFDVixLQUE1RDtBQUNEOztBQUdNLFNBQVNhLFVBQVQsQ0FBb0JWLEdBQXBCLEVBQXlCO0FBQzlCLE1BQUlBLEdBQUcsS0FBSyxJQUFSLElBQWdCLHNCQUFPQSxHQUFQLE1BQWUsUUFBbkMsRUFBNkM7QUFDM0MsV0FBTyxLQUFQO0FBQ0Q7O0FBRUQsU0FDRUEsR0FBRyxDQUFDUSxJQUFKLEtBQWFWLFNBQWIsSUFDR0UsR0FBRyxDQUFDTyxNQUFKLEtBQWVULFNBRGxCLElBRUcsT0FBT0UsR0FBRyxDQUFDVyxjQUFYLEtBQThCLFVBSG5DO0FBS0Q7O0FBRU0sSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQUMsU0FBUztBQUFBLDZCQUFpQkEsU0FBakI7QUFBQSxDQUF4QiIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKHRpbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgc2V0VGltZW91dChyLCB0aW1lKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0V4aXN0KHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICYmIHZhbHVlICE9PSBudWxsXG4gICAgJiYgIU51bWJlci5pc05hTih2YWx1ZSlcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcE9iamVjdChvYmosIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG1hcGVkT2JqID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICBPYmplY3QuYXNzaWduKG1hcGVkT2JqLCBjYWxsYmFjayhrZXksIHZhbHVlLCBvYmopKTtcbiAgfVxuICByZXR1cm4gbWFwZWRPYmo7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYXBPYmplY3RBc3luYyhvYmosIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG1hcGVkT2JqID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICBPYmplY3QuYXNzaWduKG1hcGVkT2JqLCBhd2FpdCBjYWxsYmFjayhrZXksIHZhbHVlLCBvYmopKTtcbiAgfVxuICByZXR1cm4gbWFwZWRPYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWYWx1ZUZyb21FdmVudChlKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICByZXR1cm4gdGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcgPyB0YXJnZXQuY2hlY2tlZCA6IHRhcmdldC52YWx1ZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNFdmVudE9iaihvYmopIHtcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgb2JqLnR5cGUgIT09IHVuZGVmaW5lZFxuICAgICYmIG9iai50YXJnZXQgIT09IHVuZGVmaW5lZFxuICAgICYmIHR5cGVvZiBvYmoucHJldmVudERlZmF1bHQgPT09ICdmdW5jdGlvbidcbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHByZWZpeCA9IGNsYXNzTmFtZSA9PiBgZGluby1mb3JtLSR7Y2xhc3NOYW1lfWA7XG4iXX0=