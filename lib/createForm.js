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
      getGroupRef = _ref$getGroupRef === void 0 ? _DinoFormHelper.dinoFormGetGroupRef : _ref$getGroupRef;

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
                  needDrag = _ref2$needDrag === void 0 ? false : _ref2$needDrag;

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
                Form: Form
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
                    return (0, _util.mapObjectAsync)(values,
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
                                            return getGroupRef({
                                              group: group,
                                              index: index,
                                              ID: ID,
                                              render: _this.render()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJXcmFwQ29tIiwicmVuZGVyRGlub0Zvcm0iLCJwcm9wcyIsImRpbm9Gb3JtIiwiQ29tcG9uZW50IiwiY3JlYXRlRm9ybSIsImZyYWdtZW50cyIsImdyb3VwcyIsInN1YkZvcm1zIiwiZ2V0R3JvdXBSZWYiLCJkaW5vRm9ybUdldEdyb3VwUmVmIiwiY3JlYXRlIiwiVmlldyIsImJpbmRXcmFwIiwiV3JhcCIsImNvbnN0cnVjdG9yUHJvcHMiLCJncm91cHNPYmoiLCJmb3JtTmFtZSIsIkNvbSIsImZpZWxkIiwiY291bnQiLCJmb3JtUHJvcHMiLCJuZWVkRHJhZyIsIklEUmVmTWFwIiwiSURMaXN0IiwiQXJyYXkiLCJtYXAiLCJJRCIsIkZvcm0iLCJzZXRJRFJlZk1hcCIsInZhbHVlIiwidG9wRm9ybVJlbmRlciIsImdyb3VwIiwiciIsInRoZW4iLCJzZXRTdGF0ZSIsIkZyb21JdGVtIiwic2V0RmllbGRzVmFsdWUiLCJzZXRGdWxsVmFsdWVzIiwic2V0RmllbGRzRXJyb3IiLCJnZXRGdWxsVmFsdWVzIiwiZ2V0RmllbGRzVmFsdWUiLCJ2ZXJpZnkiLCJzdG9yZSIsImRpbm9Gb3JtUmVmIiwib2JqIiwiZm9yRWFjaCIsImVycm9yIiwidXBkYXRlIiwibmV3VmFsdWUiLCJmaWVsZHMiLCJzY2hlbWUiLCJnZXQiLCJvbmx5R2V0TW91bnQiLCJmcmFnbWVudHNGaWVsZCIsImlzTW91bnQiLCJncm91cEZpZWxkIiwiZ3JvdXBOYW1lIiwidmFsdWVzIiwicmVzdWx0IiwicmVmIiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJyZW5kZXIiLCJzdWJGb3JtTWFwT2JqIiwiY29uc29sZSIsIndhcm4iLCJtYXBGdW4iLCJfIiwibGVuZ3RoIiwiaW5kZXgiLCJncm91cEl0ZW1WYWx1ZSIsImZ1biIsIm1hcE9iaiIsImZpcnN0Iiwic2Nyb2xsIiwicmVzb2x2ZSIsImhhc0Vycm9yIiwicnVsZXMiLCJsYWJlbCIsInJ1bGUiLCJpc1Bhc3MiLCJkYXRhIiwic3ViRm9ybUhhc0Vycm9yIiwiY3JlYXRlRGlub0Zvcm1BcGkiLCJjcmVhdGVHcm91cHMiLCJzdGF0ZSIsImNhdGNoUmVmIiwib3RoZXJzIiwiZ2V0SUQiLCJzZXRJRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQVVBOztJQUdNQSxPOzs7Ozs7Ozs7Ozs7NkJBQ0s7QUFBQSxVQUNhQyxjQURiLEdBQ2tDLEtBQUtDLEtBRHZDLENBQ0NDLFFBREQsQ0FDYUYsY0FEYjtBQUVQLGFBQU9BLGNBQWMsQ0FBQyxLQUFLQyxLQUFOLENBQXJCO0FBQ0Q7OztFQUptQkUsZ0I7O0FBT3RCLFNBQVNDLFVBQVQsR0FLUTtBQUFBLGlGQUFKLEVBQUk7QUFBQSw0QkFKTkMsU0FJTTtBQUFBLE1BSk5BLFNBSU0sK0JBSk0sRUFJTjtBQUFBLHlCQUhOQyxNQUdNO0FBQUEsTUFITkEsTUFHTSw0QkFIRyxFQUdIO0FBQUEsMkJBRk5DLFFBRU07QUFBQSxNQUZOQSxRQUVNLDhCQUZLLEVBRUw7QUFBQSw4QkFETkMsV0FDTTtBQUFBLE1BRE5BLFdBQ00saUNBRFFDLG1DQUNSOztBQUNOLFNBQU8sU0FBU0MsTUFBVCxDQUFnQkMsSUFBaEIsRUFBc0I7QUFDM0IsV0FBTyxTQUFTQyxRQUFULEdBQWtDO0FBQUE7O0FBQUEsVUFBaEJDLElBQWdCLHVFQUFUZCxPQUFTO0FBQ3ZDO0FBQUE7QUFBQTtBQUFBOztBQUNFLDBCQUFZZSxnQkFBWixFQUE4QjtBQUFBOztBQUFBO0FBQzVCLG9IQUFNQSxnQkFBTjtBQUQ0QiwySUE0QmYsVUFBQUMsU0FBUztBQUFBLG1CQUFJLHFCQUFVQSxTQUFWLEVBQXFCLFVBQUNDLFFBQUQsRUFFdEM7QUFBQSw4RkFBUCxFQUFPO0FBQUEsa0JBRFRDLEdBQ1MsU0FEVEEsR0FD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LFFBQVEsa0NBQ0gsTUFBSSxDQUFDdUYsaUJBQUwsRUFERztBQUVObkYsc0JBQUFBLFNBQVMsRUFBRSxNQUFJLENBQUNBLFNBRlY7QUFHTkMsc0JBQUFBLE1BQU0sRUFBRSwrQkFBVTtBQUNoQkEsd0JBQUFBLE1BQU0sRUFBRSxNQUFJLENBQUNBLE1BREc7QUFFaEI2RCx3QkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ3JDLGFBRkc7QUFHaEIrRCx3QkFBQUEsS0FBSyxFQUFFO0FBQUEsaUNBQU0sTUFBSSxDQUFDbkUsRUFBWDtBQUFBLHlCQUhTO0FBSWhCb0Usd0JBQUFBLEtBQUssRUFBRSxlQUFDcEUsRUFBRCxFQUFRO0FBQUUsMEJBQUEsTUFBSSxDQUFDQSxFQUFMLEdBQVVBLEVBQVY7QUFBZTtBQUpoQix1QkFBVixDQUhGO0FBU05uQixzQkFBQUEsUUFBUSxFQUFFLGlDQUFZO0FBQUVBLHdCQUFBQSxRQUFRLEVBQUUsTUFBSSxDQUFDQTtBQUFqQix1QkFBWjtBQVRKO0FBRlYscUJBRGM7QUFBQTtBQUZWO0FBRlYsZUFxQk9xRixNQXJCUCxFQURGO0FBeUJEO0FBMVVIO0FBQUE7QUFBQSxRQUE4QnpGLGdCQUE5QjtBQTRVRCxLQTdVRDtBQThVRCxHQS9VRDtBQWdWRDs7ZUFFY0MsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlRGlub0Zvcm1TdG9yZSBmcm9tICcuL0Rpbm9Gb3JtU3RvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRnJvbUl0ZW0sXG4gIGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSxcbiAgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAsXG4gIGNyZWF0ZUZyYWdtZW50cyxcbiAgZ3JvdXBzQVBJLFxuICBzdWJGb3Jtc0FQSSxcbiAgZGlub0Zvcm1HZXRHcm91cFJlZixcbn0gZnJvbSAnLi9EaW5vRm9ybUhlbHBlcic7XG5cbmltcG9ydCB7IG1hcE9iamVjdCwgbWFwT2JqZWN0QXN5bmMgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuL3V0aWwnO1xuXG5jbGFzcyBXcmFwQ29tIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZGlub0Zvcm06IHsgcmVuZGVyRGlub0Zvcm0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gcmVuZGVyRGlub0Zvcm0odGhpcy5wcm9wcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9ybSh7XG4gIGZyYWdtZW50cyA9IHt9LFxuICBncm91cHMgPSB7fSxcbiAgc3ViRm9ybXMgPSB7fSxcbiAgZ2V0R3JvdXBSZWYgPSBkaW5vRm9ybUdldEdyb3VwUmVmLFxufSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGUoVmlldykge1xuICAgIHJldHVybiBmdW5jdGlvbiBiaW5kV3JhcChXcmFwID0gV3JhcENvbSkge1xuICAgICAgcmV0dXJuIGNsYXNzIERpbm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RydWN0b3JQcm9wcykge1xuICAgICAgICAgIHN1cGVyKGNvbnN0cnVjdG9yUHJvcHMpO1xuXG4gICAgICAgICAgdGhpcy5zdG9yZSA9IGNyZWF0ZURpbm9Gb3JtU3RvcmUoKTtcbiAgICAgICAgICB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHN1YkZvcm1zKTtcblxuICAgICAgICAgIHRoaXMuRnJvbUl0ZW0gPSBjcmVhdGVGcm9tSXRlbSh7XG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gY3JlYXRlRnJhZ21lbnRzKHtcbiAgICAgICAgICAgIGZyYWdtZW50cyxcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5JRCA9IDA7XG4gICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmNyZWF0ZUdyb3Vwcyhncm91cHMpO1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG4gICAgICAgICAgICBJRDogdGhpcy5JRCxcbiAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUdyb3VwcyA9IGdyb3Vwc09iaiA9PiBtYXBPYmplY3QoZ3JvdXBzT2JqLCAoZm9ybU5hbWUsIHtcbiAgICAgICAgICBDb20sIGZpZWxkLCBjb3VudCwgZm9ybVByb3BzID0ge30sIG5lZWREcmFnID0gZmFsc2UsXG4gICAgICAgIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IElEUmVmTWFwID0ge307XG4gICAgICAgICAgY29uc3QgSURMaXN0ID0gWy4uLm5ldyBBcnJheShjb3VudCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuICAgICAgICAgIGNvbnN0IEZvcm0gPSBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCh7XG4gICAgICAgICAgICBzZXRJRFJlZk1hcDogKElELCB2YWx1ZSkgPT4geyB0aGlzLmdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdID0gdmFsdWU7IH0sXG4gICAgICAgICAgICB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBncm91cCA9IHtcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgICAgZm9ybU5hbWUsXG4gICAgICAgICAgICBuZWVkRHJhZyxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBbZm9ybU5hbWVdOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0b3BGb3JtUmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKCkudGhlbihyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpID0gKCkgPT4gKHtcbiAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcblxuICAgICAgICAgIHNldEZpZWxkc1ZhbHVlOiB0aGlzLnNldEZpZWxkc1ZhbHVlLFxuICAgICAgICAgIHNldEZ1bGxWYWx1ZXM6IHRoaXMuc2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcjogdGhpcy5zZXRGaWVsZHNFcnJvcixcblxuICAgICAgICAgIGdldEZ1bGxWYWx1ZXM6IHRoaXMuZ2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBnZXRGaWVsZHNWYWx1ZTogdGhpcy5nZXRGaWVsZHNWYWx1ZSxcblxuICAgICAgICAgIHZlcmlmeTogdGhpcy52ZXJpZnksXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgZGlub0Zvcm1SZWY6IHRoaXMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzRXJyb3IgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyBlcnJvciB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIG5ld1ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSA9ICguLi5maWVsZHMpID0+IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gdGhpcy5zdG9yZS5nZXQoZmllbGQpIHx8IHt9O1xuICAgICAgICAgIHJldHVybiBzY2hlbWUudmFsdWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgZ2V0RnVsbFZhbHVlcyA9ICh7IG9ubHlHZXRNb3VudCA9IHRydWUgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgc2NoZW1lLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaXNNb3VudCwgdmFsdWUgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ubHlHZXRNb3VudFxuICAgICAgICAgICAgICAgID8gaXNNb3VudCA/IHsgW2ZpZWxkXTogdmFsdWUgfSA6IHt9XG4gICAgICAgICAgICAgICAgOiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IElEUmVmTWFwW0lEXS5yZWYuZ2V0RnVsbFZhbHVlcygpO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHJlZi5nZXRGdWxsVmFsdWVzKCksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGdWxsVmFsdWVzID0gYXN5bmMgKHZhbHVlcyA9IHt9LCBtYXBzID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmaW5kR3JvdXBzID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICkuZmluZChncm91cCA9PiBncm91cC5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgZmluZFN1YkZvcm1zID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgKS5maW5kKHN1YkZvcm0gPT4gc3ViRm9ybS5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UociA9PiB0aGlzLnNldFN0YXRlKHt9LCByKSk7XG5cbiAgICAgICAgICBhd2FpdCBtYXBPYmplY3RBc3luYyh2YWx1ZXMsIGFzeW5jIChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmluZEdyb3VwcyhmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtID0gZmluZFN1YkZvcm1zKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHN1YkZvcm0pIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBzdWJGb3JtTWFwT2JqIH0gPSBtYXBzO1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZmllbGQgaXMgJyR7ZmllbGR9JyBzdWJGb3JtIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIHN1YkZvcm0uYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXModmFsdWUsIHN1YkZvcm1NYXBPYmopO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ3JvdXApIHsgLy8gZnJhZ21lbnRcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBtYXBGdW4gPSBfID0+IF8gfSA9IG1hcHM7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBtYXBGdW4odmFsdWUpIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBkZWxldGUgSURMaXN0IGFuZCBhZGRcbiAgICAgICAgICAgIGdyb3VwLklETGlzdCA9IFsuLi5uZXcgQXJyYXkodmFsdWUubGVuZ3RoKV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG5cbiAgICAgICAgICAgIC8vIHJlbmRlclxuICAgICAgICAgICAgLy8gYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMudG9wRm9ybVJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIGF3YWl0IG1hcE9iamVjdEFzeW5jKElETGlzdCwgYXN5bmMgKGluZGV4LCBJRCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZWYgPSBhd2FpdCBnZXRHcm91cFJlZih7XG4gICAgICAgICAgICAgICAgZ3JvdXAsIGluZGV4LCBJRCwgcmVuZGVyOiB0aGlzLnJlbmRlcigpLFxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZm9ybSAnJHtmb3JtTmFtZX0nIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIGdyb3VwLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbVZhbHVlID0gdmFsdWVbaW5kZXhdIHx8IFtdO1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogZnVuID0gKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG1hcE9iajoge30sXG4gICAgICAgICAgICAgICAgICBwcm9wczoge30sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIH0gPSBtYXBzO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHsgbWFwT2JqID0ge30sIHByb3BzID0ge30gfSA9IGZ1bihncm91cEl0ZW1WYWx1ZSk7XG5cbiAgICAgICAgICAgICAgSURSZWZNYXBbSURdLnByb3BzID0gcHJvcHM7XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXMoZ3JvdXBJdGVtVmFsdWUsIG1hcE9iaik7XG4gICAgICAgICAgICB9LCBJRExpc3QpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19