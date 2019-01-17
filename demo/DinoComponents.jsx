import React, { Component, PropTypes } from 'react';
import { Input, InputNumber } from 'antd';

function dinoFromItemify(Com) {
  return class extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {};
    // }
    // componentDidMount() {}
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
        require = false,
        initValue,
        rules = [],
        ...others
      } = this.props;

      return (
        <FromItem
          label={label}
          field={field}
          initValue={initValue}
          Com={Com}
          comProps={others}
          rules={[
            ...(
              require ?
              [
                {
                  validateTrigger: ['onChange', 'onBlur'],
                  fun: value => !!value,
                  message: 'value 不能等于二',
                },
              ]
              :
              []
            ),
            ...rules,
          ]}
          />
      );
    }
  };
}

export const DinoInput = dinoFromItemify(Input);
export const DinoInputNumber = dinoFromItemify(InputNumber);

export default dinoFromItemify;
