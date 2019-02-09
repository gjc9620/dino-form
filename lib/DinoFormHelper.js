"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subFormsAPI = exports.groupsAPI = exports.dinoFormMapGroup = exports.dinoFormMoveItem = exports.dinoFormDeleteItem = exports.dinoFormAddItem = exports.createDinoFormSubForm = exports.createDinoFormGroupWrap = exports.createFromItem = exports.createFragments = exports.dinoFormGetGroupRef = void 0;

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

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _util = require("./util");

var _DinoFormItem = _interopRequireDefault(require("./DinoFormItem"));

var _Drag = _interopRequireDefault(require("./Drag"));

var dinoFormGetGroupRef =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var _ref2,
        group,
        index,
        ID,
        render,
        IDRefMap,
        IDList,
        formName,
        _IDRefMap$ID,
        ref,
        _,
        reTryRefCount,
        _IDRefMap$ID2,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, group = _ref2.group, index = _ref2.index, ID = _ref2.ID, render = _ref2.render;
            IDRefMap = group.IDRefMap, IDList = group.IDList, formName = group.formName;
            _IDRefMap$ID = IDRefMap[ID];
            _IDRefMap$ID = _IDRefMap$ID === void 0 ? {} : _IDRefMap$ID;
            ref = _IDRefMap$ID.ref; // const

            _ = 3, reTryRefCount = _.reTryRefCount;

          case 6:
            if (!(!ref && reTryRefCount-- > 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 9;
            return render();

          case 9:
            _IDRefMap$ID2 = IDRefMap[ID];
            _IDRefMap$ID2 = _IDRefMap$ID2 === void 0 ? {} : _IDRefMap$ID2;
            ref = _IDRefMap$ID2.ref;
            _context.next = 6;
            break;

          case 14:
            return _context.abrupt("return", ref);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function dinoFormGetGroupRef() {
    return _ref.apply(this, arguments);
  };
}();

exports.dinoFormGetGroupRef = dinoFormGetGroupRef;

var createFragments = function createFragments(_ref3) {
  var fragments = _ref3.fragments,
      createDinoFormApi = _ref3.createDinoFormApi;
  return (0, _util.mapObject)(fragments, function (comName) {
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        Com = _ref4.Com,
        props = (0, _objectWithoutProperties2.default)(_ref4, ["Com"]);

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

var createFromItem = function createFromItem(_ref6) {
  var createDinoFormApi = _ref6.createDinoFormApi;
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

var createDinoFormGroupWrap = function createDinoFormGroupWrap(_ref7) {
  var _temp;

  var setIDRefMap = _ref7.setIDRefMap,
      Com = _ref7.Com,
      topFormRender = _ref7.topFormRender;
  return _temp =
  /*#__PURE__*/
  function (_Component3) {
    (0, _inherits2.default)(DinoFormWrap, _Component3);

    function DinoFormWrap(props) {
      var _this;

      (0, _classCallCheck2.default)(this, DinoFormWrap);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DinoFormWrap).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "catchRef", function (ref) {
        var _this$props = _this.props,
            ID = _this$props.ID,
            _this$props$catchRef = _this$props.catchRef,
            catchRef = _this$props$catchRef === void 0 ? function () {} : _this$props$catchRef;
        _this.Com = ref;
        catchRef(ref);
      });
      _this.Com = undefined;
      return _this;
    }

    (0, _createClass2.default)(DinoFormWrap, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$props2 = this.props,
            ID = _this$props2.ID,
            index = _this$props2.index;
        setIDRefMap(ID, {
          ref: this.Com
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this$props3 = this.props,
            ID = _this$props3.ID,
            index = _this$props3.index;
        setIDRefMap(ID, {
          ref: undefined
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            ID = _this$props4.ID,
            index = _this$props4.index;
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
              ref: function ref(_ref8) {
                subForm.ref = _ref8;
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

var dinoFormAddItem = function dinoFormAddItem(_ref10) {
  var getGroup = _ref10.getGroup,
      setID = _ref10.setID,
      getID = _ref10.getID,
      render = _ref10.render;
  var ID = getID();
  getGroup().IDList.push(ID);
  setID(ID + 1);
  render();
  return ID;
};

exports.dinoFormAddItem = dinoFormAddItem;

var dinoFormDeleteItem = function dinoFormDeleteItem(_ref11) {
  var deleteID = _ref11.ID,
      getGroup = _ref11.getGroup,
      render = _ref11.render;
  var group = getGroup();
  group.IDList = group.IDList.filter(function (ID) {
    return ID !== deleteID;
  });
  render();
};

exports.dinoFormDeleteItem = dinoFormDeleteItem;

var dinoFormMoveItem = function dinoFormMoveItem(_ref12) {
  var ID = _ref12.ID,
      offset = _ref12.offset,
      getGroup = _ref12.getGroup,
      render = _ref12.render;
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

var dinoFormMapGroup = function dinoFormMapGroup(_ref13) {
  var _ref13$Form = _ref13.Form,
      FormCom = _ref13$Form.FormCom,
      formProps = _ref13$Form.formProps,
      ID = _ref13.ID,
      IDList = _ref13.IDList,
      index = _ref13.index,
      deleteIt = _ref13.deleteIt,
      moveIt = _ref13.moveIt;
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

var groupsAPI = function groupsAPI(_ref14) {
  var groups = _ref14.groups,
      render = _ref14.render,
      setID = _ref14.setID,
      getID = _ref14.getID;
  return (0, _util.mapObject)(groups, function (formName, groupValue) {
    var Com = groupValue.Com,
        field = groupValue.field,
        needDrag = groupValue.needDrag,
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
        return IDList.length > 0 ? _react.default.createElement(_Drag.default, {
          order: (0, _toConsumableArray2.default)(IDList),
          lastActionMoveID: groupValue.lastActionMoveID,
          lastMoveID: groupValue.lastMoveID,
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
  var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      subForms = _ref17.subForms;

  return (0, _util.mapObject)(subForms, function (formName, _ref18) {
    var Form = _ref18.Form;
    return (0, _defineProperty2.default)({}, formName, Form);
  });
};

exports.subFormsAPI = subFormsAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUhlbHBlci5qc3giXSwibmFtZXMiOlsiZGlub0Zvcm1HZXRHcm91cFJlZiIsImdyb3VwIiwiaW5kZXgiLCJJRCIsInJlbmRlciIsIklEUmVmTWFwIiwiSURMaXN0IiwiZm9ybU5hbWUiLCJyZWYiLCJyZVRyeVJlZkNvdW50IiwiY3JlYXRlRnJhZ21lbnRzIiwiZnJhZ21lbnRzIiwiY3JlYXRlRGlub0Zvcm1BcGkiLCJjb21OYW1lIiwiQ29tIiwicHJvcHMiLCJDb21wb25lbnQiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwic2V0SURSZWZNYXAiLCJ0b3BGb3JtUmVuZGVyIiwiY2F0Y2hSZWYiLCJ1bmRlZmluZWQiLCJjcmVhdGVEaW5vRm9ybVN1YkZvcm0iLCJzdWJGb3JtcyIsImZvcm0iLCJGb3JtIiwiZmllbGQiLCJmb3JtUHJvcHMiLCJzdWJGb3JtIiwiZGlub0Zvcm1BZGRJdGVtIiwiZ2V0R3JvdXAiLCJzZXRJRCIsImdldElEIiwicHVzaCIsImRpbm9Gb3JtRGVsZXRlSXRlbSIsImRlbGV0ZUlEIiwiZmlsdGVyIiwiZGlub0Zvcm1Nb3ZlSXRlbSIsIm9mZnNldCIsImluZGV4T2YiLCJsYXN0QWN0aW9uTW92ZUlEIiwiSW5maW5pdHkiLCJsYXN0TW92ZUlEIiwic3BsaWNlIiwibGVuZ3RoIiwiZGlub0Zvcm1NYXBHcm91cCIsIkZvcm1Db20iLCJkZWxldGVJdCIsIm1vdmVJdCIsImdyb3Vwc0FQSSIsImdyb3VwcyIsImdyb3VwVmFsdWUiLCJuZWVkRHJhZyIsImFkZEl0ZW0iLCJhZGQiLCJkZWxldGVJdGVtIiwiZGVsZXRlSXRlbUZ1biIsIm1vdmVJdGVtIiwibW92ZSIsImRvQWN0aW9uIiwiZnVuIiwibWFwRnVuIiwibWFwR3JvdXAiLCJkcmFnTWFwIiwibmV3SURMaXN0IiwibWFwIiwicmVuZGVyR3JvdXAiLCJlbGUiLCJjaGlsZHJlbiIsInN1YkZvcm1zQVBJIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFTyxJQUFNQSxtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRFQUFzQyxFQUF0QyxFQUFTQyxLQUFULFNBQVNBLEtBQVQsRUFBZ0JDLEtBQWhCLFNBQWdCQSxLQUFoQixFQUF1QkMsRUFBdkIsU0FBdUJBLEVBQXZCLEVBQTJCQyxNQUEzQixTQUEyQkEsTUFBM0I7QUFDekJDLFlBQUFBLFFBRHlCLEdBQ01KLEtBRE4sQ0FDekJJLFFBRHlCLEVBQ2ZDLE1BRGUsR0FDTUwsS0FETixDQUNmSyxNQURlLEVBQ1BDLFFBRE8sR0FDTU4sS0FETixDQUNQTSxRQURPO0FBQUEsMkJBTzdCRixRQVA2QixDQUk5QkYsRUFKOEI7QUFBQSxxREFNM0IsRUFOMkI7QUFLN0JLLFlBQUFBLEdBTDZCLGdCQUs3QkEsR0FMNkIsRUFRakM7O0FBUmlDLGdCQVNULENBVFMsRUFTM0JDLGFBVDJCLEtBUzNCQSxhQVQyQjs7QUFBQTtBQUFBLGtCQVcxQixDQUFDRCxHQUFELElBQVFDLGFBQWEsS0FBSyxDQVhBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBWXpCTCxNQUFNLEVBWm1COztBQUFBO0FBQUEsNEJBaUIzQkMsUUFqQjJCLENBYzVCRixFQWQ0QjtBQUFBLHVEQWdCekIsRUFoQnlCO0FBZTNCSyxZQUFBQSxHQWYyQixpQkFlM0JBLEdBZjJCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDZDQW9CMUJBLEdBcEIwQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFuQlIsbUJBQW1CO0FBQUE7QUFBQTtBQUFBLEdBQXpCOzs7O0FBdUJBLElBQU1VLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0I7QUFBQSxNQUFHQyxTQUFILFNBQUdBLFNBQUg7QUFBQSxNQUFjQyxpQkFBZCxTQUFjQSxpQkFBZDtBQUFBLFNBQzdCLHFCQUFVRCxTQUFWLEVBQXFCLFVBQUNFLE9BQUQ7QUFBQSxvRkFBOEIsRUFBOUI7QUFBQSxRQUFZQyxHQUFaLFNBQVlBLEdBQVo7QUFBQSxRQUFvQkMsS0FBcEI7O0FBQUEsNkNBQ2xCRixPQURrQixFQUNSO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxpQ0FFRTtBQUNQLGlCQUNFLDZCQUFDLEdBQUQ7QUFDRSxZQUFBLFFBQVEsRUFBR0QsaUJBQWlCO0FBRDlCLGFBRU9HLEtBRlAsRUFHUSxLQUFLQSxLQUFMLElBQWMsRUFIdEIsRUFERjtBQU9EO0FBVk07QUFBQTtBQUFBLE1BQ2NDLGdCQURkLEdBWVRELEtBWlMsQ0FEUTtBQUFBLEdBQXJCLENBRDZCO0FBQUEsQ0FBeEI7Ozs7QUFtQkEsSUFBTUUsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQjtBQUFBLE1BQUdMLGlCQUFILFNBQUdBLGlCQUFIO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGlDQUVqQjtBQUNQLGlCQUNFLDZCQUFDLHFCQUFEO0FBQ0UsWUFBQSxRQUFRLEVBQUdBLGlCQUFpQjtBQUQ5QixhQUVRLEtBQUtHLEtBQUwsSUFBYyxFQUZ0QixFQURGO0FBTUQ7QUFUeUI7QUFBQTtBQUFBLE1BQ0dDLGdCQURIO0FBQUE7QUFBQSxDQUF2Qjs7OztBQWNBLElBQU1FLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEI7QUFBQTs7QUFBQSxNQUNyQ0MsV0FEcUMsU0FDckNBLFdBRHFDO0FBQUEsTUFDeEJMLEdBRHdCLFNBQ3hCQSxHQUR3QjtBQUFBLE1BQ25CTSxhQURtQixTQUNuQkEsYUFEbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJbkMsMEJBQVlMLEtBQVosRUFBbUI7QUFBQTs7QUFBQTtBQUNqQixvSEFBTUEsS0FBTjtBQURpQixtSUFlUixVQUFDUCxHQUFELEVBQVM7QUFBQSwwQkFDa0IsTUFBS08sS0FEdkI7QUFBQSxZQUNWWixFQURVLGVBQ1ZBLEVBRFU7QUFBQSwrQ0FDTmtCLFFBRE07QUFBQSxZQUNOQSxRQURNLHFDQUNLLFlBQU0sQ0FBRSxDQURiO0FBRWxCLGNBQUtQLEdBQUwsR0FBV04sR0FBWDtBQUNBYSxRQUFBQSxRQUFRLENBQUNiLEdBQUQsQ0FBUjtBQUNELE9BbkJrQjtBQUVqQixZQUFLTSxHQUFMLEdBQVdRLFNBQVg7QUFGaUI7QUFHbEI7O0FBUGtDO0FBQUE7QUFBQSwwQ0FTZjtBQUFBLDJCQUNJLEtBQUtQLEtBRFQ7QUFBQSxZQUNWWixFQURVLGdCQUNWQSxFQURVO0FBQUEsWUFDTkQsS0FETSxnQkFDTkEsS0FETTtBQUVsQmlCLFFBQUFBLFdBQVcsQ0FBQ2hCLEVBQUQsRUFBSztBQUFFSyxVQUFBQSxHQUFHLEVBQUUsS0FBS007QUFBWixTQUFMLENBQVg7QUFDRDtBQVprQztBQUFBO0FBQUEsNkNBY1o7QUFBQSwyQkFDQyxLQUFLQyxLQUROO0FBQUEsWUFDYlosRUFEYSxnQkFDYkEsRUFEYTtBQUFBLFlBQ1RELEtBRFMsZ0JBQ1RBLEtBRFM7QUFFckJpQixRQUFBQSxXQUFXLENBQUNoQixFQUFELEVBQUs7QUFBRUssVUFBQUEsR0FBRyxFQUFFYztBQUFQLFNBQUwsQ0FBWDtBQUNEO0FBakJrQztBQUFBO0FBQUEsK0JBeUIxQjtBQUFBLDJCQUNlLEtBQUtQLEtBRHBCO0FBQUEsWUFDQ1osRUFERCxnQkFDQ0EsRUFERDtBQUFBLFlBQ0tELEtBREwsZ0JBQ0tBLEtBREw7QUFFUCxlQUNFLDZCQUFDLEdBQUQ7QUFDRSxVQUFBLEVBQUUsRUFBR0MsRUFEUDtBQUVFLFVBQUEsS0FBSyxFQUFHRCxLQUZWO0FBR0UsVUFBQSxHQUFHLEVBQUcsS0FBS21CLFFBSGI7QUFJRSxVQUFBLGFBQWEsRUFBR0QsYUFKbEI7QUFLRSxVQUFBLFlBQVk7QUFMZCxVQURGO0FBU0Q7QUFwQ2tDO0FBQUE7QUFBQSxJQUdWSixnQkFIVTtBQUFBLENBQWhDOzs7O0FBd0NBLElBQU1PLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQUMsUUFBUTtBQUFBLFNBQzNDLHFCQUFVQSxRQUFWLEVBQW9CLFVBQUNqQixRQUFELEVBQVdrQixJQUFYLEVBQW9CO0FBQUEsUUFDOUJDLElBRDhCLEdBQ0VELElBREYsQ0FDOUJDLElBRDhCO0FBQUEsUUFDeEJDLEtBRHdCLEdBQ0VGLElBREYsQ0FDeEJFLEtBRHdCO0FBQUEsMEJBQ0VGLElBREYsQ0FDakJHLFNBRGlCO0FBQUEsUUFDakJBLFNBRGlCLGdDQUNMLEVBREs7QUFFdEMsUUFBTUMsT0FBTyxHQUFHO0FBQ2RGLE1BQUFBLEtBQUssRUFBTEEsS0FEYztBQUVkQyxNQUFBQSxTQUFTLEVBQVRBLFNBRmM7QUFHZHBCLE1BQUFBLEdBQUcsRUFBRWMsU0FIUztBQUlkSSxNQUFBQSxJQUFJO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQ0FDTztBQUNQLG1CQUNFLDZCQUFDLElBQUQsNkJBQ09FLFNBRFAsRUFFTyxLQUFLYixLQUZaO0FBR0UsY0FBQSxHQUFHLEVBQUcsYUFBQ1AsS0FBRCxFQUFTO0FBQUVxQixnQkFBQUEsT0FBTyxDQUFDckIsR0FBUixHQUFjQSxLQUFkO0FBQW9CO0FBSHZDLGVBREY7QUFPRDtBQVRDO0FBQUE7QUFBQSxRQUE0QlEsZ0JBQTVCO0FBSlUsS0FBaEI7QUFnQkEsNkNBQ0dULFFBREgsRUFDY3NCLE9BRGQ7QUFHRCxHQXJCRCxDQUQyQztBQUFBLENBQXRDOzs7O0FBMEJBLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsU0FLekI7QUFBQSxNQUpKQyxRQUlJLFVBSkpBLFFBSUk7QUFBQSxNQUhKQyxLQUdJLFVBSEpBLEtBR0k7QUFBQSxNQUZKQyxLQUVJLFVBRkpBLEtBRUk7QUFBQSxNQURKN0IsTUFDSSxVQURKQSxNQUNJO0FBQ0osTUFBTUQsRUFBRSxHQUFHOEIsS0FBSyxFQUFoQjtBQUNBRixFQUFBQSxRQUFRLEdBQUd6QixNQUFYLENBQWtCNEIsSUFBbEIsQ0FBdUIvQixFQUF2QjtBQUNBNkIsRUFBQUEsS0FBSyxDQUFDN0IsRUFBRSxHQUFHLENBQU4sQ0FBTDtBQUNBQyxFQUFBQSxNQUFNO0FBQ04sU0FBT0QsRUFBUDtBQUNELENBWE07Ozs7QUFhQSxJQUFNZ0Msa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixTQUF3QztBQUFBLE1BQWpDQyxRQUFpQyxVQUFyQ2pDLEVBQXFDO0FBQUEsTUFBdkI0QixRQUF1QixVQUF2QkEsUUFBdUI7QUFBQSxNQUFiM0IsTUFBYSxVQUFiQSxNQUFhO0FBQ3hFLE1BQU1ILEtBQUssR0FBRzhCLFFBQVEsRUFBdEI7QUFDQTlCLEVBQUFBLEtBQUssQ0FBQ0ssTUFBTixHQUFlTCxLQUFLLENBQUNLLE1BQU4sQ0FBYStCLE1BQWIsQ0FBb0IsVUFBQWxDLEVBQUU7QUFBQSxXQUFJQSxFQUFFLEtBQUtpQyxRQUFYO0FBQUEsR0FBdEIsQ0FBZjtBQUNBaEMsRUFBQUEsTUFBTTtBQUNQLENBSk07Ozs7QUFNQSxJQUFNa0MsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixTQUUxQjtBQUFBLE1BREpuQyxFQUNJLFVBREpBLEVBQ0k7QUFBQSxNQURBb0MsTUFDQSxVQURBQSxNQUNBO0FBQUEsTUFEUVIsUUFDUixVQURRQSxRQUNSO0FBQUEsTUFEa0IzQixNQUNsQixVQURrQkEsTUFDbEI7QUFDSixNQUFNSCxLQUFLLEdBQUc4QixRQUFRLEVBQXRCO0FBQ0EsTUFBTTdCLEtBQUssR0FBR0QsS0FBSyxDQUFDSyxNQUFOLENBQWFrQyxPQUFiLENBQXFCckMsRUFBckIsQ0FBZDtBQUNBRixFQUFBQSxLQUFLLENBQUN3QyxnQkFBTixHQUF5QnRDLEVBQXpCOztBQUVBLE1BQUlvQyxNQUFNLEtBQUssQ0FBQ0csUUFBaEIsRUFBMEI7QUFDeEJ6QyxJQUFBQSxLQUFLLENBQUMwQyxVQUFOLEdBQW1CMUMsS0FBSyxDQUFDSyxNQUFOLENBQWEsQ0FBYixDQUFuQjtBQUNBTCxJQUFBQSxLQUFLLENBQUNLLE1BQU4sQ0FBYXNDLE1BQWIsQ0FBb0IxQyxLQUFwQixFQUEyQixDQUEzQjtBQUNBRCxJQUFBQSxLQUFLLENBQUNLLE1BQU4sQ0FBYXNDLE1BQWIsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEJ6QyxFQUExQjtBQUNELEdBSkQsTUFJTyxJQUFJb0MsTUFBTSxLQUFLRyxRQUFmLEVBQXlCO0FBQzlCekMsSUFBQUEsS0FBSyxDQUFDMEMsVUFBTixHQUFtQjFDLEtBQUssQ0FBQ0ssTUFBTixDQUFhTCxLQUFLLENBQUNLLE1BQU4sQ0FBYXVDLE1BQWIsR0FBc0IsQ0FBbkMsQ0FBbkI7QUFDQTVDLElBQUFBLEtBQUssQ0FBQ0ssTUFBTixDQUFhc0MsTUFBYixDQUFvQjFDLEtBQXBCLEVBQTJCLENBQTNCO0FBQ0FELElBQUFBLEtBQUssQ0FBQ0ssTUFBTixDQUFhc0MsTUFBYixDQUFvQjNDLEtBQUssQ0FBQ0ssTUFBTixDQUFhdUMsTUFBakMsRUFBeUMsQ0FBekMsRUFBNEMxQyxFQUE1QztBQUNELEdBSk0sTUFJQTtBQUNMRixJQUFBQSxLQUFLLENBQUMwQyxVQUFOLEdBQW1CMUMsS0FBSyxDQUFDSyxNQUFOLENBQWFKLEtBQUssR0FBR3FDLE1BQXJCLENBQW5CO0FBQ0F0QyxJQUFBQSxLQUFLLENBQUNLLE1BQU4sQ0FBYXNDLE1BQWIsQ0FBb0IxQyxLQUFwQixFQUEyQixDQUEzQjtBQUNBRCxJQUFBQSxLQUFLLENBQUNLLE1BQU4sQ0FBYXNDLE1BQWIsQ0FBb0IxQyxLQUFLLEdBQUdxQyxNQUE1QixFQUFvQyxDQUFwQyxFQUF1Q3BDLEVBQXZDO0FBQ0Q7O0FBRURDLEVBQUFBLE1BQU07QUFDUCxDQXRCTTs7OztBQXlCQSxJQUFNMEMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQjtBQUFBLDJCQUM5QnBCLElBRDhCO0FBQUEsTUFFNUJxQixPQUY0QixlQUU1QkEsT0FGNEI7QUFBQSxNQUc1Qm5CLFNBSDRCLGVBRzVCQSxTQUg0QjtBQUFBLE1BSzlCekIsRUFMOEIsVUFLOUJBLEVBTDhCO0FBQUEsTUFNOUJHLE1BTjhCLFVBTTlCQSxNQU44QjtBQUFBLE1BTzlCSixLQVA4QixVQU85QkEsS0FQOEI7QUFBQSxNQVE5QjhDLFFBUjhCLFVBUTlCQSxRQVI4QjtBQUFBLE1BUzlCQyxNQVQ4QixVQVM5QkEsTUFUOEI7QUFBQSxTQVV6QixDQUNMLDZCQUFDLE9BQUQsNkJBQWNyQixTQUFkO0FBQTBCLElBQUEsR0FBRyxFQUFHekI7QUFBaEMsS0FESyxFQUVMO0FBQUssSUFBQSxTQUFTLEVBQUcsa0JBQU8sZUFBUCxDQUFqQjtBQUEyQyxJQUFBLEdBQUcsRUFBQztBQUEvQyxLQUNFO0FBQUssSUFBQSxTQUFTLEVBQUcsa0JBQU8scUJBQVAsQ0FBakI7QUFBaUQsSUFBQSxPQUFPLEVBQUc2QztBQUEzRCxJQURGLEVBR0k5QyxLQUFLLEtBQUssQ0FBVixJQUVFO0FBQ0UsSUFBQSxTQUFTLEVBQUcsa0JBQU8sc0JBQVAsQ0FEZDtBQUVFLElBQUEsT0FBTyxFQUFHO0FBQUEsYUFBTStDLE1BQU0sQ0FBQyxDQUFDLENBQUYsQ0FBWjtBQUFBO0FBRlosSUFMTixFQVlJL0MsS0FBSyxLQUFLSSxNQUFNLENBQUN1QyxNQUFQLEdBQWdCLENBQTFCLElBRUU7QUFDRSxJQUFBLFNBQVMsRUFBRyxrQkFBTyx3QkFBUCxDQURkO0FBRUUsSUFBQSxPQUFPLEVBQUc7QUFBQSxhQUFNSSxNQUFNLENBQUMsQ0FBRCxDQUFaO0FBQUE7QUFGWixJQWROLEVBcUJJL0MsS0FBSyxLQUFLLENBQVYsSUFFRTtBQUNFLElBQUEsU0FBUyxFQUFHLGtCQUFPLDRCQUFQLENBRGQ7QUFFRSxJQUFBLE9BQU8sRUFBRztBQUFBLGFBQU0rQyxNQUFNLENBQUMsQ0FBQ1AsUUFBRixDQUFaO0FBQUE7QUFGWixJQXZCTixFQThCSXhDLEtBQUssS0FBS0ksTUFBTSxDQUFDdUMsTUFBUCxHQUFnQixDQUExQixJQUVFO0FBQ0UsSUFBQSxTQUFTLEVBQUcsa0JBQU8sMkJBQVAsQ0FEZDtBQUVFLElBQUEsT0FBTyxFQUFHO0FBQUEsYUFBTUksTUFBTSxDQUFDUCxRQUFELENBQVo7QUFBQTtBQUZaLElBaENOLENBRkssQ0FWeUI7QUFBQSxDQUF6Qjs7OztBQXFEQSxJQUFNUSxTQUFTLEdBQUcsU0FBWkEsU0FBWTtBQUFBLE1BQ3ZCQyxNQUR1QixVQUN2QkEsTUFEdUI7QUFBQSxNQUV2Qi9DLE1BRnVCLFVBRXZCQSxNQUZ1QjtBQUFBLE1BR3ZCNEIsS0FIdUIsVUFHdkJBLEtBSHVCO0FBQUEsTUFJdkJDLEtBSnVCLFVBSXZCQSxLQUp1QjtBQUFBLFNBS25CLHFCQUFVa0IsTUFBVixFQUFrQixVQUFDNUMsUUFBRCxFQUFXNkMsVUFBWCxFQUEwQjtBQUFBLFFBRTlDdEMsR0FGOEMsR0FTNUNzQyxVQVQ0QyxDQUU5Q3RDLEdBRjhDO0FBQUEsUUFHOUNhLEtBSDhDLEdBUzVDeUIsVUFUNEMsQ0FHOUN6QixLQUg4QztBQUFBLFFBSTlDMEIsUUFKOEMsR0FTNUNELFVBVDRDLENBSTlDQyxRQUo4QztBQUFBLFFBSzlDaEQsUUFMOEMsR0FTNUMrQyxVQVQ0QyxDQUs5Qy9DLFFBTDhDO0FBQUEsUUFNOUNDLE1BTjhDLEdBUzVDOEMsVUFUNEMsQ0FNOUM5QyxNQU44QztBQUFBLFFBTzlDb0IsSUFQOEMsR0FTNUMwQixVQVQ0QyxDQU85QzFCLElBUDhDO0FBQUEsZ0NBUzVDMEIsVUFUNEMsQ0FROUN4QixTQVI4QztBQUFBLFFBUTlDQSxTQVI4QyxzQ0FRbEMsRUFSa0M7O0FBV2hELFFBQU0wQixPQUFPLEdBQUcsU0FBVkEsT0FBVTtBQUFBLFVBQ2RDLEdBRGMsdUVBQ1J6QixlQURRO0FBQUEsYUFFWHlCLEdBQUcsQ0FBQztBQUNQeEIsUUFBQUEsUUFBUSxFQUFFO0FBQUEsaUJBQU1xQixVQUFOO0FBQUEsU0FESDtBQUVQcEIsUUFBQUEsS0FBSyxFQUFMQSxLQUZPO0FBR1BDLFFBQUFBLEtBQUssRUFBTEEsS0FITztBQUlQN0IsUUFBQUEsTUFBTSxFQUFOQTtBQUpPLE9BQUQsQ0FGUTtBQUFBLEtBQWhCOztBQVNBLFFBQU1vRCxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUNqQnJELEVBRGlCO0FBQUEsVUFFakJzRCxhQUZpQix1RUFFRHRCLGtCQUZDO0FBQUEsYUFHZHNCLGFBQWEsQ0FBQztBQUNqQnRELFFBQUFBLEVBQUUsRUFBRkEsRUFEaUI7QUFFakI0QixRQUFBQSxRQUFRLEVBQUU7QUFBQSxpQkFBTXFCLFVBQU47QUFBQSxTQUZPO0FBR2pCcEIsUUFBQUEsS0FBSyxFQUFMQSxLQUhpQjtBQUlqQkMsUUFBQUEsS0FBSyxFQUFMQSxLQUppQjtBQUtqQjdCLFFBQUFBLE1BQU0sRUFBTkE7QUFMaUIsT0FBRCxDQUhDO0FBQUEsS0FBbkI7O0FBV0EsUUFBTXNELFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQ2Z2RCxFQURlLEVBRWZvQyxNQUZlO0FBQUEsVUFHZm9CLElBSGUsdUVBR1JyQixnQkFIUTtBQUFBLGFBSVpxQixJQUFJLENBQUM7QUFDUnhELFFBQUFBLEVBQUUsRUFBRkEsRUFEUTtBQUVSb0MsUUFBQUEsTUFBTSxFQUFOQSxNQUZRO0FBR1JSLFFBQUFBLFFBQVEsRUFBRTtBQUFBLGlCQUFNcUIsVUFBTjtBQUFBLFNBSEY7QUFJUnBCLFFBQUFBLEtBQUssRUFBTEEsS0FKUTtBQUtSQyxRQUFBQSxLQUFLLEVBQUxBLEtBTFE7QUFNUjdCLFFBQUFBLE1BQU0sRUFBTkE7QUFOUSxPQUFELENBSlE7QUFBQSxLQUFqQjs7QUFhQSxRQUFNd0QsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQUMsR0FBRztBQUFBLGFBQUlBLEdBQUcsQ0FBQztBQUMxQjlCLFFBQUFBLFFBQVEsRUFBRTtBQUFBLGlCQUFNcUIsVUFBTjtBQUFBLFNBRGdCO0FBRTFCcEIsUUFBQUEsS0FBSyxFQUFMQSxLQUYwQjtBQUcxQkMsUUFBQUEsS0FBSyxFQUFMQSxLQUgwQjtBQUkxQjdCLFFBQUFBLE1BQU0sRUFBTkE7QUFKMEIsT0FBRCxDQUFQO0FBQUEsS0FBcEI7O0FBT0EsUUFBTTBELE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUNDLFFBQUQsRUFBVzVELEVBQVgsRUFBZUQsS0FBZjtBQUFBLGFBQ2I2RCxRQUFRLENBQUM7QUFDUDVELFFBQUFBLEVBQUUsRUFBRkEsRUFETztBQUVQRCxRQUFBQSxLQUFLLEVBQUUsQ0FBQ0EsS0FGRDtBQUdQWSxRQUFBQSxHQUFHLEVBQUhBLEdBSE87QUFJUGEsUUFBQUEsS0FBSyxFQUFMQSxLQUpPO0FBS1B0QixRQUFBQSxRQUFRLEVBQVJBLFFBTE87QUFNUEMsUUFBQUEsTUFBTSxFQUFOQSxNQU5PO0FBT1BvQixRQUFBQSxJQUFJLEVBQUU7QUFDSnFCLFVBQUFBLE9BQU8sRUFBRXJCLElBREw7QUFFSkUsVUFBQUEsU0FBUyxrQ0FDSkEsU0FESSxFQUVILENBQUN1QixNQUFNLENBQUM1QyxRQUFELENBQU4sQ0FBaUJGLFFBQWpCLENBQTBCRixFQUExQixLQUFpQyxFQUFsQyxFQUFzQ1ksS0FBdEMsSUFBK0MsRUFGNUM7QUFHUFosWUFBQUEsRUFBRSxFQUFGQTtBQUhPO0FBRkwsU0FQQztBQWVQNkMsUUFBQUEsUUFBUSxFQUFFO0FBQUEsaUJBQU1RLFVBQVUsQ0FBQ3JELEVBQUQsQ0FBaEI7QUFBQSxTQWZIO0FBZ0JQOEMsUUFBQUEsTUFBTSxFQUFFLGdCQUFBVixNQUFNO0FBQUEsaUJBQUltQixRQUFRLENBQUN2RCxFQUFELEVBQUtvQyxNQUFMLENBQVo7QUFBQSxTQWhCUDtBQWlCUFgsUUFBQUEsU0FBUyxFQUFUQTtBQWpCTyxPQUFELENBREs7QUFBQSxLQUFmOztBQXNCQSxRQUFNM0IsS0FBSyxHQUFHO0FBQ1pLLE1BQUFBLE1BQU0sRUFBTkEsTUFEWTtBQUVaMEQsTUFBQUEsT0FBTyxFQUFFO0FBQUEsWUFBQ0QsUUFBRCx1RUFBWWpCLGdCQUFaO0FBQUEsZUFDUHhDLE1BQU0sQ0FBQ3VDLE1BQVAsR0FBZ0IsQ0FBaEIsR0FFSSw2QkFBQyxhQUFEO0FBQ0UsVUFBQSxLQUFLLG1DQUFPdkMsTUFBUCxDQURQO0FBRUUsVUFBQSxnQkFBZ0IsRUFBRzhDLFVBQVUsQ0FBQ1gsZ0JBRmhDO0FBR0UsVUFBQSxVQUFVLEVBQUdXLFVBQVUsQ0FBQ1QsVUFIMUI7QUFJRSxVQUFBLFVBQVUsRUFBRyxvQkFBQ3NCLFNBQUQsRUFBZTtBQUMxQmIsWUFBQUEsVUFBVSxDQUFDOUMsTUFBWCxvQ0FBd0IyRCxTQUF4QjtBQUFvQzdELFlBQUFBLE1BQU07QUFDM0M7QUFOSCxXQVFBLHFCQUFVRSxNQUFWLEVBQWtCLFVBQUNKLEtBQUQsRUFBUUMsRUFBUjtBQUFBLG1EQUFtQkEsRUFBbkIsRUFBd0IyRCxNQUFNLENBQUNDLFFBQUQsRUFBVzVELEVBQVgsRUFBZUQsS0FBZixDQUE5QjtBQUFBLFNBQWxCLENBUkEsQ0FGSixHQWFNLElBZEM7QUFBQSxPQUZHO0FBa0JaZ0UsTUFBQUEsR0FBRyxFQUFFO0FBQUEsWUFBQ0gsUUFBRCx1RUFBWWpCLGdCQUFaO0FBQUEsZUFDSHhDLE1BQU0sQ0FBQ3VDLE1BQVAsR0FBZ0IsQ0FBaEIsR0FFSTtBQUFLLFVBQUEsU0FBUyxZQUFNLGtCQUFPLGVBQVAsQ0FBTjtBQUFkLFdBRUF2QyxNQUFNLENBQUM0RCxHQUFQLENBQVcsVUFBQy9ELEVBQUQsRUFBS0QsS0FBTDtBQUFBLGlCQUNUO0FBQUssWUFBQSxTQUFTLFlBQU0sa0JBQU8saUJBQVAsQ0FBTixDQUFkO0FBQWtELFlBQUEsR0FBRyxFQUFHQztBQUF4RCxhQUNJMkQsTUFBTSxDQUFDQyxRQUFELEVBQVc1RCxFQUFYLEVBQWVELEtBQWYsQ0FEVixDQURTO0FBQUEsU0FBWCxDQUZBLENBRkosR0FXTSxJQVpIO0FBQUEsT0FsQk87QUFnQ1pFLE1BQUFBLE1BQU0sRUFBRTtBQUFBLFlBQ04rRCxXQURNLHVFQUNRLFVBQUFDLEdBQUc7QUFBQSxpQkFDZjtBQUFLLFlBQUEsU0FBUyxZQUFNLGtCQUFPLE9BQVAsQ0FBTjtBQUFkLGFBQ0U7QUFBSyxZQUFBLFNBQVMsWUFBTSxrQkFBTyxXQUFQLENBQU47QUFBZCxhQUNHQSxHQURILENBREYsRUFJRTtBQUNFLFlBQUEsU0FBUyxFQUFHLGtCQUFPLGtCQUFQLENBRGQ7QUFFRSxZQUFBLE9BQU8sRUFBRztBQUFBLHFCQUFNZCxPQUFPLEVBQWI7QUFBQTtBQUZaLFlBSkYsQ0FEZTtBQUFBLFNBRFg7QUFBQSxZQWFOZSxRQWJNLHVFQWFNaEIsUUFBUSxHQUFHcEQsS0FBSyxDQUFDK0QsT0FBTixFQUFILEdBQXFCL0QsS0FBSyxDQUFDaUUsR0FBTixFQWJuQztBQUFBLGVBZU47QUFBSyxVQUFBLFNBQVMsWUFBTSxrQkFBTyxZQUFQLENBQU47QUFBZCxXQUNHQyxXQUFXLENBQUNFLFFBQUQsQ0FEZCxDQWZNO0FBQUEsT0FoQ0k7QUFtRFpmLE1BQUFBLE9BQU8sRUFBUEEsT0FuRFk7QUFvRFpFLE1BQUFBLFVBQVUsRUFBVkEsVUFwRFk7QUFxRFpFLE1BQUFBLFFBQVEsRUFBUkEsUUFyRFk7QUFzRFpFLE1BQUFBLFFBQVEsRUFBUkE7QUF0RFksS0FBZDtBQXlEQSw2Q0FBVXJELFFBQVYsRUFBcUJOLEtBQXJCO0FBQ0QsR0FuSUssQ0FMbUI7QUFBQSxDQUFsQjs7OztBQTBJQSxJQUFNcUUsV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxtRkFBZ0IsRUFBaEI7QUFBQSxNQUFHOUMsUUFBSCxVQUFHQSxRQUFIOztBQUFBLFNBQXVCLHFCQUFVQSxRQUFWLEVBQW9CLFVBQUNqQixRQUFEO0FBQUEsUUFBYW1CLElBQWIsVUFBYUEsSUFBYjtBQUFBLDZDQUNuRW5CLFFBRG1FLEVBQ3hEbUIsSUFEd0Q7QUFBQSxHQUFwQixDQUF2QjtBQUFBLENBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHByZWZpeCwgbWFwT2JqZWN0IH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBEaW5vRm9ybUl0ZW0gZnJvbSAnLi9EaW5vRm9ybUl0ZW0nO1xuaW1wb3J0IERyYWcgZnJvbSAnLi9EcmFnJztcblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtR2V0R3JvdXBSZWYgPSBhc3luYyAoeyBncm91cCwgaW5kZXgsIElELCByZW5kZXIgfSA9IHt9KSA9PiB7XG4gIGNvbnN0IHsgSURSZWZNYXAsIElETGlzdCwgZm9ybU5hbWUgfSA9IGdyb3VwO1xuXG4gIGxldCB7XG4gICAgW0lEXToge1xuICAgICAgcmVmLFxuICAgIH0gPSB7fSxcbiAgfSA9IElEUmVmTWFwO1xuICAvLyBjb25zdFxuICBsZXQgeyByZVRyeVJlZkNvdW50IH0gPSAzO1xuXG4gIHdoaWxlICghcmVmICYmIHJlVHJ5UmVmQ291bnQtLSA+IDApIHtcbiAgICBhd2FpdCByZW5kZXIoKTtcbiAgICAoe1xuICAgICAgW0lEXToge1xuICAgICAgICByZWYsXG4gICAgICB9ID0ge30sXG4gICAgfSA9IElEUmVmTWFwKTtcbiAgfVxuXG4gIHJldHVybiByZWY7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRnJhZ21lbnRzID0gKHsgZnJhZ21lbnRzLCBjcmVhdGVEaW5vRm9ybUFwaSB9KSA9PiAoXG4gIG1hcE9iamVjdChmcmFnbWVudHMsIChjb21OYW1lLCB7IENvbSwgLi4ucHJvcHMgfSA9IHt9KSA9PiAoe1xuICAgIFtjb21OYW1lXTogT2JqZWN0LmFzc2lnbihcbiAgICAgIGNsYXNzIEZyYWdtZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q29tXG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsgY3JlYXRlRGlub0Zvcm1BcGkoKSB9XG4gICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICB7IC4uLih0aGlzLnByb3BzIHx8IHt9KSB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb3BzLFxuICAgICksXG4gIH0pKVxuKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUZyb21JdGVtID0gKHsgY3JlYXRlRGlub0Zvcm1BcGkgfSkgPT4gKFxuICBjbGFzcyBEaW5vRm9ybUl0ZW1XcmFwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RGlub0Zvcm1JdGVtXG4gICAgICAgICAgZGlub0Zvcm09eyBjcmVhdGVEaW5vRm9ybUFwaSgpIH1cbiAgICAgICAgICB7IC4uLih0aGlzLnByb3BzIHx8IHt9KSB9XG4gICAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG4pO1xuXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCA9ICh7XG4gIHNldElEUmVmTWFwLCBDb20sIHRvcEZvcm1SZW5kZXIsXG59KSA9PiAoXG4gIGNsYXNzIERpbm9Gb3JtV3JhcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIHRoaXMuQ29tID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgY29uc3QgeyBJRCwgaW5kZXggfSA9IHRoaXMucHJvcHM7XG4gICAgICBzZXRJRFJlZk1hcChJRCwgeyByZWY6IHRoaXMuQ29tIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgY29uc3QgeyBJRCwgaW5kZXggfSA9IHRoaXMucHJvcHM7XG4gICAgICBzZXRJRFJlZk1hcChJRCwgeyByZWY6IHVuZGVmaW5lZCB9KTtcbiAgICB9XG5cbiAgICBjYXRjaFJlZiA9IChyZWYpID0+IHtcbiAgICAgIGNvbnN0IHsgSUQsIGNhdGNoUmVmID0gKCkgPT4ge30gfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLkNvbSA9IHJlZjtcbiAgICAgIGNhdGNoUmVmKHJlZik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgeyBJRCwgaW5kZXggfSA9IHRoaXMucHJvcHM7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29tXG4gICAgICAgICAgSUQ9eyBJRCB9XG4gICAgICAgICAgaW5kZXg9eyBpbmRleCB9XG4gICAgICAgICAgcmVmPXsgdGhpcy5jYXRjaFJlZiB9XG4gICAgICAgICAgdG9wRm9ybVJlbmRlcj17IHRvcEZvcm1SZW5kZXIgfVxuICAgICAgICAgIHN1Ykdyb3VwRm9ybVxuICAgICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSA9IHN1YkZvcm1zID0+IChcbiAgbWFwT2JqZWN0KHN1YkZvcm1zLCAoZm9ybU5hbWUsIGZvcm0pID0+IHtcbiAgICBjb25zdCB7IEZvcm0sIGZpZWxkLCBmb3JtUHJvcHMgPSB7fSB9ID0gZm9ybTtcbiAgICBjb25zdCBzdWJGb3JtID0ge1xuICAgICAgZmllbGQsXG4gICAgICBmb3JtUHJvcHMsXG4gICAgICByZWY6IHVuZGVmaW5lZCxcbiAgICAgIEZvcm06IGNsYXNzIERpbm9TdWJGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybVxuICAgICAgICAgICAgICB7IC4uLmZvcm1Qcm9wcyB9XG4gICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAgIHJlZj17IChyZWYpID0+IHsgc3ViRm9ybS5yZWYgPSByZWY7IH0gfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgW2Zvcm1OYW1lXTogc3ViRm9ybSxcbiAgICB9O1xuICB9KVxuKTtcblxuXG5leHBvcnQgY29uc3QgZGlub0Zvcm1BZGRJdGVtID0gKHtcbiAgZ2V0R3JvdXAsXG4gIHNldElELFxuICBnZXRJRCxcbiAgcmVuZGVyLFxufSkgPT4ge1xuICBjb25zdCBJRCA9IGdldElEKCk7XG4gIGdldEdyb3VwKCkuSURMaXN0LnB1c2goSUQpO1xuICBzZXRJRChJRCArIDEpO1xuICByZW5kZXIoKTtcbiAgcmV0dXJuIElEO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtRGVsZXRlSXRlbSA9ICh7IElEOiBkZWxldGVJRCwgZ2V0R3JvdXAsIHJlbmRlciB9KSA9PiB7XG4gIGNvbnN0IGdyb3VwID0gZ2V0R3JvdXAoKTtcbiAgZ3JvdXAuSURMaXN0ID0gZ3JvdXAuSURMaXN0LmZpbHRlcihJRCA9PiBJRCAhPT0gZGVsZXRlSUQpO1xuICByZW5kZXIoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybU1vdmVJdGVtID0gKHtcbiAgSUQsIG9mZnNldCwgZ2V0R3JvdXAsIHJlbmRlcixcbn0pID0+IHtcbiAgY29uc3QgZ3JvdXAgPSBnZXRHcm91cCgpO1xuICBjb25zdCBpbmRleCA9IGdyb3VwLklETGlzdC5pbmRleE9mKElEKTtcbiAgZ3JvdXAubGFzdEFjdGlvbk1vdmVJRCA9IElEO1xuXG4gIGlmIChvZmZzZXQgPT09IC1JbmZpbml0eSkge1xuICAgIGdyb3VwLmxhc3RNb3ZlSUQgPSBncm91cC5JRExpc3RbMF07XG4gICAgZ3JvdXAuSURMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgZ3JvdXAuSURMaXN0LnNwbGljZSgwLCAwLCBJRCk7XG4gIH0gZWxzZSBpZiAob2Zmc2V0ID09PSBJbmZpbml0eSkge1xuICAgIGdyb3VwLmxhc3RNb3ZlSUQgPSBncm91cC5JRExpc3RbZ3JvdXAuSURMaXN0Lmxlbmd0aCAtIDFdO1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoZ3JvdXAuSURMaXN0Lmxlbmd0aCwgMCwgSUQpO1xuICB9IGVsc2Uge1xuICAgIGdyb3VwLmxhc3RNb3ZlSUQgPSBncm91cC5JRExpc3RbaW5kZXggKyBvZmZzZXRdO1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoaW5kZXggKyBvZmZzZXQsIDAsIElEKTtcbiAgfVxuXG4gIHJlbmRlcigpO1xufTtcblxuXG5leHBvcnQgY29uc3QgZGlub0Zvcm1NYXBHcm91cCA9ICh7XG4gIEZvcm06IHtcbiAgICBGb3JtQ29tLFxuICAgIGZvcm1Qcm9wcyxcbiAgfSxcbiAgSUQsXG4gIElETGlzdCxcbiAgaW5kZXgsXG4gIGRlbGV0ZUl0LFxuICBtb3ZlSXQsXG59KSA9PiAoW1xuICA8Rm9ybUNvbSB7IC4uLmZvcm1Qcm9wcyB9IGtleT17IElEIH0gLz4sXG4gIDxkaXYgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb25zJykgfSBrZXk9XCJncm91cC1hY3Rpb25zXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1kZWxldGUnKSB9IG9uQ2xpY2s9eyBkZWxldGVJdCB9IC8+XG4gICAge1xuICAgICAgaW5kZXggIT09IDBcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtdXAnKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdCgtMSkgfVxuICAgICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIHtcbiAgICAgIGluZGV4ICE9PSBJRExpc3QubGVuZ3RoIC0gMVxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS1kb3duJykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoMSkgfVxuICAgICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIHtcbiAgICAgIGluZGV4ICE9PSAwXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLXRvLWZpcnN0JykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoLUluZmluaXR5KSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAge1xuICAgICAgaW5kZXggIT09IElETGlzdC5sZW5ndGggLSAxXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLXRvLWxhc3QnKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdChJbmZpbml0eSkgfVxuICAgICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICA8L2Rpdj4sXG5dKTtcblxuZXhwb3J0IGNvbnN0IGdyb3Vwc0FQSSA9ICh7XG4gIGdyb3VwcyxcbiAgcmVuZGVyLFxuICBzZXRJRCxcbiAgZ2V0SUQsXG59KSA9PiBtYXBPYmplY3QoZ3JvdXBzLCAoZm9ybU5hbWUsIGdyb3VwVmFsdWUpID0+IHtcbiAgY29uc3Qge1xuICAgIENvbSxcbiAgICBmaWVsZCxcbiAgICBuZWVkRHJhZyxcbiAgICBJRFJlZk1hcCxcbiAgICBJRExpc3QsXG4gICAgRm9ybSxcbiAgICBmb3JtUHJvcHMgPSB7fSxcbiAgfSA9IGdyb3VwVmFsdWU7XG5cbiAgY29uc3QgYWRkSXRlbSA9IChcbiAgICBhZGQgPSBkaW5vRm9ybUFkZEl0ZW0sXG4gICkgPT4gYWRkKHtcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IGRlbGV0ZUl0ZW0gPSAoXG4gICAgSUQsXG4gICAgZGVsZXRlSXRlbUZ1biA9IGRpbm9Gb3JtRGVsZXRlSXRlbSxcbiAgKSA9PiBkZWxldGVJdGVtRnVuKHtcbiAgICBJRCxcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IG1vdmVJdGVtID0gKFxuICAgIElELFxuICAgIG9mZnNldCxcbiAgICBtb3ZlID0gZGlub0Zvcm1Nb3ZlSXRlbSxcbiAgKSA9PiBtb3ZlKHtcbiAgICBJRCxcbiAgICBvZmZzZXQsXG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBkb0FjdGlvbiA9IGZ1biA9PiBmdW4oe1xuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgbWFwRnVuID0gKG1hcEdyb3VwLCBJRCwgaW5kZXgpID0+IChcbiAgICBtYXBHcm91cCh7XG4gICAgICBJRCxcbiAgICAgIGluZGV4OiAraW5kZXgsXG4gICAgICBDb20sXG4gICAgICBmaWVsZCxcbiAgICAgIElEUmVmTWFwLFxuICAgICAgSURMaXN0LFxuICAgICAgRm9ybToge1xuICAgICAgICBGb3JtQ29tOiBGb3JtLFxuICAgICAgICBmb3JtUHJvcHM6IHtcbiAgICAgICAgICAuLi5mb3JtUHJvcHMsXG4gICAgICAgICAgLi4uKChncm91cHNbZm9ybU5hbWVdLklEUmVmTWFwW0lEXSB8fCB7fSkucHJvcHMgfHwge30pLFxuICAgICAgICAgIElELFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGRlbGV0ZUl0OiAoKSA9PiBkZWxldGVJdGVtKElEKSxcbiAgICAgIG1vdmVJdDogb2Zmc2V0ID0+IG1vdmVJdGVtKElELCBvZmZzZXQpLFxuICAgICAgZm9ybVByb3BzLFxuICAgIH0pXG4gICk7XG5cbiAgY29uc3QgZ3JvdXAgPSB7XG4gICAgSURMaXN0LFxuICAgIGRyYWdNYXA6IChtYXBHcm91cCA9IGRpbm9Gb3JtTWFwR3JvdXApID0+IChcbiAgICAgIElETGlzdC5sZW5ndGggPiAwXG4gICAgICAgID8gKFxuICAgICAgICAgIDxEcmFnXG4gICAgICAgICAgICBvcmRlcj17IFsuLi5JRExpc3RdIH1cbiAgICAgICAgICAgIGxhc3RBY3Rpb25Nb3ZlSUQ9eyBncm91cFZhbHVlLmxhc3RBY3Rpb25Nb3ZlSUQgfVxuICAgICAgICAgICAgbGFzdE1vdmVJRD17IGdyb3VwVmFsdWUubGFzdE1vdmVJRCB9XG4gICAgICAgICAgICBjaGFuZ2VEb25lPXsgKG5ld0lETGlzdCkgPT4ge1xuICAgICAgICAgICAgICBncm91cFZhbHVlLklETGlzdCA9IFsuLi5uZXdJRExpc3RdOyByZW5kZXIoKTtcbiAgICAgICAgICAgIH0gfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICBtYXBPYmplY3QoSURMaXN0LCAoaW5kZXgsIElEKSA9PiAoeyBbSURdOiBtYXBGdW4obWFwR3JvdXAsIElELCBpbmRleCkgfSkpXG4gICAgICAgIH1cbiAgICAgICAgICA8L0RyYWc+XG4gICAgICAgICkgOiBudWxsXG4gICAgKSxcbiAgICBtYXA6IChtYXBHcm91cCA9IGRpbm9Gb3JtTWFwR3JvdXApID0+IChcbiAgICAgIElETGlzdC5sZW5ndGggPiAwXG4gICAgICAgID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdtYXAtY29udGFpbmVyJyl9YCB9PlxuICAgICAgICAgICAge1xuICAgICAgICAgIElETGlzdC5tYXAoKElELCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLWl0ZW0td3JhcCcpfWAgfSBrZXk9eyBJRCB9PlxuICAgICAgICAgICAgICB7IG1hcEZ1bihtYXBHcm91cCwgSUQsIGluZGV4KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpXG4gICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGxcbiAgICApLFxuICAgIHJlbmRlcjogKFxuICAgICAgcmVuZGVyR3JvdXAgPSBlbGUgPT4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZ3JvdXAnKX1gIH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLWVsZScpfWAgfT5cbiAgICAgICAgICAgIHtlbGV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tYWRkJykgfVxuICAgICAgICAgICAgb25DbGljaz17ICgpID0+IGFkZEl0ZW0oKSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICksXG4gICAgICAvLyBjaGlsZHJlbiA9IChuZWVkRHJhcCA/IGdyb3VwLmRyYWdNYXAoKSA6IGdyb3VwLm1hcCgpKSxcbiAgICAgIGNoaWxkcmVuID0gKG5lZWREcmFnID8gZ3JvdXAuZHJhZ01hcCgpIDogZ3JvdXAubWFwKCkpLFxuICAgICkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLXdyYXAnKX1gIH0+XG4gICAgICAgIHtyZW5kZXJHcm91cChjaGlsZHJlbil9XG4gICAgICA8L2Rpdj5cbiAgICApLFxuICAgIGFkZEl0ZW0sXG4gICAgZGVsZXRlSXRlbSxcbiAgICBtb3ZlSXRlbSxcbiAgICBkb0FjdGlvbixcbiAgfTtcblxuICByZXR1cm4geyBbZm9ybU5hbWVdOiBncm91cCB9O1xufSk7XG5cbmV4cG9ydCBjb25zdCBzdWJGb3Jtc0FQSSA9ICh7IHN1YkZvcm1zIH0gPSB7fSkgPT4gbWFwT2JqZWN0KHN1YkZvcm1zLCAoZm9ybU5hbWUsIHsgRm9ybSB9KSA9PiAoe1xuICBbZm9ybU5hbWVdOiBGb3JtLFxufSkpO1xuIl19