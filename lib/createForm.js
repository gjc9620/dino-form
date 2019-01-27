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

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/values"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _DinoFormStore = _interopRequireDefault(require("./DinoFormStore.js"));

var _DinoFormHelper = require("./DinoFormHelper.jsx");

var _util = require("./util.js");

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
      subForms = _ref$subForms === void 0 ? {} : _ref$subForms;

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
                  formProps = _ref2$formProps === void 0 ? {} : _ref2$formProps;

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
                IDRefMap: IDRefMap,
                IDList: IDList,
                Form: Form
              };
              return (0, _defineProperty2.default)({}, formName, group);
            });
          });
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "topFormRender", function () {
            if (_this.props.topFormRender) {
              return _this.props.topFormRender();
            }

            return _this.setState({});
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
          _regenerator.default.mark(function _callee2() {
            var values,
                maps,
                findGroups,
                findSubForms,
                render,
                _args2 = arguments;
            return _regenerator.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    values = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                    maps = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

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
                        return _this.setState({}, function () {
                          return r();
                        });
                      });
                    };

                    _context2.next = 7;
                    return (0, _util.mapObjectAsync)(values,
                    /*#__PURE__*/
                    function () {
                      var _ref15 = (0, _asyncToGenerator2.default)(
                      /*#__PURE__*/
                      _regenerator.default.mark(function _callee(field, value) {
                        var group, subForm, subFormMapObj, ref, _maps$field, mapFun, IDRefMap, IDList, formName;

                        return _regenerator.default.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                group = findGroups(field);
                                subForm = findSubForms(field);

                                if (!subForm) {
                                  _context.next = 7;
                                  break;
                                }

                                subFormMapObj = maps[field];
                                ref = subForm.ref;
                                ref.setFullValues(value, subFormMapObj);
                                return _context.abrupt("return");

                              case 7:
                                if (group) {
                                  _context.next = 11;
                                  break;
                                }

                                // fragment
                                _maps$field = maps[field], mapFun = _maps$field === void 0 ? function (_) {
                                  return _;
                                } : _maps$field;

                                _this.store.update(field, {
                                  value: mapFun(value)
                                });

                                return _context.abrupt("return");

                              case 11:
                                if (!(!(0, _isArray.default)(value) || value.length < 1)) {
                                  _context.next = 13;
                                  break;
                                }

                                return _context.abrupt("return");

                              case 13:
                                // delete IDList and add
                                group.IDList = (0, _toConsumableArray2.default)(new Array(value.length)).map(function () {
                                  return _this.ID++;
                                }); // render

                                _context.next = 16;
                                return render();

                              case 16:
                                // group should mounted
                                IDRefMap = group.IDRefMap, IDList = group.IDList, formName = group.formName;
                                IDList.forEach(function (ID, index) {
                                  var _IDRefMap$ID = IDRefMap[ID];
                                  _IDRefMap$ID = _IDRefMap$ID === void 0 ? {} : _IDRefMap$ID;
                                  var ref = _IDRefMap$ID.ref;

                                  if (!ref) {
                                    console.warn("[dino-form] ".concat(formName, " should be mounted but the Ref is not registered, maybe you not render this group."));
                                    return;
                                  }

                                  var groupItemValue = value[index] || [];
                                  var _maps$field2 = maps[field],
                                      fun = _maps$field2 === void 0 ? function () {
                                    return {
                                      mapObj: {},
                                      props: {}
                                    };
                                  } : _maps$field2;

                                  var _fun = fun(groupItemValue),
                                      _fun$mapObj = _fun.mapObj,
                                      mapObj = _fun$mapObj === void 0 ? {} : _fun$mapObj,
                                      _fun$props = _fun.props,
                                      props = _fun$props === void 0 ? {} : _fun$props;

                                  IDRefMap[ID].props = props;
                                  ref.setFullValues(groupItemValue, mapObj);
                                });

                              case 18:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee, this);
                      }));

                      return function (_x, _x2) {
                        return _ref15.apply(this, arguments);
                      };
                    }());

                  case 7:
                    _this.setState({});

                  case 8:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          })));
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "verify", function () {
            var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref16$first = _ref16.first,
                first = _ref16$first === void 0 ? false : _ref16$first,
                _ref16$scroll = _ref16.scroll,
                scroll = _ref16$scroll === void 0 ? true : _ref16$scroll;

            return _promise.default.resolve().then(
            /*#__PURE__*/
            (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee6() {
              var hasError, fragmentsField, groupField, subFormField;
              return _regenerator.default.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      hasError = false;
                      _context6.next = 3;
                      return (0, _util.mapObjectAsync)(_this.store.get(),
                      /*#__PURE__*/
                      function () {
                        var _ref18 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee3(field, scheme) {
                          var _scheme$rules, rules, isMount, value, label, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, rule, isPass, error;

                          return _regenerator.default.wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _scheme$rules = scheme.rules, rules = _scheme$rules === void 0 ? [] : _scheme$rules, isMount = scheme.isMount, value = scheme.value, label = scheme.label;

                                  if (isMount) {
                                    _context3.next = 3;
                                    break;
                                  }

                                  return _context3.abrupt("return", {});

                                case 3:
                                  _iteratorNormalCompletion2 = true;
                                  _didIteratorError2 = false;
                                  _iteratorError2 = undefined;
                                  _context3.prev = 6;
                                  _iterator2 = (0, _getIterator2.default)(rules);

                                case 8:
                                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                    _context3.next = 21;
                                    break;
                                  }

                                  rule = _step2.value;
                                  _context3.next = 12;
                                  return rule.fun(value);

                                case 12:
                                  isPass = _context3.sent;

                                  if (isPass) {
                                    _context3.next = 18;
                                    break;
                                  }

                                  hasError = true;
                                  error = rule.error({
                                    label: label,
                                    field: field
                                  });

                                  _this.setFieldsError((0, _defineProperty2.default)({}, field, error));

                                  return _context3.abrupt("break", 21);

                                case 18:
                                  _iteratorNormalCompletion2 = true;
                                  _context3.next = 8;
                                  break;

                                case 21:
                                  _context3.next = 27;
                                  break;

                                case 23:
                                  _context3.prev = 23;
                                  _context3.t0 = _context3["catch"](6);
                                  _didIteratorError2 = true;
                                  _iteratorError2 = _context3.t0;

                                case 27:
                                  _context3.prev = 27;
                                  _context3.prev = 28;

                                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                    _iterator2.return();
                                  }

                                case 30:
                                  _context3.prev = 30;

                                  if (!_didIteratorError2) {
                                    _context3.next = 33;
                                    break;
                                  }

                                  throw _iteratorError2;

                                case 33:
                                  return _context3.finish(30);

                                case 34:
                                  return _context3.finish(27);

                                case 35:
                                  return _context3.abrupt("return", (0, _defineProperty2.default)({}, field, value));

                                case 36:
                                case "end":
                                  return _context3.stop();
                              }
                            }
                          }, _callee3, this, [[6, 23, 27, 35], [28,, 30, 34]]);
                        }));

                        return function (_x3, _x4) {
                          return _ref18.apply(this, arguments);
                        };
                      }());

                    case 3:
                      fragmentsField = _context6.sent;
                      _context6.next = 6;
                      return (0, _util.mapObjectAsync)(_this.groups,
                      /*#__PURE__*/
                      function () {
                        var _ref21 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee4(groupName, _ref20) {
                          var field, _ref20$IDRefMap, IDRefMap, IDList, values, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, ID, result;

                          return _regenerator.default.wrap(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  field = _ref20.field, _ref20$IDRefMap = _ref20.IDRefMap, IDRefMap = _ref20$IDRefMap === void 0 ? [] : _ref20$IDRefMap, IDList = _ref20.IDList;
                                  values = [];
                                  _iteratorNormalCompletion3 = true;
                                  _didIteratorError3 = false;
                                  _iteratorError3 = undefined;
                                  _context4.prev = 5;
                                  _iterator3 = (0, _getIterator2.default)(IDList);

                                case 7:
                                  if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                    _context4.next = 17;
                                    break;
                                  }

                                  ID = _step3.value;
                                  _context4.next = 11;
                                  return IDRefMap[ID].ref.verify();

                                case 11:
                                  result = _context4.sent;
                                  if (result.hasError) hasError = true;
                                  values.push(result.data);

                                case 14:
                                  _iteratorNormalCompletion3 = true;
                                  _context4.next = 7;
                                  break;

                                case 17:
                                  _context4.next = 23;
                                  break;

                                case 19:
                                  _context4.prev = 19;
                                  _context4.t0 = _context4["catch"](5);
                                  _didIteratorError3 = true;
                                  _iteratorError3 = _context4.t0;

                                case 23:
                                  _context4.prev = 23;
                                  _context4.prev = 24;

                                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                    _iterator3.return();
                                  }

                                case 26:
                                  _context4.prev = 26;

                                  if (!_didIteratorError3) {
                                    _context4.next = 29;
                                    break;
                                  }

                                  throw _iteratorError3;

                                case 29:
                                  return _context4.finish(26);

                                case 30:
                                  return _context4.finish(23);

                                case 31:
                                  return _context4.abrupt("return", (0, _defineProperty2.default)({}, field, values));

                                case 32:
                                case "end":
                                  return _context4.stop();
                              }
                            }
                          }, _callee4, this, [[5, 19, 23, 31], [24,, 26, 30]]);
                        }));

                        return function (_x5, _x6) {
                          return _ref21.apply(this, arguments);
                        };
                      }());

                    case 6:
                      groupField = _context6.sent;
                      _context6.next = 9;
                      return (0, _util.mapObjectAsync)(_this.subForms,
                      /*#__PURE__*/
                      function () {
                        var _ref23 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee5(formName, subForm) {
                          var ref, field, _ref24, data, subFormHasError;

                          return _regenerator.default.wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  ref = subForm.ref, field = subForm.field;
                                  _context5.next = 3;
                                  return ref.verify();

                                case 3:
                                  _ref24 = _context5.sent;
                                  data = _ref24.data;
                                  subFormHasError = _ref24.hasError;
                                  hasError = subFormHasError;
                                  return _context5.abrupt("return", (0, _defineProperty2.default)({}, field, data));

                                case 8:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5, this);
                        }));

                        return function (_x7, _x8) {
                          return _ref23.apply(this, arguments);
                        };
                      }());

                    case 9:
                      subFormField = _context6.sent;
                      return _context6.abrupt("return", {
                        hasError: hasError,
                        data: (0, _objectSpread2.default)({}, fragmentsField, groupField, subFormField)
                      });

                    case 11:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
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
                        setID: function setID() {
                          return _this2.ID;
                        },
                        getID: function getID(ID) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJXcmFwQ29tIiwicmVuZGVyRGlub0Zvcm0iLCJwcm9wcyIsImRpbm9Gb3JtIiwiQ29tcG9uZW50IiwiY3JlYXRlRm9ybSIsImZyYWdtZW50cyIsImdyb3VwcyIsInN1YkZvcm1zIiwiY3JlYXRlIiwiVmlldyIsImJpbmRXcmFwIiwiV3JhcCIsImNvbnN0cnVjdG9yUHJvcHMiLCJncm91cHNPYmoiLCJmb3JtTmFtZSIsIkNvbSIsImZpZWxkIiwiY291bnQiLCJmb3JtUHJvcHMiLCJJRFJlZk1hcCIsIklETGlzdCIsIkFycmF5IiwibWFwIiwiSUQiLCJGb3JtIiwic2V0SURSZWZNYXAiLCJ2YWx1ZSIsInRvcEZvcm1SZW5kZXIiLCJncm91cCIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImZyYWdtZW50c0ZpZWxkIiwiaXNNb3VudCIsImdyb3VwRmllbGQiLCJncm91cE5hbWUiLCJ2YWx1ZXMiLCJyZXN1bHQiLCJyZWYiLCJwdXNoIiwic3ViRm9ybUZpZWxkIiwic3ViRm9ybSIsIm1hcHMiLCJmaW5kR3JvdXBzIiwiZmluZCIsImZpbmRTdWJGb3JtcyIsInJlbmRlciIsInIiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiY29uc29sZSIsIndhcm4iLCJncm91cEl0ZW1WYWx1ZSIsImZ1biIsIm1hcE9iaiIsImZpcnN0Iiwic2Nyb2xsIiwicmVzb2x2ZSIsInRoZW4iLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsInNldElEIiwiZ2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFTQTs7SUFFTUEsTzs7Ozs7Ozs7Ozs7OzZCQUNLO0FBQUEsVUFDYUMsY0FEYixHQUNrQyxLQUFLQyxLQUR2QyxDQUNDQyxRQURELENBQ2FGLGNBRGI7QUFFUCxhQUFPQSxjQUFjLENBQUMsS0FBS0MsS0FBTixDQUFyQjtBQUNEOzs7RUFKbUJFLGdCOztBQU90QixTQUFTQyxVQUFULEdBSVE7QUFBQSxpRkFBSixFQUFJO0FBQUEsNEJBSE5DLFNBR007QUFBQSxNQUhOQSxTQUdNLCtCQUhNLEVBR047QUFBQSx5QkFGTkMsTUFFTTtBQUFBLE1BRk5BLE1BRU0sNEJBRkcsRUFFSDtBQUFBLDJCQUROQyxRQUNNO0FBQUEsTUFETkEsUUFDTSw4QkFESyxFQUNMOztBQUNOLFNBQU8sU0FBU0MsTUFBVCxDQUFnQkMsSUFBaEIsRUFBc0I7QUFDM0IsV0FBTyxTQUFTQyxRQUFULEdBQWtDO0FBQUE7O0FBQUEsVUFBaEJDLElBQWdCLHVFQUFUWixPQUFTO0FBQ3ZDO0FBQUE7QUFBQTtBQUFBOztBQUNFLDBCQUFZYSxnQkFBWixFQUE4QjtBQUFBOztBQUFBO0FBQzVCLG9IQUFNQSxnQkFBTjtBQUQ0QiwySUE0QmYsVUFBQUMsU0FBUztBQUFBLG1CQUFJLHFCQUFVQSxTQUFWLEVBQXFCLFVBQUNDLFFBQUQsRUFFdEM7QUFBQSw4RkFBUCxFQUFPO0FBQUEsa0JBRFRDLEdBQ1MsU0FEVEEsR0FDUztBQUFBLGtCQURKQyxLQUNJLFNBREpBLEtBQ0k7QUFBQSxrQkFER0MsS0FDSCxTQURHQSxLQUNIO0FBQUEsMENBRFVDLFNBQ1Y7QUFBQSxrQkFEVUEsU0FDVixn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c0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVEaW5vRm9ybVN0b3JlIGZyb20gJy4vRGlub0Zvcm1TdG9yZS5qcyc7XG5pbXBvcnQge1xuICBjcmVhdGVGcm9tSXRlbSxcbiAgY3JlYXRlRGlub0Zvcm1TdWJGb3JtLFxuICBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCxcbiAgY3JlYXRlRnJhZ21lbnRzLFxuICBncm91cHNBUEksXG4gIHN1YkZvcm1zQVBJLFxufSBmcm9tICcuL0Rpbm9Gb3JtSGVscGVyLmpzeCc7XG5cbmltcG9ydCB7IG1hcE9iamVjdCwgbWFwT2JqZWN0QXN5bmMgfSBmcm9tICcuL3V0aWwuanMnO1xuXG5jbGFzcyBXcmFwQ29tIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZGlub0Zvcm06IHsgcmVuZGVyRGlub0Zvcm0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gcmVuZGVyRGlub0Zvcm0odGhpcy5wcm9wcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9ybSh7XG4gIGZyYWdtZW50cyA9IHt9LFxuICBncm91cHMgPSB7fSxcbiAgc3ViRm9ybXMgPSB7fSxcbn0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlKFZpZXcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYmluZFdyYXAoV3JhcCA9IFdyYXBDb20pIHtcbiAgICAgIHJldHVybiBjbGFzcyBEaW5vRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yUHJvcHMpIHtcbiAgICAgICAgICBzdXBlcihjb25zdHJ1Y3RvclByb3BzKTtcblxuICAgICAgICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVEaW5vRm9ybVN0b3JlKCk7XG4gICAgICAgICAgdGhpcy5zdWJGb3JtcyA9IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybShzdWJGb3Jtcyk7XG5cbiAgICAgICAgICB0aGlzLkZyb21JdGVtID0gY3JlYXRlRnJvbUl0ZW0oe1xuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmZyYWdtZW50cyA9IGNyZWF0ZUZyYWdtZW50cyh7XG4gICAgICAgICAgICBmcmFnbWVudHMsXG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuSUQgPSAwO1xuICAgICAgICAgIHRoaXMuZ3JvdXBzID0gdGhpcy5jcmVhdGVHcm91cHMoZ3JvdXBzKTtcblxuICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuICAgICAgICAgICAgSUQ6IHRoaXMuSUQsXG4gICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVHcm91cHMgPSBncm91cHNPYmogPT4gbWFwT2JqZWN0KGdyb3Vwc09iaiwgKGZvcm1OYW1lLCB7XG4gICAgICAgICAgQ29tLCBmaWVsZCwgY291bnQsIGZvcm1Qcm9wcyA9IHt9LFxuICAgICAgICB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBJRFJlZk1hcCA9IHt9O1xuICAgICAgICAgIGNvbnN0IElETGlzdCA9IFsuLi5uZXcgQXJyYXkoY291bnQpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcbiAgICAgICAgICBjb25zdCBGb3JtID0gY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAoe1xuICAgICAgICAgICAgc2V0SURSZWZNYXA6IChJRCwgdmFsdWUpID0+IHsgdGhpcy5ncm91cHNbZm9ybU5hbWVdLklEUmVmTWFwW0lEXSA9IHZhbHVlOyB9LFxuICAgICAgICAgICAgdG9wRm9ybVJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgIGZvcm1Qcm9wcyxcbiAgICAgICAgICAgIGZvcm1OYW1lLFxuICAgICAgICAgICAgSURSZWZNYXAsXG4gICAgICAgICAgICBJRExpc3QsXG4gICAgICAgICAgICBGb3JtLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgIFtmb3JtTmFtZV06IGdyb3VwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRvcEZvcm1SZW5kZXIgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaSA9ICgpID0+ICh7XG4gICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG5cbiAgICAgICAgICBzZXRGaWVsZHNWYWx1ZTogdGhpcy5zZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgICBzZXRGdWxsVmFsdWVzOiB0aGlzLnNldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgc2V0RmllbGRzRXJyb3I6IHRoaXMuc2V0RmllbGRzRXJyb3IsXG5cbiAgICAgICAgICBnZXRGdWxsVmFsdWVzOiB0aGlzLmdldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgZ2V0RmllbGRzVmFsdWU6IHRoaXMuZ2V0RmllbGRzVmFsdWUsXG5cbiAgICAgICAgICB2ZXJpZnk6IHRoaXMudmVyaWZ5LFxuICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgIGRpbm9Gb3JtUmVmOiB0aGlzLFxuICAgICAgICB9KVxuXG4gICAgICAgIHNldEZpZWxkc0Vycm9yID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIGVycm9yXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgZXJyb3IgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGaWVsZHNWYWx1ZSA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBuZXdWYWx1ZV0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMudG9wRm9ybVJlbmRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0RmllbGRzVmFsdWUgPSAoLi4uZmllbGRzKSA9PiBmaWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtZSA9IHRoaXMuc3RvcmUuZ2V0KGZpZWxkKSB8fCB7fTtcbiAgICAgICAgICByZXR1cm4gc2NoZW1lLnZhbHVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIGdldEZ1bGxWYWx1ZXMgPSAoeyBvbmx5R2V0TW91bnQgPSB0cnVlIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgIHNjaGVtZSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IGlzTW91bnQsIHZhbHVlIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgIHJldHVybiBvbmx5R2V0TW91bnRcbiAgICAgICAgICAgICAgICA/IGlzTW91bnQgPyB7IFtmaWVsZF06IHZhbHVlIH0gOiB7fVxuICAgICAgICAgICAgICAgIDogeyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBJRFJlZk1hcFtJRF0ucmVmLmdldEZ1bGxWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiByZWYuZ2V0RnVsbFZhbHVlcygpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RnVsbFZhbHVlcyA9IGFzeW5jICh2YWx1ZXMgPSB7fSwgbWFwcyA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmluZEdyb3VwcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICApLmZpbmQoZ3JvdXAgPT4gZ3JvdXAuZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IGZpbmRTdWJGb3JtcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICkuZmluZChzdWJGb3JtID0+IHN1YkZvcm0uZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKHIgPT4gdGhpcy5zZXRTdGF0ZSh7fSwgKCkgPT4gcigpKSk7XG5cbiAgICAgICAgICBhd2FpdCBtYXBPYmplY3RBc3luYyh2YWx1ZXMsIGFzeW5jIChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmluZEdyb3VwcyhmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtID0gZmluZFN1YkZvcm1zKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHN1YkZvcm0pIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBzdWJGb3JtTWFwT2JqIH0gPSBtYXBzO1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiB9ID0gc3ViRm9ybTtcbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXModmFsdWUsIHN1YkZvcm1NYXBPYmopO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ3JvdXApIHsgLy8gZnJhZ21lbnRcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBtYXBGdW4gPSBfID0+IF8gfSA9IG1hcHM7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBtYXBGdW4odmFsdWUpIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBkZWxldGUgSURMaXN0IGFuZCBhZGRcbiAgICAgICAgICAgIGdyb3VwLklETGlzdCA9IFsuLi5uZXcgQXJyYXkodmFsdWUubGVuZ3RoKV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG5cbiAgICAgICAgICAgIC8vIHJlbmRlclxuICAgICAgICAgICAgYXdhaXQgcmVuZGVyKCk7XG5cbiAgICAgICAgICAgIC8vIGdyb3VwIHNob3VsZCBtb3VudGVkXG4gICAgICAgICAgICBjb25zdCB7IElEUmVmTWFwLCBJRExpc3QsIGZvcm1OYW1lIH0gPSBncm91cDtcblxuICAgICAgICAgICAgSURMaXN0LmZvckVhY2goKElELCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW0lEXToge1xuICAgICAgICAgICAgICAgICAgcmVmLFxuICAgICAgICAgICAgICAgIH0gPSB7fSxcbiAgICAgICAgICAgICAgfSA9IElEUmVmTWFwO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSAke2Zvcm1OYW1lfSBzaG91bGQgYmUgbW91bnRlZCBidXQgdGhlIFJlZiBpcyBub3QgcmVnaXN0ZXJlZCwgbWF5YmUgeW91IG5vdCByZW5kZXIgdGhpcyBncm91cC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1WYWx1ZSA9IHZhbHVlW2luZGV4XSB8fCBbXTtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IGZ1biA9ICgpID0+ICh7XG4gICAgICAgICAgICAgICAgICBtYXBPYmo6IHt9LFxuICAgICAgICAgICAgICAgICAgcHJvcHM6IHt9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB9ID0gbWFwcztcblxuICAgICAgICAgICAgICBjb25zdCB7IG1hcE9iaiA9IHt9LCBwcm9wcyA9IHt9IH0gPSBmdW4oZ3JvdXBJdGVtVmFsdWUpO1xuXG4gICAgICAgICAgICAgIElEUmVmTWFwW0lEXS5wcm9wcyA9IHByb3BzO1xuXG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKGdyb3VwSXRlbVZhbHVlLCBtYXBPYmopO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZlcmlmeSA9ICh7XG4gICAgICAgICAgZmlyc3QgPSBmYWxzZSwgLy8gdG9kb1xuICAgICAgICAgIHNjcm9sbCA9IHRydWUsIC8vIHRvZG9cbiAgICAgICAgfSA9IHt9KSA9PiAoXG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUuZ2V0KCksXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBzY2hlbWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICBydWxlcyA9IFtdLCBpc01vdW50LCB2YWx1ZSwgbGFiZWwsXG4gICAgICAgICAgICAgICAgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91bnQpIHsgcmV0dXJuIHt9OyB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUGFzcyA9IGF3YWl0IHJ1bGUuZnVuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGlmICghaXNQYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBydWxlLmVycm9yKHsgbGFiZWwsIGZpZWxkIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogZXJyb3IgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgSURSZWZNYXAgPSBbXSwgSURMaXN0LFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgSUQgb2YgSURMaXN0KSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBJRFJlZk1hcFtJRF0ucmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNFcnJvcikgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgICBhc3luYyAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHJlZiwgZmllbGQgfSA9IHN1YkZvcm07XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBoYXNFcnJvcjogc3ViRm9ybUhhc0Vycm9yIH0gPSBhd2FpdCByZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3IgPSBzdWJGb3JtSGFzRXJyb3I7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IGRhdGEsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGhhc0Vycm9yLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgKVxuXG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICBjb25zdCB7IGNhdGNoUmVmID0gKCkgPT4ge30sIC4uLm90aGVycyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFdyYXBcbiAgICAgICAgICAgICAgcmVmPXsgY2F0Y2hSZWYgfVxuICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgcmVuZGVyRGlub0Zvcm06IChwcm9wcyA9IHt9KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Vmlld1xuICAgICAgICAgICAgICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgICAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiBncm91cHNBUEkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6ICgpID0+IHRoaXMuSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJRDogKElEKSA9PiB7IHRoaXMuSUQgPSBJRDsgfSxcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBzdWJGb3Jtczogc3ViRm9ybXNBUEkoeyBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgIHsgLi4ub3RoZXJzIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZvcm07XG4iXX0=