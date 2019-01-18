import React, { Component, PropTypes } from 'react';

//注册规则
//卸载标记
class DinoFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // message: undefined,
    };
  }
  componentDidMount() {
    this.syncToStore({ isMount: false });
  }
  componentWillUnmount() {
    this.syncToStore({ isMount: false });
  }
  syncToStore = ({
    isMount = true,
  } = {})=>{
    const {
      dinoForm: {
        store,
        getFieldsValues,
      },
      field,
      rules,
      initValue,
    } = this.props;
    
    const [ value ] = getFieldsValues(field);
    
    store.update(field, {
      value,
      rules,
      initValue,
      formItem: this,
      comRef: this.com,
      isMount,
    });
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
  getValueFromEvent = (e)=>{
    const { target } = e;
    return target.type === 'checkbox' ? target.checked : target.value;
  }
  onChange = (arg, ...others)=>{
    const {
      dinoForm: {
        store,
        setFields,
        setFieldsValues,
      },
      field,
      onChange = ()=>{},
    } = this.props;
    
    const value = this.isEventObj(arg)? this.getValueFromEvent(arg): args;
  
    setFieldsValues({
      [field]: value,
    });
    
    onChange(arg, ...others);
  }
  clickLabel = () => {
    this.com && this.com.wakeUp && this.com.wakeUp();
  }
  verify = ()=>{
    const {
      rules,
      field,
      dinoForm: {
        getFieldsValues,
      },
    } = this.props;
    
    const [ value ] = getFieldsValues(field);
  
    rules;
    value;
  }
  render() {
    const {
      dinoForm: {
        setFields,
        getFields,
        getFieldsValues,
        verify,
        store,
      },
      label,
      field,
      Com,
      comProps = {},
      rules,
    } = this.props;
    
    this.syncToStore();
  
    const [ value ] = getFieldsValues(field);
  
    const message = this.verify(value, rules);
    
    return (
      <section className='dino-form-item'>
        <div onClick={this.clickLabel}>{ label }</div>
        <div>
          <div>
            <Com
              {...comProps}
              value={value}
              onChange={this.onChange}
              ref={ref=>this.com = ref}
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

