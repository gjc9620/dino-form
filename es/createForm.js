"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/values"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _DinoFormStore = _interopRequireDefault(require("./DinoFormStore.js"));

var _DinoFormHelper = require("./DinoFormHelper.jsx");

var _util = require("./util.js");

class WrapCom extends _react.Component {
  render() {
    const renderDinoForm = this.props.dinoForm.renderDinoForm;
    return renderDinoForm(this.props);
  }

}

function createForm() {
  let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$fragments = _ref.fragments,
      fragments = _ref$fragments === void 0 ? {} : _ref$fragments,
      _ref$groups = _ref.groups,
      groups = _ref$groups === void 0 ? {} : _ref$groups,
      _ref$subForms = _ref.subForms,
      subForms = _ref$subForms === void 0 ? {} : _ref$subForms;

  return function create(View) {
    return function bindWrap() {
      var _temp;

      let Wrap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : WrapCom;
      return _temp = class DinoForm extends _react.Component {
        constructor(constructorProps) {
          var _this;

          super(constructorProps);
          _this = this;
          (0, _defineProperty2.default)(this, "createGroups", groupsObj => (0, _util.mapObject)(groupsObj, function (formName) {
            let _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                Com = _ref2.Com,
                field = _ref2.field,
                count = _ref2.count,
                _ref2$formProps = _ref2.formProps,
                formProps = _ref2$formProps === void 0 ? {} : _ref2$formProps;

            const IDRefMap = {};
            const IDList = [...new Array(count)].map(() => _this.ID++);
            const Form = (0, _DinoFormHelper.createDinoFormGroupWrap)({
              setIDRefMap: (ID, value) => {
                _this.groups[formName].IDRefMap[ID] = value;
              },
              topFormRender: _this.topFormRender,
              Com
            });
            const group = {
              Com,
              field,
              formProps,
              formName,
              IDRefMap,
              IDList,
              Form
            };
            return {
              [formName]: group
            };
          }));
          (0, _defineProperty2.default)(this, "topFormRender", () => {
            if (this.props.topFormRender) {
              return this.props.topFormRender();
            }

            return this.setState({});
          });
          (0, _defineProperty2.default)(this, "createDinoFormApi", () => ({
            FromItem: this.FromItem,
            setFieldsValue: this.setFieldsValue,
            setFullValues: this.setFullValues,
            setFieldsError: this.setFieldsError,
            getFullValues: this.getFullValues,
            getFieldsValue: this.getFieldsValue,
            verify: this.verify,
            store: this.store,
            dinoFormRef: this
          }));
          (0, _defineProperty2.default)(this, "setFieldsError", obj => {
            [...(0, _entries.default)(obj)].forEach((_ref3) => {
              let _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
                  field = _ref4[0],
                  error = _ref4[1];

              this.store.update(field, {
                error
              });
            });
            this.setState({});
          });
          (0, _defineProperty2.default)(this, "setFieldsValue", obj => {
            [...(0, _entries.default)(obj)].forEach((_ref5) => {
              let _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
                  field = _ref6[0],
                  newValue = _ref6[1];

              this.store.update(field, {
                value: newValue
              });
            });
            this.topFormRender();
          });
          (0, _defineProperty2.default)(this, "getFieldsValue", function () {
            for (var _len = arguments.length, fields = new Array(_len), _key = 0; _key < _len; _key++) {
              fields[_key] = arguments[_key];
            }

            return fields.map(field => {
              const scheme = _this.store.get(field) || {};
              return scheme.value;
            });
          });
          (0, _defineProperty2.default)(this, "getFullValues", function () {
            let _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref7$onlyGetMount = _ref7.onlyGetMount,
                onlyGetMount = _ref7$onlyGetMount === void 0 ? true : _ref7$onlyGetMount;

            const fragmentsField = (0, _util.mapObject)(_this.store.get(), (field, scheme) => {
              const isMount = scheme.isMount,
                    value = scheme.value;
              return onlyGetMount ? isMount ? {
                [field]: value
              } : {} : {
                [field]: value
              };
            });
            const groupField = (0, _util.mapObject)(_this.groups, (groupName, _ref8) => {
              let field = _ref8.field,
                  _ref8$IDRefMap = _ref8.IDRefMap,
                  IDRefMap = _ref8$IDRefMap === void 0 ? [] : _ref8$IDRefMap,
                  IDList = _ref8.IDList;
              const values = [];

              for (const ID of IDList) {
                const result = IDRefMap[ID].ref.getFullValues();
                values.push(result);
              }

              return {
                [field]: values
              };
            });
            const subFormField = (0, _util.mapObject)(_this.subForms, (formName, subForm) => {
              const ref = subForm.ref,
                    field = subForm.field;
              return {
                [field]: ref.getFullValues()
              };
            });
            return (0, _objectSpread2.default)({}, fragmentsField, groupField, subFormField);
          });
          (0, _defineProperty2.default)(this, "setFullValues", async function () {
            let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            let maps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            const findGroups = field => (0, _values.default)(_this.groups).find(group => group.field === field);

            const findSubForms = field => (0, _values.default)(_this.subForms).find(subForm => subForm.field === field);

            const render = () => new _promise.default(r => _this.setState({}, () => r()));

            await (0, _util.mapObjectAsync)(values, async (field, value) => {
              const group = findGroups(field);
              const subForm = findSubForms(field);

              if (subForm) {
                const subFormMapObj = maps[field];
                const ref = subForm.ref;
                ref.setFullValues(value, subFormMapObj);
                return;
              }

              if (!group) {
                // fragment
                const _maps$field = maps[field],
                      mapFun = _maps$field === void 0 ? _ => _ : _maps$field;

                _this.store.update(field, {
                  value: mapFun(value)
                });

                return;
              }

              if (!(0, _isArray.default)(value) || value.length < 1) return; // delete IDList and add

              group.IDList = [...new Array(value.length)].map(() => _this.ID++); // render

              await render(); // group should mounted

              const IDRefMap = group.IDRefMap,
                    IDList = group.IDList,
                    formName = group.formName;
              IDList.forEach((ID, index) => {
                const _IDRefMap$ID = IDRefMap[ID],
                      _IDRefMap$ID2 = _IDRefMap$ID === void 0 ? {} : _IDRefMap$ID,
                      ref = _IDRefMap$ID2.ref;

                if (!ref) {
                  console.warn(`[dino-form] ${formName} should be mounted but the Ref is not registered, maybe you not render this group.`);
                  return;
                }

                const groupItemValue = value[index] || [];
                const _maps$field2 = maps[field],
                      fun = _maps$field2 === void 0 ? () => ({
                  mapObj: {},
                  props: {}
                }) : _maps$field2;

                const _fun = fun(groupItemValue),
                      _fun$mapObj = _fun.mapObj,
                      mapObj = _fun$mapObj === void 0 ? {} : _fun$mapObj,
                      _fun$props = _fun.props,
                      props = _fun$props === void 0 ? {} : _fun$props;

                IDRefMap[ID].props = props;
                ref.setFullValues(groupItemValue, mapObj);
              });
            });

            _this.setState({});
          });
          (0, _defineProperty2.default)(this, "verify", function () {
            let _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref9$first = _ref9.first,
                first = _ref9$first === void 0 ? false : _ref9$first,
                _ref9$scroll = _ref9.scroll,
                scroll = _ref9$scroll === void 0 ? true : _ref9$scroll;

            return _promise.default.resolve().then(async () => {
              let hasError = false;
              const fragmentsField = await (0, _util.mapObjectAsync)(_this.store.get(), async (field, scheme) => {
                const _scheme$rules = scheme.rules,
                      rules = _scheme$rules === void 0 ? [] : _scheme$rules,
                      isMount = scheme.isMount,
                      value = scheme.value,
                      label = scheme.label;

                if (!isMount) {
                  return {};
                }

                for (const rule of rules) {
                  const isPass = await rule.fun(value);

                  if (!isPass) {
                    hasError = true;
                    const error = rule.error({
                      label,
                      field
                    });

                    _this.setFieldsError({
                      [field]: error
                    });

                    break;
                  }
                }

                return {
                  [field]: value
                };
              });
              const groupField = await (0, _util.mapObjectAsync)(_this.groups, async (groupName, _ref10) => {
                let field = _ref10.field,
                    _ref10$IDRefMap = _ref10.IDRefMap,
                    IDRefMap = _ref10$IDRefMap === void 0 ? [] : _ref10$IDRefMap,
                    IDList = _ref10.IDList;
                const values = [];

                for (const ID of IDList) {
                  const result = await IDRefMap[ID].ref.verify();
                  if (result.hasError) hasError = true;
                  values.push(result.data);
                }

                return {
                  [field]: values
                };
              });
              const subFormField = await (0, _util.mapObjectAsync)(_this.subForms, async (formName, subForm) => {
                const ref = subForm.ref,
                      field = subForm.field;

                const _ref11 = await ref.verify(),
                      data = _ref11.data,
                      subFormHasError = _ref11.hasError;

                hasError = subFormHasError;
                return {
                  [field]: data
                };
              });
              return {
                hasError,
                data: (0, _objectSpread2.default)({}, fragmentsField, groupField, subFormField)
              };
            });
          });
          this.store = (0, _DinoFormStore.default)();
          this.subForms = (0, _DinoFormHelper.createDinoFormSubForm)(subForms);
          this.FromItem = (0, _DinoFormHelper.createFromItem)({
            createDinoFormApi: this.createDinoFormApi
          });
          this.fragments = (0, _DinoFormHelper.createFragments)({
            fragments,
            createDinoFormApi: this.createDinoFormApi
          });
          this.ID = 0;
          this.groups = this.createGroups(groups);
          this.state = {
            store: this.store,
            FromItem: this.FromItem,
            ID: this.ID,
            fragments: this.fragments,
            subForms: this.subForms,
            groups: this.groups
          };
        }

        render() {
          var _this2 = this;

          const _this$props = this.props,
                _this$props$catchRef = _this$props.catchRef,
                catchRef = _this$props$catchRef === void 0 ? () => {} : _this$props$catchRef,
                others = (0, _objectWithoutProperties2.default)(_this$props, ["catchRef"]);
          return _react.default.createElement(Wrap, (0, _extends2.default)({
            ref: catchRef,
            dinoForm: (0, _objectSpread2.default)({}, this.createDinoFormApi(), {
              renderDinoForm: function renderDinoForm() {
                let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return _react.default.createElement(View, (0, _extends2.default)({}, props, {
                  dinoForm: (0, _objectSpread2.default)({}, _this2.createDinoFormApi(), {
                    fragments: _this2.fragments,
                    groups: (0, _DinoFormHelper.groupsAPI)({
                      groups: _this2.groups,
                      render: _this2.topFormRender,
                      setID: () => _this2.ID,
                      getID: ID => {
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

      }, _temp;
    };
  };
}

var _default = createForm;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJXcmFwQ29tIiwiQ29tcG9uZW50IiwicmVuZGVyIiwicmVuZGVyRGlub0Zvcm0iLCJwcm9wcyIsImRpbm9Gb3JtIiwiY3JlYXRlRm9ybSIsImZyYWdtZW50cyIsImdyb3VwcyIsInN1YkZvcm1zIiwiY3JlYXRlIiwiVmlldyIsImJpbmRXcmFwIiwiV3JhcCIsIkRpbm9Gb3JtIiwiY29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvclByb3BzIiwiZ3JvdXBzT2JqIiwiZm9ybU5hbWUiLCJDb20iLCJmaWVsZCIsImNvdW50IiwiZm9ybVByb3BzIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJzZXRTdGF0ZSIsIkZyb21JdGVtIiwic2V0RmllbGRzVmFsdWUiLCJzZXRGdWxsVmFsdWVzIiwic2V0RmllbGRzRXJyb3IiLCJnZXRGdWxsVmFsdWVzIiwiZ2V0RmllbGRzVmFsdWUiLCJ2ZXJpZnkiLCJzdG9yZSIsImRpbm9Gb3JtUmVmIiwib2JqIiwiZm9yRWFjaCIsImVycm9yIiwidXBkYXRlIiwibmV3VmFsdWUiLCJmaWVsZHMiLCJzY2hlbWUiLCJnZXQiLCJvbmx5R2V0TW91bnQiLCJmcmFnbWVudHNGaWVsZCIsImlzTW91bnQiLCJncm91cEZpZWxkIiwiZ3JvdXBOYW1lIiwidmFsdWVzIiwicmVzdWx0IiwicmVmIiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJyIiwic3ViRm9ybU1hcE9iaiIsIm1hcEZ1biIsIl8iLCJsZW5ndGgiLCJpbmRleCIsImNvbnNvbGUiLCJ3YXJuIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJ0aGVuIiwiaGFzRXJyb3IiLCJydWxlcyIsImxhYmVsIiwicnVsZSIsImlzUGFzcyIsImRhdGEiLCJzdWJGb3JtSGFzRXJyb3IiLCJjcmVhdGVEaW5vRm9ybUFwaSIsImNyZWF0ZUdyb3VwcyIsInN0YXRlIiwiY2F0Y2hSZWYiLCJvdGhlcnMiLCJzZXRJRCIsImdldElEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQVNBOztBQUVBLE1BQU1BLE9BQU4sU0FBc0JDLGdCQUF0QixDQUFnQztBQUM5QkMsRUFBQUEsTUFBTSxHQUFHO0FBQUEsVUFDYUMsY0FEYixHQUNrQyxLQUFLQyxLQUR2QyxDQUNDQyxRQURELENBQ2FGLGNBRGI7QUFFUCxXQUFPQSxjQUFjLENBQUMsS0FBS0MsS0FBTixDQUFyQjtBQUNEOztBQUo2Qjs7QUFPaEMsU0FBU0UsVUFBVCxHQUlRO0FBQUEsaUZBQUosRUFBSTtBQUFBLDRCQUhOQyxTQUdNO0FBQUEsTUFITkEsU0FHTSwrQkFITSxFQUdOO0FBQUEseUJBRk5DLE1BRU07QUFBQSxNQUZOQSxNQUVNLDRCQUZHLEVBRUg7QUFBQSwyQkFETkMsUUFDTTtBQUFBLE1BRE5BLFFBQ00sOEJBREssRUFDTDs7QUFDTixTQUFPLFNBQVNDLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCO0FBQzNCLFdBQU8sU0FBU0MsUUFBVCxHQUFrQztBQUFBOztBQUFBLFVBQWhCQyxJQUFnQix1RUFBVGIsT0FBUztBQUN2QyxxQkFBTyxNQUFNYyxRQUFOLFNBQXVCYixnQkFBdkIsQ0FBaUM7QUFDdENjLFFBQUFBLFdBQVcsQ0FBQ0MsZ0JBQUQsRUFBbUI7QUFBQTs7QUFDNUIsZ0JBQU1BLGdCQUFOLENBRDRCO0FBQUE7QUFBQSw4REE0QmZDLFNBQVMsSUFBSSxxQkFBVUEsU0FBVixFQUFxQixVQUFDQyxRQUFELEVBRXRDO0FBQUEsNEZBQVAsRUFBTztBQUFBLGdCQURUQyxHQUNTLFNBRFRBLEdBQ1M7QUFBQSxnQkFESkMsS0FDSSxTQURKQSxLQUNJO0FBQUEsZ0JBREdDLEtBQ0gsU0FER0EsS0FDSDtBQUFBLHdDQURVQyxTQUNWO0FBQUEsZ0JBRFVBLFNBQ1YsZ0NBRHNCLEVBQ3RCOztBQUNULGtCQUFNQyxRQUFRLEdBQUcsRUFBakI7QUFDQSxrQkFBTUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJQyxLQUFKLENBQVVKLEtBQVYsQ0FBSixFQUFzQkssR0FBdEIsQ0FBMEIsTUFBTSxLQUFJLENBQUNDLEVBQUwsRUFBaEMsQ0FBZjtBQUNBLGtCQUFNQyxJQUFJLEdBQUcsNkNBQXdCO0FBQ25DQyxjQUFBQSxXQUFXLEVBQUUsQ0FBQ0YsRUFBRCxFQUFLRyxLQUFMLEtBQWU7QUFBRSxnQkFBQSxLQUFJLENBQUN0QixNQUFMLENBQVlVLFFBQVosRUFBc0JLLFFBQXRCLENBQStCSSxFQUEvQixJQUFxQ0csS0FBckM7QUFBNkMsZUFEeEM7QUFFbkNDLGNBQUFBLGFBQWEsRUFBRSxLQUFJLENBQUNBLGFBRmU7QUFHbkNaLGNBQUFBO0FBSG1DLGFBQXhCLENBQWI7QUFNQSxrQkFBTWEsS0FBSyxHQUFHO0FBQ1piLGNBQUFBLEdBRFk7QUFFWkMsY0FBQUEsS0FGWTtBQUdaRSxjQUFBQSxTQUhZO0FBSVpKLGNBQUFBLFFBSlk7QUFLWkssY0FBQUEsUUFMWTtBQU1aQyxjQUFBQSxNQU5ZO0FBT1pJLGNBQUFBO0FBUFksYUFBZDtBQVVBLG1CQUFRO0FBQ04sZUFBQ1YsUUFBRCxHQUFZYztBQUROLGFBQVI7QUFHRCxXQXhCMkIsQ0E1QkU7QUFBQSwrREFzRGQsTUFBTTtBQUNwQixnQkFBSSxLQUFLNUIsS0FBTCxDQUFXMkIsYUFBZixFQUE4QjtBQUM1QixxQkFBTyxLQUFLM0IsS0FBTCxDQUFXMkIsYUFBWCxFQUFQO0FBQ0Q7O0FBQ0QsbUJBQU8sS0FBS0UsUUFBTCxDQUFjLEVBQWQsQ0FBUDtBQUNELFdBM0Q2QjtBQUFBLG1FQTZEVixPQUFPO0FBQ3pCQyxZQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFEVTtBQUd6QkMsWUFBQUEsY0FBYyxFQUFFLEtBQUtBLGNBSEk7QUFJekJDLFlBQUFBLGFBQWEsRUFBRSxLQUFLQSxhQUpLO0FBS3pCQyxZQUFBQSxjQUFjLEVBQUUsS0FBS0EsY0FMSTtBQU96QkMsWUFBQUEsYUFBYSxFQUFFLEtBQUtBLGFBUEs7QUFRekJDLFlBQUFBLGNBQWMsRUFBRSxLQUFLQSxjQVJJO0FBVXpCQyxZQUFBQSxNQUFNLEVBQUUsS0FBS0EsTUFWWTtBQVd6QkMsWUFBQUEsS0FBSyxFQUFFLEtBQUtBLEtBWGE7QUFZekJDLFlBQUFBLFdBQVcsRUFBRTtBQVpZLFdBQVAsQ0E3RFU7QUFBQSxnRUE0RVpDLEdBQUQsSUFBUztBQUN4QixhQUFDLEdBQUcsc0JBQWVBLEdBQWYsQ0FBSixFQUF5QkMsT0FBekIsQ0FBaUMsV0FBb0I7QUFBQTtBQUFBLGtCQUFsQnhCLEtBQWtCO0FBQUEsa0JBQVh5QixLQUFXOztBQUNuRCxtQkFBS0osS0FBTCxDQUFXSyxNQUFYLENBQWtCMUIsS0FBbEIsRUFBeUI7QUFBRXlCLGdCQUFBQTtBQUFGLGVBQXpCO0FBQ0QsYUFGRDtBQUdBLGlCQUFLWixRQUFMLENBQWMsRUFBZDtBQUNELFdBakY2QjtBQUFBLGdFQW1GWlUsR0FBRCxJQUFTO0FBQ3hCLGFBQUMsR0FBRyxzQkFBZUEsR0FBZixDQUFKLEVBQXlCQyxPQUF6QixDQUFpQyxXQUF1QjtBQUFBO0FBQUEsa0JBQXJCeEIsS0FBcUI7QUFBQSxrQkFBZDJCLFFBQWM7O0FBQ3RELG1CQUFLTixLQUFMLENBQVdLLE1BQVgsQ0FBa0IxQixLQUFsQixFQUF5QjtBQUFFVSxnQkFBQUEsS0FBSyxFQUFFaUI7QUFBVCxlQUF6QjtBQUNELGFBRkQ7QUFJQSxpQkFBS2hCLGFBQUw7QUFDRCxXQXpGNkI7QUFBQSxnRUEyRmI7QUFBQSw4Q0FBSWlCLE1BQUo7QUFBSUEsY0FBQUEsTUFBSjtBQUFBOztBQUFBLG1CQUFlQSxNQUFNLENBQUN0QixHQUFQLENBQVlOLEtBQUQsSUFBVztBQUNwRCxvQkFBTTZCLE1BQU0sR0FBRyxLQUFJLENBQUNSLEtBQUwsQ0FBV1MsR0FBWCxDQUFlOUIsS0FBZixLQUF5QixFQUF4QztBQUNBLHFCQUFPNkIsTUFBTSxDQUFDbkIsS0FBZDtBQUNELGFBSCtCLENBQWY7QUFBQSxXQTNGYTtBQUFBLCtEQWdHZCxZQUFrQztBQUFBLDRGQUFQLEVBQU87QUFBQSwyQ0FBL0JxQixZQUErQjtBQUFBLGdCQUEvQkEsWUFBK0IsbUNBQWhCLElBQWdCOztBQUNoRCxrQkFBTUMsY0FBYyxHQUFHLHFCQUNyQixLQUFJLENBQUNYLEtBQUwsQ0FBV1MsR0FBWCxFQURxQixFQUVyQixDQUNFOUIsS0FERixFQUVFNkIsTUFGRixLQUdLO0FBQUEsb0JBQ0tJLE9BREwsR0FDd0JKLE1BRHhCLENBQ0tJLE9BREw7QUFBQSxvQkFDY3ZCLEtBRGQsR0FDd0JtQixNQUR4QixDQUNjbkIsS0FEZDtBQUVILHFCQUFPcUIsWUFBWSxHQUNmRSxPQUFPLEdBQUc7QUFBRSxpQkFBQ2pDLEtBQUQsR0FBU1U7QUFBWCxlQUFILEdBQXdCLEVBRGhCLEdBRWY7QUFBRSxpQkFBQ1YsS0FBRCxHQUFTVTtBQUFYLGVBRko7QUFHRCxhQVZvQixDQUF2QjtBQWFBLGtCQUFNd0IsVUFBVSxHQUFHLHFCQUNqQixLQUFJLENBQUM5QyxNQURZLEVBRWpCLENBQ0UrQyxTQURGLFlBTUs7QUFBQSxrQkFIRG5DLEtBR0MsU0FIREEsS0FHQztBQUFBLHlDQUZERyxRQUVDO0FBQUEsa0JBRkRBLFFBRUMsK0JBRlUsRUFFVjtBQUFBLGtCQUZjQyxNQUVkLFNBRmNBLE1BRWQ7QUFDSCxvQkFBTWdDLE1BQU0sR0FBRyxFQUFmOztBQUVBLG1CQUFLLE1BQU03QixFQUFYLElBQWlCSCxNQUFqQixFQUF5QjtBQUN2QixzQkFBTWlDLE1BQU0sR0FBR2xDLFFBQVEsQ0FBQ0ksRUFBRCxDQUFSLENBQWErQixHQUFiLENBQWlCcEIsYUFBakIsRUFBZjtBQUNBa0IsZ0JBQUFBLE1BQU0sQ0FBQ0csSUFBUCxDQUFZRixNQUFaO0FBQ0Q7O0FBRUQscUJBQU87QUFDTCxpQkFBQ3JDLEtBQUQsR0FBU29DO0FBREosZUFBUDtBQUdELGFBbkJnQixDQUFuQjtBQXNCQSxrQkFBTUksWUFBWSxHQUFHLHFCQUNuQixLQUFJLENBQUNuRCxRQURjLEVBRW5CLENBQUNTLFFBQUQsRUFBVzJDLE9BQVgsS0FBdUI7QUFBQSxvQkFDYkgsR0FEYSxHQUNFRyxPQURGLENBQ2JILEdBRGE7QUFBQSxvQkFDUnRDLEtBRFEsR0FDRXlDLE9BREYsQ0FDUnpDLEtBRFE7QUFFckIscUJBQU87QUFDTCxpQkFBQ0EsS0FBRCxHQUFTc0MsR0FBRyxDQUFDcEIsYUFBSjtBQURKLGVBQVA7QUFHRCxhQVBrQixDQUFyQjtBQVVBLG1EQUNLYyxjQURMLEVBRUtFLFVBRkwsRUFHS00sWUFITDtBQUtELFdBbko2QjtBQUFBLCtEQXFKZCxrQkFBa0M7QUFBQSxnQkFBM0JKLE1BQTJCLHVFQUFsQixFQUFrQjtBQUFBLGdCQUFkTSxJQUFjLHVFQUFQLEVBQU87O0FBQ2hELGtCQUFNQyxVQUFVLEdBQUczQyxLQUFLLElBQUkscUJBQzFCLEtBQUksQ0FBQ1osTUFEcUIsRUFFMUJ3RCxJQUYwQixDQUVyQmhDLEtBQUssSUFBSUEsS0FBSyxDQUFDWixLQUFOLEtBQWdCQSxLQUZKLENBQTVCOztBQUlBLGtCQUFNNkMsWUFBWSxHQUFHN0MsS0FBSyxJQUFJLHFCQUM1QixLQUFJLENBQUNYLFFBRHVCLEVBRTVCdUQsSUFGNEIsQ0FFdkJILE9BQU8sSUFBSUEsT0FBTyxDQUFDekMsS0FBUixLQUFrQkEsS0FGTixDQUE5Qjs7QUFJQSxrQkFBTWxCLE1BQU0sR0FBRyxNQUFNLHFCQUFZZ0UsQ0FBQyxJQUFJLEtBQUksQ0FBQ2pDLFFBQUwsQ0FBYyxFQUFkLEVBQWtCLE1BQU1pQyxDQUFDLEVBQXpCLENBQWpCLENBQXJCOztBQUVBLGtCQUFNLDBCQUFlVixNQUFmLEVBQXVCLE9BQU9wQyxLQUFQLEVBQWNVLEtBQWQsS0FBd0I7QUFDbkQsb0JBQU1FLEtBQUssR0FBRytCLFVBQVUsQ0FBQzNDLEtBQUQsQ0FBeEI7QUFDQSxvQkFBTXlDLE9BQU8sR0FBR0ksWUFBWSxDQUFDN0MsS0FBRCxDQUE1Qjs7QUFFQSxrQkFBSXlDLE9BQUosRUFBYTtBQUFBLHNCQUNNTSxhQUROLEdBQ3dCTCxJQUR4QixDQUNGMUMsS0FERTtBQUFBLHNCQUVIc0MsR0FGRyxHQUVLRyxPQUZMLENBRUhILEdBRkc7QUFHWEEsZ0JBQUFBLEdBQUcsQ0FBQ3RCLGFBQUosQ0FBa0JOLEtBQWxCLEVBQXlCcUMsYUFBekI7QUFDQTtBQUNEOztBQUVELGtCQUFJLENBQUNuQyxLQUFMLEVBQVk7QUFBRTtBQUFGLG9DQUMyQjhCLElBRDNCLENBQ0QxQyxLQURDO0FBQUEsc0JBQ09nRCxNQURQLDRCQUNnQkMsQ0FBQyxJQUFJQSxDQURyQjs7QUFFVixnQkFBQSxLQUFJLENBQUM1QixLQUFMLENBQVdLLE1BQVgsQ0FBa0IxQixLQUFsQixFQUF5QjtBQUFFVSxrQkFBQUEsS0FBSyxFQUFFc0MsTUFBTSxDQUFDdEMsS0FBRDtBQUFmLGlCQUF6Qjs7QUFDQTtBQUNEOztBQUVELGtCQUFJLENBQUMsc0JBQWNBLEtBQWQsQ0FBRCxJQUF5QkEsS0FBSyxDQUFDd0MsTUFBTixHQUFlLENBQTVDLEVBQStDLE9BakJJLENBbUJuRDs7QUFDQXRDLGNBQUFBLEtBQUssQ0FBQ1IsTUFBTixHQUFlLENBQUMsR0FBRyxJQUFJQyxLQUFKLENBQVVLLEtBQUssQ0FBQ3dDLE1BQWhCLENBQUosRUFBNkI1QyxHQUE3QixDQUFpQyxNQUFNLEtBQUksQ0FBQ0MsRUFBTCxFQUF2QyxDQUFmLENBcEJtRCxDQXNCbkQ7O0FBQ0Esb0JBQU16QixNQUFNLEVBQVosQ0F2Qm1ELENBeUJuRDs7QUF6Qm1ELG9CQTBCM0NxQixRQTFCMkMsR0EwQlpTLEtBMUJZLENBMEIzQ1QsUUExQjJDO0FBQUEsb0JBMEJqQ0MsTUExQmlDLEdBMEJaUSxLQTFCWSxDQTBCakNSLE1BMUJpQztBQUFBLG9CQTBCekJOLFFBMUJ5QixHQTBCWmMsS0ExQlksQ0EwQnpCZCxRQTFCeUI7QUE0Qm5ETSxjQUFBQSxNQUFNLENBQUNvQixPQUFQLENBQWUsQ0FBQ2pCLEVBQUQsRUFBSzRDLEtBQUwsS0FBZTtBQUFBLHFDQUt4QmhELFFBTHdCLENBRXpCSSxFQUZ5QjtBQUFBLGdFQUl0QixFQUpzQjtBQUFBLHNCQUd4QitCLEdBSHdCLGlCQUd4QkEsR0FId0I7O0FBTzVCLG9CQUFJLENBQUNBLEdBQUwsRUFBVTtBQUNSYyxrQkFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWMsZUFBY3ZELFFBQVMsb0ZBQXJDO0FBQ0E7QUFDRDs7QUFFRCxzQkFBTXdELGNBQWMsR0FBRzVDLEtBQUssQ0FBQ3lDLEtBQUQsQ0FBTCxJQUFnQixFQUF2QztBQVo0QixxQ0FrQnhCVCxJQWxCd0IsQ0FjekIxQyxLQWR5QjtBQUFBLHNCQWNqQnVELEdBZGlCLDZCQWNYLE9BQU87QUFDcEJDLGtCQUFBQSxNQUFNLEVBQUUsRUFEWTtBQUVwQnhFLGtCQUFBQSxLQUFLLEVBQUU7QUFGYSxpQkFBUCxDQWRXOztBQUFBLDZCQW9CUXVFLEdBQUcsQ0FBQ0QsY0FBRCxDQXBCWDtBQUFBLHlDQW9CcEJFLE1BcEJvQjtBQUFBLHNCQW9CcEJBLE1BcEJvQiw0QkFvQlgsRUFwQlc7QUFBQSx3Q0FvQlB4RSxLQXBCTztBQUFBLHNCQW9CUEEsS0FwQk8sMkJBb0JDLEVBcEJEOztBQXNCNUJtQixnQkFBQUEsUUFBUSxDQUFDSSxFQUFELENBQVIsQ0FBYXZCLEtBQWIsR0FBcUJBLEtBQXJCO0FBRUFzRCxnQkFBQUEsR0FBRyxDQUFDdEIsYUFBSixDQUFrQnNDLGNBQWxCLEVBQWtDRSxNQUFsQztBQUNELGVBekJEO0FBMEJELGFBdERLLENBQU47O0FBd0RBLFlBQUEsS0FBSSxDQUFDM0MsUUFBTCxDQUFjLEVBQWQ7QUFDRCxXQXpONkI7QUFBQSx3REEyTnJCO0FBQUEsNEZBR0wsRUFISztBQUFBLG9DQUNQNEMsS0FETztBQUFBLGdCQUNQQSxLQURPLDRCQUNDLEtBREQ7QUFBQSxxQ0FFUEMsTUFGTztBQUFBLGdCQUVQQSxNQUZPLDZCQUVFLElBRkY7O0FBQUEsbUJBSVAsaUJBQVFDLE9BQVIsR0FBa0JDLElBQWxCLENBQXVCLFlBQVk7QUFDakMsa0JBQUlDLFFBQVEsR0FBRyxLQUFmO0FBQ0Esb0JBQU03QixjQUFjLEdBQUcsTUFBTSwwQkFDM0IsS0FBSSxDQUFDWCxLQUFMLENBQVdTLEdBQVgsRUFEMkIsRUFFM0IsT0FDRTlCLEtBREYsRUFFRTZCLE1BRkYsS0FFYTtBQUFBLHNDQUdQQSxNQUhPLENBRVRpQyxLQUZTO0FBQUEsc0JBRVRBLEtBRlMsOEJBRUQsRUFGQztBQUFBLHNCQUVHN0IsT0FGSCxHQUdQSixNQUhPLENBRUdJLE9BRkg7QUFBQSxzQkFFWXZCLEtBRlosR0FHUG1CLE1BSE8sQ0FFWW5CLEtBRlo7QUFBQSxzQkFFbUJxRCxLQUZuQixHQUdQbEMsTUFITyxDQUVtQmtDLEtBRm5COztBQUlYLG9CQUFJLENBQUM5QixPQUFMLEVBQWM7QUFBRSx5QkFBTyxFQUFQO0FBQVk7O0FBRTVCLHFCQUFLLE1BQU0rQixJQUFYLElBQW1CRixLQUFuQixFQUEwQjtBQUN4Qix3QkFBTUcsTUFBTSxHQUFHLE1BQU1ELElBQUksQ0FBQ1QsR0FBTCxDQUFTN0MsS0FBVCxDQUFyQjs7QUFDQSxzQkFBSSxDQUFDdUQsTUFBTCxFQUFhO0FBQ1hKLG9CQUFBQSxRQUFRLEdBQUcsSUFBWDtBQUNBLDBCQUFNcEMsS0FBSyxHQUFHdUMsSUFBSSxDQUFDdkMsS0FBTCxDQUFXO0FBQUVzQyxzQkFBQUEsS0FBRjtBQUFTL0Qsc0JBQUFBO0FBQVQscUJBQVgsQ0FBZDs7QUFDQSxvQkFBQSxLQUFJLENBQUNpQixjQUFMLENBQW9CO0FBQUUsdUJBQUNqQixLQUFELEdBQVN5QjtBQUFYLHFCQUFwQjs7QUFDQTtBQUNEO0FBQ0Y7O0FBRUQsdUJBQU87QUFBRSxtQkFBQ3pCLEtBQUQsR0FBU1U7QUFBWCxpQkFBUDtBQUNELGVBckIwQixDQUE3QjtBQXdCQSxvQkFBTXdCLFVBQVUsR0FBRyxNQUFNLDBCQUN2QixLQUFJLENBQUM5QyxNQURrQixFQUV2QixPQUNFK0MsU0FERixhQUtRO0FBQUEsb0JBRkpuQyxLQUVJLFVBRkpBLEtBRUk7QUFBQSw2Q0FESkcsUUFDSTtBQUFBLG9CQURKQSxRQUNJLGdDQURPLEVBQ1A7QUFBQSxvQkFEV0MsTUFDWCxVQURXQSxNQUNYO0FBQ04sc0JBQU1nQyxNQUFNLEdBQUcsRUFBZjs7QUFFQSxxQkFBSyxNQUFNN0IsRUFBWCxJQUFpQkgsTUFBakIsRUFBeUI7QUFDdkIsd0JBQU1pQyxNQUFNLEdBQUcsTUFBTWxDLFFBQVEsQ0FBQ0ksRUFBRCxDQUFSLENBQWErQixHQUFiLENBQWlCbEIsTUFBakIsRUFBckI7QUFDQSxzQkFBSWlCLE1BQU0sQ0FBQ3dCLFFBQVgsRUFBcUJBLFFBQVEsR0FBRyxJQUFYO0FBQ3JCekIsa0JBQUFBLE1BQU0sQ0FBQ0csSUFBUCxDQUFZRixNQUFNLENBQUM2QixJQUFuQjtBQUNEOztBQUVELHVCQUFPO0FBQ0wsbUJBQUNsRSxLQUFELEdBQVNvQztBQURKLGlCQUFQO0FBR0QsZUFuQnNCLENBQXpCO0FBc0JBLG9CQUFNSSxZQUFZLEdBQUcsTUFBTSwwQkFDekIsS0FBSSxDQUFDbkQsUUFEb0IsRUFFekIsT0FBT1MsUUFBUCxFQUFpQjJDLE9BQWpCLEtBQTZCO0FBQUEsc0JBQ25CSCxHQURtQixHQUNKRyxPQURJLENBQ25CSCxHQURtQjtBQUFBLHNCQUNkdEMsS0FEYyxHQUNKeUMsT0FESSxDQUNkekMsS0FEYzs7QUFBQSwrQkFFaUIsTUFBTXNDLEdBQUcsQ0FBQ2xCLE1BQUosRUFGdkI7QUFBQSxzQkFFbkI4QyxJQUZtQixVQUVuQkEsSUFGbUI7QUFBQSxzQkFFSEMsZUFGRyxVQUViTixRQUZhOztBQUczQkEsZ0JBQUFBLFFBQVEsR0FBR00sZUFBWDtBQUNBLHVCQUFPO0FBQ0wsbUJBQUNuRSxLQUFELEdBQVNrRTtBQURKLGlCQUFQO0FBR0QsZUFUd0IsQ0FBM0I7QUFZQSxxQkFBTztBQUNMTCxnQkFBQUEsUUFESztBQUVMSyxnQkFBQUEsSUFBSSxrQ0FDQ2xDLGNBREQsRUFFQ0UsVUFGRCxFQUdDTSxZQUhEO0FBRkMsZUFBUDtBQVFELGFBcEVELENBSk87QUFBQSxXQTNOcUI7QUFHNUIsZUFBS25CLEtBQUwsR0FBYSw2QkFBYjtBQUNBLGVBQUtoQyxRQUFMLEdBQWdCLDJDQUFzQkEsUUFBdEIsQ0FBaEI7QUFFQSxlQUFLeUIsUUFBTCxHQUFnQixvQ0FBZTtBQUM3QnNELFlBQUFBLGlCQUFpQixFQUFFLEtBQUtBO0FBREssV0FBZixDQUFoQjtBQUlBLGVBQUtqRixTQUFMLEdBQWlCLHFDQUFnQjtBQUMvQkEsWUFBQUEsU0FEK0I7QUFFL0JpRixZQUFBQSxpQkFBaUIsRUFBRSxLQUFLQTtBQUZPLFdBQWhCLENBQWpCO0FBS0EsZUFBSzdELEVBQUwsR0FBVSxDQUFWO0FBQ0EsZUFBS25CLE1BQUwsR0FBYyxLQUFLaUYsWUFBTCxDQUFrQmpGLE1BQWxCLENBQWQ7QUFFQSxlQUFLa0YsS0FBTCxHQUFhO0FBQ1hqRCxZQUFBQSxLQUFLLEVBQUUsS0FBS0EsS0FERDtBQUVYUCxZQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFGSjtBQUdYUCxZQUFBQSxFQUFFLEVBQUUsS0FBS0EsRUFIRTtBQUlYcEIsWUFBQUEsU0FBUyxFQUFFLEtBQUtBLFNBSkw7QUFLWEUsWUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBTEo7QUFNWEQsWUFBQUEsTUFBTSxFQUFFLEtBQUtBO0FBTkYsV0FBYjtBQVFEOztBQTZRRE4sUUFBQUEsTUFBTSxHQUFHO0FBQUE7O0FBQUEsOEJBQ29DLEtBQUtFLEtBRHpDO0FBQUEsbURBQ0N1RixRQUREO0FBQUEsZ0JBQ0NBLFFBREQscUNBQ1ksTUFBTSxDQUFFLENBRHBCO0FBQUEsZ0JBQ3lCQyxNQUR6QjtBQUVQLGlCQUNFLDZCQUFDLElBQUQ7QUFDRSxZQUFBLEdBQUcsRUFBR0QsUUFEUjtBQUVFLFlBQUEsUUFBUSxrQ0FDSCxLQUFLSCxpQkFBTCxFQURHO0FBRU5yRixjQUFBQSxjQUFjLEVBQUU7QUFBQSxvQkFBQ0MsS0FBRCx1RUFBUyxFQUFUO0FBQUEsdUJBQ2QsNkJBQUMsSUFBRCw2QkFDT0EsS0FEUDtBQUVFLGtCQUFBLFFBQVEsa0NBQ0gsTUFBSSxDQUFDb0YsaUJBQUwsRUFERztBQUVOakYsb0JBQUFBLFNBQVMsRUFBRSxNQUFJLENBQUNBLFNBRlY7QUFHTkMsb0JBQUFBLE1BQU0sRUFBRSwrQkFBVTtBQUNoQkEsc0JBQUFBLE1BQU0sRUFBRSxNQUFJLENBQUNBLE1BREc7QUFFaEJOLHNCQUFBQSxNQUFNLEVBQUUsTUFBSSxDQUFDNkIsYUFGRztBQUdoQjhELHNCQUFBQSxLQUFLLEVBQUUsTUFBTSxNQUFJLENBQUNsRSxFQUhGO0FBSWhCbUUsc0JBQUFBLEtBQUssRUFBR25FLEVBQUQsSUFBUTtBQUFFLHdCQUFBLE1BQUksQ0FBQ0EsRUFBTCxHQUFVQSxFQUFWO0FBQWU7QUFKaEIscUJBQVYsQ0FIRjtBQVNObEIsb0JBQUFBLFFBQVEsRUFBRSxpQ0FBWTtBQUFFQSxzQkFBQUEsUUFBUSxFQUFFLE1BQUksQ0FBQ0E7QUFBakIscUJBQVo7QUFUSjtBQUZWLG1CQURjO0FBQUE7QUFGVjtBQUZWLGFBcUJPbUYsTUFyQlAsRUFERjtBQXlCRDs7QUFuVXFDLE9BQXhDO0FBcVVELEtBdFVEO0FBdVVELEdBeFVEO0FBeVVEOztlQUVjdEYsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlRGlub0Zvcm1TdG9yZSBmcm9tICcuL0Rpbm9Gb3JtU3RvcmUuanMnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRnJvbUl0ZW0sXG4gIGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSxcbiAgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAsXG4gIGNyZWF0ZUZyYWdtZW50cyxcbiAgZ3JvdXBzQVBJLFxuICBzdWJGb3Jtc0FQSSxcbn0gZnJvbSAnLi9EaW5vRm9ybUhlbHBlci5qc3gnO1xuXG5pbXBvcnQgeyBtYXBPYmplY3QsIG1hcE9iamVjdEFzeW5jIH0gZnJvbSAnLi91dGlsLmpzJztcblxuY2xhc3MgV3JhcENvbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRpbm9Gb3JtOiB7IHJlbmRlckRpbm9Gb3JtIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtKHRoaXMucHJvcHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oe1xuICBmcmFnbWVudHMgPSB7fSxcbiAgZ3JvdXBzID0ge30sXG4gIHN1YkZvcm1zID0ge30sXG59ID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZShWaWV3KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJpbmRXcmFwKFdyYXAgPSBXcmFwQ29tKSB7XG4gICAgICByZXR1cm4gY2xhc3MgRGlub0Zvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb25zdHJ1Y3RvclByb3BzKSB7XG4gICAgICAgICAgc3VwZXIoY29uc3RydWN0b3JQcm9wcyk7XG5cbiAgICAgICAgICB0aGlzLnN0b3JlID0gY3JlYXRlRGlub0Zvcm1TdG9yZSgpO1xuICAgICAgICAgIHRoaXMuc3ViRm9ybXMgPSBjcmVhdGVEaW5vRm9ybVN1YkZvcm0oc3ViRm9ybXMpO1xuXG4gICAgICAgICAgdGhpcy5Gcm9tSXRlbSA9IGNyZWF0ZUZyb21JdGVtKHtcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5mcmFnbWVudHMgPSBjcmVhdGVGcmFnbWVudHMoe1xuICAgICAgICAgICAgZnJhZ21lbnRzLFxuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLklEID0gMDtcbiAgICAgICAgICB0aGlzLmdyb3VwcyA9IHRoaXMuY3JlYXRlR3JvdXBzKGdyb3Vwcyk7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcbiAgICAgICAgICAgIElEOiB0aGlzLklELFxuICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgIHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlR3JvdXBzID0gZ3JvdXBzT2JqID0+IG1hcE9iamVjdChncm91cHNPYmosIChmb3JtTmFtZSwge1xuICAgICAgICAgIENvbSwgZmllbGQsIGNvdW50LCBmb3JtUHJvcHMgPSB7fSxcbiAgICAgICAgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgSURSZWZNYXAgPSB7fTtcbiAgICAgICAgICBjb25zdCBJRExpc3QgPSBbLi4ubmV3IEFycmF5KGNvdW50KV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG4gICAgICAgICAgY29uc3QgRm9ybSA9IGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwKHtcbiAgICAgICAgICAgIHNldElEUmVmTWFwOiAoSUQsIHZhbHVlKSA9PiB7IHRoaXMuZ3JvdXBzW2Zvcm1OYW1lXS5JRFJlZk1hcFtJRF0gPSB2YWx1ZTsgfSxcbiAgICAgICAgICAgIHRvcEZvcm1SZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwID0ge1xuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICBmb3JtUHJvcHMsXG4gICAgICAgICAgICBmb3JtTmFtZSxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBbZm9ybU5hbWVdOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0b3BGb3JtUmVuZGVyID0gKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGkgPSAoKSA9PiAoe1xuICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuXG4gICAgICAgICAgc2V0RmllbGRzVmFsdWU6IHRoaXMuc2V0RmllbGRzVmFsdWUsXG4gICAgICAgICAgc2V0RnVsbFZhbHVlczogdGhpcy5zZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIHNldEZpZWxkc0Vycm9yOiB0aGlzLnNldEZpZWxkc0Vycm9yLFxuXG4gICAgICAgICAgZ2V0RnVsbFZhbHVlczogdGhpcy5nZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIGdldEZpZWxkc1ZhbHVlOiB0aGlzLmdldEZpZWxkc1ZhbHVlLFxuXG4gICAgICAgICAgdmVyaWZ5OiB0aGlzLnZlcmlmeSxcbiAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICBkaW5vRm9ybVJlZjogdGhpcyxcbiAgICAgICAgfSlcblxuICAgICAgICBzZXRGaWVsZHNFcnJvciA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBlcnJvcl0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IGVycm9yIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RmllbGRzVmFsdWUgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgbmV3VmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbmV3VmFsdWUgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnRvcEZvcm1SZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlID0gKC4uLmZpZWxkcykgPT4gZmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWUgPSB0aGlzLnN0b3JlLmdldChmaWVsZCkgfHwge307XG4gICAgICAgICAgcmV0dXJuIHNjaGVtZS52YWx1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICBnZXRGdWxsVmFsdWVzID0gKHsgb25seUdldE1vdW50ID0gdHJ1ZSB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZ2V0KCksXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICBzY2hlbWUsXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyBpc01vdW50LCB2YWx1ZSB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICByZXR1cm4gb25seUdldE1vdW50XG4gICAgICAgICAgICAgICAgPyBpc01vdW50ID8geyBbZmllbGRdOiB2YWx1ZSB9IDoge31cbiAgICAgICAgICAgICAgICA6IHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgSURSZWZNYXAgPSBbXSwgSURMaXN0LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgIGZvciAoY29uc3QgSUQgb2YgSURMaXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSURSZWZNYXBbSURdLnJlZi5nZXRGdWxsVmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiwgZmllbGQgfSA9IHN1YkZvcm07XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogcmVmLmdldEZ1bGxWYWx1ZXMoKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZ1bGxWYWx1ZXMgPSBhc3luYyAodmFsdWVzID0ge30sIG1hcHMgPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbmRHcm91cHMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgKS5maW5kKGdyb3VwID0+IGdyb3VwLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCBmaW5kU3ViRm9ybXMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICApLmZpbmQoc3ViRm9ybSA9PiBzdWJGb3JtLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZShyID0+IHRoaXMuc2V0U3RhdGUoe30sICgpID0+IHIoKSkpO1xuXG4gICAgICAgICAgYXdhaXQgbWFwT2JqZWN0QXN5bmModmFsdWVzLCBhc3luYyAoZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpbmRHcm91cHMoZmllbGQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybSA9IGZpbmRTdWJGb3JtcyhmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmIChzdWJGb3JtKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogc3ViRm9ybU1hcE9iaiB9ID0gbWFwcztcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYgfSA9IHN1YkZvcm07XG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKHZhbHVlLCBzdWJGb3JtTWFwT2JqKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdyb3VwKSB7IC8vIGZyYWdtZW50XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogbWFwRnVuID0gXyA9PiBfIH0gPSBtYXBzO1xuICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbWFwRnVuKHZhbHVlKSB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA8IDEpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZGVsZXRlIElETGlzdCBhbmQgYWRkXG4gICAgICAgICAgICBncm91cC5JRExpc3QgPSBbLi4ubmV3IEFycmF5KHZhbHVlLmxlbmd0aCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuXG4gICAgICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgICAgIGF3YWl0IHJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIElETGlzdC5mb3JFYWNoKChJRCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIFtJRF06IHtcbiAgICAgICAgICAgICAgICAgIHJlZixcbiAgICAgICAgICAgICAgICB9ID0ge30sXG4gICAgICAgICAgICAgIH0gPSBJRFJlZk1hcDtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gJHtmb3JtTmFtZX0gc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgZ3JvdXAuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJdGVtVmFsdWUgPSB2YWx1ZVtpbmRleF0gfHwgW107XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiBmdW4gPSAoKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgbWFwT2JqOiB7fSxcbiAgICAgICAgICAgICAgICAgIHByb3BzOiB7fSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgfSA9IG1hcHM7XG5cbiAgICAgICAgICAgICAgY29uc3QgeyBtYXBPYmogPSB7fSwgcHJvcHMgPSB7fSB9ID0gZnVuKGdyb3VwSXRlbVZhbHVlKTtcblxuICAgICAgICAgICAgICBJRFJlZk1hcFtJRF0ucHJvcHMgPSBwcm9wcztcblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyhncm91cEl0ZW1WYWx1ZSwgbWFwT2JqKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19