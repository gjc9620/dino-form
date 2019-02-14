import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectSpread from "@babel/runtime-corejs2/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime-corejs2/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import React, { Component, PropTypes } from 'react';
import { mapObject, getValueFromEvent, isEventObj, prefix, isExist } from './util';

class DinoFormItem extends React.Component {
  constructor(props) {
    var _this;

    super(props);
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

      const _getFieldsValue2 = getFieldsValue(field),
            _getFieldsValue3 = _slicedToArray(_getFieldsValue2, 1),
            value = _getFieldsValue3[0];

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

        return {
          [propsKey]: propsValue
        };
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

    const _props$dinoForm = props.dinoForm,
          _store = _props$dinoForm.store,
          _getFieldsValue = _props$dinoForm.getFieldsValue,
          _field = props.field,
          _initValue = props.initValue;

    const _getFieldsValue4 = _getFieldsValue(_field),
          _getFieldsValue5 = _slicedToArray(_getFieldsValue4, 1),
          storeValue = _getFieldsValue5[0];

    const _value = isExist(storeValue) ? storeValue : isExist(_initValue) ? _initValue : undefined;

    _store.update(_field, {
      value: _value
    });
  }

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
          _this$props5$renderDi = _this$props5.renderDinoFormItem,
          renderDinoFormItem = _this$props5$renderDi === void 0 ? this.defaultRender : _this$props5$renderDi;
    this.syncToStore({
      isMount: true
    });

    const _store$get = store.get(field),
          error = _store$get.error;

    const _getFieldsValue6 = getFieldsValue(field),
          _getFieldsValue7 = _slicedToArray(_getFieldsValue6, 1),
          value = _getFieldsValue7[0];

