"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _util = require("./util");

class DinoFormItem extends _react.default.Component {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;
    (0, _defineProperty2.default)(this, "syncToStore", function () {
      let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$isMount = _ref.isMount,
          isMount = _ref$isMount === void 0 ? true : _ref$isMount;

      const _this$props = _this.props,
            _this$props$dinoForm = _this$props.dinoForm,
            store = _this$props$dinoForm.store,
            getFieldsValue = _this$props$dinoForm.getFieldsValue,
            field = _this$props.field,
            rules = _this$props.rules,
            label = _this$props.label,
            initValue = _this$props.initValue;

      const _getFieldsValue = getFieldsValue(field),
            _getFieldsValue2 = (0, _slicedToArray2.default)(_getFieldsValue, 1),
            value = _getFieldsValue2[0];

      store.update(field, {
        value,
        rules,
        label,
        initValue,
        formItem: _this,
        comRef: _this.com,
        isMount
      });
    });
    (0, _defineProperty2.default)(this, "onChange", function (arg) {
      const _this$props2 = _this.props,
            _this$props2$dinoForm = _this$props2.dinoForm,
            store = _this$props2$dinoForm.store,
            setFields = _this$props2$dinoForm.setFields,
            setFieldsValue = _this$props2$dinoForm.setFieldsValue,
            field = _this$props2.field;
      const value = (0, _util.isEventObj)(arg) ? (0, _util.getValueFromEvent)(arg) : arg;
      setFieldsValue({
        [field]: value
      });
    });
    (0, _defineProperty2.default)(this, "clickLabel", () => {
      this.com && this.com.wakeUp && this.com.wakeUp();
    });
    (0, _defineProperty2.default)(this, "setRule", () => {
      const _this$props3 = this.props,
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
      const events = rules.reduceRight((trigger, rule) => {
        const _rule$validateTrigger = rule.validateTrigger,
              validateTrigger = _rule$validateTrigger === void 0 ? [] : _rule$validateTrigger,
              fun = rule.fun,
              error = rule.error;
        validateTrigger.forEach(eventName => {
          const preTrigger = trigger[eventName] || (() => {});

          trigger[eventName] = async function (firstArg) {
            const value = (0, _util.isEventObj)(firstArg) ? (0, _util.getValueFromEvent)(firstArg) : firstArg;

            for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              arg[_key - 1] = arguments[_key];
            }

            if (await fun(value, ...arg)) {
              setFieldsError({
                [field]: undefined
              });
              preTrigger(value, ...arg);
              return;
            }

            setFieldsError({
              [field]: error({
                label,
                field
              })
            });
          };
        });
        return trigger;
      }, {});
      const mergeEventFormComProps = (0, _objectSpread2.default)({}, events, (0, _util.mapObject)(comProps, (propsKey, propsValue) => {
        const event = events[propsKey];

        if (event) {
          return {
            [propsKey](value) {
              propsValue();

              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }

              return event(value, ...args);
            }

          };
        }

        return {};
      }));
      return (0, _objectSpread2.default)({}, mergeEventFormComProps, {
        onChange: function onChange(value) {
          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }

          _this.onChange(value, ...args);

          mergeEventFormComProps.onChange && mergeEventFormComProps.onChange(value, ...args);
        }
      });
    });
    (0, _defineProperty2.default)(this, "defaultRender", function () {
      let _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          label = _ref2.label,
          error = _ref2.error,
          renderCom = _ref2.renderCom;

      return _react.default.createElement("section", {
        className: `${(0, _util.prefix)('item')} ${error ? 'has-error' : ''}`
      }, _react.default.createElement("div", {
        onClick: _this.clickLabel,
        className: `${(0, _util.prefix)('item-label')}`
      }, label), _react.default.createElement("div", {
        className: `${(0, _util.prefix)('item-com-error')}`
      }, _react.default.createElement("div", {
        className: `${(0, _util.prefix)('item-com')}`
      }, renderCom()), error && _react.default.createElement("div", {
        className: `${(0, _util.prefix)('item-error')}`
      }, error)));
    });
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // message: undefined,
  //   };
  // }
  componentDidMount() {
    this.syncToStore({
      isMount: true
    });
  }

  componentWillUnmount() {
    const _this$props4 = this.props,
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

  render() {
    const _this$props5 = this.props,
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

    const _store$get = store.get(field),
          error = _store$get.error;

    const _getFieldsValue3 = getFieldsValue(field),
          _getFieldsValue4 = (0, _slicedToArray2.default)(_getFieldsValue3, 1),
          value = _getFieldsValue4[0];

    return renderDinoForm({
      label,
      error,
      renderCom: () => _react.default.createElement(Com, (0, _extends2.default)({}, comProps, {
        value: value,
        error: error
      }, this.setRule(), {
        ref: _ref3 => {
          this.com = _ref3;
        }
      }))
    });
  }

}

