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
import createDinoFormStore from './DinoFormStore.js';
import { createFromItem, createDinoFormSubForm, createDinoFormGroupWrap, createFragments, groupsAPI, subFormsAPI } from './DinoFormHelper.jsx';
import { mapObject, mapObjectAsync } from './util.js';

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
                      setID: () => _this2.ID,
                      getID: ID => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJtYXBPYmplY3QiLCJtYXBPYmplY3RBc3luYyIsIldyYXBDb20iLCJyZW5kZXIiLCJyZW5kZXJEaW5vRm9ybSIsInByb3BzIiwiZGlub0Zvcm0iLCJjcmVhdGVGb3JtIiwiZnJhZ21lbnRzIiwiZ3JvdXBzIiwic3ViRm9ybXMiLCJjcmVhdGUiLCJWaWV3IiwiYmluZFdyYXAiLCJXcmFwIiwiRGlub0Zvcm0iLCJjb25zdHJ1Y3RvciIsImNvbnN0cnVjdG9yUHJvcHMiLCJncm91cHNPYmoiLCJmb3JtTmFtZSIsIkNvbSIsImZpZWxkIiwiY291bnQiLCJmb3JtUHJvcHMiLCJJRFJlZk1hcCIsIklETGlzdCIsIkFycmF5IiwibWFwIiwiSUQiLCJGb3JtIiwic2V0SURSZWZNYXAiLCJ2YWx1ZSIsInRvcEZvcm1SZW5kZXIiLCJncm91cCIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImZyYWdtZW50c0ZpZWxkIiwiaXNNb3VudCIsImdyb3VwRmllbGQiLCJncm91cE5hbWUiLCJ2YWx1ZXMiLCJyZXN1bHQiLCJyZWYiLCJwdXNoIiwic3ViRm9ybUZpZWxkIiwic3ViRm9ybSIsIm1hcHMiLCJmaW5kR3JvdXBzIiwiZmluZCIsImZpbmRTdWJGb3JtcyIsInIiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiY29uc29sZSIsIndhcm4iLCJncm91cEl0ZW1WYWx1ZSIsImZ1biIsIm1hcE9iaiIsImZpcnN0Iiwic2Nyb2xsIiwicmVzb2x2ZSIsInRoZW4iLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsInNldElEIiwiZ2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0Msb0JBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixRQU9PLHNCQVBQO0FBU0EsU0FBU0MsU0FBVCxFQUFvQkMsY0FBcEIsUUFBMEMsV0FBMUM7O0FBRUEsTUFBTUMsT0FBTixTQUFzQlYsU0FBdEIsQ0FBZ0M7QUFDOUJXLEVBQUFBLE1BQU0sR0FBRztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsV0FBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7QUFKNkI7O0FBT2hDLFNBQVNFLFVBQVQsR0FJUTtBQUFBLGlGQUFKLEVBQUk7QUFBQSw0QkFITkMsU0FHTTtBQUFBLE1BSE5BLFNBR00sK0JBSE0sRUFHTjtBQUFBLHlCQUZOQyxNQUVNO0FBQUEsTUFGTkEsTUFFTSw0QkFGRyxFQUVIO0FBQUEsMkJBRE5DLFFBQ007QUFBQSxNQUROQSxRQUNNLDhCQURLLEVBQ0w7O0FBQ04sU0FBTyxTQUFTQyxNQUFULENBQWdCQyxJ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bXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZURpbm9Gb3JtU3RvcmUgZnJvbSAnLi9EaW5vRm9ybVN0b3JlLmpzJztcbmltcG9ydCB7XG4gIGNyZWF0ZUZyb21JdGVtLFxuICBjcmVhdGVEaW5vRm9ybVN1YkZvcm0sXG4gIGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwLFxuICBjcmVhdGVGcmFnbWVudHMsXG4gIGdyb3Vwc0FQSSxcbiAgc3ViRm9ybXNBUEksXG59IGZyb20gJy4vRGlub0Zvcm1IZWxwZXIuanN4JztcblxuaW1wb3J0IHsgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYyB9IGZyb20gJy4vdXRpbC5qcyc7XG5cbmNsYXNzIFdyYXBDb20gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaW5vRm9ybTogeyByZW5kZXJEaW5vRm9ybSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybSh0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKHtcbiAgZnJhZ21lbnRzID0ge30sXG4gIGdyb3VwcyA9IHt9LFxuICBzdWJGb3JtcyA9IHt9LFxufSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGUoVmlldykge1xuICAgIHJldHVybiBmdW5jdGlvbiBiaW5kV3JhcChXcmFwID0gV3JhcENvbSkge1xuICAgICAgcmV0dXJuIGNsYXNzIERpbm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RydWN0b3JQcm9wcykge1xuICAgICAgICAgIHN1cGVyKGNvbnN0cnVjdG9yUHJvcHMpO1xuXG4gICAgICAgICAgdGhpcy5zdG9yZSA9IGNyZWF0ZURpbm9Gb3JtU3RvcmUoKTtcbiAgICAgICAgICB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHN1YkZvcm1zKTtcblxuICAgICAgICAgIHRoaXMuRnJvbUl0ZW0gPSBjcmVhdGVGcm9tSXRlbSh7XG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gY3JlYXRlRnJhZ21lbnRzKHtcbiAgICAgICAgICAgIGZyYWdtZW50cyxcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5JRCA9IDA7XG4gICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmNyZWF0ZUdyb3Vwcyhncm91cHMpO1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG4gICAgICAgICAgICBJRDogdGhpcy5JRCxcbiAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUdyb3VwcyA9IGdyb3Vwc09iaiA9PiBtYXBPYmplY3QoZ3JvdXBzT2JqLCAoZm9ybU5hbWUsIHtcbiAgICAgICAgICBDb20sIGZpZWxkLCBjb3VudCwgZm9ybVByb3BzID0ge30sXG4gICAgICAgIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IElEUmVmTWFwID0ge307XG4gICAgICAgICAgY29uc3QgSURMaXN0ID0gWy4uLm5ldyBBcnJheShjb3VudCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuICAgICAgICAgIGNvbnN0IEZvcm0gPSBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCh7XG4gICAgICAgICAgICBzZXRJRFJlZk1hcDogKElELCB2YWx1ZSkgPT4geyB0aGlzLmdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdID0gdmFsdWU7IH0sXG4gICAgICAgICAgICB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBncm91cCA9IHtcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgICAgZm9ybU5hbWUsXG4gICAgICAgICAgICBJRFJlZk1hcCxcbiAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgIEZvcm0sXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgW2Zvcm1OYW1lXTogZ3JvdXAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdG9wRm9ybVJlbmRlciA9ICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpID0gKCkgPT4gKHtcbiAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcblxuICAgICAgICAgIHNldEZpZWxkc1ZhbHVlOiB0aGlzLnNldEZpZWxkc1ZhbHVlLFxuICAgICAgICAgIHNldEZ1bGxWYWx1ZXM6IHRoaXMuc2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcjogdGhpcy5zZXRGaWVsZHNFcnJvcixcblxuICAgICAgICAgIGdldEZ1bGxWYWx1ZXM6IHRoaXMuZ2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBnZXRGaWVsZHNWYWx1ZTogdGhpcy5nZXRGaWVsZHNWYWx1ZSxcblxuICAgICAgICAgIHZlcmlmeTogdGhpcy52ZXJpZnksXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgZGlub0Zvcm1SZWY6IHRoaXMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzRXJyb3IgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyBlcnJvciB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIG5ld1ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSA9ICguLi5maWVsZHMpID0+IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gdGhpcy5zdG9yZS5nZXQoZmllbGQpIHx8IHt9O1xuICAgICAgICAgIHJldHVybiBzY2hlbWUudmFsdWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgZ2V0RnVsbFZhbHVlcyA9ICh7IG9ubHlHZXRNb3VudCA9IHRydWUgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgc2NoZW1lLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaXNNb3VudCwgdmFsdWUgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ubHlHZXRNb3VudFxuICAgICAgICAgICAgICAgID8gaXNNb3VudCA/IHsgW2ZpZWxkXTogdmFsdWUgfSA6IHt9XG4gICAgICAgICAgICAgICAgOiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IElEUmVmTWFwW0lEXS5yZWYuZ2V0RnVsbFZhbHVlcygpO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHJlZi5nZXRGdWxsVmFsdWVzKCksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGdWxsVmFsdWVzID0gYXN5bmMgKHZhbHVlcyA9IHt9LCBtYXBzID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmaW5kR3JvdXBzID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICkuZmluZChncm91cCA9PiBncm91cC5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgZmluZFN1YkZvcm1zID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgKS5maW5kKHN1YkZvcm0gPT4gc3ViRm9ybS5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UociA9PiB0aGlzLnNldFN0YXRlKHt9LCAoKSA9PiByKCkpKTtcblxuICAgICAgICAgIGF3YWl0IG1hcE9iamVjdEFzeW5jKHZhbHVlcywgYXN5bmMgKGZpZWxkLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaW5kR3JvdXBzKGZpZWxkKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm0gPSBmaW5kU3ViRm9ybXMoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoc3ViRm9ybSkge1xuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IHN1YkZvcm1NYXBPYmogfSA9IG1hcHM7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyh2YWx1ZSwgc3ViRm9ybU1hcE9iaik7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFncm91cCkgeyAvLyBmcmFnbWVudFxuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IG1hcEZ1biA9IF8gPT4gXyB9ID0gbWFwcztcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG1hcEZ1bih2YWx1ZSkgfSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBJRExpc3QgYW5kIGFkZFxuICAgICAgICAgICAgZ3JvdXAuSURMaXN0ID0gWy4uLm5ldyBBcnJheSh2YWx1ZS5sZW5ndGgpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcblxuICAgICAgICAgICAgLy8gcmVuZGVyXG4gICAgICAgICAgICBhd2FpdCByZW5kZXIoKTtcblxuICAgICAgICAgICAgLy8gZ3JvdXAgc2hvdWxkIG1vdW50ZWRcbiAgICAgICAgICAgIGNvbnN0IHsgSURSZWZNYXAsIElETGlzdCwgZm9ybU5hbWUgfSA9IGdyb3VwO1xuXG4gICAgICAgICAgICBJRExpc3QuZm9yRWFjaCgoSUQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBbSURdOiB7XG4gICAgICAgICAgICAgICAgICByZWYsXG4gICAgICAgICAgICAgICAgfSA9IHt9LFxuICAgICAgICAgICAgICB9ID0gSURSZWZNYXA7XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dICR7Zm9ybU5hbWV9IHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIGdyb3VwLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbVZhbHVlID0gdmFsdWVbaW5kZXhdIHx8IFtdO1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogZnVuID0gKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG1hcE9iajoge30sXG4gICAgICAgICAgICAgICAgICBwcm9wczoge30sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIH0gPSBtYXBzO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHsgbWFwT2JqID0ge30sIHByb3BzID0ge30gfSA9IGZ1bihncm91cEl0ZW1WYWx1ZSk7XG5cbiAgICAgICAgICAgICAgSURSZWZNYXBbSURdLnByb3BzID0gcHJvcHM7XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXMoZ3JvdXBJdGVtVmFsdWUsIG1hcE9iaik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmVyaWZ5ID0gKHtcbiAgICAgICAgICBmaXJzdCA9IGZhbHNlLCAvLyB0b2RvXG4gICAgICAgICAgc2Nyb2xsID0gdHJ1ZSwgLy8gdG9kb1xuICAgICAgICB9ID0ge30pID0+IChcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIHNjaGVtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIHJ1bGVzID0gW10sIGlzTW91bnQsIHZhbHVlLCBsYWJlbCxcbiAgICAgICAgICAgICAgICB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICAgIGlmICghaXNNb3VudCkgeyByZXR1cm4ge307IH1cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNQYXNzID0gYXdhaXQgcnVsZS5mdW4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgaWYgKCFpc1Bhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHJ1bGUuZXJyb3IoeyBsYWJlbCwgZmllbGQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IElEUmVmTWFwW0lEXS5yZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmhhc0Vycm9yKSBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAgIGFzeW5jIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGhhc0Vycm9yOiBzdWJGb3JtSGFzRXJyb3IgfSA9IGF3YWl0IHJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHN1YkZvcm1IYXNFcnJvcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogZGF0YSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaGFzRXJyb3IsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcblxuICAgICAgICApXG5cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIGNvbnN0IHsgY2F0Y2hSZWYgPSAoKSA9PiB7fSwgLi4ub3RoZXJzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8V3JhcFxuICAgICAgICAgICAgICByZWY9eyBjYXRjaFJlZiB9XG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICByZW5kZXJEaW5vRm9ybTogKHByb3BzID0ge30pID0+IChcbiAgICAgICAgICAgICAgICAgIDxWaWV3XG4gICAgICAgICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IGdyb3Vwc0FQSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJRDogKCkgPT4gdGhpcy5JRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoSUQpID0+IHsgdGhpcy5JRCA9IElEOyB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIHN1YkZvcm1zOiBzdWJGb3Jtc0FQSSh7IHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zIH0pLFxuICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgeyAuLi5vdGhlcnMgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRm9ybTtcbiJdfQ==