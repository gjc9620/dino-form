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
exports.isProduction = isProduction;
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

function isProduction(doFunc) {
  if (1) {
    doFunc();
  }
}

var prefix = function prefix(className) {
  return "dino-form-".concat(className);
};

exports.prefix = prefix;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbInNsZWVwIiwidGltZSIsInIiLCJzZXRUaW1lb3V0IiwiaXNFeGlzdCIsInZhbHVlIiwidW5kZWZpbmVkIiwiaXNOb3RFeGlzdCIsIm1hcE9iamVjdCIsIm9iaiIsImNhbGxiYWNrIiwibWFwZWRPYmoiLCJrZXkiLCJtYXBPYmplY3RBc3luYyIsImdldFZhbHVlRnJvbUV2ZW50IiwiZSIsInRhcmdldCIsInR5cGUiLCJjaGVja2VkIiwiaXNFdmVudE9iaiIsInByZXZlbnREZWZhdWx0IiwiaXNQcm9kdWN0aW9uIiwiZG9GdW5jIiwicHJlZml4IiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTyxTQUFTQSxLQUFULENBQWVDLElBQWYsRUFBcUI7QUFDMUIsU0FBTyxxQkFBWSxVQUFDQyxDQUFELEVBQU87QUFDeEJDLElBQUFBLFVBQVUsQ0FBQ0QsQ0FBRCxFQUFJRCxJQUFKLENBQVY7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFTSxTQUFTRyxPQUFULENBQWlCQyxLQUFqQixFQUF3QjtBQUM3QixTQUNFQSxLQUFLLEtBQUtDLFNBQVYsSUFDR0QsS0FBSyxLQUFLLElBRGIsSUFFRyxDQUFDLG9CQUFhQSxLQUFiLENBSE47QUFLRDs7QUFFTSxTQUFTRSxVQUFULENBQW9CRixLQUFwQixFQUEyQjtBQUNoQyxTQUFPLENBQUNELE9BQU8sQ0FBQ0MsS0FBRCxDQUFmO0FBQ0Q7O0FBRU0sU0FBU0csU0FBVCxDQUFtQkMsR0FBbkIsRUFBd0JDLFFBQXhCLEVBQWtDO0FBQ3ZDLE1BQU1DLFFBQVEsR0FBRyxFQUFqQjs7QUFEdUMsYUFFWixzQkFBZUYsR0FBZixDQUZZOztBQUV2QywyQ0FBZ0Q7QUFBQTtBQUFBLFFBQXBDRyxHQUFvQztBQUFBLFFBQS9CUCxLQUErQjs7QUFDOUMseUJBQWNNLFFBQWQsRUFBd0JELFFBQVEsQ0FBQ0UsR0FBRCxFQUFNUCxLQUFOLEVBQWFJLEdBQWIsQ0FBaEM7QUFDRDs7QUFDRCxTQUFPRSxRQUFQO0FBQ0Q7O1NBRXFCRSxjOzs7Ozs7OzRCQUFmLGlCQUE4QkosR0FBOUIsRUFBbUNDLFFBQW5DO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQ0MsWUFBQUEsUUFERCxHQUNZLEVBRFo7QUFBQSxvQkFFc0Isc0JBQWVGLEdBQWYsQ0FGdEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9FQUVPRyxHQUZQLGdCQUVZUCxLQUZaO0FBQUE7QUFBQSwwQkFHV00sUUFIWDtBQUFBO0FBQUEsbUJBRzJCRCxRQUFRLENBQUNFLEdBQUQsRUFBTVAsS0FBTixFQUFhSSxHQUFiLENBSG5DOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDZDQUtFRSxRQUxGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFRQSxTQUFTRyxpQkFBVCxDQUEyQkMsQ0FBM0IsRUFBOEI7QUFBQSxNQUMzQkMsTUFEMkIsR0FDaEJELENBRGdCLENBQzNCQyxNQUQyQjtBQUVuQyxTQUFPQSxNQUFNLENBQUNDLElBQVAsS0FBZ0IsVUFBaEIsR0FBNkJELE1BQU0sQ0FBQ0UsT0FBcEMsR0FBOENGLE1BQU0sQ0FBQ1gsS0FBNUQ7QUFDRDs7QUFHTSxTQUFTYyxVQUFULENBQW9CVixHQUFwQixFQUF5QjtBQUM5QixNQUFJQSxHQUFHLEtBQUssSUFBUixJQUFnQixzQkFBT0EsR0FBUCxNQUFlLFFBQW5DLEVBQTZDO0FBQzNDLFdBQU8sS0FBUDtBQUNEOztBQUVELFNBQ0VBLEdBQUcsQ0FBQ08sTUFBSixLQUFlVixTQUFmLElBQ0csT0FBT0csR0FBRyxDQUFDVyxjQUFYLEtBQThCLFVBRm5DO0FBSUQ7O0FBRU0sU0FBU0MsWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDbkMsTUFBSSxDQUFKLEVBQU87QUFDTEEsSUFBQUEsTUFBTTtBQUNQO0FBQ0Y7O0FBR00sSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQUMsU0FBUztBQUFBLDZCQUFpQkEsU0FBakI7QUFBQSxDQUF4QiIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKHRpbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgc2V0VGltZW91dChyLCB0aW1lKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0V4aXN0KHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICYmIHZhbHVlICE9PSBudWxsXG4gICAgJiYgIU51bWJlci5pc05hTih2YWx1ZSlcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTm90RXhpc3QodmFsdWUpIHtcbiAgcmV0dXJuICFpc0V4aXN0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcE9iamVjdChvYmosIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG1hcGVkT2JqID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICBPYmplY3QuYXNzaWduKG1hcGVkT2JqLCBjYWxsYmFjayhrZXksIHZhbHVlLCBvYmopKTtcbiAgfVxuICByZXR1cm4gbWFwZWRPYmo7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYXBPYmplY3RBc3luYyhvYmosIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG1hcGVkT2JqID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICBPYmplY3QuYXNzaWduKG1hcGVkT2JqLCBhd2FpdCBjYWxsYmFjayhrZXksIHZhbHVlLCBvYmopKTtcbiAgfVxuICByZXR1cm4gbWFwZWRPYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWYWx1ZUZyb21FdmVudChlKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICByZXR1cm4gdGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcgPyB0YXJnZXQuY2hlY2tlZCA6IHRhcmdldC52YWx1ZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNFdmVudE9iaihvYmopIHtcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgb2JqLnRhcmdldCAhPT0gdW5kZWZpbmVkXG4gICAgJiYgdHlwZW9mIG9iai5wcmV2ZW50RGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9kdWN0aW9uKGRvRnVuYykge1xuICBpZiAoMSkge1xuICAgIGRvRnVuYygpO1xuICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHByZWZpeCA9IGNsYXNzTmFtZSA9PiBgZGluby1mb3JtLSR7Y2xhc3NOYW1lfWA7XG4iXX0=