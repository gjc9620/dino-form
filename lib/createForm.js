"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/values"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _DinoFormStore = _interopRequireDefault(require("./DinoFormStore"));

var _DinoFormHelper = require("./DinoFormHelper");

var _util = require("./util");

var WrapCom =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(WrapCom, _Component);

  function WrapCom() {
    (0, _classCallCheck2.default)(this, WrapCom);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WrapCom).apply(this, arguments));
  }

  (0, _createClass2.default)(WrapCom, [{
    key: "render",
    value: function render() {
      var renderDinoForm = this.props.dinoForm.renderDinoForm;
      return renderDinoForm(this.props);
    }
  }]);
  return WrapCom;
}(_react.Component);

function createForm() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$fragments = _ref.fragments,
      fragments = _ref$fragments === void 0 ? {} : _ref$fragments,
      _ref$groups = _ref.groups,
      groups = _ref$groups === void 0 ? {} : _ref$groups,
      _ref$subForms = _ref.subForms,
      subForms = _ref$subForms === void 0 ? {} : _ref$subForms,
      _ref$getGroupRef = _ref.getGroupRef,
      getGroupRef = _ref$getGroupRef === void 0 ? _DinoFormHelper.getRef : _ref$getGroupRef;

  return function create(View) {
    return function bindWrap() {
      var _temp;

      var Wrap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : WrapCom;
      return _temp =
      /*#__PURE__*/
      function (_Component2) {
        (0, _inherits2.default)(DinoForm, _Component2);

        function DinoForm(constructorProps) {
          var _this;

          (0, _classCallCheck2.default)(this, DinoForm);
          _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DinoForm).call(this, constructorProps));
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "createGroups", function (groupsObj) {
            return (0, _util.mapObject)(groupsObj, function (formName) {
              var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                  Com = _ref2.Com,
                  field = _ref2.field,
                  count = _ref2.count,
                  _ref2$formProps = _ref2.formProps,
                  formProps = _ref2$formProps === void 0 ? {} : _ref2$formProps,
                  _ref2$needDrag = _ref2.needDrag,
                  needDrag = _ref2$needDrag === void 0 ? false : _ref2$needDrag,
                  clearMotions = _ref2.clearMotions,
                  pressedMotions = _ref2.pressedMotions,
                  notPressedMotions = _ref2.notPressedMotions,
                  createStyle = _ref2.createStyle;

              var IDRefMap = {};
              var IDList = (0, _toConsumableArray2.default)(new Array(count)).map(function () {
                return _this.ID++;
              });
              var Form = (0, _DinoFormHelper.createDinoFormGroupWrap)({
                setIDRefMap: function setIDRefMap(ID, value) {
                  _this.groups[formName].IDRefMap[ID] = value;
                },
                topFormRender: _this.topFormRender,
                Com: Com
              });
              var group = {
                Com: Com,
                field: field,
                formProps: formProps,
                formName: formName,
                needDrag: needDrag,
                IDRefMap: IDRefMap,
                IDList: IDList,
                Form: Form,
                clearMotions: clearMotions,
                pressedMotions: pressedMotions,
                notPressedMotions: notPressedMotions,
                createStyle: createStyle
              };
              return (0, _defineProperty2.default)({}, formName, group);
            });
          });
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "topFormRender", function () {
            return new _promise.default(function (r) {
              if (_this.props.topFormRender) {
                return _this.props.topFormRender().then(r);
              }

              return _this.setState({}, r);
            });
          });
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "createDinoFormApi", function () {
            return {
              FromItem: _this.FromItem,
              setFieldsValue: _this.setFieldsValue,
              setFullValues: _this.setFullValues,
              setFieldsError: _this.setFieldsError,
              getFullValues: _this.getFullValues,
              getFieldsValue: _this.getFieldsValue,
              verify: _this.verify,
              store: _this.store,
              dinoFormRef: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))
            };
          });
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setFieldsError", function (obj) {
            (0, _toConsumableArray2.default)((0, _entries.default)(obj)).forEach(function (_ref4) {
              var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
                  field = _ref5[0],
                  error = _ref5[1];

              _this.store.update(field, {
                error: error
              });
            });

            _this.setState({});
          });
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setFieldsValue", function (obj) {
            (0, _toConsumableArray2.default)((0, _entries.default)(obj)).forEach(function (_ref6) {
              var _ref7 = (0, _slicedToArray2.default)(_ref6, 2),
                  field = _ref7[0],
                  newValue = _ref7[1];

              _this.store.update(field, {
                value: newValue
              });
            });

            _this.topFormRender();
          });
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getFieldsValue", function () {
            for (var _len = arguments.length, fields = new Array(_len), _key = 0; _key < _len; _key++) {
              fields[_key] = arguments[_key];
            }

            return fields.map(function (field) {
              var scheme = _this.store.get(field) || {};
              return scheme.value;
            });
          });
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getFullValues", function () {
            var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref8$onlyGetMount = _ref8.onlyGetMount,
                onlyGetMount = _ref8$onlyGetMount === void 0 ? true : _ref8$onlyGetMount;

            var fragmentsField = (0, _util.mapObject)(_this.store.get(), function (field, scheme) {
              var isMount = scheme.isMount,
                  value = scheme.value;
              return onlyGetMount ? isMount ? (0, _defineProperty2.default)({}, field, value) : {} : (0, _defineProperty2.default)({}, field, value);
            });
            var groupField = (0, _util.mapObject)(_this.groups, function (groupName, _ref11) {
              var field = _ref11.field,
                  _ref11$IDRefMap = _ref11.IDRefMap,
                  IDRefMap = _ref11$IDRefMap === void 0 ? [] : _ref11$IDRefMap,
                  IDList = _ref11.IDList;
              var values = [];
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = (0, _getIterator2.default)(IDList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var ID = _step.value;

                  if (!IDRefMap[ID].ref) {
                    console.warn("[dino-form] group from ref not registered, field = ".concat(field, ", ID=").concat(ID));
                    continue;
                  }

                  var result = IDRefMap[ID].ref.getFullValues({
                    onlyGetMount: onlyGetMount
                  });
                  values.push(result);
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              return (0, _defineProperty2.default)({}, field, values);
            });
            var subFormField = (0, _util.mapObject)(_this.subForms, function (formName, subForm) {
              var ref = subForm.ref,
                  field = subForm.field;

              if (!ref) {
                console.warn("[dino-form] subForm ref not registered, field = ".concat(field));
                return (0, _defineProperty2.default)({}, field, {});
              }

              return (0, _defineProperty2.default)({}, field, ref.getFullValues({
                onlyGetMount: onlyGetMount
              }));
            });
            return (0, _objectSpread2.default)({}, fragmentsField, groupField, subFormField);
          });
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setFullValues",
          /*#__PURE__*/
          (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee3() {
            var values,
                maps,
                findGroups,
                findSubForms,
                render,
                _args3 = arguments;
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    values = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                    maps = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};

                    findGroups = function findGroups(field) {
                      return (0, _values.default)(_this.groups).find(function (group) {
                        return group.field === field;
                      });
                    };

                    findSubForms = function findSubForms(field) {
                      return (0, _values.default)(_this.subForms).find(function (subForm) {
                        return subForm.field === field;
                      });
                    };

                    render = function render() {
                      return new _promise.default(function (r) {
                        return _this.setState({}, r);
                      });
                    };

                    _context3.next = 7;
                    return (0, _util.mapObject)(values,
                    /*#__PURE__*/
                    function () {
                      var _ref16 = (0, _asyncToGenerator2.default)(
                      /*#__PURE__*/
                      _regenerator.default.mark(function _callee2(field, value) {
                        var group, subForm, subFormMapObj, ref, _maps$field, mapFun, IDRefMap, IDList, formName;

                        return _regenerator.default.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                group = findGroups(field);
                                subForm = findSubForms(field);

                                if (!subForm) {
                                  _context2.next = 10;
                                  break;
                                }

                                subFormMapObj = maps[field];
                                ref = subForm.ref;

                                if (ref) {
                                  _context2.next = 8;
                                  break;
                                }

                                console.warn("[dino-form] field is '".concat(field, "' subForm should be mounted but the Ref is not registered, maybe you not render this subForm."));
                                return _context2.abrupt("return");

                              case 8:
                                ref.setFullValues(value, subFormMapObj);
                                return _context2.abrupt("return");

                              case 10:
                                if (group) {
                                  _context2.next = 14;
                                  break;
                                }

                                // fragment
                                _maps$field = maps[field], mapFun = _maps$field === void 0 ? function (_) {
                                  return _;
                                } : _maps$field;

                                _this.store.update(field, {
                                  value: mapFun(value)
                                });

                                return _context2.abrupt("return");

                              case 14:
                                if (!(!(0, _isArray.default)(value) || value.length < 1)) {
                                  _context2.next = 16;
                                  break;
                                }

                                return _context2.abrupt("return");

                              case 16:
                                // delete IDList and add
                                group.IDList = (0, _toConsumableArray2.default)(new Array(value.length)).map(function () {
                                  return _this.ID++;
                                }); // render
                                // await render();

                                _context2.next = 19;
                                return render();

                              case 19:
                                // await this.topFormRender();
                                // group should mounted
                                IDRefMap = group.IDRefMap, IDList = group.IDList, formName = group.formName;
                                _context2.next = 22;
                                return (0, _util.mapObjectAsync)(IDList,
                                /*#__PURE__*/
                                function () {
                                  var _ref17 = (0, _asyncToGenerator2.default)(
                                  /*#__PURE__*/
                                  _regenerator.default.mark(function _callee(index, ID) {
                                    var ref, groupItemValue, _maps$field2, fun, _fun, _fun$mapObj, mapObj, _fun$props, props;

                                    return _regenerator.default.wrap(function _callee$(_context) {
                                      while (1) {
                                        switch (_context.prev = _context.next) {
                                          case 0:
                                            _context.next = 2;
                                            return getGroupRef(function () {
                                              var _IDRefMap$ID = IDRefMap[ID];
                                              _IDRefMap$ID = _IDRefMap$ID === void 0 ? {} : _IDRefMap$ID;
                                              var groupFormRef = _IDRefMap$ID.ref;
                                              return groupFormRef;
                                            });

                                          case 2:
                                            ref = _context.sent;

                                            if (ref) {
                                              _context.next = 6;
                                              break;
                                            }

                                            console.warn("[dino-form] form '".concat(formName, "' should be mounted but the Ref is not registered, maybe you not render this group."));
                                            return _context.abrupt("return");

                                          case 6:
                                            groupItemValue = value[index] || [];
                                            _maps$field2 = maps[field], fun = _maps$field2 === void 0 ? function () {
                                              return {
                                                mapObj: {},
                                                props: {}
                                              };
                                            } : _maps$field2;
                                            _fun = fun(groupItemValue), _fun$mapObj = _fun.mapObj, mapObj = _fun$mapObj === void 0 ? {} : _fun$mapObj, _fun$props = _fun.props, props = _fun$props === void 0 ? {} : _fun$props;
                                            IDRefMap[ID].props = props;
                                            ref.setFullValues(groupItemValue, mapObj);

                                          case 11:
                                          case "end":
                                            return _context.stop();
                                        }
                                      }
                                    }, _callee, this);
                                  }));

                                  return function (_x3, _x4) {
                                    return _ref17.apply(this, arguments);
                                  };
                                }(), IDList);

                              case 22:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2, this);
                      }));

                      return function (_x, _x2) {
                        return _ref16.apply(this, arguments);
                      };
                    }());

                  case 7:
                    _this.setState({});

                  case 8:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          })));
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "verify", function () {
            var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref18$first = _ref18.first,
                first = _ref18$first === void 0 ? false : _ref18$first,
                _ref18$scroll = _ref18.scroll,
                scroll = _ref18$scroll === void 0 ? true : _ref18$scroll;

            return _promise.default.resolve().then(
            /*#__PURE__*/
            (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee7() {
              var hasError, fragmentsField, groupField, subFormField;
              return _regenerator.default.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      hasError = false;
                      _context7.next = 3;
                      return (0, _util.mapObjectAsync)(_this.store.get(),
                      /*#__PURE__*/
                      function () {
                        var _ref20 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee4(field, scheme) {
                          var _scheme$rules, rules, isMount, value, label, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, rule, isPass, error;

                          return _regenerator.default.wrap(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  _scheme$rules = scheme.rules, rules = _scheme$rules === void 0 ? [] : _scheme$rules, isMount = scheme.isMount, value = scheme.value, label = scheme.label;

                                  if (isMount) {
                                    _context4.next = 3;
                                    break;
                                  }

                                  return _context4.abrupt("return", {});

                                case 3:
                                  _iteratorNormalCompletion2 = true;
                                  _didIteratorError2 = false;
                                  _iteratorError2 = undefined;
                                  _context4.prev = 6;
                                  _iterator2 = (0, _getIterator2.default)(rules);

                                case 8:
                                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                    _context4.next = 21;
                                    break;
                                  }

                                  rule = _step2.value;
                                  _context4.next = 12;
                                  return rule.fun(value);

                                case 12:
                                  isPass = _context4.sent;

                                  if (isPass) {
                                    _context4.next = 18;
                                    break;
                                  }

                                  hasError = true;
                                  error = rule.error({
                                    label: label,
                                    field: field
                                  });

                                  _this.setFieldsError((0, _defineProperty2.default)({}, field, error));

                                  return _context4.abrupt("break", 21);

                                case 18:
                                  _iteratorNormalCompletion2 = true;
                                  _context4.next = 8;
                                  break;

                                case 21:
                                  _context4.next = 27;
                                  break;

                                case 23:
                                  _context4.prev = 23;
                                  _context4.t0 = _context4["catch"](6);
                                  _didIteratorError2 = true;
                                  _iteratorError2 = _context4.t0;

                                case 27:
                                  _context4.prev = 27;
                                  _context4.prev = 28;

                                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                    _iterator2.return();
                                  }

                                case 30:
                                  _context4.prev = 30;

                                  if (!_didIteratorError2) {
                                    _context4.next = 33;
                                    break;
                                  }

                                  throw _iteratorError2;

                                case 33:
                                  return _context4.finish(30);

                                case 34:
                                  return _context4.finish(27);

                                case 35:
                                  return _context4.abrupt("return", (0, _defineProperty2.default)({}, field, value));

                                case 36:
                                case "end":
                                  return _context4.stop();
                              }
                            }
                          }, _callee4, this, [[6, 23, 27, 35], [28,, 30, 34]]);
                        }));

                        return function (_x5, _x6) {
                          return _ref20.apply(this, arguments);
                        };
                      }());

                    case 3:
                      fragmentsField = _context7.sent;
                      _context7.next = 6;
                      return (0, _util.mapObjectAsync)(_this.groups,
                      /*#__PURE__*/
                      function () {
                        var _ref23 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee5(groupName, _ref22) {
                          var field, _ref22$IDRefMap, IDRefMap, IDList, values, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, ID, result;

                          return _regenerator.default.wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  field = _ref22.field, _ref22$IDRefMap = _ref22.IDRefMap, IDRefMap = _ref22$IDRefMap === void 0 ? [] : _ref22$IDRefMap, IDList = _ref22.IDList;
                                  values = [];
                                  _iteratorNormalCompletion3 = true;
                                  _didIteratorError3 = false;
                                  _iteratorError3 = undefined;
                                  _context5.prev = 5;
                                  _iterator3 = (0, _getIterator2.default)(IDList);

                                case 7:
                                  if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                    _context5.next = 20;
                                    break;
                                  }

                                  ID = _step3.value;

                                  if (IDRefMap[ID].ref) {
                                    _context5.next = 12;
                                    break;
                                  }

                                  console.warn("[dino-form] group from ref not registered, field = ".concat(field, ", ID=").concat(ID));
                                  return _context5.abrupt("continue", 17);

                                case 12:
                                  _context5.next = 14;
                                  return IDRefMap[ID].ref.verify();

                                case 14:
                                  result = _context5.sent;
                                  if (result.hasError) hasError = true;
                                  values.push(result.data);

                                case 17:
                                  _iteratorNormalCompletion3 = true;
                                  _context5.next = 7;
                                  break;

                                case 20:
                                  _context5.next = 26;
                                  break;

                                case 22:
                                  _context5.prev = 22;
                                  _context5.t0 = _context5["catch"](5);
                                  _didIteratorError3 = true;
                                  _iteratorError3 = _context5.t0;

                                case 26:
                                  _context5.prev = 26;
                                  _context5.prev = 27;

                                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                    _iterator3.return();
                                  }

                                case 29:
                                  _context5.prev = 29;

                                  if (!_didIteratorError3) {
                                    _context5.next = 32;
                                    break;
                                  }

                                  throw _iteratorError3;

                                case 32:
                                  return _context5.finish(29);

                                case 33:
                                  return _context5.finish(26);

                                case 34:
                                  return _context5.abrupt("return", (0, _defineProperty2.default)({}, field, values));

                                case 35:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5, this, [[5, 22, 26, 34], [27,, 29, 33]]);
                        }));

                        return function (_x7, _x8) {
                          return _ref23.apply(this, arguments);
                        };
                      }());

                    case 6:
                      groupField = _context7.sent;
                      _context7.next = 9;
                      return (0, _util.mapObjectAsync)(_this.subForms,
                      /*#__PURE__*/
                      function () {
                        var _ref25 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee6(formName, subForm) {
                          var ref, field, _ref27, data, subFormHasError;

                          return _regenerator.default.wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  ref = subForm.ref, field = subForm.field;

                                  if (ref) {
                                    _context6.next = 4;
                                    break;
                                  }

                                  console.warn("[dino-form] subFrom ref not registered, field = ".concat(field, "."));
                                  return _context6.abrupt("return", (0, _defineProperty2.default)({}, field, {}));

                                case 4:
                                  _context6.next = 6;
                                  return ref.verify();

                                case 6:
                                  _ref27 = _context6.sent;
                                  data = _ref27.data;
                                  subFormHasError = _ref27.hasError;
                                  hasError = subFormHasError;
                                  return _context6.abrupt("return", (0, _defineProperty2.default)({}, field, data));

                                case 11:
                                case "end":
                                  return _context6.stop();
                              }
                            }
                          }, _callee6, this);
                        }));

                        return function (_x9, _x10) {
                          return _ref25.apply(this, arguments);
                        };
                      }());

                    case 9:
                      subFormField = _context7.sent;
                      return _context7.abrupt("return", {
                        hasError: hasError,
                        data: (0, _objectSpread2.default)({}, fragmentsField, groupField, subFormField)
                      });

                    case 11:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            })));
          });
          _this.store = (0, _DinoFormStore.default)();
          _this.subForms = (0, _DinoFormHelper.createDinoFormSubForm)(subForms);
          _this.FromItem = (0, _DinoFormHelper.createFromItem)({
            createDinoFormApi: _this.createDinoFormApi
          });
          _this.fragments = (0, _DinoFormHelper.createFragments)({
            fragments: fragments,
            createDinoFormApi: _this.createDinoFormApi
          });
          _this.ID = 0;
          _this.groups = _this.createGroups(groups);
          _this.state = {
            store: _this.store,
            FromItem: _this.FromItem,
            ID: _this.ID,
            fragments: _this.fragments,
            subForms: _this.subForms,
            groups: _this.groups
          };
          return _this;
        }

        (0, _createClass2.default)(DinoForm, [{
          key: "render",
          value: function render() {
            var _this2 = this;

            var _this$props = this.props,
                _this$props$catchRef = _this$props.catchRef,
                catchRef = _this$props$catchRef === void 0 ? function () {} : _this$props$catchRef,
                others = (0, _objectWithoutProperties2.default)(_this$props, ["catchRef"]);
            return _react.default.createElement(Wrap, (0, _extends2.default)({
              ref: catchRef,
              dinoForm: (0, _objectSpread2.default)({}, this.createDinoFormApi(), {
                renderDinoForm: function renderDinoForm() {
                  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                  return _react.default.createElement(View, (0, _extends2.default)({}, props, {
                    dinoForm: (0, _objectSpread2.default)({}, _this2.createDinoFormApi(), {
                      fragments: _this2.fragments,
                      groups: (0, _DinoFormHelper.groupsAPI)({
                        groups: _this2.groups,
                        render: _this2.topFormRender,
                        getID: function getID() {
                          return _this2.ID;
                        },
                        setID: function setID(ID) {
                          _this2.ID = ID;
                        }
                      }),
                      subForms: (0, _DinoFormHelper.subFormsAPI)({
                        subForms: _this2.subForms
                      })
                    })
                  }));
                }
              })
            }, others));
          }
        }]);
        return DinoForm;
      }(_react.Component), _temp;
    };
  };
}

