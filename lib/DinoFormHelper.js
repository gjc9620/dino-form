"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRef = getRef;
exports.subFormsAPI = exports.groupsAPI = exports.dinoFormMapGroup = exports.dinoFormMoveItem = exports.dinoFormDeleteItem = exports.dinoFormAddItem = exports.createDinoFormSubForm = exports.createDinoFormGroupWrap = exports.createFromItem = exports.createFragments = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _util = require("./util");

var _DinoFormItem = _interopRequireDefault(require("./DinoFormItem"));

var _Drag = _interopRequireDefault(require("./Drag"));

function getRef() {
  return _getRef.apply(this, arguments);
}

function _getRef() {
  _getRef = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var getFun,
        timeout,
        ref,
        startTime,
        now,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getFun = _args.length > 0 && _args[0] !== undefined ? _args[0] : function () {};
            timeout = _args.length > 1 && _args[1] !== undefined ? _args[1] : 500;
            ref = getFun();
            startTime = +new Date();

          case 4:
            if (!1) {
              _context.next = 16;
              break;
            }

            now = +new Date();

            if (!(now - startTime > timeout)) {
              _context.next = 9;
              break;
            }

            console.warn('[dino-form] get ref timeout, maybe you not render it.');
            return _context.abrupt("return", undefined);

          case 9:
            _context.next = 11;
            return (0, _util.sleep)();

          case 11:
            ref = getFun();

            if (!ref) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("break", 16);

          case 14:
            _context.next = 4;
            break;

          case 16:
            return _context.abrupt("return", ref);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getRef.apply(this, arguments);
}

var createFragments = function createFragments(_ref) {
  var fragments = _ref.fragments,
      createDinoFormApi = _ref.createDinoFormApi;
  return (0, _util.mapObject)(fragments, function (comName) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        Com = _ref2.Com,
        props = (0, _objectWithoutProperties2.default)(_ref2, ["Com"]);

    return (0, _defineProperty2.default)({}, comName, (0, _assign.default)(
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(Fragment, _Component);

      function Fragment() {
        (0, _classCallCheck2.default)(this, Fragment);
        return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Fragment).apply(this, arguments));
      }

      (0, _createClass2.default)(Fragment, [{
        key: "render",
        value: function render() {
          return _react.default.createElement(Com, (0, _extends2.default)({
            dinoForm: createDinoFormApi()
          }, props, this.props || {}));
        }
      }]);
      return Fragment;
    }(_react.Component), props));
  });
};

exports.createFragments = createFragments;

var createFromItem = function createFromItem(_ref4) {
  var createDinoFormApi = _ref4.createDinoFormApi;
  return (
    /*#__PURE__*/
    function (_Component2) {
      (0, _inherits2.default)(DinoFormItemWrap, _Component2);

      function DinoFormItemWrap() {
        (0, _classCallCheck2.default)(this, DinoFormItemWrap);
        return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DinoFormItemWrap).apply(this, arguments));
      }

      (0, _createClass2.default)(DinoFormItemWrap, [{
        key: "render",
        value: function render() {
          return _react.default.createElement(_DinoFormItem.default, (0, _extends2.default)({
            dinoForm: createDinoFormApi()
          }, this.props || {}));
        }
      }]);
      return DinoFormItemWrap;
    }(_react.Component)
  );
};

exports.createFromItem = createFromItem;

