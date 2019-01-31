import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _Array$isArray from "@babel/runtime-corejs2/core-js/array/is-array";
import _objectSpread from "@babel/runtime-corejs2/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties";
import React from 'react';
import { isEventObj, getValueFromEvent } from './util';
export default function dinoFromItemify(Com) {
  let fromItemInitProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let comInitProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
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

      return React.createElement(FromItem, _extends({}, fromItemInitProps, {
        label: label,
        field: field,
        initValue: initValue,
        Com: Com,
        comProps: _objectSpread({}, comInitProps, others),
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
      }));
    }

  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaW5vRnJvbUl0ZW1pZnkuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiaXNFdmVudE9iaiIsImdldFZhbHVlRnJvbUV2ZW50IiwiZGlub0Zyb21JdGVtaWZ5IiwiQ29tIiwiZnJvbUl0ZW1Jbml0UHJvcHMiLCJjb21Jbml0UHJvcHMiLCJEaW5vQ29tcG9uZW50IiwiQ29tcG9uZW50IiwicmVuZGVyIiwicHJvcHMiLCJkaW5vRm9ybSIsIkZyb21JdGVtIiwic2V0RmllbGRzIiwiZ2V0RmllbGRzIiwidmVyaWZ5IiwibGFiZWwiLCJmaWVsZCIsInJlcXVpcmVkIiwiaW5pdFZhbHVlIiwicnVsZXMiLCJyZXNldFdoZW5Vbm1vdW50Iiwib3RoZXJzIiwidmFsaWRhdGVUcmlnZ2VyIiwiZnVuIiwiZmlyc3RBcmciLCJ2YWx1ZSIsImxlbmd0aCIsInVuZGVmaW5lZCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLFVBQVQsRUFBcUJDLGlCQUFyQixRQUE4QyxRQUE5QztBQUVBLGVBQWUsU0FBU0MsZUFBVCxDQUF5QkMsR0FBekIsRUFBeUU7QUFBQSxNQUEzQ0MsaUJBQTJDLHVFQUF2QixFQUF1QjtBQUFBLE1BQW5CQyxZQUFtQix1RUFBSixFQUFJO0FBQ3RGLFNBQU8sTUFBTUMsYUFBTixTQUE0QlAsS0FBSyxDQUFDUSxTQUFsQyxDQUE0QztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLE1BQU0sR0FBRztBQUFBLDBCQWVILEtBQUtDLEtBZkY7QUFBQSwrQ0FFTEMsUUFGSztBQUFBLFlBR0hDLFFBSEcsd0JBR0hBLFFBSEc7QUFBQSxZQUlIQyxTQUpHLHdCQUlIQSxTQUpHO0FBQUEsWUFLSEMsU0FMRyx3QkFLSEEsU0FMRztBQUFBLFlBTUhDLE1BTkcsd0JBTUhBLE1BTkc7QUFBQSxZQVFMQyxLQVJLLGVBUUxBLEtBUks7QUFBQSxZQVNMQyxLQVRLLGVBU0xBLEtBVEs7QUFBQSwrQ0FVTEMsUUFWSztBQUFBLFlBVUxBLFFBVksscUNBVU0sS0FWTjtBQUFBLFlBV0xDLFNBWEssZUFXTEEsU0FYSztBQUFBLDRDQVlMQyxLQVpLO0FBQUEsWUFZTEEsS0FaSyxrQ0FZRyxFQVpIO0FBQUEsWUFhTEMsZ0JBYkssZUFhTEEsZ0JBYks7QUFBQSxZQWNGQyxNQWRFOztBQWlCUCxhQUNFLG9CQUFDLFFBQUQsZUFDT2pCLGlCQURQO0FBRUUsUUFBQSxLQUFLLEVBQUdXLEtBRlY7QUFHRSxRQUFBLEtBQUssRUFBR0MsS0FIVjtBQUlFLFFBQUEsU0FBUyxFQUFHRSxTQUpkO0FBS0UsUUFBQSxHQUFHLEVBQUdmLEdBTFI7QUFNRSxRQUFBLFFBQVEsb0JBQ0hFLFlBREcsRUFFSGdCLE1BRkcsQ0FOVjtBQVVFLFFBQUEsZ0JBQWdCLEVBQUdELGdCQVZyQjtBQVdFLFFBQUEsS0FBSyxFQUFHLENBQ04sSUFDRUgsUUFBUSxHQUNKLENBQ0E7QUFDRUssVUFBQUEsZUFBZSxFQUFFLENBQUMsVUFBRCxFQUFhLFFBQWIsQ0FEbkI7QUFFRUMsVUFBQUEsR0FBRyxFQUFHQyxRQUFELElBQWM7QUFDakIsa0JBQU1DLEtBQUssR0FBR3pCLFVBQVUsQ0FBQ3dCLFFBQUQsQ0FBVixHQUF1QnZCLGlCQUFpQixDQUFDdUIsUUFBRCxDQUF4QyxHQUFxREEsUUFBbkU7O0FBQ0EsZ0JBQUksZUFBY0MsS0FBZCxDQUFKLEVBQTBCO0FBQ3hCLHFCQUFPQSxLQUFLLENBQUNDLE1BQU4sR0FBZSxDQUF0QjtBQUNEOztBQUNELG1CQUFPRCxLQUFLLEtBQUtFLFNBQVYsSUFDRkYsS0FBSyxLQUFLLElBRFIsSUFFRkEsS0FBSyxLQUFLLEVBRmY7QUFHRCxXQVZIO0FBV0VHLFVBQUFBLEtBQUssRUFBRTtBQUFBLGdCQUFHYixLQUFILFFBQUdBLEtBQUg7QUFBQSxnQkFBVUMsS0FBVixRQUFVQSxLQUFWO0FBQUEsbUJBQXVCLEdBQUVELEtBQU0sS0FBL0I7QUFBQTtBQVhULFNBREEsQ0FESSxHQWdCSixFQWpCTixDQURNLEVBb0JOLEdBQUdJLEtBcEJHO0FBWFYsU0FERjtBQW9DRDs7QUEzRGdELEdBQW5EO0FBNkREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGlzRXZlbnRPYmosIGdldFZhbHVlRnJvbUV2ZW50IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlub0Zyb21JdGVtaWZ5KENvbSwgZnJvbUl0ZW1Jbml0UHJvcHMgPSB7fSwgY29tSW5pdFByb3BzID0ge30pIHtcbiAgcmV0dXJuIGNsYXNzIERpbm9Db21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIC8vIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgLy8gICBzdXBlcihwcm9wcyk7XG4gICAgLy8gICB0aGlzLnN0YXRlID0ge307XG4gICAgLy8gfVxuICAgIC8vIGNvbXBvbmVudERpZE1vdW50Y29tcG9uZW50RGlkTW91bnQoKSB7fVxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZGlub0Zvcm06IHtcbiAgICAgICAgICBGcm9tSXRlbSxcbiAgICAgICAgICBzZXRGaWVsZHMsXG4gICAgICAgICAgZ2V0RmllbGRzLFxuICAgICAgICAgIHZlcmlmeSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGZpZWxkLFxuICAgICAgICByZXF1aXJlZCA9IGZhbHNlLFxuICAgICAgICBpbml0VmFsdWUsXG4gICAgICAgIHJ1bGVzID0gW10sXG4gICAgICAgIHJlc2V0V2hlblVubW91bnQsXG4gICAgICAgIC4uLm90aGVyc1xuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGcm9tSXRlbVxuICAgICAgICAgIHsgLi4uZnJvbUl0ZW1Jbml0UHJvcHMgfVxuICAgICAgICAgIGxhYmVsPXsgbGFiZWwgfVxuICAgICAgICAgIGZpZWxkPXsgZmllbGQgfVxuICAgICAgICAgIGluaXRWYWx1ZT17IGluaXRWYWx1ZSB9XG4gICAgICAgICAgQ29tPXsgQ29tIH1cbiAgICAgICAgICBjb21Qcm9wcz17IHtcbiAgICAgICAgICAgIC4uLmNvbUluaXRQcm9wcyxcbiAgICAgICAgICAgIC4uLm90aGVycyxcbiAgICAgICAgICB9IH1cbiAgICAgICAgICByZXNldFdoZW5Vbm1vdW50PXsgcmVzZXRXaGVuVW5tb3VudCB9XG4gICAgICAgICAgcnVsZXM9eyBbXG4gICAgICAgICAgICAuLi4oXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVHJpZ2dlcjogWydvbkNoYW5nZScsICdvbkJsdXInXSxcbiAgICAgICAgICAgICAgICAgICAgZnVuOiAoZmlyc3RBcmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooZmlyc3RBcmcpID8gZ2V0VmFsdWVGcm9tRXZlbnQoZmlyc3RBcmcpIDogZmlyc3RBcmc7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbHVlICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWx1ZSAhPT0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAoeyBsYWJlbCwgZmllbGQgfSkgPT4gYCR7bGFiZWx9IOW/heWhq2AsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICA6IFtdXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgLi4ucnVsZXMsXG4gICAgICAgICAgXSB9XG4gICAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuIl19