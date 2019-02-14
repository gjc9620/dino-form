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

    if (!_field) {
      console.warn('[dino-form] This FormItem has no field');
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwibWFwT2JqZWN0IiwiZ2V0VmFsdWVGcm9tRXZlbnQiLCJpc0V2ZW50T2JqIiwicHJlZml4IiwiaXNFeGlzdCIsIkRpbm9Gb3JtSXRlbSIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJpc01vdW50IiwiZGlub0Zvcm0iLCJzdG9yZSIsImdldEZpZWxkc1ZhbHVlIiwiZmllbGQiLCJydWxlcyIsImxhYmVsIiwiaW5pdFZhbHVlIiwidmFsdWUiLCJ1cGRhdGUiLCJmb3JtSXRlbSIsImNvbVJlZiIsImNvbSIsImFyZyIsInNldEZpZWxkcyIsInNldEZpZWxkc1ZhbHVlIiwid2FrZVVwIiwic2V0RmllbGRzRXJyb3IiLCJmaWVsZE5hbWUiLCJjb21Qcm9wcyIsImV2ZW50cyIsInJlZHVjZVJpZ2h0IiwidHJpZ2dlciIsInJ1bGUiLCJ2YWxpZGF0ZVRyaWdnZXIiLCJmdW4iLCJlcnJvciIsImZvckVhY2giLCJldmVudE5hbWUiLCJwcmVUcmlnZ2VyIiwiZmlyc3RBcmciLCJ1bmRlZmluZWQiLCJtZXJnZUV2ZW50Rm9ybUNvbVByb3BzIiwicHJvcHNLZXkiLCJwcm9wc1ZhbHVlIiwiZXZlbnQiLCJhcmdzIiwib25DaGFuZ2UiLCJyZW5kZXJDb20iLCJjbGlja0xhYmVsIiwiY29uc29sZSIsIndhcm4iLCJzdG9yZVZhbHVlIiwiY29tcG9uZW50RGlkTW91bnQiLCJzeW5jVG9TdG9yZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVzZXRXaGVuVW5tb3VudCIsInJlbmRlciIsImdldEZpZWxkcyIsInZlcmlmeSIsIkNvbSIsInJlbmRlckRpbm9Gb3JtSXRlbSIsImRlZmF1bHRSZW5kZXIiLCJnZXQiLCJzZXRSdWxlIiwicmVmIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsRUFBMkJD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d0I7QUFHeEJZLE1BQUFBLFNBQVMsRUFBRSxNQUNULG9CQUFDLEdBQUQsZUFDT25CLFFBRFA7QUFFRSxRQUFBLEtBQUssRUFBR1gsS0FGVjtBQUdFLFFBQUEsS0FBSyxFQUFHa0I7QUFIVixTQUtPLEtBQUs0QixPQUFMLEVBTFA7QUFPRSxRQUFBLEdBQUcsRUFBSUMsS0FBRCxJQUFTO0FBQUUsZUFBSzNDLEdBQUwsR0FBVzJDLEtBQVg7QUFBaUI7QUFQcEM7QUFKc0IsS0FBRCxDQUF6QjtBQWVEOztBQW5Od0M7O0FBc04zQzFELFlBQVksQ0FBQzJELFlBQWIsR0FBNEIsRUFBNUI7QUFJQSxlQUFlM0QsWUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIG1hcE9iamVjdCwgZ2V0VmFsdWVGcm9tRXZlbnQsIGlzRXZlbnRPYmosIHByZWZpeCwgaXNFeGlzdCxcbn0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgRGlub0Zvcm1JdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgaW5pdFZhbHVlLFxuICAgIH0gPSBwcm9wcztcblxuICAgIGlmICghZmllbGQpIHtcbiAgICAgIGNvbnNvbGUud2FybignW2Rpbm8tZm9ybV0gVGhpcyBGb3JtSXRlbSBoYXMgbm8gZmllbGQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBbc3RvcmVWYWx1ZV0gPSBnZXRGaWVsZHNWYWx1ZShmaWVsZCk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IGlzRXhpc3Qoc3RvcmVWYWx1ZSlcbiAgICAgID8gc3RvcmVWYWx1ZVxuICAgICAgOiBpc0V4aXN0KGluaXRWYWx1ZSlcbiAgICAgICAgPyBpbml0VmFsdWVcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBzdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWUgfSk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnN5bmNUb1N0b3JlKHsgaXNNb3VudDogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICAvLyBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBmaWVsZCxcbiAgICAgIHJlc2V0V2hlblVubW91bnQgPSB0cnVlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHJlc2V0V2hlblVubW91bnQpIHtcbiAgICAgIHN0b3JlLnVwZGF0ZShmaWVsZCwge1xuICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiBmYWxzZSB9KTtcbiAgfVxuXG4gIHN5bmNUb1N0b3JlID0gKHtcbiAgICBpc01vdW50ID0gdHJ1ZSxcbiAgfSA9IHt9KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgcnVsZXMsXG4gICAgICBsYWJlbCxcbiAgICAgIGluaXRWYWx1ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IFt2YWx1ZV0gPSBnZXRGaWVsZHNWYWx1ZShmaWVsZCk7XG5cbiAgICBzdG9yZS51cGRhdGUoZmllbGQsIHtcbiAgICAgIHZhbHVlLFxuICAgICAgcnVsZXMsXG4gICAgICBsYWJlbCxcbiAgICAgIGluaXRWYWx1ZSxcbiAgICAgIGZvcm1JdGVtOiB0aGlzLFxuICAgICAgY29tUmVmOiB0aGlzLmNvbSxcbiAgICAgIGlzTW91bnQsXG4gICAgfSk7XG4gIH1cblxuICBvbkNoYW5nZSA9IChhcmcsIC4uLm90aGVycykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgdmFsdWUgPSBpc0V2ZW50T2JqKGFyZykgPyBnZXRWYWx1ZUZyb21FdmVudChhcmcpIDogYXJnO1xuXG4gICAgc2V0RmllbGRzVmFsdWUoe1xuICAgICAgW2ZpZWxkXTogdmFsdWUsXG4gICAgfSk7XG4gIH1cblxuICBjbGlja0xhYmVsID0gKCkgPT4ge1xuICAgIHRoaXMuY29tICYmIHRoaXMuY29tLndha2VVcCAmJiB0aGlzLmNvbS53YWtlVXAoKTtcbiAgfVxuXG4gIHNldFJ1bGUgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgICBzZXRGaWVsZHNFcnJvcixcbiAgICAgIH0sXG4gICAgICBsYWJlbCxcbiAgICAgIGZpZWxkLFxuICAgICAgZmllbGROYW1lLFxuICAgICAgY29tUHJvcHMgPSB7fSxcbiAgICAgIHJ1bGVzID0gW10sXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBldmVudHMgPSBydWxlcy5yZWR1Y2VSaWdodCgodHJpZ2dlciwgcnVsZSkgPT4ge1xuICAgICAgY29uc3QgeyB2YWxpZGF0ZVRyaWdnZXIgPSBbXSwgZnVuLCBlcnJvciB9ID0gcnVsZTtcbiAgICAgIHZhbGlkYXRlVHJpZ2dlci5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcHJlVHJpZ2dlciA9IHRyaWdnZXJbZXZlbnROYW1lXSB8fCAoKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyW2V2ZW50TmFtZV0gPSBhc3luYyAoZmlyc3RBcmcsIC4uLmFyZykgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXNFdmVudE9iaihmaXJzdEFyZykgPyBnZXRWYWx1ZUZyb21FdmVudChmaXJzdEFyZykgOiBmaXJzdEFyZztcbiAgICAgICAgICBpZiAoYXdhaXQgZnVuKHZhbHVlLCAuLi5hcmcpKSB7XG4gICAgICAgICAgICBzZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IHVuZGVmaW5lZCB9KTtcbiAgICAgICAgICAgIHByZVRyaWdnZXIodmFsdWUsIC4uLmFyZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogZXJyb3IoeyBsYWJlbCwgZmllbGQgfSkgfSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgIH0sIHt9KTtcblxuICAgIGNvbnN0IG1lcmdlRXZlbnRGb3JtQ29tUHJvcHMgPSB7XG4gICAgICAuLi5ldmVudHMsXG4gICAgICAuLi5tYXBPYmplY3QoY29tUHJvcHMsIChwcm9wc0tleSwgcHJvcHNWYWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1twcm9wc0tleV07XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbcHJvcHNLZXldKHZhbHVlLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICAgIHByb3BzVmFsdWUodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXR1cm4gZXZlbnQodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IFtwcm9wc0tleV06IHByb3BzVmFsdWUgfTtcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ubWVyZ2VFdmVudEZvcm1Db21Qcm9wcyxcbiAgICAgIG9uQ2hhbmdlOiAodmFsdWUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgIG1lcmdlRXZlbnRGb3JtQ29tUHJvcHMub25DaGFuZ2UgJiYgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcy5vbkNoYW5nZSh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBkZWZhdWx0UmVuZGVyID0gKHtcbiAgICBsYWJlbCxcbiAgICBlcnJvcixcbiAgICByZW5kZXJDb20sXG4gIH0gPSB7fSkgPT4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbScpfSAke2Vycm9yID8gJ2hhcy1lcnJvcicgOiAnJ31gIH0+XG4gICAgICA8ZGl2XG4gICAgICAgIG9uQ2xpY2s9eyB0aGlzLmNsaWNrTGFiZWwgfVxuICAgICAgICBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tbGFiZWwnKX1gIH0+XG4gICAgICAgIHsgbGFiZWwgfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1jb20tZXJyb3InKX1gIH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWNvbScpfWAgfT5cbiAgICAgICAgICB7IHJlbmRlckNvbSgpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgZXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tZXJyb3InKX1gIH0+e2Vycm9yfTwvZGl2PiB9XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gIClcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc2V0RmllbGRzLFxuICAgICAgICBnZXRGaWVsZHMsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgICB2ZXJpZnksXG4gICAgICAgIHN0b3JlLFxuICAgICAgfSxcbiAgICAgIGxhYmVsLFxuICAgICAgZmllbGQsXG4gICAgICBDb20sXG4gICAgICBjb21Qcm9wcyA9IHt9LFxuICAgICAgcnVsZXMgPSBbXSxcbiAgICAgIHJlbmRlckRpbm9Gb3JtSXRlbSA9IHRoaXMuZGVmYXVsdFJlbmRlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiB0cnVlIH0pO1xuXG4gICAgY29uc3QgeyBlcnJvciB9ID0gc3RvcmUuZ2V0KGZpZWxkKTtcbiAgICBjb25zdCBbdmFsdWVdID0gZ2V0RmllbGRzVmFsdWUoZmllbGQpO1xuXG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtSXRlbSh7XG4gICAgICBsYWJlbCxcbiAgICAgIGVycm9yLFxuICAgICAgcmVuZGVyQ29tOiAoKSA9PiAoXG4gICAgICAgIDxDb21cbiAgICAgICAgICB7IC4uLmNvbVByb3BzIH1cbiAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICBlcnJvcj17IGVycm9yIH1cbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi50aGlzLnNldFJ1bGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZWY9eyAocmVmKSA9PiB7IHRoaXMuY29tID0gcmVmOyB9IH1cbiAgICAgICAgICAvPlxuICAgICAgKSxcbiAgICB9KTtcbiAgfVxufVxuXG5EaW5vRm9ybUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaW5vRm9ybUl0ZW07XG4iXX0=