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
  var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      subForms = _ref15.subForms;

  return (0, _util.mapObject)(subForms, function (formName, _ref16) {
    var Form = _ref16.Form;
    return (0, _defineProperty2.default)({}, formName, Form);
  });
};

exports.subFormsAPI = subFormsAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUhlbHBlci5qc3giXSwibmFtZXMiOlsiZ2V0UmVmIiwiZ2V0RnVuIiwidGltZW91dCIsInJlZiIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJjb25zb2xlIiwid2FybiIsInVuZGVmaW5lZCIsImNyZWF0ZUZyYWdtZW50cyIsImZyYWdtZW50cyIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY29tTmFtZSIsIkNvbSIsInByb3BzIiwiQ29tcG9uZW50IiwiY3JlYXRlRnJvbUl0ZW0iLCJjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCIsInNldElEUmVmTWFwIiwidG9wRm9ybVJlbmRlciIsIklEIiwiY2F0Y2hSZWYiLCJpbmRleCIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsInN1YkZvcm1zIiwiZm9ybU5hbWUiLCJmb3JtIiwiRm9ybSIsImZpZWxkIiwiZm9ybVByb3BzIiwic3ViRm9ybSIsImRpbm9Gb3JtQWRkSXRlbSIsImdldEdyb3VwIiwic2V0SUQiLCJnZXRJRCIsInJlbmRlciIsIklETGlzdCIsInB1c2giLCJkaW5vRm9ybURlbGV0ZUl0ZW0iLCJkZWxldGVJRCIsImdyb3VwIiwiZmlsdGVyIiwiZGlub0Zvcm1Nb3ZlSXRlbSIsIm9mZnNldCIsImluZGV4T2YiLCJsYXN0QWN0aW9uTW92ZUlEIiwiSW5maW5pdHkiLCJsYXN0TW92ZUlEIiwic3BsaWNlIiwibGVuZ3RoIiwiZGlub0Zvcm1NYXBHcm91cCIsIkZvcm1Db20iLCJkZWxldGVJdCIsIm1vdmVJdCIsImdyb3Vwc0FQSSIsImdyb3VwcyIsImdyb3VwVmFsdWUiLCJuZWVkRHJhZyIsIklEUmVmTWFwIiwiYWRkSXRlbSIsImFkZCIsImRlbGV0ZUl0ZW0iLCJkZWxldGVJdGVtRnVuIiwibW92ZUl0ZW0iLCJtb3ZlIiwiZG9BY3Rpb24iLCJmdW4iLCJtYXBGdW4iLCJtYXBHcm91cCIsImRyYWdNYXAiLCJuZXdJRExpc3QiLCJtYXAiLCJyZW5kZXJHcm91cCIsImVsZSIsImNoaWxkcmVuIiwic3ViRm9ybXNBUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7U0FFc0JBLE07Ozs7Ozs7NEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNMQyxZQUFBQSxNQURLLDJEQUNJLFlBQU0sQ0FBRSxDQURaO0FBRUxDLFlBQUFBLE9BRkssMkRBRUssR0FGTDtBQUlEQyxZQUFBQSxHQUpDLEdBSUtGLE1BQU0sRUFKWDtBQU1DRyxZQUFBQSxTQU5ELEdBTWEsQ0FBQyxJQUFJQyxJQUFKLEVBTmQ7O0FBQUE7QUFBQSxpQkFRRSxDQVJGO0FBQUE7QUFBQTtBQUFBOztBQVNHQyxZQUFBQSxHQVRILEdBU1MsQ0FBQyxJQUFJRCxJQUFKLEVBVFY7O0FBQUEsa0JBVUNDLEdBQUcsR0FBR0YsU0FBTixHQUFrQkYsT0FWbkI7QUFBQTtBQUFBO0FBQUE7O0FBV0RLLFlBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLHVEQUFiO0FBWEMsNkNBWU1DLFNBWk47O0FBQUE7QUFBQTtBQUFBLG1CQWNHLGtCQWRIOztBQUFBO0FBZ0JITixZQUFBQSxHQUFHLEdBQUdGLE1BQU0sRUFBWjs7QUFoQkcsaUJBa0JDRSxHQWxCRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSw2Q0FxQkVBLEdBckJGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUF3QkEsSUFBTU8sZUFBZSxHQUFHLFNBQWxCQSxlQUFrQjtBQUFBLE1BQUdDLFNBQUgsUUFBR0EsU0FBSDtBQUFBLE1BQWNDLGlCQUFkLFFBQWNBLGlCQUFkO0FBQUEsU0FDN0IscUJBQVVELFNBQVYsRUFBcUIsVUFBQ0UsT0FBRDtBQUFBLG9GQUE4QixFQUE5QjtBQUFBLFFBQVlDLEdBQVosU0FBWUEsR0FBWjtBQUFBLFFBQW9CQyxLQUFwQjs7QUFBQSw2Q0FDbEJGLE9BRGtCLEVBQ1I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGlDQUVFO0FBQ1AsaUJBQ0UsNkJBQUMsR0FBRDtBQUNFLFlBQUEsUUFBUSxFQUFHRCxpQkFBaUI7QUFEOUIsYUFFT0csS0FGUCxFQUdRLEtBQUtBLEtBQUwsSUFBYyxFQUh0QixFQURGO0FBT0Q7QUFWTTtBQUFBO0FBQUEsTUFDY0MsZ0JBRGQsR0FZVEQsS0FaUyxDQURRO0FBQUEsR0FBckIsQ0FENkI7QUFBQSxDQUF4Qjs7OztBQW1CQSxJQUFNRSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCO0FBQUEsTUFBR0wsaUJBQUgsU0FBR0EsaUJBQUg7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsaUNBRWpCO0FBQ1AsaUJBQ0UsNkJBQUMscUJBQUQ7QUFDRSxZQUFBLFFBQVEsRUFBR0EsaUJBQWlCO0FBRDlCLGFBRVEsS0FBS0csS0FBTCxJQUFjLEVBRnRCLEVBREY7QUFNRDtBQVR5QjtBQUFBO0FBQUEsTUFDR0MsZ0JBREg7QUFBQTtBQUFBLENBQXZCOzs7O0FBY0EsSUFBTUUsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQjtBQUFBOztBQUFBLE1BQ3JDQyxXQURxQyxTQUNyQ0EsV0FEcUM7QUFBQSxNQUN4QkwsR0FEd0IsU0FDeEJBLEdBRHdCO0FBQUEsTUFDbkJNLGFBRG1CLFNBQ25CQSxhQURtQjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUluQywwQkFBWUwsS0FBWixFQUFtQjtBQUFBOztBQUFBO0FBQ2pCLG9IQUFNQSxLQUFOO0FBRGlCLG1JQWVSLFVBQUNaLEdBQUQsRUFBUztBQUFBLDBCQUNrQixNQUFLWSxLQUR2QjtBQUFBLFlBQ1ZNLEVBRFUsZUFDVkEsRUFEVTtBQUFBLCtDQUNOQyxRQURNO0FBQUEsWUFDTkEsUUFETSxxQ0FDSyxZQUFNLENBQUUsQ0FEYjtBQUVsQixjQUFLUixHQUFMLEdBQVdYLEdBQVg7QUFDQW1CLFFBQUFBLFFBQVEsQ0FBQ25CLEdBQUQsQ0FBUjtBQUNELE9BbkJrQjtBQUVqQixZQUFLVyxHQUFMLEdBQVdMLFNBQVg7QUFGaUI7QUFHbEI7O0FBUGtDO0FBQUE7QUFBQSwwQ0FTZjtBQUFBLDJCQUNJLEtBQUtNLEtBRFQ7QUFBQSxZQUNWTSxFQURVLGdCQUNWQSxFQURVO0FBQUEsWUFDTkUsS0FETSxnQkFDTkEsS0FETTtBQUVsQkosUUFBQUEsV0FBVyxDQUFDRSxFQUFELEVBQUs7QUFBRWxCLFVBQUFBLEdBQUcsRUFBRSxLQUFLVztBQUFaLFNBQUwsQ0FBWDtBQUNEO0FBWmtDO0FBQUE7QUFBQSw2Q0FjWjtBQUFBLDJCQUNDLEtBQUtDLEtBRE47QUFBQSxZQUNiTSxFQURhLGdCQUNiQSxFQURhO0FBQUEsWUFDVEUsS0FEUyxnQkFDVEEsS0FEUztBQUVyQkosUUFBQUEsV0FBVyxDQUFDRSxFQUFELEVBQUs7QUFBRWxCLFVBQUFBLEdBQUcsRUFBRU07QUFBUCxTQUFMLENBQVg7QUFDRDtBQWpCa0M7QUFBQTtBQUFBLCtCQXlCMUI7QUFBQSwyQkFDZSxLQUFLTSxLQURwQjtBQUFBLFlBQ0NNLEVBREQsZ0JBQ0NBLEVBREQ7QUFBQSxZQUNLRSxLQURMLGdCQUNLQSxLQURMO0FBRVAsZUFDRSw2QkFBQyxHQUFEO0FBQ0UsVUFBQSxFQUFFLEVBQUdGLEVBRFA7QUFFRSxVQUFBLEtBQUssRUFBR0UsS0FGVjtBQUdFLFVBQUEsR0FBRyxFQUFHLEtBQUtELFFBSGI7QUFJRSxVQUFBLGFBQWEsRUFBR0YsYUFKbEI7QUFLRSxVQUFBLFlBQVk7QUFMZCxVQURGO0FBU0Q7QUFwQ2tDO0FBQUE7QUFBQSxJQUdWSixnQkFIVTtBQUFBLENBQWhDOzs7O0FBd0NBLElBQU1RLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQUMsUUFBUTtBQUFBLFNBQzNDLHFCQUFVQSxRQUFWLEVBQW9CLFVBQUNDLFFBQUQsRUFBV0MsSUFBWCxFQUFvQjtBQUFBLFFBQzlCQyxJQUQ4QixHQUNFRCxJQURGLENBQzlCQyxJQUQ4QjtBQUFBLFFBQ3hCQyxLQUR3QixHQUNFRixJQURGLENBQ3hCRSxLQUR3QjtBQUFBLDBCQUNFRixJQURGLENBQ2pCRyxTQURpQjtBQUFBLFFBQ2pCQSxTQURpQixnQ0FDTCxFQURLO0FBRXRDLFFBQU1DLE9BQU8sR0FBRztBQUNkRixNQUFBQSxLQUFLLEVBQUxBLEtBRGM7QUFFZEMsTUFBQUEsU0FBUyxFQUFUQSxTQUZjO0FBR2QzQixNQUFBQSxHQUFHLEVBQUVNLFNBSFM7QUFJZG1CLE1BQUFBLElBQUk7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1DQUNPO0FBQ1AsbUJBQ0UsNkJBQUMsSUFBRCw2QkFDT0UsU0FEUCxFQUVPLEtBQUtmLEtBRlo7QUFHRSxjQUFBLEdBQUcsRUFBRyxhQUFDWixLQUFELEVBQVM7QUFBRTRCLGdCQUFBQSxPQUFPLENBQUM1QixHQUFSLEdBQWNBLEtBQWQ7QUFBb0I7QUFIdkMsZUFERjtBQU9EO0FBVEM7QUFBQTtBQUFBLFFBQTRCYSxnQkFBNUI7QUFKVSxLQUFoQjtBQWdCQSw2Q0FDR1UsUUFESCxFQUNjSyxPQURkO0FBR0QsR0FyQkQsQ0FEMkM7QUFBQSxDQUF0Qzs7OztBQTBCQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLFFBS3pCO0FBQUEsTUFKSkMsUUFJSSxTQUpKQSxRQUlJO0FBQUEsTUFISkMsS0FHSSxTQUhKQSxLQUdJO0FBQUEsTUFGSkMsS0FFSSxTQUZKQSxLQUVJO0FBQUEsTUFESkMsTUFDSSxTQURKQSxNQUNJO0FBQ0osTUFBTWYsRUFBRSxHQUFHYyxLQUFLLEVBQWhCO0FBQ0FGLEVBQUFBLFFBQVEsR0FBR0ksTUFBWCxDQUFrQkMsSUFBbEIsQ0FBdUJqQixFQUF2QjtBQUNBYSxFQUFBQSxLQUFLLENBQUNiLEVBQUUsR0FBRyxDQUFOLENBQUw7QUFDQWUsRUFBQUEsTUFBTTtBQUNOLFNBQU9mLEVBQVA7QUFDRCxDQVhNOzs7O0FBYUEsSUFBTWtCLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsUUFBd0M7QUFBQSxNQUFqQ0MsUUFBaUMsU0FBckNuQixFQUFxQztBQUFBLE1BQXZCWSxRQUF1QixTQUF2QkEsUUFBdUI7QUFBQSxNQUFiRyxNQUFhLFNBQWJBLE1BQWE7QUFDeEUsTUFBTUssS0FBSyxHQUFHUixRQUFRLEVBQXRCO0FBQ0FRLEVBQUFBLEtBQUssQ0FBQ0osTUFBTixHQUFlSSxLQUFLLENBQUNKLE1BQU4sQ0FBYUssTUFBYixDQUFvQixVQUFBckIsRUFBRTtBQUFBLFdBQUlBLEVBQUUsS0FBS21CLFFBQVg7QUFBQSxHQUF0QixDQUFmO0FBQ0FKLEVBQUFBLE1BQU07QUFDUCxDQUpNOzs7O0FBTUEsSUFBTU8sZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixTQUUxQjtBQUFBLE1BREp0QixFQUNJLFVBREpBLEVBQ0k7QUFBQSxNQURBdUIsTUFDQSxVQURBQSxNQUNBO0FBQUEsTUFEUVgsUUFDUixVQURRQSxRQUNSO0FBQUEsTUFEa0JHLE1BQ2xCLFVBRGtCQSxNQUNsQjtBQUNKLE1BQU1LLEtBQUssR0FBR1IsUUFBUSxFQUF0QjtBQUNBLE1BQU1WLEtBQUssR0FBR2tCLEtBQUssQ0FBQ0osTUFBTixDQUFhUSxPQUFiLENBQXFCeEIsRUFBckIsQ0FBZDtBQUNBb0IsRUFBQUEsS0FBSyxDQUFDSyxnQkFBTixHQUF5QnpCLEVBQXpCOztBQUVBLE1BQUl1QixNQUFNLEtBQUssQ0FBQ0csUUFBaEIsRUFBMEI7QUFDeEJOLElBQUFBLEtBQUssQ0FBQ08sVUFBTixHQUFtQlAsS0FBSyxDQUFDSixNQUFOLENBQWEsQ0FBYixDQUFuQjtBQUNBSSxJQUFBQSxLQUFLLENBQUNKLE1BQU4sQ0FBYVksTUFBYixDQUFvQjFCLEtBQXBCLEVBQTJCLENBQTNCO0FBQ0FrQixJQUFBQSxLQUFLLENBQUNKLE1BQU4sQ0FBYVksTUFBYixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQjVCLEVBQTFCO0FBQ0QsR0FKRCxNQUlPLElBQUl1QixNQUFNLEtBQUtHLFFBQWYsRUFBeUI7QUFDOUJOLElBQUFBLEtBQUssQ0FBQ08sVUFBTixHQUFtQlAsS0FBSyxDQUFDSixNQUFOLENBQWFJLEtBQUssQ0FBQ0osTUFBTixDQUFhYSxNQUFiLEdBQXNCLENBQW5DLENBQW5CO0FBQ0FULElBQUFBLEtBQUssQ0FBQ0osTUFBTixDQUFhWSxNQUFiLENBQW9CMUIsS0FBcEIsRUFBMkIsQ0FBM0I7QUFDQWtCLElBQUFBLEtBQUssQ0FBQ0osTUFBTixDQUFhWSxNQUFiLENBQW9CUixLQUFLLENBQUNKLE1BQU4sQ0FBYWEsTUFBakMsRUFBeUMsQ0FBekMsRUFBNEM3QixFQUE1QztBQUNELEdBSk0sTUFJQTtBQUNMb0IsSUFBQUEsS0FBSyxDQUFDTyxVQUFOLEdBQW1CUCxLQUFLLENBQUNKLE1BQU4sQ0FBYWQsS0FBSyxHQUFHcUIsTUFBckIsQ0FBbkI7QUFDQUgsSUFBQUEsS0FBSyxDQUFDSixNQUFOLENBQWFZLE1BQWIsQ0FBb0IxQixLQUFwQixFQUEyQixDQUEzQjtBQUNBa0IsSUFBQUEsS0FBSyxDQUFDSixNQUFOLENBQWFZLE1BQWIsQ0FBb0IxQixLQUFLLEdBQUdxQixNQUE1QixFQUFvQyxDQUFwQyxFQUF1Q3ZCLEVBQXZDO0FBQ0Q7O0FBRURlLEVBQUFBLE1BQU07QUFDUCxDQXRCTTs7OztBQXlCQSxJQUFNZSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsMkJBQzlCdkIsSUFEOEI7QUFBQSxNQUU1QndCLE9BRjRCLGVBRTVCQSxPQUY0QjtBQUFBLE1BRzVCdEIsU0FINEIsZUFHNUJBLFNBSDRCO0FBQUEsTUFLOUJULEVBTDhCLFVBSzlCQSxFQUw4QjtBQUFBLE1BTTlCZ0IsTUFOOEIsVUFNOUJBLE1BTjhCO0FBQUEsTUFPOUJkLEtBUDhCLFVBTzlCQSxLQVA4QjtBQUFBLE1BUTlCOEIsUUFSOEIsVUFROUJBLFFBUjhCO0FBQUEsTUFTOUJDLE1BVDhCLFVBUzlCQSxNQVQ4QjtBQUFBLFNBVXpCLENBQ0wsNkJBQUMsT0FBRCw2QkFBY3hCLFNBQWQ7QUFBMEIsSUFBQSxHQUFHLEVBQUdUO0FBQWhDLEtBREssRUFFTDtBQUFLLElBQUEsU0FBUyxFQUFHLGtCQUFPLGVBQVAsQ0FBakI7QUFBMkMsSUFBQSxHQUFHLEVBQUM7QUFBL0MsS0FDRTtBQUFLLElBQUEsU0FBUyxFQUFHLGtCQUFPLHFCQUFQLENBQWpCO0FBQWlELElBQUEsT0FBTyxFQUFHZ0M7QUFBM0QsSUFERixFQUdJOUIsS0FBSyxLQUFLLENBQVYsSUFFRTtBQUNFLElBQUEsU0FBUyxFQUFHLGtCQUFPLHNCQUFQLENBRGQ7QUFFRSxJQUFBLE9BQU8sRUFBRztBQUFBLGFBQU0rQixNQUFNLENBQUMsQ0FBQyxDQUFGLENBQVo7QUFBQTtBQUZaLElBTE4sRUFZSS9CLEtBQUssS0FBS2MsTUFBTSxDQUFDYSxNQUFQLEdBQWdCLENBQTFCLElBRUU7QUFDRSxJQUFBLFNBQVMsRUFBRyxrQkFBTyx3QkFBUCxDQURkO0FBRUUsSUFBQSxPQUFPLEVBQUc7QUFBQSxhQUFNSSxNQUFNLENBQUMsQ0FBRCxDQUFaO0FBQUE7QUFGWixJQWROLEVBcUJJL0IsS0FBSyxLQUFLLENBQVYsSUFFRTtBQUNFLElBQUEsU0FBUyxFQUFHLGtCQUFPLDRCQUFQLENBRGQ7QUFFRSxJQUFBLE9BQU8sRUFBRztBQUFBLGFBQU0rQixNQUFNLENBQUMsQ0FBQ1AsUUFBRixDQUFaO0FBQUE7QUFGWixJQXZCTixFQThCSXhCLEtBQUssS0FBS2MsTUFBTSxDQUFDYSxNQUFQLEdBQWdCLENBQTFCLElBRUU7QUFDRSxJQUFBLFNBQVMsRUFBRyxrQkFBTywyQkFBUCxDQURkO0FBRUUsSUFBQSxPQUFPLEVBQUc7QUFBQSxhQUFNSSxNQUFNLENBQUNQLFFBQUQsQ0FBWjtBQUFBO0FBRlosSUFoQ04sQ0FGSyxDQVZ5QjtBQUFBLENBQXpCOzs7O0FBcURBLElBQU1RLFNBQVMsR0FBRyxTQUFaQSxTQUFZO0FBQUEsTUFDdkJDLE1BRHVCLFVBQ3ZCQSxNQUR1QjtBQUFBLE1BRXZCcEIsTUFGdUIsVUFFdkJBLE1BRnVCO0FBQUEsTUFHdkJGLEtBSHVCLFVBR3ZCQSxLQUh1QjtBQUFBLE1BSXZCQyxLQUp1QixVQUl2QkEsS0FKdUI7QUFBQSxTQUtuQixxQkFBVXFCLE1BQVYsRUFBa0IsVUFBQzlCLFFBQUQsRUFBVytCLFVBQVgsRUFBMEI7QUFBQSxRQUU5QzNDLEdBRjhDLEdBUzVDMkMsVUFUNEMsQ0FFOUMzQyxHQUY4QztBQUFBLFFBRzlDZSxLQUg4QyxHQVM1QzRCLFVBVDRDLENBRzlDNUIsS0FIOEM7QUFBQSxRQUk5QzZCLFFBSjhDLEdBUzVDRCxVQVQ0QyxDQUk5Q0MsUUFKOEM7QUFBQSxRQUs5Q0MsUUFMOEMsR0FTNUNGLFVBVDRDLENBSzlDRSxRQUw4QztBQUFBLFFBTTlDdEIsTUFOOEMsR0FTNUNvQixVQVQ0QyxDQU05Q3BCLE1BTjhDO0FBQUEsUUFPOUNULElBUDhDLEdBUzVDNkIsVUFUNEMsQ0FPOUM3QixJQVA4QztBQUFBLGdDQVM1QzZCLFVBVDRDLENBUTlDM0IsU0FSOEM7QUFBQSxRQVE5Q0EsU0FSOEMsc0NBUWxDLEVBUmtDOztBQVdoRCxRQUFNOEIsT0FBTyxHQUFHLFNBQVZBLE9BQVU7QUFBQSxVQUNkQyxHQURjLHVFQUNSN0IsZUFEUTtBQUFBLGFBRVg2QixHQUFHLENBQUM7QUFDUDVCLFFBQUFBLFFBQVEsRUFBRTtBQUFBLGlCQUFNd0IsVUFBTjtBQUFBLFNBREg7QUFFUHZCLFFBQUFBLEtBQUssRUFBTEEsS0FGTztBQUdQQyxRQUFBQSxLQUFLLEVBQUxBLEtBSE87QUFJUEMsUUFBQUEsTUFBTSxFQUFOQTtBQUpPLE9BQUQsQ0FGUTtBQUFBLEtBQWhCOztBQVNBLFFBQU0wQixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUNqQnpDLEVBRGlCO0FBQUEsVUFFakIwQyxhQUZpQix1RUFFRHhCLGtCQUZDO0FBQUEsYUFHZHdCLGFBQWEsQ0FBQztBQUNqQjFDLFFBQUFBLEVBQUUsRUFBRkEsRUFEaUI7QUFFakJZLFFBQUFBLFFBQVEsRUFBRTtBQUFBLGlCQUFNd0IsVUFBTjtBQUFBLFNBRk87QUFHakJ2QixRQUFBQSxLQUFLLEVBQUxBLEtBSGlCO0FBSWpCQyxRQUFBQSxLQUFLLEVBQUxBLEtBSmlCO0FBS2pCQyxRQUFBQSxNQUFNLEVBQU5BO0FBTGlCLE9BQUQsQ0FIQztBQUFBLEtBQW5COztBQVdBLFFBQU00QixRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUNmM0MsRUFEZSxFQUVmdUIsTUFGZTtBQUFBLFVBR2ZxQixJQUhlLHVFQUdSdEIsZ0JBSFE7QUFBQSxhQUlac0IsSUFBSSxDQUFDO0FBQ1I1QyxRQUFBQSxFQUFFLEVBQUZBLEVBRFE7QUFFUnVCLFFBQUFBLE1BQU0sRUFBTkEsTUFGUTtBQUdSWCxRQUFBQSxRQUFRLEVBQUU7QUFBQSxpQkFBTXdCLFVBQU47QUFBQSxTQUhGO0FBSVJ2QixRQUFBQSxLQUFLLEVBQUxBLEtBSlE7QUFLUkMsUUFBQUEsS0FBSyxFQUFMQSxLQUxRO0FBTVJDLFFBQUFBLE1BQU0sRUFBTkE7QUFOUSxPQUFELENBSlE7QUFBQSxLQUFqQjs7QUFhQSxRQUFNOEIsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQUMsR0FBRztBQUFBLGFBQUlBLEdBQUcsQ0FBQztBQUMxQmxDLFFBQUFBLFFBQVEsRUFBRTtBQUFBLGlCQUFNd0IsVUFBTjtBQUFBLFNBRGdCO0FBRTFCdkIsUUFBQUEsS0FBSyxFQUFMQSxLQUYwQjtBQUcxQkMsUUFBQUEsS0FBSyxFQUFMQSxLQUgwQjtBQUkxQkMsUUFBQUEsTUFBTSxFQUFOQTtBQUowQixPQUFELENBQVA7QUFBQSxLQUFwQjs7QUFPQSxRQUFNZ0MsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ0MsUUFBRCxFQUFXaEQsRUFBWCxFQUFlRSxLQUFmO0FBQUEsYUFDYjhDLFFBQVEsQ0FBQztBQUNQaEQsUUFBQUEsRUFBRSxFQUFGQSxFQURPO0FBRVBFLFFBQUFBLEtBQUssRUFBRSxDQUFDQSxLQUZEO0FBR1BULFFBQUFBLEdBQUcsRUFBSEEsR0FITztBQUlQZSxRQUFBQSxLQUFLLEVBQUxBLEtBSk87QUFLUDhCLFFBQUFBLFFBQVEsRUFBUkEsUUFMTztBQU1QdEIsUUFBQUEsTUFBTSxFQUFOQSxNQU5PO0FBT1BULFFBQUFBLElBQUksRUFBRTtBQUNKd0IsVUFBQUEsT0FBTyxFQUFFeEIsSUFETDtBQUVKRSxVQUFBQSxTQUFTLGtDQUNKQSxTQURJLEVBRUgsQ0FBQzBCLE1BQU0sQ0FBQzlCLFFBQUQsQ0FBTixDQUFpQmlDLFFBQWpCLENBQTBCdEMsRUFBMUIsS0FBaUMsRUFBbEMsRUFBc0NOLEtBQXRDLElBQStDLEVBRjVDO0FBR1BNLFlBQUFBLEVBQUUsRUFBRkE7QUFITztBQUZMLFNBUEM7QUFlUGdDLFFBQUFBLFFBQVEsRUFBRTtBQUFBLGlCQUFNUyxVQUFVLENBQUN6QyxFQUFELENBQWhCO0FBQUEsU0FmSDtBQWdCUGlDLFFBQUFBLE1BQU0sRUFBRSxnQkFBQVYsTUFBTTtBQUFBLGlCQUFJb0IsUUFBUSxDQUFDM0MsRUFBRCxFQUFLdUIsTUFBTCxDQUFaO0FBQUEsU0FoQlA7QUFpQlBkLFFBQUFBLFNBQVMsRUFBVEE7QUFqQk8sT0FBRCxDQURLO0FBQUEsS0FBZjs7QUFzQkEsUUFBTVcsS0FBSyxHQUFHO0FBQ1pKLE1BQUFBLE1BQU0sRUFBTkEsTUFEWTtBQUVaaUMsTUFBQUEsT0FBTyxFQUFFO0FBQUEsWUFBQ0QsUUFBRCx1RUFBWWxCLGdCQUFaO0FBQUEsZUFDUGQsTUFBTSxDQUFDYSxNQUFQLEdBQWdCLENBQWhCLEdBRUksNkJBQUMsYUFBRDtBQUNFLFVBQUEsS0FBSyxtQ0FBT2IsTUFBUCxDQURQO0FBRUUsVUFBQSxnQkFBZ0IsRUFBR29CLFVBQVUsQ0FBQ1gsZ0JBRmhDO0FBR0UsVUFBQSxVQUFVLEVBQUdXLFVBQVUsQ0FBQ1QsVUFIMUI7QUFJRSxVQUFBLFVBQVUsRUFBRyxvQkFBQ3VCLFNBQUQsRUFBZTtBQUMxQmQsWUFBQUEsVUFBVSxDQUFDcEIsTUFBWCxvQ0FBd0JrQyxTQUF4QjtBQUFvQ25DLFlBQUFBLE1BQU07QUFDM0M7QUFOSCxXQVFBLHFCQUFVQyxNQUFWLEVBQWtCLFVBQUNkLEtBQUQsRUFBUUYsRUFBUjtBQUFBLG1EQUFtQkEsRUFBbkIsRUFBd0IrQyxNQUFNLENBQUNDLFFBQUQsRUFBV2hELEVBQVgsRUFBZUUsS0FBZixDQUE5QjtBQUFBLFNBQWxCLENBUkEsQ0FGSixHQWFNLElBZEM7QUFBQSxPQUZHO0FBa0JaaUQsTUFBQUEsR0FBRyxFQUFFO0FBQUEsWUFBQ0gsUUFBRCx1RUFBWWxCLGdCQUFaO0FBQUEsZUFDSGQsTUFBTSxDQUFDYSxNQUFQLEdBQWdCLENBQWhCLEdBRUk7QUFBSyxVQUFBLFNBQVMsWUFBTSxrQkFBTyxlQUFQLENBQU47QUFBZCxXQUVBYixNQUFNLENBQUNtQyxHQUFQLENBQVcsVUFBQ25ELEVBQUQsRUFBS0UsS0FBTDtBQUFBLGlCQUNUO0FBQUssWUFBQSxTQUFTLFlBQU0sa0JBQU8saUJBQVAsQ0FBTixDQUFkO0FBQWtELFlBQUEsR0FBRyxFQUFHRjtBQUF4RCxhQUNJK0MsTUFBTSxDQUFDQyxRQUFELEVBQVdoRCxFQUFYLEVBQWVFLEtBQWYsQ0FEVixDQURTO0FBQUEsU0FBWCxDQUZBLENBRkosR0FXTSxJQVpIO0FBQUEsT0FsQk87QUFnQ1phLE1BQUFBLE1BQU0sRUFBRTtBQUFBLFlBQ05xQyxXQURNLHVFQUNRLFVBQUFDLEdBQUc7QUFBQSxpQkFDZjtBQUFLLFlBQUEsU0FBUyxZQUFNLGtCQUFPLE9BQVAsQ0FBTjtBQUFkLGFBQ0U7QUFBSyxZQUFBLFNBQVMsWUFBTSxrQkFBTyxXQUFQLENBQU47QUFBZCxhQUNHQSxHQURILENBREYsRUFJRTtBQUNFLFlBQUEsU0FBUyxFQUFHLGtCQUFPLGtCQUFQLENBRGQ7QUFFRSxZQUFBLE9BQU8sRUFBRztBQUFBLHFCQUFNZCxPQUFPLEVBQWI7QUFBQTtBQUZaLFlBSkYsQ0FEZTtBQUFBLFNBRFg7QUFBQSxZQWFOZSxRQWJNLHVFQWFNakIsUUFBUSxHQUFHakIsS0FBSyxDQUFDNkIsT0FBTixFQUFILEdBQXFCN0IsS0FBSyxDQUFDK0IsR0FBTixFQWJuQztBQUFBLGVBZU47QUFBSyxVQUFBLFNBQVMsWUFBTSxrQkFBTyxZQUFQLENBQU47QUFBZCxXQUNHQyxXQUFXLENBQUNFLFFBQUQsQ0FEZCxDQWZNO0FBQUEsT0FoQ0k7QUFtRFpmLE1BQUFBLE9BQU8sRUFBUEEsT0FuRFk7QUFvRFpFLE1BQUFBLFVBQVUsRUFBVkEsVUFwRFk7QUFxRFpFLE1BQUFBLFFBQVEsRUFBUkEsUUFyRFk7QUFzRFpFLE1BQUFBLFFBQVEsRUFBUkE7QUF0RFksS0FBZDtBQXlEQSw2Q0FBVXhDLFFBQVYsRUFBcUJlLEtBQXJCO0FBQ0QsR0FuSUssQ0FMbUI7QUFBQSxDQUFsQjs7OztBQTBJQSxJQUFNbUMsV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxtRkFBZ0IsRUFBaEI7QUFBQSxNQUFHbkQsUUFBSCxVQUFHQSxRQUFIOztBQUFBLFNBQXVCLHFCQUFVQSxRQUFWLEVBQW9CLFVBQUNDLFFBQUQ7QUFBQSxRQUFhRSxJQUFiLFVBQWFBLElBQWI7QUFBQSw2Q0FDbkVGLFFBRG1FLEVBQ3hERSxJQUR3RDtBQUFBLEdBQXBCLENBQXZCO0FBQUEsQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcHJlZml4LCBtYXBPYmplY3QsIHNsZWVwIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBEaW5vRm9ybUl0ZW0gZnJvbSAnLi9EaW5vRm9ybUl0ZW0nO1xuaW1wb3J0IERyYWcgZnJvbSAnLi9EcmFnJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFJlZihcbiAgZ2V0RnVuID0gKCkgPT4ge30sXG4gIHRpbWVvdXQgPSA1MDAsXG4pIHtcbiAgbGV0IHJlZiA9IGdldEZ1bigpO1xuXG4gIGNvbnN0IHN0YXJ0VGltZSA9ICtuZXcgRGF0ZSgpO1xuXG4gIHdoaWxlICgxKSB7XG4gICAgY29uc3Qgbm93ID0gK25ldyBEYXRlKCk7XG4gICAgaWYgKG5vdyAtIHN0YXJ0VGltZSA+IHRpbWVvdXQpIHtcbiAgICAgIGNvbnNvbGUud2FybignW2Rpbm8tZm9ybV0gZ2V0IHJlZiB0aW1lb3V0LCBtYXliZSB5b3Ugbm90IHJlbmRlciBpdC4nKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGF3YWl0IHNsZWVwKCk7XG5cbiAgICByZWYgPSBnZXRGdW4oKTtcblxuICAgIGlmIChyZWYpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHJlZjtcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUZyYWdtZW50cyA9ICh7IGZyYWdtZW50cywgY3JlYXRlRGlub0Zvcm1BcGkgfSkgPT4gKFxuICBtYXBPYmplY3QoZnJhZ21lbnRzLCAoY29tTmFtZSwgeyBDb20sIC4uLnByb3BzIH0gPSB7fSkgPT4gKHtcbiAgICBbY29tTmFtZV06IE9iamVjdC5hc3NpZ24oXG4gICAgICBjbGFzcyBGcmFnbWVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENvbVxuICAgICAgICAgICAgICBkaW5vRm9ybT17IGNyZWF0ZURpbm9Gb3JtQXBpKCkgfVxuICAgICAgICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgICAgICAgICAgeyAuLi4odGhpcy5wcm9wcyB8fCB7fSkgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9wcyxcbiAgICApLFxuICB9KSlcbik7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVGcm9tSXRlbSA9ICh7IGNyZWF0ZURpbm9Gb3JtQXBpIH0pID0+IChcbiAgY2xhc3MgRGlub0Zvcm1JdGVtV3JhcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPERpbm9Gb3JtSXRlbVxuICAgICAgICAgIGRpbm9Gb3JtPXsgY3JlYXRlRGlub0Zvcm1BcGkoKSB9XG4gICAgICAgICAgeyAuLi4odGhpcy5wcm9wcyB8fCB7fSkgfVxuICAgICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuKTtcblxuXG5leHBvcnQgY29uc3QgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAgPSAoe1xuICBzZXRJRFJlZk1hcCwgQ29tLCB0b3BGb3JtUmVuZGVyLFxufSkgPT4gKFxuICBjbGFzcyBEaW5vRm9ybVdyYXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICB0aGlzLkNvbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgc2V0SURSZWZNYXAoSUQsIHsgcmVmOiB0aGlzLkNvbSB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgc2V0SURSZWZNYXAoSUQsIHsgcmVmOiB1bmRlZmluZWQgfSk7XG4gICAgfVxuXG4gICAgY2F0Y2hSZWYgPSAocmVmKSA9PiB7XG4gICAgICBjb25zdCB7IElELCBjYXRjaFJlZiA9ICgpID0+IHt9IH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5Db20gPSByZWY7XG4gICAgICBjYXRjaFJlZihyZWYpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHsgSUQsIGluZGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbVxuICAgICAgICAgIElEPXsgSUQgfVxuICAgICAgICAgIGluZGV4PXsgaW5kZXggfVxuICAgICAgICAgIHJlZj17IHRoaXMuY2F0Y2hSZWYgfVxuICAgICAgICAgIHRvcEZvcm1SZW5kZXI9eyB0b3BGb3JtUmVuZGVyIH1cbiAgICAgICAgICBzdWJHcm91cEZvcm1cbiAgICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEaW5vRm9ybVN1YkZvcm0gPSBzdWJGb3JtcyA9PiAoXG4gIG1hcE9iamVjdChzdWJGb3JtcywgKGZvcm1OYW1lLCBmb3JtKSA9PiB7XG4gICAgY29uc3QgeyBGb3JtLCBmaWVsZCwgZm9ybVByb3BzID0ge30gfSA9IGZvcm07XG4gICAgY29uc3Qgc3ViRm9ybSA9IHtcbiAgICAgIGZpZWxkLFxuICAgICAgZm9ybVByb3BzLFxuICAgICAgcmVmOiB1bmRlZmluZWQsXG4gICAgICBGb3JtOiBjbGFzcyBEaW5vU3ViRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1cbiAgICAgICAgICAgICAgeyAuLi5mb3JtUHJvcHMgfVxuICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgICByZWY9eyAocmVmKSA9PiB7IHN1YkZvcm0ucmVmID0gcmVmOyB9IH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIFtmb3JtTmFtZV06IHN1YkZvcm0sXG4gICAgfTtcbiAgfSlcbik7XG5cblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtQWRkSXRlbSA9ICh7XG4gIGdldEdyb3VwLFxuICBzZXRJRCxcbiAgZ2V0SUQsXG4gIHJlbmRlcixcbn0pID0+IHtcbiAgY29uc3QgSUQgPSBnZXRJRCgpO1xuICBnZXRHcm91cCgpLklETGlzdC5wdXNoKElEKTtcbiAgc2V0SUQoSUQgKyAxKTtcbiAgcmVuZGVyKCk7XG4gIHJldHVybiBJRDtcbn07XG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybURlbGV0ZUl0ZW0gPSAoeyBJRDogZGVsZXRlSUQsIGdldEdyb3VwLCByZW5kZXIgfSkgPT4ge1xuICBjb25zdCBncm91cCA9IGdldEdyb3VwKCk7XG4gIGdyb3VwLklETGlzdCA9IGdyb3VwLklETGlzdC5maWx0ZXIoSUQgPT4gSUQgIT09IGRlbGV0ZUlEKTtcbiAgcmVuZGVyKCk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlub0Zvcm1Nb3ZlSXRlbSA9ICh7XG4gIElELCBvZmZzZXQsIGdldEdyb3VwLCByZW5kZXIsXG59KSA9PiB7XG4gIGNvbnN0IGdyb3VwID0gZ2V0R3JvdXAoKTtcbiAgY29uc3QgaW5kZXggPSBncm91cC5JRExpc3QuaW5kZXhPZihJRCk7XG4gIGdyb3VwLmxhc3RBY3Rpb25Nb3ZlSUQgPSBJRDtcblxuICBpZiAob2Zmc2V0ID09PSAtSW5maW5pdHkpIHtcbiAgICBncm91cC5sYXN0TW92ZUlEID0gZ3JvdXAuSURMaXN0WzBdO1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoMCwgMCwgSUQpO1xuICB9IGVsc2UgaWYgKG9mZnNldCA9PT0gSW5maW5pdHkpIHtcbiAgICBncm91cC5sYXN0TW92ZUlEID0gZ3JvdXAuSURMaXN0W2dyb3VwLklETGlzdC5sZW5ndGggLSAxXTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGdyb3VwLklETGlzdC5sZW5ndGgsIDAsIElEKTtcbiAgfSBlbHNlIHtcbiAgICBncm91cC5sYXN0TW92ZUlEID0gZ3JvdXAuSURMaXN0W2luZGV4ICsgb2Zmc2V0XTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4ICsgb2Zmc2V0LCAwLCBJRCk7XG4gIH1cblxuICByZW5kZXIoKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtTWFwR3JvdXAgPSAoe1xuICBGb3JtOiB7XG4gICAgRm9ybUNvbSxcbiAgICBmb3JtUHJvcHMsXG4gIH0sXG4gIElELFxuICBJRExpc3QsXG4gIGluZGV4LFxuICBkZWxldGVJdCxcbiAgbW92ZUl0LFxufSkgPT4gKFtcbiAgPEZvcm1Db20geyAuLi5mb3JtUHJvcHMgfSBrZXk9eyBJRCB9IC8+LFxuICA8ZGl2IGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9ucycpIH0ga2V5PVwiZ3JvdXAtYWN0aW9uc1wiPlxuICAgIDxkaXYgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tZGVsZXRlJykgfSBvbkNsaWNrPXsgZGVsZXRlSXQgfSAvPlxuICAgIHtcbiAgICAgIGluZGV4ICE9PSAwXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLXVwJykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoLTEpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICB7XG4gICAgICBpbmRleCAhPT0gSURMaXN0Lmxlbmd0aCAtIDFcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtZG93bicpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KDEpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICB7XG4gICAgICBpbmRleCAhPT0gMFxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS10by1maXJzdCcpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KC1JbmZpbml0eSkgfVxuICAgICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIHtcbiAgICAgIGluZGV4ICE9PSBJRExpc3QubGVuZ3RoIC0gMVxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS10by1sYXN0JykgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBtb3ZlSXQoSW5maW5pdHkpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgPC9kaXY+LFxuXSk7XG5cbmV4cG9ydCBjb25zdCBncm91cHNBUEkgPSAoe1xuICBncm91cHMsXG4gIHJlbmRlcixcbiAgc2V0SUQsXG4gIGdldElELFxufSkgPT4gbWFwT2JqZWN0KGdyb3VwcywgKGZvcm1OYW1lLCBncm91cFZhbHVlKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBDb20sXG4gICAgZmllbGQsXG4gICAgbmVlZERyYWcsXG4gICAgSURSZWZNYXAsXG4gICAgSURMaXN0LFxuICAgIEZvcm0sXG4gICAgZm9ybVByb3BzID0ge30sXG4gIH0gPSBncm91cFZhbHVlO1xuXG4gIGNvbnN0IGFkZEl0ZW0gPSAoXG4gICAgYWRkID0gZGlub0Zvcm1BZGRJdGVtLFxuICApID0+IGFkZCh7XG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBkZWxldGVJdGVtID0gKFxuICAgIElELFxuICAgIGRlbGV0ZUl0ZW1GdW4gPSBkaW5vRm9ybURlbGV0ZUl0ZW0sXG4gICkgPT4gZGVsZXRlSXRlbUZ1bih7XG4gICAgSUQsXG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBtb3ZlSXRlbSA9IChcbiAgICBJRCxcbiAgICBvZmZzZXQsXG4gICAgbW92ZSA9IGRpbm9Gb3JtTW92ZUl0ZW0sXG4gICkgPT4gbW92ZSh7XG4gICAgSUQsXG4gICAgb2Zmc2V0LFxuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgZG9BY3Rpb24gPSBmdW4gPT4gZnVuKHtcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IG1hcEZ1biA9IChtYXBHcm91cCwgSUQsIGluZGV4KSA9PiAoXG4gICAgbWFwR3JvdXAoe1xuICAgICAgSUQsXG4gICAgICBpbmRleDogK2luZGV4LFxuICAgICAgQ29tLFxuICAgICAgZmllbGQsXG4gICAgICBJRFJlZk1hcCxcbiAgICAgIElETGlzdCxcbiAgICAgIEZvcm06IHtcbiAgICAgICAgRm9ybUNvbTogRm9ybSxcbiAgICAgICAgZm9ybVByb3BzOiB7XG4gICAgICAgICAgLi4uZm9ybVByb3BzLFxuICAgICAgICAgIC4uLigoZ3JvdXBzW2Zvcm1OYW1lXS5JRFJlZk1hcFtJRF0gfHwge30pLnByb3BzIHx8IHt9KSxcbiAgICAgICAgICBJRCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBkZWxldGVJdDogKCkgPT4gZGVsZXRlSXRlbShJRCksXG4gICAgICBtb3ZlSXQ6IG9mZnNldCA9PiBtb3ZlSXRlbShJRCwgb2Zmc2V0KSxcbiAgICAgIGZvcm1Qcm9wcyxcbiAgICB9KVxuICApO1xuXG4gIGNvbnN0IGdyb3VwID0ge1xuICAgIElETGlzdCxcbiAgICBkcmFnTWFwOiAobWFwR3JvdXAgPSBkaW5vRm9ybU1hcEdyb3VwKSA9PiAoXG4gICAgICBJRExpc3QubGVuZ3RoID4gMFxuICAgICAgICA/IChcbiAgICAgICAgICA8RHJhZ1xuICAgICAgICAgICAgb3JkZXI9eyBbLi4uSURMaXN0XSB9XG4gICAgICAgICAgICBsYXN0QWN0aW9uTW92ZUlEPXsgZ3JvdXBWYWx1ZS5sYXN0QWN0aW9uTW92ZUlEIH1cbiAgICAgICAgICAgIGxhc3RNb3ZlSUQ9eyBncm91cFZhbHVlLmxhc3RNb3ZlSUQgfVxuICAgICAgICAgICAgY2hhbmdlRG9uZT17IChuZXdJRExpc3QpID0+IHtcbiAgICAgICAgICAgICAgZ3JvdXBWYWx1ZS5JRExpc3QgPSBbLi4ubmV3SURMaXN0XTsgcmVuZGVyKCk7XG4gICAgICAgICAgICB9IH0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgbWFwT2JqZWN0KElETGlzdCwgKGluZGV4LCBJRCkgPT4gKHsgW0lEXTogbWFwRnVuKG1hcEdyb3VwLCBJRCwgaW5kZXgpIH0pKVxuICAgICAgICB9XG4gICAgICAgICAgPC9EcmFnPlxuICAgICAgICApIDogbnVsbFxuICAgICksXG4gICAgbWFwOiAobWFwR3JvdXAgPSBkaW5vRm9ybU1hcEdyb3VwKSA9PiAoXG4gICAgICBJRExpc3QubGVuZ3RoID4gMFxuICAgICAgICA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnbWFwLWNvbnRhaW5lcicpfWAgfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICBJRExpc3QubWFwKChJRCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1pdGVtLXdyYXAnKX1gIH0ga2V5PXsgSUQgfT5cbiAgICAgICAgICAgICAgeyBtYXBGdW4obWFwR3JvdXAsIElELCBpbmRleCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKVxuICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsXG4gICAgKSxcbiAgICByZW5kZXI6IChcbiAgICAgIHJlbmRlckdyb3VwID0gZWxlID0+IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwJyl9YCB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1lbGUnKX1gIH0+XG4gICAgICAgICAgICB7ZWxlfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLWFkZCcpIH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBhZGRJdGVtKCkgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApLFxuICAgICAgLy8gY2hpbGRyZW4gPSAobmVlZERyYXAgPyBncm91cC5kcmFnTWFwKCkgOiBncm91cC5tYXAoKSksXG4gICAgICBjaGlsZHJlbiA9IChuZWVkRHJhZyA/IGdyb3VwLmRyYWdNYXAoKSA6IGdyb3VwLm1hcCgpKSxcbiAgICApID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC13cmFwJyl9YCB9PlxuICAgICAgICB7cmVuZGVyR3JvdXAoY2hpbGRyZW4pfVxuICAgICAgPC9kaXY+XG4gICAgKSxcbiAgICBhZGRJdGVtLFxuICAgIGRlbGV0ZUl0ZW0sXG4gICAgbW92ZUl0ZW0sXG4gICAgZG9BY3Rpb24sXG4gIH07XG5cbiAgcmV0dXJuIHsgW2Zvcm1OYW1lXTogZ3JvdXAgfTtcbn0pO1xuXG5leHBvcnQgY29uc3Qgc3ViRm9ybXNBUEkgPSAoeyBzdWJGb3JtcyB9ID0ge30pID0+IG1hcE9iamVjdChzdWJGb3JtcywgKGZvcm1OYW1lLCB7IEZvcm0gfSkgPT4gKHtcbiAgW2Zvcm1OYW1lXTogRm9ybSxcbn0pKTtcbiJdfQ==