var _default = createForm;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJXcmFwQ29tIiwicmVuZGVyRGlub0Zvcm0iLCJwcm9wcyIsImRpbm9Gb3JtIiwiQ29tcG9uZW50IiwiY3JlYXRlRm9ybSIsImZyYWdtZW50cyIsImdyb3VwcyIsInN1YkZvcm1zIiwiZ2V0R3JvdXBSZWYiLCJnZXRSZWYiLCJjcmVhdGUiLCJWaWV3IiwiYmluZFdyYXAiLCJXcmFwIiwiY29uc3RydWN0b3JQcm9wcyIsImdyb3Vwc09iaiIsImZvcm1OYW1lIiwiQ29tIiwiZmllbGQiLCJjb3VudCIsImZvcm1Qcm9wcyIsIm5lZWREcmFnIiwiY2xlYXJNb3Rpb25zIiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJyIiwidGhlbiIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImZyYWdtZW50c0ZpZWxkIiwiaXNNb3VudCIsImdyb3VwRmllbGQiLCJncm91cE5hbWUiLCJ2YWx1ZXMiLCJyZWYiLCJjb25zb2xlIiwid2FybiIsInJlc3VsdCIsInB1c2giLCJzdWJGb3JtRmllbGQiLCJzdWJGb3JtIiwibWFwcyIsImZpbmRHcm91cHMiLCJmaW5kIiwiZmluZFN1YkZvcm1zIiwicmVuZGVyIiwic3ViRm9ybU1hcE9iaiIsIm1hcEZ1biIsIl8iLCJsZW5ndGgiLCJpbmRleCIsImdyb3VwRm9ybVJlZiIsImdyb3VwSXRlbVZhbHVlIiwiZnVuIiwibWFwT2JqIiwiZmlyc3QiLCJzY3JvbGwiLCJyZXNvbHZlIiwiaGFzRXJyb3IiLCJydWxlcyIsImxhYmVsIiwicnVsZSIsImlzUGFzcyIsImRhdGEiLCJzdWJGb3JtSGFzRXJyb3IiLCJjcmVhdGVEaW5vRm9ybUFwaSIsImNyZWF0ZUdyb3VwcyIsInN0YXRlIiwiY2F0Y2hSZWYiLCJvdGhlcnMiLCJnZXRJRCIsInNldElEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBVUE7O0lBR01BLE87Ozs7Ozs7Ozs7Ozs2QkFDSztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsYUFBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7O0VBSm1CRSxnQjs7QUFPdEIsU0FBU0MsVUFBVCxHQUtRO0FBQUEsaUZBQUosRUFBSTtBQUFBLDRCQUpOQyxTQUlNO0FBQUEsTUFKTkEsU0FJTSwrQkFKTSxFQUlOO0FBQUEseUJBSE5DLE1BR007QUFBQSxNQUhOQSxNQUdNLDRCQUhHLEVBR0g7QUFBQSwyQkFGTkMsUUFFTTtBQUFBLE1BRk5BLFFBRU0sOEJBRkssRUFFTDtBQUFBLDhCQUROQyxXQUNNO0FBQUEsTUFETkEsV0FDTSxpQ0FEUUMsc0JBQ1I7O0FBQ04sU0FBTyxTQUFTQyxNQUFULENBQWdCQyxJQUFoQixFQUFzQjtBQUMzQixXQUFPLFNBQVNDLFFBQVQsR0FBa0M7QUFBQTs7QUFBQSxVQUFoQkMsSUFBZ0IsdUVBQVRkLE9BQVM7QUFDdkM7QUFBQTtBQUFBO0FBQUE7O0FBQ0UsMEJBQVllLGdCQUFaLEVBQThCO0FBQUE7O0FBQUE7QUFDNUIsb0hBQU1BLGdCQUFOO0FBRDRCLDJJQTRCZixVQUFBQyxTQUFTO0FBQUEsbUJBQUkscUJBQVVBLFNB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LFNBQVMsRUFBRSxNQUFJLENBQUNBLFNBRlY7QUFHTkMsc0JBQUFBLE1BQU0sRUFBRSwrQkFBVTtBQUNoQkEsd0JBQUFBLE1BQU0sRUFBRSxNQUFJLENBQUNBLE1BREc7QUFFaEJtRSx3QkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ3ZDLGFBRkc7QUFHaEJnRSx3QkFBQUEsS0FBSyxFQUFFO0FBQUEsaUNBQU0sTUFBSSxDQUFDcEUsRUFBWDtBQUFBLHlCQUhTO0FBSWhCcUUsd0JBQUFBLEtBQUssRUFBRSxlQUFDckUsRUFBRCxFQUFRO0FBQUUsMEJBQUEsTUFBSSxDQUFDQSxFQUFMLEdBQVVBLEVBQVY7QUFBZTtBQUpoQix1QkFBVixDQUhGO0FBU052QixzQkFBQUEsUUFBUSxFQUFFLGlDQUFZO0FBQUVBLHdCQUFBQSxRQUFRLEVBQUUsTUFBSSxDQUFDQTtBQUFqQix1QkFBWjtBQVRKO0FBRlYscUJBRGM7QUFBQTtBQUZWO0FBRlYsZUFxQk8wRixNQXJCUCxFQURGO0FBeUJEO0FBalhIO0FBQUE7QUFBQSxRQUE4QjlGLGdCQUE5QjtBQW1YRCxLQXBYRDtBQXFYRCxHQXRYRDtBQXVYRDs7ZUFFY0MsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlRGlub0Zvcm1TdG9yZSBmcm9tICcuL0Rpbm9Gb3JtU3RvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRnJvbUl0ZW0sXG4gIGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSxcbiAgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAsXG4gIGNyZWF0ZUZyYWdtZW50cyxcbiAgZ3JvdXBzQVBJLFxuICBzdWJGb3Jtc0FQSSxcbiAgZ2V0UmVmLFxufSBmcm9tICcuL0Rpbm9Gb3JtSGVscGVyJztcblxuaW1wb3J0IHsgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYyB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIFdyYXBDb20gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaW5vRm9ybTogeyByZW5kZXJEaW5vRm9ybSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybSh0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKHtcbiAgZnJhZ21lbnRzID0ge30sXG4gIGdyb3VwcyA9IHt9LFxuICBzdWJGb3JtcyA9IHt9LFxuICBnZXRHcm91cFJlZiA9IGdldFJlZixcbn0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlKFZpZXcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYmluZFdyYXAoV3JhcCA9IFdyYXBDb20pIHtcbiAgICAgIHJldHVybiBjbGFzcyBEaW5vRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yUHJvcHMpIHtcbiAgICAgICAgICBzdXBlcihjb25zdHJ1Y3RvclByb3BzKTtcblxuICAgICAgICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVEaW5vRm9ybVN0b3JlKCk7XG4gICAgICAgICAgdGhpcy5zdWJGb3JtcyA9IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybShzdWJGb3Jtcyk7XG5cbiAgICAgICAgICB0aGlzLkZyb21JdGVtID0gY3JlYXRlRnJvbUl0ZW0oe1xuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmZyYWdtZW50cyA9IGNyZWF0ZUZyYWdtZW50cyh7XG4gICAgICAgICAgICBmcmFnbWVudHMsXG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuSUQgPSAwO1xuICAgICAgICAgIHRoaXMuZ3JvdXBzID0gdGhpcy5jcmVhdGVHcm91cHMoZ3JvdXBzKTtcblxuICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuICAgICAgICAgICAgSUQ6IHRoaXMuSUQsXG4gICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVHcm91cHMgPSBncm91cHNPYmogPT4gbWFwT2JqZWN0KGdyb3Vwc09iaiwgKGZvcm1OYW1lLCB7XG4gICAgICAgICAgQ29tLFxuICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgIGNvdW50LFxuICAgICAgICAgIGZvcm1Qcm9wcyA9IHt9LFxuICAgICAgICAgIG5lZWREcmFnID0gZmFsc2UsXG4gICAgICAgICAgY2xlYXJNb3Rpb25zLFxuICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIGNyZWF0ZVN0eWxlLFxuICAgICAgICB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBJRFJlZk1hcCA9IHt9O1xuICAgICAgICAgIGNvbnN0IElETGlzdCA9IFsuLi5uZXcgQXJyYXkoY291bnQpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcbiAgICAgICAgICBjb25zdCBGb3JtID0gY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAoe1xuICAgICAgICAgICAgc2V0SURSZWZNYXA6IChJRCwgdmFsdWUpID0+IHsgdGhpcy5ncm91cHNbZm9ybU5hbWVdLklEUmVmTWFwW0lEXSA9IHZhbHVlOyB9LFxuICAgICAgICAgICAgdG9wRm9ybVJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgIGZvcm1Qcm9wcyxcbiAgICAgICAgICAgIGZvcm1OYW1lLFxuICAgICAgICAgICAgbmVlZERyYWcsXG4gICAgICAgICAgICBJRFJlZk1hcCxcbiAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgIEZvcm0sXG4gICAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgICBwcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgW2Zvcm1OYW1lXTogZ3JvdXAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdG9wRm9ybVJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcigpLnRoZW4ocik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHt9LCByKTtcbiAgICAgICAgfSlcblxuICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaSA9ICgpID0+ICh7XG4gICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG5cbiAgICAgICAgICBzZXRGaWVsZHNWYWx1ZTogdGhpcy5zZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgICBzZXRGdWxsVmFsdWVzOiB0aGlzLnNldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgc2V0RmllbGRzRXJyb3I6IHRoaXMuc2V0RmllbGRzRXJyb3IsXG5cbiAgICAgICAgICBnZXRGdWxsVmFsdWVzOiB0aGlzLmdldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgZ2V0RmllbGRzVmFsdWU6IHRoaXMuZ2V0RmllbGRzVmFsdWUsXG5cbiAgICAgICAgICB2ZXJpZnk6IHRoaXMudmVyaWZ5LFxuICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgIGRpbm9Gb3JtUmVmOiB0aGlzLFxuICAgICAgICB9KVxuXG4gICAgICAgIHNldEZpZWxkc0Vycm9yID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIGVycm9yXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgZXJyb3IgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGaWVsZHNWYWx1ZSA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBuZXdWYWx1ZV0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMudG9wRm9ybVJlbmRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0RmllbGRzVmFsdWUgPSAoLi4uZmllbGRzKSA9PiBmaWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtZSA9IHRoaXMuc3RvcmUuZ2V0KGZpZWxkKSB8fCB7fTtcbiAgICAgICAgICByZXR1cm4gc2NoZW1lLnZhbHVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIGdldEZ1bGxWYWx1ZXMgPSAoeyBvbmx5R2V0TW91bnQgPSB0cnVlIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgIHNjaGVtZSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IGlzTW91bnQsIHZhbHVlIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgIHJldHVybiBvbmx5R2V0TW91bnRcbiAgICAgICAgICAgICAgICA/IGlzTW91bnQgPyB7IFtmaWVsZF06IHZhbHVlIH0gOiB7fVxuICAgICAgICAgICAgICAgIDogeyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUlEUmVmTWFwW0lEXS5yZWYpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZ3JvdXAgZnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0sIElEPSR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSURSZWZNYXBbSURdLnJlZi5nZXRGdWxsVmFsdWVzKHsgb25seUdldE1vdW50IH0pO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBzdWJGb3JtIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiB7fSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiByZWYuZ2V0RnVsbFZhbHVlcyh7IG9ubHlHZXRNb3VudCB9KSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZ1bGxWYWx1ZXMgPSBhc3luYyAodmFsdWVzID0ge30sIG1hcHMgPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbmRHcm91cHMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgKS5maW5kKGdyb3VwID0+IGdyb3VwLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCBmaW5kU3ViRm9ybXMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICApLmZpbmQoc3ViRm9ybSA9PiBzdWJGb3JtLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZShyID0+IHRoaXMuc2V0U3RhdGUoe30sIHIpKTtcblxuICAgICAgICAgIGF3YWl0IG1hcE9iamVjdCh2YWx1ZXMsIGFzeW5jIChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmluZEdyb3VwcyhmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtID0gZmluZFN1YkZvcm1zKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHN1YkZvcm0pIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBzdWJGb3JtTWFwT2JqIH0gPSBtYXBzO1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZmllbGQgaXMgJyR7ZmllbGR9JyBzdWJGb3JtIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIHN1YkZvcm0uYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXModmFsdWUsIHN1YkZvcm1NYXBPYmopO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ3JvdXApIHsgLy8gZnJhZ21lbnRcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBtYXBGdW4gPSBfID0+IF8gfSA9IG1hcHM7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBtYXBGdW4odmFsdWUpIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBkZWxldGUgSURMaXN0IGFuZCBhZGRcbiAgICAgICAgICAgIGdyb3VwLklETGlzdCA9IFsuLi5uZXcgQXJyYXkodmFsdWUubGVuZ3RoKV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG5cbiAgICAgICAgICAgIC8vIHJlbmRlclxuICAgICAgICAgICAgLy8gYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMudG9wRm9ybVJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIGF3YWl0IG1hcE9iamVjdEFzeW5jKElETGlzdCwgYXN5bmMgKGluZGV4LCBJRCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZWYgPSBhd2FpdCBnZXRHcm91cFJlZigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgW0lEXToge1xuICAgICAgICAgICAgICAgICAgICByZWY6IGdyb3VwRm9ybVJlZixcbiAgICAgICAgICAgICAgICAgIH0gPSB7fSxcbiAgICAgICAgICAgICAgICB9ID0gSURSZWZNYXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwRm9ybVJlZjtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGZvcm0gJyR7Zm9ybU5hbWV9JyBzaG91bGQgYmUgbW91bnRlZCBidXQgdGhlIFJlZiBpcyBub3QgcmVnaXN0ZXJlZCwgbWF5YmUgeW91IG5vdCByZW5kZXIgdGhpcyBncm91cC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1WYWx1ZSA9IHZhbHVlW2luZGV4XSB8fCBbXTtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IGZ1biA9ICgpID0+ICh7XG4gICAgICAgICAgICAgICAgICBtYXBPYmo6IHt9LFxuICAgICAgICAgICAgICAgICAgcHJvcHM6IHt9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB9ID0gbWFwcztcblxuICAgICAgICAgICAgICBjb25zdCB7IG1hcE9iaiA9IHt9LCBwcm9wcyA9IHt9IH0gPSBmdW4oZ3JvdXBJdGVtVmFsdWUpO1xuXG4gICAgICAgICAgICAgIElEUmVmTWFwW0lEXS5wcm9wcyA9IHByb3BzO1xuXG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKGdyb3VwSXRlbVZhbHVlLCBtYXBPYmopO1xuICAgICAgICAgICAgfSwgSURMaXN0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmVyaWZ5ID0gKHtcbiAgICAgICAgICBmaXJzdCA9IGZhbHNlLCAvLyB0b2RvXG4gICAgICAgICAgc2Nyb2xsID0gdHJ1ZSwgLy8gdG9kb1xuICAgICAgICB9ID0ge30pID0+IChcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIHNjaGVtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIHJ1bGVzID0gW10sIGlzTW91bnQsIHZhbHVlLCBsYWJlbCxcbiAgICAgICAgICAgICAgICB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICAgIGlmICghaXNNb3VudCkgeyByZXR1cm4ge307IH1cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNQYXNzID0gYXdhaXQgcnVsZS5mdW4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgaWYgKCFpc1Bhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHJ1bGUuZXJyb3IoeyBsYWJlbCwgZmllbGQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghSURSZWZNYXBbSURdLnJlZikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGdyb3VwIGZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LCBJRD0ke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IElEUmVmTWFwW0lEXS5yZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmhhc0Vycm9yKSBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAgIGFzeW5jIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIHN1YkZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LmApO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXToge30gfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGhhc0Vycm9yOiBzdWJGb3JtSGFzRXJyb3IgfSA9IGF3YWl0IHJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHN1YkZvcm1IYXNFcnJvcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogZGF0YSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaGFzRXJyb3IsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcblxuICAgICAgICApXG5cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIGNvbnN0IHsgY2F0Y2hSZWYgPSAoKSA9PiB7fSwgLi4ub3RoZXJzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8V3JhcFxuICAgICAgICAgICAgICByZWY9eyBjYXRjaFJlZiB9XG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICByZW5kZXJEaW5vRm9ybTogKHByb3BzID0ge30pID0+IChcbiAgICAgICAgICAgICAgICAgIDxWaWV3XG4gICAgICAgICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IGdyb3Vwc0FQSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJRDogKCkgPT4gdGhpcy5JRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldElEOiAoSUQpID0+IHsgdGhpcy5JRCA9IElEOyB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIHN1YkZvcm1zOiBzdWJGb3Jtc0FQSSh7IHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zIH0pLFxuICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgeyAuLi5vdGhlcnMgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRm9ybTtcbiJdfQ==