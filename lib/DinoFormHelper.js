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

        if ((0, _util.isExist)(ID)) {
          console.error('[dino-form] props ID not found, look like you forget give a ID in map function');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUhlbHBlci5qc3giXSwibmFtZXMiOlsiZ2V0UmVmIiwiZ2V0RnVuIiwidGltZW91dCIsInJlZiIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJjb25zb2xlIiwid2FybiIsInVuZGVmaW5lZCIsImNyZWF0ZUZyYWdtZW50cyIsImZyYWdtZW50cyIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY29tTmFtZSIsIkNvbSIsInByb3BzIiwiQ29tcG9uZW50IiwiY3JlYXRlRnJvbUl0ZW0iLCJjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCIsInNldElEUmVmTWFwIiwidG9wRm9ybVJlbmRlciIsIklEIiwiaW5kZXgiLCJlcnJvciIsImNhdGNoUmVmIiwiY2hlY2tJRCIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsInN1YkZvcm1zIiwiZm9ybU5hbWUiLCJmb3JtIiwiRm9ybSIsImZpZWxkIiwiZm9ybVByb3BzIiwic3ViRm9ybSIsImRpbm9Gb3JtQWRkSXRlbSIsImdldEdyb3VwIiwic2V0SUQiLCJnZXRJRCIsInJlbmRlciIsIklETGlzdCIsInB1c2giLCJkaW5vRm9ybURlbGV0ZUl0ZW0iLCJkZWxldGVJRCIsImdyb3VwIiwiZmlsdGVyIiwiZGlub0Zvcm1Nb3ZlSXRlbSIsIm9mZnNldCIsImluZGV4T2YiLCJsYXN0QWN0aW9uTW92ZUlEIiwiSW5maW5pdHkiLCJsYXN0TW92ZUlEIiwic3BsaWNlIiwibGVuZ3RoIiwiZGlub0Zvcm1NYXBHcm91cCIsIkZvcm1Db20iLCJkZWxldGVJdCIsIm1vdmVJdCIsImdyb3Vwc0FQSSIsImdyb3VwcyIsImdyb3VwVmFsdWUiLCJuZWVkRHJhZyIsImNsZWFyTW90aW9ucyIsInByZXNzZWRNb3Rpb25zIiwibm90UHJlc3NlZE1vdGlvbnMiLCJjcmVhdGVTdHlsZSIsIklEUmVmTWFwIiwiYWRkSXRlbSIsImFkZCIsImRlbGV0ZUl0ZW0iLCJkZWxldGVJdGVtRnVuIiwibW92ZUl0ZW0iLCJtb3ZlIiwiZG9BY3Rpb24iLCJmdW4iLCJtYXBGdW4iLCJtYXBHcm91cCIsImRyYWdNYXAiLCJuZXdJRExpc3QiLCJtYXAiLCJyZW5kZXJHcm91cCIsImVsZSIsImNoaWxkcmVuIiwic3ViRm9ybXNBUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFHQTs7QUFDQTs7U0FFc0JBLE07Ozs7Ozs7NEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNMQyxZQUFBQSxNQURLLDJEQUNJLFlBQU0sQ0FBRSxDQURaO0FBRUxDLFlBQUFBLE9BRkssMkRBRUssR0FGTDtBQUlEQyxZQUFBQSxHQUpDLEdBSUtGLE1BQU0sRUFKWDtBQU1DRyxZQUFBQSxTQU5ELEdBTWEsQ0FBQyxJQUFJQyxJQUFKLEVBTmQ7O0FBQUE7QUFBQSxpQkFRRSxDQVJGO0FBQUE7QUFBQTtBQUFBOztBQVNHQyxZQUFBQSxHQVRILEdBU1MsQ0FBQyxJQUFJRCxJQUFKLEVBVFY7O0FBQUEsa0JBVUNDLEdBQUcsR0FBR0YsU0FBTixHQUFrQkYsT0FWbkI7QUFBQTtBQUFBO0FBQUE7O0FBV0RLLFlBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLHVEQUFiO0FBWEMsNkNBWU1DLFNBWk47O0FBQUE7QUFBQTtBQUFBLG1CQWNHLGtCQWRIOztBQUFBO0FBZ0JITixZQUFBQSxHQUFHLEdBQUdGLE1BQU0sRUFBWjs7QUFoQkcsaUJBa0JDRSxHQWxCRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSw2Q0FxQkVBLEdBckJGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUF3QkEsSUFBTU8sZUFBZSxHQUFHLFNBQWxCQSxlQUFrQjtBQUFBLE1BQUdDLFNBQUgsUUFBR0EsU0FBSDtBQUFBLE1BQWNDLGlCQUFkLFFBQWNBLGlCQUFkO0FBQUEsU0FDN0IscUJBQVVELFNBQVYsRUFBcUIs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QUQ7QUFBQSxRQUFhRSxJQUFiLFVBQWFBLElBQWI7QUFBQSw2Q0FDbkVGLFFBRG1FLEVBQ3hERSxJQUR3RDtBQUFBLEdBQXBCLENBQXZCO0FBQUEsQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgcHJlZml4LCBtYXBPYmplY3QsIHNsZWVwLCBpc0V4aXN0LFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IERpbm9Gb3JtSXRlbSBmcm9tICcuL0Rpbm9Gb3JtSXRlbSc7XG5pbXBvcnQgRHJhZyBmcm9tICcuL0RyYWcnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmVmKFxuICBnZXRGdW4gPSAoKSA9PiB7fSxcbiAgdGltZW91dCA9IDUwMCxcbikge1xuICBsZXQgcmVmID0gZ2V0RnVuKCk7XG5cbiAgY29uc3Qgc3RhcnRUaW1lID0gK25ldyBEYXRlKCk7XG5cbiAgd2hpbGUgKDEpIHtcbiAgICBjb25zdCBub3cgPSArbmV3IERhdGUoKTtcbiAgICBpZiAobm93IC0gc3RhcnRUaW1lID4gdGltZW91dCkge1xuICAgICAgY29uc29sZS53YXJuKCdbZGluby1mb3JtXSBnZXQgcmVmIHRpbWVvdXQsIG1heWJlIHlvdSBub3QgcmVuZGVyIGl0LicpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgYXdhaXQgc2xlZXAoKTtcblxuICAgIHJlZiA9IGdldEZ1bigpO1xuXG4gICAgaWYgKHJlZikgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gcmVmO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlRnJhZ21lbnRzID0gKHsgZnJhZ21lbnRzLCBjcmVhdGVEaW5vRm9ybUFwaSB9KSA9PiAoXG4gIG1hcE9iamVjdChmcmFnbWVudHMsIChjb21OYW1lLCB7IENvbSwgLi4ucHJvcHMgfSA9IHt9KSA9PiAoe1xuICAgIFtjb21OYW1lXTogT2JqZWN0LmFzc2lnbihcbiAgICAgIGNsYXNzIEZyYWdtZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q29tXG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsgY3JlYXRlRGlub0Zvcm1BcGkoKSB9XG4gICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICB7IC4uLih0aGlzLnByb3BzIHx8IHt9KSB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb3BzLFxuICAgICksXG4gIH0pKVxuKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUZyb21JdGVtID0gKHsgY3JlYXRlRGlub0Zvcm1BcGkgfSkgPT4gKFxuICBjbGFzcyBEaW5vRm9ybUl0ZW1XcmFwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RGlub0Zvcm1JdGVtXG4gICAgICAgICAgZGlub0Zvcm09eyBjcmVhdGVEaW5vRm9ybUFwaSgpIH1cbiAgICAgICAgICB7IC4uLih0aGlzLnByb3BzIHx8IHt9KSB9XG4gICAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG4pO1xuXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCA9ICh7XG4gIHNldElEUmVmTWFwLCBDb20sIHRvcEZvcm1SZW5kZXIsXG59KSA9PiAoXG4gIGNsYXNzIERpbm9Gb3JtV3JhcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIHRoaXMuQ29tID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNoZWNrSUQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IElELCBpbmRleCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChpc0V4aXN0KElEKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbZGluby1mb3JtXSBwcm9wcyBJRCBub3QgZm91bmQsIGxvb2sgbGlrZSB5b3UgZm9yZ2V0IGdpdmUgYSBJRCBpbiBtYXAgZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5jaGVja0lEKCk7XG4gICAgICBzZXRJRFJlZk1hcChJRCwgeyByZWY6IHRoaXMuQ29tIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgY29uc3QgeyBJRCwgaW5kZXggfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLmNoZWNrSUQoKTtcbiAgICAgIHNldElEUmVmTWFwKElELCB7IHJlZjogdW5kZWZpbmVkIH0pO1xuICAgIH1cblxuICAgIGNhdGNoUmVmID0gKHJlZikgPT4ge1xuICAgICAgY29uc3QgeyBJRCwgY2F0Y2hSZWYgPSAoKSA9PiB7fSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHRoaXMuQ29tID0gcmVmO1xuICAgICAgY2F0Y2hSZWYocmVmKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7IElELCBpbmRleCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb21cbiAgICAgICAgICBJRD17IElEIH1cbiAgICAgICAgICBpbmRleD17IGluZGV4IH1cbiAgICAgICAgICByZWY9eyB0aGlzLmNhdGNoUmVmIH1cbiAgICAgICAgICB0b3BGb3JtUmVuZGVyPXsgdG9wRm9ybVJlbmRlciB9XG4gICAgICAgICAgc3ViR3JvdXBGb3JtXG4gICAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRGlub0Zvcm1TdWJGb3JtID0gc3ViRm9ybXMgPT4gKFxuICBtYXBPYmplY3Qoc3ViRm9ybXMsIChmb3JtTmFtZSwgZm9ybSkgPT4ge1xuICAgIGNvbnN0IHsgRm9ybSwgZmllbGQsIGZvcm1Qcm9wcyA9IHt9IH0gPSBmb3JtO1xuICAgIGNvbnN0IHN1YkZvcm0gPSB7XG4gICAgICBmaWVsZCxcbiAgICAgIGZvcm1Qcm9wcyxcbiAgICAgIHJlZjogdW5kZWZpbmVkLFxuICAgICAgRm9ybTogY2xhc3MgRGlub1N1YkZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb3JtXG4gICAgICAgICAgICAgIHsgLi4uZm9ybVByb3BzIH1cbiAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgICAgcmVmPXsgKHJlZikgPT4geyBzdWJGb3JtLnJlZiA9IHJlZjsgfSB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBbZm9ybU5hbWVdOiBzdWJGb3JtLFxuICAgIH07XG4gIH0pXG4pO1xuXG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybUFkZEl0ZW0gPSAoe1xuICBnZXRHcm91cCxcbiAgc2V0SUQsXG4gIGdldElELFxuICByZW5kZXIsXG59KSA9PiB7XG4gIGNvbnN0IElEID0gZ2V0SUQoKTtcbiAgZ2V0R3JvdXAoKS5JRExpc3QucHVzaChJRCk7XG4gIHNldElEKElEICsgMSk7XG4gIHJlbmRlcigpO1xuICByZXR1cm4gSUQ7XG59O1xuXG5leHBvcnQgY29uc3QgZGlub0Zvcm1EZWxldGVJdGVtID0gKHsgSUQ6IGRlbGV0ZUlELCBnZXRHcm91cCwgcmVuZGVyIH0pID0+IHtcbiAgY29uc3QgZ3JvdXAgPSBnZXRHcm91cCgpO1xuICBncm91cC5JRExpc3QgPSBncm91cC5JRExpc3QuZmlsdGVyKElEID0+IElEICE9PSBkZWxldGVJRCk7XG4gIHJlbmRlcigpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtTW92ZUl0ZW0gPSAoe1xuICBJRCwgb2Zmc2V0LCBnZXRHcm91cCwgcmVuZGVyLFxufSkgPT4ge1xuICBjb25zdCBncm91cCA9IGdldEdyb3VwKCk7XG4gIGNvbnN0IGluZGV4ID0gZ3JvdXAuSURMaXN0LmluZGV4T2YoSUQpO1xuICBncm91cC5sYXN0QWN0aW9uTW92ZUlEID0gSUQ7XG5cbiAgaWYgKG9mZnNldCA9PT0gLUluZmluaXR5KSB7XG4gICAgZ3JvdXAubGFzdE1vdmVJRCA9IGdyb3VwLklETGlzdFswXTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKDAsIDAsIElEKTtcbiAgfSBlbHNlIGlmIChvZmZzZXQgPT09IEluZmluaXR5KSB7XG4gICAgZ3JvdXAubGFzdE1vdmVJRCA9IGdyb3VwLklETGlzdFtncm91cC5JRExpc3QubGVuZ3RoIC0gMV07XG4gICAgZ3JvdXAuSURMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgZ3JvdXAuSURMaXN0LnNwbGljZShncm91cC5JRExpc3QubGVuZ3RoLCAwLCBJRCk7XG4gIH0gZWxzZSB7XG4gICAgZ3JvdXAubGFzdE1vdmVJRCA9IGdyb3VwLklETGlzdFtpbmRleCArIG9mZnNldF07XG4gICAgZ3JvdXAuSURMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgZ3JvdXAuSURMaXN0LnNwbGljZShpbmRleCArIG9mZnNldCwgMCwgSUQpO1xuICB9XG5cbiAgcmVuZGVyKCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybU1hcEdyb3VwID0gKHtcbiAgRm9ybToge1xuICAgIEZvcm1Db20sXG4gICAgZm9ybVByb3BzLFxuICB9LFxuICBJRCxcbiAgSURMaXN0LFxuICBpbmRleCxcbiAgZGVsZXRlSXQsXG4gIG1vdmVJdCxcbn0pID0+IChbXG4gIDxGb3JtQ29tIHsgLi4uZm9ybVByb3BzIH0ga2V5PXsgSUQgfSAvPixcbiAgPGRpdiBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbnMnKSB9IGtleT1cImdyb3VwLWFjdGlvbnNcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLWRlbGV0ZScpIH0gb25DbGljaz17IGRlbGV0ZUl0IH0gLz5cbiAgICB7XG4gICAgICBpbmRleCAhPT0gMFxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS11cCcpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KC0xKSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAge1xuICAgICAgaW5kZXggIT09IElETGlzdC5sZW5ndGggLSAxXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLWRvd24nKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdCgxKSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAge1xuICAgICAgaW5kZXggIT09IDBcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtdG8tZmlyc3QnKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdCgtSW5maW5pdHkpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICB7XG4gICAgICBpbmRleCAhPT0gSURMaXN0Lmxlbmd0aCAtIDFcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtdG8tbGFzdCcpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KEluZmluaXR5KSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gIDwvZGl2Pixcbl0pO1xuXG5leHBvcnQgY29uc3QgZ3JvdXBzQVBJID0gKHtcbiAgZ3JvdXBzLFxuICByZW5kZXIsXG4gIHNldElELFxuICBnZXRJRCxcbn0pID0+IG1hcE9iamVjdChncm91cHMsIChmb3JtTmFtZSwgZ3JvdXBWYWx1ZSkgPT4ge1xuICBjb25zdCB7XG4gICAgQ29tLFxuICAgIGZpZWxkLFxuICAgIG5lZWREcmFnLFxuICAgIGNsZWFyTW90aW9ucyxcbiAgICBwcmVzc2VkTW90aW9ucyxcbiAgICBub3RQcmVzc2VkTW90aW9ucyxcbiAgICBjcmVhdGVTdHlsZSxcbiAgICBJRFJlZk1hcCxcbiAgICBJRExpc3QsXG4gICAgRm9ybSxcbiAgICBmb3JtUHJvcHMgPSB7fSxcbiAgfSA9IGdyb3VwVmFsdWU7XG5cbiAgY29uc3QgYWRkSXRlbSA9IChcbiAgICBhZGQgPSBkaW5vRm9ybUFkZEl0ZW0sXG4gICkgPT4gYWRkKHtcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IGRlbGV0ZUl0ZW0gPSAoXG4gICAgSUQsXG4gICAgZGVsZXRlSXRlbUZ1biA9IGRpbm9Gb3JtRGVsZXRlSXRlbSxcbiAgKSA9PiBkZWxldGVJdGVtRnVuKHtcbiAgICBJRCxcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IG1vdmVJdGVtID0gKFxuICAgIElELFxuICAgIG9mZnNldCxcbiAgICBtb3ZlID0gZGlub0Zvcm1Nb3ZlSXRlbSxcbiAgKSA9PiBtb3ZlKHtcbiAgICBJRCxcbiAgICBvZmZzZXQsXG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBkb0FjdGlvbiA9IGZ1biA9PiBmdW4oe1xuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgbWFwRnVuID0gKG1hcEdyb3VwLCBJRCwgaW5kZXgpID0+IChcbiAgICBtYXBHcm91cCh7XG4gICAgICBJRCxcbiAgICAgIGluZGV4OiAraW5kZXgsXG4gICAgICBDb20sXG4gICAgICBmaWVsZCxcbiAgICAgIElEUmVmTWFwLFxuICAgICAgSURMaXN0LFxuICAgICAgRm9ybToge1xuICAgICAgICBGb3JtQ29tOiBGb3JtLFxuICAgICAgICBmb3JtUHJvcHM6IHtcbiAgICAgICAgICAuLi5mb3JtUHJvcHMsXG4gICAgICAgICAgLi4uKChncm91cHNbZm9ybU5hbWVdLklEUmVmTWFwW0lEXSB8fCB7fSkucHJvcHMgfHwge30pLFxuICAgICAgICAgIElELFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGRlbGV0ZUl0OiAoKSA9PiBkZWxldGVJdGVtKElEKSxcbiAgICAgIG1vdmVJdDogb2Zmc2V0ID0+IG1vdmVJdGVtKElELCBvZmZzZXQpLFxuICAgICAgZm9ybVByb3BzLFxuICAgIH0pXG4gICk7XG5cbiAgY29uc3QgZ3JvdXAgPSB7XG4gICAgSURMaXN0LFxuICAgIGRyYWdNYXA6IChtYXBHcm91cCA9IGRpbm9Gb3JtTWFwR3JvdXApID0+IChcbiAgICAgIElETGlzdC5sZW5ndGggPiAwIC8vIHRvZG8gc3R5bGUgY29uZmlnXG4gICAgICAgID8gKFxuICAgICAgICAgIDxEcmFnXG4gICAgICAgICAgICBvcmRlcj17IFsuLi5JRExpc3RdIH1cbiAgICAgICAgICAgIGxhc3RBY3Rpb25Nb3ZlSUQ9eyBncm91cFZhbHVlLmxhc3RBY3Rpb25Nb3ZlSUQgfVxuICAgICAgICAgICAgbGFzdE1vdmVJRD17IGdyb3VwVmFsdWUubGFzdE1vdmVJRCB9XG4gICAgICAgICAgICBjbGVhck1vdGlvbnM9eyBjbGVhck1vdGlvbnMgfVxuICAgICAgICAgICAgcHJlc3NlZE1vdGlvbnM9eyBwcmVzc2VkTW90aW9ucyB9XG4gICAgICAgICAgICBub3RQcmVzc2VkTW90aW9ucz17IG5vdFByZXNzZWRNb3Rpb25zIH1cbiAgICAgICAgICAgIGNyZWF0ZVN0eWxlPXsgY3JlYXRlU3R5bGUgfVxuICAgICAgICAgICAgY2hhbmdlRG9uZT17IChuZXdJRExpc3QpID0+IHtcbiAgICAgICAgICAgICAgZ3JvdXBWYWx1ZS5JRExpc3QgPSBbLi4ubmV3SURMaXN0XTsgcmVuZGVyKCk7XG4gICAgICAgICAgICB9IH0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgbWFwT2JqZWN0KElETGlzdCwgKGluZGV4LCBJRCkgPT4gKHsgW0lEXTogbWFwRnVuKG1hcEdyb3VwLCBJRCwgaW5kZXgpIH0pKVxuICAgICAgICB9XG4gICAgICAgICAgPC9EcmFnPlxuICAgICAgICApIDogbnVsbFxuICAgICksXG4gICAgbWFwOiAobWFwR3JvdXAgPSBkaW5vRm9ybU1hcEdyb3VwKSA9PiAoXG4gICAgICBJRExpc3QubGVuZ3RoID4gMFxuICAgICAgICA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnbWFwLWNvbnRhaW5lcicpfWAgfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICBJRExpc3QubWFwKChJRCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1pdGVtLXdyYXAnKX1gIH0ga2V5PXsgSUQgfT5cbiAgICAgICAgICAgICAgeyBtYXBGdW4obWFwR3JvdXAsIElELCBpbmRleCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKVxuICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsXG4gICAgKSxcbiAgICByZW5kZXI6IChcbiAgICAgIHJlbmRlckdyb3VwID0gZWxlID0+IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwJyl9YCB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1lbGUnKX1gIH0+XG4gICAgICAgICAgICB7ZWxlfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLWFkZCcpIH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBhZGRJdGVtKCkgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApLFxuICAgICAgLy8gY2hpbGRyZW4gPSAobmVlZERyYXAgPyBncm91cC5kcmFnTWFwKCkgOiBncm91cC5tYXAoKSksXG4gICAgICBjaGlsZHJlbiA9IChuZWVkRHJhZyA/IGdyb3VwLmRyYWdNYXAoKSA6IGdyb3VwLm1hcCgpKSxcbiAgICApID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC13cmFwJyl9YCB9PlxuICAgICAgICB7cmVuZGVyR3JvdXAoY2hpbGRyZW4pfVxuICAgICAgPC9kaXY+XG4gICAgKSxcbiAgICBhZGRJdGVtLFxuICAgIGRlbGV0ZUl0ZW0sXG4gICAgbW92ZUl0ZW0sXG4gICAgZG9BY3Rpb24sXG4gIH07XG5cbiAgcmV0dXJuIHsgW2Zvcm1OYW1lXTogZ3JvdXAgfTtcbn0pO1xuXG5leHBvcnQgY29uc3Qgc3ViRm9ybXNBUEkgPSAoeyBzdWJGb3JtcyB9ID0ge30pID0+IG1hcE9iamVjdChzdWJGb3JtcywgKGZvcm1OYW1lLCB7IEZvcm0gfSkgPT4gKHtcbiAgW2Zvcm1OYW1lXTogRm9ybSxcbn0pKTtcbiJdfQ==