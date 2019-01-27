"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subFormsAPI = exports.groupsAPI = exports.dinoFormMapGroup = exports.dinoFormMoveItem = exports.dinoFormDeleteItem = exports.dinoFormAddItem = exports.createDinoFormSubForm = exports.createDinoFormGroupWrap = exports.createFromItem = exports.createFragments = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _util = require("./util");

var _DinoFormItem = _interopRequireDefault(require("./DinoFormItem.jsx"));

const createFragments = (_ref) => {
  let fragments = _ref.fragments,
      createDinoFormApi = _ref.createDinoFormApi;
  return (0, _util.mapObject)(fragments, function (comName) {
    let _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        Com = _ref2.Com,
        props = (0, _objectWithoutProperties2.default)(_ref2, ["Com"]);

    return {
      [comName]: (0, _assign.default)(class Fragment extends _react.Component {
        render() {
          return _react.default.createElement(Com, (0, _extends2.default)({
            dinoForm: createDinoFormApi()
          }, props, this.props || {}));
        }

      }, props)
    };
  });
};

exports.createFragments = createFragments;

const createFromItem = (_ref3) => {
  let createDinoFormApi = _ref3.createDinoFormApi;
  return class DinoFormItemWrap extends _react.Component {
    render() {
      return _react.default.createElement(_DinoFormItem.default, (0, _extends2.default)({
        dinoForm: createDinoFormApi()
      }, this.props || {}));
    }

  };
};

exports.createFromItem = createFromItem;

