"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dinoFromItemify;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _util = require("./util");

function dinoFromItemify(Com) {
  var fromItemInitProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var comInitProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
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
          return _react.default.createElement(FromItem, (0, _extends2.default)({}, fromItemInitProps, {
            label: label,
            field: field,
            initValue: initValue,
            Com: Com,
            comProps: (0, _objectSpread2.default)({}, comInitProps, others),
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
          }));
        }
      }]);
      return DinoComponent;
    }(_react.default.Component)
  );
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaW5vRnJvbUl0ZW1pZnkuanN4Il0sIm5hbWVzIjpbImRpbm9Gcm9tSXRlbWlmeSIsIkNvbSIsImZyb21JdGVtSW5pdFByb3BzIiwiY29tSW5pdFByb3BzIiwicHJvcHMiLCJkaW5vRm9ybSIsIkZyb21JdGVtIiwic2V0RmllbGRzIiwiZ2V0RmllbGRzIiwidmVyaWZ5IiwibGFiZWwiLCJmaWVsZCIsInJlcXVpcmVkIiwiaW5pdFZhbHVlIiwicnVsZXMiLCJyZXNldFdoZW5Vbm1vdW50Iiwib3RoZXJzIiwidmFsaWRhdGVUcmlnZ2VyIiwiZnVuIiwiZmlyc3RBcmciLCJ2YWx1ZSIsImxlbmd0aCIsInVuZGVmaW5lZCIsImVycm9yIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRWUsU0FBU0EsZUFBVCxDQUF5QkMsR0FBekIsRUFBeUU7QUFBQSxNQUEzQ0MsaUJBQTJDLHVFQUF2QixFQUF1QjtBQUFBLE1BQW5CQyxZQUFtQix1RUFBSixFQUFJO0FBQ3RGO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEYsaUNBTVc7QUFBQSw0QkFlSCxLQUFLQyxLQWZGO0FBQUEsaURBRUxDLFFBRks7QUFBQSxjQUdIQyxRQUhHLHdCQUdIQSxRQUhHO0FBQUEsY0FJSEMsU0FKRyx3QkFJSEEsU0FKRztBQUFBLGNBS0hDLFNBTEcsd0JBS0hBLFNBTEc7QUFBQSxjQU1IQyxNQU5HLHdCQU1IQSxNQU5HO0FBQUEsY0FRTEMsS0FSSyxlQVFMQSxLQVJLO0FBQUEsY0FTTEMsS0FUSyxlQVNMQSxLQVRLO0FBQUEsaURBVUxDLFFBVks7QUFBQSxjQVVMQSxRQVZLLHFDQVVNLEtBVk47QUFBQSxjQVdMQyxTQVhLLGVBV0xBLFNBWEs7QUFBQSw4Q0FZTEMsS0FaSztBQUFBLGNBWUxBLEtBWkssa0NBWUcsRUFaSDtBQUFBLGNBYUxDLGdCQWJLLGVBYUxBLGdCQWJLO0FBQUEsY0FjRkMsTUFkRTtBQWlCUCxpQkFDRSw2QkFBQyxRQUFELDZCQUNPZCxpQkFEUDtBQUVFLFlBQUEsS0FBSyxFQUFHUSxLQUZWO0FBR0UsWUFBQSxLQUFLLEVBQUdDLEtBSFY7QUFJRSxZQUFBLFNBQVMsRUFBR0UsU0FKZDtBQUtFLFlBQUEsR0FBRyxFQUFHWixHQUxSO0FBTUUsWUFBQSxRQUFRLGtDQUNIRSxZQURHLEVBRUhhLE1BRkcsQ0FOVjtBQVVFLFlBQUEsZ0JBQWdCLEVBQUdELGdCQVZyQjtBQVdFLFlBQUEsS0FBSyw2Q0FFREgsUUFBUSxHQUNKLENBQ0E7QUFDRUssY0FBQUEsZUFBZSxFQUFFLENBQUMsVUFBRCxFQUFhLFFBQWIsQ0FEbkI7QUFFRUMsY0FBQUEsR0FBRyxFQUFFLGFBQUNDLFFBQUQsRUFBYztBQUNqQixvQkFBTUMsS0FBSyxHQUFHLHNCQUFXRCxRQUFYLElBQXVCLDZCQUFrQkEsUUFBbEIsQ0FBdkIsR0FBcURBLFFBQW5FOztBQUNBLG9CQUFJLHNCQUFjQyxLQUFkLENBQUosRUFBMEI7QUFDeEIseUJBQU9BLEtBQUssQ0FBQ0MsTUFBTixHQUFlLENBQXRCO0FBQ0Q7O0FBQ0QsdUJBQU9ELEtBQUssS0FBS0UsU0FBVixJQUNGRixLQUFLLEtBQUssSUFEUixJQUVGQSxLQUFLLEtBQUssRUFGZjtBQUdELGVBVkg7QUFXRUcsY0FBQUEsS0FBSyxFQUFFO0FBQUEsb0JBQUdiLEtBQUgsUUFBR0EsS0FBSDtBQUFBLG9CQUFVQyxLQUFWLFFBQVVBLEtBQVY7QUFBQSxpQ0FBeUJELEtBQXpCO0FBQUE7QUFYVCxhQURBLENBREksR0FnQkosRUFsQkgsb0NBb0JBSSxLQXBCQTtBQVhQLGFBREY7QUFvQ0Q7QUEzREg7QUFBQTtBQUFBLE1BQW1DVSxlQUFNQyxTQUF6QztBQUFBO0FBNkREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGlzRXZlbnRPYmosIGdldFZhbHVlRnJvbUV2ZW50IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlub0Zyb21JdGVtaWZ5KENvbSwgZnJvbUl0ZW1Jbml0UHJvcHMgPSB7fSwgY29tSW5pdFByb3BzID0ge30pIHtcbiAgcmV0dXJuIGNsYXNzIERpbm9Db21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIC8vIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgLy8gICBzdXBlcihwcm9wcyk7XG4gICAgLy8gICB0aGlzLnN0YXRlID0ge307XG4gICAgLy8gfVxuICAgIC8vIGNvbXBvbmVudERpZE1vdW50Y29tcG9uZW50RGlkTW91bnQoKSB7fVxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgICBGcm9tSXRlbSxcbiAgICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgICAgZ2V0RmllbGRzLFxuICAgICAgICAgIHZlcmlmeSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGZpZWxkLFxuICAgICAgICByZXF1aXJlZCA9IGZhbHNlLFxuICAgICAgICBpbml0VmFsdWUsXG4gICAgICAgIHJ1bGVzID0gW10sXG4gICAgICAgIHJlc2V0V2hlblVubW91bnQsXG4gICAgICAgIC4uLm90aGVyc1xuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGcm9tSXRlbVxuICAgICAgICAgIHsgLi4uZnJvbUl0ZW1Jbml0UHJvcHMgfVxuICAgICAgICAgIGxhYmVsPXsgbGFiZWwgfVxuICAgICAgICAgIGZpZWxkPXsgZmllbGQgfVxuICAgICAgICAgIGluaXRWYWx1ZT17IGluaXRWYWx1ZSB9XG4gICAgICAgICAgQ29tPXsgQ29tIH1cbiAgICAgICAgICBjb21Qcm9wcz17IHtcbiAgICAgICAgICAgIC4uLmNvbUluaXRQcm9wcyxcbiAgICAgICAgICAgIC4uLm90aGVycyxcbiAgICAgICAgICB9IH1cbiAgICAgICAgICByZXNldFdoZW5Vbm1vdW50PXsgcmVzZXRXaGVuVW5tb3VudCB9XG4gICAgICAgICAgcnVsZXM9eyBbXG4gICAgICAgICAgICAuLi4oXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVHJpZ2dlcjogWydvbkNoYW5nZScsICdvbkJsdXInXSxcbiAgICAgICAgICAgICAgICAgICAgZnVuOiAoZmlyc3RBcmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooZmlyc3RBcmcpID8gZ2V0VmFsdWVGcm9tRXZlbnQoZmlyc3RBcmcpIDogZmlyc3RBcmc7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbHVlICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWx1ZSAhPT0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAoeyBsYWJlbCwgZmllbGQgfSkgPT4gYCR7bGFiZWx9IOW/heWhq2AsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICA6IFtdXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgLi4ucnVsZXMsXG4gICAgICAgICAgXSB9XG4gICAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuIl19