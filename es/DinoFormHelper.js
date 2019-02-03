import _objectSpread from "@babel/runtime-corejs2/helpers/esm/objectSpread";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _Object$assign from "@babel/runtime-corejs2/core-js/object/assign";
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties";
import React, { Component } from 'react';
import { prefix, mapObject } from './util';
import DinoFormItem from './DinoFormItem';
export const createFragments = (_ref) => {
  let fragments = _ref.fragments,
      createDinoFormApi = _ref.createDinoFormApi;
  return mapObject(fragments, function (comName) {
    let _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        Com = _ref2.Com,
        props = _objectWithoutProperties(_ref2, ["Com"]);

    return {
      [comName]: _Object$assign(class Fragment extends Component {
        render() {
          return React.createElement(Com, _extends({
            dinoForm: createDinoFormApi()
          }, props, this.props || {}));
        }

      }, props)
    };
  });
};
export const createFromItem = (_ref3) => {
  let createDinoFormApi = _ref3.createDinoFormApi;
  return class DinoFormItemWrap extends Component {
    render() {
      return React.createElement(DinoFormItem, _extends({
        dinoForm: createDinoFormApi()
      }, this.props || {}));
    }

  };
};
export const createDinoFormGroupWrap = (_ref4) => {
  var _temp;

  let setIDRefMap = _ref4.setIDRefMap,
      Com = _ref4.Com,
      topFormRender = _ref4.topFormRender;
  return _temp = class DinoFormWrap extends Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "catchRef", ref => {
        const _this$props = this.props,
              ID = _this$props.ID,
              _this$props$catchRef = _this$props.catchRef,
              catchRef = _this$props$catchRef === void 0 ? () => {} : _this$props$catchRef;
        this.Com = ref;
        catchRef(ref);
      });

      this.Com = undefined;
    }

    componentDidMount() {
      const _this$props2 = this.props,
            ID = _this$props2.ID,
            index = _this$props2.index;
      setIDRefMap(ID, {
        ref: this.Com
      });
    }

    componentWillUnmount() {
      const _this$props3 = this.props,
            ID = _this$props3.ID,
            index = _this$props3.index;
      setIDRefMap(ID, {
        ref: undefined
      });
    }

    render() {
      const _this$props4 = this.props,
            ID = _this$props4.ID,
            index = _this$props4.index;
      return React.createElement(Com, {
        ref: this.catchRef,
        topFormRender: topFormRender,
        subGroupForm: true
      });
    }

  }, _temp;
};
export const createDinoFormSubForm = subForms => mapObject(subForms, (formName, form) => {
  const Form = form.Form,
        field = form.field,
        _form$formProps = form.formProps,
        formProps = _form$formProps === void 0 ? {} : _form$formProps;
  const subForm = {
    field,
    formProps,
    ref: undefined,
    Form: class DinoSubForm extends Component {
      render() {
        return React.createElement(Form, _extends({}, formProps, this.props, {
          ref: _ref5 => {
            subForm.ref = _ref5;
          }
        }));
      }

    }
  };
  return {
    [formName]: subForm
  };
});
export const dinoFormAddItem = (_ref6) => {
  let getGroup = _ref6.getGroup,
      setID = _ref6.setID,
      getID = _ref6.getID,
      render = _ref6.render;
  const ID = getID();
  getGroup().IDList.push(ID);
  setID(ID + 1);
  render();
  return ID;
};
export const dinoFormDeleteItem = (_ref7) => {
  let deleteID = _ref7.ID,
      getGroup = _ref7.getGroup,
      render = _ref7.render;
  const group = getGroup();
  group.IDList = group.IDList.filter(ID => ID !== deleteID);
  render();
};
export const dinoFormMoveItem = (_ref8) => {
  let ID = _ref8.ID,
      offset = _ref8.offset,
      getGroup = _ref8.getGroup,
      render = _ref8.render;
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
export const dinoFormMapGroup = (_ref9) => {
  let _ref9$Form = _ref9.Form,
      FormCom = _ref9$Form.FormCom,
      formProps = _ref9$Form.formProps,
      ID = _ref9.ID,
      IDList = _ref9.IDList,
      index = _ref9.index,
      deleteIt = _ref9.deleteIt,
      moveIt = _ref9.moveIt;
  return [React.createElement(FormCom, _extends({}, formProps, {
    key: ID
  })), React.createElement("div", {
    className: prefix('group-actions'),
    key: "group-actions"
  }, React.createElement("div", {
    className: prefix('group-action-delete'),
    onClick: deleteIt
  }), index !== 0 && React.createElement("div", {
    className: prefix('group-action-move-up'),
    onClick: () => moveIt(-1)
  }), index !== IDList.length - 1 && React.createElement("div", {
    className: prefix('group-action-move-down'),
    onClick: () => moveIt(1)
  }), index !== 0 && React.createElement("div", {
    className: prefix('group-action-move-to-first'),
    onClick: () => moveIt(-Infinity)
  }), index !== IDList.length - 1 && React.createElement("div", {
    className: prefix('group-action-move-to-last'),
    onClick: () => moveIt(Infinity)
  }))];
};
export const groupsAPI = (_ref10) => {
  let groups = _ref10.groups,
      render = _ref10.render,
      setID = _ref10.setID,
      getID = _ref10.getID;
  return mapObject(groups, (formName, groupValue) => {
    const Com = groupValue.Com,
          field = groupValue.field,
          IDRefMap = groupValue.IDRefMap,
          IDList = groupValue.IDList,
          Form = groupValue.Form,
          _groupValue$formProps = groupValue.formProps,
          formProps = _groupValue$formProps === void 0 ? {} : _groupValue$formProps;

    const addItem = function addItem() {
      let add = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dinoFormAddItem;
      return add({
        getGroup: () => groupValue,
        setID,
        getID,
        render
      });
    };

    const deleteItem = function deleteItem(ID) {
      let deleteItemFun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dinoFormDeleteItem;
      return deleteItemFun({
        ID,
        getGroup: () => groupValue,
        setID,
        getID,
        render
      });
    };

    const moveItem = function moveItem(ID, offset) {
      let move = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dinoFormMoveItem;
      return move({
        ID,
        offset,
        getGroup: () => groupValue,
        setID,
        getID,
        render
      });
    };

    const doAction = fun => fun({
      getGroup: () => groupValue,
      setID,
      getID,
      render
    });

    const group = {
      IDList,
      map: function map() {
        let mapGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dinoFormMapGroup;
        return IDList.map((ID, index) => React.createElement("div", {
          key: ID,
          className: `${prefix('group-item-wrap')}`
        }, mapGroup({
          ID,
          index,
          Com,
          field,
          IDRefMap,
          IDList,
          Form: {
            FormCom: Form,
            formProps: _objectSpread({}, formProps, (groups[formName].IDRefMap[ID] || {}).props || {}, {
              ID
            })
          },
          deleteIt: () => deleteItem(ID),
          moveIt: offset => moveItem(ID, offset),
          formProps
        })));
      },
      render: function render() {
        let renderGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ele => React.createElement("div", {
          className: `${prefix('group')}`
        }, React.createElement("div", {
          className: `${prefix('group-ele')}`
        }, ele), React.createElement("div", {
          className: prefix('group-action-add'),
          onClick: () => addItem()
        }));
        let children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : group.map();
        return React.createElement("div", {
          className: `${prefix('group-wrap')}`
        }, renderGroup(children));
      },
      addItem,
      deleteItem,
      moveItem,
      doAction
    };
    return {
      [formName]: group
    };
  });
};
export const subFormsAPI = function subFormsAPI() {
  let _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      subForms = _ref11.subForms;

  return mapObject(subForms, (formName, _ref12) => {
    let Form = _ref12.Form;
    return {
      [formName]: Form
    };
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUhlbHBlci5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJwcmVmaXgiLCJtYXBPYmplY3QiLCJEaW5vRm9ybUl0ZW0iLCJjcmVhdGVGcmFnbWVudHMiLCJmcmFnbWVudHMiLCJjcmVhdGVEaW5vRm9ybUFwaSIsImNvbU5hbWUiLCJDb20iLCJwcm9wcyIsIkZyYWdtZW50IiwicmVuZGVyIiwiY3JlYXRlRnJvbUl0ZW0iLCJEaW5vRm9ybUl0ZW1XcmFwIiwiY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAiLCJzZXRJRFJlZk1hcCIsInRvcEZvcm1SZW5kZXIiLCJEaW5vRm9ybVdyYXAiLCJjb25zdHJ1Y3RvciIsInJlZiIsIklEIiwiY2F0Y2hSZWYiLCJ1bmRlZmluZWQiLCJjb21wb25lbnREaWRNb3VudCIsImluZGV4IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJjcmVhdGVEaW5vRm9ybVN1YkZvcm0iLCJzdWJGb3JtcyIsImZvcm1OYW1lIiwiZm9ybSIsIkZvcm0iLCJmaWVsZCIsImZvcm1Qcm9wcyIsInN1YkZvcm0iLCJEaW5vU3ViRm9ybSIsImRpbm9Gb3JtQWRkSXRlbSIsImdldEdyb3VwIiwic2V0SUQiLCJnZXRJRCIsIklETGlzdCIsInB1c2giLCJkaW5vRm9ybURlbGV0ZUl0ZW0iLCJkZWxldGVJRCIsImdyb3VwIiwiZmlsdGVyIiwiZGlub0Zvcm1Nb3ZlSXRlbSIsIm9mZnNldCIsImluZGV4T2YiLCJzcGxpY2UiLCJJbmZpbml0eSIsImxlbmd0aCIsImRpbm9Gb3JtTWFwR3JvdXAiLCJGb3JtQ29tIiwiZGVsZXRlSXQiLCJtb3ZlSXQiLCJncm91cHNBUEkiLCJncm91cHMiLCJncm91cFZhbHVlIiwiSURSZWZNYXAiLCJhZGRJdGVtIiwiYWRkIiwiZGVsZXRlSXRlbSIsImRlbGV0ZUl0ZW1GdW4iLCJtb3ZlSXRlbSIsIm1vdmUiLCJkb0FjdGlvbiIsImZ1biIsIm1hcCIsIm1hcEdyb3VwIiwicmVuZGVyR3Jv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QXhDLFdBQ0dxRSxHQURILENBREYsRUFJRTtBQUNFLFVBQUEsU0FBUyxFQUFHckUsTUFBTSxDQUFDLGtCQUFELENBRHBCO0FBRUUsVUFBQSxPQUFPLEVBQUcsTUFBTTBELE9BQU87QUFGekIsVUFKRixDQUZJO0FBQUEsWUFZTlksUUFaTSx1RUFZSzVCLEtBQUssQ0FBQ3dCLEdBQU4sRUFaTDtBQUFBLGVBY047QUFBSyxVQUFBLFNBQVMsRUFBSSxHQUFFbEUsTUFBTSxDQUFDLFlBQUQsQ0FBZTtBQUF6QyxXQUNHb0UsV0FBVyxDQUFDRSxRQUFELENBRGQsQ0FkTTtBQUFBLE9BN0JJO0FBK0NaWixNQUFBQSxPQS9DWTtBQWdEWkUsTUFBQUEsVUFoRFk7QUFpRFpFLE1BQUFBLFFBakRZO0FBa0RaRSxNQUFBQTtBQWxEWSxLQUFkO0FBcURBLFdBQU87QUFBRSxPQUFDckMsUUFBRCxHQUFZZTtBQUFkLEtBQVA7QUFDRCxHQXhHYyxDQUxVO0FBQUEsQ0FBbEI7QUErR1AsT0FBTyxNQUFNNkIsV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxtRkFBZ0IsRUFBaEI7QUFBQSxNQUFHN0MsUUFBSCxVQUFHQSxRQUFIOztBQUFBLFNBQXVCekIsU0FBUyxDQUFDeUIsUUFBRCxFQUFXLENBQUNDLFFBQUQ7QUFBQSxRQUFhRSxJQUFiLFVBQWFBLElBQWI7QUFBQSxXQUF5QjtBQUM3RixPQUFDRixRQUFELEdBQVlFO0FBRGlGLEtBQXpCO0FBQUEsR0FBWCxDQUFoQztBQUFBLENBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHByZWZpeCwgbWFwT2JqZWN0IH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBEaW5vRm9ybUl0ZW0gZnJvbSAnLi9EaW5vRm9ybUl0ZW0nO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRnJhZ21lbnRzID0gKHsgZnJhZ21lbnRzLCBjcmVhdGVEaW5vRm9ybUFwaSB9KSA9PiAoXG4gIG1hcE9iamVjdChmcmFnbWVudHMsIChjb21OYW1lLCB7IENvbSwgLi4ucHJvcHMgfSA9IHt9KSA9PiAoe1xuICAgIFtjb21OYW1lXTogT2JqZWN0LmFzc2lnbihcbiAgICAgIGNsYXNzIEZyYWdtZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q29tXG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsgY3JlYXRlRGlub0Zvcm1BcGkoKSB9XG4gICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICB7IC4uLih0aGlzLnByb3BzIHx8IHt9KSB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb3BzLFxuICAgICksXG4gIH0pKVxuKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUZyb21JdGVtID0gKHsgY3JlYXRlRGlub0Zvcm1BcGkgfSkgPT4gKFxuICBjbGFzcyBEaW5vRm9ybUl0ZW1XcmFwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RGlub0Zvcm1JdGVtXG4gICAgICAgICAgZGlub0Zvcm09eyBjcmVhdGVEaW5vRm9ybUFwaSgpIH1cbiAgICAgICAgICB7IC4uLih0aGlzLnByb3BzIHx8IHt9KSB9XG4gICAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG4pO1xuXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCA9ICh7IHNldElEUmVmTWFwLCBDb20sIHRvcEZvcm1SZW5kZXIgfSkgPT4gKFxuICBjbGFzcyBEaW5vRm9ybVdyYXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICB0aGlzLkNvbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgc2V0SURSZWZNYXAoSUQsIHsgcmVmOiB0aGlzLkNvbSB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgc2V0SURSZWZNYXAoSUQsIHsgcmVmOiB1bmRlZmluZWQgfSk7XG4gICAgfVxuXG4gICAgY2F0Y2hSZWYgPSAocmVmKSA9PiB7XG4gICAgICBjb25zdCB7IElELCBjYXRjaFJlZiA9ICgpID0+IHt9IH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5Db20gPSByZWY7XG4gICAgICBjYXRjaFJlZihyZWYpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbVxuICAgICAgICAgIHJlZj17IHRoaXMuY2F0Y2hSZWYgfVxuICAgICAgICAgIHRvcEZvcm1SZW5kZXI9eyB0b3BGb3JtUmVuZGVyIH1cbiAgICAgICAgICBzdWJHcm91cEZvcm1cbiAgICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEaW5vRm9ybVN1YkZvcm0gPSBzdWJGb3JtcyA9PiAoXG4gIG1hcE9iamVjdChzdWJGb3JtcywgKGZvcm1OYW1lLCBmb3JtKSA9PiB7XG4gICAgY29uc3QgeyBGb3JtLCBmaWVsZCwgZm9ybVByb3BzID0ge30gfSA9IGZvcm07XG4gICAgY29uc3Qgc3ViRm9ybSA9IHtcbiAgICAgIGZpZWxkLFxuICAgICAgZm9ybVByb3BzLFxuICAgICAgcmVmOiB1bmRlZmluZWQsXG4gICAgICBGb3JtOiBjbGFzcyBEaW5vU3ViRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1cbiAgICAgICAgICAgICAgeyAuLi5mb3JtUHJvcHMgfVxuICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgICByZWY9eyAocmVmKSA9PiB7IHN1YkZvcm0ucmVmID0gcmVmOyB9IH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIFtmb3JtTmFtZV06IHN1YkZvcm0sXG4gICAgfTtcbiAgfSlcbik7XG5cblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtQWRkSXRlbSA9ICh7XG4gIGdldEdyb3VwLFxuICBzZXRJRCxcbiAgZ2V0SUQsXG4gIHJlbmRlcixcbn0pID0+IHtcbiAgY29uc3QgSUQgPSBnZXRJRCgpO1xuICBnZXRHcm91cCgpLklETGlzdC5wdXNoKElEKTtcbiAgc2V0SUQoSUQgKyAxKTtcbiAgcmVuZGVyKCk7XG4gIHJldHVybiBJRDtcbn07XG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybURlbGV0ZUl0ZW0gPSAoeyBJRDogZGVsZXRlSUQsIGdldEdyb3VwLCByZW5kZXIgfSkgPT4ge1xuICBjb25zdCBncm91cCA9IGdldEdyb3VwKCk7XG4gIGdyb3VwLklETGlzdCA9IGdyb3VwLklETGlzdC5maWx0ZXIoSUQgPT4gSUQgIT09IGRlbGV0ZUlEKTtcbiAgcmVuZGVyKCk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlub0Zvcm1Nb3ZlSXRlbSA9ICh7XG4gIElELCBvZmZzZXQsIGdldEdyb3VwLCByZW5kZXIsXG59KSA9PiB7XG4gIGNvbnN0IGdyb3VwID0gZ2V0R3JvdXAoKTtcbiAgY29uc3QgaW5kZXggPSBncm91cC5JRExpc3QuaW5kZXhPZihJRCk7XG4gIGdyb3VwLklETGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICBpZiAob2Zmc2V0ID09PSAtSW5maW5pdHkpIHtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKDAsIDAsIElEKTtcbiAgfSBlbHNlIGlmIChvZmZzZXQgPT09IEluZmluaXR5KSB7XG4gICAgZ3JvdXAuSURMaXN0LnNwbGljZShncm91cC5JRExpc3QubGVuZ3RoLCAwLCBJRCk7XG4gIH0gZWxzZSB7XG4gICAgZ3JvdXAuSURMaXN0LnNwbGljZShpbmRleCArIG9mZnNldCwgMCwgSUQpO1xuICB9XG4gIHJlbmRlcigpO1xufTtcblxuXG5leHBvcnQgY29uc3QgZGlub0Zvcm1NYXBHcm91cCA9ICh7XG4gIEZvcm06IHtcbiAgICBGb3JtQ29tLFxuICAgIGZvcm1Qcm9wcyxcbiAgfSxcbiAgSUQsXG4gIElETGlzdCxcbiAgaW5kZXgsXG4gIGRlbGV0ZUl0LFxuICBtb3ZlSXQsXG59KSA9PiAoW1xuICA8Rm9ybUNvbSB7IC4uLmZvcm1Qcm9wcyB9IGtleT17IElEIH0gLz4sXG4gIDxkaXYgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb25zJykgfSBrZXk9XCJncm91cC1hY3Rpb25zXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1kZWxldGUnKSB9IG9uQ2xpY2s9eyBkZWxldGVJdCB9IC8+XG4gICAge1xuICAgICAgaW5kZXggIT09IDBcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtdXAnKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdCgtMSkgfVxuICAgICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIHtcbiAgICAgIGluZGV4ICE9PSBJRExpc3QubGVuZ3RoIC0gMVxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS1kb3duJykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoMSkgfVxuICAgICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIHtcbiAgICAgIGluZGV4ICE9PSAwXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLXRvLWZpcnN0JykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoLUluZmluaXR5KSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAge1xuICAgICAgaW5kZXggIT09IElETGlzdC5sZW5ndGggLSAxXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLXRvLWxhc3QnKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdChJbmZpbml0eSkgfVxuICAgICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICA8L2Rpdj4sXG5dKTtcblxuZXhwb3J0IGNvbnN0IGdyb3Vwc0FQSSA9ICh7XG4gIGdyb3VwcyxcbiAgcmVuZGVyLFxuICBzZXRJRCxcbiAgZ2V0SUQsXG59KSA9PiBtYXBPYmplY3QoZ3JvdXBzLCAoZm9ybU5hbWUsIGdyb3VwVmFsdWUpID0+IHtcbiAgY29uc3Qge1xuICAgIENvbSxcbiAgICBmaWVsZCxcbiAgICBJRFJlZk1hcCxcbiAgICBJRExpc3QsXG4gICAgRm9ybSxcbiAgICBmb3JtUHJvcHMgPSB7fSxcbiAgfSA9IGdyb3VwVmFsdWU7XG5cbiAgY29uc3QgYWRkSXRlbSA9IChcbiAgICBhZGQgPSBkaW5vRm9ybUFkZEl0ZW0sXG4gICkgPT4gYWRkKHtcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IGRlbGV0ZUl0ZW0gPSAoXG4gICAgSUQsXG4gICAgZGVsZXRlSXRlbUZ1biA9IGRpbm9Gb3JtRGVsZXRlSXRlbSxcbiAgKSA9PiBkZWxldGVJdGVtRnVuKHtcbiAgICBJRCxcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IG1vdmVJdGVtID0gKFxuICAgIElELFxuICAgIG9mZnNldCxcbiAgICBtb3ZlID0gZGlub0Zvcm1Nb3ZlSXRlbSxcbiAgKSA9PiBtb3ZlKHtcbiAgICBJRCxcbiAgICBvZmZzZXQsXG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBkb0FjdGlvbiA9IGZ1biA9PiBmdW4oe1xuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgZ3JvdXAgPSB7XG4gICAgSURMaXN0LFxuICAgIG1hcDogKG1hcEdyb3VwID0gZGlub0Zvcm1NYXBHcm91cCkgPT4gSURMaXN0Lm1hcCgoSUQsIGluZGV4KSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGtleT17IElEIH1cbiAgICAgICAgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1pdGVtLXdyYXAnKX1gIH0+XG4gICAgICAgIHtcbiAgICAgICAgICBtYXBHcm91cCh7XG4gICAgICAgICAgICBJRCxcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICBJRFJlZk1hcCxcbiAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgIEZvcm06IHtcbiAgICAgICAgICAgICAgRm9ybUNvbTogRm9ybSxcbiAgICAgICAgICAgICAgZm9ybVByb3BzOiB7XG4gICAgICAgICAgICAgICAgLi4uZm9ybVByb3BzLFxuICAgICAgICAgICAgICAgIC4uLigoZ3JvdXBzW2Zvcm1OYW1lXS5JRFJlZk1hcFtJRF0gfHwge30pLnByb3BzIHx8IHt9KSxcbiAgICAgICAgICAgICAgICBJRCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWxldGVJdDogKCkgPT4gZGVsZXRlSXRlbShJRCksXG4gICAgICAgICAgICBtb3ZlSXQ6IG9mZnNldCA9PiBtb3ZlSXRlbShJRCwgb2Zmc2V0KSxcbiAgICAgICAgICAgIGZvcm1Qcm9wcyxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApKSxcbiAgICByZW5kZXI6IChcbiAgICAgIHJlbmRlckdyb3VwID0gZWxlID0+IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwJyl9YCB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1lbGUnKX1gIH0+XG4gICAgICAgICAgICB7ZWxlfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLWFkZCcpIH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBhZGRJdGVtKCkgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApLFxuICAgICAgY2hpbGRyZW4gPSBncm91cC5tYXAoKSxcbiAgICApID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC13cmFwJyl9YCB9PlxuICAgICAgICB7cmVuZGVyR3JvdXAoY2hpbGRyZW4pfVxuICAgICAgPC9kaXY+XG4gICAgKSxcbiAgICBhZGRJdGVtLFxuICAgIGRlbGV0ZUl0ZW0sXG4gICAgbW92ZUl0ZW0sXG4gICAgZG9BY3Rpb24sXG4gIH07XG5cbiAgcmV0dXJuIHsgW2Zvcm1OYW1lXTogZ3JvdXAgfTtcbn0pO1xuXG5leHBvcnQgY29uc3Qgc3ViRm9ybXNBUEkgPSAoeyBzdWJGb3JtcyB9ID0ge30pID0+IG1hcE9iamVjdChzdWJGb3JtcywgKGZvcm1OYW1lLCB7IEZvcm0gfSkgPT4gKHtcbiAgW2Zvcm1OYW1lXTogRm9ybSxcbn0pKTtcbiJdfQ==