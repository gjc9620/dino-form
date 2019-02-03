import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties";
import _Array$isArray from "@babel/runtime-corejs2/core-js/array/is-array";
import _Promise from "@babel/runtime-corejs2/core-js/promise";
import _Object$values from "@babel/runtime-corejs2/core-js/object/values";
import _objectSpread from "@babel/runtime-corejs2/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime-corejs2/helpers/esm/slicedToArray";
import _Object$entries from "@babel/runtime-corejs2/core-js/object/entries";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import React, { Component } from 'react';
import createDinoFormStore from './DinoFormStore';
import { createFromItem, createDinoFormSubForm, createDinoFormGroupWrap, createFragments, groupsAPI, subFormsAPI } from './DinoFormHelper';
import { mapObject, mapObjectAsync } from './util';

class WrapCom extends Component {
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
      return _temp = class DinoForm extends Component {
        constructor(constructorProps) {
          var _this;

          super(constructorProps);
          _this = this;

          _defineProperty(this, "createGroups", groupsObj => mapObject(groupsObj, function (formName) {
            let _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                Com = _ref2.Com,
                field = _ref2.field,
                count = _ref2.count,
                _ref2$formProps = _ref2.formProps,
                formProps = _ref2$formProps === void 0 ? {} : _ref2$formProps;

            const IDRefMap = {};
            const IDList = [...new Array(count)].map(() => _this.ID++);
            const Form = createDinoFormGroupWrap({
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

          _defineProperty(this, "topFormRender", () => {
            if (this.props.topFormRender) {
              return this.props.topFormRender();
            }

            return this.setState({});
          });

          _defineProperty(this, "createDinoFormApi", () => ({
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

          _defineProperty(this, "setFieldsError", obj => {
            [..._Object$entries(obj)].forEach((_ref3) => {
              let _ref4 = _slicedToArray(_ref3, 2),
                  field = _ref4[0],
                  error = _ref4[1];

              this.store.update(field, {
                error
              });
            });
            this.setState({});
          });

          _defineProperty(this, "setFieldsValue", obj => {
            [..._Object$entries(obj)].forEach((_ref5) => {
              let _ref6 = _slicedToArray(_ref5, 2),
                  field = _ref6[0],
                  newValue = _ref6[1];

              this.store.update(field, {
                value: newValue
              });
            });
            this.topFormRender();
          });

          _defineProperty(this, "getFieldsValue", function () {
            for (var _len = arguments.length, fields = new Array(_len), _key = 0; _key < _len; _key++) {
              fields[_key] = arguments[_key];
            }

            return fields.map(field => {
              const scheme = _this.store.get(field) || {};
              return scheme.value;
            });
          });

          _defineProperty(this, "getFullValues", function () {
            let _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref7$onlyGetMount = _ref7.onlyGetMount,
                onlyGetMount = _ref7$onlyGetMount === void 0 ? true : _ref7$onlyGetMount;

            const fragmentsField = mapObject(_this.store.get(), (field, scheme) => {
              const isMount = scheme.isMount,
                    value = scheme.value;
              return onlyGetMount ? isMount ? {
                [field]: value
              } : {} : {
                [field]: value
              };
            });
            const groupField = mapObject(_this.groups, (groupName, _ref8) => {
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
            const subFormField = mapObject(_this.subForms, (formName, subForm) => {
              const ref = subForm.ref,
                    field = subForm.field;
              return {
                [field]: ref.getFullValues()
              };
            });
            return _objectSpread({}, fragmentsField, groupField, subFormField);
          });

          _defineProperty(this, "setFullValues", async function () {
            let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            let maps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            debugger;

            const findGroups = field => _Object$values(_this.groups).find(group => group.field === field);

            const findSubForms = field => _Object$values(_this.subForms).find(subForm => subForm.field === field);

            const render = () => new _Promise(r => _this.setState({}, () => r()));

            await mapObjectAsync(values, async (field, value) => {
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
                debugger;

                _this.store.update(field, {
                  value: mapFun(value)
                });

                return;
              }

              if (!_Array$isArray(value) || value.length < 1) return; // delete IDList and add

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

          _defineProperty(this, "verify", function () {
            let _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref9$first = _ref9.first,
                first = _ref9$first === void 0 ? false : _ref9$first,
                _ref9$scroll = _ref9.scroll,
                scroll = _ref9$scroll === void 0 ? true : _ref9$scroll;

            return _Promise.resolve().then(async () => {
              let hasError = false;
              const fragmentsField = await mapObjectAsync(_this.store.get(), async (field, scheme) => {
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
              const groupField = await mapObjectAsync(_this.groups, async (groupName, _ref10) => {
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
              const subFormField = await mapObjectAsync(_this.subForms, async (formName, subForm) => {
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
                data: _objectSpread({}, fragmentsField, groupField, subFormField)
              };
            });
          });

          this.store = createDinoFormStore();
          this.subForms = createDinoFormSubForm(subForms);
          this.FromItem = createFromItem({
            createDinoFormApi: this.createDinoFormApi
          });
          this.fragments = createFragments({
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
                others = _objectWithoutProperties(_this$props, ["catchRef"]);

          return React.createElement(Wrap, _extends({
            ref: catchRef,
            dinoForm: _objectSpread({}, this.createDinoFormApi(), {
              renderDinoForm: function renderDinoForm() {
                let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return React.createElement(View, _extends({}, props, {
                  dinoForm: _objectSpread({}, _this2.createDinoFormApi(), {
                    fragments: _this2.fragments,
                    groups: groupsAPI({
                      groups: _this2.groups,
                      render: _this2.topFormRender,
                      getID: () => _this2.ID,
                      setID: ID => {
                        _this2.ID = ID;
                      }
                    }),
                    subForms: subFormsAPI({
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

export default createForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJtYXBPYmplY3QiLCJtYXBPYmplY3RBc3luYyIsIldyYXBDb20iLCJyZW5kZXIiLCJyZW5kZXJEaW5vRm9ybSIsInByb3BzIiwiZGlub0Zvcm0iLCJjcmVhdGVGb3JtIiwiZnJhZ21lbnRzIiwiZ3JvdXBzIiwic3ViRm9ybXMiLCJjcmVhdGUiLCJWaWV3IiwiYmluZFdyYXAiLCJXcmFwIiwiRGlub0Zvcm0iLCJjb25zdHJ1Y3RvciIsImNvbnN0cnVjdG9yUHJvcHMiLCJncm91cHNPYmoiLCJmb3JtTmFtZSIsIkNvbSIsImZpZWxkIiwiY291bnQiLCJmb3JtUHJvcHMiLCJJRFJlZk1hcCIsIklETGlzdCIsIkFycmF5IiwibWFwIiwiSUQiLCJGb3JtIiwic2V0SURSZWZNYXAiLCJ2YWx1ZSIsInRvcEZvcm1SZW5kZXIiLCJncm91cCIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImZyYWdtZW50c0ZpZWxkIiwiaXNNb3VudCIsImdyb3VwRmllbGQiLCJncm91cE5hbWUiLCJ2YWx1ZXMiLCJyZXN1bHQiLCJyZWYiLCJwdXNoIiwic3ViRm9ybUZpZWxkIiwic3ViRm9ybSIsIm1hcHMiLCJmaW5kR3JvdXBzIiwiZmluZCIsImZpbmRTdWJGb3JtcyIsInIiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiY29uc29sZSIsIndhcm4iLCJncm91cEl0ZW1WYWx1ZSIsImZ1biIsIm1hcE9iaiIsImZpcnN0Iiwic2Nyb2xsIiwicmVzb2x2ZSIsInRoZW4iLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MsaUJBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixRQU9PLGtCQVBQO0FBU0EsU0FBU0MsU0FBVCxFQUFvQkMsY0FBcEIsUUFBMEMsUUFBMUM7O0FBRUEsTUFBTUMsT0FBTixTQUFzQlYsU0FBdEIsQ0FBZ0M7QUFDOUJXLEVBQUFBLE1BQU0sR0FBRztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsV0FBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7QUFKNkI7O0FBT2hDLFNBQVNFLFVBQVQsR0FJUTtBQUFBLGlGQUFKLEVBQUk7QUFBQSw0QkFITkMsU0FHTTtBQUFBLE1BSE5BLFNBR00sK0JBSE0sRUFHTjtBQUFBLHlCQUZOQyxNQUVNO0FBQUEsTUFGTkEsTUFFTSw0QkFGRyxFQUVIO0FBQUEsMkJBRE5DLFFBQ007QUFBQSxNQUROQSxRQUNNLDhCQURLLEVBQ0w7O0FBQ04sU0FBTyxTQUFTQyxNQUFULENBQWdCQyxJ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bnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVEaW5vRm9ybVN0b3JlIGZyb20gJy4vRGlub0Zvcm1TdG9yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVGcm9tSXRlbSxcbiAgY3JlYXRlRGlub0Zvcm1TdWJGb3JtLFxuICBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCxcbiAgY3JlYXRlRnJhZ21lbnRzLFxuICBncm91cHNBUEksXG4gIHN1YkZvcm1zQVBJLFxufSBmcm9tICcuL0Rpbm9Gb3JtSGVscGVyJztcblxuaW1wb3J0IHsgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYyB9IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIFdyYXBDb20gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaW5vRm9ybTogeyByZW5kZXJEaW5vRm9ybSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybSh0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKHtcbiAgZnJhZ21lbnRzID0ge30sXG4gIGdyb3VwcyA9IHt9LFxuICBzdWJGb3JtcyA9IHt9LFxufSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGUoVmlldykge1xuICAgIHJldHVybiBmdW5jdGlvbiBiaW5kV3JhcChXcmFwID0gV3JhcENvbSkge1xuICAgICAgcmV0dXJuIGNsYXNzIERpbm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RydWN0b3JQcm9wcykge1xuICAgICAgICAgIHN1cGVyKGNvbnN0cnVjdG9yUHJvcHMpO1xuXG4gICAgICAgICAgdGhpcy5zdG9yZSA9IGNyZWF0ZURpbm9Gb3JtU3RvcmUoKTtcbiAgICAgICAgICB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHN1YkZvcm1zKTtcblxuICAgICAgICAgIHRoaXMuRnJvbUl0ZW0gPSBjcmVhdGVGcm9tSXRlbSh7XG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gY3JlYXRlRnJhZ21lbnRzKHtcbiAgICAgICAgICAgIGZyYWdtZW50cyxcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5JRCA9IDA7XG4gICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmNyZWF0ZUdyb3Vwcyhncm91cHMpO1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG4gICAgICAgICAgICBJRDogdGhpcy5JRCxcbiAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUdyb3VwcyA9IGdyb3Vwc09iaiA9PiBtYXBPYmplY3QoZ3JvdXBzT2JqLCAoZm9ybU5hbWUsIHtcbiAgICAgICAgICBDb20sIGZpZWxkLCBjb3VudCwgZm9ybVByb3BzID0ge30sXG4gICAgICAgIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IElEUmVmTWFwID0ge307XG4gICAgICAgICAgY29uc3QgSURMaXN0ID0gWy4uLm5ldyBBcnJheShjb3VudCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuICAgICAgICAgIGNvbnN0IEZvcm0gPSBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCh7XG4gICAgICAgICAgICBzZXRJRFJlZk1hcDogKElELCB2YWx1ZSkgPT4geyB0aGlzLmdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdID0gdmFsdWU7IH0sXG4gICAgICAgICAgICB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBncm91cCA9IHtcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgICAgZm9ybU5hbWUsXG4gICAgICAgICAgICBJRFJlZk1hcCxcbiAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgIEZvcm0sXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgW2Zvcm1OYW1lXTogZ3JvdXAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdG9wRm9ybVJlbmRlciA9ICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpID0gKCkgPT4gKHtcbiAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcblxuICAgICAgICAgIHNldEZpZWxkc1ZhbHVlOiB0aGlzLnNldEZpZWxkc1ZhbHVlLFxuICAgICAgICAgIHNldEZ1bGxWYWx1ZXM6IHRoaXMuc2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcjogdGhpcy5zZXRGaWVsZHNFcnJvcixcblxuICAgICAgICAgIGdldEZ1bGxWYWx1ZXM6IHRoaXMuZ2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBnZXRGaWVsZHNWYWx1ZTogdGhpcy5nZXRGaWVsZHNWYWx1ZSxcblxuICAgICAgICAgIHZlcmlmeTogdGhpcy52ZXJpZnksXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgZGlub0Zvcm1SZWY6IHRoaXMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzRXJyb3IgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyBlcnJvciB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIG5ld1ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSA9ICguLi5maWVsZHMpID0+IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gdGhpcy5zdG9yZS5nZXQoZmllbGQpIHx8IHt9O1xuICAgICAgICAgIHJldHVybiBzY2hlbWUudmFsdWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgZ2V0RnVsbFZhbHVlcyA9ICh7IG9ubHlHZXRNb3VudCA9IHRydWUgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgc2NoZW1lLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaXNNb3VudCwgdmFsdWUgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ubHlHZXRNb3VudFxuICAgICAgICAgICAgICAgID8gaXNNb3VudCA/IHsgW2ZpZWxkXTogdmFsdWUgfSA6IHt9XG4gICAgICAgICAgICAgICAgOiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IElEUmVmTWFwW0lEXS5yZWYuZ2V0RnVsbFZhbHVlcygpO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHJlZi5nZXRGdWxsVmFsdWVzKCksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGdWxsVmFsdWVzID0gYXN5bmMgKHZhbHVlcyA9IHt9LCBtYXBzID0ge30pID0+IHtcbiAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGZpbmRHcm91cHMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgKS5maW5kKGdyb3VwID0+IGdyb3VwLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCBmaW5kU3ViRm9ybXMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICApLmZpbmQoc3ViRm9ybSA9PiBzdWJGb3JtLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZShyID0+IHRoaXMuc2V0U3RhdGUoe30sICgpID0+IHIoKSkpO1xuXG4gICAgICAgICAgYXdhaXQgbWFwT2JqZWN0QXN5bmModmFsdWVzLCBhc3luYyAoZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpbmRHcm91cHMoZmllbGQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybSA9IGZpbmRTdWJGb3JtcyhmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmIChzdWJGb3JtKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogc3ViRm9ybU1hcE9iaiB9ID0gbWFwcztcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYgfSA9IHN1YkZvcm07XG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKHZhbHVlLCBzdWJGb3JtTWFwT2JqKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdyb3VwKSB7IC8vIGZyYWdtZW50XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogbWFwRnVuID0gXyA9PiBfIH0gPSBtYXBzO1xuICAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbWFwRnVuKHZhbHVlKSB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA8IDEpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZGVsZXRlIElETGlzdCBhbmQgYWRkXG4gICAgICAgICAgICBncm91cC5JRExpc3QgPSBbLi4ubmV3IEFycmF5KHZhbHVlLmxlbmd0aCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuXG4gICAgICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgICAgIGF3YWl0IHJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIElETGlzdC5mb3JFYWNoKChJRCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIFtJRF06IHtcbiAgICAgICAgICAgICAgICAgIHJlZixcbiAgICAgICAgICAgICAgICB9ID0ge30sXG4gICAgICAgICAgICAgIH0gPSBJRFJlZk1hcDtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gJHtmb3JtTmFtZX0gc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgZ3JvdXAuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJdGVtVmFsdWUgPSB2YWx1ZVtpbmRleF0gfHwgW107XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiBmdW4gPSAoKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgbWFwT2JqOiB7fSxcbiAgICAgICAgICAgICAgICAgIHByb3BzOiB7fSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgfSA9IG1hcHM7XG5cbiAgICAgICAgICAgICAgY29uc3QgeyBtYXBPYmogPSB7fSwgcHJvcHMgPSB7fSB9ID0gZnVuKGdyb3VwSXRlbVZhbHVlKTtcblxuICAgICAgICAgICAgICBJRFJlZk1hcFtJRF0ucHJvcHMgPSBwcm9wcztcblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyhncm91cEl0ZW1WYWx1ZSwgbWFwT2JqKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19