var createDinoFormGroupWrap = function createDinoFormGroupWrap(_ref5) {
  var _temp;

  var setIDRefMap = _ref5.setIDRefMap,
      Com = _ref5.Com,
      topFormRender = _ref5.topFormRender;
  return _temp =
  /*#__PURE__*/
  function (_Component3) {
    (0, _inherits2.default)(DinoFormWrap, _Component3);

    function DinoFormWrap(props) {
      var _this;

      (0, _classCallCheck2.default)(this, DinoFormWrap);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DinoFormWrap).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "checkID", function () {
        var _this$props = _this.props,
            ID = _this$props.ID,
            index = _this$props.index;

        if ((0, _util.isNotExist)(ID)) {
          console.error('[dino-form] props ID not found, look like you forget give a ID in map function.');
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "catchRef", function (ref) {
        var _this$props2 = _this.props,
            ID = _this$props2.ID,
            _this$props2$catchRef = _this$props2.catchRef,
            catchRef = _this$props2$catchRef === void 0 ? function () {} : _this$props2$catchRef;
        _this.Com = ref;
        catchRef(ref);
      });
      _this.Com = undefined;
      return _this;
    }

    (0, _createClass2.default)(DinoFormWrap, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$props3 = this.props,
            ID = _this$props3.ID,
            index = _this$props3.index;
        this.checkID();
        setIDRefMap(ID, {
          ref: this.Com
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this$props4 = this.props,
            ID = _this$props4.ID,
            index = _this$props4.index;
        this.checkID();
        setIDRefMap(ID, {
          ref: undefined
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props5 = this.props,
            ID = _this$props5.ID,
            index = _this$props5.index;
        return _react.default.createElement(Com, {
          ID: ID,
          index: index,
          ref: this.catchRef,
          topFormRender: topFormRender,
          subGroupForm: true
        });
      }
    }]);
    return DinoFormWrap;
  }(_react.Component), _temp;
};

exports.createDinoFormGroupWrap = createDinoFormGroupWrap;

var createDinoFormSubForm = function createDinoFormSubForm(subForms) {
  return (0, _util.mapObject)(subForms, function (formName, form) {
    var Form = form.Form,
        field = form.field,
        _form$formProps = form.formProps,
        formProps = _form$formProps === void 0 ? {} : _form$formProps;
    var subForm = {
      field: field,
      formProps: formProps,
      ref: undefined,
      Form:
      /*#__PURE__*/
      function (_Component4) {
        (0, _inherits2.default)(DinoSubForm, _Component4);

        function DinoSubForm() {
          (0, _classCallCheck2.default)(this, DinoSubForm);
          return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DinoSubForm).apply(this, arguments));
        }

        (0, _createClass2.default)(DinoSubForm, [{
          key: "render",
          value: function render() {
            return _react.default.createElement(Form, (0, _extends2.default)({}, formProps, this.props, {
              ref: function ref(_ref6) {
                subForm.ref = _ref6;
              }
            }));
          }
        }]);
        return DinoSubForm;
      }(_react.Component)
    };
    return (0, _defineProperty2.default)({}, formName, subForm);
  });
};

exports.createDinoFormSubForm = createDinoFormSubForm;

var dinoFormAddItem = function dinoFormAddItem(_ref8) {
  var getGroup = _ref8.getGroup,
      setID = _ref8.setID,
      getID = _ref8.getID,
      render = _ref8.render;
  var ID = getID();
  getGroup().IDList.push(ID);
  setID(ID + 1);
  render();
  return ID;
};

exports.dinoFormAddItem = dinoFormAddItem;

var dinoFormDeleteItem = function dinoFormDeleteItem(_ref9) {
  var deleteID = _ref9.ID,
      getGroup = _ref9.getGroup,
      render = _ref9.render;
  var group = getGroup();
  group.IDList = group.IDList.filter(function (ID) {
    return ID !== deleteID;
  });
  render();
};

exports.dinoFormDeleteItem = dinoFormDeleteItem;

var dinoFormMoveItem = function dinoFormMoveItem(_ref10) {
  var ID = _ref10.ID,
      offset = _ref10.offset,
      getGroup = _ref10.getGroup,
      render = _ref10.render;
  var group = getGroup();
  var index = group.IDList.indexOf(ID);
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

exports.dinoFormMoveItem = dinoFormMoveItem;

var dinoFormMapGroup = function dinoFormMapGroup(_ref11) {
  var _ref11$Form = _ref11.Form,
      FormCom = _ref11$Form.FormCom,
      formProps = _ref11$Form.formProps,
      ID = _ref11.ID,
      IDList = _ref11.IDList,
      index = _ref11.index,
      deleteIt = _ref11.deleteIt,
      moveIt = _ref11.moveIt;
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
    onClick: function onClick() {
      return moveIt(-1);
    }
  }), index !== IDList.length - 1 && _react.default.createElement("div", {
    className: (0, _util.prefix)('group-action-move-down'),
    onClick: function onClick() {
      return moveIt(1);
    }
  }), index !== 0 && _react.default.createElement("div", {
    className: (0, _util.prefix)('group-action-move-to-first'),
    onClick: function onClick() {
      return moveIt(-Infinity);
    }
  }), index !== IDList.length - 1 && _react.default.createElement("div", {
    className: (0, _util.prefix)('group-action-move-to-last'),
    onClick: function onClick() {
      return moveIt(Infinity);
    }
  }))];
};

exports.dinoFormMapGroup = dinoFormMapGroup;

