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
            renderDinoFormItem = _this$props.renderDinoFormItem,
            others = _objectWithoutProperties(_this$props, ["dinoForm", "label", "field", "required", "initValue", "rules", "resetWhenUnmount", "renderDinoFormItem"]);

      return React.createElement(FromItem, {
        label: label,
        field: field,
        initValue: initValue,
        Com: Com,
        comProps: others,
        resetWhenUnmount: resetWhenUnmount,
        renderDinoFormItem: renderDinoFormItem,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaW5vRnJvbUl0ZW1pZnkuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiaXNFdmVudE9iaiIsImdldFZhbHVlRnJvbUV2ZW50IiwiZGlub0Zyb21JdGVtaWZ5IiwiQ29tIiwiRGlub0NvbXBvbmVudCIsIkNvbXBvbmVudCIsInJlbmRlciIsInByb3BzIiwiZGlub0Zvcm0iLCJGcm9tSXRlbSIsInNldEZpZWxkcyIsImdldEZpZWxkcyIsInZlcmlmeSIsImxhYmVsIiwiZmllbGQiLCJyZXF1aXJlZCIsImluaXRWYWx1ZSIsInJ1bGVzIiwicmVzZXRXaGVuVW5tb3VudCIsInJlbmRlckRpbm9Gb3JtSXRlbSIsIm90aGVycyIsInZhbGlkYXRlVHJpZ2dlciIsImZ1biIsImZpcnN0QXJnIiwidmFsdWUiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsVUFBVCxFQUFxQkMsaUJBQXJCLFFBQThDLFFBQTlDO0FBRUEsZUFBZSxTQUFTQyxlQUFULENBQXlCQyxHQUF6QixFQUE4QjtBQUMzQyxTQUFPLE1BQU1DLGFBQU4sU0FBNEJMLEtBQUssQ0FBQ00sU0FBbEMsQ0FBNEM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxNQUFNLEdBQUc7QUFBQSwwQkFnQkgsS0FBS0MsS0FoQkY7QUFBQSwrQ0FFTEMsUUFGSztBQUFBLFlBR0hDLFFBSEcsd0JBR0hBLFFBSEc7QUFBQSxZQUlIQyxTQUpHLHdCQUlIQSxTQUpHO0FBQUEsWUFLSEMsU0FMRyx3QkFLSEEsU0FMRztBQUFBLFlBTUhDLE1BTkcsd0JBTUhBLE1BTkc7QUFBQSxZQVFMQyxLQVJLLGVBUUxBLEtBUks7QUFBQSxZQVNMQyxLQVRLLGVBU0xBLEtBVEs7QUFBQSwrQ0FVTEMsUUFWSztBQUFBLFlBVUxBLFFBVksscUNBVU0sS0FWTjtBQUFBLFlBV0xDLFNBWEssZUFXTEEsU0FYSztBQUFBLDRDQVlMQyxLQVpLO0FBQUEsWUFZTEEsS0FaSyxrQ0FZRyxFQVpIO0FBQUEsWUFhTEMsZ0JBYkssZUFhTEEsZ0JBYks7QUFBQSxZQWNMQyxrQkFkSyxlQWNMQSxrQkFkSztBQUFBLFlBZUZDLE1BZkU7O0FBa0JQLGFBQ0Usb0JBQUMsUUFBRDtBQUNFLFFBQUEsS0FBSyxFQUFHUCxLQURWO0FBRUUsUUFBQSxLQUFLLEVBQUdDLEtBRlY7QUFHRSxRQUFBLFNBQVMsRUFBR0UsU0FIZDtBQUlFLFFBQUEsR0FBRyxFQUFHYixHQUpSO0FBS0UsUUFBQSxRQUFRLEVBQUdpQixNQUxiO0FBTUUsUUFBQSxnQkFBZ0IsRUFBR0YsZ0JBTnJCO0FBT0UsUUFBQSxrQkFBa0IsRUFBR0Msa0JBUHZCO0FBUUUsUUFBQSxLQUFLLEVBQUcsQ0FDTixJQUNFSixRQUFRLEdBQ0osQ0FDQTtBQUNFTSxVQUFBQSxlQUFlLEVBQUUsQ0FBQyxVQUFELEVBQWEsUUFBYixDQURuQjtBQUVFQyxVQUFBQSxHQUFHLEVBQUdDLFFBQUQsSUFBYztBQUNqQixrQkFBTUMsS0FBSyxHQUFHeEIsVUFBVSxDQUFDdUIsUUFBRCxDQUFWLEdBQXVCdEIsaUJBQWlCLENBQUNzQixRQUFELENBQXhDLEdBQXFEQSxRQUFuRTs7QUFDQSxnQkFBSSxlQUFjQyxLQUFkLENBQUosRUFBMEI7QUFDeEIscUJBQU9BLEtBQUssQ0FBQ0MsTUFBTixHQUFlLENBQXRCO0FBQ0Q7O0FBQ0QsbUJBQU9ELEtBQUssS0FBS0UsU0FBVixJQUNGRixLQUFLLEtBQUssSUFEUixJQUVGQSxLQUFLLEtBQUssRUFGZjtBQUdELFdBVkg7QUFXRUcsVUFBQUEsS0FBSyxFQUFFO0FBQUEsZ0JBQUdkLEtBQUgsUUFBR0EsS0FBSDtBQUFBLGdCQUFVQyxLQUFWLFFBQVVBLEtBQVY7QUFBQSxtQkFBdUIsR0FBRUQsS0FBTSxLQUEvQjtBQUFBO0FBWFQsU0FEQSxDQURJLEdBZ0JKLEVBakJOLENBRE0sRUFvQk4sR0FBR0ksS0FwQkc7QUFSVixRQURGO0FBaUNEOztBQXpEZ0QsR0FBbkQ7QUEyREQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgaXNFdmVudE9iaiwgZ2V0VmFsdWVGcm9tRXZlbnQgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaW5vRnJvbUl0ZW1pZnkoQ29tKSB7XG4gIHJldHVybiBjbGFzcyBEaW5vQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAvLyBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIC8vICAgc3VwZXIocHJvcHMpO1xuICAgIC8vICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIC8vIH1cbiAgICAvLyBjb21wb25lbnREaWRNb3VudGNvbXBvbmVudERpZE1vdW50KCkge31cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGRpbm9Gb3JtOiB7XG4gICAgICAgICAgRnJvbUl0ZW0sXG4gICAgICAgICAgc2V0RmllbGRzLFxuICAgICAgICAgIGdldEZpZWxkcyxcbiAgICAgICAgICB2ZXJpZnksXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsLFxuICAgICAgICBmaWVsZCxcbiAgICAgICAgcmVxdWlyZWQgPSBmYWxzZSxcbiAgICAgICAgaW5pdFZhbHVlLFxuICAgICAgICBydWxlcyA9IFtdLFxuICAgICAgICByZXNldFdoZW5Vbm1vdW50LFxuICAgICAgICByZW5kZXJEaW5vRm9ybUl0ZW0sXG4gICAgICAgIC4uLm90aGVyc1xuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGcm9tSXRlbVxuICAgICAgICAgIGxhYmVsPXsgbGFiZWwgfVxuICAgICAgICAgIGZpZWxkPXsgZmllbGQgfVxuICAgICAgICAgIGluaXRWYWx1ZT17IGluaXRWYWx1ZSB9XG4gICAgICAgICAgQ29tPXsgQ29tIH1cbiAgICAgICAgICBjb21Qcm9wcz17IG90aGVycyB9XG4gICAgICAgICAgcmVzZXRXaGVuVW5tb3VudD17IHJlc2V0V2hlblVubW91bnQgfVxuICAgICAgICAgIHJlbmRlckRpbm9Gb3JtSXRlbT17IHJlbmRlckRpbm9Gb3JtSXRlbSB9XG4gICAgICAgICAgcnVsZXM9eyBbXG4gICAgICAgICAgICAuLi4oXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVHJpZ2dlcjogWydvbkNoYW5nZScsICdvbkJsdXInXSxcbiAgICAgICAgICAgICAgICAgICAgZnVuOiAoZmlyc3RBcmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlzRXZlbnRPYmooZmlyc3RBcmcpID8gZ2V0VmFsdWVGcm9tRXZlbnQoZmlyc3RBcmcpIDogZmlyc3RBcmc7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbHVlICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWx1ZSAhPT0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAoeyBsYWJlbCwgZmllbGQgfSkgPT4gYCR7bGFiZWx9IOW/heWhq2AsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICA6IFtdXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgLi4ucnVsZXMsXG4gICAgICAgICAgXSB9XG4gICAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuIl19