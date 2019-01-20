import React, { Component } from 'react';
import DinoForm from './components/DinoForm';
import DinoFormItem from './components/DinoFormItem';
import createDinoFormStore from './components/DinoFormStore';
import { mapObject } from './util';
import ProjectsForm from './ProjectsForm.jsx';


function createForm({
  fragments = {},
  groups = {},
} = {}) {
  const store = createDinoFormStore();
  window.store = store;

  return function create(View) {
    return class Form extends Component {
      constructor(props) {
        super(props);

        this.FromItem = this.createFromItem();
        this.fragments = mapObject(fragments, (comName, { Com, ...props } = {}) => ({
          [comName]: runTimeProps => (
            <Com
              dinoForm={ this.createDinoFormApi() }
              { ...props }
              { ...runTimeProps }
              />
          ),
        }));

        this.ID = 0;
        this.state = {
          groups: {
            ...this.createGroup(groups),
            ProjectsForm: {
              Com: ProjectsForm,
              field: 'projects',
              WarpCom: ProjectsForm,
              IDRefMap: {
                0: {},
                1: {},
              },
              IDList: [],
            },
          },
        };
      }

      createGroup = groups => mapObject(groups, (formName, { Com, field, count } = {}) => ({
        Com,
        field,
        IDRefMap: {},
        IDList: [...new Array(count)].map(() => this.ID++),
        WarpCom: (props) => {
          const { ID, index } = props;
          return (
            <Com ref={ ref => this.state.groups[formName].IDRefMap[ID] = ref } />
          );
        },
      }))

      createDinoFormApi = () => ({
        FromItem: this.FromItem,
        setFields: this.setFields,
        setFieldsValues: this.setFieldsValues,
        setFieldsError: this.setFieldsError,
        getFields: this.getFields,
        getFieldsValues: this.getFieldsValues,
        verify: this.verify,
        store,
      })

      createFromItem = () => props => (
        <DinoFormItem
          dinoForm={ this.createDinoFormApi() }
          { ...props }
          />
      )

      setFieldsError = (obj) => {
        [...Object.entries(obj)].forEach(([field, error]) => {
          store.update(field, { error });
        });
        this.setState({});
      }

      setFieldsValues = (obj) => {
        [...Object.entries(obj)].forEach(([field, newValue]) => {
          store.update(field, { value: newValue });
        });
        this.setState({});
      }

      getFieldsValues = (...fields) => fields.map((field) => {
        const scheme = store.get(field) || {};
        return scheme.value;
      })

      setFields = () => {}

      getFields = () => {}

      verify = () => {}

      render() {
        return (
          <View
            dinoForm={ {
              ...this.createDinoFormApi(),
              fragments: this.fragments,
              groups: {},
            } }
            />
        );
      }
    };
  };
}

export default createForm;
