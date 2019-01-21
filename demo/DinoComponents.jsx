import React, { Component, PropTypes } from 'react';
import { Input, InputNumber, TimePicker } from 'antd';
import { InputItem } from 'antd-mobile';
import { isEventObj, getValueFromEvent } from './util';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'antd-mobile/dist/antd-mobile.css';

function dinoFromItemify(Com) {
  return class extends React.Component {
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
          If,
        },
        label,
        field,
        required = false,
        initValue,
        rules = [],
        ...others
      } = this.props;

      return (
        <FromItem
          label={ label }
          field={ field }
          initValue={ initValue }
          Com={ Com }
          comProps={ others }
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

export const DinoInput = dinoFromItemify(Input);
export const DinoInputNumber = dinoFromItemify(InputNumber);
export const DinoTimePicker = dinoFromItemify(TimePicker);
export const DinoInputItem = dinoFromItemify(InputItem);

export default dinoFromItemify;
