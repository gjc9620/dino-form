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
                  var result = IDRefMap[ID].ref.getFullValues();
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
              return (0, _defineProperty2.default)({}, field, ref.getFullValues());
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
                      var _ref15 = (0, _asyncToGenerator2.default)(
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
                                  var _ref16 = (0, _asyncToGenerator2.default)(
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
                                    return _ref16.apply(this, arguments);
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
                        return _ref15.apply(this, arguments);
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
            var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref17$first = _ref17.first,
                first = _ref17$first === void 0 ? false : _ref17$first,
                _ref17$scroll = _ref17.scroll,
                scroll = _ref17$scroll === void 0 ? true : _ref17$scroll;

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
                        var _ref19 = (0, _asyncToGenerator2.default)(
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
                          return _ref19.apply(this, arguments);
                        };
                      }());

                    case 3:
                      fragmentsField = _context7.sent;
                      _context7.next = 6;
                      return (0, _util.mapObjectAsync)(_this.groups,
                      /*#__PURE__*/
                      function () {
                        var _ref22 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee5(groupName, _ref21) {
                          var field, _ref21$IDRefMap, IDRefMap, IDList, values, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, ID, result;

                          return _regenerator.default.wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  field = _ref21.field, _ref21$IDRefMap = _ref21.IDRefMap, IDRefMap = _ref21$IDRefMap === void 0 ? [] : _ref21$IDRefMap, IDList = _ref21.IDList;
                                  values = [];
                                  _iteratorNormalCompletion3 = true;
                                  _didIteratorError3 = false;
                                  _iteratorError3 = undefined;
                                  _context5.prev = 5;
                                  _iterator3 = (0, _getIterator2.default)(IDList);

                                case 7:
                                  if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                    _context5.next = 17;
                                    break;
                                  }

                                  ID = _step3.value;
                                  _context5.next = 11;
                                  return IDRefMap[ID].ref.verify();

                                case 11:
                                  result = _context5.sent;
                                  if (result.hasError) hasError = true;
                                  values.push(result.data);

                                case 14:
                                  _iteratorNormalCompletion3 = true;
                                  _context5.next = 7;
                                  break;

                                case 17:
                                  _context5.next = 23;
                                  break;

                                case 19:
                                  _context5.prev = 19;
                                  _context5.t0 = _context5["catch"](5);
                                  _didIteratorError3 = true;
                                  _iteratorError3 = _context5.t0;

                                case 23:
                                  _context5.prev = 23;
                                  _context5.prev = 24;

                                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                    _iterator3.return();
                                  }

                                case 26:
                                  _context5.prev = 26;

                                  if (!_didIteratorError3) {
                                    _context5.next = 29;
                                    break;
                                  }

                                  throw _iteratorError3;

                                case 29:
                                  return _context5.finish(26);

                                case 30:
                                  return _context5.finish(23);

                                case 31:
                                  return _context5.abrupt("return", (0, _defineProperty2.default)({}, field, values));

                                case 32:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5, this, [[5, 19, 23, 31], [24,, 26, 30]]);
                        }));

                        return function (_x7, _x8) {
                          return _ref22.apply(this, arguments);
                        };
                      }());

                    case 6:
                      groupField = _context7.sent;
                      _context7.next = 9;
                      return (0, _util.mapObjectAsync)(_this.subForms,
                      /*#__PURE__*/
                      function () {
                        var _ref24 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee6(formName, subForm) {
                          var ref, field, _ref25, data, subFormHasError;

                          return _regenerator.default.wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  ref = subForm.ref, field = subForm.field;
                                  _context6.next = 3;
                                  return ref.verify();

                                case 3:
                                  _ref25 = _context6.sent;
                                  data = _ref25.data;
                                  subFormHasError = _ref25.hasError;
                                  hasError = subFormHasError;
                                  return _context6.abrupt("return", (0, _defineProperty2.default)({}, field, data));

                                case 8:
                                case "end":
                                  return _context6.stop();
                              }
                            }
                          }, _callee6, this);
                        }));

                        return function (_x9, _x10) {
                          return _ref24.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJXcmFwQ29tIiwicmVuZGVyRGlub0Zvcm0iLCJwcm9wcyIsImRpbm9Gb3JtIiwiQ29tcG9uZW50IiwiY3JlYXRlRm9ybSIsImZyYWdtZW50cyIsImdyb3VwcyIsInN1YkZvcm1zIiwiZ2V0R3JvdXBSZWYiLCJnZXRSZWYiLCJjcmVhdGUiLCJWaWV3IiwiYmluZFdyYXAiLCJXcmFwIiwiY29uc3RydWN0b3JQcm9wcyIsImdyb3Vwc09iaiIsImZvcm1OYW1lIiwiQ29tIiwiZmllbGQiLCJjb3VudCIsImZvcm1Qcm9wcyIsIm5lZWREcmFnIiwiY2xlYXJNb3Rpb25zIiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJyIiwidGhlbiIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImZyYWdtZW50c0ZpZWxkIiwiaXNNb3VudCIsImdyb3VwRmllbGQiLCJncm91cE5hbWUiLCJ2YWx1ZXMiLCJyZXN1bHQiLCJyZWYiLCJwdXNoIiwic3ViRm9ybUZpZWxkIiwic3ViRm9ybSIsIm1hcHMiLCJmaW5kR3JvdXBzIiwiZmluZCIsImZpbmRTdWJGb3JtcyIsInJlbmRlciIsInN1YkZvcm1NYXBPYmoiLCJjb25zb2xlIiwid2FybiIsIm1hcEZ1biIsIl8iLCJsZW5ndGgiLCJpbmRleCIsImdyb3VwRm9ybVJlZiIsImdyb3VwSXRlbVZhbHVlIiwiZnVuIiwibWFwT2JqIiwiZmlyc3QiLCJzY3JvbGwiLCJyZXNvbHZlIiwiaGFzRXJyb3IiLCJydWxlcyIsImxhYmVsIiwicnVsZSIsImlzUGFzcyIsImRhdGEiLCJzdWJGb3JtSGFzRXJyb3IiLCJjcmVhdGVEaW5vRm9ybUFwaSIsImNyZWF0ZUdyb3VwcyIsInN0YXRlIiwiY2F0Y2hSZWYiLCJvdGhlcnMiLCJnZXRJRCIsInNldElEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBVUE7O0lBR01BLE87Ozs7Ozs7Ozs7Ozs2QkFDSztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsYUFBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7O0VBSm1CRSxnQjs7QUFPdEIsU0FBU0MsVUFBVCxHQUtRO0FBQUEsaUZBQUosRUFBSTtBQUFBLDRCQUpOQyxTQUlNO0FBQUEsTUFKTkEsU0FJTSwrQkFKTSxFQUlOO0FBQUEseUJBSE5DLE1BR007QUFBQSxNQUhOQSxNQUdNLDRCQUhHLEVBR0g7QUFBQSwyQkFGTkMsUUFFTTtBQUFBLE1BRk5BLFFBRU0sOEJBRkssRUFFTDtBQUFBLDhCQUROQyxXQUNNO0FBQUEsTUFETkEsV0FDTSxpQ0FEUUMsc0JBQ1I7O0FBQ04sU0FBTyxTQUFTQyxNQUFULENBQWdCQyxJQUFoQixFQUFzQjtBQUMzQixXQUFPLFNBQVNDLFFBQVQsR0FBa0M7QUFBQTs7QUFBQSxVQUFoQkMsSUFBZ0IsdUVBQVRkLE9BQVM7QUFDdkM7QUFBQTtBQUFBO0FBQUE7O0FBQ0UsMEJBQVllLGdCQUFaLEVBQThCO0FBQUE7O0FBQUE7QUFDNUIsb0hBQU1BLGdCQUFOO0FBRDRCLDJJQTRCZixVQUFBQyxTQUFTO0FBQUEsbUJBQUkscUJBQVVBLFNB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XG5pbXBvcnQgY3JlYXRlRGlub0Zvcm1TdG9yZSBmcm9tICcuL0Rpbm9Gb3JtU3RvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRnJvbUl0ZW0sXG4gIGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSxcbiAgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAsXG4gIGNyZWF0ZUZyYWdtZW50cyxcbiAgZ3JvdXBzQVBJLFxuICBzdWJGb3Jtc0FQSSxcbiAgZ2V0UmVmLFxufSBmcm9tICcuL0Rpbm9Gb3JtSGVscGVyJztcblxuaW1wb3J0IHsgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYyB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIFdyYXBDb20gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaW5vRm9ybTogeyByZW5kZXJEaW5vRm9ybSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybSh0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKHtcbiAgZnJhZ21lbnRzID0ge30sXG4gIGdyb3VwcyA9IHt9LFxuICBzdWJGb3JtcyA9IHt9LFxuICBnZXRHcm91cFJlZiA9IGdldFJlZixcbn0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlKFZpZXcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYmluZFdyYXAoV3JhcCA9IFdyYXBDb20pIHtcbiAgICAgIHJldHVybiBjbGFzcyBEaW5vRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yUHJvcHMpIHtcbiAgICAgICAgICBzdXBlcihjb25zdHJ1Y3RvclByb3BzKTtcblxuICAgICAgICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVEaW5vRm9ybVN0b3JlKCk7XG4gICAgICAgICAgdGhpcy5zdWJGb3JtcyA9IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybShzdWJGb3Jtcyk7XG5cbiAgICAgICAgICB0aGlzLkZyb21JdGVtID0gY3JlYXRlRnJvbUl0ZW0oe1xuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmZyYWdtZW50cyA9IGNyZWF0ZUZyYWdtZW50cyh7XG4gICAgICAgICAgICBmcmFnbWVudHMsXG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuSUQgPSAwO1xuICAgICAgICAgIHRoaXMuZ3JvdXBzID0gdGhpcy5jcmVhdGVHcm91cHMoZ3JvdXBzKTtcblxuICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuICAgICAgICAgICAgSUQ6IHRoaXMuSUQsXG4gICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVHcm91cHMgPSBncm91cHNPYmogPT4gbWFwT2JqZWN0KGdyb3Vwc09iaiwgKGZvcm1OYW1lLCB7XG4gICAgICAgICAgQ29tLFxuICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgIGNvdW50LFxuICAgICAgICAgIGZvcm1Qcm9wcyA9IHt9LFxuICAgICAgICAgIG5lZWREcmFnID0gZmFsc2UsXG4gICAgICAgICAgY2xlYXJNb3Rpb25zLFxuICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIGNyZWF0ZVN0eWxlLFxuICAgICAgICB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBJRFJlZk1hcCA9IHt9O1xuICAgICAgICAgIGNvbnN0IElETGlzdCA9IFsuLi5uZXcgQXJyYXkoY291bnQpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcbiAgICAgICAgICBjb25zdCBGb3JtID0gY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAoe1xuICAgICAgICAgICAgc2V0SURSZWZNYXA6IChJRCwgdmFsdWUpID0+IHsgdGhpcy5ncm91cHNbZm9ybU5hbWVdLklEUmVmTWFwW0lEXSA9IHZhbHVlOyB9LFxuICAgICAgICAgICAgdG9wRm9ybVJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgIGZvcm1Qcm9wcyxcbiAgICAgICAgICAgIGZvcm1OYW1lLFxuICAgICAgICAgICAgbmVlZERyYWcsXG4gICAgICAgICAgICBJRFJlZk1hcCxcbiAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgIEZvcm0sXG4gICAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgICBwcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgW2Zvcm1OYW1lXTogZ3JvdXAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdG9wRm9ybVJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcigpLnRoZW4ocik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHt9LCByKTtcbiAgICAgICAgfSlcblxuICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaSA9ICgpID0+ICh7XG4gICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG5cbiAgICAgICAgICBzZXRGaWVsZHNWYWx1ZTogdGhpcy5zZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgICBzZXRGdWxsVmFsdWVzOiB0aGlzLnNldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgc2V0RmllbGRzRXJyb3I6IHRoaXMuc2V0RmllbGRzRXJyb3IsXG5cbiAgICAgICAgICBnZXRGdWxsVmFsdWVzOiB0aGlzLmdldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgZ2V0RmllbGRzVmFsdWU6IHRoaXMuZ2V0RmllbGRzVmFsdWUsXG5cbiAgICAgICAgICB2ZXJpZnk6IHRoaXMudmVyaWZ5LFxuICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgIGRpbm9Gb3JtUmVmOiB0aGlzLFxuICAgICAgICB9KVxuXG4gICAgICAgIHNldEZpZWxkc0Vycm9yID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIGVycm9yXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgZXJyb3IgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGaWVsZHNWYWx1ZSA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBuZXdWYWx1ZV0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMudG9wRm9ybVJlbmRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0RmllbGRzVmFsdWUgPSAoLi4uZmllbGRzKSA9PiBmaWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtZSA9IHRoaXMuc3RvcmUuZ2V0KGZpZWxkKSB8fCB7fTtcbiAgICAgICAgICByZXR1cm4gc2NoZW1lLnZhbHVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIGdldEZ1bGxWYWx1ZXMgPSAoeyBvbmx5R2V0TW91bnQgPSB0cnVlIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgIHNjaGVtZSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IGlzTW91bnQsIHZhbHVlIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgIHJldHVybiBvbmx5R2V0TW91bnRcbiAgICAgICAgICAgICAgICA/IGlzTW91bnQgPyB7IFtmaWVsZF06IHZhbHVlIH0gOiB7fVxuICAgICAgICAgICAgICAgIDogeyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBJRFJlZk1hcFtJRF0ucmVmLmdldEZ1bGxWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiByZWYuZ2V0RnVsbFZhbHVlcygpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RnVsbFZhbHVlcyA9IGFzeW5jICh2YWx1ZXMgPSB7fSwgbWFwcyA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmluZEdyb3VwcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICApLmZpbmQoZ3JvdXAgPT4gZ3JvdXAuZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IGZpbmRTdWJGb3JtcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICkuZmluZChzdWJGb3JtID0+IHN1YkZvcm0uZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKHIgPT4gdGhpcy5zZXRTdGF0ZSh7fSwgcikpO1xuXG4gICAgICAgICAgYXdhaXQgbWFwT2JqZWN0KHZhbHVlcywgYXN5bmMgKGZpZWxkLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaW5kR3JvdXBzKGZpZWxkKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm0gPSBmaW5kU3ViRm9ybXMoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoc3ViRm9ybSkge1xuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IHN1YkZvcm1NYXBPYmogfSA9IG1hcHM7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBmaWVsZCBpcyAnJHtmaWVsZH0nIHN1YkZvcm0gc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgc3ViRm9ybS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyh2YWx1ZSwgc3ViRm9ybU1hcE9iaik7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFncm91cCkgeyAvLyBmcmFnbWVudFxuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IG1hcEZ1biA9IF8gPT4gXyB9ID0gbWFwcztcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG1hcEZ1bih2YWx1ZSkgfSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBJRExpc3QgYW5kIGFkZFxuICAgICAgICAgICAgZ3JvdXAuSURMaXN0ID0gWy4uLm5ldyBBcnJheSh2YWx1ZS5sZW5ndGgpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcblxuICAgICAgICAgICAgLy8gcmVuZGVyXG4gICAgICAgICAgICAvLyBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIGF3YWl0IHJlbmRlcigpO1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG5cbiAgICAgICAgICAgIC8vIGdyb3VwIHNob3VsZCBtb3VudGVkXG4gICAgICAgICAgICBjb25zdCB7IElEUmVmTWFwLCBJRExpc3QsIGZvcm1OYW1lIH0gPSBncm91cDtcblxuICAgICAgICAgICAgYXdhaXQgbWFwT2JqZWN0QXN5bmMoSURMaXN0LCBhc3luYyAoaW5kZXgsIElEKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlZiA9IGF3YWl0IGdldEdyb3VwUmVmKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICBbSURdOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogZ3JvdXBGb3JtUmVmLFxuICAgICAgICAgICAgICAgICAgfSA9IHt9LFxuICAgICAgICAgICAgICAgIH0gPSBJRFJlZk1hcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXBGb3JtUmVmO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZm9ybSAnJHtmb3JtTmFtZX0nIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIGdyb3VwLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbVZhbHVlID0gdmFsdWVbaW5kZXhdIHx8IFtdO1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogZnVuID0gKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG1hcE9iajoge30sXG4gICAgICAgICAgICAgICAgICBwcm9wczoge30sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIH0gPSBtYXBzO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHsgbWFwT2JqID0ge30sIHByb3BzID0ge30gfSA9IGZ1bihncm91cEl0ZW1WYWx1ZSk7XG5cbiAgICAgICAgICAgICAgSURSZWZNYXBbSURdLnByb3BzID0gcHJvcHM7XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXMoZ3JvdXBJdGVtVmFsdWUsIG1hcE9iaik7XG4gICAgICAgICAgICB9LCBJRExpc3QpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19