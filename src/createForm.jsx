import React, { Component } from 'react';
import createDinoFormStore from './DinoFormStore';
import {
  createFromItem,
  createDinoFormSubForm,
  createDinoFormGroupWrap,
  createFragments,
  groupsAPI,
  subFormsAPI,
  getRef,
} from './DinoFormHelper';

import {
  sleep, mapObject, mapObjectAsync, isProduction,
} from './util';

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
  getGroupRef = getRef,
} = {}) {
  return function create(View) {
    return function bindWrap(Wrap = WrapCom) {
      return class DinoForm extends Component {
        constructor(constructorProps) {
          super(constructorProps);

          this.store = createDinoFormStore();
          // this.subForms = createDinoFormSubForm(subForms, this.topFormRender);
          this.subForms = createDinoFormSubForm({ subForms, topFormRender: this.topFormRender });

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
          Com,
          field,
          count,
          formProps = {},
          needDrag = false,
          clearMotions,
          pressedMotions,
          notPressedMotions,
          createStyle,
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
            needDrag,
            IDRefMap,
            IDList,
            Form,
            clearMotions,
            pressedMotions,
            notPressedMotions,
            createStyle,
          };

          return ({
            [formName]: group,
          });
        })

        topFormRender = () => new Promise((r) => {
          if (this.props.topFormRender) {
            return this.props.topFormRender().then(r);
          }
          return this.setState({}, r);
        })

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

        getFullValues = ({ onlyGetMount = true, debug = false } = {}) => {
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
                if (!IDRefMap[ID].ref) {
                  isProduction(() => {
                    if (debug) {
                      console.warn(`[dino-form] group from ref not registered, field = ${field}, ID=${ID}`);
                    }
                  });
                  continue;
                }
                const result = IDRefMap[ID].ref.getFullValues({ onlyGetMount });
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

              if (!ref) {
                isProduction(() => {
                  if (debug) {
                    console.warn(`[dino-form] subForm ref not registered, field = ${field}`);
                  }
                });
                return {
                  [field]: {},
                };
              }

              return {
                [field]: ref.getFullValues({ onlyGetMount }),
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

          const render = () => new Promise(r => this.setState({}, r));

          await mapObject(values, async (field, value) => {
            const group = findGroups(field);
            const subForm = findSubForms(field);

            if (subForm) {
              const { [field]: subFormMapObj } = maps;
              const { ref } = subForm;

              if (!ref) {
                console.warn(`[dino-form] field is '${field}' subForm should be mounted but the Ref is not registered, maybe you not render this subForm.`);
                return;
              }

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
            // await render();
            await render();
            // await this.topFormRender();

            // group should mounted
            const { IDRefMap, IDList, formName } = group;

            await mapObjectAsync(IDList, async (index, ID) => {
              const ref = await getGroupRef(() => {
                const {
                  [ID]: {
                    ref: groupFormRef,
                  } = {},
                } = IDRefMap;
                return groupFormRef;
              });

              if (!ref) {
                console.warn(`[dino-form] form '${formName}' should be mounted but the Ref is not registered, maybe you not render this group.`);
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
            }, IDList);
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
                  if (!IDRefMap[ID].ref) {
                    console.warn(`[dino-form] group from ref not registered, field = ${field}, ID=${ID}`);
                    continue;
                  }
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

                if (!ref) {
                  console.warn(`[dino-form] subFrom ref not registered, field = ${field}.`);
                  return { [field]: {} };
                }

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
