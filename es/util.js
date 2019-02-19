import _Object$assign from "@babel/runtime-corejs2/core-js/object/assign";
import _Object$entries from "@babel/runtime-corejs2/core-js/object/entries";
import _slicedToArray from "@babel/runtime-corejs2/helpers/esm/slicedToArray";
import _Number$isNaN from "@babel/runtime-corejs2/core-js/number/is-nan";
import _Promise from "@babel/runtime-corejs2/core-js/promise";
export function sleep(time) {
  return new _Promise(r => {
    setTimeout(r, time);
  });
}
export function isExist(value) {
  return value !== undefined && value !== null && !_Number$isNaN(value);
}
export function isNotExist(value) {
  return !isExist(value);
}
export function mapObject(obj, callback) {
  const mapedObj = {};

  for (const _ref of _Object$entries(obj)) {
    var _ref2 = _slicedToArray(_ref, 2);

    const key = _ref2[0];
    const value = _ref2[1];

    _Object$assign(mapedObj, callback(key, value, obj));
  }

  return mapedObj;
}
export async function mapObjectAsync(obj, callback) {
  const mapedObj = {};

  for (const _ref3 of _Object$entries(obj)) {
    var _ref4 = _slicedToArray(_ref3, 2);

    const key = _ref4[0];
    const value = _ref4[1];

    _Object$assign(mapedObj, (await callback(key, value, obj)));
  }

  return mapedObj;
}
export function getValueFromEvent(e) {
  const target = e.target;
  return target.type === 'checkbox' ? target.checked : target.value;
}
export function isEventObj(obj) {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  return obj.target !== undefined && typeof obj.preventDefault === 'function';
}
export const prefix = className => `dino-form-${className}`;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbInNsZWVwIiwidGltZSIsInIiLCJzZXRUaW1lb3V0IiwiaXNFeGlzdCIsInZhbHVlIiwidW5kZWZpbmVkIiwiaXNOb3RFeGlzdCIsIm1hcE9iamVjdCIsIm9iaiIsImNhbGxiYWNrIiwibWFwZWRPYmoiLCJrZXkiLCJtYXBPYmplY3RBc3luYyIsImdldFZhbHVlRnJvbUV2ZW50IiwiZSIsInRhcmdldCIsInR5cGUiLCJjaGVja2VkIiwiaXNFdmVudE9iaiIsInByZXZlbnREZWZhdWx0IiwicHJlZml4IiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sU0FBU0EsS0FBVCxDQUFlQyxJQUFmLEVBQXFCO0FBQzFCLFNBQU8sYUFBYUMsQ0FBRCxJQUFPO0FBQ3hCQyxJQUFBQSxVQUFVLENBQUNELENBQUQsRUFBSUQsSUFBSixDQUFWO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7QUFFRCxPQUFPLFNBQVNHLE9BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCO0FBQzdCLFNBQ0VBLEtBQUssS0FBS0MsU0FBVixJQUNHRCxLQUFLLEtBQUssSUFEYixJQUVHLENBQUMsY0FBYUEsS0FBYixDQUhOO0FBS0Q7QUFFRCxPQUFPLFNBQVNFLFVBQVQsQ0FBb0JGLEtBQXBCLEVBQTJCO0FBQ2hDLFNBQU8sQ0FBQ0QsT0FBTyxDQUFDQyxLQUFELENBQWY7QUFDRDtBQUVELE9BQU8sU0FBU0csU0FBVCxDQUFtQkMsR0FBbkIsRUFBd0JDLFFBQXhCLEVBQWtDO0FBQ3ZDLFFBQU1DLFFBQVEsR0FBRyxFQUFqQjs7QUFDQSxxQkFBMkIsZ0JBQWVGLEdBQWYsQ0FBM0IsRUFBZ0Q7QUFBQTs7QUFBQSxVQUFwQ0csR0FBb0M7QUFBQSxVQUEvQlAsS0FBK0I7O0FBQzlDLG1CQUFjTSxRQUFkLEVBQXdCRCxRQUFRLENBQUNFLEdBQUQsRUFBTVAsS0FBTixFQUFhSSxHQUFiLENBQWhDO0FBQ0Q7O0FBQ0QsU0FBT0UsUUFBUDtBQUNEO0FBRUQsT0FBTyxlQUFlRSxjQUFmLENBQThCSixHQUE5QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbEQsUUFBTUMsUUFBUSxHQUFHLEVBQWpCOztBQUNBLHNCQUEyQixnQkFBZUYsR0FBZixDQUEzQixFQUFnRDtBQUFBOztBQUFBLFVBQXBDRyxHQUFvQztBQUFBLFVBQS9CUCxLQUErQjs7QUFDOUMsbUJBQWNNLFFBQWQsR0FBd0IsTUFBTUQsUUFBUSxDQUFDRSxHQUFELEVBQU1QLEtBQU4sRUFBYUksR0FBYixDQUF0QztBQUNEOztBQUNELFNBQU9FLFFBQVA7QUFDRDtBQUVELE9BQU8sU0FBU0csaUJBQVQsQ0FBMkJDLENBQTNCLEVBQThCO0FBQUEsUUFDM0JDLE1BRDJCLEdBQ2hCRCxDQURnQixDQUMzQkMsTUFEMkI7QUFFbkMsU0FBT0EsTUFBTSxDQUFDQyxJQUFQLEtBQWdCLFVBQWhCLEdBQTZCRCxNQUFNLENBQUNFLE9BQXBDLEdBQThDRixNQUFNLENBQUNYLEtBQTVEO0FBQ0Q7QUFHRCxPQUFPLFNBQVNjLFVBQVQsQ0FBb0JWLEdBQXBCLEVBQXlCO0FBQzlCLE1BQUlBLEdBQUcsS0FBSyxJQUFSLElBQWdCLE9BQU9BLEdBQVAsS0FBZSxRQUFuQyxFQUE2QztBQUMzQyxXQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUNFQSxHQUFHLENBQUNPLE1BQUosS0FBZVYsU0FBZixJQUNHLE9BQU9HLEdBQUcsQ0FBQ1csY0FBWCxLQUE4QixVQUZuQztBQUlEO0FBRUQsT0FBTyxNQUFNQyxNQUFNLEdBQUdDLFNBQVMsSUFBSyxhQUFZQSxTQUFVLEVBQW5EIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICBzZXRUaW1lb3V0KHIsIHRpbWUpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhpc3QodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgJiYgdmFsdWUgIT09IG51bGxcbiAgICAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOb3RFeGlzdCh2YWx1ZSkge1xuICByZXR1cm4gIWlzRXhpc3QodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwT2JqZWN0KG9iaiwgY2FsbGJhY2spIHtcbiAgY29uc3QgbWFwZWRPYmogPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIE9iamVjdC5hc3NpZ24obWFwZWRPYmosIGNhbGxiYWNrKGtleSwgdmFsdWUsIG9iaikpO1xuICB9XG4gIHJldHVybiBtYXBlZE9iajtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1hcE9iamVjdEFzeW5jKG9iaiwgY2FsbGJhY2spIHtcbiAgY29uc3QgbWFwZWRPYmogPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIE9iamVjdC5hc3NpZ24obWFwZWRPYmosIGF3YWl0IGNhbGxiYWNrKGtleSwgdmFsdWUsIG9iaikpO1xuICB9XG4gIHJldHVybiBtYXBlZE9iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlRnJvbUV2ZW50KGUpIHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gIHJldHVybiB0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/IHRhcmdldC5jaGVja2VkIDogdGFyZ2V0LnZhbHVlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0V2ZW50T2JqKG9iaikge1xuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICBvYmoudGFyZ2V0ICE9PSB1bmRlZmluZWRcbiAgICAmJiB0eXBlb2Ygb2JqLnByZXZlbnREZWZhdWx0ID09PSAnZnVuY3Rpb24nXG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBwcmVmaXggPSBjbGFzc05hbWUgPT4gYGRpbm8tZm9ybS0ke2NsYXNzTmFtZX1gO1xuIl19