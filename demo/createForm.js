import React, { Component } from 'react';
import DinoForm from './components/DinoForm';
import DinoFormItem from './components/DinoFormItem';

function mapObject(obj, callback) {
  const mapedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    Object.assign(mapedObj, callback(key, value, obj));
  }
  return mapedObj;
}

function createForm({
  fragments = {},
  group,
} = {}) {
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
            getFields: this.getFields,
            verify: this.verify,
          }}
          {...props}
          />);
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