    return renderDinoFormItem({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwibWFwT2JqZWN0IiwiZ2V0VmFsdWVGcm9tRXZlbnQiLCJpc0V2ZW50T2JqIiwicHJlZml4IiwiaXNFeGlzdCIsIkRpbm9Gb3JtSXRlbSIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJpc01vdW50IiwiZGlub0Zvcm0iLCJzdG9yZSIsImdldEZpZWxkc1ZhbHVlIiwiZmllbGQiLCJydWxlcyIsImxhYmVsIiwiaW5pdFZhbHVlIiwidmFsdWUiLCJ1cGRhdGUiLCJmb3JtSXRlbSIsImNvbVJlZiIsImNvbSIsImFyZyIsInNldEZpZWxkcyIsInNldEZpZWxkc1ZhbHVlIiwid2FrZVVwIiwic2V0RmllbGRzRXJyb3IiLCJmaWVsZE5hbWUiLCJjb21Qcm9wcyIsImV2ZW50cyIsInJlZHVjZVJpZ2h0IiwidHJpZ2dlciIsInJ1bGUiLCJ2YWxpZGF0ZVRyaWdnZXIiLCJmdW4iLCJlcnJvciIsImZvckVhY2giLCJldmVudE5hbWUiLCJwcmVUcmlnZ2VyIiwiZmlyc3RBcmciLCJ1bmRlZmluZWQiLCJtZXJnZUV2ZW50Rm9ybUNvbVByb3BzIiwicHJvcHNLZXkiLCJwcm9wc1ZhbHVlIiwiZXZlbnQiLCJhcmdzIiwib25DaGFuZ2UiLCJyZW5kZXJDb20iLCJjbGlja0xhYmVsIiwic3RvcmVWYWx1ZSIsImNvbXBvbmVudERpZE1vdW50Iiwic3luY1RvU3RvcmUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlc2V0V2hlblVubW91bnQiLCJyZW5kZXIiLCJnZXRGaWVsZHMiLCJ2ZXJpZnkiLCJDb20iLCJyZW5kZXJEaW5vRm9ybUl0ZW0iLCJkZWZhdWx0UmVuZGVyIiwiZ2V0Iiwic2V0UnVsZSIsInJlZiIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLEVBQTJCQyxTQUEzQixRQUE0QyxPQUE1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SyxFQUFHa0I7QUFIVixTQUtPLEtBQUswQixPQUFMLEVBTFA7QUFPRSxRQUFBLEdBQUcsRUFBSUMsS0FBRCxJQUFTO0FBQUUsZUFBS3pDLEdBQUwsR0FBV3lDLEtBQVg7QUFBaUI7QUFQcEM7QUFKc0IsS0FBRCxDQUF6QjtBQWVEOztBQS9Nd0M7O0FBa04zQ3hELFlBQVksQ0FBQ3lELFlBQWIsR0FBNEIsRUFBNUI7QUFJQSxlQUFlekQsWUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIG1hcE9iamVjdCwgZ2V0VmFsdWVGcm9tRXZlbnQsIGlzRXZlbnRPYmosIHByZWZpeCwgaXNFeGlzdCxcbn0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgRGlub0Zvcm1JdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgaW5pdFZhbHVlLFxuICAgIH0gPSBwcm9wcztcblxuICAgIGNvbnN0IFtzdG9yZVZhbHVlXSA9IGdldEZpZWxkc1ZhbHVlKGZpZWxkKTtcblxuICAgIGNvbnN0IHZhbHVlID0gaXNFeGlzdChzdG9yZVZhbHVlKVxuICAgICAgPyBzdG9yZVZhbHVlXG4gICAgICA6IGlzRXhpc3QoaW5pdFZhbHVlKVxuICAgICAgICA/IGluaXRWYWx1ZVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZSB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiB0cnVlIH0pO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIC8vIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgcmVzZXRXaGVuVW5tb3VudCA9IHRydWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAocmVzZXRXaGVuVW5tb3VudCkge1xuICAgICAgc3RvcmUudXBkYXRlKGZpZWxkLCB7XG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IGZhbHNlIH0pO1xuICB9XG5cbiAgc3luY1RvU3RvcmUgPSAoe1xuICAgIGlzTW91bnQgPSB0cnVlLFxuICB9ID0ge30pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgICBydWxlcyxcbiAgICAgIGxhYmVsLFxuICAgICAgaW5pdFZhbHVlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgW3ZhbHVlXSA9IGdldEZpZWxkc1ZhbHVlKGZpZWxkKTtcblxuICAgIHN0b3JlLnVwZGF0ZShmaWVsZCwge1xuICAgICAgdmFsdWUsXG4gICAgICBydWxlcyxcbiAgICAgIGxhYmVsLFxuICAgICAgaW5pdFZhbHVlLFxuICAgICAgZm9ybUl0ZW06IHRoaXMsXG4gICAgICBjb21SZWY6IHRoaXMuY29tLFxuICAgICAgaXNNb3VudCxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKGFyZywgLi4ub3RoZXJzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIHNldEZpZWxkcyxcbiAgICAgICAgc2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooYXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGFyZykgOiBhcmc7XG5cbiAgICBzZXRGaWVsZHNWYWx1ZSh7XG4gICAgICBbZmllbGRdOiB2YWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNsaWNrTGFiZWwgPSAoKSA9PiB7XG4gICAgdGhpcy5jb20gJiYgdGhpcy5jb20ud2FrZVVwICYmIHRoaXMuY29tLndha2VVcCgpO1xuICB9XG5cbiAgc2V0UnVsZSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICAgIHNldEZpZWxkc0Vycm9yLFxuICAgICAgfSxcbiAgICAgIGxhYmVsLFxuICAgICAgZmllbGQsXG4gICAgICBmaWVsZE5hbWUsXG4gICAgICBjb21Qcm9wcyA9IHt9LFxuICAgICAgcnVsZXMgPSBbXSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGV2ZW50cyA9IHJ1bGVzLnJlZHVjZVJpZ2h0KCh0cmlnZ2VyLCBydWxlKSA9PiB7XG4gICAgICBjb25zdCB7IHZhbGlkYXRlVHJpZ2dlciA9IFtdLCBmdW4sIGVycm9yIH0gPSBydWxlO1xuICAgICAgdmFsaWRhdGVUcmlnZ2VyLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwcmVUcmlnZ2VyID0gdHJpZ2dlcltldmVudE5hbWVdIHx8ICgoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJbZXZlbnROYW1lXSA9IGFzeW5jIChmaXJzdEFyZywgLi4uYXJnKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBpc0V2ZW50T2JqKGZpcnN0QXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGZpcnN0QXJnKSA6IGZpcnN0QXJnO1xuICAgICAgICAgIGlmIChhd2FpdCBmdW4odmFsdWUsIC4uLmFyZykpIHtcbiAgICAgICAgICAgIHNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgcHJlVHJpZ2dlcih2YWx1ZSwgLi4uYXJnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvcih7IGxhYmVsLCBmaWVsZCB9KSB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyaWdnZXI7XG4gICAgfSwge30pO1xuXG4gICAgY29uc3QgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcyA9IHtcbiAgICAgIC4uLmV2ZW50cyxcbiAgICAgIC4uLm1hcE9iamVjdChjb21Qcm9wcywgKHByb3BzS2V5LCBwcm9wc1ZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW3Byb3BzS2V5XTtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFtwcm9wc0tleV0odmFsdWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgcHJvcHNWYWx1ZSh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgIHJldHVybiBldmVudCh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgW3Byb3BzS2V5XTogcHJvcHNWYWx1ZSB9O1xuICAgICAgfSksXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5tZXJnZUV2ZW50Rm9ybUNvbVByb3BzLFxuICAgICAgb25DaGFuZ2U6ICh2YWx1ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcy5vbkNoYW5nZSAmJiBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzLm9uQ2hhbmdlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGRlZmF1bHRSZW5kZXIgPSAoe1xuICAgIGxhYmVsLFxuICAgIGVycm9yLFxuICAgIHJlbmRlckNvbSxcbiAgfSA9IHt9KSA9PiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtJyl9ICR7ZXJyb3IgPyAnaGFzLWVycm9yJyA6ICcnfWAgfT5cbiAgICAgIDxkaXZcbiAgICAgICAgb25DbGljaz17IHRoaXMuY2xpY2tMYWJlbCB9XG4gICAgICAgIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1sYWJlbCcpfWAgfT5cbiAgICAgICAgeyBsYWJlbCB9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWNvbS1lcnJvcicpfWAgfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tY29tJyl9YCB9PlxuICAgICAgICAgIHsgcmVuZGVyQ29tKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyBlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1lcnJvcicpfWAgfT57ZXJyb3J9PC9kaXY+IH1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgIGdldEZpZWxkcyxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICAgIHZlcmlmeSxcbiAgICAgICAgc3RvcmUsXG4gICAgICB9LFxuICAgICAgbGFiZWwsXG4gICAgICBmaWVsZCxcbiAgICAgIENvbSxcbiAgICAgIGNvbVByb3BzID0ge30sXG4gICAgICBydWxlcyA9IFtdLFxuICAgICAgcmVuZGVyRGlub0Zvcm1JdGVtID0gdGhpcy5kZWZhdWx0UmVuZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IHRydWUgfSk7XG5cbiAgICBjb25zdCB7IGVycm9yIH0gPSBzdG9yZS5nZXQoZmllbGQpO1xuICAgIGNvbnN0IFt2YWx1ZV0gPSBnZXRGaWVsZHNWYWx1ZShmaWVsZCk7XG5cbiAgICByZXR1cm4gcmVuZGVyRGlub0Zvcm1JdGVtKHtcbiAgICAgIGxhYmVsLFxuICAgICAgZXJyb3IsXG4gICAgICByZW5kZXJDb206ICgpID0+IChcbiAgICAgICAgPENvbVxuICAgICAgICAgIHsgLi4uY29tUHJvcHMgfVxuICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgIGVycm9yPXsgZXJyb3IgfVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLnRoaXMuc2V0UnVsZSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZj17IChyZWYpID0+IHsgdGhpcy5jb20gPSByZWY7IH0gfVxuICAgICAgICAgIC8+XG4gICAgICApLFxuICAgIH0pO1xuICB9XG59XG5cbkRpbm9Gb3JtSXRlbS5kZWZhdWx0UHJvcHMgPSB7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbm9Gb3JtSXRlbTtcbiJdfQ==