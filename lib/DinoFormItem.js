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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _util = require("./util");

var DinoFormItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(DinoFormItem, _React$Component);

  function DinoFormItem(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DinoFormItem);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DinoFormItem).call(this, props));
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

      var _getFieldsValue2 = getFieldsValue(field),
          _getFieldsValue3 = (0, _slicedToArray2.default)(_getFieldsValue2, 1),
          value = _getFieldsValue3[0];

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
                  _len,
                  arg,
                  _key,
                  _args = arguments;

              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      value = (0, _util.isEventObj)(firstArg) ? (0, _util.getValueFromEvent)(firstArg) : firstArg;

                      for (_len = _args.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        arg[_key - 1] = _args[_key];
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
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            propsValue.apply(void 0, [value].concat(args));
            return event.apply(void 0, [value].concat(args));
          });
        }

        return (0, _defineProperty2.default)({}, propsKey, propsValue);
      }));
      return (0, _objectSpread2.default)({}, mergeEventFormComProps, {
        onChange: function onChange(value) {
          var _this2;

          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }

          (_this2 = _this).onChange.apply(_this2, [value].concat(args));

          mergeEventFormComProps.onChange && mergeEventFormComProps.onChange.apply(mergeEventFormComProps, [value].concat(args));
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "defaultRender", function () {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          label = _ref5.label,
          error = _ref5.error,
          renderCom = _ref5.renderCom;

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
    var _props$dinoForm = props.dinoForm,
        _store = _props$dinoForm.store,
        _getFieldsValue = _props$dinoForm.getFieldsValue,
        _field = props.field,
        _initValue = props.initValue;

    if (!_field) {
      console.warn('[dino-form] This FormItem has no field');
    }

    var _getFieldsValue4 = _getFieldsValue(_field),
        _getFieldsValue5 = (0, _slicedToArray2.default)(_getFieldsValue4, 1),
        storeValue = _getFieldsValue5[0];

    var _value = (0, _util.isExist)(storeValue) ? storeValue : (0, _util.isExist)(_initValue) ? _initValue : undefined;

    _store.update(_field, {
      value: _value
    });

    return _this;
  }

  (0, _createClass2.default)(DinoFormItem, [{
    key: "componentDidMount",
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

      var _getFieldsValue6 = getFieldsValue(field),
          _getFieldsValue7 = (0, _slicedToArray2.default)(_getFieldsValue6, 1),
          value = _getFieldsValue7[0];

      return renderDinoFormItem({
        label: label,
        error: error,
        renderCom: function renderCom() {
          return _react.default.createElement(Com, (0, _extends2.default)({}, comProps, {
            value: value,
            error: error
          }, _this3.setRule(), {
            ref: function ref(_ref6) {
              _this3.com = _ref6;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIkRpbm9Gb3JtSXRlbSIsInByb3BzIiwiaXNNb3VudCIsImRpbm9Gb3JtIiwic3RvcmUiLCJnZXRGaWVsZHNWYWx1ZSIsImZpZWxkIiwicnVsZXMiLCJsYWJlbCIsImluaXRWYWx1ZSIsInZhbHVlIiwidXBkYXRlIiwiZm9ybUl0ZW0iLCJjb21SZWYiLCJjb20iLCJhcmciLCJzZXRGaWVsZHMiLCJzZXRGaWVsZHNWYWx1ZSIsIndha2VVcCIsInNldEZpZWxkc0Vycm9yIiwiZmllbGROYW1lIiwiY29tUHJvcHMiLCJldmVudHMiLCJyZWR1Y2VSaWdodCIsInRyaWdnZXIiLCJydWxlIiwidmFsaWRhdGVUcmlnZ2VyIiwiZnVuIiwiZXJyb3IiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwicHJlVHJpZ2dlciIsImZpcnN0QXJnIiwidW5kZWZpbmVkIiwibWVyZ2VFdmVudEZvcm1Db21Qcm9wcyIsInByb3BzS2V5IiwicHJvcHNWYWx1ZSIsImV2ZW50IiwiYXJncyIsIm9uQ2hhbmdlIiwicmVuZGVyQ29tIiwiY2xpY2tMYWJlbCIsImNvbnNvbGUiLCJ3YXJuIiwic3RvcmVWYWx1ZSIsInN5bmNUb1N0b3JlIiwicmVzZXRXaGVuVW5tb3VudCIsImdldEZpZWxkcyIsInZlcmlmeSIsIkNvbSIsInJlbmRlckRpbm9Gb3JtSXRlbSIsImRlZmF1bHRSZW5kZXIiLCJnZXQiLCJzZXRSdWxlIiwicmVmIiwiUmVhY3QiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0lBSU1BLFk7Ozs7O0FBQ0osd0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTtBQUNqQixrSEFBTUEsS0FBTjtBQURpQixvSUFpREwsWUFFSDtBQUFBLHFGQUFQLEVBQU87QUFBQSw4QkFEVEMsT0FDUztBQUFBLFVBRFRBLE9BQ1MsNkJB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QUFDeUQsWUFBYixHQUE0QixFQUE1QjtlQUllekQsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIG1hcE9iamVjdCwgZ2V0VmFsdWVGcm9tRXZlbnQsIGlzRXZlbnRPYmosIHByZWZpeCwgaXNFeGlzdCxcbn0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgRGlub0Zvcm1JdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgaW5pdFZhbHVlLFxuICAgIH0gPSBwcm9wcztcblxuICAgIGlmICghZmllbGQpIHtcbiAgICAgIGNvbnNvbGUud2FybignW2Rpbm8tZm9ybV0gVGhpcyBGb3JtSXRlbSBoYXMgbm8gZmllbGQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBbc3RvcmVWYWx1ZV0gPSBnZXRGaWVsZHNWYWx1ZShmaWVsZCk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IGlzRXhpc3Qoc3RvcmVWYWx1ZSlcbiAgICAgID8gc3RvcmVWYWx1ZVxuICAgICAgOiBpc0V4aXN0KGluaXRWYWx1ZSlcbiAgICAgICAgPyBpbml0VmFsdWVcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBzdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWUgfSk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnN5bmNUb1N0b3JlKHsgaXNNb3VudDogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICAvLyBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBmaWVsZCxcbiAgICAgIHJlc2V0V2hlblVubW91bnQgPSB0cnVlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHJlc2V0V2hlblVubW91bnQpIHtcbiAgICAgIHN0b3JlLnVwZGF0ZShmaWVsZCwge1xuICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiBmYWxzZSB9KTtcbiAgfVxuXG4gIHN5bmNUb1N0b3JlID0gKHtcbiAgICBpc01vdW50ID0gdHJ1ZSxcbiAgfSA9IHt9KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgcnVsZXMsXG4gICAgICBsYWJlbCxcbiAgICAgIGluaXRWYWx1ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IFt2YWx1ZV0gPSBnZXRGaWVsZHNWYWx1ZShmaWVsZCk7XG5cbiAgICBzdG9yZS51cGRhdGUoZmllbGQsIHtcbiAgICAgIHZhbHVlLFxuICAgICAgcnVsZXMsXG4gICAgICBsYWJlbCxcbiAgICAgIGluaXRWYWx1ZSxcbiAgICAgIGZvcm1JdGVtOiB0aGlzLFxuICAgICAgY29tUmVmOiB0aGlzLmNvbSxcbiAgICAgIGlzTW91bnQsXG4gICAgfSk7XG4gIH1cblxuICBvbkNoYW5nZSA9IChhcmcsIC4uLm90aGVycykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgdmFsdWUgPSBpc0V2ZW50T2JqKGFyZykgPyBnZXRWYWx1ZUZyb21FdmVudChhcmcpIDogYXJnO1xuXG4gICAgc2V0RmllbGRzVmFsdWUoe1xuICAgICAgW2ZpZWxkXTogdmFsdWUsXG4gICAgfSk7XG4gIH1cblxuICBjbGlja0xhYmVsID0gKCkgPT4ge1xuICAgIHRoaXMuY29tICYmIHRoaXMuY29tLndha2VVcCAmJiB0aGlzLmNvbS53YWtlVXAoKTtcbiAgfVxuXG4gIHNldFJ1bGUgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgICBzZXRGaWVsZHNFcnJvcixcbiAgICAgIH0sXG4gICAgICBsYWJlbCxcbiAgICAgIGZpZWxkLFxuICAgICAgZmllbGROYW1lLFxuICAgICAgY29tUHJvcHMgPSB7fSxcbiAgICAgIHJ1bGVzID0gW10sXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBldmVudHMgPSBydWxlcy5yZWR1Y2VSaWdodCgodHJpZ2dlciwgcnVsZSkgPT4ge1xuICAgICAgY29uc3QgeyB2YWxpZGF0ZVRyaWdnZXIgPSBbXSwgZnVuLCBlcnJvciB9ID0gcnVsZTtcbiAgICAgIHZhbGlkYXRlVHJpZ2dlci5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcHJlVHJpZ2dlciA9IHRyaWdnZXJbZXZlbnROYW1lXSB8fCAoKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyW2V2ZW50TmFtZV0gPSBhc3luYyAoZmlyc3RBcmcsIC4uLmFyZykgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXNFdmVudE9iaihmaXJzdEFyZykgPyBnZXRWYWx1ZUZyb21FdmVudChmaXJzdEFyZykgOiBmaXJzdEFyZztcbiAgICAgICAgICBpZiAoYXdhaXQgZnVuKHZhbHVlLCAuLi5hcmcpKSB7XG4gICAgICAgICAgICBzZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IHVuZGVmaW5lZCB9KTtcbiAgICAgICAgICAgIHByZVRyaWdnZXIodmFsdWUsIC4uLmFyZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogZXJyb3IoeyBsYWJlbCwgZmllbGQgfSkgfSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgIH0sIHt9KTtcblxuICAgIGNvbnN0IG1lcmdlRXZlbnRGb3JtQ29tUHJvcHMgPSB7XG4gICAgICAuLi5ldmVudHMsXG4gICAgICAuLi5tYXBPYmplY3QoY29tUHJvcHMsIChwcm9wc0tleSwgcHJvcHNWYWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1twcm9wc0tleV07XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbcHJvcHNLZXldKHZhbHVlLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICAgIHByb3BzVmFsdWUodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXR1cm4gZXZlbnQodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IFtwcm9wc0tleV06IHByb3BzVmFsdWUgfTtcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ubWVyZ2VFdmVudEZvcm1Db21Qcm9wcyxcbiAgICAgIG9uQ2hhbmdlOiAodmFsdWUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgIG1lcmdlRXZlbnRGb3JtQ29tUHJvcHMub25DaGFuZ2UgJiYgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcy5vbkNoYW5nZSh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBkZWZhdWx0UmVuZGVyID0gKHtcbiAgICBsYWJlbCxcbiAgICBlcnJvcixcbiAgICByZW5kZXJDb20sXG4gIH0gPSB7fSkgPT4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbScpfSAke2Vycm9yID8gJ2hhcy1lcnJvcicgOiAnJ31gIH0+XG4gICAgICA8ZGl2XG4gICAgICAgIG9uQ2xpY2s9eyB0aGlzLmNsaWNrTGFiZWwgfVxuICAgICAgICBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tbGFiZWwnKX1gIH0+XG4gICAgICAgIHsgbGFiZWwgfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1jb20tZXJyb3InKX1gIH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWNvbScpfWAgfT5cbiAgICAgICAgICB7IHJlbmRlckNvbSgpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgZXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tZXJyb3InKX1gIH0+e2Vycm9yfTwvZGl2PiB9XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gIClcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc2V0RmllbGRzLFxuICAgICAgICBnZXRGaWVsZHMsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgICB2ZXJpZnksXG4gICAgICAgIHN0b3JlLFxuICAgICAgfSxcbiAgICAgIGxhYmVsLFxuICAgICAgZmllbGQsXG4gICAgICBDb20sXG4gICAgICBjb21Qcm9wcyA9IHt9LFxuICAgICAgcnVsZXMgPSBbXSxcbiAgICAgIHJlbmRlckRpbm9Gb3JtSXRlbSA9IHRoaXMuZGVmYXVsdFJlbmRlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiB0cnVlIH0pO1xuXG4gICAgY29uc3QgeyBlcnJvciB9ID0gc3RvcmUuZ2V0KGZpZWxkKTtcbiAgICBjb25zdCBbdmFsdWVdID0gZ2V0RmllbGRzVmFsdWUoZmllbGQpO1xuXG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtSXRlbSh7XG4gICAgICBsYWJlbCxcbiAgICAgIGVycm9yLFxuICAgICAgcmVuZGVyQ29tOiAoKSA9PiAoXG4gICAgICAgIDxDb21cbiAgICAgICAgICB7IC4uLmNvbVByb3BzIH1cbiAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICBlcnJvcj17IGVycm9yIH1cbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi50aGlzLnNldFJ1bGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZWY9eyAocmVmKSA9PiB7IHRoaXMuY29tID0gcmVmOyB9IH1cbiAgICAgICAgICAvPlxuICAgICAgKSxcbiAgICB9KTtcbiAgfVxufVxuXG5EaW5vRm9ybUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaW5vRm9ybUl0ZW07XG4iXX0=