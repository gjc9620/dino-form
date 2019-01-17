import React, { Component, PropTypes } from 'react';

//注册规则
//卸载标记
class DinoFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: undefined,
    };
  }
  componentDidMount() {
    // 注册规则 ref
  }
  componentWillUnmount() {
    // 移除标记
  }
  
  render() {
    const {
      label,
      field,
      Com,
      comProps = {},
      rules,
    } = this.props;
    
    const {
      message,
    } = this.state;
    
    return (
      <section className='dino-form-item'>
        <div>
          <div>label</div>
          <div>
            <div><Com {...comProps} /></div>
            { message && <div>{message}</div> }
          </div>
        </div>
      </section>
    )
  }
}

DinoFormItem.defaultProps = {

};

export default DinoFormItem;

