import React, { Component } from 'react';
import { prefix, mapObject } from './util';
import DinoFormItem from './DinoFormItem';

export const createFragments = ({ fragments, createDinoFormApi }) => (
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

export const createFromItem = ({ createDinoFormApi }) => (
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


export const createDinoFormGroupWrap = ({ setIDRefMap, Com, topFormRender }) => (
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

export const createDinoFormSubForm = subForms => (
  mapObject(subForms, (formName, form) => {
    const { Form, field, formProps = {} } = form;
    const subForm = {
      field,
      formProps,
      ref: undefined,
      Form: class DinoSubForm extends Component {
        render() {
          return (
            <Form
              { ...formProps }
              { ...this.props }
              ref={ (ref) => { subForm.ref = ref; } }
              />
          );
        }
      },
    };
    return {
      [formName]: subForm,
    };
  })
);


export const dinoFormAddItem = ({
  getGroup,
  setID,
  getID,
  render,
}) => {
  const ID = getID();
  getGroup().IDList.push(ID);
  setID(ID + 1);
  render();
  return ID;
};

export const dinoFormDeleteItem = ({ ID: deleteID, getGroup, render }) => {
  const group = getGroup();
  group.IDList = group.IDList.filter(ID => ID !== deleteID);
  render();
};

export const dinoFormMoveItem = ({
  ID, offset, getGroup, render,
}) => {
  const group = getGroup();
  const index = group.IDList.indexOf(ID);
  group.IDList.splice(index, 1);
  if (offset === -Infinity) {
    group.IDList.splice(0, 0, ID);
  } else if (offset === Infinity) {
    group.IDList.splice(group.IDList.length, 0, ID);
  } else {
    group.IDList.splice(index + offset, 0, ID);
  }
  render();
};


export const dinoFormMapGroup = ({
  Form: {
    FormCom,
    formProps,
  },
  ID,
  IDList,
  index,
  deleteIt,
  moveIt,
}) => ([
  <FormCom { ...formProps } key={ ID } />,
  <div className={ prefix('group-actions') } key="group-actions">
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
    {
      index !== 0
      && (
        <div
          className={ prefix('group-action-move-to-first') }
          onClick={ () => moveIt(-Infinity) }
          />
      )
    }
    {
      index !== IDList.length - 1
      && (
        <div
          className={ prefix('group-action-move-to-last') }
          onClick={ () => moveIt(Infinity) }
          />
      )
    }
  </div>,
]);

export const groupsAPI = ({
  groups,
  render,
  setID,
  getID,
}) => mapObject(groups, (formName, groupValue) => {
  const {
    Com,
    field,
    IDRefMap,
    IDList,
    Form,
    formProps = {},
  } = groupValue;

  const addItem = (
    add = dinoFormAddItem,
  ) => add({
    getGroup: () => groupValue,
    setID,
    getID,
    render,
  });

  const deleteItem = (
    ID,
    deleteItemFun = dinoFormDeleteItem,
  ) => deleteItemFun({
    ID,
    getGroup: () => groupValue,
    setID,
    getID,
    render,
  });

  const moveItem = (
    ID,
    offset,
    move = dinoFormMoveItem,
  ) => move({
    ID,
    offset,
    getGroup: () => groupValue,
    setID,
    getID,
    render,
  });

  const doAction = fun => fun({
    getGroup: () => groupValue,
    setID,
    getID,
    render,
  });

  const group = {
    IDList,
    map: (mapGroup = dinoFormMapGroup) => IDList.map((ID, index) => (
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
                ...((groups[formName].IDRefMap[ID] || {}).props || {}),
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
});

export const subFormsAPI = ({ subForms } = {}) => mapObject(subForms, (formName, { Form }) => ({
  [formName]: Form,
}));
