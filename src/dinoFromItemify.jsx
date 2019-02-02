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
      const {
        dinoForm: {
          FromItem,
          setFields,
          getFields,
          verify,
        },
        label,
        field,
        required = false,
        initValue,
        rules = [],
        resetWhenUnmount,
        ...others
      } = this.props;

      return (
        <FromItem
          label={ label }
          field={ field }
          initValue={ initValue }
          Com={ Com }
          comProps={ others }
          resetWhenUnmount={ resetWhenUnmount }
          rules={ [
            ...(
              required
                ? [
                  {
                    validateTrigger: ['onChange', 'onBlur'],
                    fun: (firstArg) => {
                      const value = isEventObj(firstArg) ? getValueFromEvent(firstArg) : firstArg;
                      if (Array.isArray(value)) {
                        return value.length > 0;
                      }
                      return value !== undefined
                        && value !== null
                        && value !== '';
                    },
                    error: ({ label, field }) => `${label} 必填`,
                  },
                ]
                : []
            ),
            ...rules,
          ] }
          />
      );
    }
  };
}
