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

var _es = require("../es");

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

                  if ((0, _es.isNotExist)(group) || (0, _es.isNotExist)(group.ref)) {
                    (0, _util.isProduction)(function () {
                      if (debug) {
                        console.warn("[dino-form] group from ref not registered, field = ".concat(field, ", ID=").concat(ID));
                      }
                    });
                    return "continue";
                  }

                  var result = IDRefMap[ID].ref.getFullValues({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJXcmFwQ29tIiwicmVuZGVyRGlub0Zvcm0iLCJwcm9wcyIsImRpbm9Gb3JtIiwiQ29tcG9uZW50IiwiY3JlYXRlRm9ybSIsImZyYWdtZW50cyIsImdyb3VwcyIsInN1YkZvcm1zIiwiZ2V0R3JvdXBSZWYiLCJnZXRSZWYiLCJjcmVhdGUiLCJWaWV3IiwiYmluZFdyYXAiLCJXcmFwIiwiY29uc3RydWN0b3JQcm9wcyIsImdyb3Vwc09iaiIsImZvcm1OYW1lIiwiQ29tIiwiZmllbGQiLCJjb3VudCIsImZvcm1Qcm9wcyIsIm5lZWREcmFnIiwiY2xlYXJNb3Rpb25zIiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJyIiwidGhlbiIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImRlYnVnIiwiZnJhZ21lbnRzRmllbGQiLCJpc01vdW50IiwiZ3JvdXBGaWVsZCIsImdyb3VwTmFtZSIsInZhbHVlcyIsInJlZiIsImNvbnNvbGUiLCJ3YXJuIiwicmVzdWx0IiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJyZW5kZXIiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiZ3JvdXBGb3JtUmVmIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFVQTs7QUFHQTs7SUFFTUEsTzs7Ozs7Ozs7Ozs7OzZCQUNLO0FBQUEsVUFDYUMsY0FEYixHQUNrQyxLQUFLQyxLQUR2QyxDQUNDQyxRQURELENBQ2FGLGNBRGI7QUFFUCxhQUFPQSxjQUFjLENBQUMsS0FBS0MsS0FBTixDQUFyQjtBQUNEOzs7RUFKbUJFLGdCOztBQU90QixTQUFTQyxVQUFULEdBS1E7QUFBQSxpRkFBSixFQUFJO0FBQUEsNEJBSk5DLFNBSU07QUFBQSxNQUpOQSxTQUlNLCtCQUpNLEVBSU47QUFBQSx5QkFITkMsTUFHTTtBQUFBLE1BSE5BLE1BR00sNEJBSEcsRUFHSDtBQUFBLDJCQUZOQyxRQUVNO0FBQUEsTUFGTkEsUUFFTSw4QkFGSyxFQUVMO0FBQUEsOEJBRE5DLFdBQ007QUFBQSxNQUROQSxXQUNNLGlDQURRQyxzQkFDUjs7QUFDTixTQUFPLFNBQVNDLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCO0FBQzNCLFdBQU8sU0FBU0MsUUFBVCxHQUFrQztBQUFBOztBQUFBLFVBQWhCQyxJQUFnQix1RUFBVGQsT0FBUztBQUN2QztBQUFBO0FBQUE7QUFBQTs7QUFDRSwwQkFBWWUsZ0JBQVosRUFBOEI7QUFBQTs7QUFBQTtBQUM1QixvSEFBTUEsZ0JBQU47QUFENEIsMklBNkJmLFVBQUFDLFNBQVM7QUFBQSxt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O1xuaW1wb3J0IGNyZWF0ZURpbm9Gb3JtU3RvcmUgZnJvbSAnLi9EaW5vRm9ybVN0b3JlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUZyb21JdGVtLFxuICBjcmVhdGVEaW5vRm9ybVN1YkZvcm0sXG4gIGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwLFxuICBjcmVhdGVGcmFnbWVudHMsXG4gIGdyb3Vwc0FQSSxcbiAgc3ViRm9ybXNBUEksXG4gIGdldFJlZixcbn0gZnJvbSAnLi9EaW5vRm9ybUhlbHBlcic7XG5cbmltcG9ydCB7XG4gIHNsZWVwLCBtYXBPYmplY3QsIG1hcE9iamVjdEFzeW5jLCBpc1Byb2R1Y3Rpb24sXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBpc05vdEV4aXN0IH0gZnJvbSAnLi4vZXMnO1xuXG5jbGFzcyBXcmFwQ29tIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZGlub0Zvcm06IHsgcmVuZGVyRGlub0Zvcm0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gcmVuZGVyRGlub0Zvcm0odGhpcy5wcm9wcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9ybSh7XG4gIGZyYWdtZW50cyA9IHt9LFxuICBncm91cHMgPSB7fSxcbiAgc3ViRm9ybXMgPSB7fSxcbiAgZ2V0R3JvdXBSZWYgPSBnZXRSZWYsXG59ID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZShWaWV3KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJpbmRXcmFwKFdyYXAgPSBXcmFwQ29tKSB7XG4gICAgICByZXR1cm4gY2xhc3MgRGlub0Zvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb25zdHJ1Y3RvclByb3BzKSB7XG4gICAgICAgICAgc3VwZXIoY29uc3RydWN0b3JQcm9wcyk7XG5cbiAgICAgICAgICB0aGlzLnN0b3JlID0gY3JlYXRlRGlub0Zvcm1TdG9yZSgpO1xuICAgICAgICAgIC8vIHRoaXMuc3ViRm9ybXMgPSBjcmVhdGVEaW5vRm9ybVN1YkZvcm0oc3ViRm9ybXMsIHRoaXMudG9wRm9ybVJlbmRlcik7XG4gICAgICAgICAgdGhpcy5zdWJGb3JtcyA9IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSh7IHN1YkZvcm1zLCB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIgfSk7XG5cbiAgICAgICAgICB0aGlzLkZyb21JdGVtID0gY3JlYXRlRnJvbUl0ZW0oe1xuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmZyYWdtZW50cyA9IGNyZWF0ZUZyYWdtZW50cyh7XG4gICAgICAgICAgICBmcmFnbWVudHMsXG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuSUQgPSAwO1xuICAgICAgICAgIHRoaXMuZ3JvdXBzID0gdGhpcy5jcmVhdGVHcm91cHMoZ3JvdXBzKTtcblxuICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuICAgICAgICAgICAgSUQ6IHRoaXMuSUQsXG4gICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVHcm91cHMgPSBncm91cHNPYmogPT4gbWFwT2JqZWN0KGdyb3Vwc09iaiwgKGZvcm1OYW1lLCB7XG4gICAgICAgICAgQ29tLFxuICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgIGNvdW50LFxuICAgICAgICAgIGZvcm1Qcm9wcyA9IHt9LFxuICAgICAgICAgIG5lZWREcmFnID0gZmFsc2UsXG4gICAgICAgICAgY2xlYXJNb3Rpb25zLFxuICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIGNyZWF0ZVN0eWxlLFxuICAgICAgICB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBJRFJlZk1hcCA9IHt9O1xuICAgICAgICAgIGNvbnN0IElETGlzdCA9IFsuLi5uZXcgQXJyYXkoY291bnQpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcbiAgICAgICAgICBjb25zdCBGb3JtID0gY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAoe1xuICAgICAgICAgICAgc2V0SURSZWZNYXA6IChJRCwgdmFsdWUpID0+IHsgdGhpcy5ncm91cHNbZm9ybU5hbWVdLklEUmVmTWFwW0lEXSA9IHZhbHVlOyB9LFxuICAgICAgICAgICAgdG9wRm9ybVJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgIGZvcm1Qcm9wcyxcbiAgICAgICAgICAgIGZvcm1OYW1lLFxuICAgICAgICAgICAgbmVlZERyYWcsXG4gICAgICAgICAgICBJRFJlZk1hcCxcbiAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgIEZvcm0sXG4gICAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgICBwcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgW2Zvcm1OYW1lXTogZ3JvdXAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdG9wRm9ybVJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcigpLnRoZW4ocik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHt9LCByKTtcbiAgICAgICAgfSlcblxuICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaSA9ICgpID0+ICh7XG4gICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG5cbiAgICAgICAgICBzZXRGaWVsZHNWYWx1ZTogdGhpcy5zZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgICBzZXRGdWxsVmFsdWVzOiB0aGlzLnNldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgc2V0RmllbGRzRXJyb3I6IHRoaXMuc2V0RmllbGRzRXJyb3IsXG5cbiAgICAgICAgICBnZXRGdWxsVmFsdWVzOiB0aGlzLmdldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgZ2V0RmllbGRzVmFsdWU6IHRoaXMuZ2V0RmllbGRzVmFsdWUsXG5cbiAgICAgICAgICB2ZXJpZnk6IHRoaXMudmVyaWZ5LFxuICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgIGRpbm9Gb3JtUmVmOiB0aGlzLFxuICAgICAgICB9KVxuXG4gICAgICAgIHNldEZpZWxkc0Vycm9yID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIGVycm9yXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgZXJyb3IgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGaWVsZHNWYWx1ZSA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBuZXdWYWx1ZV0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMudG9wRm9ybVJlbmRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0RmllbGRzVmFsdWUgPSAoLi4uZmllbGRzKSA9PiBmaWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtZSA9IHRoaXMuc3RvcmUuZ2V0KGZpZWxkKSB8fCB7fTtcbiAgICAgICAgICByZXR1cm4gc2NoZW1lLnZhbHVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIGdldEZ1bGxWYWx1ZXMgPSAoeyBvbmx5R2V0TW91bnQgPSB0cnVlLCBkZWJ1ZyA9IGZhbHNlIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgIHNjaGVtZSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IGlzTW91bnQsIHZhbHVlIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgIHJldHVybiBvbmx5R2V0TW91bnRcbiAgICAgICAgICAgICAgICA/IGlzTW91bnQgPyB7IFtmaWVsZF06IHZhbHVlIH0gOiB7fVxuICAgICAgICAgICAgICAgIDogeyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLFxuICAgICAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gSURSZWZNYXBbSURdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzTm90RXhpc3QoZ3JvdXApIHx8IGlzTm90RXhpc3QoZ3JvdXAucmVmKSkge1xuICAgICAgICAgICAgICAgICAgaXNQcm9kdWN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBncm91cCBmcm9tIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfSwgSUQ9JHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSURSZWZNYXBbSURdLnJlZi5nZXRGdWxsVmFsdWVzKHsgb25seUdldE1vdW50IH0pO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgaXNQcm9kdWN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIHN1YkZvcm0gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9YCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHt9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHJlZi5nZXRGdWxsVmFsdWVzKHsgb25seUdldE1vdW50IH0pLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RnVsbFZhbHVlcyA9IGFzeW5jICh2YWx1ZXMgPSB7fSwgbWFwcyA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmluZEdyb3VwcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICApLmZpbmQoZ3JvdXAgPT4gZ3JvdXAuZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IGZpbmRTdWJGb3JtcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICkuZmluZChzdWJGb3JtID0+IHN1YkZvcm0uZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKHIgPT4gdGhpcy5zZXRTdGF0ZSh7fSwgcikpO1xuXG4gICAgICAgICAgYXdhaXQgbWFwT2JqZWN0KHZhbHVlcywgYXN5bmMgKGZpZWxkLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaW5kR3JvdXBzKGZpZWxkKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm0gPSBmaW5kU3ViRm9ybXMoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoc3ViRm9ybSkge1xuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IHN1YkZvcm1NYXBPYmogfSA9IG1hcHM7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBmaWVsZCBpcyAnJHtmaWVsZH0nIHN1YkZvcm0gc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgc3ViRm9ybS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyh2YWx1ZSwgc3ViRm9ybU1hcE9iaik7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFncm91cCkgeyAvLyBmcmFnbWVudFxuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IG1hcEZ1biA9IF8gPT4gXyB9ID0gbWFwcztcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG1hcEZ1bih2YWx1ZSkgfSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBJRExpc3QgYW5kIGFkZFxuICAgICAgICAgICAgZ3JvdXAuSURMaXN0ID0gWy4uLm5ldyBBcnJheSh2YWx1ZS5sZW5ndGgpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcblxuICAgICAgICAgICAgLy8gcmVuZGVyXG4gICAgICAgICAgICAvLyBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIGF3YWl0IHJlbmRlcigpO1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG5cbiAgICAgICAgICAgIC8vIGdyb3VwIHNob3VsZCBtb3VudGVkXG4gICAgICAgICAgICBjb25zdCB7IElEUmVmTWFwLCBJRExpc3QsIGZvcm1OYW1lIH0gPSBncm91cDtcblxuICAgICAgICAgICAgYXdhaXQgbWFwT2JqZWN0QXN5bmMoSURMaXN0LCBhc3luYyAoaW5kZXgsIElEKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlZiA9IGF3YWl0IGdldEdyb3VwUmVmKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICBbSURdOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogZ3JvdXBGb3JtUmVmLFxuICAgICAgICAgICAgICAgICAgfSA9IHt9LFxuICAgICAgICAgICAgICAgIH0gPSBJRFJlZk1hcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXBGb3JtUmVmO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZm9ybSAnJHtmb3JtTmFtZX0nIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIGdyb3VwLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbVZhbHVlID0gdmFsdWVbaW5kZXhdIHx8IFtdO1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogZnVuID0gKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG1hcE9iajoge30sXG4gICAgICAgICAgICAgICAgICBwcm9wczoge30sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIH0gPSBtYXBzO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHsgbWFwT2JqID0ge30sIHByb3BzID0ge30gfSA9IGZ1bihncm91cEl0ZW1WYWx1ZSk7XG5cbiAgICAgICAgICAgICAgSURSZWZNYXBbSURdLnByb3BzID0gcHJvcHM7XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXMoZ3JvdXBJdGVtVmFsdWUsIG1hcE9iaik7XG4gICAgICAgICAgICB9LCBJRExpc3QpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFJRFJlZk1hcFtJRF0ucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZ3JvdXAgZnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0sIElEPSR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gc3ViRnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0uYCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB7fSB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19