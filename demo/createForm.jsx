import React, { Component } from 'react';
// import DinoForm from './components/DinoForm';
import DinoFormItem from './components/DinoFormItem';
import createDinoFormStore from './components/DinoFormStore';
import { mapObject, mapObjectAsync } from './util';

const createFragments = ({ fragments, createDinoFormApi }) => (
  mapObject(fragments, (comName, { Com, ...props } = {}) => ({
    [comName]: Object.assign(
      class Fragment extends Component {
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
      props,
    ),
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

const createDinoFormGroupWrap = ({ setIDRefMap, Com, topFormRender }) => (
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
        <Com
          ref={ this.catchRef }
          topFormRender={ topFormRender }
          subGroupForm
          />
      );
    }
  }
);

class WrapCom extends Component {
  render() {
    const { dinoForm: { renderDinoForm } } = this.props;
    return renderDinoForm();
  }
}

const prefix = className => `dino-form-${className}`;

function createForm({
  fragments = {},
  groups = {},
} = {}) {
  return function create(View) {
    return function bindWrap(Wrap = WrapCom) {
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

          this.topFormRender();
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

        addItem = ({ getGroup, render }) => {
          getGroup().IDList.push(this.ID++);
          render();
        }

        deleteItem = ({ ID: deleteID, getGroup, render }) => {
          const group = getGroup();
          group.IDList = group.IDList.filter(ID => ID !== deleteID);
          render();
        }

        moveItem = ({
          ID, offset, getGroup, render,
        }) => {
          const group = getGroup();
          const index = group.IDList.indexOf(ID);
          group.IDList.splice(index, 1);
          if (offset === -Infinity) {
            group.IDList.splice(0, 0, ID);
          } else if (offset === Infinity) {
            group.IDList.splice(0, group.IDList.length - 1, ID);
          } else {
            group.IDList.splice(index + offset, 0, ID);
          }
          render();
        }

        mapGroup = ({
          Form: {
            FormCom,
            formProps,
          },
          IDList,
          index,
          deleteIt,
          moveIt,
        }) => ([
          <FormCom { ...formProps } />,
          <div className={ prefix('group-actions') }>
            <div className={ prefix('group-action-delete') } onClick={ deleteIt } />
            {
                index !== 0
                && (
                  <div
                    className={ prefix('group-action-move-up') }
                    onClick={ () => moveIt(-1) }
                    />
                )
              }
            {
                index !== IDList.length - 1
                && (
                  <div
                    className={ prefix('group-action-move-down') }
                    onClick={ () => moveIt(1) }
                    />
                )
              }
          </div>,
        ])

        groupsAPI = () => mapObject(this.groups, (formName, groupValue) => {
          const {
            Com,
            field,
            IDRefMap,
            IDList,
            Form,
            formProps = {},
          } = groupValue;

          const addItem = (
            add = this.addItem,
          ) => add({
            getGroup: () => groupValue,
            render: this.topFormRender,
          });

          const deleteItem = (
            ID,
            deleteItemFun = this.deleteItem,
          ) => deleteItemFun({
            ID,
            getGroup: () => groupValue,
            render: this.topFormRender,
          });

          const moveItem = (
            ID,
            offset,
            move = this.moveItem,
          ) => move({
            ID,
            offset,
            getGroup: () => groupValue,
            render: this.topFormRender,
          });

          const doAction = fun => fun({
            getGroup: () => groupValue,
            render: this.topFormRender,
          });

          const group = {
            map: (mapGroup = this.mapGroup) => IDList.map((ID, index) => (
              <div
                key={ ID }
                className={ `${prefix('group-item-wrap')}` }>
                {
                  mapGroup({
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
                    deleteIt: () => deleteItem(ID),
                    moveIt: offset => moveItem(ID, offset),
                    formProps,
                  })
                }
              </div>
            )),
            render: (
              renderGroup = ele => (
                <div className={ `${prefix('group')}` }>
                  <div className={ `${prefix('group-ele')}` }>
                    {ele}
                  </div>
                  <div
                    className={ prefix('group-action-add') }
                    onClick={ () => addItem() }
                    />
                </div>
              ),
              children = group.map(),
            ) => (
              <div className={ `${prefix('group-wrap')}` }>
                {renderGroup(children)}
              </div>
            ),
            addItem,
            deleteItem,
            moveItem,
            doAction,
          };

          return { [formName]: group };
        })

        render() {
          const { catchRef = () => {}, ...others } = this.props;
          return (
            <Wrap
              catchRef={ catchRef }
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
              { ...others }
              />
          );
        }
      };
    };
  };
}

export default createForm;
