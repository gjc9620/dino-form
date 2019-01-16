import React, { Component, PropTypes } from 'react';

//注册规则
//卸载标记
class DinoFormItem extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
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
    
    return (
      <section className='dino-form-item'>
        <div>
          <div>label</div>
          <div>
            <div><Com {...comProps} /></div>
          </div>
        </div>
      </section>
    )
  }
}

DinoFormItem.defaultProps = {

};

export default DinoFormItem;

