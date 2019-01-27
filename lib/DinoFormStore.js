"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDinoFormStore;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var schemeaa = {
  value: undefined,
  label: undefined,
  rules: [],
  initValue: undefined,
  error: undefined,
  formItem: undefined,
  comRef: undefined,
  isMount: true
};

function createDinoFormStore() {
  var store = {};
  return {
    set: function set(field, scheme) {
      store[field] = scheme;
    },
    remove: function remove(field) {
      delete store[field];
    },
    get: function get(field) {
      if (field) {
        return store[field];
      }

      return store;
    },
    update: function update(storeKey, obj) {
      var scheme = store[storeKey] ? store[storeKey] : {};
      store[storeKey] = (0, _objectSpread2.default)({}, scheme, obj);
      return store[storeKey];
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybVN0b3JlLmpzIl0sIm5hbWVzIjpbInNjaGVtZWFhIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJsYWJlbCIsInJ1bGVzIiwiaW5pdFZhbHVlIiwiZXJyb3IiLCJmb3JtSXRlbSIsImNvbVJlZiIsImlzTW91bnQiLCJjcmVhdGVEaW5vRm9ybVN0b3JlIiwic3RvcmUiLCJzZXQiLCJmaWVsZCIsInNjaGVtZSIsInJlbW92ZSIsImdldCIsInVwZGF0ZSIsInN0b3JlS2V5Iiwib2JqIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLElBQU1BLFFBQVEsR0FBRztBQUNmQyxFQUFBQSxLQUFLLEVBQUVDLFNBRFE7QUFFZkMsRUFBQUEsS0FBSyxFQUFFRCxTQUZRO0FBR2ZFLEVBQUFBLEtBQUssRUFBRSxFQUhRO0FBSWZDLEVBQUFBLFNBQVMsRUFBRUgsU0FKSTtBQUtmSSxFQUFBQSxLQUFLLEVBQUVKLFNBTFE7QUFNZkssRUFBQUEsUUFBUSxFQUFFTCxTQU5LO0FBT2ZNLEVBQUFBLE1BQU0sRUFBRU4sU0FQTztBQVFmTyxFQUFBQSxPQUFPLEVBQUU7QUFSTSxDQUFqQjs7QUFXZSxTQUFTQyxtQkFBVCxHQUErQjtBQUM1QyxNQUFNQyxLQUFLLEdBQUcsRUFBZDtBQUVBLFNBQU87QUFDTEMsSUFBQUEsR0FESyxlQUNEQyxLQURDLEVBQ01DLE1BRE4sRUFDYztBQUNqQkgsTUFBQUEsS0FBSyxDQUFDRSxLQUFELENBQUwsR0FBZUMsTUFBZjtBQUNELEtBSEk7QUFJTEMsSUFBQUEsTUFKSyxrQkFJRUYsS0FKRixFQUlTO0FBQ1osYUFBT0YsS0FBSyxDQUFDRSxLQUFELENBQVo7QUFDRCxLQU5JO0FBT0xHLElBQUFBLEdBUEssZUFPREgsS0FQQyxFQU9NO0FBQ1QsVUFBSUEsS0FBSixFQUFXO0FBQ1QsZUFBT0YsS0FBSyxDQUFDRSxLQUFELENBQVo7QUFDRDs7QUFDRCxhQUFPRixLQUFQO0FBQ0QsS0FaSTtBQWFMTSxJQUFBQSxNQWJLLGtCQWFFQyxRQWJGLEVBYVlDLEdBYlosRUFhaUI7QUFDcEIsVUFBTUwsTUFBTSxHQUFHSCxLQUFLLENBQUNPLFFBQUQsQ0FBTCxHQUFrQlAsS0FBSyxDQUFDTyxRQUFELENBQXZCLEdBQW9DLEVBQW5EO0FBQ0FQLE1BQUFBLEtBQUssQ0FBQ08sUUFBRCxDQUFMLG1DQUNLSixNQURMLEVBRUtLLEdBRkw7QUFJQSxhQUFPUixLQUFLLENBQUNPLFFBQUQsQ0FBWjtBQUNEO0FBcEJJLEdBQVA7QUFzQkQiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHNjaGVtZWFhID0ge1xuICB2YWx1ZTogdW5kZWZpbmVkLFxuICBsYWJlbDogdW5kZWZpbmVkLFxuICBydWxlczogW10sXG4gIGluaXRWYWx1ZTogdW5kZWZpbmVkLFxuICBlcnJvcjogdW5kZWZpbmVkLFxuICBmb3JtSXRlbTogdW5kZWZpbmVkLFxuICBjb21SZWY6IHVuZGVmaW5lZCxcbiAgaXNNb3VudDogdHJ1ZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZURpbm9Gb3JtU3RvcmUoKSB7XG4gIGNvbnN0IHN0b3JlID0ge307XG5cbiAgcmV0dXJuIHtcbiAgICBzZXQoZmllbGQsIHNjaGVtZSkge1xuICAgICAgc3RvcmVbZmllbGRdID0gc2NoZW1lO1xuICAgIH0sXG4gICAgcmVtb3ZlKGZpZWxkKSB7XG4gICAgICBkZWxldGUgc3RvcmVbZmllbGRdO1xuICAgIH0sXG4gICAgZ2V0KGZpZWxkKSB7XG4gICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlW2ZpZWxkXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZTtcbiAgICB9LFxuICAgIHVwZGF0ZShzdG9yZUtleSwgb2JqKSB7XG4gICAgICBjb25zdCBzY2hlbWUgPSBzdG9yZVtzdG9yZUtleV0gPyBzdG9yZVtzdG9yZUtleV0gOiB7fTtcbiAgICAgIHN0b3JlW3N0b3JlS2V5XSA9IHtcbiAgICAgICAgLi4uc2NoZW1lLFxuICAgICAgICAuLi5vYmosXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHN0b3JlW3N0b3JlS2V5XTtcbiAgICB9LFxuICB9O1xufVxuIl19