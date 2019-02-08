import React, { Component } from 'react';
import { prefix, mapObject } from './util';
import DinoFormItem from './DinoFormItem';
import Drag from './Drag';

export const dinoFormGetGroupRef = async ({ group, index, ID, render } = {}) => {
  const { IDRefMap, IDList, formName } = group;

  let {
    [ID]: {
      ref,
    } = {},
  } = IDRefMap;
  // const
  let { reTryRefCount } = 3;

  while (!ref && reTryRefCount-- > 0) {
    await render();
    ({
      [ID]: {
        ref,
      } = {},
    } = IDRefMap);
  }

  return ref;
};

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


export const createDinoFormGroupWrap = ({
  setIDRefMap, Com, topFormRender,
}) => (
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
          ID={ ID }
          index={ index }
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
  group.lastActionMoveID = ID;

  if (offset === -Infinity) {
    group.lastMoveID = group.IDList[0];
    group.IDList.splice(index, 1);
    group.IDList.splice(0, 0, ID);
  } else if (offset === Infinity) {
    group.lastMoveID = group.IDList[group.IDList.length - 1];
    group.IDList.splice(index, 1);
    group.IDList.splice(group.IDList.length, 0, ID);
  } else {
    group.lastMoveID = group.IDList[index + offset];
    group.IDList.splice(index, 1);
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
    needDrag,
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

  const mapFun = (mapGroup, ID, index) => (
    mapGroup({
      ID,
      index: +index,
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
  );

  const group = {
    IDList,
    dragMap: (mapGroup = dinoFormMapGroup) => (
      IDList.length > 0
        ? (
          <Drag
            order={ [...IDList] }
            lastActionMoveID={ groupValue.lastActionMoveID }
            lastMoveID={ groupValue.lastMoveID }
            changeDone={ (newIDList) => {
              groupValue.IDList = [...newIDList]; render();
            } }>
            {
          mapObject(IDList, (index, ID) => ({ [ID]: mapFun(mapGroup, ID, index) }))
        }
          </Drag>
        ) : null
    ),
    map: (mapGroup = dinoFormMapGroup) => (
      IDList.length > 0
        ? (
          <div className={ `${prefix('map-container')}` }>
            {
          IDList.map((ID, index) => (
            <div className={ `${prefix('group-item-wrap')}` } key={ ID }>
              { mapFun(mapGroup, ID, index)}
            </div>
          ))
        }
          </div>
        ) : null
    ),
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
      // children = (needDrap ? group.dragMap() : group.map()),
      children = (needDrag ? group.dragMap() : group.map()),
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