DinoFormItem.defaultProps = {};
var _default = DinoFormItem;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIkRpbm9Gb3JtSXRlbSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiaXNNb3VudCIsInByb3BzIiwiZGlub0Zvcm0iLCJzdG9yZSIsImdldEZpZWxkc1ZhbHVlIiwiZmllbGQiLCJydWxlcyIsImxhYmVsIiwiaW5pdFZhbHVlIiwidmFsdWUiLCJ1cGRhdGUiLCJmb3JtSXRlbSIsImNvbVJlZiIsImNvbSIsImFyZyIsInNldEZpZWxkcyIsInNldEZpZWxkc1ZhbHVlIiwid2FrZVVwIiwic2V0RmllbGRzRXJyb3IiLCJmaWVsZE5hbWUiLCJjb21Qcm9wcyIsImV2ZW50cyIsInJlZHVjZVJpZ2h0IiwidHJpZ2dlciIsInJ1bGUiLCJ2YWxpZGF0ZVRyaWdnZXIiLCJmdW4iLCJlcnJvciIsImZvckVhY2giLCJldmVudE5hbWUiLCJwcmVUcmlnZ2VyIiwiZmlyc3RBcmciLCJ1bmRlZmluZWQiLCJtZXJnZUV2ZW50Rm9ybUNvbVByb3BzIiwicHJvcHNLZXkiLCJwcm9wc1ZhbHVlIiwiZXZlbnQiLCJhcmdzIiwib25DaGFuZ2UiLCJyZW5kZXJDb20iLCJjbGlja0xhYmVsIiwiY29tcG9uZW50RGlkTW91bnQiLCJzeW5jVG9TdG9yZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVzZXRXaGVuVW5tb3VudCIsInJlbmRlciIsImdldEZpZWxkcyIsInZlcmlmeSIsIkNvbSIsInJlbmRlckRpbm9Gb3JtIiwiZGVmYXVsdFJlbmRlciIsImdldCIsInNldFJ1bGUiLCJyZWYiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQSxNQUFNQSxZQUFOLFNBQTJCQyxlQUFNQyxTQUFqQyxDQUEyQztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHVEQStCM0IsWUFFSDtBQUFBLHFGQUFQLEVBQU87QUFBQSw4QkFEVEMsT0FDUztBQUFBLFVBRFRBLE9BQ1MsNkJB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QjFDLE1BQUFBLEtBRG9CO0FBRXBCb0IsTUFBQUEsS0FGb0I7QUFHcEJZLE1BQUFBLFNBQVMsRUFBRSxNQUNULDZCQUFDLEdBQUQsNkJBQ09uQixRQURQO0FBRUUsUUFBQSxLQUFLLEVBQUdYLEtBRlY7QUFHRSxRQUFBLEtBQUssRUFBR2tCO0FBSFYsU0FLTyxLQUFLeUIsT0FBTCxFQUxQO0FBT0UsUUFBQSxHQUFHLEVBQUlDLEtBQUQsSUFBUztBQUFFLGVBQUt4QyxHQUFMLEdBQVd3QyxLQUFYO0FBQWlCO0FBUHBDO0FBSmtCLEtBQUQsQ0FBckI7QUFlRDs7QUFoTXdDOztBQW1NM0N4RCxZQUFZLENBQUN5RCxZQUFiLEdBQTRCLEVBQTVCO2VBSWV6RCxZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbWFwT2JqZWN0LCBnZXRWYWx1ZUZyb21FdmVudCwgaXNFdmVudE9iaiwgcHJlZml4IH0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgRGlub0Zvcm1JdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgLy8gY29uc3RydWN0b3IocHJvcHMpIHtcbiAgLy8gICBzdXBlcihwcm9wcyk7XG4gIC8vICAgdGhpcy5zdGF0ZSA9IHtcbiAgLy8gICAgIC8vIG1lc3NhZ2U6IHVuZGVmaW5lZCxcbiAgLy8gICB9O1xuICAvLyB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IHRydWUgfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgLy8gZ2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgICByZXNldFdoZW5Vbm1vdW50ID0gdHJ1ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChyZXNldFdoZW5Vbm1vdW50KSB7XG4gICAgICBzdG9yZS51cGRhdGUoZmllbGQsIHtcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgZXJyb3I6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnN5bmNUb1N0b3JlKHsgaXNNb3VudDogZmFsc2UgfSk7XG4gIH1cblxuICBzeW5jVG9TdG9yZSA9ICh7XG4gICAgaXNNb3VudCA9IHRydWUsXG4gIH0gPSB7fSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBmaWVsZCxcbiAgICAgIHJ1bGVzLFxuICAgICAgbGFiZWwsXG4gICAgICBpbml0VmFsdWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBbdmFsdWVdID0gZ2V0RmllbGRzVmFsdWUoZmllbGQpO1xuXG4gICAgc3RvcmUudXBkYXRlKGZpZWxkLCB7XG4gICAgICB2YWx1ZSxcbiAgICAgIHJ1bGVzLFxuICAgICAgbGFiZWwsXG4gICAgICBpbml0VmFsdWUsXG4gICAgICBmb3JtSXRlbTogdGhpcyxcbiAgICAgIGNvbVJlZjogdGhpcy5jb20sXG4gICAgICBpc01vdW50LFxuICAgIH0pO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAoYXJnLCAuLi5vdGhlcnMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgc2V0RmllbGRzLFxuICAgICAgICBzZXRGaWVsZHNWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBmaWVsZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHZhbHVlID0gaXNFdmVudE9iaihhcmcpID8gZ2V0VmFsdWVGcm9tRXZlbnQoYXJnKSA6IGFyZztcblxuICAgIHNldEZpZWxkc1ZhbHVlKHtcbiAgICAgIFtmaWVsZF06IHZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgY2xpY2tMYWJlbCA9ICgpID0+IHtcbiAgICB0aGlzLmNvbSAmJiB0aGlzLmNvbS53YWtlVXAgJiYgdGhpcy5jb20ud2FrZVVwKCk7XG4gIH1cblxuICBzZXRSdWxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgc2V0RmllbGRzRXJyb3IsXG4gICAgICB9LFxuICAgICAgbGFiZWwsXG4gICAgICBmaWVsZCxcbiAgICAgIGZpZWxkTmFtZSxcbiAgICAgIGNvbVByb3BzID0ge30sXG4gICAgICBydWxlcyA9IFtdLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZXZlbnRzID0gcnVsZXMucmVkdWNlUmlnaHQoKHRyaWdnZXIsIHJ1bGUpID0+IHtcbiAgICAgIGNvbnN0IHsgdmFsaWRhdGVUcmlnZ2VyID0gW10sIGZ1biwgZXJyb3IgfSA9IHJ1bGU7XG4gICAgICB2YWxpZGF0ZVRyaWdnZXIuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZVRyaWdnZXIgPSB0cmlnZ2VyW2V2ZW50TmFtZV0gfHwgKCgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlcltldmVudE5hbWVdID0gYXN5bmMgKGZpcnN0QXJnLCAuLi5hcmcpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooZmlyc3RBcmcpID8gZ2V0VmFsdWVGcm9tRXZlbnQoZmlyc3RBcmcpIDogZmlyc3RBcmc7XG4gICAgICAgICAgaWYgKGF3YWl0IGZ1bih2YWx1ZSwgLi4uYXJnKSkge1xuICAgICAgICAgICAgc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiB1bmRlZmluZWQgfSk7XG4gICAgICAgICAgICBwcmVUcmlnZ2VyKHZhbHVlLCAuLi5hcmcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yKHsgbGFiZWwsIGZpZWxkIH0pIH0pO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJpZ2dlcjtcbiAgICB9LCB7fSk7XG5cbiAgICBjb25zdCBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzID0ge1xuICAgICAgLi4uZXZlbnRzLFxuICAgICAgLi4ubWFwT2JqZWN0KGNvbVByb3BzLCAocHJvcHNLZXksIHByb3BzVmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbcHJvcHNLZXldO1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW3Byb3BzS2V5XSh2YWx1ZSwgLi4uYXJncykge1xuICAgICAgICAgICAgICBwcm9wc1ZhbHVlKCk7XG4gICAgICAgICAgICAgIHJldHVybiBldmVudCh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSksXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5tZXJnZUV2ZW50Rm9ybUNvbVByb3BzLFxuICAgICAgb25DaGFuZ2U6ICh2YWx1ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcy5vbkNoYW5nZSAmJiBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzLm9uQ2hhbmdlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGRlZmF1bHRSZW5kZXIgPSAoe1xuICAgIGxhYmVsLFxuICAgIGVycm9yLFxuICAgIHJlbmRlckNvbSxcbiAgfSA9IHt9KSA9PiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtJyl9ICR7ZXJyb3IgPyAnaGFzLWVycm9yJyA6ICcnfWAgfT5cbiAgICAgIDxkaXZcbiAgICAgICAgb25DbGljaz17IHRoaXMuY2xpY2tMYWJlbCB9XG4gICAgICAgIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1sYWJlbCcpfWAgfT5cbiAgICAgICAgeyBsYWJlbCB9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWNvbS1lcnJvcicpfWAgfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tY29tJyl9YCB9PlxuICAgICAgICAgIHsgcmVuZGVyQ29tKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyBlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1lcnJvcicpfWAgfT57ZXJyb3J9PC9kaXY+IH1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgIGdldEZpZWxkcyxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICAgIHZlcmlmeSxcbiAgICAgICAgc3RvcmUsXG4gICAgICB9LFxuICAgICAgbGFiZWwsXG4gICAgICBmaWVsZCxcbiAgICAgIENvbSxcbiAgICAgIGNvbVByb3BzID0ge30sXG4gICAgICBydWxlcyA9IFtdLFxuICAgICAgcmVuZGVyRGlub0Zvcm0gPSB0aGlzLmRlZmF1bHRSZW5kZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICB0aGlzLnN5bmNUb1N0b3JlKHsgaXNNb3VudDogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHN0b3JlLmdldChmaWVsZCk7XG4gICAgY29uc3QgW3ZhbHVlXSA9IGdldEZpZWxkc1ZhbHVlKGZpZWxkKTtcblxuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybSh7XG4gICAgICBsYWJlbCxcbiAgICAgIGVycm9yLFxuICAgICAgcmVuZGVyQ29tOiAoKSA9PiAoXG4gICAgICAgIDxDb21cbiAgICAgICAgICB7IC4uLmNvbVByb3BzIH1cbiAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICBlcnJvcj17IGVycm9yIH1cbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi50aGlzLnNldFJ1bGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZWY9eyAocmVmKSA9PiB7IHRoaXMuY29tID0gcmVmOyB9IH1cbiAgICAgICAgICAvPlxuICAgICAgKSxcbiAgICB9KTtcbiAgfVxufVxuXG5EaW5vRm9ybUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaW5vRm9ybUl0ZW07XG4iXX0=