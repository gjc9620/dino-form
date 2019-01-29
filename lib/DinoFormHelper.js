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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EaW5vRm9ybUhlbHBlci5qc3giXSwibmFtZXMiOlsiY3JlYXRlRnJhZ21lbnRzIiwiZnJhZ21lbnRzIiwiY3JlYXRlRGlub0Zvcm1BcGkiLCJjb21OYW1lIiwiQ29tIiwicHJvcHMiLCJDb21wb25lbnQiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwic2V0SURSZWZNYXAiLCJ0b3BGb3JtUmVuZGVyIiwicmVmIiwiSUQiLCJjYXRjaFJlZiIsInVuZGVmaW5lZCIsImluZGV4IiwiY3JlYXRlRGlub0Zvcm1TdWJGb3JtIiwic3ViRm9ybXMiLCJmb3JtTmFtZSIsImZvcm0iLCJGb3JtIiwiZmllbGQiLCJmb3JtUHJvcHMiLCJzdWJGb3JtIiwiZGlub0Zvcm1BZGRJdGVtIiwiZ2V0R3JvdXAiLCJzZXRJRCIsImdldElEIiwicmVuZGVyIiwiSURMaXN0IiwicHVzaCIsImRpbm9Gb3JtRGVsZXRlSXRlbSIsImRlbGV0ZUlEIiwiZ3JvdXAiLCJmaWx0ZXIiLCJkaW5vRm9ybU1vdmVJdGVtIiwib2Zmc2V0IiwiaW5kZXhPZiIsInNwbGljZSIsIkluZmluaXR5IiwibGVuZ3RoIiwiZGlub0Zvcm1NYXBHcm91cCIsIkZvcm1Db20iLCJkZWxldGVJdCIsIm1vdmVJdCIsImdyb3Vwc0FQSSIsImdyb3VwcyIsImdyb3VwVmFsdWUiLCJJRFJlZk1hcCIsImFkZEl0ZW0iLCJhZGQiLCJkZWxldGVJdGVtIiwiZGVsZXRlSXRlbUZ1biIsIm1vdmVJdGVtIiwibW92ZSIsImRvQWN0aW9uIiwiZnVuIiwibWFwIiwibWFwR3JvdXAiLCJyZW5kZXJHcm91cCIsImVsZSIsImNoaWxkcmVuIiwic3ViRm9ybXNBUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVPLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0I7QUFBQSxNQUFHQyxTQUFILFFBQUdBLFNBQUg7QUFBQSxNQUFjQyxpQkFBZCxRQUFjQSxpQkFBZDtBQUFBLFNBQzdCLHFCQUFVRCxTQUFWLEVBQXFCLFVBQUNFLE9BQUQ7QUFBQSxvRkFBOEIsRUFBOUI7QUFBQSxRQUFZQyxHQUFaLFNBQVlBLEdBQVo7QUFBQSxRQUFvQkMsS0FBcEI7O0FBQUEsNkNBQ2xCRixPQURrQixFQUNSO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxpQ0FFRTtBQUNQLGlCQUNFLDZCQUFDLEdBQUQ7QUFDRSxZQUFBLFFBQVEsRUFBR0QsaUJBQWlCO0FBRDlCLGFBRU9HLEtBRlAsRUFHUSxLQUFLQSxLQUFMLElBQWMsRUFIdEIsRUFERjtBQU9EO0FBVk07QUFBQTtBQUFBLE1BQ2NDLGdCQURkLEdBWVRELEtBWlMsQ0FEUTtBQUFBLEdBQXJCLENBRDZCO0FBQUEsQ0FBeEI7Ozs7QUFtQkEsSUFBTUUsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQjtBQUFBLE1BQUdMLGlCQUFILFNBQUdBLGlCQUFIO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGlDQUVqQjtBQUNQLGlCQUNFLDZCQUFDLHFCQUFEO0FBQ0UsWUFBQSxRQUFRLEVBQUdBLGlCQUFpQjtBQUQ5QixhQUVRLEtBQUtHLEtBQUwsSUFBYyxFQUZ0QixFQURGO0FBTUQ7QUFUeUI7QUFBQTtBQUFBLE1BQ0dDLGdCQURIO0FBQUE7QUFBQSxDQUF2Qjs7OztBQWNBLElBQU1FLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEI7QUFBQTs7QUFBQSxNQUFHQyxXQUFILFNBQUdBLFdBQUg7QUFBQSxNQUFnQkwsR0FBaEIsU0FBZ0JBLEdBQWhCO0FBQUEsTUFBcUJNLGFBQXJCLFNBQXFCQSxhQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVuQywwQkFBWUwsS0FBWixFQUFtQjtBQUFBOztBQUFBO0FBQ2pCLG9IQUFNQSxLQUFOO0FBRGlCLG1JQWVSLFVBQUNNLEdBQUQsRUFBUztBQUFBLDBCQUNrQixNQUFLTixLQUR2QjtBQUFBLFlBQ1ZPLEVBRFUsZUFDVkEsRUFEVTtBQUFBLCtDQUNOQyxRQURNO0FBQUEsWUFDTkEsUUFETSxxQ0FDSyxZQUFNLENBQUUsQ0FEYjtBQUVsQixjQUFLVCxHQUFMLEdBQVdPLEdBQVg7QUFDQUUsUUFBQUEsUUFBUSxDQUFDRixHQUFELENBQVI7QUFDRCxPQW5Ca0I7QUFFakIsWUFBS1AsR0FBTCxHQUFXVSxTQUFYO0FBRmlCO0FBR2xCOztBQUxrQztBQUFBO0FBQUEsMENBT2Y7QUFBQSwyQkFDSSxLQUFLVCxLQURUO0FBQUEsWUFDVk8sRUFEVSxnQkFDVkEsRUFEVTtBQUFBLFlBQ05HLEtBRE0sZ0JBQ05BLEtBRE07QUFFbEJOLFFBQUFBLFdBQVcsQ0FBQ0csRUFBRCxFQUFLO0FBQUVELFVBQUFBLEdBQUcsRUFBRSxLQUFLUDtBQUFaLFNBQUwsQ0FBWDtBQUNEO0FBVmtDO0FBQUE7QUFBQSw2Q0FZWjtBQUFBLDJCQUNDLEtBQUtDLEtBRE47QUFBQSxZQUNiTyxFQURhLGdCQUNiQSxFQURhO0FBQUEsWUFDVEcsS0FEUyxnQkFDVEEsS0FEUztBQUVyQk4sUUFBQUEsV0FBVyxDQUFDRyxFQUFELEVBQUs7QUFBRUQsVUFBQUEsR0FBRyxFQUFFRztBQUFQLFNBQUwsQ0FBWDtBQUNEO0FBZmtDO0FBQUE7QUFBQSwrQkF1QjFCO0FBQUEsMkJBQ2UsS0FBS1QsS0FEcEI7QUFBQSxZQUNDTyxFQURELGdCQUNDQSxFQUREO0FBQUEsWUFDS0csS0FETCxnQkFDS0EsS0FETDtBQUVQLGVBQ0UsNkJBQUMsR0FBRDtBQUNFLFVBQUEsR0FBRyxFQUFHLEtBQUtGLFFBRGI7QUFFRSxVQUFBLGFBQWEsRUFBR0gsYUFGbEI7QUFHRSxVQUFBLFlBQVk7QUFIZCxVQURGO0FBT0Q7QUFoQ2tDO0FBQUE7QUFBQSxJQUNWSixnQkFEVTtBQUFBLENBQWhDOzs7O0FBb0NBLElBQU1VLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQUMsUUFBUTtBQUFBLFNBQzNDLHFCQUFVQSxRQUFWLEVBQW9CLFVBQUNDLFFBQUQsRUFBV0MsSUFBWCxFQUFvQjtBQUFBLFFBQzlCQyxJQUQ4QixHQUNFRCxJQURGLENBQzlCQyxJQUQ4QjtBQUFBLFFBQ3hCQyxLQUR3QixHQUNFRixJQURGLENBQ3hCRSxLQUR3QjtBQUFBLDBCQUNFRixJQURGLENBQ2pCRyxTQURpQjtBQUFBLFFBQ2pCQSxTQURpQixnQ0FDTCxFQURLO0FBRXRDLFFBQU1DLE9BQU8sR0FBRztBQUNkRixNQUFBQSxLQUFLLEVBQUxBLEtBRGM7QUFFZEMsTUFBQUEsU0FBUyxFQUFUQSxTQUZjO0FBR2RYLE1BQUFBLEdBQUcsRUFBRUcsU0FIUztBQUlkTSxNQUFBQSxJQUFJO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQ0FDTztBQUNQLG1CQUNFLDZCQUFDLElBQUQsNkJBQ09FLFNBRFAsRUFFTyxLQUFLakIsS0FGWjtBQUdFLGNBQUEsR0FBRyxFQUFHLGFBQUNNLEtBQUQsRUFBUztBQUFFWSxnQkFBQUEsT0FBTyxDQUFDWixHQUFSLEdBQWNBLEtBQWQ7QUFBb0I7QUFIdkMsZUFERjtBQU9EO0FBVEM7QUFBQTtBQUFBLFFBQTRCTCxnQkFBNUI7QUFKVSxLQUFoQjtBQWdCQSw2Q0FDR1ksUUFESCxFQUNjSyxPQURkO0FBR0QsR0FyQkQsQ0FEMkM7QUFBQSxDQUF0Qzs7OztBQTBCQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLFFBS3pCO0FBQUEsTUFKSkMsUUFJSSxTQUpKQSxRQUlJO0FBQUEsTUFISkMsS0FHSSxTQUhKQSxLQUdJO0FBQUEsTUFGSkMsS0FFSSxTQUZKQSxLQUVJO0FBQUEsTUFESkMsTUFDSSxTQURKQSxNQUNJO0FBQ0osTUFBTWhCLEVBQUUsR0FBR2UsS0FBSyxFQUFoQjtBQUNBRixFQUFBQSxRQUFRLEdBQUdJLE1BQVgsQ0FBa0JDLElBQWxCLENBQXVCbEIsRUFBdkI7QUFDQWMsRUFBQUEsS0FBSyxDQUFDZCxFQUFFLEdBQUcsQ0FBTixDQUFMO0FBQ0FnQixFQUFBQSxNQUFNO0FBQ1AsQ0FWTTs7OztBQVlBLElBQU1HLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsUUFBd0M7QUFBQSxNQUFqQ0MsUUFBaUMsU0FBckNwQixFQUFxQztBQUFBLE1BQXZCYSxRQUF1QixTQUF2QkEsUUFBdUI7QUFBQSxNQUFiRyxNQUFhLFNBQWJBLE1BQWE7QUFDeEUsTUFBTUssS0FBSyxHQUFHUixRQUFRLEVBQXRCO0FBQ0FRLEVBQUFBLEtBQUssQ0FBQ0osTUFBTixHQUFlSSxLQUFLLENBQUNKLE1BQU4sQ0FBYUssTUFBYixDQUFvQixVQUFBdEIsRUFBRTtBQUFBLFdBQUlBLEVBQUUsS0FBS29CLFFBQVg7QUFBQSxHQUF0QixDQUFmO0FBQ0FKLEVBQUFBLE1BQU07QUFDUCxDQUpNOzs7O0FBTUEsSUFBTU8sZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixTQUUxQjtBQUFBLE1BREp2QixFQUNJLFVBREpBLEVBQ0k7QUFBQSxNQURBd0IsTUFDQSxVQURBQSxNQUNBO0FBQUEsTUFEUVgsUUFDUixVQURRQSxRQUNSO0FBQUEsTUFEa0JHLE1BQ2xCLFVBRGtCQSxNQUNsQjtBQUNKLE1BQU1LLEtBQUssR0FBR1IsUUFBUSxFQUF0QjtBQUNBLE1BQU1WLEtBQUssR0FBR2tCLEtBQUssQ0FBQ0osTUFBTixDQUFhUSxPQUFiLENBQXFCekIsRUFBckIsQ0FBZDtBQUNBcUIsRUFBQUEsS0FBSyxDQUFDSixNQUFOLENBQWFTLE1BQWIsQ0FBb0J2QixLQUFwQixFQUEyQixDQUEzQjs7QUFDQSxNQUFJcUIsTUFBTSxLQUFLLENBQUNHLFFBQWhCLEVBQTBCO0FBQ3hCTixJQUFBQSxLQUFLLENBQUNKLE1BQU4sQ0FBYVMsTUFBYixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQjFCLEVBQTFCO0FBQ0QsR0FGRCxNQUVPLElBQUl3QixNQUFNLEtBQUtHLFFBQWYsRUFBeUI7QUFDOUJOLElBQUFBLEtBQUssQ0FBQ0osTUFBTixDQUFhUyxNQUFiLENBQW9CTCxLQUFLLENBQUNKLE1BQU4sQ0FBYVcsTUFBakMsRUFBeUMsQ0FBekMsRUFBNEM1QixFQUE1QztBQUNELEdBRk0sTUFFQTtBQUNMcUIsSUFBQUEsS0FBSyxDQUFDSixNQUFOLENBQWFTLE1BQWIsQ0FBb0J2QixLQUFLLEdBQUdxQixNQUE1QixFQUFvQyxDQUFwQyxFQUF1Q3hCLEVBQXZDO0FBQ0Q7O0FBQ0RnQixFQUFBQSxNQUFNO0FBQ1AsQ0FkTTs7OztBQWlCQSxJQUFNYSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsMkJBQzlCckIsSUFEOEI7QUFBQSxNQUU1QnNCLE9BRjRCLGVBRTVCQSxPQUY0QjtBQUFBLE1BRzVCcEIsU0FINEIsZUFHNUJBLFNBSDRCO0FBQUEsTUFLOUJWLEVBTDhCLFVBSzlCQSxFQUw4QjtBQUFBLE1BTTlCaUIsTUFOOEIsVUFNOUJBLE1BTjhCO0FBQUEsTUFPOUJkLEtBUDhCLFVBTzlCQSxLQVA4QjtBQUFBLE1BUTlCNEIsUUFSOEIsVUFROUJBLFFBUjhCO0FBQUEsTUFTOUJDLE1BVDhCLFVBUzlCQSxNQVQ4QjtBQUFBLFNBVXpCLENBQ0wsNkJBQUMsT0FBRCw2QkFBY3RCLFNBQWQ7QUFBMEIsSUFBQSxHQUFHLEVBQUdWO0FBQWhDLEtBREssRUFFTDtBQUFLLElBQUEsU0FBUyxFQUFHLGtCQUFPLGVBQVAsQ0FBakI7QUFBMkMsSUFBQSxHQUFHLEVBQUM7QUFBL0MsS0FDRTtBQUFLLElBQUEsU0FBUyxFQUFHLGtCQUFPLHFCQUFQLENBQWpCO0FBQWlELElBQUEsT0FBTyxFQUFHK0I7QUFBM0QsSUFERixFQUdJNUIsS0FBSyxLQUFLLENBQVYsSUFFRTtBQUNFLElBQUEsU0FBUyxFQUFHLGtCQUFPLHNCQUFQLENBRGQ7QUFFRSxJQUFBLE9BQU8sRUFBRztBQUFBLGFBQU02QixNQUFNLENBQUMsQ0FBQyxDQUFGLENBQVo7QUFBQTtBQUZaLElBTE4sRUFZSTdCLEtBQUssS0FBS2MsTUFBTSxDQUFDVyxNQUFQLEdBQWdCLENBQTFCLElBRUU7QUFDRSxJQUFBLFNBQVMsRUFBRyxrQkFBTyx3QkFBUCxDQURkO0FBRUUsSUFBQSxPQUFPLEVBQUc7QUFBQSxhQUFNSSxNQUFNLENBQUMsQ0FBRCxDQUFaO0FBQUE7QUFGWixJQWROLEVBcUJJN0IsS0FBSyxLQUFLLENBQVYsSUFFRTtBQUNFLElBQUEsU0FBUyxFQUFHLGtCQUFPLDRCQUFQLENBRGQ7QUFFRSxJQUFBLE9BQU8sRUFBRztBQUFBLGFBQU02QixNQUFNLENBQUMsQ0FBQ0wsUUFBRixDQUFaO0FBQUE7QUFGWixJQXZCTixFQThCSXhCLEtBQUssS0FBS2MsTUFBTSxDQUFDVyxNQUFQLEdBQWdCLENBQTFCLElBRUU7QUFDRSxJQUFBLFNBQVMsRUFBRyxrQkFBTywyQkFBUCxDQURkO0FBRUUsSUFBQSxPQUFPLEVBQUc7QUFBQSxhQUFNSSxNQUFNLENBQUNMLFFBQUQsQ0FBWjtBQUFBO0FBRlosSUFoQ04sQ0FGSyxDQVZ5QjtBQUFBLENBQXpCOzs7O0FBcURBLElBQU1NLFNBQVMsR0FBRyxTQUFaQSxTQUFZO0FBQUEsTUFDdkJDLE1BRHVCLFVBQ3ZCQSxNQUR1QjtBQUFBLE1BRXZCbEIsTUFGdUIsVUFFdkJBLE1BRnVCO0FBQUEsTUFHdkJGLEtBSHVCLFVBR3ZCQSxLQUh1QjtBQUFBLE1BSXZCQyxLQUp1QixVQUl2QkEsS0FKdUI7QUFBQSxTQUtuQixxQkFBVW1CLE1BQVYsRUFBa0IsVUFBQzVCLFFBQUQsRUFBVzZCLFVBQVgsRUFBMEI7QUFBQSxRQUU5QzNDLEdBRjhDLEdBUTVDMkMsVUFSNEMsQ0FFOUMzQyxHQUY4QztBQUFBLFFBRzlDaUIsS0FIOEMsR0FRNUMwQixVQVI0QyxDQUc5QzFCLEtBSDhDO0FBQUEsUUFJOUMyQixRQUo4QyxHQVE1Q0QsVUFSNEMsQ0FJOUNDLFFBSjhDO0FBQUEsUUFLOUNuQixNQUw4QyxHQVE1Q2tCLFVBUjRDLENBSzlDbEIsTUFMOEM7QUFBQSxRQU05Q1QsSUFOOEMsR0FRNUMyQixVQVI0QyxDQU05QzNCLElBTjhDO0FBQUEsZ0NBUTVDMkIsVUFSNEMsQ0FPOUN6QixTQVA4QztBQUFBLFFBTzlDQSxTQVA4QyxzQ0FPbEMsRUFQa0M7O0FBVWhELFFBQU0yQixPQUFPLEdBQUcsU0FBVkEsT0FBVTtBQUFBLFVBQ2RDLEdBRGMsdUVBQ1IxQixlQURRO0FBQUEsYUFFWDBCLEdBQUcsQ0FBQztBQUNQekIsUUFBQUEsUUFBUSxFQUFFO0FBQUEsaUJBQU1zQixVQUFOO0FBQUEsU0FESDtBQUVQckIsUUFBQUEsS0FBSyxFQUFMQSxLQUZPO0FBR1BDLFFBQUFBLEtBQUssRUFBTEEsS0FITztBQUlQQyxRQUFBQSxNQUFNLEVBQU5BO0FBSk8sT0FBRCxDQUZRO0FBQUEsS0FBaEI7O0FBU0EsUUFBTXVCLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQ2pCdkMsRUFEaUI7QUFBQSxVQUVqQndDLGFBRmlCLHVFQUVEckIsa0JBRkM7QUFBQSxhQUdkcUIsYUFBYSxDQUFDO0FBQ2pCeEMsUUFBQUEsRUFBRSxFQUFGQSxFQURpQjtBQUVqQmEsUUFBQUEsUUFBUSxFQUFFO0FBQUEsaUJBQU1zQixVQUFOO0FBQUEsU0FGTztBQUdqQnJCLFFBQUFBLEtBQUssRUFBTEEsS0FIaUI7QUFJakJDLFFBQUFBLEtBQUssRUFBTEEsS0FKaUI7QUFLakJDLFFBQUFBLE1BQU0sRUFBTkE7QUFMaUIsT0FBRCxDQUhDO0FBQUEsS0FBbkI7O0FBV0EsUUFBTXlCLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQ2Z6QyxFQURlLEVBRWZ3QixNQUZlO0FBQUEsVUFHZmtCLElBSGUsdUVBR1JuQixnQkFIUTtBQUFBLGFBSVptQixJQUFJLENBQUM7QUFDUjFDLFFBQUFBLEVBQUUsRUFBRkEsRUFEUTtBQUVSd0IsUUFBQUEsTUFBTSxFQUFOQSxNQUZRO0FBR1JYLFFBQUFBLFFBQVEsRUFBRTtBQUFBLGlCQUFNc0IsVUFBTjtBQUFBLFNBSEY7QUFJUnJCLFFBQUFBLEtBQUssRUFBTEEsS0FKUTtBQUtSQyxRQUFBQSxLQUFLLEVBQUxBLEtBTFE7QUFNUkMsUUFBQUEsTUFBTSxFQUFOQTtBQU5RLE9BQUQsQ0FKUTtBQUFBLEtBQWpCOztBQWFBLFFBQU0yQixRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFBQyxHQUFHO0FBQUEsYUFBSUEsR0FBRyxDQUFDO0FBQzFCL0IsUUFBQUEsUUFBUSxFQUFFO0FBQUEsaUJBQU1zQixVQUFOO0FBQUEsU0FEZ0I7QUFFMUJyQixRQUFBQSxLQUFLLEVBQUxBLEtBRjBCO0FBRzFCQyxRQUFBQSxLQUFLLEVBQUxBLEtBSDBCO0FBSTFCQyxRQUFBQSxNQUFNLEVBQU5BO0FBSjBCLE9BQUQsQ0FBUDtBQUFBLEtBQXBCOztBQU9BLFFBQU1LLEtBQUssR0FBRztBQUNad0IsTUFBQUEsR0FBRyxFQUFFO0FBQUEsWUFBQ0MsUUFBRCx1RUFBWWpCLGdCQUFaO0FBQUEsZUFBaUNaLE1BQU0sQ0FBQzRCLEdBQVAsQ0FBVyxVQUFDN0MsRUFBRCxFQUFLRyxLQUFMO0FBQUEsaUJBQy9DO0FBQ0UsWUFBQSxHQUFHLEVBQUdILEVBRFI7QUFFRSxZQUFBLFNBQVMsWUFBTSxrQkFBTyxpQkFBUCxDQUFOO0FBRlgsYUFJSThDLFFBQVEsQ0FBQztBQUNQOUMsWUFBQUEsRUFBRSxFQUFGQSxFQURPO0FBRVBHLFlBQUFBLEtBQUssRUFBTEEsS0FGTztBQUdQWCxZQUFBQSxHQUFHLEVBQUhBLEdBSE87QUFJUGlCLFlBQUFBLEtBQUssRUFBTEEsS0FKTztBQUtQMkIsWUFBQUEsUUFBUSxFQUFSQSxRQUxPO0FBTVBuQixZQUFBQSxNQUFNLEVBQU5BLE1BTk87QUFPUFQsWUFBQUEsSUFBSSxFQUFFO0FBQ0pzQixjQUFBQSxPQUFPLEVBQUV0QixJQURMO0FBRUpFLGNBQUFBLFNBQVMsa0NBQ0pBLFNBREksRUFFSCxDQUFDd0IsTUFBTSxDQUFDNUIsUUFBRCxDQUFOLENBQWlCOEIsUUFBakIsQ0FBMEJwQyxFQUExQixLQUFpQyxFQUFsQyxFQUFzQ1AsS0FBdEMsSUFBK0MsRUFGNUM7QUFHUE8sZ0JBQUFBLEVBQUUsRUFBRkE7QUFITztBQUZMLGFBUEM7QUFlUCtCLFlBQUFBLFFBQVEsRUFBRTtBQUFBLHFCQUFNUSxVQUFVLENBQUN2QyxFQUFELENBQWhCO0FBQUEsYUFmSDtBQWdCUGdDLFlBQUFBLE1BQU0sRUFBRSxnQkFBQVIsTUFBTTtBQUFBLHFCQUFJaUIsUUFBUSxDQUFDekMsRUFBRCxFQUFLd0IsTUFBTCxDQUFaO0FBQUEsYUFoQlA7QUFpQlBkLFlBQUFBLFNBQVMsRUFBVEE7QUFqQk8sV0FBRCxDQUpaLENBRCtDO0FBQUEsU0FBWCxDQUFqQztBQUFBLE9BRE87QUE0QlpNLE1BQUFBLE1BQU0sRUFBRTtBQUFBLFlBQ04rQixXQURNLHVFQUNRLFVBQUFDLEdBQUc7QUFBQSxpQkFDZjtBQUFLLFlBQUEsU0FBUyxZQUFNLGtCQUFPLE9BQVAsQ0FBTjtBQUFkLGFBQ0U7QUFBSyxZQUFBLFNBQVMsWUFBTSxrQkFBTyxXQUFQLENBQU47QUFBZCxhQUNHQSxHQURILENBREYsRUFJRTtBQUNFLFlBQUEsU0FBUyxFQUFHLGtCQUFPLGtCQUFQLENBRGQ7QUFFRSxZQUFBLE9BQU8sRUFBRztBQUFBLHFCQUFNWCxPQUFPLEVBQWI7QUFBQTtBQUZaLFlBSkYsQ0FEZTtBQUFBLFNBRFg7QUFBQSxZQVlOWSxRQVpNLHVFQVlLNUIsS0FBSyxDQUFDd0IsR0FBTixFQVpMO0FBQUEsZUFjTjtBQUFLLFVBQUEsU0FBUyxZQUFNLGtCQUFPLFlBQVAsQ0FBTjtBQUFkLFdBQ0dFLFdBQVcsQ0FBQ0UsUUFBRCxDQURkLENBZE07QUFBQSxPQTVCSTtBQThDWlosTUFBQUEsT0FBTyxFQUFQQSxPQTlDWTtBQStDWkUsTUFBQUEsVUFBVSxFQUFWQSxVQS9DWTtBQWdEWkUsTUFBQUEsUUFBUSxFQUFSQSxRQWhEWTtBQWlEWkUsTUFBQUEsUUFBUSxFQUFSQTtBQWpEWSxLQUFkO0FBb0RBLDZDQUFVckMsUUFBVixFQUFxQmUsS0FBckI7QUFDRCxHQXZHSyxDQUxtQjtBQUFBLENBQWxCOzs7O0FBOEdBLElBQU02QixXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLG1GQUFnQixFQUFoQjtBQUFBLE1BQUc3QyxRQUFILFVBQUdBLFFBQUg7O0FBQUEsU0FBdUIscUJBQVVBLFFBQVYsRUFBb0IsVUFBQ0MsUUFBRDtBQUFBLFFBQWFFLElBQWIsVUFBYUEsSUFBYjtBQUFBLDZDQUNuRUYsUUFEbUUsRUFDeERFLElBRHdEO0FBQUEsR0FBcEIsQ0FBdkI7QUFBQSxDQUFwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBwcmVmaXgsIG1hcE9iamVjdCB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRGlub0Zvcm1JdGVtIGZyb20gJy4vRGlub0Zvcm1JdGVtJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUZyYWdtZW50cyA9ICh7IGZyYWdtZW50cywgY3JlYXRlRGlub0Zvcm1BcGkgfSkgPT4gKFxuICBtYXBPYmplY3QoZnJhZ21lbnRzLCAoY29tTmFtZSwgeyBDb20sIC4uLnByb3BzIH0gPSB7fSkgPT4gKHtcbiAgICBbY29tTmFtZV06IE9iamVjdC5hc3NpZ24oXG4gICAgICBjbGFzcyBGcmFnbWVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENvbVxuICAgICAgICAgICAgICBkaW5vRm9ybT17IGNyZWF0ZURpbm9Gb3JtQXBpKCkgfVxuICAgICAgICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgICAgICAgICAgeyAuLi4odGhpcy5wcm9wcyB8fCB7fSkgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9wcyxcbiAgICApLFxuICB9KSlcbik7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVGcm9tSXRlbSA9ICh7IGNyZWF0ZURpbm9Gb3JtQXBpIH0pID0+IChcbiAgY2xhc3MgRGlub0Zvcm1JdGVtV3JhcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPERpbm9Gb3JtSXRlbVxuICAgICAgICAgIGRpbm9Gb3JtPXsgY3JlYXRlRGlub0Zvcm1BcGkoKSB9XG4gICAgICAgICAgeyAuLi4odGhpcy5wcm9wcyB8fCB7fSkgfVxuICAgICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuKTtcblxuXG5leHBvcnQgY29uc3QgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAgPSAoeyBzZXRJRFJlZk1hcCwgQ29tLCB0b3BGb3JtUmVuZGVyIH0pID0+IChcbiAgY2xhc3MgRGlub0Zvcm1XcmFwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgdGhpcy5Db20gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICBjb25zdCB7IElELCBpbmRleCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHNldElEUmVmTWFwKElELCB7IHJlZjogdGhpcy5Db20gfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBjb25zdCB7IElELCBpbmRleCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHNldElEUmVmTWFwKElELCB7IHJlZjogdW5kZWZpbmVkIH0pO1xuICAgIH1cblxuICAgIGNhdGNoUmVmID0gKHJlZikgPT4ge1xuICAgICAgY29uc3QgeyBJRCwgY2F0Y2hSZWYgPSAoKSA9PiB7fSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHRoaXMuQ29tID0gcmVmO1xuICAgICAgY2F0Y2hSZWYocmVmKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7IElELCBpbmRleCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb21cbiAgICAgICAgICByZWY9eyB0aGlzLmNhdGNoUmVmIH1cbiAgICAgICAgICB0b3BGb3JtUmVuZGVyPXsgdG9wRm9ybVJlbmRlciB9XG4gICAgICAgICAgc3ViR3JvdXBGb3JtXG4gICAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRGlub0Zvcm1TdWJGb3JtID0gc3ViRm9ybXMgPT4gKFxuICBtYXBPYmplY3Qoc3ViRm9ybXMsIChmb3JtTmFtZSwgZm9ybSkgPT4ge1xuICAgIGNvbnN0IHsgRm9ybSwgZmllbGQsIGZvcm1Qcm9wcyA9IHt9IH0gPSBmb3JtO1xuICAgIGNvbnN0IHN1YkZvcm0gPSB7XG4gICAgICBmaWVsZCxcbiAgICAgIGZvcm1Qcm9wcyxcbiAgICAgIHJlZjogdW5kZWZpbmVkLFxuICAgICAgRm9ybTogY2xhc3MgRGlub1N1YkZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb3JtXG4gICAgICAgICAgICAgIHsgLi4uZm9ybVByb3BzIH1cbiAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgICAgcmVmPXsgKHJlZikgPT4geyBzdWJGb3JtLnJlZiA9IHJlZjsgfSB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBbZm9ybU5hbWVdOiBzdWJGb3JtLFxuICAgIH07XG4gIH0pXG4pO1xuXG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybUFkZEl0ZW0gPSAoe1xuICBnZXRHcm91cCxcbiAgc2V0SUQsXG4gIGdldElELFxuICByZW5kZXIsXG59KSA9PiB7XG4gIGNvbnN0IElEID0gZ2V0SUQoKTtcbiAgZ2V0R3JvdXAoKS5JRExpc3QucHVzaChJRCk7XG4gIHNldElEKElEICsgMSk7XG4gIHJlbmRlcigpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpbm9Gb3JtRGVsZXRlSXRlbSA9ICh7IElEOiBkZWxldGVJRCwgZ2V0R3JvdXAsIHJlbmRlciB9KSA9PiB7XG4gIGNvbnN0IGdyb3VwID0gZ2V0R3JvdXAoKTtcbiAgZ3JvdXAuSURMaXN0ID0gZ3JvdXAuSURMaXN0LmZpbHRlcihJRCA9PiBJRCAhPT0gZGVsZXRlSUQpO1xuICByZW5kZXIoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybU1vdmVJdGVtID0gKHtcbiAgSUQsIG9mZnNldCwgZ2V0R3JvdXAsIHJlbmRlcixcbn0pID0+IHtcbiAgY29uc3QgZ3JvdXAgPSBnZXRHcm91cCgpO1xuICBjb25zdCBpbmRleCA9IGdyb3VwLklETGlzdC5pbmRleE9mKElEKTtcbiAgZ3JvdXAuSURMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gIGlmIChvZmZzZXQgPT09IC1JbmZpbml0eSkge1xuICAgIGdyb3VwLklETGlzdC5zcGxpY2UoMCwgMCwgSUQpO1xuICB9IGVsc2UgaWYgKG9mZnNldCA9PT0gSW5maW5pdHkpIHtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGdyb3VwLklETGlzdC5sZW5ndGgsIDAsIElEKTtcbiAgfSBlbHNlIHtcbiAgICBncm91cC5JRExpc3Quc3BsaWNlKGluZGV4ICsgb2Zmc2V0LCAwLCBJRCk7XG4gIH1cbiAgcmVuZGVyKCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBkaW5vRm9ybU1hcEdyb3VwID0gKHtcbiAgRm9ybToge1xuICAgIEZvcm1Db20sXG4gICAgZm9ybVByb3BzLFxuICB9LFxuICBJRCxcbiAgSURMaXN0LFxuICBpbmRleCxcbiAgZGVsZXRlSXQsXG4gIG1vdmVJdCxcbn0pID0+IChbXG4gIDxGb3JtQ29tIHsgLi4uZm9ybVByb3BzIH0ga2V5PXsgSUQgfSAvPixcbiAgPGRpdiBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbnMnKSB9IGtleT1cImdyb3VwLWFjdGlvbnNcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLWRlbGV0ZScpIH0gb25DbGljaz17IGRlbGV0ZUl0IH0gLz5cbiAgICB7XG4gICAgICBpbmRleCAhPT0gMFxuICAgICAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXsgcHJlZml4KCdncm91cC1hY3Rpb24tbW92ZS11cCcpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KC0xKSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAge1xuICAgICAgaW5kZXggIT09IElETGlzdC5sZW5ndGggLSAxXG4gICAgICAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1tb3ZlLWRvd24nKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdCgxKSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAge1xuICAgICAgaW5kZXggIT09IDBcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtdG8tZmlyc3QnKSB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IG1vdmVJdCgtSW5maW5pdHkpIH1cbiAgICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICB7XG4gICAgICBpbmRleCAhPT0gSURMaXN0Lmxlbmd0aCAtIDFcbiAgICAgICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17IHByZWZpeCgnZ3JvdXAtYWN0aW9uLW1vdmUtdG8tbGFzdCcpIH1cbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gbW92ZUl0KEluZmluaXR5KSB9XG4gICAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gIDwvZGl2Pixcbl0pO1xuXG5leHBvcnQgY29uc3QgZ3JvdXBzQVBJID0gKHtcbiAgZ3JvdXBzLFxuICByZW5kZXIsXG4gIHNldElELFxuICBnZXRJRCxcbn0pID0+IG1hcE9iamVjdChncm91cHMsIChmb3JtTmFtZSwgZ3JvdXBWYWx1ZSkgPT4ge1xuICBjb25zdCB7XG4gICAgQ29tLFxuICAgIGZpZWxkLFxuICAgIElEUmVmTWFwLFxuICAgIElETGlzdCxcbiAgICBGb3JtLFxuICAgIGZvcm1Qcm9wcyA9IHt9LFxuICB9ID0gZ3JvdXBWYWx1ZTtcblxuICBjb25zdCBhZGRJdGVtID0gKFxuICAgIGFkZCA9IGRpbm9Gb3JtQWRkSXRlbSxcbiAgKSA9PiBhZGQoe1xuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgZGVsZXRlSXRlbSA9IChcbiAgICBJRCxcbiAgICBkZWxldGVJdGVtRnVuID0gZGlub0Zvcm1EZWxldGVJdGVtLFxuICApID0+IGRlbGV0ZUl0ZW1GdW4oe1xuICAgIElELFxuICAgIGdldEdyb3VwOiAoKSA9PiBncm91cFZhbHVlLFxuICAgIHNldElELFxuICAgIGdldElELFxuICAgIHJlbmRlcixcbiAgfSk7XG5cbiAgY29uc3QgbW92ZUl0ZW0gPSAoXG4gICAgSUQsXG4gICAgb2Zmc2V0LFxuICAgIG1vdmUgPSBkaW5vRm9ybU1vdmVJdGVtLFxuICApID0+IG1vdmUoe1xuICAgIElELFxuICAgIG9mZnNldCxcbiAgICBnZXRHcm91cDogKCkgPT4gZ3JvdXBWYWx1ZSxcbiAgICBzZXRJRCxcbiAgICBnZXRJRCxcbiAgICByZW5kZXIsXG4gIH0pO1xuXG4gIGNvbnN0IGRvQWN0aW9uID0gZnVuID0+IGZ1bih7XG4gICAgZ2V0R3JvdXA6ICgpID0+IGdyb3VwVmFsdWUsXG4gICAgc2V0SUQsXG4gICAgZ2V0SUQsXG4gICAgcmVuZGVyLFxuICB9KTtcblxuICBjb25zdCBncm91cCA9IHtcbiAgICBtYXA6IChtYXBHcm91cCA9IGRpbm9Gb3JtTWFwR3JvdXApID0+IElETGlzdC5tYXAoKElELCBpbmRleCkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9eyBJRCB9XG4gICAgICAgIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZ3JvdXAtaXRlbS13cmFwJyl9YCB9PlxuICAgICAgICB7XG4gICAgICAgICAgbWFwR3JvdXAoe1xuICAgICAgICAgICAgSUQsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgSURSZWZNYXAsXG4gICAgICAgICAgICBJRExpc3QsXG4gICAgICAgICAgICBGb3JtOiB7XG4gICAgICAgICAgICAgIEZvcm1Db206IEZvcm0sXG4gICAgICAgICAgICAgIGZvcm1Qcm9wczoge1xuICAgICAgICAgICAgICAgIC4uLmZvcm1Qcm9wcyxcbiAgICAgICAgICAgICAgICAuLi4oKGdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdIHx8IHt9KS5wcm9wcyB8fCB7fSksXG4gICAgICAgICAgICAgICAgSUQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVsZXRlSXQ6ICgpID0+IGRlbGV0ZUl0ZW0oSUQpLFxuICAgICAgICAgICAgbW92ZUl0OiBvZmZzZXQgPT4gbW92ZUl0ZW0oSUQsIG9mZnNldCksXG4gICAgICAgICAgICBmb3JtUHJvcHMsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKSksXG4gICAgcmVuZGVyOiAoXG4gICAgICByZW5kZXJHcm91cCA9IGVsZSA9PiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cCcpfWAgfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZ3JvdXAtZWxlJyl9YCB9PlxuICAgICAgICAgICAge2VsZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9eyBwcmVmaXgoJ2dyb3VwLWFjdGlvbi1hZGQnKSB9XG4gICAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gYWRkSXRlbSgpIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSxcbiAgICAgIGNoaWxkcmVuID0gZ3JvdXAubWFwKCksXG4gICAgKSA9PiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZ3JvdXAtd3JhcCcpfWAgfT5cbiAgICAgICAge3JlbmRlckdyb3VwKGNoaWxkcmVuKX1cbiAgICAgIDwvZGl2PlxuICAgICksXG4gICAgYWRkSXRlbSxcbiAgICBkZWxldGVJdGVtLFxuICAgIG1vdmVJdGVtLFxuICAgIGRvQWN0aW9uLFxuICB9O1xuXG4gIHJldHVybiB7IFtmb3JtTmFtZV06IGdyb3VwIH07XG59KTtcblxuZXhwb3J0IGNvbnN0IHN1YkZvcm1zQVBJID0gKHsgc3ViRm9ybXMgfSA9IHt9KSA9PiBtYXBPYmplY3Qoc3ViRm9ybXMsIChmb3JtTmFtZSwgeyBGb3JtIH0pID0+ICh7XG4gIFtmb3JtTmFtZV06IEZvcm0sXG59KSk7XG4iXX0=