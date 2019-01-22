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
    return function bindWrap(Wrap = ({ renderDinoForm }) => renderDinoForm()) {
      return class DinoForm extends Component {
        constructor(constructorProps) {
          super(constructorProps);

          this.store = createDinoFormStore();
          this.FromItem = this.createFromItem();
          const that = this;
          this.fragments = mapObject(fragments, (comName, { Com, ...props } = {}) => ({
            [comName]: class Fragment extends Component {
              render() {
                return (
                  <Com
                    dinoForm={ that.createDinoFormApi() }
                    { ...props }
                    { ...(this.props || {}) }
                    />
                );
              }
            },
          }));

          this.ID = 0;
          this.groups = this.createGroups(groups);
          this.state = {
            store: this.store,
            FromItem: this.FromItem,
            fragments: this.fragments,
            ID: this.ID,
            groups: this.groups,
          };
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
              constructor(props) {
                super(props);
                const { ID, index } = props;
                that.groups[formName].IDRefMap[ID] = {};
                // if (!that.groups[formName].IDRefMap[ID]) {
                // }
              }

              componentWillUnmount() {
                const { ID, index } = this.props;
                that.groups[formName].IDRefMap[ID] = undefined;
              }

              catchRef = (ref) => {
                const { ID, index, catchRef = () => {} } = this.props;
                that.groups[formName].IDRefMap[ID].ref = ref;
                catchRef(ref);
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

        createDinoFormApi = () => ({
          FromItem: this.FromItem,
          setFields: this.setFields,
          setFieldsValues: this.setFieldsValues,
          setFieldsError: this.setFieldsError,
          getFields: this.getFields,
          setFullFieldsTranslate: this.setFullFieldsTranslate,
          getFullValues: this.getFullValues,
          getFieldsValues: this.getFieldsValues,
          verify: this.verify,
          store: this.store,
        })

        createFromItem = () => props => ( // todo rename
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

        getFullValues = () => {
          const fragmentsField = mapObject(
            this.store.get(),
            (
              field,
              scheme,
            ) => {
              const { isMount, value } = scheme;
              return isMount ? { [field]: value } : {};
            },
          );

          const groupField = mapObject(
            this.groups,
            (
              groupName,
              {
                field,
                IDRefMap = [], IDList,
              },
            ) => {
              const values = [];

              for (const ID of IDList) {
                const result = IDRefMap[ID].ref.getFullValues();
                values.push(result);
              }

              return {
                [field]: values,
              };
            },
          );

          return {
            ...fragmentsField,
            ...groupField,
          };
        }

        setFullFieldsTranslate = (values = {}, maps = {}) => {
          const findGroups = field => Object.values(this.groups).find(group => group.field === field);

          mapObject(values, (field, value) => {
            const group = findGroups(field);

            if (!group) {
              const { [field]: mapFun = _ => _ } = maps;
              this.store.update(field, { value: mapFun(value) });
              return;
            }

            const { IDRefMap, IDList } = group;
            // todo delete IDRefMap IDList

            IDList.forEach((ID, index) => {
              const { ref } = IDRefMap[ID];
              const groupItemValue = value[index] || [];
              const {
                [field]: fun = itemValue => ({
                  mapObj: itemValue,
                  props: {},
                }),
              } = maps;

              const { mapObj = {}, props = {} } = fun(groupItemValue);

              IDRefMap[ID].props = props;

              ref.setFullFieldsTranslate(groupItemValue, mapObj);
            });
          });

          this.setState({});
          console.log(this.store.get());
        }

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

        mapGroup = ({ Form, ID, formProps = {} }) => (
          <Form
            { ...formProps }
            ID={ ID }
            />
        )

        groupsAPI = () => mapObject(this.groups, (formName, {
          Com,
          field,
          IDRefMap,
          IDList,
          Form,
          formProps = {},
        }) => {
          const group = {
            map: (mapGroup = this.mapGroup) => IDList.map((ID, index) => mapGroup({
              ID,
              index,
              Com,
              field,
              IDRefMap,
              IDList,
              Form: {
                FormCom: Form,
                formProps: {
                  ...formProps,
                  ...((this.groups[formName].IDRefMap[ID] || {}).props || {}),
                  ID,
                },
              },
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

          return { [formName]: group };
        })

        render() {
          return (
            <Wrap
              dinoForm={ this.createDinoFormApi() }
              renderDinoForm={ (props = {}) => (
                <View
                  dinoForm={ {
                    ...this.createDinoFormApi(),
                    fragments: this.fragments,
                    groups: this.groupsAPI(),
                  } }
                  { ...props }
                  />
              ) }
              />
          );
        }
      };
    };
  };
}

export default createForm;
