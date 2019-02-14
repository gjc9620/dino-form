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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIkRpbm9Gb3JtSXRlbSIsInByb3BzIiwiaXNNb3VudCIsImRpbm9Gb3JtIiwic3RvcmUiLCJnZXRGaWVsZHNWYWx1ZSIsImZpZWxkIiwicnVsZXMiLCJsYWJlbCIsImluaXRWYWx1ZSIsInZhbHVlIiwidXBkYXRlIiwiZm9ybUl0ZW0iLCJjb21SZWYiLCJjb20iLCJhcmciLCJzZXRGaWVsZHMiLCJzZXRGaWVsZHNWYWx1ZSIsIndha2VVcCIsInNldEZpZWxkc0Vycm9yIiwiZmllbGROYW1lIiwiY29tUHJvcHMiLCJldmVudHMiLCJyZWR1Y2VSaWdodCIsInRyaWdnZXIiLCJydWxlIiwidmFsaWRhdGVUcmlnZ2VyIiwiZnVuIiwiZXJyb3IiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwicHJlVHJpZ2dlciIsImZpcnN0QXJnIiwidW5kZWZpbmVkIiwibWVyZ2VFdmVudEZvcm1Db21Qcm9wcyIsInByb3BzS2V5IiwicHJvcHNWYWx1ZSIsImV2ZW50IiwiYXJncyIsIm9uQ2hhbmdlIiwicmVuZGVyQ29tIiwiY2xpY2tMYWJlbCIsInN0b3JlVmFsdWUiLCJzeW5jVG9TdG9yZSIsInJlc2V0V2hlblVubW91bnQiLCJnZXRGaWVsZHMiLCJ2ZXJpZnkiLCJDb20iLCJyZW5kZXJEaW5vRm9ybUl0ZW0iLCJkZWZhdWx0UmVuZGVyIiwiZ2V0Iiwic2V0UnVsZSIsInJlZiIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztJQUlNQSxZOzs7OztBQUNKLHdCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7QUFDakIsa0hBQU1BLEtBQU47QUFEaUIsb0lBNkNMLFlBRUg7QUFBQSxxRkFBUCxFQUFPO0FBQUEsOEJBRFRDLE9BQ1M7QUFBQSxVQURUQSxPQUNTLDZCQURDLElBQ0Q7O0FBQUEsd0JB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b20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIG1hcE9iamVjdCwgZ2V0VmFsdWVGcm9tRXZlbnQsIGlzRXZlbnRPYmosIHByZWZpeCwgaXNFeGlzdCxcbn0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgRGlub0Zvcm1JdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgaW5pdFZhbHVlLFxuICAgIH0gPSBwcm9wcztcblxuICAgIGNvbnN0IFtzdG9yZVZhbHVlXSA9IGdldEZpZWxkc1ZhbHVlKGZpZWxkKTtcblxuICAgIGNvbnN0IHZhbHVlID0gaXNFeGlzdChzdG9yZVZhbHVlKVxuICAgICAgPyBzdG9yZVZhbHVlXG4gICAgICA6IGlzRXhpc3QoaW5pdFZhbHVlKVxuICAgICAgICA/IGluaXRWYWx1ZVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZSB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiB0cnVlIH0pO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIC8vIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgcmVzZXRXaGVuVW5tb3VudCA9IHRydWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAocmVzZXRXaGVuVW5tb3VudCkge1xuICAgICAgc3RvcmUudXBkYXRlKGZpZWxkLCB7XG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IGZhbHNlIH0pO1xuICB9XG5cbiAgc3luY1RvU3RvcmUgPSAoe1xuICAgIGlzTW91bnQgPSB0cnVlLFxuICB9ID0ge30pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgICBydWxlcyxcbiAgICAgIGxhYmVsLFxuICAgICAgaW5pdFZhbHVlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgW3ZhbHVlXSA9IGdldEZpZWxkc1ZhbHVlKGZpZWxkKTtcblxuICAgIHN0b3JlLnVwZGF0ZShmaWVsZCwge1xuICAgICAgdmFsdWUsXG4gICAgICBydWxlcyxcbiAgICAgIGxhYmVsLFxuICAgICAgaW5pdFZhbHVlLFxuICAgICAgZm9ybUl0ZW06IHRoaXMsXG4gICAgICBjb21SZWY6IHRoaXMuY29tLFxuICAgICAgaXNNb3VudCxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKGFyZywgLi4ub3RoZXJzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIHNldEZpZWxkcyxcbiAgICAgICAgc2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooYXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGFyZykgOiBhcmc7XG5cbiAgICBzZXRGaWVsZHNWYWx1ZSh7XG4gICAgICBbZmllbGRdOiB2YWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNsaWNrTGFiZWwgPSAoKSA9PiB7XG4gICAgdGhpcy5jb20gJiYgdGhpcy5jb20ud2FrZVVwICYmIHRoaXMuY29tLndha2VVcCgpO1xuICB9XG5cbiAgc2V0UnVsZSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICAgIHNldEZpZWxkc0Vycm9yLFxuICAgICAgfSxcbiAgICAgIGxhYmVsLFxuICAgICAgZmllbGQsXG4gICAgICBmaWVsZE5hbWUsXG4gICAgICBjb21Qcm9wcyA9IHt9LFxuICAgICAgcnVsZXMgPSBbXSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGV2ZW50cyA9IHJ1bGVzLnJlZHVjZVJpZ2h0KCh0cmlnZ2VyLCBydWxlKSA9PiB7XG4gICAgICBjb25zdCB7IHZhbGlkYXRlVHJpZ2dlciA9IFtdLCBmdW4sIGVycm9yIH0gPSBydWxlO1xuICAgICAgdmFsaWRhdGVUcmlnZ2VyLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwcmVUcmlnZ2VyID0gdHJpZ2dlcltldmVudE5hbWVdIHx8ICgoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJbZXZlbnROYW1lXSA9IGFzeW5jIChmaXJzdEFyZywgLi4uYXJnKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBpc0V2ZW50T2JqKGZpcnN0QXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGZpcnN0QXJnKSA6IGZpcnN0QXJnO1xuICAgICAgICAgIGlmIChhd2FpdCBmdW4odmFsdWUsIC4uLmFyZykpIHtcbiAgICAgICAgICAgIHNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgcHJlVHJpZ2dlcih2YWx1ZSwgLi4uYXJnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvcih7IGxhYmVsLCBmaWVsZCB9KSB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyaWdnZXI7XG4gICAgfSwge30pO1xuXG4gICAgY29uc3QgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcyA9IHtcbiAgICAgIC4uLmV2ZW50cyxcbiAgICAgIC4uLm1hcE9iamVjdChjb21Qcm9wcywgKHByb3BzS2V5LCBwcm9wc1ZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW3Byb3BzS2V5XTtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFtwcm9wc0tleV0odmFsdWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgcHJvcHNWYWx1ZSh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgIHJldHVybiBldmVudCh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgW3Byb3BzS2V5XTogcHJvcHNWYWx1ZSB9O1xuICAgICAgfSksXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5tZXJnZUV2ZW50Rm9ybUNvbVByb3BzLFxuICAgICAgb25DaGFuZ2U6ICh2YWx1ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcy5vbkNoYW5nZSAmJiBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzLm9uQ2hhbmdlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGRlZmF1bHRSZW5kZXIgPSAoe1xuICAgIGxhYmVsLFxuICAgIGVycm9yLFxuICAgIHJlbmRlckNvbSxcbiAgfSA9IHt9KSA9PiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtJyl9ICR7ZXJyb3IgPyAnaGFzLWVycm9yJyA6ICcnfWAgfT5cbiAgICAgIDxkaXZcbiAgICAgICAgb25DbGljaz17IHRoaXMuY2xpY2tMYWJlbCB9XG4gICAgICAgIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1sYWJlbCcpfWAgfT5cbiAgICAgICAgeyBsYWJlbCB9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWNvbS1lcnJvcicpfWAgfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tY29tJyl9YCB9PlxuICAgICAgICAgIHsgcmVuZGVyQ29tKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyBlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1lcnJvcicpfWAgfT57ZXJyb3J9PC9kaXY+IH1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgIGdldEZpZWxkcyxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICAgIHZlcmlmeSxcbiAgICAgICAgc3RvcmUsXG4gICAgICB9LFxuICAgICAgbGFiZWwsXG4gICAgICBmaWVsZCxcbiAgICAgIENvbSxcbiAgICAgIGNvbVByb3BzID0ge30sXG4gICAgICBydWxlcyA9IFtdLFxuICAgICAgcmVuZGVyRGlub0Zvcm1JdGVtID0gdGhpcy5kZWZhdWx0UmVuZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IHRydWUgfSk7XG5cbiAgICBjb25zdCB7IGVycm9yIH0gPSBzdG9yZS5nZXQoZmllbGQpO1xuICAgIGNvbnN0IFt2YWx1ZV0gPSBnZXRGaWVsZHNWYWx1ZShmaWVsZCk7XG5cbiAgICByZXR1cm4gcmVuZGVyRGlub0Zvcm1JdGVtKHtcbiAgICAgIGxhYmVsLFxuICAgICAgZXJyb3IsXG4gICAgICByZW5kZXJDb206ICgpID0+IChcbiAgICAgICAgPENvbVxuICAgICAgICAgIHsgLi4uY29tUHJvcHMgfVxuICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgIGVycm9yPXsgZXJyb3IgfVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLnRoaXMuc2V0UnVsZSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZj17IChyZWYpID0+IHsgdGhpcy5jb20gPSByZWY7IH0gfVxuICAgICAgICAgIC8+XG4gICAgICApLFxuICAgIH0pO1xuICB9XG59XG5cbkRpbm9Gb3JtSXRlbS5kZWZhdWx0UHJvcHMgPSB7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbm9Gb3JtSXRlbTtcbiJdfQ==