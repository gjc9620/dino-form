"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapObject = mapObject;
exports.mapObjectAsync = mapObjectAsync;
exports.getValueFromEvent = getValueFromEvent;
exports.isEventObj = isEventObj;
exports.prefix = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/esm/slicedToArray"));

function mapObject(obj, callback) {
  const mapedObj = {};

  for (const _ref of (0, _entries.default)(obj)) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2);

    const key = _ref2[0];
    const value = _ref2[1];
    (0, _assign.default)(mapedObj, callback(key, value, obj));
  }

  return mapedObj;
}

async function mapObjectAsync(obj, callback) {
  const mapedObj = {};

  for (const _ref3 of (0, _entries.default)(obj)) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2);

    const key = _ref4[0];
    const value = _ref4[1];
    (0, _assign.default)(mapedObj, (await callback(key, value, obj)));
  }

  return mapedObj;
}

function getValueFromEvent(e) {
  const target = e.target;
  return target.type === 'checkbox' ? target.checked : target.value;
}

function isEventObj(obj) {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  return obj.type !== undefined && obj.target !== undefined && typeof obj.preventDefault === 'function';
}

const prefix = className => `dino-form-${className}`;

exports.prefix = prefix;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbIm1hcE9iamVjdCIsIm9iaiIsImNhbGxiYWNrIiwibWFwZWRPYmoiLCJrZXkiLCJ2YWx1ZSIsIm1hcE9iamVjdEFzeW5jIiwiZ2V0VmFsdWVGcm9tRXZlbnQiLCJlIiwidGFyZ2V0IiwidHlwZSIsImNoZWNrZWQiLCJpc0V2ZW50T2JqIiwidW5kZWZpbmVkIiwicHJldmVudERlZmF1bHQiLCJwcmVmaXgiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTyxTQUFTQSxTQUFULENBQW1CQyxHQUFuQixFQUF3QkMsUUFBeEIsRUFBa0M7QUFDdkMsUUFBTUMsUUFBUSxHQUFHLEVBQWpCOztBQUNBLHFCQUEyQixzQkFBZUYsR0FBZixDQUEzQixFQUFnRDtBQUFBOztBQUFBLFVBQXBDRyxHQUFvQztBQUFBLFVBQS9CQyxLQUErQjtBQUM5Qyx5QkFBY0YsUUFBZCxFQUF3QkQsUUFBUSxDQUFDRSxHQUFELEVBQU1DLEtBQU4sRUFBYUosR0FBYixDQUFoQztBQUNEOztBQUNELFNBQU9FLFFBQVA7QUFDRDs7QUFFTSxlQUFlRyxjQUFmLENBQThCTCxHQUE5QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbEQsUUFBTUMsUUFBUSxHQUFHLEVBQWpCOztBQUNBLHNCQUEyQixzQkFBZUYsR0FBZixDQUEzQixFQUFnRDtBQUFBOztBQUFBLFVBQXBDRyxHQUFvQztBQUFBLFVBQS9CQyxLQUErQjtBQUM5Qyx5QkFBY0YsUUFBZCxHQUF3QixNQUFNRCxRQUFRLENBQUNFLEdBQUQsRUFBTUMsS0FBTixFQUFhSixHQUFiLENBQXRDO0FBQ0Q7O0FBQ0QsU0FBT0UsUUFBUDtBQUNEOztBQUVNLFNBQVNJLGlCQUFULENBQTJCQyxDQUEzQixFQUE4QjtBQUFBLFFBQzNCQyxNQUQyQixHQUNoQkQsQ0FEZ0IsQ0FDM0JDLE1BRDJCO0FBRW5DLFNBQU9BLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQixVQUFoQixHQUE2QkQsTUFBTSxDQUFDRSxPQUFwQyxHQUE4Q0YsTUFBTSxDQUFDSixLQUE1RDtBQUNEOztBQUdNLFNBQVNPLFVBQVQsQ0FBb0JYLEdBQXBCLEVBQXlCO0FBQzlCLE1BQUlBLEdBQUcsS0FBSyxJQUFSLElBQWdCLE9BQU9BLEdBQVAsS0FBZSxRQUFuQyxFQUE2QztBQUMzQyxXQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUNFQSxHQUFHLENBQUNTLElBQUosS0FBYUcsU0FBYixJQUNHWixHQUFHLENBQUNRLE1BQUosS0FBZUksU0FEbEIsSUFFRyxPQUFPWixHQUFHLENBQUNhLGNBQVgsS0FBOEIsVUFIbkM7QUFLRDs7QUFFTSxNQUFNQyxNQUFNLEdBQUdDLFNBQVMsSUFBSyxhQUFZQSxTQUFVLEVBQW5EIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gbWFwT2JqZWN0KG9iaiwgY2FsbGJhY2spIHtcbiAgY29uc3QgbWFwZWRPYmogPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIE9iamVjdC5hc3NpZ24obWFwZWRPYmosIGNhbGxiYWNrKGtleSwgdmFsdWUsIG9iaikpO1xuICB9XG4gIHJldHVybiBtYXBlZE9iajtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1hcE9iamVjdEFzeW5jKG9iaiwgY2FsbGJhY2spIHtcbiAgY29uc3QgbWFwZWRPYmogPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIE9iamVjdC5hc3NpZ24obWFwZWRPYmosIGF3YWl0IGNhbGxiYWNrKGtleSwgdmFsdWUsIG9iaikpO1xuICB9XG4gIHJldHVybiBtYXBlZE9iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlRnJvbUV2ZW50KGUpIHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gIHJldHVybiB0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/IHRhcmdldC5jaGVja2VkIDogdGFyZ2V0LnZhbHVlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0V2ZW50T2JqKG9iaikge1xuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICBvYmoudHlwZSAhPT0gdW5kZWZpbmVkXG4gICAgJiYgb2JqLnRhcmdldCAhPT0gdW5kZWZpbmVkXG4gICAgJiYgdHlwZW9mIG9iai5wcmV2ZW50RGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufVxuXG5leHBvcnQgY29uc3QgcHJlZml4ID0gY2xhc3NOYW1lID0+IGBkaW5vLWZvcm0tJHtjbGFzc05hbWV9YDtcbiJdfQ==