var groupsAPI = function groupsAPI(_ref12) {
  var groups = _ref12.groups,
      render = _ref12.render,
      setID = _ref12.setID,
      getID = _ref12.getID;
  return (0, _util.mapObject)(groups, function (formName, groupValue) {
    var Com = groupValue.Com,
        field = groupValue.field,
        needDrag = groupValue.needDrag,
        clearMotions = groupValue.clearMotions,
        pressedMotions = groupValue.pressedMotions,
        notPressedMotions = groupValue.notPressedMotions,
        createStyle = groupValue.createStyle,
        IDRefMap = groupValue.IDRefMap,
        IDList = groupValue.IDList,
        Form = groupValue.Form,
        _groupValue$formProps = groupValue.formProps,
        formProps = _groupValue$formProps === void 0 ? {} : _groupValue$formProps;

    var addItem = function addItem() {
      var add = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dinoFormAddItem;
      return add({
        getGroup: function getGroup() {
          return groupValue;
        },
        setID: setID,
        getID: getID,
        render: render
      });
    };

    var deleteItem = function deleteItem(ID) {
      var deleteItemFun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dinoFormDeleteItem;
      return deleteItemFun({
        ID: ID,
        getGroup: function getGroup() {
          return groupValue;
        },
        setID: setID,
        getID: getID,
        render: render
      });
    };

    var moveItem = function moveItem(ID, offset) {
      var move = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dinoFormMoveItem;
      return move({
        ID: ID,
        offset: offset,
        getGroup: function getGroup() {
          return groupValue;
        },
        setID: setID,
        getID: getID,
        render: render
      });
    };

    var doAction = function doAction(fun) {
      return fun({
        getGroup: function getGroup() {
          return groupValue;
        },
        setID: setID,
        getID: getID,
        render: render
      });
    };

    var mapFun = function mapFun(mapGroup, ID, index) {
      return mapGroup({
        ID: ID,
        index: +index,
        Com: Com,
        field: field,
        IDRefMap: IDRefMap,
        IDList: IDList,
        Form: {
          FormCom: Form,
          formProps: (0, _objectSpread2.default)({}, formProps, (groups[formName].IDRefMap[ID] || {}).props || {}, {
            ID: ID
          })
        },
        deleteIt: function deleteIt() {
          return deleteItem(ID);
        },
        moveIt: function moveIt(offset) {
          return moveItem(ID, offset);
        },
        formProps: formProps
      });
    };

    var group = {
      IDList: IDList,
      dragMap: function dragMap() {
        var mapGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dinoFormMapGroup;
        return IDList.length > 0 // todo style config
        ? _react.default.createElement(_Drag.default, {
          order: (0, _toConsumableArray2.default)(IDList),
          lastActionMoveID: groupValue.lastActionMoveID,
          lastMoveID: groupValue.lastMoveID,
          clearMotions: clearMotions,
          pressedMotions: pressedMotions,
          notPressedMotions: notPressedMotions,
          createStyle: createStyle,
          changeDone: function changeDone(newIDList) {
            groupValue.IDList = (0, _toConsumableArray2.default)(newIDList);
            render();
          }
        }, (0, _util.mapObject)(IDList, function (index, ID) {
          return (0, _defineProperty2.default)({}, ID, mapFun(mapGroup, ID, index));
        })) : null;
      },
      map: function map() {
        var mapGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dinoFormMapGroup;
        return IDList.length > 0 ? _react.default.createElement("div", {
          className: "".concat((0, _util.prefix)('map-container'))
        }, IDList.map(function (ID, index) {
          return _react.default.createElement("div", {
            className: "".concat((0, _util.prefix)('group-item-wrap')),
            key: ID
          }, mapFun(mapGroup, ID, index));
        })) : null;
      },
      render: function render() {
        var renderGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (ele) {
          return _react.default.createElement("div", {
            className: "".concat((0, _util.prefix)('group'))
          }, _react.default.createElement("div", {
            className: "".concat((0, _util.prefix)('group-ele'))
          }, ele), _react.default.createElement("div", {
            className: (0, _util.prefix)('group-action-add'),
            onClick: function onClick() {
              return addItem();
            }
          }));
        };
        var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : needDrag ? group.dragMap() : group.map();
        return _react.default.createElement("div", {
          className: "".concat((0, _util.prefix)('group-wrap'))
        }, renderGroup(children));
      },
      addItem: addItem,
      deleteItem: deleteItem,
      moveItem: moveItem,
      doAction: doAction
    };
    return (0, _defineProperty2.default)({}, formName, group);
  });
};

exports.groupsAPI = groupsAPI;

var subFormsAPI = function subFormsAPI() {
  var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      subForms = _ref15.subForms;

  return (0, _util.mapObject)(subForms, function (formName, _ref16) {
    var Form = _ref16.Form;
    return (0, _defineProperty2.default)({}, formName, Form);
  });
};

