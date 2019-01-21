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

      verify = () => Promise.resolve().then(() => {
        let hasError = false;
        const fragmentsField = mapObject(store.get(), (field, scheme) => {
          const {
            rules = [], isMount, value, label,
          } = scheme;
          if (!isMount) { return {}; }

          let error;
          let isPass;
          for (const rule of rules) {
            isPass = rule.fun(value);
            if (!isPass) {
              hasError = true;
              error = rule.error({ label, field });
              this.setFieldsError({ [field]: error });
              break;
            }
          }

          return { [field]: value };
        });

        debugger;
        const groupField = mapObject(this.groups, (groupName, ) => {
        
        });
        debugger;
      })

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
      }) => {
        const group = {
          map: (mapGroup = this.mapGroup) => IDList.map((ID, index) => mapGroup({
            ID,
            index,
            Com,
            field,
            IDRefMap,
            IDList,
            Form,
            deleteIt: () => {},
            move: () => {},
            moveTo: () => {},
            formProps,
          })),
          render: (
            renderGroup = ele => <div className={ `dino-form-${field}-group` }>{ele}</div>,
            children = group.map(),
          ) => renderGroup(children),
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
        };

        return { [groupName]: group };
      })

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
