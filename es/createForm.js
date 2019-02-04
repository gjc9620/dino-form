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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJtYXBPYmplY3QiLCJtYXBPYmplY3RBc3luYyIsIldyYXBDb20iLCJyZW5kZXIiLCJyZW5kZXJEaW5vRm9ybSIsInByb3BzIiwiZGlub0Zvcm0iLCJjcmVhdGVGb3JtIiwiZnJhZ21lbnRzIiwiZ3JvdXBzIiwic3ViRm9ybXMiLCJjcmVhdGUiLCJWaWV3IiwiYmluZFdyYXAiLCJXcmFwIiwiRGlub0Zvcm0iLCJjb25zdHJ1Y3RvciIsImNvbnN0cnVjdG9yUHJvcHMiLCJncm91cHNPYmoiLCJmb3JtTmFtZSIsIkNvbSIsImZpZWxkIiwiY291bnQiLCJmb3JtUHJvcHMiLCJJRFJlZk1hcCIsIklETGlzdCIsIkFycmF5IiwibWFwIiwiSUQiLCJGb3JtIiwic2V0SURSZWZNYXAiLCJ2YWx1ZSIsInRvcEZvcm1SZW5kZXIiLCJncm91cCIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImZyYWdtZW50c0ZpZWxkIiwiaXNNb3VudCIsImdyb3VwRmllbGQiLCJncm91cE5hbWUiLCJ2YWx1ZXMiLCJyZXN1bHQiLCJyZWYiLCJwdXNoIiwic3ViRm9ybUZpZWxkIiwic3ViRm9ybSIsIm1hcHMiLCJmaW5kR3JvdXBzIiwiZmluZCIsImZpbmRTdWJGb3JtcyIsInIiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiY29uc29sZSIsIndhcm4iLCJncm91cEl0ZW1WYWx1ZSIsImZ1biIsIm1hcE9iaiIsImZpcnN0Iiwic2Nyb2xsIiwicmVzb2x2ZSIsInRoZW4iLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MsaUJBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixRQU9PLGtCQVBQO0FBU0EsU0FBU0MsU0FBVCxFQUFvQkMsY0FBcEIsUUFBMEMsUUFBMUM7O0FBRUEsTUFBTUMsT0FBTixTQUFzQlYsU0FBdEIsQ0FBZ0M7QUFDOUJXLEVBQUFBLE1BQU0sR0FBRztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsV0FBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7QUFKNkI7O0FBT2hDLFNBQVNFLFVBQVQsR0FJUTtBQUFBLGlGQUFKLEVBQUk7QUFBQSw0QkFITkMsU0FHTTtBQUFBLE1BSE5BLFNBR00sK0JBSE0sRUFHTjtBQUFBLHlCQUZOQyxNQUVNO0FBQUEsTUFGTkEsTUFFTSw0QkFGRyxFQUVIO0FBQUEsMkJBRE5DLFFBQ007QUFBQSxNQUROQSxRQUNNLDhCQURLLEVBQ0w7O0FBQ04sU0FBTyxTQUFTQyxNQUFULENBQWdCQyxJ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bXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZURpbm9Gb3JtU3RvcmUgZnJvbSAnLi9EaW5vRm9ybVN0b3JlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUZyb21JdGVtLFxuICBjcmVhdGVEaW5vRm9ybVN1YkZvcm0sXG4gIGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwLFxuICBjcmVhdGVGcmFnbWVudHMsXG4gIGdyb3Vwc0FQSSxcbiAgc3ViRm9ybXNBUEksXG59IGZyb20gJy4vRGlub0Zvcm1IZWxwZXInO1xuXG5pbXBvcnQgeyBtYXBPYmplY3QsIG1hcE9iamVjdEFzeW5jIH0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgV3JhcENvbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRpbm9Gb3JtOiB7IHJlbmRlckRpbm9Gb3JtIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtKHRoaXMucHJvcHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oe1xuICBmcmFnbWVudHMgPSB7fSxcbiAgZ3JvdXBzID0ge30sXG4gIHN1YkZvcm1zID0ge30sXG59ID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZShWaWV3KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJpbmRXcmFwKFdyYXAgPSBXcmFwQ29tKSB7XG4gICAgICByZXR1cm4gY2xhc3MgRGlub0Zvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb25zdHJ1Y3RvclByb3BzKSB7XG4gICAgICAgICAgc3VwZXIoY29uc3RydWN0b3JQcm9wcyk7XG5cbiAgICAgICAgICB0aGlzLnN0b3JlID0gY3JlYXRlRGlub0Zvcm1TdG9yZSgpO1xuICAgICAgICAgIHRoaXMuc3ViRm9ybXMgPSBjcmVhdGVEaW5vRm9ybVN1YkZvcm0oc3ViRm9ybXMpO1xuXG4gICAgICAgICAgdGhpcy5Gcm9tSXRlbSA9IGNyZWF0ZUZyb21JdGVtKHtcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5mcmFnbWVudHMgPSBjcmVhdGVGcmFnbWVudHMoe1xuICAgICAgICAgICAgZnJhZ21lbnRzLFxuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLklEID0gMDtcbiAgICAgICAgICB0aGlzLmdyb3VwcyA9IHRoaXMuY3JlYXRlR3JvdXBzKGdyb3Vwcyk7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcbiAgICAgICAgICAgIElEOiB0aGlzLklELFxuICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgIHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlR3JvdXBzID0gZ3JvdXBzT2JqID0+IG1hcE9iamVjdChncm91cHNPYmosIChmb3JtTmFtZSwge1xuICAgICAgICAgIENvbSwgZmllbGQsIGNvdW50LCBmb3JtUHJvcHMgPSB7fSxcbiAgICAgICAgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgSURSZWZNYXAgPSB7fTtcbiAgICAgICAgICBjb25zdCBJRExpc3QgPSBbLi4ubmV3IEFycmF5KGNvdW50KV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG4gICAgICAgICAgY29uc3QgRm9ybSA9IGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwKHtcbiAgICAgICAgICAgIHNldElEUmVmTWFwOiAoSUQsIHZhbHVlKSA9PiB7IHRoaXMuZ3JvdXBzW2Zvcm1OYW1lXS5JRFJlZk1hcFtJRF0gPSB2YWx1ZTsgfSxcbiAgICAgICAgICAgIHRvcEZvcm1SZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwID0ge1xuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICBmb3JtUHJvcHMsXG4gICAgICAgICAgICBmb3JtTmFtZSxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBbZm9ybU5hbWVdOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0b3BGb3JtUmVuZGVyID0gKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGkgPSAoKSA9PiAoe1xuICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuXG4gICAgICAgICAgc2V0RmllbGRzVmFsdWU6IHRoaXMuc2V0RmllbGRzVmFsdWUsXG4gICAgICAgICAgc2V0RnVsbFZhbHVlczogdGhpcy5zZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIHNldEZpZWxkc0Vycm9yOiB0aGlzLnNldEZpZWxkc0Vycm9yLFxuXG4gICAgICAgICAgZ2V0RnVsbFZhbHVlczogdGhpcy5nZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIGdldEZpZWxkc1ZhbHVlOiB0aGlzLmdldEZpZWxkc1ZhbHVlLFxuXG4gICAgICAgICAgdmVyaWZ5OiB0aGlzLnZlcmlmeSxcbiAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICBkaW5vRm9ybVJlZjogdGhpcyxcbiAgICAgICAgfSlcblxuICAgICAgICBzZXRGaWVsZHNFcnJvciA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBlcnJvcl0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IGVycm9yIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RmllbGRzVmFsdWUgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgbmV3VmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbmV3VmFsdWUgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnRvcEZvcm1SZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlID0gKC4uLmZpZWxkcykgPT4gZmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWUgPSB0aGlzLnN0b3JlLmdldChmaWVsZCkgfHwge307XG4gICAgICAgICAgcmV0dXJuIHNjaGVtZS52YWx1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICBnZXRGdWxsVmFsdWVzID0gKHsgb25seUdldE1vdW50ID0gdHJ1ZSB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZ2V0KCksXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICBzY2hlbWUsXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyBpc01vdW50LCB2YWx1ZSB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICByZXR1cm4gb25seUdldE1vdW50XG4gICAgICAgICAgICAgICAgPyBpc01vdW50ID8geyBbZmllbGRdOiB2YWx1ZSB9IDoge31cbiAgICAgICAgICAgICAgICA6IHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgSURSZWZNYXAgPSBbXSwgSURMaXN0LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgIGZvciAoY29uc3QgSUQgb2YgSURMaXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSURSZWZNYXBbSURdLnJlZi5nZXRGdWxsVmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiwgZmllbGQgfSA9IHN1YkZvcm07XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogcmVmLmdldEZ1bGxWYWx1ZXMoKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZ1bGxWYWx1ZXMgPSBhc3luYyAodmFsdWVzID0ge30sIG1hcHMgPSB7fSkgPT4ge1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGZpbmRHcm91cHMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgKS5maW5kKGdyb3VwID0+IGdyb3VwLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCBmaW5kU3ViRm9ybXMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICApLmZpbmQoc3ViRm9ybSA9PiBzdWJGb3JtLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZShyID0+IHRoaXMuc2V0U3RhdGUoe30sICgpID0+IHIoKSkpO1xuXG4gICAgICAgICAgYXdhaXQgbWFwT2JqZWN0QXN5bmModmFsdWVzLCBhc3luYyAoZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpbmRHcm91cHMoZmllbGQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybSA9IGZpbmRTdWJGb3JtcyhmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmIChzdWJGb3JtKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogc3ViRm9ybU1hcE9iaiB9ID0gbWFwcztcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYgfSA9IHN1YkZvcm07XG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKHZhbHVlLCBzdWJGb3JtTWFwT2JqKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdyb3VwKSB7IC8vIGZyYWdtZW50XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogbWFwRnVuID0gXyA9PiBfIH0gPSBtYXBzO1xuICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbWFwRnVuKHZhbHVlKSB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA8IDEpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZGVsZXRlIElETGlzdCBhbmQgYWRkXG4gICAgICAgICAgICBncm91cC5JRExpc3QgPSBbLi4ubmV3IEFycmF5KHZhbHVlLmxlbmd0aCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuXG4gICAgICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgICAgIGF3YWl0IHJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIElETGlzdC5mb3JFYWNoKChJRCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIFtJRF06IHtcbiAgICAgICAgICAgICAgICAgIHJlZixcbiAgICAgICAgICAgICAgICB9ID0ge30sXG4gICAgICAgICAgICAgIH0gPSBJRFJlZk1hcDtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gJHtmb3JtTmFtZX0gc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgZ3JvdXAuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJdGVtVmFsdWUgPSB2YWx1ZVtpbmRleF0gfHwgW107XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiBmdW4gPSAoKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgbWFwT2JqOiB7fSxcbiAgICAgICAgICAgICAgICAgIHByb3BzOiB7fSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgfSA9IG1hcHM7XG5cbiAgICAgICAgICAgICAgY29uc3QgeyBtYXBPYmogPSB7fSwgcHJvcHMgPSB7fSB9ID0gZnVuKGdyb3VwSXRlbVZhbHVlKTtcblxuICAgICAgICAgICAgICBJRFJlZk1hcFtJRF0ucHJvcHMgPSBwcm9wcztcblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyhncm91cEl0ZW1WYWx1ZSwgbWFwT2JqKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19