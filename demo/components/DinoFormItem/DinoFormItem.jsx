import React, { Component, PropTypes } from 'react';
import { mapObject, getValueFromEvent } from "../../util";
import { isEventObj } from "../../util";

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
  onChange = (arg, ...others)=>{
    const {
      dinoForm: {
        store,
        setFields,
        setFieldsValues,
      },
      field,
    } = this.props;
    
    const value = isEventObj(arg)? getValueFromEvent(arg): args;
  
    setFieldsValues({
      [field]: value,
    });
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
  setRule = ()=>{
    const {
      dinoForm: {
        store,
      },
      label,
      field,
      fieldName,
      comProps = {},
      rules = [],
    } = this.props;
  
    const events = rules.reduceRight((trigger, rule)=>{
      const { validateTrigger = [], fun, error } = rule;
      validateTrigger.forEach((eventName)=>{
        const preTrigger = trigger[eventName] || (()=>{});
        trigger[eventName] = (value, ...arg)=>{
          if(fun(value, ...arg)){
            store.update(field, { error: undefined });
            preTrigger(value, ...arg);
            return
          }
          store.update(field, { error: error(fieldName, label, field) });
        }
      });
      return trigger
    }, {});
  
    const mergeEventFormComProps = {
      ...events,
      ...mapObject(comProps, (propsKey, propsValue)=>{
        const event = events[propsKey];
        if(event) {
          return {
            [propsKey]: function (value, ...args) {
              propsValue();
              return event(value, ...args);
            }
          }
        }
        return {}
      })
    };
  
    return {
      ...mergeEventFormComProps,
      onChange: (value, ...args) => {
        this.onChange(value, ...args);
        mergeEventFormComProps.onChange && mergeEventFormComProps.onChange(value, ...args);
      }
    }
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
      rules = [],
    } = this.props;
    
    console.log(store.get());
    
    this.syncToStore();
  
    const { error } = store.get(field);
    const [ value ] = getFieldsValues(field);
    
    return (
      <section className='dino-form-item'>
        <div onClick={this.clickLabel}>{ label }</div>
        <div>
          <div className={`${error? 'has-error': ''}`}>
            <Com
              {...comProps}
              value={value}
              error={error}
              {
                ...this.setRule()
              }
              ref={ref=>this.com = ref}
              />
          </div>
          { error && <div>{error}</div> }
        </div>
      </section>
    )
  }
}

DinoFormItem.defaultProps = {

};

export default DinoFormItem;

