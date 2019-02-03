import React, { Component } from 'react';
import createDinoFormStore from './DinoFormStore';
import {
  createFromItem,
  createDinoFormSubForm,
  createDinoFormGroupWrap,
  createFragments,
  groupsAPI,
  subFormsAPI,
} from './DinoFormHelper';

import { mapObject, mapObjectAsync } from './util';

class WrapCom extends Component {
  render() {
    const { dinoForm: { renderDinoForm } } = this.props;
    return renderDinoForm(this.props);
  }
}

function createForm({
  fragments = {},
  groups = {},
  subForms = {},
} = {}) {
  return function create(View) {
    return function bindWrap(Wrap = WrapCom) {
      return class DinoForm extends Component {
        constructor(constructorProps) {
          super(constructorProps);

          this.store = createDinoFormStore();
          this.subForms = createDinoFormSubForm(subForms);

          this.FromItem = createFromItem({
            createDinoFormApi: this.createDinoFormApi,
          });

          this.fragments = createFragments({
            fragments,
            createDinoFormApi: this.createDinoFormApi,
          });

          this.ID = 0;
          this.groups = this.createGroups(groups);

          this.state = {
            store: this.store,
            FromItem: this.FromItem,
            ID: this.ID,
            fragments: this.fragments,
            subForms: this.subForms,
            groups: this.groups,
          };
        }

        createGroups = groupsObj => mapObject(groupsObj, (formName, {
          Com, field, count, formProps = {},
        } = {}) => {
          const IDRefMap = {};
          const IDList = [...new Array(count)].map(() => this.ID++);
          const Form = createDinoFormGroupWrap({
            setIDRefMap: (ID, value) => { this.groups[formName].IDRefMap[ID] = value; },
            topFormRender: this.topFormRender,
            Com,
          });

          const group = {
            Com,
            field,
            formProps,
            formName,
            IDRefMap,
            IDList,
            Form,
          };

          return ({
            [formName]: group,
          });
        })

        topFormRender = () => {
          if (this.props.topFormRender) {
            return this.props.topFormRender();
          }
          return this.setState({});
        }

        createDinoFormApi = () => ({
          FromItem: this.FromItem,

          setFieldsValue: this.setFieldsValue,
          setFullValues: this.setFullValues,
          setFieldsError: this.setFieldsError,

          getFullValues: this.getFullValues,
          getFieldsValue: this.getFieldsValue,

          verify: this.verify,
          store: this.store,
          dinoFormRef: this,
        })

        setFieldsError = (obj) => {
          [...Object.entries(obj)].forEach(([field, error]) => {
            this.store.update(field, { error });
          });
          this.setState({});
        }

        setFieldsValue = (obj) => {
          [...Object.entries(obj)].forEach(([field, newValue]) => {
            this.store.update(field, { value: newValue });
          });

          this.topFormRender();
        }

        getFieldsValue = (...fields) => fields.map((field) => {
          const scheme = this.store.get(field) || {};
          return scheme.value;
        })

        getFullValues = ({ onlyGetMount = true } = {}) => {
          const fragmentsField = mapObject(
            this.store.get(),
            (
              field,
              scheme,
            ) => {
              const { isMount, value } = scheme;
              return onlyGetMount
                ? isMount ? { [field]: value } : {}
                : { [field]: value };
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

          const subFormField = mapObject(
            this.subForms,
            (formName, subForm) => {
              const { ref, field } = subForm;
              return {
                [field]: ref.getFullValues(),
              };
            },
          );

          return {
            ...fragmentsField,
            ...groupField,
            ...subFormField,
          };
        }

        setFullValues = async (values = {}, maps = {}) => {
          
          const findGroups = field => Object.values(
            this.groups,
          ).find(group => group.field === field);

          const findSubForms = field => Object.values(
            this.subForms,
          ).find(subForm => subForm.field === field);

          const render = () => new Promise(r => this.setState({}, () => r()));

          await mapObjectAsync(values, async (field, value) => {
            const group = findGroups(field);
            const subForm = findSubForms(field);

            if (subForm) {
              const { [field]: subFormMapObj } = maps;
              const { ref } = subForm;
              ref.setFullValues(value, subFormMapObj);
              return;
            }

            if (!group) { // fragment
              const { [field]: mapFun = _ => _ } = maps;
              this.store.update(field, { value: mapFun(value) });
              return;
            }

            if (!Array.isArray(value) || value.length < 1) return;

            // delete IDList and add
            group.IDList = [...new Array(value.length)].map(() => this.ID++);

            // render
            await render();

            // group should mounted
            const { IDRefMap, IDList, formName } = group;

            IDList.forEach((ID, index) => {
              const {
                [ID]: {
                  ref,
                } = {},
              } = IDRefMap;

              if (!ref) {
                console.warn(`[dino-form] ${formName} should be mounted but the Ref is not registered, maybe you not render this group.`);
                return;
              }

              const groupItemValue = value[index] || [];
              const {
                [field]: fun = () => ({
                  mapObj: {},
                  props: {},
                }),
              } = maps;

              const { mapObj = {}, props = {} } = fun(groupItemValue);

              IDRefMap[ID].props = props;

              ref.setFullValues(groupItemValue, mapObj);
            });
          });

          this.setState({});
        }

        verify = ({
          first = false, // todo
          scroll = true, // todo
        } = {}) => (
          Promise.resolve().then(async () => {
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

                for (const rule of rules) {
                  const isPass = await rule.fun(value);
                  if (!isPass) {
                    hasError = true;
                    const error = rule.error({ label, field });
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

            const subFormField = await mapObjectAsync(
              this.subForms,
              async (formName, subForm) => {
                const { ref, field } = subForm;
                const { data, hasError: subFormHasError } = await ref.verify();
                hasError = subFormHasError;
                return {
                  [field]: data,
                };
              },
            );

            return {
              hasError,
              data: {
                ...fragmentsField,
                ...groupField,
                ...subFormField,
              },
            };
          })

        )

        render() {
          const { catchRef = () => {}, ...others } = this.props;
          return (
            <Wrap
              ref={ catchRef }
              dinoForm={ {
                ...this.createDinoFormApi(),
                renderDinoForm: (props = {}) => (
                  <View
                    { ...props }
                    dinoForm={ {
                      ...this.createDinoFormApi(),
                      fragments: this.fragments,
                      groups: groupsAPI({
                        groups: this.groups,
                        render: this.topFormRender,
                        getID: () => this.ID,
                        setID: (ID) => { this.ID = ID; },
                      }),
                      subForms: subFormsAPI({ subForms: this.subForms }),
                    } }
                    />
                ),
              } }
              { ...others }
              />
          );
        }
      };
    };
  };
}

export default createForm;
