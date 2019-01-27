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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwibWFwT2JqZWN0IiwiZ2V0VmFsdWVGcm9tRXZlbnQiLCJpc0V2ZW50T2JqIiwicHJlZml4IiwiRGlub0Zvcm1JdGVtIiwiaXNNb3VudCIsInByb3BzIiwiZGlub0Zvcm0iLCJzdG9yZSIsImdldEZpZWxkc1ZhbHVlIiwiZmllbGQiLCJydWxlcyIsImxhYmVsIiwiaW5pdFZhbHVlIiwidmFsdWUiLCJ1cGRhdGUiLCJmb3JtSXRlbSIsImNvbVJlZiIsImNvbSIsImFyZyIsInNldEZpZWxkcyIsInNldEZpZWxkc1ZhbHVlIiwid2FrZVVwIiwic2V0RmllbGRzRXJyb3IiLCJmaWVsZE5hbWUiLCJjb21Qcm9wcyIsImV2ZW50cyIsInJlZHVjZVJpZ2h0IiwidHJpZ2dlciIsInJ1bGUiLCJ2YWxpZGF0ZVRyaWdnZXIiLCJmdW4iLCJlcnJvciIsImZvckVhY2giLCJldmVudE5hbWUiLCJwcmVUcmlnZ2VyIiwiZmlyc3RBcmciLCJ1bmRlZmluZWQiLCJtZXJnZUV2ZW50Rm9ybUNvbVByb3BzIiwicHJvcHNLZXkiLCJwcm9wc1ZhbHVlIiwiZXZlbnQiLCJhcmdzIiwib25DaGFuZ2UiLCJyZW5kZXJDb20iLCJjbGlja0xhYmVsIiwiY29tcG9uZW50RGlkTW91bnQiLCJzeW5jVG9TdG9yZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVzZXRXaGVuVW5tb3VudCIsInJlbmRlciIsImdldEZpZWxkcyIsInZlcmlmeSIsIkNvbSIsInJlbmRlckRpbm9Gb3JtIiwiZGVmYXVsdFJlbmRlciIsImdldCIsInNldFJ1bGUiLCJyZWYiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixFQUEyQkMsU0FBM0IsUUFBNEMsT0FBNUM7QUFDQSxTQUFTQyxTQUFULEVBQW9CQyxpQkFBcEIsRUFBdUNDLFVB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S0FBS0MsYUFkakI7QUFpQlAsU0FBS1IsV0FBTCxDQUFpQjtBQUFFMUMsTUFBQUEsT0FBTyxFQUFFO0FBQVgsS0FBakI7O0FBakJPLHVCQW1CV0csS0FBSyxDQUFDZ0QsR0FBTixDQUFVOUMsS0FBVixDQW5CWDtBQUFBLFVBbUJDc0IsS0FuQkQsY0FtQkNBLEtBbkJEOztBQUFBLDZCQW9CU3ZCLGNBQWMsQ0FBQ0MsS0FBRCxDQXBCdkI7QUFBQTtBQUFBLFVBb0JBSSxLQXBCQTs7QUFzQlAsV0FBT3dDLGNBQWMsQ0FBQztBQUNwQjFDLE1BQUFBLEtBRG9CO0FBRXBCb0IsTUFBQUEsS0FGb0I7QUFHcEJZLE1BQUFBLFNBQVMsRUFBRSxNQUNULG9CQUFDLEdBQUQsZUFDT25CLFFBRFA7QUFFRSxRQUFBLEtBQUssRUFBR1gsS0FGVjtBQUdFLFFBQUEsS0FBSyxFQUFHa0I7QUFIVixTQUtPLEtBQUt5QixPQUFMLEVBTFA7QUFPRSxRQUFBLEdBQUcsRUFBSUMsS0FBRCxJQUFTO0FBQUUsZUFBS3hDLEdBQUwsR0FBV3dDLEtBQVg7QUFBaUI7QUFQcEM7QUFKa0IsS0FBRCxDQUFyQjtBQWVEOztBQWhNd0M7O0FBbU0zQ3RELFlBQVksQ0FBQ3VELFlBQWIsR0FBNEIsRUFBNUI7QUFJQSxlQUFldkQsWUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1hcE9iamVjdCwgZ2V0VmFsdWVGcm9tRXZlbnQsIGlzRXZlbnRPYmosIHByZWZpeCB9IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIERpbm9Gb3JtSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIC8vIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gIC8vICAgc3VwZXIocHJvcHMpO1xuICAvLyAgIHRoaXMuc3RhdGUgPSB7XG4gIC8vICAgICAvLyBtZXNzYWdlOiB1bmRlZmluZWQsXG4gIC8vICAgfTtcbiAgLy8gfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc3luY1RvU3RvcmUoeyBpc01vdW50OiB0cnVlIH0pO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIC8vIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgfSxcbiAgICAgIGZpZWxkLFxuICAgICAgcmVzZXRXaGVuVW5tb3VudCA9IHRydWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAocmVzZXRXaGVuVW5tb3VudCkge1xuICAgICAgc3RvcmUudXBkYXRlKGZpZWxkLCB7XG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IGZhbHNlIH0pO1xuICB9XG5cbiAgc3luY1RvU3RvcmUgPSAoe1xuICAgIGlzTW91bnQgPSB0cnVlLFxuICB9ID0ge30pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgICBydWxlcyxcbiAgICAgIGxhYmVsLFxuICAgICAgaW5pdFZhbHVlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgW3ZhbHVlXSA9IGdldEZpZWxkc1ZhbHVlKGZpZWxkKTtcblxuICAgIHN0b3JlLnVwZGF0ZShmaWVsZCwge1xuICAgICAgdmFsdWUsXG4gICAgICBydWxlcyxcbiAgICAgIGxhYmVsLFxuICAgICAgaW5pdFZhbHVlLFxuICAgICAgZm9ybUl0ZW06IHRoaXMsXG4gICAgICBjb21SZWY6IHRoaXMuY29tLFxuICAgICAgaXNNb3VudCxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKGFyZywgLi4ub3RoZXJzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIHNldEZpZWxkcyxcbiAgICAgICAgc2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooYXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGFyZykgOiBhcmc7XG5cbiAgICBzZXRGaWVsZHNWYWx1ZSh7XG4gICAgICBbZmllbGRdOiB2YWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNsaWNrTGFiZWwgPSAoKSA9PiB7XG4gICAgdGhpcy5jb20gJiYgdGhpcy5jb20ud2FrZVVwICYmIHRoaXMuY29tLndha2VVcCgpO1xuICB9XG5cbiAgc2V0UnVsZSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgZ2V0RmllbGRzVmFsdWUsXG4gICAgICAgIHNldEZpZWxkc0Vycm9yLFxuICAgICAgfSxcbiAgICAgIGxhYmVsLFxuICAgICAgZmllbGQsXG4gICAgICBmaWVsZE5hbWUsXG4gICAgICBjb21Qcm9wcyA9IHt9LFxuICAgICAgcnVsZXMgPSBbXSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGV2ZW50cyA9IHJ1bGVzLnJlZHVjZVJpZ2h0KCh0cmlnZ2VyLCBydWxlKSA9PiB7XG4gICAgICBjb25zdCB7IHZhbGlkYXRlVHJpZ2dlciA9IFtdLCBmdW4sIGVycm9yIH0gPSBydWxlO1xuICAgICAgdmFsaWRhdGVUcmlnZ2VyLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwcmVUcmlnZ2VyID0gdHJpZ2dlcltldmVudE5hbWVdIHx8ICgoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJbZXZlbnROYW1lXSA9IGFzeW5jIChmaXJzdEFyZywgLi4uYXJnKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBpc0V2ZW50T2JqKGZpcnN0QXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGZpcnN0QXJnKSA6IGZpcnN0QXJnO1xuICAgICAgICAgIGlmIChhd2FpdCBmdW4odmFsdWUsIC4uLmFyZykpIHtcbiAgICAgICAgICAgIHNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgcHJlVHJpZ2dlcih2YWx1ZSwgLi4uYXJnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvcih7IGxhYmVsLCBmaWVsZCB9KSB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyaWdnZXI7XG4gICAgfSwge30pO1xuXG4gICAgY29uc3QgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcyA9IHtcbiAgICAgIC4uLmV2ZW50cyxcbiAgICAgIC4uLm1hcE9iamVjdChjb21Qcm9wcywgKHByb3BzS2V5LCBwcm9wc1ZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW3Byb3BzS2V5XTtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFtwcm9wc0tleV0odmFsdWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgcHJvcHNWYWx1ZSgpO1xuICAgICAgICAgICAgICByZXR1cm4gZXZlbnQodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ubWVyZ2VFdmVudEZvcm1Db21Qcm9wcyxcbiAgICAgIG9uQ2hhbmdlOiAodmFsdWUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICAgIG1lcmdlRXZlbnRGb3JtQ29tUHJvcHMub25DaGFuZ2UgJiYgbWVyZ2VFdmVudEZvcm1Db21Qcm9wcy5vbkNoYW5nZSh2YWx1ZSwgLi4uYXJncyk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBkZWZhdWx0UmVuZGVyID0gKHtcbiAgICBsYWJlbCxcbiAgICBlcnJvcixcbiAgICByZW5kZXJDb20sXG4gIH0gPSB7fSkgPT4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbScpfSAke2Vycm9yID8gJ2hhcy1lcnJvcicgOiAnJ31gIH0+XG4gICAgICA8ZGl2XG4gICAgICAgIG9uQ2xpY2s9eyB0aGlzLmNsaWNrTGFiZWwgfVxuICAgICAgICBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tbGFiZWwnKX1gIH0+XG4gICAgICAgIHsgbGFiZWwgfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1jb20tZXJyb3InKX1gIH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWNvbScpfWAgfT5cbiAgICAgICAgICB7IHJlbmRlckNvbSgpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgZXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tZXJyb3InKX1gIH0+e2Vycm9yfTwvZGl2PiB9XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gIClcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgc2V0RmllbGRzLFxuICAgICAgICBnZXRGaWVsZHMsXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlLFxuICAgICAgICB2ZXJpZnksXG4gICAgICAgIHN0b3JlLFxuICAgICAgfSxcbiAgICAgIGxhYmVsLFxuICAgICAgZmllbGQsXG4gICAgICBDb20sXG4gICAgICBjb21Qcm9wcyA9IHt9LFxuICAgICAgcnVsZXMgPSBbXSxcbiAgICAgIHJlbmRlckRpbm9Gb3JtID0gdGhpcy5kZWZhdWx0UmVuZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IHRydWUgfSk7XG5cbiAgICBjb25zdCB7IGVycm9yIH0gPSBzdG9yZS5nZXQoZmllbGQpO1xuICAgIGNvbnN0IFt2YWx1ZV0gPSBnZXRGaWVsZHNWYWx1ZShmaWVsZCk7XG5cbiAgICByZXR1cm4gcmVuZGVyRGlub0Zvcm0oe1xuICAgICAgbGFiZWwsXG4gICAgICBlcnJvcixcbiAgICAgIHJlbmRlckNvbTogKCkgPT4gKFxuICAgICAgICA8Q29tXG4gICAgICAgICAgeyAuLi5jb21Qcm9wcyB9XG4gICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgZXJyb3I9eyBlcnJvciB9XG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4udGhpcy5zZXRSdWxlKClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVmPXsgKHJlZikgPT4geyB0aGlzLmNvbSA9IHJlZjsgfSB9XG4gICAgICAgICAgLz5cbiAgICAgICksXG4gICAgfSk7XG4gIH1cbn1cblxuRGlub0Zvcm1JdGVtLmRlZmF1bHRQcm9wcyA9IHtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlub0Zvcm1JdGVtO1xuIl19