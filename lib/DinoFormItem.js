"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _util = require("./util");

var DinoFormItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(DinoFormItem, _React$Component);

  function DinoFormItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DinoFormItem);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DinoFormItem)).call.apply(_getPrototypeOf2, [this].concat(_args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "syncToStore", function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$isMount = _ref.isMount,
          isMount = _ref$isMount === void 0 ? true : _ref$isMount;

      var _this$props = _this.props,
          _this$props$dinoForm = _this$props.dinoForm,
          store = _this$props$dinoForm.store,
          getFieldsValue = _this$props$dinoForm.getFieldsValue,
          field = _this$props.field,
          rules = _this$props.rules,
          label = _this$props.label,
          initValue = _this$props.initValue;

      var _getFieldsValue = getFieldsValue(field),
          _getFieldsValue2 = (0, _slicedToArray2.default)(_getFieldsValue, 1),
          value = _getFieldsValue2[0];

      store.update(field, {
        value: value,
        rules: rules,
        label: label,
        initValue: initValue,
        formItem: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)),
        comRef: _this.com,
        isMount: isMount
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function (arg) {
      var _this$props2 = _this.props,
          _this$props2$dinoForm = _this$props2.dinoForm,
          store = _this$props2$dinoForm.store,
          setFields = _this$props2$dinoForm.setFields,
          setFieldsValue = _this$props2$dinoForm.setFieldsValue,
          field = _this$props2.field;
      var value = (0, _util.isEventObj)(arg) ? (0, _util.getValueFromEvent)(arg) : arg;
      setFieldsValue((0, _defineProperty2.default)({}, field, value));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "clickLabel", function () {
      _this.com && _this.com.wakeUp && _this.com.wakeUp();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setRule", function () {
      var _this$props3 = _this.props,
          _this$props3$dinoForm = _this$props3.dinoForm,
          store = _this$props3$dinoForm.store,
          getFieldsValue = _this$props3$dinoForm.getFieldsValue,
          setFieldsError = _this$props3$dinoForm.setFieldsError,
          label = _this$props3.label,
          field = _this$props3.field,
          fieldName = _this$props3.fieldName,
          _this$props3$comProps = _this$props3.comProps,
          comProps = _this$props3$comProps === void 0 ? {} : _this$props3$comProps,
          _this$props3$rules = _this$props3.rules,
          rules = _this$props3$rules === void 0 ? [] : _this$props3$rules;
      var events = rules.reduceRight(function (trigger, rule) {
        var _rule$validateTrigger = rule.validateTrigger,
            validateTrigger = _rule$validateTrigger === void 0 ? [] : _rule$validateTrigger,
            fun = rule.fun,
            error = rule.error;
        validateTrigger.forEach(function (eventName) {
          var preTrigger = trigger[eventName] || function () {};

          trigger[eventName] =
          /*#__PURE__*/
          function () {
            var _ref2 = (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee(firstArg) {
              var value,
                  _len2,
                  arg,
                  _key2,
                  _args2 = arguments;

              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      value = (0, _util.isEventObj)(firstArg) ? (0, _util.getValueFromEvent)(firstArg) : firstArg;

                      for (_len2 = _args2.length, arg = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                        arg[_key2 - 1] = _args2[_key2];
                      }

                      _context.next = 4;
                      return fun.apply(void 0, [value].concat(arg));

                    case 4:
                      if (!_context.sent) {
                        _context.next = 8;
                        break;
                      }

                      setFieldsError((0, _defineProperty2.default)({}, field, undefined));
                      preTrigger.apply(void 0, [value].concat(arg));
                      return _context.abrupt("return");

                    case 8:
                      setFieldsError((0, _defineProperty2.default)({}, field, error({
                        label: label,
                        field: field
                      })));

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }();
        });
        return trigger;
      }, {});
      var mergeEventFormComProps = (0, _objectSpread2.default)({}, events, (0, _util.mapObject)(comProps, function (propsKey, propsValue) {
        var event = events[propsKey];

        if (event) {
          return (0, _defineProperty2.default)({}, propsKey, function (value) {
            for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              args[_key3 - 1] = arguments[_key3];
            }

            propsValue.apply(void 0, [value].concat(args));
            return event.apply(void 0, [value].concat(args));
          });
        }

        return {};
      }));
      return (0, _objectSpread2.default)({}, mergeEventFormComProps, {
        onChange: function onChange(value) {
          var _this2;

          for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }

          (_this2 = _this).onChange.apply(_this2, [value].concat(args));

          mergeEventFormComProps.onChange && mergeEventFormComProps.onChange.apply(mergeEventFormComProps, [value].concat(args));
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "defaultRender", function () {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          label = _ref4.label,
          error = _ref4.error,
          renderCom = _ref4.renderCom;

      return _react.default.createElement("section", {
        className: "".concat((0, _util.prefix)('item'), " ").concat(error ? 'has-error' : '')
      }, _react.default.createElement("div", {
        onClick: _this.clickLabel,
        className: "".concat((0, _util.prefix)('item-label'))
      }, label), _react.default.createElement("div", {
        className: "".concat((0, _util.prefix)('item-com-error'))
      }, _react.default.createElement("div", {
        className: "".concat((0, _util.prefix)('item-com'))
      }, renderCom()), error && _react.default.createElement("div", {
        className: "".concat((0, _util.prefix)('item-error'))
      }, error)));
    });
    return _this;
  }

  (0, _createClass2.default)(DinoFormItem, [{
    key: "componentDidMount",
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     // message: undefined,
    //   };
    // }
    value: function componentDidMount() {
      this.syncToStore({
        isMount: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props4 = this.props,
          store = _this$props4.dinoForm.store,
          field = _this$props4.field,
          _this$props4$resetWhe = _this$props4.resetWhenUnmount,
          resetWhenUnmount = _this$props4$resetWhe === void 0 ? true : _this$props4$resetWhe;

      if (resetWhenUnmount) {
        store.update(field, {
          value: undefined,
          error: undefined
        });
      }

      this.syncToStore({
        isMount: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props5 = this.props,
          _this$props5$dinoForm = _this$props5.dinoForm,
          setFields = _this$props5$dinoForm.setFields,
          getFields = _this$props5$dinoForm.getFields,
          getFieldsValue = _this$props5$dinoForm.getFieldsValue,
          verify = _this$props5$dinoForm.verify,
          store = _this$props5$dinoForm.store,
          label = _this$props5.label,
          field = _this$props5.field,
          Com = _this$props5.Com,
          _this$props5$comProps = _this$props5.comProps,
          comProps = _this$props5$comProps === void 0 ? {} : _this$props5$comProps,
          _this$props5$rules = _this$props5.rules,
          rules = _this$props5$rules === void 0 ? [] : _this$props5$rules,
          _this$props5$renderDi = _this$props5.renderDinoFormItem,
          renderDinoFormItem = _this$props5$renderDi === void 0 ? this.defaultRender : _this$props5$renderDi;
      this.syncToStore({
        isMount: true
      });

      var _store$get = store.get(field),
          error = _store$get.error;

      var _getFieldsValue3 = getFieldsValue(field),
          _getFieldsValue4 = (0, _slicedToArray2.default)(_getFieldsValue3, 1),
          value = _getFieldsValue4[0];

      return renderDinoFormItem({
        label: label,
        error: error,
        renderCom: function renderCom() {
          return _react.default.createElement(Com, (0, _extends2.default)({}, comProps, {
            value: value,
            error: error
          }, _this3.setRule(), {
            ref: function ref(_ref5) {
              _this3.com = _ref5;
            }
          }));
        }
      });
    }
  }]);
  return DinoFormItem;
}(_react.default.Component);

DinoFormItem.defaultProps = {};
var _default = DinoFormItem;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIkRpbm9Gb3JtSXRlbSIsImlzTW91bnQiLCJwcm9wcyIsImRpbm9Gb3JtIiwic3RvcmUiLCJnZXRGaWVsZHNWYWx1ZSIsImZpZWxkIiwicnVsZXMiLCJsYWJlbCIsImluaXRWYWx1ZSIsInZhbHVlIiwidXBkYXRlIiwiZm9ybUl0ZW0iLCJjb21SZWYiLCJjb20iLCJhcmciLCJzZXRGaWVsZHMiLCJzZXRGaWVsZHNWYWx1ZSIsIndha2VVcCIsInNldEZpZWxkc0Vycm9yIiwiZmllbGROYW1lIiwiY29tUHJvcHMiLCJldmVudHMiLCJyZWR1Y2VSaWdodCIsInRyaWdnZXIiLCJydWxlIiwidmFsaWRhdGVUcmlnZ2VyIiwiZnVuIiwiZXJyb3IiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwicHJlVHJpZ2dlciIsImZpcnN0QXJnIiwidW5kZWZpbmVkIiwibWVyZ2VFdmVudEZvcm1Db21Qcm9wcyIsInByb3BzS2V5IiwicHJvcHNWYWx1ZSIsImV2ZW50IiwiYXJncyIsIm9uQ2hhbmdlIiwicmVuZGVyQ29tIiwiY2xpY2tMYWJlbCIsInN5bmNUb1N0b3JlIiwicmVzZXRXaGVuVW5tb3VudCIsImdldEZpZWxkcyIsInZlcmlmeSIsIkNvbSIsInJlbmRlckRpbm9Gb3JtSXRlbSIsImRlZmF1bHRSZW5kZXIiLCJnZXQiLCJzZXRSdWxlIiwicmVmIiwiUmVhY3QiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0lBRU1BLFk7Ozs7Ozs7Ozs7Ozs7Ozs7O29JQStCVSxZQUVIO0FBQUEscUZBQVAsRUFBTztBQUFBLDhCQURUQyxPQUNTO0FBQUEsVUFEVEEsT0FDUyw2QkFEQyxJQUNEOztBQUFBLHdCQVVMLE1BQUtDLEtBVkE7QUFBQSw2Q0FFUEMsUUFGTztBQUFBLFVBR0xDLEtBSEssd0JBR0xBLEtBSEs7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QixRQUFBQSxLQUFLLEVBQUxBLEtBRndCO0FBR3hCWSxRQUFBQSxTQUFTLEVBQUU7QUFBQSxpQkFDVCw2QkFBQyxHQUFELDZCQUNPbkIsUUFEUDtBQUVFLFlBQUEsS0FBSyxFQUFHWCxLQUZWO0FBR0UsWUFBQSxLQUFLLEVBQUdrQjtBQUhWLGFBS08sTUFBSSxDQUFDc0IsT0FBTCxFQUxQO0FBT0UsWUFBQSxHQUFHLEVBQUcsYUFBQ0MsS0FBRCxFQUFTO0FBQUUsY0FBQSxNQUFJLENBQUNyQyxHQUFMLEdBQVdxQyxLQUFYO0FBQWlCO0FBUHBDLGFBRFM7QUFBQTtBQUhhLE9BQUQsQ0FBekI7QUFlRDs7O0VBaE13QkMsZUFBTUMsUzs7QUFtTWpDckQsWUFBWSxDQUFDc0QsWUFBYixHQUE0QixFQUE1QjtlQUlldEQsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1hcE9iamVjdCwgZ2V0VmFsdWVGcm9tRXZlbnQsIGlzRXZlbnRPYmosIHByZWZpeCB9IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIERpbm9Gb3JtSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIC8vIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gIC8vICAgc3VwZXIocHJvcHMpO1xuICAvLyAgIHRoaXMuc3RhdGUgPSB7XG4gIC8vICAgICAvLyBtZXNzYWdlOiB1bmRlZmluZWQsXG4gIC8vICAgfTtcbiAgLy8gfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiB0cnVlIH0pO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIC8vIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgcmVzZXRXaGVuVW5tb3VudCA9IHRydWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAocmVzZXRXaGVuVW5tb3VudCkge1xuICAgICAgc3RvcmUudXBkYXRlKGZpZWxkLCB7XG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IGZhbHNlIH0pO1xuICB9XG5cbiAgc3luY1RvU3RvcmUgPSAoe1xuICAgIGlzTW91bnQgPSB0cnVlLFxuICB9ID0ge30pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgICBydWxlcyxcbiAgICAgIGxhYmVsLFxuICAgICAgaW5pdFZhbHVlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgW3ZhbHVlXSA9IGdldEZpZWxkc1ZhbHVlKGZpZWxkKTtcblxuICAgIHN0b3JlLnVwZGF0ZShmaWVsZCwge1xuICAgICAgdmFsdWUsXG4gICAgICBydWxlcyxcbiAgICAgIGxhYmVsLFxuICAgICAgaW5pdFZhbHVlLFxuICAgICAgZm9ybUl0ZW06IHRoaXMsXG4gICAgICBjb21SZWY6IHRoaXMuY29tLFxuICAgICAgaXNNb3VudCxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKGFyZywgLi4ub3RoZXJzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIHNldEZpZWxkcyxcbiAgICAgICAgc2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooYXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGFyZykgOiBhcmc7XG5cbiAgICBzZXRGaWVsZHNWYWx1ZSh7XG4gICAgICBbZmllbGRdOiB2YWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNsaWNrTGFiZWwgPSAoKSA9PiB7XG4gICAgdGhpcy5jb20gJiYgdGhpcy5jb20ud2FrZVVwICYmIHRoaXMuY29tLndha2VVcCgpO1xuICB9XG5cbiAgc2V0UnVsZSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICAgIHNldEZpZWxkc0Vycm9yLFxuICAgICAgfSxcbiAgICAgIGxhYmVsLFxuICAgICAgZmllbGQsXG4gICAgICBmaWVsZE5hbWUsXG4gICAgICBjb21Qcm9wcyA9IHt9LFxuICAgICAgcnVsZXMgPSBbXSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGV2ZW50cyA9IHJ1bGVzLnJlZHVjZVJpZ2h0KCh0cmlnZ2VyLCBydWxlKSA9PiB7XG4gICAgICBjb25zdCB7IHZhbGlkYXRlVHJpZ2dlciA9IFtdLCBmdW4sIGVycm9yIH0gPSBydWxlO1xuICAgICAgdmFsaWRhdGVUcmlnZ2VyLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwcmVUcmlnZ2VyID0gdHJpZ2dlcltldmVudE5hbWVdIHx8ICgoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJbZXZlbnROYW1lXSA9IGFzeW5jIChmaXJzdEFyZywgLi4uYXJnKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBpc0V2ZW50T2JqKGZpcnN0QXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGZpcnN0QXJnKSA6IGZpcnN0QXJnO1xuICAgICAgICAgIGlmIChhd2FpdCBmdW4odmFsdWUsIC4uLmFyZykpIHtcbiAgICAgICAgICAgIHNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgcHJlVHJpZ2dlcih2YWx1ZSwgLi4uYXJnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvcih7IGxhYmVsLCBmaWVsZCB9KSB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyaWdnZXI7XG4gICAgfSwge30pO1xuXG4gICAgY29uc3QgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcyA9IHtcbiAgICAgIC4uLmV2ZW50cyxcbiAgICAgIC4uLm1hcE9iamVjdChjb21Qcm9wcywgKHByb3BzS2V5LCBwcm9wc1ZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW3Byb3BzS2V5XTtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFtwcm9wc0tleV0odmFsdWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgcHJvcHNWYWx1ZSh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgIHJldHVybiBldmVudCh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSksXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5tZXJnZUV2ZW50Rm9ybUNvbVByb3BzLFxuICAgICAgb25DaGFuZ2U6ICh2YWx1ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcy5vbkNoYW5nZSAmJiBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzLm9uQ2hhbmdlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGRlZmF1bHRSZW5kZXIgPSAoe1xuICAgIGxhYmVsLFxuICAgIGVycm9yLFxuICAgIHJlbmRlckNvbSxcbiAgfSA9IHt9KSA9PiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtJyl9ICR7ZXJyb3IgPyAnaGFzLWVycm9yJyA6ICcnfWAgfT5cbiAgICAgIDxkaXZcbiAgICAgICAgb25DbGljaz17IHRoaXMuY2xpY2tMYWJlbCB9XG4gICAgICAgIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1sYWJlbCcpfWAgfT5cbiAgICAgICAgeyBsYWJlbCB9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWNvbS1lcnJvcicpfWAgfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tY29tJyl9YCB9PlxuICAgICAgICAgIHsgcmVuZGVyQ29tKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyBlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1lcnJvcicpfWAgfT57ZXJyb3J9PC9kaXY+IH1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgIGdldEZpZWxkcyxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICAgIHZlcmlmeSxcbiAgICAgICAgc3RvcmUsXG4gICAgICB9LFxuICAgICAgbGFiZWwsXG4gICAgICBmaWVsZCxcbiAgICAgIENvbSxcbiAgICAgIGNvbVByb3BzID0ge30sXG4gICAgICBydWxlcyA9IFtdLFxuICAgICAgcmVuZGVyRGlub0Zvcm1JdGVtID0gdGhpcy5kZWZhdWx0UmVuZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IHRydWUgfSk7XG5cbiAgICBjb25zdCB7IGVycm9yIH0gPSBzdG9yZS5nZXQoZmllbGQpO1xuICAgIGNvbnN0IFt2YWx1ZV0gPSBnZXRGaWVsZHNWYWx1ZShmaWVsZCk7XG5cbiAgICByZXR1cm4gcmVuZGVyRGlub0Zvcm1JdGVtKHtcbiAgICAgIGxhYmVsLFxuICAgICAgZXJyb3IsXG4gICAgICByZW5kZXJDb206ICgpID0+IChcbiAgICAgICAgPENvbVxuICAgICAgICAgIHsgLi4uY29tUHJvcHMgfVxuICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgIGVycm9yPXsgZXJyb3IgfVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLnRoaXMuc2V0UnVsZSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZj17IChyZWYpID0+IHsgdGhpcy5jb20gPSByZWY7IH0gfVxuICAgICAgICAgIC8+XG4gICAgICApLFxuICAgIH0pO1xuICB9XG59XG5cbkRpbm9Gb3JtSXRlbS5kZWZhdWx0UHJvcHMgPSB7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbm9Gb3JtSXRlbTtcbiJdfQ==