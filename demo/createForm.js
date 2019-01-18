import React, { Component } from 'react';
import DinoForm from './components/DinoForm';
import DinoFormItem from './components/DinoFormItem';
import createDinoFormStore from './components/DinoFormStore';
import { mapObject } from './util';


function createForm({
  fragments = {},
  group,
} = {}) {
  const store = createDinoFormStore();
  window.store = store;
  
  return function create(View) {
    return class Form extends Component {
      constructor(props) {
        super(props);
        
        this.FromItem = this.createFromItem();
        this.fragments = mapObject(fragments, (comName, { Com, ...props} = {}) => {
          return {
            [comName]: runTimeProps => (
              <Com
                dinoForm = {{
                  FromItem: this.FromItem,
                  setFields: this.setFields,
                  getFields: this.getFields,
                  verify: this.verify,
                  If: ()=>{},
                }}
                {...props}
                {...runTimeProps}
              />
            )
          };
        })
      }
      createFromItem = () => {
        return props => (<DinoFormItem
          dinoForm={{
            setFields: this.setFields,
            setFieldsValues: this.setFieldsValues,
            setFieldsError: this.setFieldsError,
            getFields: this.getFields,
            getFieldsValues: this.getFieldsValues,
            verify: this.verify,
            store,
          }}
          {...props}
          />);
      }
      setFieldsError = (obj)=>{
        [...Object.entries(obj)].forEach(([field, error])=>{
          store.update(field, { error });
        });
        this.setState({});
      }
      setFieldsValues = (obj)=>{
        [...Object.entries(obj)].forEach(([field, newValue])=>{
          store.update(field, {value: newValue});
        });
        this.setState({});
      }
      getFieldsValues = (...fields)=>{
        return fields.map((field)=>{
          const scheme = store.get(field) || {};
          return scheme.value;
        })
      }
      setFields = () => {}
      getFields = () => {}
      verify = () => {}
      render() {
        return (
          <View
            dinoForm={{
              setFields: this.setFields,
              getFields: this.getFields,
              verify: this.verify,
              fragments: this.fragments,
            }}
            />
        );
      }
    };
  };
}

export default createForm;