const createDinoFormGroupWrap = (_ref4) => {
  var _temp;

  let setIDRefMap = _ref4.setIDRefMap,
      Com = _ref4.Com,
      topFormRender = _ref4.topFormRender;
  return _temp = class DinoFormWrap extends _react.Component {
    constructor(props) {
      super(props);
      (0, _defineProperty2.default)(this, "catchRef", ref => {
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
      return _react.default.createElement(Com, {
        ref: this.catchRef,
        topFormRender: topFormRender,
        subGroupForm: true
      });
    }

  }, _temp;
};

exports.createDinoFormGroupWrap = createDinoFormGroupWrap;

const createDinoFormSubForm = subForms => (0, _util.mapObject)(subForms, (formName, form) => {
  const Form = form.Form,
        field = form.field,
        _form$formProps = form.formProps,
        formProps = _form$formProps === void 0 ? {} : _form$formProps;
  const subForm = {
    field,
    formProps,
    ref: undefined,
    Form: class DinoSubForm extends _react.Component {
      render() {
        return _react.default.createElement(Form, (0, _extends2.default)({}, formProps, this.props, {
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

exports.createDinoFormSubForm = createDinoFormSubForm;

const dinoFormAddItem = (_ref6) => {
  let getGroup = _ref6.getGroup,
      setID = _ref6.setID,
      getID = _ref6.getID,
      render = _ref6.render;
  const ID = getID();
  getGroup().IDList.push(ID);
  setID(ID + 1);
  render();
};

exports.dinoFormAddItem = dinoFormAddItem;

const dinoFormDeleteItem = (_ref7) => {
  let deleteID = _ref7.ID,
      getGroup = _ref7.getGroup,
      render = _ref7.render;
  const group = getGroup();
  group.IDList = group.IDList.filter(ID => ID !== deleteID);
  render();
};

exports.dinoFormDeleteItem = dinoFormDeleteItem;

const dinoFormMoveItem = (_ref8) => {
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

exports.dinoFormMoveItem = dinoFormMoveItem;

const dinoFormMapGroup = (_ref9) => {
  let _ref9$Form = _ref9.Form,
      FormCom = _ref9$Form.FormCom,
      formProps = _ref9$Form.formProps,
      ID = _ref9.ID,
      IDList = _ref9.IDList,
      index = _ref9.index,
      deleteIt = _ref9.deleteIt,
      moveIt = _ref9.moveIt;
  return [_react.default.createElement(FormCom, (0, _extends2.default)({}, formProps, {
    key: ID
  })), _react.default.createElement("div", {
    className: (0, _util.prefix)('group-actions'),
    key: "group-actions"
  }, _react.default.createElement("div", {
    className: (0, _util.prefix)('group-action-delete'),
    onClick: deleteIt
  }), index !== 0 && _react.default.createElement("div", {
    className: (0, _util.prefix)('group-action-move-up'),
    onClick: () => moveIt(-1)
  }), index !== IDList.length - 1 && _react.default.createElement("div", {
    className: (0, _util.prefix)('group-action-move-down'),
    onClick: () => moveIt(1)
  }), index !== 0 && _react.default.createElement("div", {
    className: (0, _util.prefix)('group-action-move-to-first'),
    onClick: () => moveIt(-Infinity)
  }), index !== IDList.length - 1 && _react.default.createElement("div", {
    className: (0, _util.prefix)('group-action-move-to-last'),
    onClick: () => moveIt(Infinity)
  }))];
};

exports.dinoFormMapGroup = dinoFormMapGroup;

const groupsAPI = (_ref10) => {
  let groups = _ref10.groups,
      render = _ref10.render,
      setID = _ref10.setID,
      getID = _ref10.getID;
  return (0, _util.mapObject)(groups, (formName, groupValue) => {
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
      map: function map() {
        let mapGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dinoFormMapGroup;
        return IDList.map((ID, index) => _react.default.createElement("div", {
          key: ID,
          className: `${(0, _util.prefix)('group-item-wrap')}`
        }, mapGroup({
          ID,
          index,
          Com,
          field,
          IDRefMap,
          IDList,
          Form: {
            FormCom: Form,
            formProps: (0, _objectSpread2.default)({}, formProps, (groups[formName].IDRefMap[ID] || {}).props || {}, {
              ID
            })
          },
          deleteIt: () => deleteItem(ID),
          moveIt: offset => moveItem(ID, offset),
          formProps
        })));
      },
      render: function render() {
        let renderGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ele => _react.default.createElement("div", {
          className: `${(0, _util.prefix)('group')}`
        }, _react.default.createElement("div", {
          className: `${(0, _util.prefix)('group-ele')}`
        }, ele), _react.default.createElement("div", {
          className: (0, _util.prefix)('group-action-add'),
          onClick: () => addItem()
        }));
        let children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : group.map();
        return _react.default.createElement("div", {
          className: `${(0, _util.prefix)('group-wrap')}`
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

exports.groupsAPI = groupsAPI;

const subFormsAPI = function subFormsAPI() {
  let _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      subForms = _ref11.subForms;

  return (0, _util.mapObject)(subForms, (formName, _ref12) => {
    let Form = _ref12.Form;
    return {
      [formName]: Form
    };
  });
};

exports.subFormsAPI = subFormsAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUhlbHBlci5qc3giXSwibmFtZXMiOlsiY3JlYXRlRnJhZ21lbnRzIiwiZnJhZ21lbnRzIiwiY3JlYXRlRGlub0Zvcm1BcGkiLCJjb21OYW1lIiwiQ29tIiwicHJvcHMiLCJGcmFnbWVudCIsIkNvbXBvbmVudCIsInJlbmRlciIsImNyZWF0ZUZyb21JdGVtIiwiRGlub0Zvcm1JdGVtV3JhcCIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwic2V0SURSZWZNYXAiLCJ0b3BGb3JtUmVuZGVyIiwiRGlub0Zvcm1XcmFwIiwiY29uc3RydWN0b3IiLCJyZWYiLCJJRCIsImNhdGNoUmVmIiwidW5kZWZpbmVkIiwiY29tcG9uZW50RGlkTW91bnQiLCJpbmRleCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY3JlYXRlRGlub0Zvcm1TdWJGb3JtIiwic3ViRm9ybXMiLCJmb3JtTmFtZSIsImZvcm0iLCJGb3JtIiwiZmllbGQiLCJmb3JtUHJvcHMiLCJzdWJGb3JtIiwiRGlub1N1YkZvcm0iLCJkaW5vRm9ybUFkZEl0ZW0iLCJnZXRHcm91cCIsInNldElEIiwiZ2V0SUQiLCJJRExpc3QiLCJwdXNoIiwiZGlub0Zvcm1EZWxldGVJdGVtIiwiZGVsZXRlSUQiLCJncm91cCIsImZpbHRlciIsImRpbm9Gb3JtTW92ZUl0ZW0iLCJvZmZzZXQiLCJpbmRleE9mIiwic3BsaWNlIiwiSW5maW5pdHkiLCJsZW5ndGgiLCJkaW5vRm9ybU1hcEdyb3VwIiwiRm9ybUNvbSIsImRlbGV0ZUl0IiwibW92ZUl0IiwiZ3JvdXBzQVBJIiwiZ3JvdXBzIiwiZ3JvdXBWYWx1ZSIsIklEUmVmTWFwIiwiYWRkSXRlbSIsImFkZCIsImRlbGV0ZUl0ZW0iLCJkZWxldGVJdGVtRnVuIiwibW92ZUl0ZW0iLCJtb3ZlIiwiZG9BY3Rpb24iLCJmdW4iLCJtYXAiLCJtYXBHcm91cCIsInJlbmRlckdyb3VwIiwiZWxlIiwiY2hpbGRyZW4iLCJzdWJGb3Jtc0FQSSJdLCJtYXBwaW5n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QWRNO0FBQUEsT0E1Qkk7QUE4Q1paLE1BQUFBLE9BOUNZO0FBK0NaRSxNQUFBQSxVQS9DWTtBQWdEWkUsTUFBQUEsUUFoRFk7QUFpRFpFLE1BQUFBO0FBakRZLEtBQWQ7QUFvREEsV0FBTztBQUFFLE9BQUNyQyxRQUFELEdBQVllO0FBQWQsS0FBUDtBQUNELEdBdkdLLENBTG1CO0FBQUEsQ0FBbEI7Ozs7QUE4R0EsTUFBTTZCLFdBQVcsR0FBRyxTQUFkQSxXQUFjO0FBQUEsbUZBQWdCLEVBQWhCO0FBQUEsTUFBRzdDLFFBQUgsVUFBR0EsUUFBSDs7QUFBQSxTQUF1QixxQkFBVUEsUUFBVixFQUFvQixDQUFDQyxRQUFEO0FBQUEsUUFBYUUsSUFBYixVQUFhQSxJQUFiO0FBQUEsV0FBeUI7QUFDN0YsT0FBQ0YsUUFBRCxHQUFZRTtBQURpRixLQUF6QjtBQUFBLEdBQXBCLENBQXZCO0FBQUEsQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcHJlZml4LCBtYXBPYmplY3QgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IERpbm9Gb3JtSXRlbSBmcm9tICcuL0Rpbm9Gb3JtSXRlbS5qc3gnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRnJhZ21lbnRzID0gKHsgZnJhZ21lbnRzLCBjcmVhdGVEaW5vRm9ybUFwaSB9KSA9PiAoXG4gIG1hcE9iamVjdChmcmFnbWVudHMsIChjb21OYW1lLCB7IENvbSwgLi4ucHJvcHMgfSA9IHt9KSA9PiAoe1xuICAgIFtjb21OYW1lXTogT2JqZWN0LmFzc2lnbihcbiAgICAgIGNsYXNzIEZyYWdtZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q29tXG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsgY3JlYXRlRGlub0Zvcm1BcGkoKSB9XG4gICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICB7IC4uLih0aGlzLnByb3BzIHx8IHt9KSB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb3BzLFxuICAgICksXG4gIH0pKVxuKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUZyb21JdGVtID0gKHsgY3JlYXRlRGlub0Zvcm1BcGkgfSkgPT4gKFxuICBjbGFzcyBEaW5vRm9ybUl0ZW1XcmFwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RGlub0Zvcm1JdGVtXG4gICAgICAgICAgZGlub0Zvcm09eyBjcmVhdGVEaW5vRm9ybUFwaSgpIH1cbiAgICAgICAgICB7IC4uLih0aGlzLnByb3BzIHx8IHt9KSB9XG4gICAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG4pO1xuXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCA9ICh7IHNldElEUmVmTWFwLCBDb20sIHRvcEZvcm1SZW5kZXIgfSkgPT4gKFxuICBjbGFzcyBEaW5vRm9ybVdyYXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICB0aGlzLkNvbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgc2V0SURSZWZNYXAoSUQsIHsgcmVmOiB0aGlzLkNvbSB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgc2V0SURSZWZNYXAoSUQsIHsgcmVmOiB1bmRlZmluZWQgfSk7XG4gICAgfVxuXG4gICAgY2F0Y2hSZWYgPSAocmVmKSA9PiB7XG4gICAgICBjb25zdCB7IElELCBjYXRjaFJlZiA9ICgpID0+IHt9IH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5Db20gPSByZWY7XG4gICAgICBjYXRjaFJlZihyZWYpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbVxuICAgICAgICAgIHJlZj17IHRoaXMuY2F0Y2hSZWYgfVxuICAgICAgICAgIHRvcEZvcm1SZW5kZXI9eyB0b3BGb3JtUmVuZGVyIH1cbiAgICAgICAgICBzdWJHcm91cEZvcm1cbiAgICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEaW5vRm9ybVN1YkZvcm0gPSBzdWJGb3JtcyA9PiAoXG4gIG1hcE9iamVjdChzdWJGb3JtcywgKGZvcm1OYW1lLCBmb3JtKSA9PiB7XG4gICAgY29uc3QgeyBGb3JtLCBmaWVsZCwgZm9ybVByb3BzID0ge30gfSA9IGZvcm07XG4gICAgY29uc3Qgc3ViRm9ybSA9IHtcbiAgICAgIGZpZWxkLFxuICAgICAgZm9ybVByb3BzLFxuICAgICAgcmVmOiB1bmRlZmluZWQsXG4gICAgICBGb3JtOiBjbGFzcyBEaW5vU3ViRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1cbiAgICAgICAgICAgICAgeyAuLi5mb3JtUHJvcHMgfVxuICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgICByZWY9eyAocmVmKSA9PiB7IHN1YkZvcm0ucmVmID0gcmVmOyB9IH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIFtmb3JtTmFtZV06IHN1YkZvcm0sXG4gICAgfTtcbiAgfSlcbik7XG5cblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtQWRkSXRlbSA9ICh7XG4gIGdldEdyb3VwLFxuICBzZXRJRCxcbiAgZ2V0SUQsXG4gIHJlbmRlcixcbn0pID0+IHtcbiAgY29uc3QgSUQgPSBnZXRJRCgpO1xuICBnZXRHcm91cCgpLklETGlzdC5wdXNoKElEKTtcbiAgc2V0SUQoSUQgKyAxKTtcbiAgcmVuZGVyKCk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlub0Zvcm1EZWxldGVJdGVtID0gKHsgSUQ6IGRlbGV0ZUlELCBnZXRHcm91cCwgcmVuZGVyIH0pID0+IHtcbiAgY29uc3QgZ3JvdXAgPSBnZXRHcm91cCgpO1xuICBncm91cC5JRExpc3QgPSBncm91cC5JRExpc3QuZmlsdGVyKElEID0+IElEICE9PSBkZWxldGVJRCk7XG4gIHJlbmRlcigpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtTW92ZUl0ZW0gPSAoe1xuICBJRCwgb2Zmc2V0LCBnZXRHcm91cCwgcmVuZGVyLFxufSkgPT4ge1xuICBjb25zdCBncm91cCA9IGdldEdyb3VwKCk7XG4gIGNvbnN0IGluZGV4ID0gZ3JvdXAuSURMaXN0LmluZGV4T2YoSUQpO1xuICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgaWYgKG9mZnNldCA9PT0gLUluZmluaXR5KSB7XG4gICAgZ3JvdXAuSURMaXN0LnNwbGljZSgwLCAwLCBJRCk7XG4gIH0gZWxzZSBpZiAob2Zmc2V0ID09PSBJbmZpbml0eSkge1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoZ3JvdXAuSURMaXN0Lmxlbmd0aCwgMCwgSUQpO1xuICB9IGVsc2Uge1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoaW5kZXggKyBvZmZzZXQsIDAsIElEKTtcbiAgfVxuICByZW5kZXIoKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtTWFwR3JvdXAgPSAoe1xuICBGb3JtOiB7XG4gICAgRm9ybUNvbSxcbiAgICBmb3JtUHJvcHMsXG4gIH0sXG4gIElELFxuICBJRExpc3QsXG4gIGluZGV4LFxuICBkZWxldGVJdCxcbiAgbW92ZUl0LFxufSkgPT4gKFtcbiAgPEZvcm1Db20geyAuLi5mb3JtUHJvcHMgfSBrZXk9eyBJRCB9IC8+LFxuICA8ZGl2IGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9ucycpIH0ga2V5PVwiZ3JvdXAtYWN0aW9uc1wiPlxuICAgIDxkaXYgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tZGVsZXRlJykgfSBvbkNsaWNrPXsgZGVsZXRlSXQgfSAvPlxuICAgIHtcbiAgICAgIGluZGV4ICE9PSAwXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLXVwJykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoLTEpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICB7XG4gICAgICBpbmRleCAhPT0gSURMaXN0Lmxlbmd0aCAtIDFcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtZG93bicpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KDEpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICB7XG4gICAgICBpbmRleCAhPT0gMFxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS10by1maXJzdCcpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KC1JbmZpbml0eSkgfVxuICAgICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIHtcbiAgICAgIGluZGV4ICE9PSBJRExpc3QubGVuZ3RoIC0gMVxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS10by1sYXN0JykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoSW5maW5pdHkpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgPC9kaXY+LFxuXSk7XG5cbmV4cG9ydCBjb25zdCBncm91cHNBUEkgPSAoe1xuICBncm91cHMsXG4gIHJlbmRlcixcbiAgc2V0SUQsXG4gIGdldElELFxufSkgPT4gbWFwT2JqZWN0KGdyb3VwcywgKGZvcm1OYW1lLCBncm91cFZhbHVlKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBDb20sXG4gICAgZmllbGQsXG4gICAgSURSZWZNYXAsXG4gICAgSURMaXN0LFxuICAgIEZvcm0sXG4gICAgZm9ybVByb3BzID0ge30sXG4gIH0gPSBncm91cFZhbHVlO1xuXG4gIGNvbnN0IGFkZEl0ZW0gPSAoXG4gICAgYWRkID0gZGlub0Zvcm1BZGRJdGVtLFxuICApID0+IGFkZCh7XG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBkZWxldGVJdGVtID0gKFxuICAgIElELFxuICAgIGRlbGV0ZUl0ZW1GdW4gPSBkaW5vRm9ybURlbGV0ZUl0ZW0sXG4gICkgPT4gZGVsZXRlSXRlbUZ1bih7XG4gICAgSUQsXG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBtb3ZlSXRlbSA9IChcbiAgICBJRCxcbiAgICBvZmZzZXQsXG4gICAgbW92ZSA9IGRpbm9Gb3JtTW92ZUl0ZW0sXG4gICkgPT4gbW92ZSh7XG4gICAgSUQsXG4gICAgb2Zmc2V0LFxuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgZG9BY3Rpb24gPSBmdW4gPT4gZnVuKHtcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IGdyb3VwID0ge1xuICAgIG1hcDogKG1hcEdyb3VwID0gZGlub0Zvcm1NYXBHcm91cCkgPT4gSURMaXN0Lm1hcCgoSUQsIGluZGV4KSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGtleT17IElEIH1cbiAgICAgICAgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1pdGVtLXdyYXAnKX1gIH0+XG4gICAgICAgIHtcbiAgICAgICAgICBtYXBHcm91cCh7XG4gICAgICAgICAgICBJRCxcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICBJRFJlZk1hcCxcbiAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgIEZvcm06IHtcbiAgICAgICAgICAgICAgRm9ybUNvbTogRm9ybSxcbiAgICAgICAgICAgICAgZm9ybVByb3BzOiB7XG4gICAgICAgICAgICAgICAgLi4uZm9ybVByb3BzLFxuICAgICAgICAgICAgICAgIC4uLigoZ3JvdXBzW2Zvcm1OYW1lXS5JRFJlZk1hcFtJRF0gfHwge30pLnByb3BzIHx8IHt9KSxcbiAgICAgICAgICAgICAgICBJRCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWxldGVJdDogKCkgPT4gZGVsZXRlSXRlbShJRCksXG4gICAgICAgICAgICBtb3ZlSXQ6IG9mZnNldCA9PiBtb3ZlSXRlbShJRCwgb2Zmc2V0KSxcbiAgICAgICAgICAgIGZvcm1Qcm9wcyxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApKSxcbiAgICByZW5kZXI6IChcbiAgICAgIHJlbmRlckdyb3VwID0gZWxlID0+IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwJyl9YCB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1lbGUnKX1gIH0+XG4gICAgICAgICAgICB7ZWxlfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLWFkZCcpIH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBhZGRJdGVtKCkgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApLFxuICAgICAgY2hpbGRyZW4gPSBncm91cC5tYXAoKSxcbiAgICApID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC13cmFwJyl9YCB9PlxuICAgICAgICB7cmVuZGVyR3JvdXAoY2hpbGRyZW4pfVxuICAgICAgPC9kaXY+XG4gICAgKSxcbiAgICBhZGRJdGVtLFxuICAgIGRlbGV0ZUl0ZW0sXG4gICAgbW92ZUl0ZW0sXG4gICAgZG9BY3Rpb24sXG4gIH07XG5cbiAgcmV0dXJuIHsgW2Zvcm1OYW1lXTogZ3JvdXAgfTtcbn0pO1xuXG5leHBvcnQgY29uc3Qgc3ViRm9ybXNBUEkgPSAoeyBzdWJGb3JtcyB9ID0ge30pID0+IG1hcE9iamVjdChzdWJGb3JtcywgKGZvcm1OYW1lLCB7IEZvcm0gfSkgPT4gKHtcbiAgW2Zvcm1OYW1lXTogRm9ybSxcbn0pKTtcbiJdfQ==