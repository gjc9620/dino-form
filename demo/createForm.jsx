import React, { Component } from 'react';
// import DinoForm from './components/DinoForm';
import DinoFormItem from './components/DinoFormItem';
import createDinoFormStore from './components/DinoFormStore';
import { mapObject, mapObjectAsync } from './util';

function createForm({
  fragments = {},
  groups = {},
} = {}) {
  return function create(View) {
    return class DinoForm extends Component {
      constructor(constructorProps) {
        super(constructorProps);

        this.store = createDinoFormStore();
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
        this.groups = this.createGroups(groups);
      }

      createGroups = groupsObj => mapObject(groupsObj, (formName, {
        Com, field, count, formProps = {},
      } = {}) => {
        const that = this;
        const group = {
          Com,
          field,
          IDRefMap: {
            // 0: {
            //   ref: {},
            //   props: {}
            // }
          },
          formProps,
          IDList: [...new Array(count)].map(() => this.ID++),
          Form: class extends Component {
            constructor(props){
              super(props);
              const { ID, index } = props;
              that.groups[formName].IDRefMap[ID] = {};
            }

            componentWillUnmount() {
              const { ID, index } = this.props;
              that.groups[formName].IDRefMap[ID] = undefined;
            }

            catchRef = (ref) => {
              const { ID, index } = this.props;
              that.groups[formName].IDRefMap[ID].ref = ref;
            }

            render() {
              const { ID, index } = this.props;
              return (
                <Com ref={ this.catchRef } />
              );
            }
          },
        };
        return ({
          [formName]: group,
        });
      })

      createCatchRef = () => {
        if (ref) {
          return this.groups[formName].IDRefMap[ID] = ref;
        }
      }

      createDinoFormApi = () => ({
        FromItem: this.FromItem,
        setFields: this.setFields,
        setFieldsValues: this.setFieldsValues,
        setFieldsError: this.setFieldsError,
        getFields: this.getFields,
        getFieldsValues: this.getFieldsValues,
        verify: this.verify,
        store: this.store,
      })

      createFromItem = () => props => (
        <DinoFormItem
          dinoForm={ this.createDinoFormApi() }
          { ...props }
          />
      )

      setFieldsError = (obj) => {
        [...Object.entries(obj)].forEach(([field, error]) => {
          this.store.update(field, { error });
        });
        this.setState({});
      }

      setFieldsValues = (obj) => {
        [...Object.entries(obj)].forEach(([field, newValue]) => {
          this.store.update(field, { value: newValue });
        });
        this.setState({});
      }

      getFieldsValues = (...fields) => fields.map((field) => {
        const scheme = this.store.get(field) || {};
        return scheme.value;
      })

      setFields = () => {}

      getFields = () => {}

      verify = () => Promise.resolve().then(async () => {
        let hasError = false;
        const fragmentsField = await mapObjectAsync(
          this.store.get(),
          async (
            field,
            scheme) => {
            const {
              rules = [], isMount, value, label,
            } = scheme;
            if (!isMount) { return {}; }

            let error;
            let isPass;
            for (const rule of rules) {
              isPass = await rule.fun(value);
              if (!isPass) {
                hasError = true;
                error = rule.error({ label, field });
                this.setFieldsError({ [field]: error });
                break;
              }
            }

            return { [field]: value };
          },
        );

        const groupField = await mapObjectAsync(
          this.groups,
          async (
            groupName,
            {
              field,
              IDRefMap = [], IDList,
            }) => {
            const values = [];

            for (const ID of IDList) {
              const result = await IDRefMap[ID].ref.verify();
              if (result.hasError) hasError = true;
              values.push(result.data);
            }

            return {
              [field]: values,
            };
          },
        );

        return {
          hasError,
          data: {
            ...fragmentsField,
            ...groupField,
          },
        };
      })

      addItem = () => {

      }

      deleteItem = () => {}

      mapGroup = ({ Form, ID, formProps = {} }) => <Form { ...formProps }  ID={ ID } />

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
