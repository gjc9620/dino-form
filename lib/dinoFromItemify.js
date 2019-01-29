"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dinoFromItemify;

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _util = require("./util");

function dinoFromItemify(Com) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(DinoComponent, _React$Component);

      function DinoComponent() {
        (0, _classCallCheck2.default)(this, DinoComponent);
        return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DinoComponent).apply(this, arguments));
      }

      (0, _createClass2.default)(DinoComponent, [{
        key: "render",
        // constructor(props) {
        //   super(props);
        //   this.state = {};
        // }
        // componentDidMountcomponentDidMount() {}
        value: function render() {
          var _this$props = this.props,
              _this$props$dinoForm = _this$props.dinoForm,
              FromItem = _this$props$dinoForm.FromItem,
              setFields = _this$props$dinoForm.setFields,
              getFields = _this$props$dinoForm.getFields,
              verify = _this$props$dinoForm.verify,
              label = _this$props.label,
              field = _this$props.field,
              _this$props$required = _this$props.required,
              required = _this$props$required === void 0 ? false : _this$props$required,
              initValue = _this$props.initValue,
              _this$props$rules = _this$props.rules,
              rules = _this$props$rules === void 0 ? [] : _this$props$rules,
              resetWhenUnmount = _this$props.resetWhenUnmount,
              others = (0, _objectWithoutProperties2.default)(_this$props, ["dinoForm", "label", "field", "required", "initValue", "rules", "resetWhenUnmount"]);
          return _react.default.createElement(FromItem, {
            label: label,
            field: field,
            initValue: initValue,
            Com: Com,
            comProps: others,
            resetWhenUnmount: resetWhenUnmount,
            rules: [].concat((0, _toConsumableArray2.default)(required ? [{
              validateTrigger: ['onChange', 'onBlur'],
              fun: function fun(firstArg) {
                var value = (0, _util.isEventObj)(firstArg) ? (0, _util.getValueFromEvent)(firstArg) : firstArg;

                if ((0, _isArray.default)(value)) {
                  return value.length > 0;
                }

                return value !== undefined && value !== null && value !== '';
              },
              error: function error(_ref) {
                var label = _ref.label,
                    field = _ref.field;
                return "".concat(label, " \u5FC5\u586B");
              }
            }] : []), (0, _toConsumableArray2.default)(rules))
          });
        }
      }]);
      return DinoComponent;
    }(_react.default.Component)
  );
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaW5vRnJvbUl0ZW1pZnkuanN4Il0sIm5hbWVzIjpbImRpbm9Gcm9tSXRlbWlmeSIsIkNvbSIsInByb3BzIiwiZGlub0Zvcm0iLCJGcm9tSXRlbSIsInNldEZpZWxkcyIsImdldEZpZWxkcyIsInZlcmlmeSIsImxhYmVsIiwiZmllbGQiLCJyZXF1aXJlZCIsImluaXRWYWx1ZSIsInJ1bGVzIiwicmVzZXRXaGVuVW5tb3VudCIsIm90aGVycyIsInZhbGlkYXRlVHJpZ2dlciIsImZ1biIsImZpcnN0QXJnIiwidmFsdWUiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJlcnJvciIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRWUsU0FBU0EsZUFBVCxDQUF5QkMsR0FBekIsRUFBOEI7QUFDM0M7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMRixpQ0FNVztBQUFBLDRCQWVILEtBQUtDLEtBZkY7QUFBQSxpREFFTEMsUUFGSztBQUFBLGNBR0hDLFFBSEcsd0JBR0hBLFFBSEc7QUFBQSxjQUlIQyxTQUpHLHdCQUlIQSxTQUpHO0FBQUEsY0FLSEMsU0FMRyx3QkFLSEEsU0FMRztBQUFBLGNBTUhDLE1BTkcsd0JBTUhBLE1BTkc7QUFBQSxjQVFMQyxLQVJLLGVBUUxBLEtBUks7QUFBQSxjQVNMQyxLQVRLLGVBU0xBLEtBVEs7QUFBQSxpREFVTEMsUUFWSztBQUFBLGNBVUxBLFFBVksscUNBVU0sS0FWTjtBQUFBLGNBV0xDLFNBWEssZUFXTEEsU0FYSztBQUFBLDhDQVlMQyxLQVpLO0FBQUEsY0FZTEEsS0FaSyxrQ0FZRyxFQVpIO0FBQUEsY0FhTEMsZ0JBYkssZUFhTEEsZ0JBYks7QUFBQSxjQWNGQyxNQWRFO0FBaUJQLGlCQUNFLDZCQUFDLFFBQUQ7QUFDRSxZQUFBLEtBQUssRUFBR04sS0FEVjtBQUVFLFlBQUEsS0FBSyxFQUFHQyxLQUZWO0FBR0UsWUFBQSxTQUFTLEVBQUdFLFNBSGQ7QUFJRSxZQUFBLEdBQUcsRUFBR1YsR0FKUjtBQUtFLFlBQUEsUUFBUSxFQUFHYSxNQUxiO0FBTUUsWUFBQSxnQkFBZ0IsRUFBR0QsZ0JBTnJCO0FBT0UsWUFBQSxLQUFLLDZDQUVESCxRQUFRLEdBQ0osQ0FDQTtBQUNFSyxjQUFBQSxlQUFlLEVBQUUsQ0FBQyxVQUFELEVBQWEsUUFBYixDQURuQjtBQUVFQyxjQUFBQSxHQUFHLEVBQUUsYUFBQ0MsUUFBRCxFQUFjO0FBQ2pCLG9CQUFNQyxLQUFLLEdBQUcsc0JBQVdELFFBQVgsSUFBdUIsNkJBQWtCQSxRQUFsQixDQUF2QixHQUFxREEsUUFBbkU7O0FBQ0Esb0JBQUksc0JBQWNDLEtBQWQsQ0FBSixFQUEwQjtBQUN4Qix5QkFBT0EsS0FBSyxDQUFDQyxNQUFOLEdBQWUsQ0FBdEI7QUFDRDs7QUFDRCx1QkFBT0QsS0FBSyxLQUFLRSxTQUFWLElBQ0ZGLEtBQUssS0FBSyxJQURSLElBRUZBLEtBQUssS0FBSyxFQUZmO0FBR0QsZUFWSDtBQVdFRyxjQUFBQSxLQUFLLEVBQUU7QUFBQSxvQkFBR2IsS0FBSCxRQUFHQSxLQUFIO0FBQUEsb0JBQVVDLEtBQVYsUUFBVUEsS0FBVjtBQUFBLGlDQUF5QkQsS0FBekI7QUFBQTtBQVhULGFBREEsQ0FESSxHQWdCSixFQWxCSCxvQ0FvQkFJLEtBcEJBO0FBUFAsWUFERjtBQWdDRDtBQXZESDtBQUFBO0FBQUEsTUFBbUNVLGVBQU1DLFNBQXpDO0FBQUE7QUF5REQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgaXNFdmVudE9iaiwgZ2V0VmFsdWVGcm9tRXZlbnQgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaW5vRnJvbUl0ZW1pZnkoQ29tKSB7XG4gIHJldHVybiBjbGFzcyBEaW5vQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAvLyBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIC8vICAgc3VwZXIocHJvcHMpO1xuICAgIC8vICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIC8vIH1cbiAgICAvLyBjb21wb25lbnREaWRNb3VudGNvbXBvbmVudERpZE1vdW50KCkge31cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgICAgRnJvbUl0ZW0sXG4gICAgICAgICAgc2V0RmllbGRzLFxuICAgICAgICAgIGdldEZpZWxkcyxcbiAgICAgICAgICB2ZXJpZnksXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsLFxuICAgICAgICBmaWVsZCxcbiAgICAgICAgcmVxdWlyZWQgPSBmYWxzZSxcbiAgICAgICAgaW5pdFZhbHVlLFxuICAgICAgICBydWxlcyA9IFtdLFxuICAgICAgICByZXNldFdoZW5Vbm1vdW50LFxuICAgICAgICAuLi5vdGhlcnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RnJvbUl0ZW1cbiAgICAgICAgICBsYWJlbD17IGxhYmVsIH1cbiAgICAgICAgICBmaWVsZD17IGZpZWxkIH1cbiAgICAgICAgICBpbml0VmFsdWU9eyBpbml0VmFsdWUgfVxuICAgICAgICAgIENvbT17IENvbSB9XG4gICAgICAgICAgY29tUHJvcHM9eyBvdGhlcnMgfVxuICAgICAgICAgIHJlc2V0V2hlblVubW91bnQ9eyByZXNldFdoZW5Vbm1vdW50IH1cbiAgICAgICAgICBydWxlcz17IFtcbiAgICAgICAgICAgIC4uLihcbiAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVUcmlnZ2VyOiBbJ29uQ2hhbmdlJywgJ29uQmx1ciddLFxuICAgICAgICAgICAgICAgICAgICBmdW46IChmaXJzdEFyZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXNFdmVudE9iaihmaXJzdEFyZykgPyBnZXRWYWx1ZUZyb21FdmVudChmaXJzdEFyZykgOiBmaXJzdEFyZztcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsdWUgIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbHVlICE9PSAnJztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICh7IGxhYmVsLCBmaWVsZCB9KSA9PiBgJHtsYWJlbH0g5b+F5aGrYCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIDogW11cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICAuLi5ydWxlcyxcbiAgICAgICAgICBdIH1cbiAgICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG4iXX0=