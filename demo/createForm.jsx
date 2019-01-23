import React, { Component } from 'react';
// import DinoForm from './components/DinoForm';
import DinoFormItem from './components/DinoFormItem';
import createDinoFormStore from './components/DinoFormStore';
import { mapObject, mapObjectAsync } from './util';

const createFragments = ({ fragments, createDinoFormApi }) => (
  mapObject(fragments, (comName, { Com, ...props } = {}) => ({
    [comName]: class Fragment extends Component {
      render() {
        return (
          <Com
            dinoForm={ createDinoFormApi() }
            { ...props }
            { ...(this.props || {}) }
            />
        );
      }
    },
  }))
);

const createFromItem = ({ createDinoFormApi }) => (
  class DinoFormItemWrap extends Component {
    render() {
      return (
        <DinoFormItem
          dinoForm={ createDinoFormApi() }
          { ...(this.props || {}) }
          />
      );
    }
  }
);

const createDinoFormWrap = ({ setIDRefMap, Com }) => (
  class DinoFormWrap extends Component {
    constructor(props) {
      super(props);
      this.Com = undefined;
    }

    componentDidMount() {
      const { ID, index } = this.props;
      setIDRefMap(ID, { ref: this.Com });
    }

    componentWillUnmount() {
      const { ID, index } = this.props;
      setIDRefMap(ID, { ref: undefined });
    }

    catchRef = (ref) => {
      const { ID, catchRef = () => {} } = this.props;
      this.Com = ref;
      catchRef(ref);
    }

    render() {
      const { ID, index } = this.props;
      return (
        <Com ref={ this.catchRef } />
      );
    }
  }
);


function createForm({
  fragments = {},
  groups = {},
} = {}) {
  return function create(View) {
    return function bindWrap(Wrap = ({ dinoForm: { renderDinoForm } }) => renderDinoForm()) {
      return class DinoForm extends Component {
        constructor(constructorProps) {
          super(constructorProps);

          this.store = createDinoFormStore();

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
            fragments: this.fragments,
            ID: this.ID,
            groups: this.groups,
          };
        }

        createGroups = groupsObj => mapObject(groupsObj, (formName, {
          Com, field, count, formProps = {},
        } = {}) => {
          const IDRefMap = {};
          const IDList = [...new Array(count)].map(() => this.ID++);
          const Form = createDinoFormWrap({
            setIDRefMap: (ID, value) => { this.groups[formName].IDRefMap[ID] = value; },
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

        createDinoFormApi = () => ({
          FromItem: this.FromItem,
          setFieldsValues: this.setFieldsValues,
          setFieldsError: this.setFieldsError,
          setFullFieldsTranslate: this.setFullFieldsTranslate,
          getFullValues: this.getFullValues,
          getFieldsValues: this.getFieldsValues,
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

          return {
            ...fragmentsField,
            ...groupField,
          };
        }

        setFullFieldsTranslate = async (values = {}, maps = {}) => {
          const findGroups = field => Object.values(this.groups).find(group => group.field === field);

          const render = () => new Promise(r => this.setState({}, () => r()));

          await mapObjectAsync(values, async (field, value) => {
            const group = findGroups(field);

            if (!group) {
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

              ref.setFullFieldsTranslate(groupItemValue, mapObj);
            });
          });

          this.setState({});
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
              dinoForm={ {
                ...this.createDinoFormApi(),
                renderDinoForm: (props = {}) => (
                  <View
                    dinoForm={ {
                      ...this.createDinoFormApi(),
                      fragments: this.fragments,
                      groups: this.groupsAPI(),
                    } }
                    { ...props }
                    />
                ),
              } }
              { ...(this.props || {}) }
              />
          );
        }
      };
    };
  };
}

export default createForm;
