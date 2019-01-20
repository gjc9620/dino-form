import React, { Component } from 'react';
import DinoForm from './components/DinoForm';
import DinoFormItem from './components/DinoFormItem';
import createDinoFormStore from './components/DinoFormStore';
import { mapObject } from './util';
import ProjectsForm from "./ProjectsForm";


function createForm({
  fragments = {},
  groups,
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
                dinoForm = {this.createDinoFormApi()}
                {...props}
                {...runTimeProps}
              />
            )
          };
        });
  
        this.ID = 0;
        this.state = {
          groups: {
            ...this.createGroup(groups),
            ProjectsForm: {
              Com: ProjectsForm,
              field: 'projects',
              WarpCom: ProjectsForm,
              IDRefMap:{
                0:{},
                1:{},
              },
              IDList: []
            }
          }
        };
      }
      createGroup = (groups)=>{
        return mapObject(groups, (formName, { Com, field, count } = {})=>{
          return {
            Com,
            field,
            IDRefMap: {},
            IDList: [...new Array(count)].map(()=>this.ID++),
            WarpCom: (props)=>{
              const { ID, index } = props;
              return <Com ref={(ref)=>{
                return this.state.groups[formName].IDRefMap[ID] = ref;
              }} />
            },
          }
        })
      }
      updateGroupsRef = ()=> {
        return this.state.groups[formName].ref
      }
      createDinoFormApi = () => {
        return {
          FromItem: this.FromItem,
          setFields: this.setFields,
          setFieldsValues: this.setFieldsValues,
          setFieldsError: this.setFieldsError,
          getFields: this.getFields,
          getFieldsValues: this.getFieldsValues,
          verify: this.verify,
          store,
        }
      }
      createFromItem = () => {
        return props => (<DinoFormItem
          dinoForm={this.createDinoFormApi()}
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
              ...this.createDinoFormApi(),
              fragments: this.fragments,
            }}
            />
        );
      }
    };
  };
}

export default createForm;
