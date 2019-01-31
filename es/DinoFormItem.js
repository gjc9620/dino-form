import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectSpread from "@babel/runtime-corejs2/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime-corejs2/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import React, { Component, PropTypes } from 'react';
import { mapObject, getValueFromEvent, isEventObj, prefix } from './util';

class DinoFormItem extends React.Component {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;

    _defineProperty(this, "syncToStore", function () {
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
            _getFieldsValue2 = _slicedToArray(_getFieldsValue, 1),
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

    _defineProperty(this, "onChange", function (arg) {
      const _this$props2 = _this.props,
            _this$props2$dinoForm = _this$props2.dinoForm,
            store = _this$props2$dinoForm.store,
            setFields = _this$props2$dinoForm.setFields,
            setFieldsValue = _this$props2$dinoForm.setFieldsValue,
            field = _this$props2.field;
      const value = isEventObj(arg) ? getValueFromEvent(arg) : arg;
      setFieldsValue({
        [field]: value
      });
    });

    _defineProperty(this, "clickLabel", () => {
      this.com && this.com.wakeUp && this.com.wakeUp();
    });

    _defineProperty(this, "setRule", () => {
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
            const value = isEventObj(firstArg) ? getValueFromEvent(firstArg) : firstArg;

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

      const mergeEventFormComProps = _objectSpread({}, events, mapObject(comProps, (propsKey, propsValue) => {
        const event = events[propsKey];

        if (event) {
          return {
            [propsKey](value) {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }

              propsValue(value, ...args);
              return event(value, ...args);
            }

          };
        }

        return {};
      }));

      return _objectSpread({}, mergeEventFormComProps, {
        onChange: function onChange(value) {
          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }

          _this.onChange(value, ...args);

          mergeEventFormComProps.onChange && mergeEventFormComProps.onChange(value, ...args);
        }
      });
    });

