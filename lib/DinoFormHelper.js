"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subFormsAPI = exports.groupsAPI = exports.dinoFormMapGroup = exports.dinoFormMoveItem = exports.dinoFormDeleteItem = exports.dinoFormAddItem = exports.createDinoFormSubForm = exports.createDinoFormGroupWrap = exports.createFromItem = exports.createFragments = void 0;

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

var _react = _interopRequireWildcard(require("react"));

var _util = require("./util");

var _DinoFormItem = _interopRequireDefault(require("./DinoFormItem"));

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

    var group = {
      IDList: IDList,
      map: function map() {
        var mapGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dinoFormMapGroup;
        return IDList.map(function (ID, index) {
          return _react.default.createElement("div", {
            key: ID,
            className: "".concat((0, _util.prefix)('group-item-wrap'))
          }, mapGroup({
            ID: ID,
            index: index,
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
          }));
        });
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
        var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : group.map();
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
  var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      subForms = _ref14.subForms;

  return (0, _util.mapObject)(subForms, function (formName, _ref15) {
    var Form = _ref15.Form;
    return (0, _defineProperty2.default)({}, formName, Form);
  });
};

exports.subFormsAPI = subFormsAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUhlbHBlci5qc3giXSwibmFtZXMiOlsiY3JlYXRlRnJhZ21lbnRzIiwiZnJhZ21lbnRzIiwiY3JlYXRlRGlub0Zvcm1BcGkiLCJjb21OYW1lIiwiQ29tIiwicHJvcHMiLCJDb21wb25lbnQiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwic2V0SURSZWZNYXAiLCJ0b3BGb3JtUmVuZGVyIiwicmVmIiwiSUQiLCJjYXRjaFJlZiIsInVuZGVmaW5lZCIsImluZGV4IiwiY3JlYXRlRGlub0Zvcm1TdWJGb3JtIiwic3ViRm9ybXMiLCJmb3JtTmFtZSIsImZvcm0iLCJGb3JtIiwiZmllbGQiLCJmb3JtUHJvcHMiLCJzdWJGb3JtIiwiZGlub0Zvcm1BZGRJdGVtIiwiZ2V0R3JvdXAiLCJzZXRJRCIsImdldElEIiwicmVuZGVyIiwiSURMaXN0IiwicHVzaCIsImRpbm9Gb3JtRGVsZXRlSXRlbSIsImRlbGV0ZUlEIiwiZ3JvdXAiLCJmaWx0ZXIiLCJkaW5vRm9ybU1vdmVJdGVtIiwib2Zmc2V0IiwiaW5kZXhPZiIsInNwbGljZSIsIkluZmluaXR5IiwibGVuZ3RoIiwiZGlub0Zvcm1NYXBHcm91cCIsIkZvcm1Db20iLCJkZWxldGVJdCIsIm1vdmVJdCIsImdyb3Vwc0FQSSIsImdyb3VwcyIsImdyb3VwVmFsdWUiLCJJRFJlZk1hcCIsImFkZEl0ZW0iLCJhZGQiLCJkZWxldGVJdGVtIiwiZGVsZXRlSXRlbUZ1biIsIm1vdmVJdGVtIiwibW92ZSIsImRvQWN0aW9uIiwiZnVuIiwibWFwIiwibWFwR3JvdXAiLCJyZW5kZXJHcm91cCIsImVsZSIsImNoaWxkcmVuIiwic3ViRm9ybXNBUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVPLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0I7QUFBQSxNQUFHQyxTQUFILFFBQUdBLFNBQUg7QUFBQSxNQUFjQyxpQkFBZCxRQUFjQSxpQkFBZDtBQUFBLFNBQzdCLHFCQUFVRCxTQUFWLEVBQXFCLFVBQUNFLE9BQUQ7QUFBQSxvRkFBOEIsRUFBOUI7QUFBQSxRQUFZQyxHQUFaLFNBQVlBLEdBQVo7QUFBQSxRQUFvQkMsS0FBcEI7O0FBQUEsNkNBQ2xCRixPQURrQixFQUNSO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxpQ0FFRTtBQUNQLGlCQUNFLDZCQUFDLEdBQUQ7QUFDRSxZQUFBLFFBQVEsRUFBR0QsaUJBQWlCO0FBRDlCLGFBRU9HLEtBRlAsRUFHUSxLQUFLQSxLQUFMLElBQWMsRUFIdEIsRUFERjtBQU9EO0FBVk07QUFBQTtBQUFBLE1BQ2NDLGdCQURkLEdBWVRELEtBWlMsQ0FEUTtBQUFBLEdBQXJCLENBRDZCO0FBQUEsQ0FBeEI7Ozs7QUFtQkEsSUFBTUUsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQjtBQUFBLE1BQUdMLGlCQUFILFNBQUdBLGlCQUFIO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGlDQUVqQjtBQUNQLGlCQUNFLDZCQUFDLHFCQUFEO0FBQ0UsWUFBQSxRQUFRLEVBQUdBLGlCQUFpQjtBQUQ5QixhQUVRLEtBQUtHLEtBQUwsSUFBYyxFQUZ0QixFQURGO0FBTUQ7QUFUeUI7QUFBQTtBQUFBLE1BQ0dDLGdCQURIO0FBQUE7QUFBQSxDQUF2Qjs7OztBQWNBLElBQU1FLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEI7QUFBQTs7QUFBQSxNQUFHQyxXQUFILFNBQUdBLFdBQUg7QUFBQSxNQUFnQkwsR0FBaEIsU0FBZ0JBLEdBQWhCO0FBQUEsTUFBcUJNLGFBQXJCLFNBQXFCQSxhQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVuQywwQkFBWUwsS0FBWixFQUFtQjtBQUFBOztBQUFBO0FBQ2pCLG9IQUFNQSxLQUFOO0FBRGlCLG1JQWVSLFVBQUNNLEdBQUQsRUFBUztBQUFBLDBCQUNrQixNQUFLTixLQUR2QjtBQUFBLFlBQ1ZPLEVBRFUsZUFDVkEsRUFEVTtBQUFBLCtDQUNOQyxRQURNO0FBQUEsWUFDTkEsUUFETSxxQ0FDSyxZQUFNLENBQUUsQ0FEYjtBQUVsQixjQUFLVCxHQUFMLEdBQVdPLEdBQVg7QUFDQUUsUUFBQUEsUUFBUSxDQUFDRixHQUFELENBQVI7QUFDRCxPQW5Ca0I7QUFFakIsWUFBS1AsR0FBTCxHQUFXVSxTQUFYO0FBRmlCO0FBR2xCOztBQUxrQztBQUFBO0FBQUEsMENBT2Y7QUFBQSwyQkFDSSxLQUFLVCxLQURUO0FBQUEsWUFDVk8sRUFEVSxnQkFDVkEsRUFEVTtBQUFBLFlBQ05HLEtBRE0sZ0JBQ05BLEtBRE07QUFFbEJOLFFBQUFBLFdBQVcsQ0FBQ0csRUFBRCxFQUFLO0FBQUVELFVBQUFBLEdBQUcsRUFBRSxLQUFLUDtBQUFaLFNBQUwsQ0FBWDtBQUNEO0FBVmtDO0FBQUE7QUFBQSw2Q0FZWjtBQUFBLDJCQUNDLEtBQUtDLEtBRE47QUFBQSxZQUNiTyxFQURhLGdCQUNiQSxFQURhO0FBQUEsWUFDVEcsS0FEUyxnQkFDVEEsS0FEUztBQUVyQk4sUUFBQUEsV0FBVyxDQUFDRyxFQUFELEVBQUs7QUFBRUQsVUFBQUEsR0FBRyxFQUFFRztBQUFQLFNBQUwsQ0FBWDtBQUNEO0FBZmtDO0FBQUE7QUFBQSwrQkF1QjFCO0FBQUEsMkJBQ2UsS0FBS1QsS0FEcEI7QUFBQSxZQUNDTyxFQURELGdCQUNDQSxFQUREO0FBQUEsWUFDS0csS0FETCxnQkFDS0EsS0FETDtBQUVQLGVBQ0UsNkJBQUMsR0FBRDtBQUNFLFVBQUEsR0FBRyxFQUFHLEtBQUtGLFFBRGI7QUFFRSxVQUFBLGFBQWEsRUFBR0gsYUFGbEI7QUFHRSxVQUFBLFlBQVk7QUFIZCxVQURGO0FBT0Q7QUFoQ2tDO0FBQUE7QUFBQSxJQUNWSixnQkFEVTtBQUFBLENBQWhDOzs7O0FBb0NBLElBQU1VLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQUMsUUFBUTtBQUFBLFNBQzNDLHFCQUFVQSxRQUFWLEVBQW9CLFVBQUNDLFFBQUQsRUFBV0MsSUFBWCxFQUFvQjtBQUFBLFFBQzlCQyxJQUQ4QixHQUNFRCxJQURGLENBQzlCQyxJQUQ4QjtBQUFBLFFBQ3hCQyxLQUR3QixHQUNFRixJQURGLENBQ3hCRSxLQUR3QjtBQUFBLDBCQUNFRixJQURGLENBQ2pCRyxTQURpQjtBQUFBLFFBQ2pCQSxTQURpQixnQ0FDTCxFQURLO0FBRXRDLFFBQU1DLE9BQU8sR0FBRztBQUNkRixNQUFBQSxLQUFLLEVBQUxBLEtBRGM7QUFFZEMsTUFBQUEsU0FBUyxFQUFUQSxTQUZjO0FBR2RYLE1BQUFBLEdBQUcsRUFBRUcsU0FIUztBQUlkTSxNQUFBQSxJQUFJO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQ0FDTztBQUNQLG1CQUNFLDZCQUFDLElBQUQsNkJBQ09FLFNBRFAsRUFFTyxLQUFLakIsS0FGWjtBQUdFLGNBQUEsR0FBRyxFQUFHLGFBQUNNLEtBQUQsRUFBUztBQUFFWSxnQkFBQUEsT0FBTyxDQUFDWixHQUFSLEdBQWNBLEtBQWQ7QUFBb0I7QUFIdkMsZUFERjtBQU9EO0FBVEM7QUFBQTtBQUFBLFFBQTRCTCxnQkFBNUI7QUFKVSxLQUFoQjtBQWdCQSw2Q0FDR1ksUUFESCxFQUNjSyxPQURkO0FBR0QsR0FyQkQsQ0FEMkM7QUFBQSxDQUF0Qzs7OztBQTBCQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLFFBS3pCO0FBQUEsTUFKSkMsUUFJSSxTQUpKQSxRQUlJO0FBQUEsTUFISkMsS0FHSSxTQUhKQSxLQUdJO0FBQUEsTUFGSkMsS0FFSSxTQUZKQSxLQUVJO0FBQUEsTUFESkMsTUFDSSxTQURKQSxNQUNJO0FBQ0osTUFBTWhCLEVBQUUsR0FBR2UsS0FBSyxFQUFoQjtBQUNBRixFQUFBQSxRQUFRLEdBQUdJLE1BQVgsQ0FBa0JDLElBQWxCLENBQXVCbEIsRUFBdkI7QUFDQWMsRUFBQUEsS0FBSyxDQUFDZCxFQUFFLEdBQUcsQ0FBTixDQUFMO0FBQ0FnQixFQUFBQSxNQUFNO0FBQ04sU0FBT2hCLEVBQVA7QUFDRCxDQVhNOzs7O0FBYUEsSUFBTW1CLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsUUFBd0M7QUFBQSxNQUFqQ0MsUUFBaUMsU0FBckNwQixFQUFxQztBQUFBLE1BQXZCYSxRQUF1QixTQUF2QkEsUUFBdUI7QUFBQSxNQUFiRyxNQUFhLFNBQWJBLE1BQWE7QUFDeEUsTUFBTUssS0FBSyxHQUFHUixRQUFRLEVBQXRCO0FBQ0FRLEVBQUFBLEtBQUssQ0FBQ0osTUFBTixHQUFlSSxLQUFLLENBQUNKLE1BQU4sQ0FBYUssTUFBYixDQUFvQixVQUFBdEIsRUFBRTtBQUFBLFdBQUlBLEVBQUUsS0FBS29CLFFBQVg7QUFBQSxHQUF0QixDQUFmO0FBQ0FKLEVBQUFBLE1BQU07QUFDUCxDQUpNOzs7O0FBTUEsSUFBTU8sZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixTQUUxQjtBQUFBLE1BREp2QixFQUNJLFVBREpBLEVBQ0k7QUFBQSxNQURBd0IsTUFDQSxVQURBQSxNQUNBO0FBQUEsTUFEUVgsUUFDUixVQURRQSxRQUNSO0FBQUEsTUFEa0JHLE1BQ2xCLFVBRGtCQSxNQUNsQjtBQUNKLE1BQU1LLEtBQUssR0FBR1IsUUFBUSxFQUF0QjtBQUNBLE1BQU1WLEtBQUssR0FBR2tCLEtBQUssQ0FBQ0osTUFBTixDQUFhUSxPQUFiLENBQXFCekIsRUFBckIsQ0FBZDtBQUNBcUIsRUFBQUEsS0FBSyxDQUFDSixNQUFOLENBQWFTLE1BQWIsQ0FBb0J2QixLQUFwQixFQUEyQixDQUEzQjs7QUFDQSxNQUFJcUIsTUFBTSxLQUFLLENBQUNHLFFBQWhCLEVBQTBCO0FBQ3hCTixJQUFBQSxLQUFLLENBQUNKLE1BQU4sQ0FBYVMsTUFBYixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQjFCLEVBQTFCO0FBQ0QsR0FGRCxNQUVPLElBQUl3QixNQUFNLEtBQUtHLFFBQWYsRUFBeUI7QUFDOUJOLElBQUFBLEtBQUssQ0FBQ0osTUFBTixDQUFhUyxNQUFiLENBQW9CTCxLQUFLLENBQUNKLE1BQU4sQ0FBYVcsTUFBakMsRUFBeUMsQ0FBekMsRUFBNEM1QixFQUE1QztBQUNELEdBRk0sTUFFQTtBQUNMcUIsSUFBQUEsS0FBSyxDQUFDSixNQUFOLENBQWFTLE1BQWIsQ0FBb0J2QixLQUFLLEdBQUdxQixNQUE1QixFQUFvQyxDQUFwQyxFQUF1Q3hCLEVBQXZDO0FBQ0Q7O0FBQ0RnQixFQUFBQSxNQUFNO0FBQ1AsQ0FkTTs7OztBQWlCQSxJQUFNYSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsMkJBQzlCckIsSUFEOEI7QUFBQSxNQUU1QnNCLE9BRjRCLGVBRTVCQSxPQUY0QjtBQUFBLE1BRzVCcEIsU0FINEIsZUFHNUJBLFNBSDRCO0FBQUEsTUFLOUJWLEVBTDhCLFVBSzlCQSxFQUw4QjtBQUFBLE1BTTlCaUIsTUFOOEIsVUFNOUJBLE1BTjhCO0FBQUEsTUFPOUJkLEtBUDhCLFVBTzlCQSxLQVA4QjtBQUFBLE1BUTlCNEIsUUFSOEIsVUFROUJBLFFBUjhCO0FBQUEsTUFTOUJDLE1BVDhCLFVBUzlCQSxNQVQ4QjtBQUFBLFNBVXpCLENBQ0wsNkJBQUMsT0FBRCw2QkFBY3RCLFNBQWQ7QUFBMEIsSUFBQSxHQUFHLEVBQUdWO0FBQWhDLEtBREssRUFFTDtBQUFLLElBQUEsU0FBUyxFQUFHLGtCQUFPLGVBQVAsQ0FBakI7QUFBMkMsSUFBQSxHQUFHLEVBQUM7QUFBL0MsS0FDRTtBQUFLLElBQUEsU0FBUyxFQUFHLGtCQUFPLHFCQUFQLENBQWpCO0FBQWlELElBQUEsT0FBTyxFQUFHK0I7QUFBM0QsSUFERixFQUdJNUIsS0FBSyxLQUFLLENBQVYsSUFFRTtBQUNFLElBQUEsU0FBUyxFQUFHLGtCQUFPLHNCQUFQLENBRGQ7QUFFRSxJQUFBLE9BQU8sRUFBRztBQUFBLGFBQU02QixNQUFNLENBQUMsQ0FBQyxDQUFGLENBQVo7QUFBQTtBQUZaLElBTE4sRUFZSTdCLEtBQUssS0FBS2MsTUFBTSxDQUFDVyxNQUFQLEdBQWdCLENBQTFCLElBRUU7QUFDRSxJQUFBLFNBQVMsRUFBRyxrQkFBTyx3QkFBUCxDQURkO0FBRUUsSUFBQSxPQUFPLEVBQUc7QUFBQSxhQUFNSSxNQUFNLENBQUMsQ0FBRCxDQUFaO0FBQUE7QUFGWixJQWROLEVBcUJJN0IsS0FBSyxLQUFLLENBQVYsSUFFRTtBQUNFLElBQUEsU0FBUyxFQUFHLGtCQUFPLDRCQUFQLENBRGQ7QUFFRSxJQUFBLE9BQU8sRUFBRztBQUFBLGFBQU02QixNQUFNLENBQUMsQ0FBQ0wsUUFBRixDQUFaO0FBQUE7QUFGWixJQXZCTixFQThCSXhCLEtBQUssS0FBS2MsTUFBTSxDQUFDVyxNQUFQLEdBQWdCLENBQTFCLElBRUU7QUFDRSxJQUFBLFNBQVMsRUFBRyxrQkFBTywyQkFBUCxDQURkO0FBRUUsSUFBQSxPQUFPLEVBQUc7QUFBQSxhQUFNSSxNQUFNLENBQUNMLFFBQUQsQ0FBWjtBQUFBO0FBRlosSUFoQ04sQ0FGSyxDQVZ5QjtBQUFBLENBQXpCOzs7O0FBcURBLElBQU1NLFNBQVMsR0FBRyxTQUFaQSxTQUFZO0FBQUEsTUFDdkJDLE1BRHVCLFVBQ3ZCQSxNQUR1QjtBQUFBLE1BRXZCbEIsTUFGdUIsVUFFdkJBLE1BRnVCO0FBQUEsTUFHdkJGLEtBSHVCLFVBR3ZCQSxLQUh1QjtBQUFBLE1BSXZCQyxLQUp1QixVQUl2QkEsS0FKdUI7QUFBQSxTQUtuQixxQkFBVW1CLE1BQVYsRUFBa0IsVUFBQzVCLFFBQUQsRUFBVzZCLFVBQVgsRUFBMEI7QUFBQSxRQUU5QzNDLEdBRjhDLEdBUTVDMkMsVUFSNEMsQ0FFOUMzQyxHQUY4QztBQUFBLFFBRzlDaUIsS0FIOEMsR0FRNUMwQixVQVI0QyxDQUc5QzFCLEtBSDhDO0FBQUEsUUFJOUMyQixRQUo4QyxHQVE1Q0QsVUFSNEMsQ0FJOUNDLFFBSjhDO0FBQUEsUUFLOUNuQixNQUw4QyxHQVE1Q2tCLFVBUjRDLENBSzlDbEIsTUFMOEM7QUFBQSxRQU05Q1QsSUFOOEMsR0FRNUMyQixVQVI0QyxDQU05QzNCLElBTjhDO0FBQUEsZ0NBUTVDMkIsVUFSNEMsQ0FPOUN6QixTQVA4QztBQUFBLFFBTzlDQSxTQVA4QyxzQ0FPbEMsRUFQa0M7O0FBVWhELFFBQU0yQixPQUFPLEdBQUcsU0FBVkEsT0FBVTtBQUFBLFVBQ2RDLEdBRGMsdUVBQ1IxQixlQURRO0FBQUEsYUFFWDBCLEdBQUcsQ0FBQztBQUNQekIsUUFBQUEsUUFBUSxFQUFFO0FBQUEsaUJBQU1zQixVQUFOO0FBQUEsU0FESDtBQUVQckIsUUFBQUEsS0FBSyxFQUFMQSxLQUZPO0FBR1BDLFFBQUFBLEtBQUssRUFBTEEsS0FITztBQUlQQyxRQUFBQSxNQUFNLEVBQU5BO0FBSk8sT0FBRCxDQUZRO0FBQUEsS0FBaEI7O0FBU0EsUUFBTXVCLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQ2pCdkMsRUFEaUI7QUFBQSxVQUVqQndDLGFBRmlCLHVFQUVEckIsa0JBRkM7QUFBQSxhQUdkcUIsYUFBYSxDQUFDO0FBQ2pCeEMsUUFBQUEsRUFBRSxFQUFGQSxFQURpQjtBQUVqQmEsUUFBQUEsUUFBUSxFQUFFO0FBQUEsaUJBQU1zQixVQUFOO0FBQUEsU0FGTztBQUdqQnJCLFFBQUFBLEtBQUssRUFBTEEsS0FIaUI7QUFJakJDLFFBQUFBLEtBQUssRUFBTEEsS0FKaUI7QUFLakJDLFFBQUFBLE1BQU0sRUFBTkE7QUFMaUIsT0FBRCxDQUhDO0FBQUEsS0FBbkI7O0FBV0EsUUFBTXlCLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQ2Z6QyxFQURlLEVBRWZ3QixNQUZlO0FBQUEsVUFHZmtCLElBSGUsdUVBR1JuQixnQkFIUTtBQUFBLGFBSVptQixJQUFJLENBQUM7QUFDUjFDLFFBQUFBLEVBQUUsRUFBRkEsRUFEUTtBQUVSd0IsUUFBQUEsTUFBTSxFQUFOQSxNQUZRO0FBR1JYLFFBQUFBLFFBQVEsRUFBRTtBQUFBLGlCQUFNc0IsVUFBTjtBQUFBLFNBSEY7QUFJUnJCLFFBQUFBLEtBQUssRUFBTEEsS0FKUTtBQUtSQyxRQUFBQSxLQUFLLEVBQUxBLEtBTFE7QUFNUkMsUUFBQUEsTUFBTSxFQUFOQTtBQU5RLE9BQUQsQ0FKUTtBQUFBLEtBQWpCOztBQWFBLFFBQU0yQixRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFBQyxHQUFHO0FBQUEsYUFBSUEsR0FBRyxDQUFDO0FBQzFCL0IsUUFBQUEsUUFBUSxFQUFFO0FBQUEsaUJBQU1zQixVQUFOO0FBQUEsU0FEZ0I7QUFFMUJyQixRQUFBQSxLQUFLLEVBQUxBLEtBRjBCO0FBRzFCQyxRQUFBQSxLQUFLLEVBQUxBLEtBSDBCO0FBSTFCQyxRQUFBQSxNQUFNLEVBQU5BO0FBSjBCLE9BQUQsQ0FBUDtBQUFBLEtBQXBCOztBQU9BLFFBQU1LLEtBQUssR0FBRztBQUNaSixNQUFBQSxNQUFNLEVBQU5BLE1BRFk7QUFFWjRCLE1BQUFBLEdBQUcsRUFBRTtBQUFBLFlBQUNDLFFBQUQsdUVBQVlqQixnQkFBWjtBQUFBLGVBQWlDWixNQUFNLENBQUM0QixHQUFQLENBQVcsVUFBQzdDLEVBQUQsRUFBS0csS0FBTDtBQUFBLGlCQUMvQztBQUNFLFlBQUEsR0FBRyxFQUFHSCxFQURSO0FBRUUsWUFBQSxTQUFTLFlBQU0sa0JBQU8saUJBQVAsQ0FBTjtBQUZYLGFBSUk4QyxRQUFRLENBQUM7QUFDUDlDLFlBQUFBLEVBQUUsRUFBRkEsRUFETztBQUVQRyxZQUFBQSxLQUFLLEVBQUxBLEtBRk87QUFHUFgsWUFBQUEsR0FBRyxFQUFIQSxHQUhPO0FBSVBpQixZQUFBQSxLQUFLLEVBQUxBLEtBSk87QUFLUDJCLFlBQUFBLFFBQVEsRUFBUkEsUUFMTztBQU1QbkIsWUFBQUEsTUFBTSxFQUFOQSxNQU5PO0FBT1BULFlBQUFBLElBQUksRUFBRTtBQUNKc0IsY0FBQUEsT0FBTyxFQUFFdEIsSUFETDtBQUVKRSxjQUFBQSxTQUFTLGtDQUNKQSxTQURJLEVBRUgsQ0FBQ3dCLE1BQU0sQ0FBQzVCLFFBQUQsQ0FBTixDQUFpQjhCLFFBQWpCLENBQTBCcEMsRUFBMUIsS0FBaUMsRUFBbEMsRUFBc0NQLEtBQXRDLElBQStDLEVBRjVDO0FBR1BPLGdCQUFBQSxFQUFFLEVBQUZBO0FBSE87QUFGTCxhQVBDO0FBZVArQixZQUFBQSxRQUFRLEVBQUU7QUFBQSxxQkFBTVEsVUFBVSxDQUFDdkMsRUFBRCxDQUFoQjtBQUFBLGFBZkg7QUFnQlBnQyxZQUFBQSxNQUFNLEVBQUUsZ0JBQUFSLE1BQU07QUFBQSxxQkFBSWlCLFFBQVEsQ0FBQ3pDLEVBQUQsRUFBS3dCLE1BQUwsQ0FBWjtBQUFBLGFBaEJQO0FBaUJQZCxZQUFBQSxTQUFTLEVBQVRBO0FBakJPLFdBQUQsQ0FKWixDQUQrQztBQUFBLFNBQVgsQ0FBakM7QUFBQSxPQUZPO0FBNkJaTSxNQUFBQSxNQUFNLEVBQUU7QUFBQSxZQUNOK0IsV0FETSx1RUFDUSxVQUFBQyxHQUFHO0FBQUEsaUJBQ2Y7QUFBSyxZQUFBLFNBQVMsWUFBTSxrQkFBTyxPQUFQLENBQU47QUFBZCxhQUNFO0FBQUssWUFBQSxTQUFTLFlBQU0sa0JBQU8sV0FBUCxDQUFOO0FBQWQsYUFDR0EsR0FESCxDQURGLEVBSUU7QUFDRSxZQUFBLFNBQVMsRUFBRyxrQkFBTyxrQkFBUCxDQURkO0FBRUUsWUFBQSxPQUFPLEVBQUc7QUFBQSxxQkFBTVgsT0FBTyxFQUFiO0FBQUE7QUFGWixZQUpGLENBRGU7QUFBQSxTQURYO0FBQUEsWUFZTlksUUFaTSx1RUFZSzVCLEtBQUssQ0FBQ3dCLEdBQU4sRUFaTDtBQUFBLGVBY047QUFBSyxVQUFBLFNBQVMsWUFBTSxrQkFBTyxZQUFQLENBQU47QUFBZCxXQUNHRSxXQUFXLENBQUNFLFFBQUQsQ0FEZCxDQWRNO0FBQUEsT0E3Qkk7QUErQ1paLE1BQUFBLE9BQU8sRUFBUEEsT0EvQ1k7QUFnRFpFLE1BQUFBLFVBQVUsRUFBVkEsVUFoRFk7QUFpRFpFLE1BQUFBLFFBQVEsRUFBUkEsUUFqRFk7QUFrRFpFLE1BQUFBLFFBQVEsRUFBUkE7QUFsRFksS0FBZDtBQXFEQSw2Q0FBVXJDLFFBQVYsRUFBcUJlLEtBQXJCO0FBQ0QsR0F4R0ssQ0FMbUI7QUFBQSxDQUFsQjs7OztBQStHQSxJQUFNNkIsV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxtRkFBZ0IsRUFBaEI7QUFBQSxNQUFHN0MsUUFBSCxVQUFHQSxRQUFIOztBQUFBLFNBQXVCLHFCQUFVQSxRQUFWLEVBQW9CLFVBQUNDLFFBQUQ7QUFBQSxRQUFhRSxJQUFiLFVBQWFBLElBQWI7QUFBQSw2Q0FDbkVGLFFBRG1FLEVBQ3hERSxJQUR3RDtBQUFBLEdBQXBCLENBQXZCO0FBQUEsQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcHJlZml4LCBtYXBPYmplY3QgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IERpbm9Gb3JtSXRlbSBmcm9tICcuL0Rpbm9Gb3JtSXRlbSc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVGcmFnbWVudHMgPSAoeyBmcmFnbWVudHMsIGNyZWF0ZURpbm9Gb3JtQXBpIH0pID0+IChcbiAgbWFwT2JqZWN0KGZyYWdtZW50cywgKGNvbU5hbWUsIHsgQ29tLCAuLi5wcm9wcyB9ID0ge30pID0+ICh7XG4gICAgW2NvbU5hbWVdOiBPYmplY3QuYXNzaWduKFxuICAgICAgY2xhc3MgRnJhZ21lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDb21cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyBjcmVhdGVEaW5vRm9ybUFwaSgpIH1cbiAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgIHsgLi4uKHRoaXMucHJvcHMgfHwge30pIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvcHMsXG4gICAgKSxcbiAgfSkpXG4pO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRnJvbUl0ZW0gPSAoeyBjcmVhdGVEaW5vRm9ybUFwaSB9KSA9PiAoXG4gIGNsYXNzIERpbm9Gb3JtSXRlbVdyYXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxEaW5vRm9ybUl0ZW1cbiAgICAgICAgICBkaW5vRm9ybT17IGNyZWF0ZURpbm9Gb3JtQXBpKCkgfVxuICAgICAgICAgIHsgLi4uKHRoaXMucHJvcHMgfHwge30pIH1cbiAgICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbik7XG5cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwID0gKHsgc2V0SURSZWZNYXAsIENvbSwgdG9wRm9ybVJlbmRlciB9KSA9PiAoXG4gIGNsYXNzIERpbm9Gb3JtV3JhcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIHRoaXMuQ29tID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgY29uc3QgeyBJRCwgaW5kZXggfSA9IHRoaXMucHJvcHM7XG4gICAgICBzZXRJRFJlZk1hcChJRCwgeyByZWY6IHRoaXMuQ29tIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgY29uc3QgeyBJRCwgaW5kZXggfSA9IHRoaXMucHJvcHM7XG4gICAgICBzZXRJRFJlZk1hcChJRCwgeyByZWY6IHVuZGVmaW5lZCB9KTtcbiAgICB9XG5cbiAgICBjYXRjaFJlZiA9IChyZWYpID0+IHtcbiAgICAgIGNvbnN0IHsgSUQsIGNhdGNoUmVmID0gKCkgPT4ge30gfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLkNvbSA9IHJlZjtcbiAgICAgIGNhdGNoUmVmKHJlZik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgeyBJRCwgaW5kZXggfSA9IHRoaXMucHJvcHM7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29tXG4gICAgICAgICAgcmVmPXsgdGhpcy5jYXRjaFJlZiB9XG4gICAgICAgICAgdG9wRm9ybVJlbmRlcj17IHRvcEZvcm1SZW5kZXIgfVxuICAgICAgICAgIHN1Ykdyb3VwRm9ybVxuICAgICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSA9IHN1YkZvcm1zID0+IChcbiAgbWFwT2JqZWN0KHN1YkZvcm1zLCAoZm9ybU5hbWUsIGZvcm0pID0+IHtcbiAgICBjb25zdCB7IEZvcm0sIGZpZWxkLCBmb3JtUHJvcHMgPSB7fSB9ID0gZm9ybTtcbiAgICBjb25zdCBzdWJGb3JtID0ge1xuICAgICAgZmllbGQsXG4gICAgICBmb3JtUHJvcHMsXG4gICAgICByZWY6IHVuZGVmaW5lZCxcbiAgICAgIEZvcm06IGNsYXNzIERpbm9TdWJGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybVxuICAgICAgICAgICAgICB7IC4uLmZvcm1Qcm9wcyB9XG4gICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAgIHJlZj17IChyZWYpID0+IHsgc3ViRm9ybS5yZWYgPSByZWY7IH0gfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgW2Zvcm1OYW1lXTogc3ViRm9ybSxcbiAgICB9O1xuICB9KVxuKTtcblxuXG5leHBvcnQgY29uc3QgZGlub0Zvcm1BZGRJdGVtID0gKHtcbiAgZ2V0R3JvdXAsXG4gIHNldElELFxuICBnZXRJRCxcbiAgcmVuZGVyLFxufSkgPT4ge1xuICBjb25zdCBJRCA9IGdldElEKCk7XG4gIGdldEdyb3VwKCkuSURMaXN0LnB1c2goSUQpO1xuICBzZXRJRChJRCArIDEpO1xuICByZW5kZXIoKTtcbiAgcmV0dXJuIElEO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtRGVsZXRlSXRlbSA9ICh7IElEOiBkZWxldGVJRCwgZ2V0R3JvdXAsIHJlbmRlciB9KSA9PiB7XG4gIGNvbnN0IGdyb3VwID0gZ2V0R3JvdXAoKTtcbiAgZ3JvdXAuSURMaXN0ID0gZ3JvdXAuSURMaXN0LmZpbHRlcihJRCA9PiBJRCAhPT0gZGVsZXRlSUQpO1xuICByZW5kZXIoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybU1vdmVJdGVtID0gKHtcbiAgSUQsIG9mZnNldCwgZ2V0R3JvdXAsIHJlbmRlcixcbn0pID0+IHtcbiAgY29uc3QgZ3JvdXAgPSBnZXRHcm91cCgpO1xuICBjb25zdCBpbmRleCA9IGdyb3VwLklETGlzdC5pbmRleE9mKElEKTtcbiAgZ3JvdXAuSURMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gIGlmIChvZmZzZXQgPT09IC1JbmZpbml0eSkge1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoMCwgMCwgSUQpO1xuICB9IGVsc2UgaWYgKG9mZnNldCA9PT0gSW5maW5pdHkpIHtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGdyb3VwLklETGlzdC5sZW5ndGgsIDAsIElEKTtcbiAgfSBlbHNlIHtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4ICsgb2Zmc2V0LCAwLCBJRCk7XG4gIH1cbiAgcmVuZGVyKCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybU1hcEdyb3VwID0gKHtcbiAgRm9ybToge1xuICAgIEZvcm1Db20sXG4gICAgZm9ybVByb3BzLFxuICB9LFxuICBJRCxcbiAgSURMaXN0LFxuICBpbmRleCxcbiAgZGVsZXRlSXQsXG4gIG1vdmVJdCxcbn0pID0+IChbXG4gIDxGb3JtQ29tIHsgLi4uZm9ybVByb3BzIH0ga2V5PXsgSUQgfSAvPixcbiAgPGRpdiBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbnMnKSB9IGtleT1cImdyb3VwLWFjdGlvbnNcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLWRlbGV0ZScpIH0gb25DbGljaz17IGRlbGV0ZUl0IH0gLz5cbiAgICB7XG4gICAgICBpbmRleCAhPT0gMFxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS11cCcpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KC0xKSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAge1xuICAgICAgaW5kZXggIT09IElETGlzdC5sZW5ndGggLSAxXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLWRvd24nKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdCgxKSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAge1xuICAgICAgaW5kZXggIT09IDBcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtdG8tZmlyc3QnKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdCgtSW5maW5pdHkpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICB7XG4gICAgICBpbmRleCAhPT0gSURMaXN0Lmxlbmd0aCAtIDFcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtdG8tbGFzdCcpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KEluZmluaXR5KSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gIDwvZGl2Pixcbl0pO1xuXG5leHBvcnQgY29uc3QgZ3JvdXBzQVBJID0gKHtcbiAgZ3JvdXBzLFxuICByZW5kZXIsXG4gIHNldElELFxuICBnZXRJRCxcbn0pID0+IG1hcE9iamVjdChncm91cHMsIChmb3JtTmFtZSwgZ3JvdXBWYWx1ZSkgPT4ge1xuICBjb25zdCB7XG4gICAgQ29tLFxuICAgIGZpZWxkLFxuICAgIElEUmVmTWFwLFxuICAgIElETGlzdCxcbiAgICBGb3JtLFxuICAgIGZvcm1Qcm9wcyA9IHt9LFxuICB9ID0gZ3JvdXBWYWx1ZTtcblxuICBjb25zdCBhZGRJdGVtID0gKFxuICAgIGFkZCA9IGRpbm9Gb3JtQWRkSXRlbSxcbiAgKSA9PiBhZGQoe1xuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgZGVsZXRlSXRlbSA9IChcbiAgICBJRCxcbiAgICBkZWxldGVJdGVtRnVuID0gZGlub0Zvcm1EZWxldGVJdGVtLFxuICApID0+IGRlbGV0ZUl0ZW1GdW4oe1xuICAgIElELFxuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgbW92ZUl0ZW0gPSAoXG4gICAgSUQsXG4gICAgb2Zmc2V0LFxuICAgIG1vdmUgPSBkaW5vRm9ybU1vdmVJdGVtLFxuICApID0+IG1vdmUoe1xuICAgIElELFxuICAgIG9mZnNldCxcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IGRvQWN0aW9uID0gZnVuID0+IGZ1bih7XG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBncm91cCA9IHtcbiAgICBJRExpc3QsXG4gICAgbWFwOiAobWFwR3JvdXAgPSBkaW5vRm9ybU1hcEdyb3VwKSA9PiBJRExpc3QubWFwKChJRCwgaW5kZXgpID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PXsgSUQgfVxuICAgICAgICBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLWl0ZW0td3JhcCcpfWAgfT5cbiAgICAgICAge1xuICAgICAgICAgIG1hcEdyb3VwKHtcbiAgICAgICAgICAgIElELFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybToge1xuICAgICAgICAgICAgICBGb3JtQ29tOiBGb3JtLFxuICAgICAgICAgICAgICBmb3JtUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAuLi5mb3JtUHJvcHMsXG4gICAgICAgICAgICAgICAgLi4uKChncm91cHNbZm9ybU5hbWVdLklEUmVmTWFwW0lEXSB8fCB7fSkucHJvcHMgfHwge30pLFxuICAgICAgICAgICAgICAgIElELFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbGV0ZUl0OiAoKSA9PiBkZWxldGVJdGVtKElEKSxcbiAgICAgICAgICAgIG1vdmVJdDogb2Zmc2V0ID0+IG1vdmVJdGVtKElELCBvZmZzZXQpLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICkpLFxuICAgIHJlbmRlcjogKFxuICAgICAgcmVuZGVyR3JvdXAgPSBlbGUgPT4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZ3JvdXAnKX1gIH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLWVsZScpfWAgfT5cbiAgICAgICAgICAgIHtlbGV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tYWRkJykgfVxuICAgICAgICAgICAgb25DbGljaz17ICgpID0+IGFkZEl0ZW0oKSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICksXG4gICAgICBjaGlsZHJlbiA9IGdyb3VwLm1hcCgpLFxuICAgICkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLXdyYXAnKX1gIH0+XG4gICAgICAgIHtyZW5kZXJHcm91cChjaGlsZHJlbil9XG4gICAgICA8L2Rpdj5cbiAgICApLFxuICAgIGFkZEl0ZW0sXG4gICAgZGVsZXRlSXRlbSxcbiAgICBtb3ZlSXRlbSxcbiAgICBkb0FjdGlvbixcbiAgfTtcblxuICByZXR1cm4geyBbZm9ybU5hbWVdOiBncm91cCB9O1xufSk7XG5cbmV4cG9ydCBjb25zdCBzdWJGb3Jtc0FQSSA9ICh7IHN1YkZvcm1zIH0gPSB7fSkgPT4gbWFwT2JqZWN0KHN1YkZvcm1zLCAoZm9ybU5hbWUsIHsgRm9ybSB9KSA9PiAoe1xuICBbZm9ybU5hbWVdOiBGb3JtLFxufSkpO1xuIl19