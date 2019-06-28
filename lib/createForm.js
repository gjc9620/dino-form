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
                onlyGetMount = _ref8$onlyGetMount === void 0 ? true : _ref8$onlyGetMount,
                _ref8$debug = _ref8.debug,
                debug = _ref8$debug === void 0 ? false : _ref8$debug;

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
                var _loop = function _loop() {
                  var ID = _step.value;
                  var group = IDRefMap[ID];

                  if ((0, _util.isNotExist)(group) || (0, _util.isNotExist)(group.ref)) {
                    (0, _util.isProduction)(function () {
                      if (debug) {
                        console.warn("[dino-form] group from ref not registered, field = ".concat(field, ", ID=").concat(ID));
                      }
                    });
                    return "continue";
                  }

                  var result = group.ref.getFullValues({
                    onlyGetMount: onlyGetMount
                  });
                  values.push(result);
                };

                for (var _iterator = (0, _getIterator2.default)(IDList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var _ret = _loop();

                  if (_ret === "continue") continue;
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
                (0, _util.isProduction)(function () {
                  if (debug) {
                    console.warn("[dino-form] subForm ref not registered, field = ".concat(field));
                  }
                });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJXcmFwQ29tIiwicmVuZGVyRGlub0Zvcm0iLCJwcm9wcyIsImRpbm9Gb3JtIiwiQ29tcG9uZW50IiwiY3JlYXRlRm9ybSIsImZyYWdtZW50cyIsImdyb3VwcyIsInN1YkZvcm1zIiwiZ2V0R3JvdXBSZWYiLCJnZXRSZWYiLCJjcmVhdGUiLCJWaWV3IiwiYmluZFdyYXAiLCJXcmFwIiwiY29uc3RydWN0b3JQcm9wcyIsImdyb3Vwc09iaiIsImZvcm1OYW1lIiwiQ29tIiwiZmllbGQiLCJjb3VudCIsImZvcm1Qcm9wcyIsIm5lZWREcmFnIiwiY2xlYXJNb3Rpb25zIiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJyIiwidGhlbiIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImRlYnVnIiwiZnJhZ21lbnRzRmllbGQiLCJpc01vdW50IiwiZ3JvdXBGaWVsZCIsImdyb3VwTmFtZSIsInZhbHVlcyIsInJlZiIsImNvbnNvbGUiLCJ3YXJuIiwicmVzdWx0IiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJyZW5kZXIiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiZ3JvdXBGb3JtUmVmIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFVQTs7SUFJTUEsTzs7Ozs7Ozs7Ozs7OzZCQUNLO0FBQUEsVUFDYUMsY0FEYixHQUNrQyxLQUFLQyxLQUR2QyxDQUNDQyxRQURELENBQ2FGLGNBRGI7QUFFUCxhQUFPQSxjQUFjLENBQUMsS0FBS0MsS0FBTixDQUFyQjtBQUNEOzs7RUFKbUJFLGdCOztBQU90QixTQUFTQyxVQUFULEdBS1E7QUFBQSxpRkFBSixFQUFJO0FBQUEsNEJBSk5DLFNBSU07QUFBQSxNQUpOQSxTQUlNLCtCQUpNLEVBSU47QUFBQSx5QkFITkMsTUFHTTtBQUFBLE1BSE5BLE1BR00sNEJBSEcsRUFHSDtBQUFBLDJCQUZOQyxRQUVNO0FBQUEsTUFGTkEsUUFFTSw4QkFGSyxFQUVMO0FBQUEsOEJBRE5DLFdBQ007QUFBQSxNQUROQSxXQUNNLGlDQURRQyxzQkFDUjs7QUFDTixTQUFPLFNBQVNDLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCO0FBQzNCLFdBQU8sU0FBU0MsUUFBVCxHQUFrQztBQUFBOztBQUFBLFVBQWhCQyxJQUFnQix1RUFBVGQsT0FBUztBQUN2QztBQUFBO0FBQUE7QUFBQTs7QUFDRSwwQkFBWWUsZ0JBQVosRUFBOEI7QUFBQTs7QUFBQTtBQUM1QixvSEFBTUEsZ0JBQU47QUFENEIsMklBNkJmLFVBQUFDLFNBQVM7QUFBQSxtQkFBSSxx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RHpDO0FBQUEsbURBQ0NnRyxRQUREO0FBQUEsZ0JBQ0NBLFFBREQscUNBQ1ksWUFBTSxDQUFFLENBRHBCO0FBQUEsZ0JBQ3lCQyxNQUR6QjtBQUVQLG1CQUNFLDZCQUFDLElBQUQ7QUFDRSxjQUFBLEdBQUcsRUFBR0QsUUFEUjtBQUVFLGNBQUEsUUFBUSxrQ0FDSCxLQUFLSCxpQkFBTCxFQURHO0FBRU45RixnQkFBQUEsY0FBYyxFQUFFO0FBQUEsc0JBQUNDLEtBQUQsdUVBQVMsRUFBVDtBQUFBLHlCQUNkLDZCQUFDLElBQUQsNkJBQ09BLEtBRFA7QUFFRSxvQkFBQSxRQUFRLGtDQUNILE1BQUksQ0FBQzZGLGlCQUFMLEVBREc7QUFFTnpGLHNCQUFBQSxTQUFTLEVBQUUsTUFBSSxDQUFDQSxTQUZWO0FBR05DLHNCQUFBQSxNQUFNLEVBQUUsK0JBQVU7QUFDaEJBLHdCQUFBQSxNQUFNLEVBQUUsTUFBSSxDQUFDQSxNQURHO0FBRWhCb0Usd0JBQUFBLE1BQU0sRUFBRSxNQUFJLENBQUN4QyxhQUZHO0FBR2hCaUUsd0JBQUFBLEtBQUssRUFBRTtBQUFBLGlDQUFNLE1BQUksQ0FBQ3JFLEVBQVg7QUFBQSx5QkFIUztBQUloQnNFLHdCQUFBQSxLQUFLLEVBQUUsZUFBQ3RFLEVBQUQsRUFBUTtBQUFFLDBCQUFBLE1BQUksQ0FBQ0EsRUFBTCxHQUFVQSxFQUFWO0FBQWU7QUFKaEIsdUJBQVYsQ0FIRjtBQVNOdkIsc0JBQUFBLFFBQVEsRUFBRSxpQ0FBWTtBQUFFQSx3QkFBQUEsUUFBUSxFQUFFLE1BQUksQ0FBQ0E7QUFBakIsdUJBQVo7QUFUSjtBQUZWLHFCQURjO0FBQUE7QUFGVjtBQUZWLGVBcUJPMkYsTUFyQlAsRUFERjtBQXlCRDtBQTdYSDtBQUFBO0FBQUEsUUFBOEIvRixnQkFBOUI7QUErWEQsS0FoWUQ7QUFpWUQsR0FsWUQ7QUFtWUQ7O2VBRWNDLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZURpbm9Gb3JtU3RvcmUgZnJvbSAnLi9EaW5vRm9ybVN0b3JlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUZyb21JdGVtLFxuICBjcmVhdGVEaW5vRm9ybVN1YkZvcm0sXG4gIGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwLFxuICBjcmVhdGVGcmFnbWVudHMsXG4gIGdyb3Vwc0FQSSxcbiAgc3ViRm9ybXNBUEksXG4gIGdldFJlZixcbn0gZnJvbSAnLi9EaW5vRm9ybUhlbHBlcic7XG5cbmltcG9ydCB7XG4gIHNsZWVwLCBtYXBPYmplY3QsIG1hcE9iamVjdEFzeW5jLCBpc1Byb2R1Y3Rpb24sIGlzTm90RXhpc3QsXG59IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIFdyYXBDb20gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaW5vRm9ybTogeyByZW5kZXJEaW5vRm9ybSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybSh0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKHtcbiAgZnJhZ21lbnRzID0ge30sXG4gIGdyb3VwcyA9IHt9LFxuICBzdWJGb3JtcyA9IHt9LFxuICBnZXRHcm91cFJlZiA9IGdldFJlZixcbn0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlKFZpZXcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYmluZFdyYXAoV3JhcCA9IFdyYXBDb20pIHtcbiAgICAgIHJldHVybiBjbGFzcyBEaW5vRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yUHJvcHMpIHtcbiAgICAgICAgICBzdXBlcihjb25zdHJ1Y3RvclByb3BzKTtcblxuICAgICAgICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVEaW5vRm9ybVN0b3JlKCk7XG4gICAgICAgICAgLy8gdGhpcy5zdWJGb3JtcyA9IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybShzdWJGb3JtcywgdGhpcy50b3BGb3JtUmVuZGVyKTtcbiAgICAgICAgICB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHsgc3ViRm9ybXMsIHRvcEZvcm1SZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlciB9KTtcblxuICAgICAgICAgIHRoaXMuRnJvbUl0ZW0gPSBjcmVhdGVGcm9tSXRlbSh7XG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gY3JlYXRlRnJhZ21lbnRzKHtcbiAgICAgICAgICAgIGZyYWdtZW50cyxcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5JRCA9IDA7XG4gICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmNyZWF0ZUdyb3Vwcyhncm91cHMpO1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG4gICAgICAgICAgICBJRDogdGhpcy5JRCxcbiAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUdyb3VwcyA9IGdyb3Vwc09iaiA9PiBtYXBPYmplY3QoZ3JvdXBzT2JqLCAoZm9ybU5hbWUsIHtcbiAgICAgICAgICBDb20sXG4gICAgICAgICAgZmllbGQsXG4gICAgICAgICAgY291bnQsXG4gICAgICAgICAgZm9ybVByb3BzID0ge30sXG4gICAgICAgICAgbmVlZERyYWcgPSBmYWxzZSxcbiAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgcHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IElEUmVmTWFwID0ge307XG4gICAgICAgICAgY29uc3QgSURMaXN0ID0gWy4uLm5ldyBBcnJheShjb3VudCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuICAgICAgICAgIGNvbnN0IEZvcm0gPSBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCh7XG4gICAgICAgICAgICBzZXRJRFJlZk1hcDogKElELCB2YWx1ZSkgPT4geyB0aGlzLmdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdID0gdmFsdWU7IH0sXG4gICAgICAgICAgICB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBncm91cCA9IHtcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgICAgZm9ybU5hbWUsXG4gICAgICAgICAgICBuZWVkRHJhZyxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICAgIGNsZWFyTW90aW9ucyxcbiAgICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgICBjcmVhdGVTdHlsZSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBbZm9ybU5hbWVdOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0b3BGb3JtUmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKCkudGhlbihyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpID0gKCkgPT4gKHtcbiAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcblxuICAgICAgICAgIHNldEZpZWxkc1ZhbHVlOiB0aGlzLnNldEZpZWxkc1ZhbHVlLFxuICAgICAgICAgIHNldEZ1bGxWYWx1ZXM6IHRoaXMuc2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcjogdGhpcy5zZXRGaWVsZHNFcnJvcixcblxuICAgICAgICAgIGdldEZ1bGxWYWx1ZXM6IHRoaXMuZ2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBnZXRGaWVsZHNWYWx1ZTogdGhpcy5nZXRGaWVsZHNWYWx1ZSxcblxuICAgICAgICAgIHZlcmlmeTogdGhpcy52ZXJpZnksXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgZGlub0Zvcm1SZWY6IHRoaXMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzRXJyb3IgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyBlcnJvciB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIG5ld1ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSA9ICguLi5maWVsZHMpID0+IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gdGhpcy5zdG9yZS5nZXQoZmllbGQpIHx8IHt9O1xuICAgICAgICAgIHJldHVybiBzY2hlbWUudmFsdWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgZ2V0RnVsbFZhbHVlcyA9ICh7IG9ubHlHZXRNb3VudCA9IHRydWUsIGRlYnVnID0gZmFsc2UgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgc2NoZW1lLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaXNNb3VudCwgdmFsdWUgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ubHlHZXRNb3VudFxuICAgICAgICAgICAgICAgID8gaXNNb3VudCA/IHsgW2ZpZWxkXTogdmFsdWUgfSA6IHt9XG4gICAgICAgICAgICAgICAgOiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sXG4gICAgICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgIGZvciAoY29uc3QgSUQgb2YgSURMaXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBJRFJlZk1hcFtJRF07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNOb3RFeGlzdChncm91cCkgfHwgaXNOb3RFeGlzdChncm91cC5yZWYpKSB7XG4gICAgICAgICAgICAgICAgICBpc1Byb2R1Y3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGdyb3VwIGZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LCBJRD0ke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBncm91cC5yZWYuZ2V0RnVsbFZhbHVlcyh7IG9ubHlHZXRNb3VudCB9KTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGlzUHJvZHVjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBzdWJGb3JtIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfWApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiB7fSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiByZWYuZ2V0RnVsbFZhbHVlcyh7IG9ubHlHZXRNb3VudCB9KSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZ1bGxWYWx1ZXMgPSBhc3luYyAodmFsdWVzID0ge30sIG1hcHMgPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbmRHcm91cHMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgKS5maW5kKGdyb3VwID0+IGdyb3VwLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCBmaW5kU3ViRm9ybXMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICApLmZpbmQoc3ViRm9ybSA9PiBzdWJGb3JtLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZShyID0+IHRoaXMuc2V0U3RhdGUoe30sIHIpKTtcblxuICAgICAgICAgIGF3YWl0IG1hcE9iamVjdCh2YWx1ZXMsIGFzeW5jIChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmluZEdyb3VwcyhmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtID0gZmluZFN1YkZvcm1zKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHN1YkZvcm0pIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBzdWJGb3JtTWFwT2JqIH0gPSBtYXBzO1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZmllbGQgaXMgJyR7ZmllbGR9JyBzdWJGb3JtIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIHN1YkZvcm0uYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXModmFsdWUsIHN1YkZvcm1NYXBPYmopO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ3JvdXApIHsgLy8gZnJhZ21lbnRcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBtYXBGdW4gPSBfID0+IF8gfSA9IG1hcHM7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBtYXBGdW4odmFsdWUpIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBkZWxldGUgSURMaXN0IGFuZCBhZGRcbiAgICAgICAgICAgIGdyb3VwLklETGlzdCA9IFsuLi5uZXcgQXJyYXkodmFsdWUubGVuZ3RoKV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG5cbiAgICAgICAgICAgIC8vIHJlbmRlclxuICAgICAgICAgICAgLy8gYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMudG9wRm9ybVJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIGF3YWl0IG1hcE9iamVjdEFzeW5jKElETGlzdCwgYXN5bmMgKGluZGV4LCBJRCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZWYgPSBhd2FpdCBnZXRHcm91cFJlZigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgW0lEXToge1xuICAgICAgICAgICAgICAgICAgICByZWY6IGdyb3VwRm9ybVJlZixcbiAgICAgICAgICAgICAgICAgIH0gPSB7fSxcbiAgICAgICAgICAgICAgICB9ID0gSURSZWZNYXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwRm9ybVJlZjtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGZvcm0gJyR7Zm9ybU5hbWV9JyBzaG91bGQgYmUgbW91bnRlZCBidXQgdGhlIFJlZiBpcyBub3QgcmVnaXN0ZXJlZCwgbWF5YmUgeW91IG5vdCByZW5kZXIgdGhpcyBncm91cC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1WYWx1ZSA9IHZhbHVlW2luZGV4XSB8fCBbXTtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IGZ1biA9ICgpID0+ICh7XG4gICAgICAgICAgICAgICAgICBtYXBPYmo6IHt9LFxuICAgICAgICAgICAgICAgICAgcHJvcHM6IHt9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB9ID0gbWFwcztcblxuICAgICAgICAgICAgICBjb25zdCB7IG1hcE9iaiA9IHt9LCBwcm9wcyA9IHt9IH0gPSBmdW4oZ3JvdXBJdGVtVmFsdWUpO1xuXG4gICAgICAgICAgICAgIElEUmVmTWFwW0lEXS5wcm9wcyA9IHByb3BzO1xuXG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKGdyb3VwSXRlbVZhbHVlLCBtYXBPYmopO1xuICAgICAgICAgICAgfSwgSURMaXN0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmVyaWZ5ID0gKHtcbiAgICAgICAgICBmaXJzdCA9IGZhbHNlLCAvLyB0b2RvXG4gICAgICAgICAgc2Nyb2xsID0gdHJ1ZSwgLy8gdG9kb1xuICAgICAgICB9ID0ge30pID0+IChcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIHNjaGVtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIHJ1bGVzID0gW10sIGlzTW91bnQsIHZhbHVlLCBsYWJlbCxcbiAgICAgICAgICAgICAgICB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICAgIGlmICghaXNNb3VudCkgeyByZXR1cm4ge307IH1cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNQYXNzID0gYXdhaXQgcnVsZS5mdW4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgaWYgKCFpc1Bhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHJ1bGUuZXJyb3IoeyBsYWJlbCwgZmllbGQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghSURSZWZNYXBbSURdLnJlZikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGdyb3VwIGZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LCBJRD0ke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IElEUmVmTWFwW0lEXS5yZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmhhc0Vycm9yKSBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAgIGFzeW5jIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIHN1YkZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LmApO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXToge30gfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGhhc0Vycm9yOiBzdWJGb3JtSGFzRXJyb3IgfSA9IGF3YWl0IHJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHN1YkZvcm1IYXNFcnJvcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogZGF0YSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaGFzRXJyb3IsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcblxuICAgICAgICApXG5cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIGNvbnN0IHsgY2F0Y2hSZWYgPSAoKSA9PiB7fSwgLi4ub3RoZXJzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8V3JhcFxuICAgICAgICAgICAgICByZWY9eyBjYXRjaFJlZiB9XG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICByZW5kZXJEaW5vRm9ybTogKHByb3BzID0ge30pID0+IChcbiAgICAgICAgICAgICAgICAgIDxWaWV3XG4gICAgICAgICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IGdyb3Vwc0FQSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJRDogKCkgPT4gdGhpcy5JRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldElEOiAoSUQpID0+IHsgdGhpcy5JRCA9IElEOyB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIHN1YkZvcm1zOiBzdWJGb3Jtc0FQSSh7IHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zIH0pLFxuICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgeyAuLi5vdGhlcnMgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRm9ybTtcbiJdfQ==