    _defineProperty(this, "defaultRender", function () {
      let _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          label = _ref2.label,
          error = _ref2.error,
          renderCom = _ref2.renderCom;

      return React.createElement("section", {
        className: `${prefix('item')} ${error ? 'has-error' : ''}`
      }, React.createElement("div", {
        onClick: _this.clickLabel,
        className: `${prefix('item-label')}`
      }, label), React.createElement("div", {
        className: `${prefix('item-com-error')}`
      }, React.createElement("div", {
        className: `${prefix('item-com')}`
      }, renderCom()), error && React.createElement("div", {
        className: `${prefix('item-error')}`
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
          _getFieldsValue4 = _slicedToArray(_getFieldsValue3, 1),
          value = _getFieldsValue4[0];

    return renderDinoForm({
      label,
      error,
      renderCom: () => React.createElement(Com, _extends({}, comProps, {
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
export default DinoFormItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwibWFwT2JqZWN0IiwiZ2V0VmFsdWVGcm9tRXZlbnQiLCJpc0V2ZW50T2JqIiwicHJlZml4IiwiRGlub0Zvcm1JdGVtIiwiaXNNb3VudCIsInByb3BzIiwiZGlub0Zvcm0iLCJzdG9yZSIsImdldEZpZWxkc1ZhbHVlIiwiZmllbGQiLCJydWxlcyIsImxhYmVsIiwiaW5pdFZhbHVlIiwidmFsdWUiLCJ1cGRhdGUiLCJmb3JtSXRlbSIsImNvbVJlZiIsImNvbSIsImFyZyIsInNldEZpZWxkcyIsInNldEZpZWxkc1ZhbHVlIiwid2FrZVVwIiwic2V0RmllbGRzRXJyb3IiLCJmaWVsZE5hbWUiLCJjb21Qcm9wcyIsImV2ZW50cyIsInJlZHVjZVJpZ2h0IiwidHJpZ2dlciIsInJ1bGUiLCJ2YWxpZGF0ZVRyaWdnZXIiLCJmdW4iLCJlcnJvciIsImZvckVhY2giLCJldmVudE5hbWUiLCJwcmVUcmlnZ2VyIiwiZmlyc3RBcmciLCJ1bmRlZmluZWQiLCJtZXJnZUV2ZW50Rm9ybUNvbVByb3BzIiwicHJvcHNLZXkiLCJwcm9wc1ZhbHVlIiwiZXZlbnQiLCJhcmdzIiwib25DaGFuZ2UiLCJyZW5kZXJDb20iLCJjbGlja0xhYmVsIiwiY29tcG9uZW50RGlkTW91bnQiLCJzeW5jVG9TdG9yZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVzZXRXaGVuVW5tb3VudCIsInJlbmRlciIsImdldEZpZWxkcyIsInZlcmlmeSIsIkNvbSIsInJlbmRlckRpbm9Gb3JtIiwiZGVmYXVsdFJlbmRlciIsImdldCIsInNldFJ1bGUiLCJyZWYiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixFQUEyQkMsU0FBM0IsUUFBNEMsT0FBNUM7QUFDQSxTQUFTQyxTQUFULEVBQW9CQyxpQkFBcEIsRUFBdUNDLFVB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Y0wyQyxjQWRLO0FBQUEsVUFjTEEsY0FkSyxzQ0FjWSxLQUFLQyxhQWRqQjtBQWlCUCxTQUFLUixXQUFMLENBQWlCO0FBQUUxQyxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFqQjs7QUFqQk8sdUJBbUJXRyxLQUFLLENBQUNnRCxHQUFOLENBQVU5QyxLQUFWLENBbkJYO0FBQUEsVUFtQkNzQixLQW5CRCxjQW1CQ0EsS0FuQkQ7O0FBQUEsNkJBb0JTdkIsY0FBYyxDQUFDQyxLQUFELENBcEJ2QjtBQUFBO0FBQUEsVUFvQkFJLEtBcEJBOztBQXNCUCxXQUFPd0MsY0FBYyxDQUFDO0FBQ3BCMUMsTUFBQUEsS0FEb0I7QUFFcEJvQixNQUFBQSxLQUZvQjtBQUdwQlksTUFBQUEsU0FBUyxFQUFFLE1BQ1Qsb0JBQUMsR0FBRCxlQUNPbkIsUUFEUDtBQUVFLFFBQUEsS0FBSyxFQUFHWCxLQUZWO0FBR0UsUUFBQSxLQUFLLEVBQUdrQjtBQUhWLFNBS08sS0FBS3lCLE9BQUwsRUFMUDtBQU9FLFFBQUEsR0FBRyxFQUFJQyxLQUFELElBQVM7QUFBRSxlQUFLeEMsR0FBTCxHQUFXd0MsS0FBWDtBQUFpQjtBQVBwQztBQUprQixLQUFELENBQXJCO0FBZUQ7O0FBaE13Qzs7QUFtTTNDdEQsWUFBWSxDQUFDdUQsWUFBYixHQUE0QixFQUE1QjtBQUlBLGVBQWV2RCxZQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbWFwT2JqZWN0LCBnZXRWYWx1ZUZyb21FdmVudCwgaXNFdmVudE9iaiwgcHJlZml4IH0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgRGlub0Zvcm1JdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgLy8gY29uc3RydWN0b3IocHJvcHMpIHtcbiAgLy8gICBzdXBlcihwcm9wcyk7XG4gIC8vICAgdGhpcy5zdGF0ZSA9IHtcbiAgLy8gICAgIC8vIG1lc3NhZ2U6IHVuZGVmaW5lZCxcbiAgLy8gICB9O1xuICAvLyB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IHRydWUgfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgLy8gZ2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgICByZXNldFdoZW5Vbm1vdW50ID0gdHJ1ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChyZXNldFdoZW5Vbm1vdW50KSB7XG4gICAgICBzdG9yZS51cGRhdGUoZmllbGQsIHtcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgZXJyb3I6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnN5bmNUb1N0b3JlKHsgaXNNb3VudDogZmFsc2UgfSk7XG4gIH1cblxuICBzeW5jVG9TdG9yZSA9ICh7XG4gICAgaXNNb3VudCA9IHRydWUsXG4gIH0gPSB7fSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBmaWVsZCxcbiAgICAgIHJ1bGVzLFxuICAgICAgbGFiZWwsXG4gICAgICBpbml0VmFsdWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBbdmFsdWVdID0gZ2V0RmllbGRzVmFsdWUoZmllbGQpO1xuXG4gICAgc3RvcmUudXBkYXRlKGZpZWxkLCB7XG4gICAgICB2YWx1ZSxcbiAgICAgIHJ1bGVzLFxuICAgICAgbGFiZWwsXG4gICAgICBpbml0VmFsdWUsXG4gICAgICBmb3JtSXRlbTogdGhpcyxcbiAgICAgIGNvbVJlZjogdGhpcy5jb20sXG4gICAgICBpc01vdW50LFxuICAgIH0pO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAoYXJnLCAuLi5vdGhlcnMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgc2V0RmllbGRzLFxuICAgICAgICBzZXRGaWVsZHNWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBmaWVsZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHZhbHVlID0gaXNFdmVudE9iaihhcmcpID8gZ2V0VmFsdWVGcm9tRXZlbnQoYXJnKSA6IGFyZztcblxuICAgIHNldEZpZWxkc1ZhbHVlKHtcbiAgICAgIFtmaWVsZF06IHZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgY2xpY2tMYWJlbCA9ICgpID0+IHtcbiAgICB0aGlzLmNvbSAmJiB0aGlzLmNvbS53YWtlVXAgJiYgdGhpcy5jb20ud2FrZVVwKCk7XG4gIH1cblxuICBzZXRSdWxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgc2V0RmllbGRzRXJyb3IsXG4gICAgICB9LFxuICAgICAgbGFiZWwsXG4gICAgICBmaWVsZCxcbiAgICAgIGZpZWxkTmFtZSxcbiAgICAgIGNvbVByb3BzID0ge30sXG4gICAgICBydWxlcyA9IFtdLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZXZlbnRzID0gcnVsZXMucmVkdWNlUmlnaHQoKHRyaWdnZXIsIHJ1bGUpID0+IHtcbiAgICAgIGNvbnN0IHsgdmFsaWRhdGVUcmlnZ2VyID0gW10sIGZ1biwgZXJyb3IgfSA9IHJ1bGU7XG4gICAgICB2YWxpZGF0ZVRyaWdnZXIuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZVRyaWdnZXIgPSB0cmlnZ2VyW2V2ZW50TmFtZV0gfHwgKCgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlcltldmVudE5hbWVdID0gYXN5bmMgKGZpcnN0QXJnLCAuLi5hcmcpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooZmlyc3RBcmcpID8gZ2V0VmFsdWVGcm9tRXZlbnQoZmlyc3RBcmcpIDogZmlyc3RBcmc7XG4gICAgICAgICAgaWYgKGF3YWl0IGZ1bih2YWx1ZSwgLi4uYXJnKSkge1xuICAgICAgICAgICAgc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiB1bmRlZmluZWQgfSk7XG4gICAgICAgICAgICBwcmVUcmlnZ2VyKHZhbHVlLCAuLi5hcmcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yKHsgbGFiZWwsIGZpZWxkIH0pIH0pO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJpZ2dlcjtcbiAgICB9LCB7fSk7XG5cbiAgICBjb25zdCBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzID0ge1xuICAgICAgLi4uZXZlbnRzLFxuICAgICAgLi4ubWFwT2JqZWN0KGNvbVByb3BzLCAocHJvcHNLZXksIHByb3BzVmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbcHJvcHNLZXldO1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW3Byb3BzS2V5XSh2YWx1ZSwgLi4uYXJncykge1xuICAgICAgICAgICAgICBwcm9wc1ZhbHVlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50KHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge307XG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm1lcmdlRXZlbnRGb3JtQ29tUHJvcHMsXG4gICAgICBvbkNoYW5nZTogKHZhbHVlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgICBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzLm9uQ2hhbmdlICYmIG1lcmdlRXZlbnRGb3JtQ29tUHJvcHMub25DaGFuZ2UodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgZGVmYXVsdFJlbmRlciA9ICh7XG4gICAgbGFiZWwsXG4gICAgZXJyb3IsXG4gICAgcmVuZGVyQ29tLFxuICB9ID0ge30pID0+IChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0nKX0gJHtlcnJvciA/ICdoYXMtZXJyb3InIDogJyd9YCB9PlxuICAgICAgPGRpdlxuICAgICAgICBvbkNsaWNrPXsgdGhpcy5jbGlja0xhYmVsIH1cbiAgICAgICAgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWxhYmVsJyl9YCB9PlxuICAgICAgICB7IGxhYmVsIH1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tY29tLWVycm9yJyl9YCB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1jb20nKX1gIH0+XG4gICAgICAgICAgeyByZW5kZXJDb20oKSB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7IGVycm9yICYmIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWVycm9yJyl9YCB9PntlcnJvcn08L2Rpdj4gfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHNldEZpZWxkcyxcbiAgICAgICAgZ2V0RmllbGRzLFxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgdmVyaWZ5LFxuICAgICAgICBzdG9yZSxcbiAgICAgIH0sXG4gICAgICBsYWJlbCxcbiAgICAgIGZpZWxkLFxuICAgICAgQ29tLFxuICAgICAgY29tUHJvcHMgPSB7fSxcbiAgICAgIHJ1bGVzID0gW10sXG4gICAgICByZW5kZXJEaW5vRm9ybSA9IHRoaXMuZGVmYXVsdFJlbmRlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiB0cnVlIH0pO1xuXG4gICAgY29uc3QgeyBlcnJvciB9ID0gc3RvcmUuZ2V0KGZpZWxkKTtcbiAgICBjb25zdCBbdmFsdWVdID0gZ2V0RmllbGRzVmFsdWUoZmllbGQpO1xuXG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtKHtcbiAgICAgIGxhYmVsLFxuICAgICAgZXJyb3IsXG4gICAgICByZW5kZXJDb206ICgpID0+IChcbiAgICAgICAgPENvbVxuICAgICAgICAgIHsgLi4uY29tUHJvcHMgfVxuICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgIGVycm9yPXsgZXJyb3IgfVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLnRoaXMuc2V0UnVsZSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZj17IChyZWYpID0+IHsgdGhpcy5jb20gPSByZWY7IH0gfVxuICAgICAgICAgIC8+XG4gICAgICApLFxuICAgIH0pO1xuICB9XG59XG5cbkRpbm9Gb3JtSXRlbS5kZWZhdWx0UHJvcHMgPSB7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbm9Gb3JtSXRlbTtcbiJdfQ==