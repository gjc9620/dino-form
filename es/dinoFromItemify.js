import _Array$isArray from "@babel/runtime-corejs2/core-js/array/is-array";
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties";
import React from 'react';
import { isEventObj, getValueFromEvent } from './util';
export default function dinoFromItemify(Com) {
  return class DinoComponent extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {};
    // }
    // componentDidMountcomponentDidMount() {}
    render() {
      const _this$props = this.props,
            _this$props$dinoForm = _this$props.dinoForm,
            FromItem = _this$props$dinoForm.FromItem,
            setFields = _this$props$dinoForm.setFields,
            getFields = _this$props$dinoForm.getFields,
            verify = _this$props$dinoForm.verify,
            label = _this$props.label,
            field = _this$props.field,
            _this$props$required = _this$props.required,
            required = _this$props$required === void 0 ? false : _this$props$required,
            initValue = _this$props.initValue,
            _this$props$rules = _this$props.rules,
            rules = _this$props$rules === void 0 ? [] : _this$props$rules,
            resetWhenUnmount = _this$props.resetWhenUnmount,
            others = _objectWithoutProperties(_this$props, ["dinoForm", "label", "field", "required", "initValue", "rules", "resetWhenUnmount"]);

      return React.createElement(FromItem, {
        label: label,
        field: field,
        initValue: initValue,
        Com: Com,
        comProps: others,
        resetWhenUnmount: resetWhenUnmount,
        rules: [...(required ? [{
          validateTrigger: ['onChange', 'onBlur'],
          fun: firstArg => {
            const value = isEventObj(firstArg) ? getValueFromEvent(firstArg) : firstArg;

            if (_Array$isArray(value)) {
              return value.length > 0;
            }

            return value !== undefined && value !== null && value !== '';
          },
          error: (_ref) => {
            let label = _ref.label,
                field = _ref.field;
            return `${label} 必填`;
          }
        }] : []), ...rules]
      });
    }

  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaW5vRnJvbUl0ZW1pZnkuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiaXNFdmVudE9iaiIsImdldFZhbHVlRnJvbUV2ZW50IiwiZGlub0Zyb21JdGVtaWZ5IiwiQ29tIiwiRGlub0NvbXBvbmVudCIsIkNvbXBvbmVudCIsInJlbmRlciIsInByb3BzIiwiZGlub0Zvcm0iLCJGcm9tSXRlbSIsInNldEZpZWxkcyIsImdldEZpZWxkcyIsInZlcmlmeSIsImxhYmVsIiwiZmllbGQiLCJyZXF1aXJlZCIsImluaXRWYWx1ZSIsInJ1bGVzIiwicmVzZXRXaGVuVW5tb3VudCIsIm90aGVycyIsInZhbGlkYXRlVHJpZ2dlciIsImZ1biIsImZpcnN0QXJnIiwidmFsdWUiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsVUFBVCxFQUFxQkMsaUJBQXJCLFFBQThDLFFBQTlDO0FBRUEsZUFBZSxTQUFTQyxlQUFULENBQXlCQyxHQUF6QixFQUE4QjtBQUMzQyxTQUFPLE1BQU1DLGFBQU4sU0FBNEJMLEtBQUssQ0FBQ00sU0FBbEMsQ0FBNEM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxNQUFNLEdBQUc7QUFBQSwwQkFlSCxLQUFLQyxLQWZGO0FBQUEsK0NBRUxDLFFBRks7QUFBQSxZQUdIQyxRQUhHLHdCQUdIQSxRQUhHO0FBQUEsWUFJSEMsU0FKRyx3QkFJSEEsU0FKRztBQUFBLFlBS0hDLFNBTEcsd0JBS0hBLFNBTEc7QUFBQSxZQU1IQyxNQU5HLHdCQU1IQSxNQU5HO0FBQUEsWUFRTEMsS0FSSyxlQVFMQSxLQVJLO0FBQUEsWUFTTEMsS0FUSyxlQVNMQSxLQVRLO0FBQUEsK0NBVUxDLFFBVks7QUFBQSxZQVVMQSxRQVZLLHFDQVVNLEtBVk47QUFBQSxZQVdMQyxTQVhLLGVBV0xBLFNBWEs7QUFBQSw0Q0FZTEMsS0FaSztBQUFBLFlBWUxBLEtBWkssa0NBWUcsRUFaSDtBQUFBLFlBYUxDLGdCQWJLLGVBYUxBLGdCQWJLO0FBQUEsWUFjRkMsTUFkRTs7QUFpQlAsYUFDRSxvQkFBQyxRQUFEO0FBQ0UsUUFBQSxLQUFLLEVBQUdOLEtBRFY7QUFFRSxRQUFBLEtBQUssRUFBR0MsS0FGVjtBQUdFLFFBQUEsU0FBUyxFQUFHRSxTQUhkO0FBSUUsUUFBQSxHQUFHLEVBQUdiLEdBSlI7QUFLRSxRQUFBLFFBQVEsRUFBR2dCLE1BTGI7QUFNRSxRQUFBLGdCQUFnQixFQUFHRCxnQkFOckI7QUFPRSxRQUFBLEtBQUssRUFBRyxDQUNOLElBQ0VILFFBQVEsR0FDSixDQUNBO0FBQ0VLLFVBQUFBLGVBQWUsRUFBRSxDQUFDLFVBQUQsRUFBYSxRQUFiLENBRG5CO0FBRUVDLFVBQUFBLEdBQUcsRUFBR0MsUUFBRCxJQUFjO0FBQ2pCLGtCQUFNQyxLQUFLLEdBQUd2QixVQUFVLENBQUNzQixRQUFELENBQVYsR0FBdUJyQixpQkFBaUIsQ0FBQ3FCLFFBQUQsQ0FBeEMsR0FBcURBLFFBQW5FOztBQUNBLGdCQUFJLGVBQWNDLEtBQWQsQ0FBSixFQUEwQjtBQUN4QixxQkFBT0EsS0FBSyxDQUFDQyxNQUFOLEdBQWUsQ0FBdEI7QUFDRDs7QUFDRCxtQkFBT0QsS0FBSyxLQUFLRSxTQUFWLElBQ0ZGLEtBQUssS0FBSyxJQURSLElBRUZBLEtBQUssS0FBSyxFQUZmO0FBR0QsV0FWSDtBQVdFRyxVQUFBQSxLQUFLLEVBQUU7QUFBQSxnQkFBR2IsS0FBSCxRQUFHQSxLQUFIO0FBQUEsZ0JBQVVDLEtBQVYsUUFBVUEsS0FBVjtBQUFBLG1CQUF1QixHQUFFRCxLQUFNLEtBQS9CO0FBQUE7QUFYVCxTQURBLENBREksR0FnQkosRUFqQk4sQ0FETSxFQW9CTixHQUFHSSxLQXBCRztBQVBWLFFBREY7QUFnQ0Q7O0FBdkRnRCxHQUFuRDtBQXlERCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBpc0V2ZW50T2JqLCBnZXRWYWx1ZUZyb21FdmVudCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpbm9Gcm9tSXRlbWlmeShDb20pIHtcbiAgcmV0dXJuIGNsYXNzIERpbm9Db21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIC8vIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgLy8gICBzdXBlcihwcm9wcyk7XG4gICAgLy8gICB0aGlzLnN0YXRlID0ge307XG4gICAgLy8gfVxuICAgIC8vIGNvbXBvbmVudERpZE1vdW50Y29tcG9uZW50RGlkTW91bnQoKSB7fVxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgICBGcm9tSXRlbSxcbiAgICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgICAgZ2V0RmllbGRzLFxuICAgICAgICAgIHZlcmlmeSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGZpZWxkLFxuICAgICAgICByZXF1aXJlZCA9IGZhbHNlLFxuICAgICAgICBpbml0VmFsdWUsXG4gICAgICAgIHJ1bGVzID0gW10sXG4gICAgICAgIHJlc2V0V2hlblVubW91bnQsXG4gICAgICAgIC4uLm90aGVyc1xuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGcm9tSXRlbVxuICAgICAgICAgIGxhYmVsPXsgbGFiZWwgfVxuICAgICAgICAgIGZpZWxkPXsgZmllbGQgfVxuICAgICAgICAgIGluaXRWYWx1ZT17IGluaXRWYWx1ZSB9XG4gICAgICAgICAgQ29tPXsgQ29tIH1cbiAgICAgICAgICBjb21Qcm9wcz17IG90aGVycyB9XG4gICAgICAgICAgcmVzZXRXaGVuVW5tb3VudD17IHJlc2V0V2hlblVubW91bnQgfVxuICAgICAgICAgIHJ1bGVzPXsgW1xuICAgICAgICAgICAgLi4uKFxuICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRyaWdnZXI6IFsnb25DaGFuZ2UnLCAnb25CbHVyJ10sXG4gICAgICAgICAgICAgICAgICAgIGZ1bjogKGZpcnN0QXJnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBpc0V2ZW50T2JqKGZpcnN0QXJnKSA/IGdldFZhbHVlRnJvbUV2ZW50KGZpcnN0QXJnKSA6IGZpcnN0QXJnO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsdWUgIT09ICcnO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogKHsgbGFiZWwsIGZpZWxkIH0pID0+IGAke2xhYmVsfSDlv4XloatgLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgOiBbXVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIC4uLnJ1bGVzLFxuICAgICAgICAgIF0gfVxuICAgICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==