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
          _this.store = (0, _DinoFormStore.default)(); // this.subForms = createDinoFormSubForm(subForms, this.topFormRender);

          _this.subForms = (0, _DinoFormHelper.createDinoFormSubForm)({
            subForms: subForms,
            topFormRender: _this.topFormRender
          });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJXcmFwQ29tIiwicmVuZGVyRGlub0Zvcm0iLCJwcm9wcyIsImRpbm9Gb3JtIiwiQ29tcG9uZW50IiwiY3JlYXRlRm9ybSIsImZyYWdtZW50cyIsImdyb3VwcyIsInN1YkZvcm1zIiwiZ2V0R3JvdXBSZWYiLCJnZXRSZWYiLCJjcmVhdGUiLCJWaWV3IiwiYmluZFdyYXAiLCJXcmFwIiwiY29uc3RydWN0b3JQcm9wcyIsImdyb3Vwc09iaiIsImZvcm1OYW1lIiwiQ29tIiwiZmllbGQiLCJjb3VudCIsImZvcm1Qcm9wcyIsIm5lZWREcmFnIiwiY2xlYXJNb3Rpb25zIiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJyIiwidGhlbiIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImZyYWdtZW50c0ZpZWxkIiwiaXNNb3VudCIsImdyb3VwRmllbGQiLCJncm91cE5hbWUiLCJ2YWx1ZXMiLCJyZWYiLCJjb25zb2xlIiwid2FybiIsInJlc3VsdCIsInB1c2giLCJzdWJGb3JtRmllbGQiLCJzdWJGb3JtIiwibWFwcyIsImZpbmRHcm91cHMiLCJmaW5kIiwiZmluZFN1YkZvcm1zIiwicmVuZGVyIiwic3ViRm9ybU1hcE9iaiIsIm1hcEZ1biIsIl8iLCJsZW5ndGgiLCJpbmRleCIsImdyb3VwRm9ybVJlZiIsImdyb3VwSXRlbVZhbHVlIiwiZnVuIiwibWFwT2JqIiwiZmlyc3QiLCJzY3JvbGwiLCJyZXNvbHZlIiwiaGFzRXJyb3IiLCJydWxlcyIsImxhYmVsIiwicnVsZSIsImlzUGFzcyIsImRhdGEiLCJzdWJGb3JtSGFzRXJyb3IiLCJjcmVhdGVEaW5vRm9ybUFwaSIsImNyZWF0ZUdyb3VwcyIsInN0YXRlIiwiY2F0Y2hSZWYiLCJvdGhlcnMiLCJnZXRJRCIsInNldElEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBVUE7O0lBR01BLE87Ozs7Ozs7Ozs7Ozs2QkFDSztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsYUFBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7O0VBSm1CRSxnQjs7QUFPdEIsU0FBU0MsVUFBVCxHQUtRO0FBQUEsaUZBQUosRUFBSTtBQUFBLDRCQUpOQyxTQUlNO0FBQUEsTUFKTkEsU0FJTSwrQkFKTSxFQUlOO0FBQUEseUJBSE5DLE1BR007QUFBQSxNQUhOQSxNQUdNLDRCQUhHLEVBR0g7QUFBQSwyQkFGTkMsUUFFTTtBQUFBLE1BRk5BLFFBRU0sOEJBRkssRUFFTDtBQUFBLDhCQUROQyxXQUNNO0FBQUEsTUFETkEsV0FDTSxpQ0FEUUMsc0JBQ1I7O0FBQ04sU0FBTyxTQUFTQyxNQUFULENBQWdCQyxJQUFoQixFQUFzQjtBQUMzQixXQUFPLFNBQVNDLFFBQVQsR0FBa0M7QUFBQTs7QUFBQSxVQUFoQkMsSUFBZ0IsdUVBQVRkLE9BQVM7QUFDdkM7QUFBQTtBQUFBO0FBQUE7O0FBQ0UsMEJBQVllLGdCQUFaLEVBQThCO0FBQUE7O0FBQUE7QUFDNUIsb0hBQU1BLGdCQUFOO0FBRDRCLDJJQTZCZixVQUFBQyxTQUFTO0FBQUEsbUJBQUkscUJBQVVBLFNB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QUFELDZCQUNPQSxLQURQO0FBRUUsb0JBQUEsUUFBUSxrQ0FDSCxNQUFJLENBQUM0RixpQkFBTCxFQURHO0FBRU54RixzQkFBQUEsU0FBUyxFQUFFLE1BQUksQ0FBQ0EsU0FGVjtBQUdOQyxzQkFBQUEsTUFBTSxFQUFFLCtCQUFVO0FBQ2hCQSx3QkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ0EsTUFERztBQUVoQm1FLHdCQUFBQSxNQUFNLEVBQUUsTUFBSSxDQUFDdkMsYUFGRztBQUdoQmdFLHdCQUFBQSxLQUFLLEVBQUU7QUFBQSxpQ0FBTSxNQUFJLENBQUNwRSxFQUFYO0FBQUEseUJBSFM7QUFJaEJxRSx3QkFBQUEsS0FBSyxFQUFFLGVBQUNyRSxFQUFELEVBQVE7QUFBRSwwQkFBQSxNQUFJLENBQUNBLEVBQUwsR0FBVUEsRUFBVjtBQUFlO0FBSmhCLHVCQUFWLENBSEY7QUFTTnZCLHNCQUFBQSxRQUFRLEVBQUUsaUNBQVk7QUFBRUEsd0JBQUFBLFFBQVEsRUFBRSxNQUFJLENBQUNBO0FBQWpCLHVCQUFaO0FBVEo7QUFGVixxQkFEYztBQUFBO0FBRlY7QUFGVixlQXFCTzBGLE1BckJQLEVBREY7QUF5QkQ7QUFsWEg7QUFBQTtBQUFBLFFBQThCOUYsZ0JBQTlCO0FBb1hELEtBclhEO0FBc1hELEdBdlhEO0FBd1hEOztlQUVjQyxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVEaW5vRm9ybVN0b3JlIGZyb20gJy4vRGlub0Zvcm1TdG9yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVGcm9tSXRlbSxcbiAgY3JlYXRlRGlub0Zvcm1TdWJGb3JtLFxuICBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCxcbiAgY3JlYXRlRnJhZ21lbnRzLFxuICBncm91cHNBUEksXG4gIHN1YkZvcm1zQVBJLFxuICBnZXRSZWYsXG59IGZyb20gJy4vRGlub0Zvcm1IZWxwZXInO1xuXG5pbXBvcnQgeyBtYXBPYmplY3QsIG1hcE9iamVjdEFzeW5jIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgV3JhcENvbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRpbm9Gb3JtOiB7IHJlbmRlckRpbm9Gb3JtIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtKHRoaXMucHJvcHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oe1xuICBmcmFnbWVudHMgPSB7fSxcbiAgZ3JvdXBzID0ge30sXG4gIHN1YkZvcm1zID0ge30sXG4gIGdldEdyb3VwUmVmID0gZ2V0UmVmLFxufSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGUoVmlldykge1xuICAgIHJldHVybiBmdW5jdGlvbiBiaW5kV3JhcChXcmFwID0gV3JhcENvbSkge1xuICAgICAgcmV0dXJuIGNsYXNzIERpbm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RydWN0b3JQcm9wcykge1xuICAgICAgICAgIHN1cGVyKGNvbnN0cnVjdG9yUHJvcHMpO1xuXG4gICAgICAgICAgdGhpcy5zdG9yZSA9IGNyZWF0ZURpbm9Gb3JtU3RvcmUoKTtcbiAgICAgICAgICAvLyB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHN1YkZvcm1zLCB0aGlzLnRvcEZvcm1SZW5kZXIpO1xuICAgICAgICAgIHRoaXMuc3ViRm9ybXMgPSBjcmVhdGVEaW5vRm9ybVN1YkZvcm0oeyBzdWJGb3JtcywgdG9wRm9ybVJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyIH0pO1xuXG4gICAgICAgICAgdGhpcy5Gcm9tSXRlbSA9IGNyZWF0ZUZyb21JdGVtKHtcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5mcmFnbWVudHMgPSBjcmVhdGVGcmFnbWVudHMoe1xuICAgICAgICAgICAgZnJhZ21lbnRzLFxuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLklEID0gMDtcbiAgICAgICAgICB0aGlzLmdyb3VwcyA9IHRoaXMuY3JlYXRlR3JvdXBzKGdyb3Vwcyk7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcbiAgICAgICAgICAgIElEOiB0aGlzLklELFxuICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgIHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlR3JvdXBzID0gZ3JvdXBzT2JqID0+IG1hcE9iamVjdChncm91cHNPYmosIChmb3JtTmFtZSwge1xuICAgICAgICAgIENvbSxcbiAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICBjb3VudCxcbiAgICAgICAgICBmb3JtUHJvcHMgPSB7fSxcbiAgICAgICAgICBuZWVkRHJhZyA9IGZhbHNlLFxuICAgICAgICAgIGNsZWFyTW90aW9ucyxcbiAgICAgICAgICBwcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICBub3RQcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICBjcmVhdGVTdHlsZSxcbiAgICAgICAgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgSURSZWZNYXAgPSB7fTtcbiAgICAgICAgICBjb25zdCBJRExpc3QgPSBbLi4ubmV3IEFycmF5KGNvdW50KV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG4gICAgICAgICAgY29uc3QgRm9ybSA9IGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwKHtcbiAgICAgICAgICAgIHNldElEUmVmTWFwOiAoSUQsIHZhbHVlKSA9PiB7IHRoaXMuZ3JvdXBzW2Zvcm1OYW1lXS5JRFJlZk1hcFtJRF0gPSB2YWx1ZTsgfSxcbiAgICAgICAgICAgIHRvcEZvcm1SZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwID0ge1xuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICBmb3JtUHJvcHMsXG4gICAgICAgICAgICBmb3JtTmFtZSxcbiAgICAgICAgICAgIG5lZWREcmFnLFxuICAgICAgICAgICAgSURSZWZNYXAsXG4gICAgICAgICAgICBJRExpc3QsXG4gICAgICAgICAgICBGb3JtLFxuICAgICAgICAgICAgY2xlYXJNb3Rpb25zLFxuICAgICAgICAgICAgcHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgICBub3RQcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICAgIGNyZWF0ZVN0eWxlLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgIFtmb3JtTmFtZV06IGdyb3VwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRvcEZvcm1SZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIoKS50aGVuKHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7fSwgcik7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGkgPSAoKSA9PiAoe1xuICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuXG4gICAgICAgICAgc2V0RmllbGRzVmFsdWU6IHRoaXMuc2V0RmllbGRzVmFsdWUsXG4gICAgICAgICAgc2V0RnVsbFZhbHVlczogdGhpcy5zZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIHNldEZpZWxkc0Vycm9yOiB0aGlzLnNldEZpZWxkc0Vycm9yLFxuXG4gICAgICAgICAgZ2V0RnVsbFZhbHVlczogdGhpcy5nZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIGdldEZpZWxkc1ZhbHVlOiB0aGlzLmdldEZpZWxkc1ZhbHVlLFxuXG4gICAgICAgICAgdmVyaWZ5OiB0aGlzLnZlcmlmeSxcbiAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICBkaW5vRm9ybVJlZjogdGhpcyxcbiAgICAgICAgfSlcblxuICAgICAgICBzZXRGaWVsZHNFcnJvciA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBlcnJvcl0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IGVycm9yIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RmllbGRzVmFsdWUgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgbmV3VmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbmV3VmFsdWUgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnRvcEZvcm1SZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlID0gKC4uLmZpZWxkcykgPT4gZmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWUgPSB0aGlzLnN0b3JlLmdldChmaWVsZCkgfHwge307XG4gICAgICAgICAgcmV0dXJuIHNjaGVtZS52YWx1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICBnZXRGdWxsVmFsdWVzID0gKHsgb25seUdldE1vdW50ID0gdHJ1ZSB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZ2V0KCksXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICBzY2hlbWUsXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyBpc01vdW50LCB2YWx1ZSB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICByZXR1cm4gb25seUdldE1vdW50XG4gICAgICAgICAgICAgICAgPyBpc01vdW50ID8geyBbZmllbGRdOiB2YWx1ZSB9IDoge31cbiAgICAgICAgICAgICAgICA6IHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgSURSZWZNYXAgPSBbXSwgSURMaXN0LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgIGZvciAoY29uc3QgSUQgb2YgSURMaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFJRFJlZk1hcFtJRF0ucmVmKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGdyb3VwIGZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LCBJRD0ke0lEfWApO1xuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IElEUmVmTWFwW0lEXS5yZWYuZ2V0RnVsbFZhbHVlcyh7IG9ubHlHZXRNb3VudCB9KTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gc3ViRm9ybSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXToge30sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogcmVmLmdldEZ1bGxWYWx1ZXMoeyBvbmx5R2V0TW91bnQgfSksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGdWxsVmFsdWVzID0gYXN5bmMgKHZhbHVlcyA9IHt9LCBtYXBzID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmaW5kR3JvdXBzID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICkuZmluZChncm91cCA9PiBncm91cC5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgZmluZFN1YkZvcm1zID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgKS5maW5kKHN1YkZvcm0gPT4gc3ViRm9ybS5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UociA9PiB0aGlzLnNldFN0YXRlKHt9LCByKSk7XG5cbiAgICAgICAgICBhd2FpdCBtYXBPYmplY3QodmFsdWVzLCBhc3luYyAoZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpbmRHcm91cHMoZmllbGQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybSA9IGZpbmRTdWJGb3JtcyhmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmIChzdWJGb3JtKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogc3ViRm9ybU1hcE9iaiB9ID0gbWFwcztcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYgfSA9IHN1YkZvcm07XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGZpZWxkIGlzICcke2ZpZWxkfScgc3ViRm9ybSBzaG91bGQgYmUgbW91bnRlZCBidXQgdGhlIFJlZiBpcyBub3QgcmVnaXN0ZXJlZCwgbWF5YmUgeW91IG5vdCByZW5kZXIgdGhpcyBzdWJGb3JtLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKHZhbHVlLCBzdWJGb3JtTWFwT2JqKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdyb3VwKSB7IC8vIGZyYWdtZW50XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogbWFwRnVuID0gXyA9PiBfIH0gPSBtYXBzO1xuICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbWFwRnVuKHZhbHVlKSB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA8IDEpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZGVsZXRlIElETGlzdCBhbmQgYWRkXG4gICAgICAgICAgICBncm91cC5JRExpc3QgPSBbLi4ubmV3IEFycmF5KHZhbHVlLmxlbmd0aCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuXG4gICAgICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgICAgIC8vIGF3YWl0IHJlbmRlcigpO1xuICAgICAgICAgICAgYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICAvLyBhd2FpdCB0aGlzLnRvcEZvcm1SZW5kZXIoKTtcblxuICAgICAgICAgICAgLy8gZ3JvdXAgc2hvdWxkIG1vdW50ZWRcbiAgICAgICAgICAgIGNvbnN0IHsgSURSZWZNYXAsIElETGlzdCwgZm9ybU5hbWUgfSA9IGdyb3VwO1xuXG4gICAgICAgICAgICBhd2FpdCBtYXBPYmplY3RBc3luYyhJRExpc3QsIGFzeW5jIChpbmRleCwgSUQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcmVmID0gYXdhaXQgZ2V0R3JvdXBSZWYoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIFtJRF06IHtcbiAgICAgICAgICAgICAgICAgICAgcmVmOiBncm91cEZvcm1SZWYsXG4gICAgICAgICAgICAgICAgICB9ID0ge30sXG4gICAgICAgICAgICAgICAgfSA9IElEUmVmTWFwO1xuICAgICAgICAgICAgICAgIHJldHVybiBncm91cEZvcm1SZWY7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBmb3JtICcke2Zvcm1OYW1lfScgc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgZ3JvdXAuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJdGVtVmFsdWUgPSB2YWx1ZVtpbmRleF0gfHwgW107XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiBmdW4gPSAoKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgbWFwT2JqOiB7fSxcbiAgICAgICAgICAgICAgICAgIHByb3BzOiB7fSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgfSA9IG1hcHM7XG5cbiAgICAgICAgICAgICAgY29uc3QgeyBtYXBPYmogPSB7fSwgcHJvcHMgPSB7fSB9ID0gZnVuKGdyb3VwSXRlbVZhbHVlKTtcblxuICAgICAgICAgICAgICBJRFJlZk1hcFtJRF0ucHJvcHMgPSBwcm9wcztcblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyhncm91cEl0ZW1WYWx1ZSwgbWFwT2JqKTtcbiAgICAgICAgICAgIH0sIElETGlzdCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZlcmlmeSA9ICh7XG4gICAgICAgICAgZmlyc3QgPSBmYWxzZSwgLy8gdG9kb1xuICAgICAgICAgIHNjcm9sbCA9IHRydWUsIC8vIHRvZG9cbiAgICAgICAgfSA9IHt9KSA9PiAoXG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUuZ2V0KCksXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBzY2hlbWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICBydWxlcyA9IFtdLCBpc01vdW50LCB2YWx1ZSwgbGFiZWwsXG4gICAgICAgICAgICAgICAgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91bnQpIHsgcmV0dXJuIHt9OyB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUGFzcyA9IGF3YWl0IHJ1bGUuZnVuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGlmICghaXNQYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBydWxlLmVycm9yKHsgbGFiZWwsIGZpZWxkIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogZXJyb3IgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgSURSZWZNYXAgPSBbXSwgSURMaXN0LFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgSUQgb2YgSURMaXN0KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIUlEUmVmTWFwW0lEXS5yZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBncm91cCBmcm9tIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfSwgSUQ9JHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBJRFJlZk1hcFtJRF0ucmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNFcnJvcikgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgICBhc3luYyAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHJlZiwgZmllbGQgfSA9IHN1YkZvcm07XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBzdWJGcm9tIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfS5gKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IFtmaWVsZF06IHt9IH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBoYXNFcnJvcjogc3ViRm9ybUhhc0Vycm9yIH0gPSBhd2FpdCByZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3IgPSBzdWJGb3JtSGFzRXJyb3I7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IGRhdGEsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGhhc0Vycm9yLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgKVxuXG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICBjb25zdCB7IGNhdGNoUmVmID0gKCkgPT4ge30sIC4uLm90aGVycyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFdyYXBcbiAgICAgICAgICAgICAgcmVmPXsgY2F0Y2hSZWYgfVxuICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgcmVuZGVyRGlub0Zvcm06IChwcm9wcyA9IHt9KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Vmlld1xuICAgICAgICAgICAgICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgICAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiBncm91cHNBUEkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SUQ6ICgpID0+IHRoaXMuSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJRDogKElEKSA9PiB7IHRoaXMuSUQgPSBJRDsgfSxcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBzdWJGb3Jtczogc3ViRm9ybXNBUEkoeyBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgIHsgLi4ub3RoZXJzIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZvcm07XG4iXX0=