exports.subFormsAPI = subFormsAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUhlbHBlci5qc3giXSwibmFtZXMiOlsiZ2V0UmVmIiwiZ2V0RnVuIiwidGltZW91dCIsInJlZiIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJjb25zb2xlIiwid2FybiIsInVuZGVmaW5lZCIsImNyZWF0ZUZyYWdtZW50cyIsImZyYWdtZW50cyIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY29tTmFtZSIsIkNvbSIsInByb3BzIiwiQ29tcG9uZW50IiwiY3JlYXRlRnJvbUl0ZW0iLCJjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCIsInNldElEUmVmTWFwIiwidG9wRm9ybVJlbmRlciIsIklEIiwiaW5kZXgiLCJlcnJvciIsImNhdGNoUmVmIiwiY2hlY2tJRCIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsInN1YkZvcm1zIiwiZm9ybU5hbWUiLCJmb3JtIiwiRm9ybSIsImZpZWxkIiwiZm9ybVByb3BzIiwic3ViRm9ybSIsImRpbm9Gb3JtQWRkSXRlbSIsImdldEdyb3VwIiwic2V0SUQiLCJnZXRJRCIsInJlbmRlciIsIklETGlzdCIsInB1c2giLCJkaW5vRm9ybURlbGV0ZUl0ZW0iLCJkZWxldGVJRCIsImdyb3VwIiwiZmlsdGVyIiwiZGlub0Zvcm1Nb3ZlSXRlbSIsIm9mZnNldCIsImluZGV4T2YiLCJsYXN0QWN0aW9uTW92ZUlEIiwiSW5maW5pdHkiLCJsYXN0TW92ZUlEIiwic3BsaWNlIiwibGVuZ3RoIiwiZGlub0Zvcm1NYXBHcm91cCIsIkZvcm1Db20iLCJkZWxldGVJdCIsIm1vdmVJdCIsImdyb3Vwc0FQSSIsImdyb3VwcyIsImdyb3VwVmFsdWUiLCJuZWVkRHJhZyIsImNsZWFyTW90aW9ucyIsInByZXNzZWRNb3Rpb25zIiwibm90UHJlc3NlZE1vdGlvbnMiLCJjcmVhdGVTdHlsZSIsIklEUmVmTWFwIiwiYWRkSXRlbSIsImFkZCIsImRlbGV0ZUl0ZW0iLCJkZWxldGVJdGVtRnVuIiwibW92ZUl0ZW0iLCJtb3ZlIiwiZG9BY3Rpb24iLCJmdW4iLCJtYXBGdW4iLCJtYXBHcm91cCIsImRyYWdNYXAiLCJuZXdJRExpc3QiLCJtYXAiLCJyZW5kZXJHcm91cCIsImVsZSIsImNoaWxkcmVuIiwic3ViRm9ybXNBUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFHQTs7QUFDQTs7U0FFc0JBLE07Ozs7Ozs7NEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNMQyxZQUFBQSxNQURLLDJEQUNJLFlBQU0sQ0FBRSxDQURaO0FBRUxDLFlBQUFBLE9BRkssMkRBRUssR0FGTDtBQUlEQyxZQUFBQSxHQUpDLEdBSUtGLE1BQU0sRUFKWDtBQU1DRyxZQUFBQSxTQU5ELEdBTWEsQ0FBQyxJQUFJQyxJQUFKLEVBTmQ7O0FBQUE7QUFBQSxpQkFRRSxDQVJGO0FBQUE7QUFBQTtBQUFBOztBQVNHQyxZQUFBQSxHQVRILEdBU1MsQ0FBQyxJQUFJRCxJQUFKLEVBVFY7O0FBQUEsa0JBVUNDLEdBQUcsR0FBR0YsU0FBTixHQUFrQkYsT0FWbkI7QUFBQTtBQUFBO0FBQUE7O0FBV0RLLFlBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLHVEQUFiO0FBWEMsNkNBWU1DLFNBWk47O0FBQUE7QUFBQTtBQUFBLG1CQWNHLGtCQWRIOztBQUFBO0FBZ0JITixZQUFBQSxHQUFHLEdBQUdGLE1BQU0sRUFBWjs7QUFoQkcsaUJBa0JDRSxHQWxCRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSw2Q0FxQkVBLEdBckJGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUF3QkEsSUFBTU8sZUFBZSxHQUFHLFNBQWxCQSxlQUFrQjtBQUFBLE1BQUdDLFNBQUgsUUFBR0EsU0FBSDtBQUFBLE1BQWNDLGlCQUFkLFFBQWNBLGlCQUFkO0FBQUEsU0FDN0IscUJBQVVELFNBQVYsRUFBcUIs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QUFEO0FBQUEsUUFBYUUsSUFBYixVQUFhQSxJQUFiO0FBQUEsNkNBQ25FRixRQURtRSxFQUN4REUsSUFEd0Q7QUFBQSxHQUFwQixDQUF2QjtBQUFBLENBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIHByZWZpeCwgbWFwT2JqZWN0LCBzbGVlcCwgaXNFeGlzdCwgaXNOb3RFeGlzdCxcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBEaW5vRm9ybUl0ZW0gZnJvbSAnLi9EaW5vRm9ybUl0ZW0nO1xuaW1wb3J0IERyYWcgZnJvbSAnLi9EcmFnJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFJlZihcbiAgZ2V0RnVuID0gKCkgPT4ge30sXG4gIHRpbWVvdXQgPSA1MDAsXG4pIHtcbiAgbGV0IHJlZiA9IGdldEZ1bigpO1xuXG4gIGNvbnN0IHN0YXJ0VGltZSA9ICtuZXcgRGF0ZSgpO1xuXG4gIHdoaWxlICgxKSB7XG4gICAgY29uc3Qgbm93ID0gK25ldyBEYXRlKCk7XG4gICAgaWYgKG5vdyAtIHN0YXJ0VGltZSA+IHRpbWVvdXQpIHtcbiAgICAgIGNvbnNvbGUud2FybignW2Rpbm8tZm9ybV0gZ2V0IHJlZiB0aW1lb3V0LCBtYXliZSB5b3Ugbm90IHJlbmRlciBpdC4nKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGF3YWl0IHNsZWVwKCk7XG5cbiAgICByZWYgPSBnZXRGdW4oKTtcblxuICAgIGlmIChyZWYpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHJlZjtcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUZyYWdtZW50cyA9ICh7IGZyYWdtZW50cywgY3JlYXRlRGlub0Zvcm1BcGkgfSkgPT4gKFxuICBtYXBPYmplY3QoZnJhZ21lbnRzLCAoY29tTmFtZSwgeyBDb20sIC4uLnByb3BzIH0gPSB7fSkgPT4gKHtcbiAgICBbY29tTmFtZV06IE9iamVjdC5hc3NpZ24oXG4gICAgICBjbGFzcyBGcmFnbWVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENvbVxuICAgICAgICAgICAgICBkaW5vRm9ybT17IGNyZWF0ZURpbm9Gb3JtQXBpKCkgfVxuICAgICAgICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgICAgICAgICAgeyAuLi4odGhpcy5wcm9wcyB8fCB7fSkgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9wcyxcbiAgICApLFxuICB9KSlcbik7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVGcm9tSXRlbSA9ICh7IGNyZWF0ZURpbm9Gb3JtQXBpIH0pID0+IChcbiAgY2xhc3MgRGlub0Zvcm1JdGVtV3JhcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPERpbm9Gb3JtSXRlbVxuICAgICAgICAgIGRpbm9Gb3JtPXsgY3JlYXRlRGlub0Zvcm1BcGkoKSB9XG4gICAgICAgICAgeyAuLi4odGhpcy5wcm9wcyB8fCB7fSkgfVxuICAgICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuKTtcblxuXG5leHBvcnQgY29uc3QgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAgPSAoe1xuICBzZXRJRFJlZk1hcCwgQ29tLCB0b3BGb3JtUmVuZGVyLFxufSkgPT4gKFxuICBjbGFzcyBEaW5vRm9ybVdyYXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICB0aGlzLkNvbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjaGVja0lEID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyBJRCwgaW5kZXggfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAoaXNOb3RFeGlzdChJRCkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW2Rpbm8tZm9ybV0gcHJvcHMgSUQgbm90IGZvdW5kLCBsb29rIGxpa2UgeW91IGZvcmdldCBnaXZlIGEgSUQgaW4gbWFwIGZ1bmN0aW9uLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgY29uc3QgeyBJRCwgaW5kZXggfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLmNoZWNrSUQoKTtcbiAgICAgIHNldElEUmVmTWFwKElELCB7IHJlZjogdGhpcy5Db20gfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBjb25zdCB7IElELCBpbmRleCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHRoaXMuY2hlY2tJRCgpO1xuICAgICAgc2V0SURSZWZNYXAoSUQsIHsgcmVmOiB1bmRlZmluZWQgfSk7XG4gICAgfVxuXG4gICAgY2F0Y2hSZWYgPSAocmVmKSA9PiB7XG4gICAgICBjb25zdCB7IElELCBjYXRjaFJlZiA9ICgpID0+IHt9IH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5Db20gPSByZWY7XG4gICAgICBjYXRjaFJlZihyZWYpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbVxuICAgICAgICAgIElEPXsgSUQgfVxuICAgICAgICAgIGluZGV4PXsgaW5kZXggfVxuICAgICAgICAgIHJlZj17IHRoaXMuY2F0Y2hSZWYgfVxuICAgICAgICAgIHRvcEZvcm1SZW5kZXI9eyB0b3BGb3JtUmVuZGVyIH1cbiAgICAgICAgICBzdWJHcm91cEZvcm1cbiAgICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEaW5vRm9ybVN1YkZvcm0gPSBzdWJGb3JtcyA9PiAoXG4gIG1hcE9iamVjdChzdWJGb3JtcywgKGZvcm1OYW1lLCBmb3JtKSA9PiB7XG4gICAgY29uc3QgeyBGb3JtLCBmaWVsZCwgZm9ybVByb3BzID0ge30gfSA9IGZvcm07XG4gICAgY29uc3Qgc3ViRm9ybSA9IHtcbiAgICAgIGZpZWxkLFxuICAgICAgZm9ybVByb3BzLFxuICAgICAgcmVmOiB1bmRlZmluZWQsXG4gICAgICBGb3JtOiBjbGFzcyBEaW5vU3ViRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1cbiAgICAgICAgICAgICAgeyAuLi5mb3JtUHJvcHMgfVxuICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgICByZWY9eyAocmVmKSA9PiB7IHN1YkZvcm0ucmVmID0gcmVmOyB9IH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIFtmb3JtTmFtZV06IHN1YkZvcm0sXG4gICAgfTtcbiAgfSlcbik7XG5cblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtQWRkSXRlbSA9ICh7XG4gIGdldEdyb3VwLFxuICBzZXRJRCxcbiAgZ2V0SUQsXG4gIHJlbmRlcixcbn0pID0+IHtcbiAgY29uc3QgSUQgPSBnZXRJRCgpO1xuICBnZXRHcm91cCgpLklETGlzdC5wdXNoKElEKTtcbiAgc2V0SUQoSUQgKyAxKTtcbiAgcmVuZGVyKCk7XG4gIHJldHVybiBJRDtcbn07XG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybURlbGV0ZUl0ZW0gPSAoeyBJRDogZGVsZXRlSUQsIGdldEdyb3VwLCByZW5kZXIgfSkgPT4ge1xuICBjb25zdCBncm91cCA9IGdldEdyb3VwKCk7XG4gIGdyb3VwLklETGlzdCA9IGdyb3VwLklETGlzdC5maWx0ZXIoSUQgPT4gSUQgIT09IGRlbGV0ZUlEKTtcbiAgcmVuZGVyKCk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlub0Zvcm1Nb3ZlSXRlbSA9ICh7XG4gIElELCBvZmZzZXQsIGdldEdyb3VwLCByZW5kZXIsXG59KSA9PiB7XG4gIGNvbnN0IGdyb3VwID0gZ2V0R3JvdXAoKTtcbiAgY29uc3QgaW5kZXggPSBncm91cC5JRExpc3QuaW5kZXhPZihJRCk7XG4gIGdyb3VwLmxhc3RBY3Rpb25Nb3ZlSUQgPSBJRDtcblxuICBpZiAob2Zmc2V0ID09PSAtSW5maW5pdHkpIHtcbiAgICBncm91cC5sYXN0TW92ZUlEID0gZ3JvdXAuSURMaXN0WzBdO1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoMCwgMCwgSUQpO1xuICB9IGVsc2UgaWYgKG9mZnNldCA9PT0gSW5maW5pdHkpIHtcbiAgICBncm91cC5sYXN0TW92ZUlEID0gZ3JvdXAuSURMaXN0W2dyb3VwLklETGlzdC5sZW5ndGggLSAxXTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGdyb3VwLklETGlzdC5sZW5ndGgsIDAsIElEKTtcbiAgfSBlbHNlIHtcbiAgICBncm91cC5sYXN0TW92ZUlEID0gZ3JvdXAuSURMaXN0W2luZGV4ICsgb2Zmc2V0XTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4ICsgb2Zmc2V0LCAwLCBJRCk7XG4gIH1cblxuICByZW5kZXIoKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtTWFwR3JvdXAgPSAoe1xuICBGb3JtOiB7XG4gICAgRm9ybUNvbSxcbiAgICBmb3JtUHJvcHMsXG4gIH0sXG4gIElELFxuICBJRExpc3QsXG4gIGluZGV4LFxuICBkZWxldGVJdCxcbiAgbW92ZUl0LFxufSkgPT4gKFtcbiAgPEZvcm1Db20geyAuLi5mb3JtUHJvcHMgfSBrZXk9eyBJRCB9IC8+LFxuICA8ZGl2IGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9ucycpIH0ga2V5PVwiZ3JvdXAtYWN0aW9uc1wiPlxuICAgIDxkaXYgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tZGVsZXRlJykgfSBvbkNsaWNrPXsgZGVsZXRlSXQgfSAvPlxuICAgIHtcbiAgICAgIGluZGV4ICE9PSAwXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLXVwJykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoLTEpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICB7XG4gICAgICBpbmRleCAhPT0gSURMaXN0Lmxlbmd0aCAtIDFcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtZG93bicpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KDEpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICB7XG4gICAgICBpbmRleCAhPT0gMFxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS10by1maXJzdCcpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KC1JbmZpbml0eSkgfVxuICAgICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIHtcbiAgICAgIGluZGV4ICE9PSBJRExpc3QubGVuZ3RoIC0gMVxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS10by1sYXN0JykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoSW5maW5pdHkpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgPC9kaXY+LFxuXSk7XG5cbmV4cG9ydCBjb25zdCBncm91cHNBUEkgPSAoe1xuICBncm91cHMsXG4gIHJlbmRlcixcbiAgc2V0SUQsXG4gIGdldElELFxufSkgPT4gbWFwT2JqZWN0KGdyb3VwcywgKGZvcm1OYW1lLCBncm91cFZhbHVlKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBDb20sXG4gICAgZmllbGQsXG4gICAgbmVlZERyYWcsXG4gICAgY2xlYXJNb3Rpb25zLFxuICAgIHByZXNzZWRNb3Rpb25zLFxuICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgIGNyZWF0ZVN0eWxlLFxuICAgIElEUmVmTWFwLFxuICAgIElETGlzdCxcbiAgICBGb3JtLFxuICAgIGZvcm1Qcm9wcyA9IHt9LFxuICB9ID0gZ3JvdXBWYWx1ZTtcblxuICBjb25zdCBhZGRJdGVtID0gKFxuICAgIGFkZCA9IGRpbm9Gb3JtQWRkSXRlbSxcbiAgKSA9PiBhZGQoe1xuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgZGVsZXRlSXRlbSA9IChcbiAgICBJRCxcbiAgICBkZWxldGVJdGVtRnVuID0gZGlub0Zvcm1EZWxldGVJdGVtLFxuICApID0+IGRlbGV0ZUl0ZW1GdW4oe1xuICAgIElELFxuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgbW92ZUl0ZW0gPSAoXG4gICAgSUQsXG4gICAgb2Zmc2V0LFxuICAgIG1vdmUgPSBkaW5vRm9ybU1vdmVJdGVtLFxuICApID0+IG1vdmUoe1xuICAgIElELFxuICAgIG9mZnNldCxcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IGRvQWN0aW9uID0gZnVuID0+IGZ1bih7XG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBtYXBGdW4gPSAobWFwR3JvdXAsIElELCBpbmRleCkgPT4gKFxuICAgIG1hcEdyb3VwKHtcbiAgICAgIElELFxuICAgICAgaW5kZXg6ICtpbmRleCxcbiAgICAgIENvbSxcbiAgICAgIGZpZWxkLFxuICAgICAgSURSZWZNYXAsXG4gICAgICBJRExpc3QsXG4gICAgICBGb3JtOiB7XG4gICAgICAgIEZvcm1Db206IEZvcm0sXG4gICAgICAgIGZvcm1Qcm9wczoge1xuICAgICAgICAgIC4uLmZvcm1Qcm9wcyxcbiAgICAgICAgICAuLi4oKGdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdIHx8IHt9KS5wcm9wcyB8fCB7fSksXG4gICAgICAgICAgSUQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZGVsZXRlSXQ6ICgpID0+IGRlbGV0ZUl0ZW0oSUQpLFxuICAgICAgbW92ZUl0OiBvZmZzZXQgPT4gbW92ZUl0ZW0oSUQsIG9mZnNldCksXG4gICAgICBmb3JtUHJvcHMsXG4gICAgfSlcbiAgKTtcblxuICBjb25zdCBncm91cCA9IHtcbiAgICBJRExpc3QsXG4gICAgZHJhZ01hcDogKG1hcEdyb3VwID0gZGlub0Zvcm1NYXBHcm91cCkgPT4gKFxuICAgICAgSURMaXN0Lmxlbmd0aCA+IDAgLy8gdG9kbyBzdHlsZSBjb25maWdcbiAgICAgICAgPyAoXG4gICAgICAgICAgPERyYWdcbiAgICAgICAgICAgIG9yZGVyPXsgWy4uLklETGlzdF0gfVxuICAgICAgICAgICAgbGFzdEFjdGlvbk1vdmVJRD17IGdyb3VwVmFsdWUubGFzdEFjdGlvbk1vdmVJRCB9XG4gICAgICAgICAgICBsYXN0TW92ZUlEPXsgZ3JvdXBWYWx1ZS5sYXN0TW92ZUlEIH1cbiAgICAgICAgICAgIGNsZWFyTW90aW9ucz17IGNsZWFyTW90aW9ucyB9XG4gICAgICAgICAgICBwcmVzc2VkTW90aW9ucz17IHByZXNzZWRNb3Rpb25zIH1cbiAgICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zPXsgbm90UHJlc3NlZE1vdGlvbnMgfVxuICAgICAgICAgICAgY3JlYXRlU3R5bGU9eyBjcmVhdGVTdHlsZSB9XG4gICAgICAgICAgICBjaGFuZ2VEb25lPXsgKG5ld0lETGlzdCkgPT4ge1xuICAgICAgICAgICAgICBncm91cFZhbHVlLklETGlzdCA9IFsuLi5uZXdJRExpc3RdOyByZW5kZXIoKTtcbiAgICAgICAgICAgIH0gfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICBtYXBPYmplY3QoSURMaXN0LCAoaW5kZXgsIElEKSA9PiAoeyBbSURdOiBtYXBGdW4obWFwR3JvdXAsIElELCBpbmRleCkgfSkpXG4gICAgICAgIH1cbiAgICAgICAgICA8L0RyYWc+XG4gICAgICAgICkgOiBudWxsXG4gICAgKSxcbiAgICBtYXA6IChtYXBHcm91cCA9IGRpbm9Gb3JtTWFwR3JvdXApID0+IChcbiAgICAgIElETGlzdC5sZW5ndGggPiAwXG4gICAgICAgID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdtYXAtY29udGFpbmVyJyl9YCB9PlxuICAgICAgICAgICAge1xuICAgICAgICAgIElETGlzdC5tYXAoKElELCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLWl0ZW0td3JhcCcpfWAgfSBrZXk9eyBJRCB9PlxuICAgICAgICAgICAgICB7IG1hcEZ1bihtYXBHcm91cCwgSUQsIGluZGV4KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpXG4gICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGxcbiAgICApLFxuICAgIHJlbmRlcjogKFxuICAgICAgcmVuZGVyR3JvdXAgPSBlbGUgPT4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZ3JvdXAnKX1gIH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLWVsZScpfWAgfT5cbiAgICAgICAgICAgIHtlbGV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tYWRkJykgfVxuICAgICAgICAgICAgb25DbGljaz17ICgpID0+IGFkZEl0ZW0oKSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICksXG4gICAgICAvLyBjaGlsZHJlbiA9IChuZWVkRHJhcCA/IGdyb3VwLmRyYWdNYXAoKSA6IGdyb3VwLm1hcCgpKSxcbiAgICAgIGNoaWxkcmVuID0gKG5lZWREcmFnID8gZ3JvdXAuZHJhZ01hcCgpIDogZ3JvdXAubWFwKCkpLFxuICAgICkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLXdyYXAnKX1gIH0+XG4gICAgICAgIHtyZW5kZXJHcm91cChjaGlsZHJlbil9XG4gICAgICA8L2Rpdj5cbiAgICApLFxuICAgIGFkZEl0ZW0sXG4gICAgZGVsZXRlSXRlbSxcbiAgICBtb3ZlSXRlbSxcbiAgICBkb0FjdGlvbixcbiAgfTtcblxuICByZXR1cm4geyBbZm9ybU5hbWVdOiBncm91cCB9O1xufSk7XG5cbmV4cG9ydCBjb25zdCBzdWJGb3Jtc0FQSSA9ICh7IHN1YkZvcm1zIH0gPSB7fSkgPT4gbWFwT2JqZWN0KHN1YkZvcm1zLCAoZm9ybU5hbWUsIHsgRm9ybSB9KSA9PiAoe1xuICBbZm9ybU5hbWVdOiBGb3JtLFxufSkpO1xuIl19