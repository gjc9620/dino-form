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
          _this$props5$renderDi = _this$props5.renderDinoFormItem,
          renderDinoFormItem = _this$props5$renderDi === void 0 ? this.defaultRender : _this$props5$renderDi;
    this.syncToStore({
      isMount: true
    });

    const _store$get = store.get(field),
          error = _store$get.error;

    const _getFieldsValue3 = getFieldsValue(field),
          _getFieldsValue4 = _slicedToArray(_getFieldsValue3, 1),
          value = _getFieldsValue4[0];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUl0ZW0uanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwibWFwT2JqZWN0IiwiZ2V0VmFsdWVGcm9tRXZlbnQiLCJpc0V2ZW50T2JqIiwicHJlZml4IiwiRGlub0Zvcm1JdGVtIiwiaXNNb3VudCIsInByb3BzIiwiZGlub0Zvcm0iLCJzdG9yZSIsImdldEZpZWxkc1ZhbHVlIiwiZmllbGQiLCJydWxlcyIsImxhYmVsIiwiaW5pdFZhbHVlIiwidmFsdWUiLCJ1cGRhdGUiLCJmb3JtSXRlbSIsImNvbVJlZiIsImNvbSIsImFyZyIsInNldEZpZWxkcyIsInNldEZpZWxkc1ZhbHVlIiwid2FrZVVwIiwic2V0RmllbGRzRXJyb3IiLCJmaWVsZE5hbWUiLCJjb21Qcm9wcyIsImV2ZW50cyIsInJlZHVjZVJpZ2h0IiwidHJpZ2dlciIsInJ1bGUiLCJ2YWxpZGF0ZVRyaWdnZXIiLCJmdW4iLCJlcnJvciIsImZvckVhY2giLCJldmVudE5hbWUiLCJwcmVUcmlnZ2VyIiwiZmlyc3RBcmciLCJ1bmRlZmluZWQiLCJtZXJnZUV2ZW50Rm9ybUNvbVByb3BzIiwicHJvcHNLZXkiLCJwcm9wc1ZhbHVlIiwiZXZlbnQiLCJhcmdzIiwib25DaGFuZ2UiLCJyZW5kZXJDb20iLCJjbGlja0xhYmVsIiwiY29tcG9uZW50RGlkTW91bnQiLCJzeW5jVG9TdG9yZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVzZXRXaGVuVW5tb3VudCIsInJlbmRlciIsImdldEZpZWxkcyIsInZlcmlmeSIsIkNvbSIsInJlbmRlckRpbm9Gb3JtSXRlbSIsImRlZmF1bHRSZW5kZXIiLCJnZXQiLCJzZXRSdWxlIiwicmVmIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsRUFBMkJDLFNBQTNCLFFBQTRDLE9BQTVDO0FBQ0EsU0FBU0MsU0FBVCxFQUFvQkMsaUJBQXBCLEVBQXVDQyxVQUF2QyxFQUFtREMsTUFBbkQsUUFBaUUsUUFBakU7O0FBRUEsTUFBTUMsWUFBTixTQUEyQlAsS0FBSyxDQUFDQyxTQUFqQyxDQUEyQztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQSx5Q0ErQjNCLFlBRUg7QUFBQSxxRkFBUCxFQUFPO0FBQUEsOEJBRFRPLE9BQ1M7QUFBQSxVQURUQSxPQUNTLDZCQURDLElBQ0Q7O0FBQUEsMEJBVUwsS0FBSSxDQUFDQyxLQVZBO0FBQUEsK0NBRVBDLFFBRk87QUFBQSxZQUdMQyxLQUhLLHdCQUdMQSxLQUhLO0FBQUEsWUFJTEMsY0FKSyx3QkFJTEEsY0FKSztBQUFBLFlBTVBDLEtBTk8sZUFNUEEsS0FOTztBQUFBLFlBT1BDLEtBUE8sZUFPUEEsS0FQTztBQUFBLFlBUVBDLEtBUk8sZUFRUEEsS0FSTztBQUFBLFlBU1BDLFNBVE8sZUFTUEEsU0FUTzs7QUFBQSw4QkFZT0osY0FBYyxDQUFDQyxLQUFELENBWnJCO0FBQUE7QUFBQSxZQVlGSSxLQVpFOztBQWNUTixNQUFBQSxLQUFLLENBQUNPLE1BQU4sQ0FBYUwsS0FBYixFQUFvQjtBQUNsQkksUUFBQUEsS0FEa0I7QUFFbEJILFFBQUFBLEtBRmtCO0FBR2xCQyxRQUFBQSxLQUhrQjtBQUlsQkMsUUFBQUEsU0FKa0I7QUFLbEJHLFFBQUFBLFFBQVEsRUFBRSxLQUxRO0FBTWxCQyxRQUFBQSxNQUFNLEVBQUUsS0FBSSxDQUFDQyxHQU5LO0FBT2xCYixRQUFBQTtBQVBrQixPQUFwQjtBQVNELEtBeER3Qzs7QUFBQSxzQ0EwRDlCLFVBQUNjLEdBQUQsRUFBb0I7QUFBQSwyQkFRekIsS0FBSSxDQUFDYixLQVJvQjtBQUFBLGlEQUUzQkMsUUFGMkI7QUFBQSxZQUd6QkMsS0FIeUIseUJBR3pCQSxLQUh5QjtBQUFBLFlBSXpCWSxTQUp5Qix5QkFJekJBLFNBSnlCO0FBQUEsWUFLekJDLGNBTHlCLHlCQUt6QkEsY0FMeUI7QUFBQSxZQU8zQlgsS0FQMkIsZ0JBTzNCQSxLQVAyQjtBQVU3QixZQUFNSSxLQUFLLEdBQUdaLFVBQVUsQ0FBQ2lCLEdBQUQsQ0FBVixHQUFrQmxCLGlCQUFpQixDQUFDa0IsR0FBRCxDQUFuQyxHQUEyQ0EsR0FBekQ7QUFFQUUsTUFBQUEsY0FBYyxDQUFDO0FBQ2IsU0FBQ1gsS0FBRCxHQUFTSTtBQURJLE9BQUQsQ0FBZDtBQUdELEtBekV3Qzs7QUFBQSx3Q0EyRTVCLE1BQU07QUFDakIsV0FBS0ksR0FBTCxJQUFZLEtBQUtBLEdBQUwsQ0FBU0ksTUFBckIsSUFBK0IsS0FBS0osR0FBTCxDQUFTSSxNQUFULEVBQS9CO0FBQ0QsS0E3RXdDOztBQUFBLHFDQStFL0IsTUFBTTtBQUFBLDJCQVlWLEtBQUtoQixLQVpLO0FBQUEsaURBRVpDLFFBRlk7QUFBQSxZQUdWQyxLQUhVLHlCQUdWQSxLQUhVO0FBQUEsWUFJVkMsY0FKVSx5QkFJVkEsY0FKVTtBQUFBLFlBS1ZjLGNBTFUseUJBS1ZBLGNBTFU7QUFBQSxZQU9aWCxLQVBZLGdCQU9aQSxLQVBZO0FBQUEsWUFRWkYsS0FSWSxnQkFRWkEsS0FSWTtBQUFBLFlBU1pjLFNBVFksZ0JBU1pBLFNBVFk7QUFBQSxpREFVWkMsUUFWWTtBQUFBLFlBVVpBLFFBVlksc0NBVUQsRUFWQztBQUFBLDhDQVdaZCxLQVhZO0FBQUEsWUFXWkEsS0FYWSxtQ0FXSixFQVhJO0FBY2QsWUFBTWUsTUFBTSxHQUFHZixLQUFLLENBQUNnQixXQUFOLENBQWtCLENBQUNDLE9BQUQsRUFBVUMsSUFBVixLQUFtQjtBQUFBLHNDQUNMQSxJQURLLENBQzFDQyxlQUQwQztBQUFBLGNBQzFDQSxlQUQwQyxzQ0FDeEIsRUFEd0I7QUFBQSxjQUNwQkMsR0FEb0IsR0FDTEYsSUFESyxDQUNwQkUsR0FEb0I7QUFBQSxjQUNmQyxLQURlLEdBQ0xILElBREssQ0FDZkcsS0FEZTtBQUVsREYsUUFBQUEsZUFBZSxDQUFDRyxPQUFoQixDQUF5QkMsU0FBRCxJQUFlO0FBQ3JDLGdCQUFNQyxVQUFVLEdBQUdQLE9BQU8sQ0FBQ00sU0FBRCxDQUFQLEtBQXVCLE1BQU0sQ0FBRSxDQUEvQixDQUFuQjs7QUFDQU4sVUFBQUEsT0FBTyxDQUFDTSxTQUFELENBQVAsR0FBcUIsZ0JBQU9FLFFBQVAsRUFBNEI7QUFDL0Msa0JBQU10QixLQUFLLEdBQUdaLFVBQVUsQ0FBQ2tDLFFBQUQsQ0FBVixHQUF1Qm5DLGlCQUFpQixDQUFDbUMsUUFBRCxDQUF4QyxHQUFxREEsUUFBbkU7O0FBRCtDLDhDQUFSakIsR0FBUTtBQUFSQSxjQUFBQSxHQUFRO0FBQUE7O0FBRS9DLGdCQUFJLE1BQU1ZLEdBQUcsQ0FBQ2pCLEtBQUQsRUFBUSxHQUFHSyxHQUFYLENBQWIsRUFBOEI7QUFDNUJJLGNBQUFBLGNBQWMsQ0FBQztBQUFFLGlCQUFDYixLQUFELEdBQVMyQjtBQUFYLGVBQUQsQ0FBZDtBQUNBRixjQUFBQSxVQUFVLENBQUNyQixLQUFELEVBQVEsR0FBR0ssR0FBWCxDQUFWO0FBQ0E7QUFDRDs7QUFDREksWUFBQUEsY0FBYyxDQUFDO0FBQUUsZUFBQ2IsS0FBRCxHQUFTc0IsS0FBSyxDQUFDO0FBQUVwQixnQkFBQUEsS0FBRjtBQUFTRixnQkFBQUE7QUFBVCxlQUFEO0FBQWhCLGFBQUQsQ0FBZDtBQUNELFdBUkQ7QUFTRCxTQVhEO0FBWUEsZUFBT2tCLE9BQVA7QUFDRCxPQWZjLEVBZVosRUFmWSxDQUFmOztBQWlCQSxZQUFNVSxzQkFBc0IscUJBQ3ZCWixNQUR1QixFQUV2QjFCLFNBQVMsQ0FBQ3lCLFFBQUQsRUFBVyxDQUFDYyxRQUFELEVBQVdDLFVBQVgsS0FBMEI7QUFDL0MsY0FBTUMsS0FBSyxHQUFHZixNQUFNLENBQUNhLFFBQUQsQ0FBcEI7O0FBQ0EsWUFBSUUsS0FBSixFQUFXO0FBQ1QsaUJBQU87QUFDTCxhQUFDRixRQUFELEVBQVd6QixLQUFYLEVBQTJCO0FBQUEsaURBQU40QixJQUFNO0FBQU5BLGdCQUFBQSxJQUFNO0FBQUE7O0FBQ3pCRixjQUFBQSxVQUFVLENBQUMxQixLQUFELEVBQVEsR0FBRzRCLElBQVgsQ0FBVjtBQUNBLHFCQUFPRCxLQUFLLENBQUMzQixLQUFELEVBQVEsR0FBRzRCLElBQVgsQ0FBWjtBQUNEOztBQUpJLFdBQVA7QUFNRDs7QUFDRCxlQUFPLEVBQVA7QUFDRCxPQVhXLENBRmMsQ0FBNUI7O0FBZ0JBLCtCQUNLSixzQkFETDtBQUVFSyxRQUFBQSxRQUFRLEVBQUUsa0JBQUM3QixLQUFELEVBQW9CO0FBQUEsNkNBQVQ0QixJQUFTO0FBQVRBLFlBQUFBLElBQVM7QUFBQTs7QUFDNUIsVUFBQSxLQUFJLENBQUNDLFFBQUwsQ0FBYzdCLEtBQWQsRUFBcUIsR0FBRzRCLElBQXhCOztBQUNBSixVQUFBQSxzQkFBc0IsQ0FBQ0ssUUFBdkIsSUFBbUNMLHNCQUFzQixDQUFDSyxRQUF2QixDQUFnQzdCLEtBQWhDLEVBQXVDLEdBQUc0QixJQUExQyxDQUFuQztBQUNEO0FBTEg7QUFPRCxLQXJJd0M7O0FBQUEsMkNBdUl6QjtBQUFBLHNGQUlaLEVBSlk7QUFBQSxVQUNkOUIsS0FEYyxTQUNkQSxLQURjO0FBQUEsVUFFZG9CLEtBRmMsU0FFZEEsS0FGYztBQUFBLFVBR2RZLFNBSGMsU0FHZEEsU0FIYzs7QUFBQSxhQUtkO0FBQVMsUUFBQSxTQUFTLEVBQUksR0FBRXpDLE1BQU0sQ0FBQyxNQUFELENBQVMsSUFBRzZCLEtBQUssR0FBRyxXQUFILEdBQWlCLEVBQUc7QUFBbkUsU0FDRTtBQUNFLFFBQUEsT0FBTyxFQUFHLEtBQUksQ0FBQ2EsVUFEakI7QUFFRSxRQUFBLFNBQVMsRUFBSSxHQUFFMUMsTUFBTSxDQUFDLFlBQUQsQ0FBZTtBQUZ0QyxTQUdJUyxLQUhKLENBREYsRUFNRTtBQUFLLFFBQUEsU0FBUyxFQUFJLEdBQUVULE1BQU0sQ0FBQyxnQkFBRCxDQUFtQjtBQUE3QyxTQUNFO0FBQUssUUFBQSxTQUFTLEVBQUksR0FBRUEsTUFBTSxDQUFDLFVBQUQsQ0FBYTtBQUF2QyxTQUNJeUMsU0FBUyxFQURiLENBREYsRUFJSVosS0FBSyxJQUFJO0FBQUssUUFBQSxTQUFTLEVBQUksR0FBRTdCLE1BQU0sQ0FBQyxZQUFELENBQWU7QUFBekMsU0FBOEM2QixLQUE5QyxDQUpiLENBTkYsQ0FMYztBQUFBLEtBdkl5QjtBQUFBOztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQWMsRUFBQUEsaUJBQWlCLEdBQUc7QUFDbEIsU0FBS0MsV0FBTCxDQUFpQjtBQUFFMUMsTUFBQUEsT0FBTyxFQUFFO0FBQVgsS0FBakI7QUFDRDs7QUFFRDJDLEVBQUFBLG9CQUFvQixHQUFHO0FBQUEseUJBUWpCLEtBQUsxQyxLQVJZO0FBQUEsVUFHakJFLEtBSGlCLGdCQUVuQkQsUUFGbUIsQ0FHakJDLEtBSGlCO0FBQUEsVUFNbkJFLEtBTm1CLGdCQU1uQkEsS0FObUI7QUFBQSwrQ0FPbkJ1QyxnQkFQbUI7QUFBQSxVQU9uQkEsZ0JBUG1CLHNDQU9BLElBUEE7O0FBVXJCLFFBQUlBLGdCQUFKLEVBQXNCO0FBQ3BCekMsTUFBQUEsS0FBSyxDQUFDTyxNQUFOLENBQWFMLEtBQWIsRUFBb0I7QUFDbEJJLFFBQUFBLEtBQUssRUFBRXVCLFNBRFc7QUFFbEJMLFFBQUFBLEtBQUssRUFBRUs7QUFGVyxPQUFwQjtBQUlEOztBQUNELFNBQUtVLFdBQUwsQ0FBaUI7QUFBRTFDLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQWpCO0FBQ0Q7O0FBOEhENkMsRUFBQUEsTUFBTSxHQUFHO0FBQUEseUJBZUgsS0FBSzVDLEtBZkY7QUFBQSwrQ0FFTEMsUUFGSztBQUFBLFVBR0hhLFNBSEcseUJBR0hBLFNBSEc7QUFBQSxVQUlIK0IsU0FKRyx5QkFJSEEsU0FKRztBQUFBLFVBS0gxQyxjQUxHLHlCQUtIQSxjQUxHO0FBQUEsVUFNSDJDLE1BTkcseUJBTUhBLE1BTkc7QUFBQSxVQU9INUMsS0FQRyx5QkFPSEEsS0FQRztBQUFBLFVBU0xJLEtBVEssZ0JBU0xBLEtBVEs7QUFBQSxVQVVMRixLQVZLLGdCQVVMQSxLQVZLO0FBQUEsVUFXTDJDLEdBWEssZ0JBV0xBLEdBWEs7QUFBQSwrQ0FZTDVCLFFBWks7QUFBQSxVQVlMQSxRQVpLLHNDQVlNLEVBWk47QUFBQSw0Q0FhTGQsS0FiSztBQUFBLFVBYUxBLEtBYkssbUNBYUcsRUFiSDtBQUFBLCtDQWNMMkMsa0JBZEs7QUFBQSxVQWNMQSxrQkFkSyxzQ0FjZ0IsS0FBS0MsYUFkckI7QUFpQlAsU0FBS1IsV0FBTCxDQUFpQjtBQUFFMUMsTUFBQUEsT0FBTyxFQUFFO0FBQVgsS0FBakI7O0FBakJPLHVCQW1CV0csS0FBSyxDQUFDZ0QsR0FBTixDQUFVOUMsS0FBVixDQW5CWDtBQUFBLFVBbUJDc0IsS0FuQkQsY0FtQkNBLEtBbkJEOztBQUFBLDZCQW9CU3ZCLGNBQWMsQ0FBQ0MsS0FBRCxDQXBCdkI7QUFBQTtBQUFBLFVBb0JBSSxLQXBCQTs7QUFzQlAsV0FBT3dDLGtCQUFrQixDQUFDO0FBQ3hCMUMsTUFBQUEsS0FEd0I7QUFFeEJvQixNQUFBQSxLQUZ3QjtBQUd4QlksTUFBQUEsU0FBUyxFQUFFLE1BQ1Qsb0JBQUMsR0FBRCxlQUNPbkIsUUFEUDtBQUVFLFFBQUEsS0FBSyxFQUFHWCxLQUZWO0FBR0UsUUFBQSxLQUFLLEVBQUdrQjtBQUhWLFNBS08sS0FBS3lCLE9BQUwsRUFMUDtBQU9FLFFBQUEsR0FBRyxFQUFJQyxLQUFELElBQVM7QUFBRSxlQUFLeEMsR0FBTCxHQUFXd0MsS0FBWDtBQUFpQjtBQVBwQztBQUpzQixLQUFELENBQXpCO0FBZUQ7O0FBaE13Qzs7QUFtTTNDdEQsWUFBWSxDQUFDdUQsWUFBYixHQUE0QixFQUE1QjtBQUlBLGVBQWV2RCxZQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbWFwT2JqZWN0LCBnZXRWYWx1ZUZyb21FdmVudCwgaXNFdmVudE9iaiwgcHJlZml4IH0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgRGlub0Zvcm1JdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgLy8gY29uc3RydWN0b3IocHJvcHMpIHtcbiAgLy8gICBzdXBlcihwcm9wcyk7XG4gIC8vICAgdGhpcy5zdGF0ZSA9IHtcbiAgLy8gICAgIC8vIG1lc3NhZ2U6IHVuZGVmaW5lZCxcbiAgLy8gICB9O1xuICAvLyB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zeW5jVG9TdG9yZSh7IGlzTW91bnQ6IHRydWUgfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgLy8gZ2V0RmllbGRzVmFsdWUsXG4gICAgICB9LFxuICAgICAgZmllbGQsXG4gICAgICByZXNldFdoZW5Vbm1vdW50ID0gdHJ1ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChyZXNldFdoZW5Vbm1vdW50KSB7XG4gICAgICBzdG9yZS51cGRhdGUoZmllbGQsIHtcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgZXJyb3I6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnN5bmNUb1N0b3JlKHsgaXNNb3VudDogZmFsc2UgfSk7XG4gIH1cblxuICBzeW5jVG9TdG9yZSA9ICh7XG4gICAgaXNNb3VudCA9IHRydWUsXG4gIH0gPSB7fSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBmaWVsZCxcbiAgICAgIHJ1bGVzLFxuICAgICAgbGFiZWwsXG4gICAgICBpbml0VmFsdWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBbdmFsdWVdID0gZ2V0RmllbGRzVmFsdWUoZmllbGQpO1xuXG4gICAgc3RvcmUudXBkYXRlKGZpZWxkLCB7XG4gICAgICB2YWx1ZSxcbiAgICAgIHJ1bGVzLFxuICAgICAgbGFiZWwsXG4gICAgICBpbml0VmFsdWUsXG4gICAgICBmb3JtSXRlbTogdGhpcyxcbiAgICAgIGNvbVJlZjogdGhpcy5jb20sXG4gICAgICBpc01vdW50LFxuICAgIH0pO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAoYXJnLCAuLi5vdGhlcnMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaW5vRm9ybToge1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgc2V0RmllbGRzLFxuICAgICAgICBzZXRGaWVsZHNWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBmaWVsZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHZhbHVlID0gaXNFdmVudE9iaihhcmcpID8gZ2V0VmFsdWVGcm9tRXZlbnQoYXJnKSA6IGFyZztcblxuICAgIHNldEZpZWxkc1ZhbHVlKHtcbiAgICAgIFtmaWVsZF06IHZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgY2xpY2tMYWJlbCA9ICgpID0+IHtcbiAgICB0aGlzLmNvbSAmJiB0aGlzLmNvbS53YWtlVXAgJiYgdGhpcy5jb20ud2FrZVVwKCk7XG4gIH1cblxuICBzZXRSdWxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgc2V0RmllbGRzRXJyb3IsXG4gICAgICB9LFxuICAgICAgbGFiZWwsXG4gICAgICBmaWVsZCxcbiAgICAgIGZpZWxkTmFtZSxcbiAgICAgIGNvbVByb3BzID0ge30sXG4gICAgICBydWxlcyA9IFtdLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZXZlbnRzID0gcnVsZXMucmVkdWNlUmlnaHQoKHRyaWdnZXIsIHJ1bGUpID0+IHtcbiAgICAgIGNvbnN0IHsgdmFsaWRhdGVUcmlnZ2VyID0gW10sIGZ1biwgZXJyb3IgfSA9IHJ1bGU7XG4gICAgICB2YWxpZGF0ZVRyaWdnZXIuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZVRyaWdnZXIgPSB0cmlnZ2VyW2V2ZW50TmFtZV0gfHwgKCgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlcltldmVudE5hbWVdID0gYXN5bmMgKGZpcnN0QXJnLCAuLi5hcmcpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooZmlyc3RBcmcpID8gZ2V0VmFsdWVGcm9tRXZlbnQoZmlyc3RBcmcpIDogZmlyc3RBcmc7XG4gICAgICAgICAgaWYgKGF3YWl0IGZ1bih2YWx1ZSwgLi4uYXJnKSkge1xuICAgICAgICAgICAgc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiB1bmRlZmluZWQgfSk7XG4gICAgICAgICAgICBwcmVUcmlnZ2VyKHZhbHVlLCAuLi5hcmcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yKHsgbGFiZWwsIGZpZWxkIH0pIH0pO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJpZ2dlcjtcbiAgICB9LCB7fSk7XG5cbiAgICBjb25zdCBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzID0ge1xuICAgICAgLi4uZXZlbnRzLFxuICAgICAgLi4ubWFwT2JqZWN0KGNvbVByb3BzLCAocHJvcHNLZXksIHByb3BzVmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbcHJvcHNLZXldO1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW3Byb3BzS2V5XSh2YWx1ZSwgLi4uYXJncykge1xuICAgICAgICAgICAgICBwcm9wc1ZhbHVlKHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50KHZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge307XG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm1lcmdlRXZlbnRGb3JtQ29tUHJvcHMsXG4gICAgICBvbkNoYW5nZTogKHZhbHVlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgICBtZXJnZUV2ZW50Rm9ybUNvbVByb3BzLm9uQ2hhbmdlICYmIG1lcmdlRXZlbnRGb3JtQ29tUHJvcHMub25DaGFuZ2UodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgZGVmYXVsdFJlbmRlciA9ICh7XG4gICAgbGFiZWwsXG4gICAgZXJyb3IsXG4gICAgcmVuZGVyQ29tLFxuICB9ID0ge30pID0+IChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0nKX0gJHtlcnJvciA/ICdoYXMtZXJyb3InIDogJyd9YCB9PlxuICAgICAgPGRpdlxuICAgICAgICBvbkNsaWNrPXsgdGhpcy5jbGlja0xhYmVsIH1cbiAgICAgICAgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWxhYmVsJyl9YCB9PlxuICAgICAgICB7IGxhYmVsIH1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2l0ZW0tY29tLWVycm9yJyl9YCB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnaXRlbS1jb20nKX1gIH0+XG4gICAgICAgICAgeyByZW5kZXJDb20oKSB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7IGVycm9yICYmIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdpdGVtLWVycm9yJyl9YCB9PntlcnJvcn08L2Rpdj4gfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgIHNldEZpZWxkcyxcbiAgICAgICAgZ2V0RmllbGRzLFxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgdmVyaWZ5LFxuICAgICAgICBzdG9yZSxcbiAgICAgIH0sXG4gICAgICBsYWJlbCxcbiAgICAgIGZpZWxkLFxuICAgICAgQ29tLFxuICAgICAgY29tUHJvcHMgPSB7fSxcbiAgICAgIHJ1bGVzID0gW10sXG4gICAgICByZW5kZXJEaW5vRm9ybUl0ZW0gPSB0aGlzLmRlZmF1bHRSZW5kZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICB0aGlzLnN5bmNUb1N0b3JlKHsgaXNNb3VudDogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHN0b3JlLmdldChmaWVsZCk7XG4gICAgY29uc3QgW3ZhbHVlXSA9IGdldEZpZWxkc1ZhbHVlKGZpZWxkKTtcblxuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybUl0ZW0oe1xuICAgICAgbGFiZWwsXG4gICAgICBlcnJvcixcbiAgICAgIHJlbmRlckNvbTogKCkgPT4gKFxuICAgICAgICA8Q29tXG4gICAgICAgICAgeyAuLi5jb21Qcm9wcyB9XG4gICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgZXJyb3I9eyBlcnJvciB9XG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4udGhpcy5zZXRSdWxlKClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVmPXsgKHJlZikgPT4geyB0aGlzLmNvbSA9IHJlZjsgfSB9XG4gICAgICAgICAgLz5cbiAgICAgICksXG4gICAgfSk7XG4gIH1cbn1cblxuRGlub0Zvcm1JdGVtLmRlZmF1bHRQcm9wcyA9IHtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlub0Zvcm1JdGVtO1xuIl19