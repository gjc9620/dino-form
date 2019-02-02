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
              renderDinoFormItem = _this$props.renderDinoFormItem,
              others = (0, _objectWithoutProperties2.default)(_this$props, ["dinoForm", "label", "field", "required", "initValue", "rules", "resetWhenUnmount", "renderDinoFormItem"]);
          return _react.default.createElement(FromItem, {
            label: label,
            field: field,
            initValue: initValue,
            Com: Com,
            comProps: others,
            resetWhenUnmount: resetWhenUnmount,
            renderDinoFormItem: renderDinoFormItem,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaW5vRnJvbUl0ZW1pZnkuanN4Il0sIm5hbWVzIjpbImRpbm9Gcm9tSXRlbWlmeSIsIkNvbSIsInByb3BzIiwiZGlub0Zvcm0iLCJGcm9tSXRlbSIsInNldEZpZWxkcyIsImdldEZpZWxkcyIsInZlcmlmeSIsImxhYmVsIiwiZmllbGQiLCJyZXF1aXJlZCIsImluaXRWYWx1ZSIsInJ1bGVzIiwicmVzZXRXaGVuVW5tb3VudCIsInJlbmRlckRpbm9Gb3JtSXRlbSIsIm90aGVycyIsInZhbGlkYXRlVHJpZ2dlciIsImZ1biIsImZpcnN0QXJnIiwidmFsdWUiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJlcnJvciIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRWUsU0FBU0EsZUFBVCxDQUF5QkMsR0FBekIsRUFBOEI7QUFDM0M7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMRixpQ0FNVztBQUFBLDRCQWdCSCxLQUFLQyxLQWhCRjtBQUFBLGlEQUVMQyxRQUZLO0FBQUEsY0FHSEMsUUFIRyx3QkFHSEEsUUFIRztBQUFBLGNBSUhDLFNBSkcsd0JBSUhBLFNBSkc7QUFBQSxjQUtIQyxTQUxHLHdCQUtIQSxTQUxHO0FBQUEsY0FNSEMsTUFORyx3QkFNSEEsTUFORztBQUFBLGNBUUxDLEtBUkssZUFRTEEsS0FSSztBQUFBLGNBU0xDLEtBVEssZUFTTEEsS0FUSztBQUFBLGlEQVVMQyxRQVZLO0FBQUEsY0FVTEEsUUFWSyxxQ0FVTSxLQVZOO0FBQUEsY0FXTEMsU0FYSyxlQVdMQSxTQVhLO0FBQUEsOENBWUxDLEtBWks7QUFBQSxjQVlMQSxLQVpLLGtDQVlHLEVBWkg7QUFBQSxjQWFMQyxnQkFiSyxlQWFMQSxnQkFiSztBQUFBLGNBY0xDLGtCQWRLLGVBY0xBLGtCQWRLO0FBQUEsY0FlRkMsTUFmRTtBQWtCUCxpQkFDRSw2QkFBQyxRQUFEO0FBQ0UsWUFBQSxLQUFLLEVBQUdQLEtBRFY7QUFFRSxZQUFBLEtBQUssRUFBR0MsS0FGVjtBQUdFLFlBQUEsU0FBUyxFQUFHRSxTQUhkO0FBSUUsWUFBQSxHQUFHLEVBQUdWLEdBSlI7QUFLRSxZQUFBLFFBQVEsRUFBR2MsTUFMYjtBQU1FLFlBQUEsZ0JBQWdCLEVBQUdGLGdCQU5yQjtBQU9FLFlBQUEsa0JBQWtCLEVBQUdDLGtCQVB2QjtBQVFFLFlBQUEsS0FBSyw2Q0FFREosUUFBUSxHQUNKLENBQ0E7QUFDRU0sY0FBQUEsZUFBZSxFQUFFLENBQUMsVUFBRCxFQUFhLFFBQWIsQ0FEbkI7QUFFRUMsY0FBQUEsR0FBRyxFQUFFLGFBQUNDLFFBQUQsRUFBYztBQUNqQixvQkFBTUMsS0FBSyxHQUFHLHNCQUFXRCxRQUFYLElBQXVCLDZCQUFrQkEsUUFBbEIsQ0FBdkIsR0FBcURBLFFBQW5FOztBQUNBLG9CQUFJLHNCQUFjQyxLQUFkLENBQUosRUFBMEI7QUFDeEIseUJBQU9BLEtBQUssQ0FBQ0MsTUFBTixHQUFlLENBQXRCO0FBQ0Q7O0FBQ0QsdUJBQU9ELEtBQUssS0FBS0UsU0FBVixJQUNGRixLQUFLLEtBQUssSUFEUixJQUVGQSxLQUFLLEtBQUssRUFGZjtBQUdELGVBVkg7QUFXRUcsY0FBQUEsS0FBSyxFQUFFO0FBQUEsb0JBQUdkLEtBQUgsUUFBR0EsS0FBSDtBQUFBLG9CQUFVQyxLQUFWLFFBQVVBLEtBQVY7QUFBQSxpQ0FBeUJELEtBQXpCO0FBQUE7QUFYVCxhQURBLENBREksR0FnQkosRUFsQkgsb0NBb0JBSSxLQXBCQTtBQVJQLFlBREY7QUFpQ0Q7QUF6REg7QUFBQTtBQUFBLE1BQW1DVyxlQUFNQyxTQUF6QztBQUFBO0FBMkREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGlzRXZlbnRPYmosIGdldFZhbHVlRnJvbUV2ZW50IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlub0Zyb21JdGVtaWZ5KENvbSkge1xuICByZXR1cm4gY2xhc3MgRGlub0NvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgLy8gY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAvLyAgIHN1cGVyKHByb3BzKTtcbiAgICAvLyAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAvLyB9XG4gICAgLy8gY29tcG9uZW50RGlkTW91bnRjb21wb25lbnREaWRNb3VudCgpIHt9XG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkaW5vRm9ybToge1xuICAgICAgICAgIEZyb21JdGVtLFxuICAgICAgICAgIHNldEZpZWxkcyxcbiAgICAgICAgICBnZXRGaWVsZHMsXG4gICAgICAgICAgdmVyaWZ5LFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbCxcbiAgICAgICAgZmllbGQsXG4gICAgICAgIHJlcXVpcmVkID0gZmFsc2UsXG4gICAgICAgIGluaXRWYWx1ZSxcbiAgICAgICAgcnVsZXMgPSBbXSxcbiAgICAgICAgcmVzZXRXaGVuVW5tb3VudCxcbiAgICAgICAgcmVuZGVyRGlub0Zvcm1JdGVtLFxuICAgICAgICAuLi5vdGhlcnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RnJvbUl0ZW1cbiAgICAgICAgICBsYWJlbD17IGxhYmVsIH1cbiAgICAgICAgICBmaWVsZD17IGZpZWxkIH1cbiAgICAgICAgICBpbml0VmFsdWU9eyBpbml0VmFsdWUgfVxuICAgICAgICAgIENvbT17IENvbSB9XG4gICAgICAgICAgY29tUHJvcHM9eyBvdGhlcnMgfVxuICAgICAgICAgIHJlc2V0V2hlblVubW91bnQ9eyByZXNldFdoZW5Vbm1vdW50IH1cbiAgICAgICAgICByZW5kZXJEaW5vRm9ybUl0ZW09eyByZW5kZXJEaW5vRm9ybUl0ZW0gfVxuICAgICAgICAgIHJ1bGVzPXsgW1xuICAgICAgICAgICAgLi4uKFxuICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRyaWdnZXI6IFsnb25DaGFuZ2UnLCAnb25CbHVyJ10sXG4gICAgICAgICAgICAgICAgICAgIGZ1bjogKGZpcnN0QXJnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBpc0V2ZW50T2JqKGZpcnN0QXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGZpcnN0QXJnKSA6IGZpcnN0QXJnO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsdWUgIT09ICcnO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogKHsgbGFiZWwsIGZpZWxkIH0pID0+IGAke2xhYmVsfSDlv4XloatgLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgOiBbXVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIC4uLnJ1bGVzLFxuICAgICAgICAgIF0gfVxuICAgICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==