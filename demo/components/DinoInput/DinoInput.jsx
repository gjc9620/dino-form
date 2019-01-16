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
        },
        label,
        field,
        require = false,
        rules = [],
        ...others
      } = this.props;

      return (
        <FromItem
          label={label}
          field={field}
          Com={Com}
          comProps={others}
          rules={[
            ...(
              require ?
              [
                {
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
const DinoInput = dinoFromItemify(Input);
const DinoInputNumber = dinoFromItemify(InputNumber);

DinoInput.defaultProps = {

};

export default DinoInput;
