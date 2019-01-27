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
            propsValue();

            for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              args[_key3 - 1] = arguments[_key3];
            }

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
          _this$props5$renderDi = _this$props5.renderDinoForm,
          renderDinoForm = _this$props5$renderDi === void 0 ? this.defaultRender : _this$props5$renderDi;
      this.syncToStore({
        isMount: true
      });

      var _store$get = store.get(field),
          error = _store$get.error;

      var _getFieldsValue3 = getFieldsValue(field),
          _getFieldsValue4 = (0, _slicedToArray2.default)(_getFieldsValue3, 1),
          value = _getFieldsValue4[0];

      return renderDinoForm({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIkRpbm9Gb3JtSXRlbSIsImlzTW91bnQiLCJwcm9wcyIsImRpbm9Gb3JtIiwic3RvcmUiLCJnZXRGaWVsZHNWYWx1ZSIsImZpZWxkIiwicnVsZXMiLCJsYWJlbCIsImluaXRWYWx1ZSIsInZhbHVlIiwidXBkYXRlIiwiZm9ybUl0ZW0iLCJjb21SZWYiLCJjb20iLCJhcmciLCJzZXRGaWVsZHMiLCJzZXRGaWVsZHNWYWx1ZSIsIndha2VVcCIsInNldEZpZWxkc0Vycm9yIiwiZmllbGROYW1lIiwiY29tUHJvcHMiLCJldmVudHMiLCJyZWR1Y2VSaWdodCIsInRyaWdnZXIiLCJydWxlIiwidmFsaWRhdGVUcmlnZ2VyIiwiZnVuIiwiZXJyb3IiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwicHJlVHJpZ2dlciIsImZpcnN0QXJnIiwidW5kZWZpbmVkIiwibWVyZ2VFdmVudEZvcm1Db21Qcm9wcyIsInByb3BzS2V5IiwicHJvcHNWYWx1ZSIsImV2ZW50IiwiYXJncyIsIm9uQ2hhbmdlIiwicmVuZGVyQ29tIiwiY2xpY2tMYWJlbCIsInN5bmNUb1N0b3JlIiwicmVzZXRXaGVuVW5tb3VudCIsImdldEZpZWxkcyIsInZlcmlmeSIsIkNvbSIsInJlbmRlckRpbm9Gb3JtIiwiZGVmYXVsdFJlbmRlciIsImdldCIsInNldFJ1bGUiLCJyZWYiLCJSZWFjdCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7SUFFTUEsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7b0lBK0JVLFlBRUg7QUFBQSxxRkFBUCxFQUFPO0FBQUEsOEJBRFRDLE9BQ1M7QUFBQSxVQURUQSxPQUNTLDZCQURDLElBQ0Q7O0FBQUEsd0JBVUwsTUFBS0MsS0FWQTtBQUFBLDZDQUVQQyxRQUZPO0FBQUEsVUFHTEMsS0FISyx3QkFHTEEsS0FISztBQUFB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U0FBUyxFQUFFO0FBQUEsaUJBQ1QsNkJBQUMsR0FBRCw2QkFDT25CLFFBRFA7QUFFRSxZQUFBLEtBQUssRUFBR1gsS0FGVjtBQUdFLFlBQUEsS0FBSyxFQUFHa0I7QUFIVixhQUtPLE1BQUksQ0FBQ3NCLE9BQUwsRUFMUDtBQU9FLFlBQUEsR0FBRyxFQUFHLGFBQUNDLEtBQUQsRUFBUztBQUFFLGNBQUEsTUFBSSxDQUFDckMsR0FBTCxHQUFXcUMsS0FBWDtBQUFpQjtBQVBwQyxhQURTO0FBQUE7QUFIUyxPQUFELENBQXJCO0FBZUQ7OztFQWhNd0JDLGVBQU1DLFM7O0FBbU1qQ3JELFlBQVksQ0FBQ3NELFlBQWIsR0FBNEIsRUFBNUI7ZUFJZXRELFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtYXBPYmplY3QsIGdldFZhbHVlRnJvbUV2ZW50LCBpc0V2ZW50T2JqLCBwcmVmaXggfSBmcm9tICcuL3V0aWwnO1xuXG5jbGFzcyBEaW5vRm9ybUl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAvLyBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAvLyAgIHN1cGVyKHByb3BzKTtcbiAgLy8gICB0aGlzLnN0YXRlID0ge1xuICAvLyAgICAgLy8gbWVzc2FnZTogdW5kZWZpbmVkLFxuICAvLyAgIH07XG4gIC8vIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnN5bmNUb1N0b3JlKHsgaXNNb3VudDogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICAvLyBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBmaWVsZCxcbiAgICAgIHJlc2V0V2hlblVubW91bnQgPSB0cnVlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHJlc2V0V2hlblVubW91bnQpIHtcbiAgICAgIHN0b3JlLnVwZGF0ZShmaWVsZCwge1xuICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiBmYWxzZSB9KTtcbiAgfVxuXG4gIHN5bmNUb1N0b3JlID0gKHtcbiAgICBpc01vdW50ID0gdHJ1ZSxcbiAgfSA9IHt9KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgcnVsZXMsXG4gICAgICBsYWJlbCxcbiAgICAgIGluaXRWYWx1ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IFt2YWx1ZV0gPSBnZXRGaWVsZHNWYWx1ZShmaWVsZCk7XG5cbiAgICBzdG9yZS51cGRhdGUoZmllbGQsIHtcbiAgICAgIHZhbHVlLFxuICAgICAgcnVsZXMsXG4gICAgICBsYWJlbCxcbiAgICAgIGluaXRWYWx1ZSxcbiAgICAgIGZvcm1JdGVtOiB0aGlzLFxuICAgICAgY29tUmVmOiB0aGlzLmNvbSxcbiAgICAgIGlzTW91bnQsXG4gICAgfSk7XG4gIH1cblxuICBvbkNoYW5nZSA9IChhcmcsIC4uLm90aGVycykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgdmFsdWUgPSBpc0V2ZW50T2JqKGFyZykgPyBnZXRWYWx1ZUZyb21FdmVudChhcmcpIDogYXJnO1xuXG4gICAgc2V0RmllbGRzVmFsdWUoe1xuICAgICAgW2ZpZWxkXTogdmFsdWUsXG4gICAgfSk7XG4gIH1cblxuICBjbGlja0xhYmVsID0gKCkgPT4ge1xuICAgIHRoaXMuY29tICYmIHRoaXMuY29tLndha2VVcCAmJiB0aGlzLmNvbS53YWtlVXAoKTtcbiAgfVxuXG4gIHNldFJ1bGUgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgICBzZXRGaWVsZHNFcnJvcixcbiAgICAgIH0sXG4gICAgICBsYWJlbCxcbiAgICAgIGZpZWxkLFxuICAgICAgZmllbGROYW1lLFxuICAgICAgY29tUHJvcHMgPSB7fSxcbiAgICAgIHJ1bGVzID0gW10sXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBldmVudHMgPSBydWxlcy5yZWR1Y2VSaWdodCgodHJpZ2dlciwgcnVsZSkgPT4ge1xuICAgICAgY29uc3QgeyB2YWxpZGF0ZVRyaWdnZXIgPSBbXSwgZnVuLCBlcnJvciB9ID0gcnVsZTtcbiAgICAgIHZhbGlkYXRlVHJpZ2dlci5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcHJlVHJpZ2dlciA9IHRyaWdnZXJbZXZlbnROYW1lXSB8fCAoKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyW2V2ZW50TmFtZV0gPSBhc3luYyAoZmlyc3RBcmcsIC4uLmFyZykgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXNFdmVudE9iaihmaXJzdEFyZykgPyBnZXRWYWx1ZUZyb21FdmVudChmaXJzdEFyZykgOiBmaXJzdEFyZztcbiAgICAgICAgICBpZiAoYXdhaXQgZnVuKHZhbHVlLCAuLi5hcmcpKSB7XG4gICAgICAgICAgICBzZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IHVuZGVmaW5lZCB9KTtcbiAgICAgICAgICAgIHByZVRyaWdnZXIodmFsdWUsIC4uLmFyZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogZXJyb3IoeyBsYWJlbCwgZmllbGQgfSkgfSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgIH0sIHt9KTtcblxuICAgIGNvbnN0IG1lcmdlRXZlbnRGb3JtQ29tUHJvcHMgPSB7XG4gICAgICAuLi5ldmVudHMsXG4gICAgICAuLi5tYXBPYmplY3QoY29tUHJvcHMsIChwcm9wc0tleSwgcHJvcHNWYWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1twcm9wc0tleV07XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbcHJvcHNLZXldKHZhbHVlLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICAgIHByb3BzVmFsdWUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50KHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge307XG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm1lcmdlRXZlbnRGb3JtQ29tUHJvcHMsXG4gICAgICBvbkNoYW5nZTogKHZhbHVlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgICBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzLm9uQ2hhbmdlICYmIG1lcmdlRXZlbnRGb3JtQ29tUHJvcHMub25DaGFuZ2UodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgZGVmYXVsdFJlbmRlciA9ICh7XG4gICAgbGFiZWwsXG4gICAgZXJyb3IsXG4gICAgcmVuZGVyQ29tLFxuICB9ID0ge30pID0+IChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0nKX0gJHtlcnJvciA/ICdoYXMtZXJyb3InIDogJyd9YCB9PlxuICAgICAgPGRpdlxuICAgICAgICBvbkNsaWNrPXsgdGhpcy5jbGlja0xhYmVsIH1cbiAgICAgICAgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWxhYmVsJyl9YCB9PlxuICAgICAgICB7IGxhYmVsIH1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tY29tLWVycm9yJyl9YCB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1jb20nKX1gIH0+XG4gICAgICAgICAgeyByZW5kZXJDb20oKSB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7IGVycm9yICYmIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWVycm9yJyl9YCB9PntlcnJvcn08L2Rpdj4gfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHNldEZpZWxkcyxcbiAgICAgICAgZ2V0RmllbGRzLFxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgdmVyaWZ5LFxuICAgICAgICBzdG9yZSxcbiAgICAgIH0sXG4gICAgICBsYWJlbCxcbiAgICAgIGZpZWxkLFxuICAgICAgQ29tLFxuICAgICAgY29tUHJvcHMgPSB7fSxcbiAgICAgIHJ1bGVzID0gW10sXG4gICAgICByZW5kZXJEaW5vRm9ybSA9IHRoaXMuZGVmYXVsdFJlbmRlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiB0cnVlIH0pO1xuXG4gICAgY29uc3QgeyBlcnJvciB9ID0gc3RvcmUuZ2V0KGZpZWxkKTtcbiAgICBjb25zdCBbdmFsdWVdID0gZ2V0RmllbGRzVmFsdWUoZmllbGQpO1xuXG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtKHtcbiAgICAgIGxhYmVsLFxuICAgICAgZXJyb3IsXG4gICAgICByZW5kZXJDb206ICgpID0+IChcbiAgICAgICAgPENvbVxuICAgICAgICAgIHsgLi4uY29tUHJvcHMgfVxuICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgIGVycm9yPXsgZXJyb3IgfVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLnRoaXMuc2V0UnVsZSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZj17IChyZWYpID0+IHsgdGhpcy5jb20gPSByZWY7IH0gfVxuICAgICAgICAgIC8+XG4gICAgICApLFxuICAgIH0pO1xuICB9XG59XG5cbkRpbm9Gb3JtSXRlbS5kZWZhdWx0UHJvcHMgPSB7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbm9Gb3JtSXRlbTtcbiJdfQ==