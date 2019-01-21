import React, { Component } from 'react';
// import DinoForm from './components/DinoForm';
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
    return class DinoForm extends Component {
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
        // ProjectsForm: {
        //   Com: ProjectsForm,
        //   field: 'projects',
        //   WarpCom: ProjectsForm,
        //   IDRefMap: {
        //     0: {},
        //     1: {},
        //   },
        //   IDList: [],
        // },
        this.groups = this.createGroups(groups);
      }

      createGroups = groups => mapObject(groups, (formName, {
        Com, field, count, formProps = {},
      } = {}) => ({
        [formName]: {
          Com,
          field,
          IDRefMap: {},
          formProps,
          IDList: [...new Array(count)].map(() => this.ID++),
          Form: (props) => {
            const { ID, index } = props;
            return (
              <Com ref={ ref => this.groups[formName].IDRefMap[ID] = ref } />
            );
          },
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

      addItem = () => {

      }

      deleteItem = () => {}

      groupsAPI = () => mapObject(this.groups, (groupName, {
        Com,
        field,
        IDRefMap,
        IDList,
        Form,
        formProps,
      }) => ({
        [groupName]: {
          render: (render = this.renderGroup) => render({
            Com,
            field,
            IDRefMap,
            IDList,
            Form,
            deleteIt: () => {},
            move: () => {},
            moveTo: () => {},
            formProps,
          }),
          addItem: (add = this.addItem) => add({
            Com,
            field,
            IDRefMap,
            IDList,
            Form,
          }),
          deleteItem: (add = this.deleteItem) => add({
            Com,
            field,
            IDRefMap,
            IDList,
            Form,
          }),
        },
      }))

      renderGroup = ({ Form, IDList, field }) => {
        const group = IDList.map((id, index) => (
          <div className={ `dino-form-${field}-group-item` }>
            <Form id={ id } index={ index } />)
          </div>
        ));
        return <div className={ `dino-form-${field}-group` }>{group}</div>;
      }

      render() {
        return (
          <View
            dinoForm={ {
              ...this.createDinoFormApi(),
              fragments: this.fragments,
              groups: this.groupsAPI(),
            } }
            />
        );
      }
    };
  };
}

export default createForm;
