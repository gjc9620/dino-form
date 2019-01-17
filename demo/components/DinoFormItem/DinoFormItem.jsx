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
    const {
      dinoForm: {
        store,
      },
      initValue,
      field,
      rules,
    } = this.props;
  
    store.set(field, {
      value: initValue,
      rules,
    });
  }
  componentWillUnmount() {
    // 移除标记
    const {
      dinoForm: {
        store,
      },
      field,
    } = this.props;
  
    store.remove(field);
  }
  isEventObj = (obj) =>{
    if(typeof obj !== 'object'){
      return false
    }
    
    return (
      obj.type !== undefined &&
      obj.eventPhase !== undefined &&
      obj.target !== undefined &&
      typeof obj.stopPropagation === 'function' &&
      typeof obj.preventDefault === 'function'
    )
  }
  getValueFromEvent(e){
    const { target } = e;
    return target.type === 'checkbox' ? target.checked : target.value;
  }
  onChange = (arg)=>{
    const {
      dinoForm: {
        store,
      },
      field,
    } = this.props;
    
    const value = this.isEventObj(arg)? this.getValueFromEvent(arg): args;
  
    const scheme = store.get(field);
    
    store.update(scheme, 'value', value);
  }
  clickLabel = () => {
    this.com && this.com.wakeUp && this.com.wakeUp();
  }
  render() {
    const {
      dinoForm: {
        setFields,
        getFields,
        verify,
        store,
      },
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
        <div onClick={this.clickLabel}>{ label }</div>
        <div>
          <div>
            <Com
              {...comProps}
              onChange={this.onChange}
              ref={ref=>this.Com = ref}
              />
          </div>
          { message && <div>{message}</div> }
        </div>
      </section>
    )
  }
}

DinoFormItem.defaultProps = {

};

export default DinoFormItem;

