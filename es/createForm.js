import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties";
import _Array$isArray from "@babel/runtime-corejs2/core-js/array/is-array";
import _Object$values from "@babel/runtime-corejs2/core-js/object/values";
import _objectSpread from "@babel/runtime-corejs2/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime-corejs2/helpers/esm/slicedToArray";
import _Object$entries from "@babel/runtime-corejs2/core-js/object/entries";
import _Promise from "@babel/runtime-corejs2/core-js/promise";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import React, { Component } from 'react';
import createDinoFormStore from './DinoFormStore';
import { createFromItem, createDinoFormSubForm, createDinoFormGroupWrap, createFragments, groupsAPI, subFormsAPI, getRef } from './DinoFormHelper';
import { sleep, mapObject, mapObjectAsync, isProduction } from './util';
import { isNotExist } from '../es';

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
      subForms = _ref$subForms === void 0 ? {} : _ref$subForms,
      _ref$getGroupRef = _ref.getGroupRef,
      getGroupRef = _ref$getGroupRef === void 0 ? getRef : _ref$getGroupRef;

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
                formProps = _ref2$formProps === void 0 ? {} : _ref2$formProps,
                _ref2$needDrag = _ref2.needDrag,
                needDrag = _ref2$needDrag === void 0 ? false : _ref2$needDrag,
                clearMotions = _ref2.clearMotions,
                pressedMotions = _ref2.pressedMotions,
                notPressedMotions = _ref2.notPressedMotions,
                createStyle = _ref2.createStyle;

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
              needDrag,
              IDRefMap,
              IDList,
              Form,
              clearMotions,
              pressedMotions,
              notPressedMotions,
              createStyle
            };
            return {
              [formName]: group
            };
          }));

          _defineProperty(this, "topFormRender", () => new _Promise(r => {
            if (this.props.topFormRender) {
              return this.props.topFormRender().then(r);
            }

            return this.setState({}, r);
          }));

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
                onlyGetMount = _ref7$onlyGetMount === void 0 ? true : _ref7$onlyGetMount,
                _ref7$debug = _ref7.debug,
                debug = _ref7$debug === void 0 ? false : _ref7$debug;

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
                const group = IDRefMap[ID];

                if (isNotExist(group) || isNotExist(group.ref)) {
                  isProduction(() => {
                    if (debug) {
                      console.warn(`[dino-form] group from ref not registered, field = ${field}, ID=${ID}`);
                    }
                  });
                  continue;
                }

                const result = IDRefMap[ID].ref.getFullValues({
                  onlyGetMount
                });
                values.push(result);
              }

              return {
                [field]: values
              };
            });
            const subFormField = mapObject(_this.subForms, (formName, subForm) => {
              const ref = subForm.ref,
                    field = subForm.field;

              if (!ref) {
                isProduction(() => {
                  if (debug) {
                    console.warn(`[dino-form] subForm ref not registered, field = ${field}`);
                  }
                });
                return {
                  [field]: {}
                };
              }

              return {
                [field]: ref.getFullValues({
                  onlyGetMount
                })
              };
            });
            return _objectSpread({}, fragmentsField, groupField, subFormField);
          });

          _defineProperty(this, "setFullValues", async function () {
            let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            let maps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            const findGroups = field => _Object$values(_this.groups).find(group => group.field === field);

            const findSubForms = field => _Object$values(_this.subForms).find(subForm => subForm.field === field);

            const render = () => new _Promise(r => _this.setState({}, r));

            await mapObject(values, async (field, value) => {
              const group = findGroups(field);
              const subForm = findSubForms(field);

              if (subForm) {
                const subFormMapObj = maps[field];
                const ref = subForm.ref;

                if (!ref) {
                  console.warn(`[dino-form] field is '${field}' subForm should be mounted but the Ref is not registered, maybe you not render this subForm.`);
                  return;
                }

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
              // await render();

              await render(); // await this.topFormRender();
              // group should mounted

              const IDRefMap = group.IDRefMap,
                    IDList = group.IDList,
                    formName = group.formName;
              await mapObjectAsync(IDList, async (index, ID) => {
                const ref = await getGroupRef(() => {
                  const _IDRefMap$ID = IDRefMap[ID],
                        _IDRefMap$ID2 = _IDRefMap$ID === void 0 ? {} : _IDRefMap$ID,
                        groupFormRef = _IDRefMap$ID2.ref;

                  return groupFormRef;
                });

                if (!ref) {
                  console.warn(`[dino-form] form '${formName}' should be mounted but the Ref is not registered, maybe you not render this group.`);
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
              }, IDList);
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
                  if (!IDRefMap[ID].ref) {
                    console.warn(`[dino-form] group from ref not registered, field = ${field}, ID=${ID}`);
                    continue;
                  }

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

                if (!ref) {
                  console.warn(`[dino-form] subFrom ref not registered, field = ${field}.`);
                  return {
                    [field]: {}
                  };
                }

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

          this.store = createDinoFormStore(); // this.subForms = createDinoFormSubForm(subForms, this.topFormRender);

          this.subForms = createDinoFormSubForm({
            subForms,
            topFormRender: this.topFormRender
          });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJnZXRSZWYiLCJzbGVlcCIsIm1hcE9iamVjdCIsIm1hcE9iamVjdEFzeW5jIiwiaXNQcm9kdWN0aW9uIiwiaXNOb3RFeGlzdCIsIldyYXBDb20iLCJyZW5kZXIiLCJyZW5kZXJEaW5vRm9ybSIsInByb3BzIiwiZGlub0Zvcm0iLCJjcmVhdGVGb3JtIiwiZnJhZ21lbnRzIiwiZ3JvdXBzIiwic3ViRm9ybXMiLCJnZXRHcm91cFJlZiIsImNyZWF0ZSIsIlZpZXciLCJiaW5kV3JhcCIsIldyYXAiLCJEaW5vRm9ybSIsImNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3JQcm9wcyIsImdyb3Vwc09iaiIsImZvcm1OYW1lIiwiQ29tIiwiZmllbGQiLCJjb3VudCIsImZvcm1Qcm9wcyIsIm5lZWREcmFnIiwiY2xlYXJNb3Rpb25zIiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJyIiwidGhlbiIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImRlYnVnIiwiZnJhZ21lbnRzRmllbGQiLCJpc01vdW50IiwiZ3JvdXBGaWVsZCIsImdyb3VwTmFtZSIsInZhbHVlcyIsInJlZiIsImNvbnNvbGUiLCJ3YXJuIiwicmVzdWx0IiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiZ3JvdXBGb3JtUmVmIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MsaUJBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixFQU9FQyxNQVBGLFFBUU8sa0JBUlA7QUFVQSxTQUNFQyxLQURGLEVBQ1NDLFNBRFQsRUFDb0JDLGNBRHBCLEVBQ29DQyxZQURwQyxRQUVPLFFBRlA7QUFHQSxTQUFTQyxVQUFULFFBQTJCLE9BQTNCOztBQUVBLE1BQU1DLE9BQU4sU0FBc0JkLFNBQXRCLENBQWdDO0FBQzlCZSxFQUFBQSxNQUFNLEdBQUc7QUFBQSxVQUNhQyxjQURiLEdBQ2tDLEtBQUtDLEtBRHZDLENBQ0NDLFFBREQsQ0FDYUYsY0FEYjtBQUVQLFdBQU9BLGNBQWMsQ0FBQyxLQUFLQyxLQUFOLENBQXJCO0FBQ0Q7O0FBSjZCOztBQU9oQyxTQUFTRSxVQUFULEdBS1E7QUFBQSxpRkFBSixFQUFJO0FBQUEsNEJBSk5DLFNBSU07QUFBQSxNQUpOQSxTQUlNLCtCQUpNLEVBSU47QUFBQSx5QkFITkMsTUFHTTtBQUFBLE1BSE5BLE1BR00sNEJBSEcsRUFHSDtBQUFBLDJCQUZOQyxRQUVNO0FBQUEsTUFGTkEsUUFFTSw4QkFGSyxFQUVMO0FBQUEsOEJBRE5DLFdBQ007QUFBQSxNQUROQSxXQUNNLGlDQURRZixNQUNSOztBQUNOLFNBQU8sU0FBU2dCLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCO0FBQzNCLFdBQU8sU0FBU0MsUUFBVCxHQUFrQztBQUFBOztBQUFBLFVBQWhCQyxJQUFnQix1RUFBVGIsT0FBUztBQUN2QyxxQkFBTyxNQUFNYyxRQUFOLFNBQXVCNUIsU0FBdkIsQ0FBaUM7QUFDdEM2QixRQUFBQSxXQUFXLENBQUNDLGdCQUFELEVBQW1CO0FBQUE7O0FBQzVCLGdCQUFNQSxnQkFBTixDQUQ0QjtBQUFBOztBQUFBLGdEQTZCZkMsU0FBUyxJQUFJckIsU0FBUyxDQUFDcUIsU0FBRCxFQUFZLFVBQUNDLFFBQUQsRUFVdEM7QUFBQSw0RkFBUCxFQUFPO0FBQUEsZ0JBVFRDLEdBU1MsU0FUVEEsR0FTUztBQUFBLGdCQVJUQyxLQVFTLFNBUlRBLEtBUVM7QUFBQSxnQkFQVEMsS0FPUyxTQVBUQSxLQU9TO0FBQUEsd0NBTlRDLFNBTVM7QUFBQSxnQkFOVEEsU0FNUyxnQ0FORyxFQU1IO0FBQUEsdUNBTFRDLFFBS1M7QUFBQSxnQkFMVEEsUUFLUywrQkFMRSxLQUtGO0FBQUEsZ0JBSlRDLFlBSVMsU0FKVEEsWUFJUztBQUFBLGdCQUhUQyxjQUdTLFNBSFRBLGNBR1M7QUFBQSxnQkFGVEMsaUJBRVMsU0FGVEEsaUJBRVM7QUFBQSxnQkFEVEMsV0FDUyxTQURUQSxXQUNTOztBQUNULGtCQUFNQyxRQUFRLEdBQUcsRUFBakI7QUFDQSxrQkFBTUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJQyxLQUFKLENBQVVULEtBQVYsQ0FBSixFQUFzQlUsR0FBdEIsQ0FBMEIsTUFBTSxLQUFJLENBQUNDLEVBQUwsRUFBaEMsQ0FBZjtBQUNBLGtCQUFNQyxJQUFJLEdBQUczQyx1QkFBdUIsQ0FBQztBQUNuQzRDLGNBQUFBLFdBQVcsRUFBRSxDQUFDRixFQUFELEVBQUtHLEtBQUwsS0FBZTtBQUFFLGdCQUFBLEtBQUksQ0FBQzVCLE1BQUwsQ0FBWVcsUUFBWixFQUFzQlUsUUFBdEIsQ0FBK0JJLEVBQS9CLElBQXFDRyxLQUFyQztBQUE2QyxlQUR4QztBQUVuQ0MsY0FBQUEsYUFBYSxFQUFFLEtBQUksQ0FBQ0EsYUFGZTtBQUduQ2pCLGNBQUFBO0FBSG1DLGFBQUQsQ0FBcEM7QUFNQSxrQkFBTWtCLEtBQUssR0FBRztBQUNabEIsY0FBQUEsR0FEWTtBQUVaQyxjQUFBQSxLQUZZO0FBR1pFLGNBQUFBLFNBSFk7QUFJWkosY0FBQUEsUUFKWTtBQUtaSyxjQUFBQSxRQUxZO0FBTVpLLGNBQUFBLFFBTlk7QUFPWkMsY0FBQUEsTUFQWTtBQVFaSSxjQUFBQSxJQVJZO0FBU1pULGNBQUFBLFlBVFk7QUFVWkMsY0FBQUEsY0FWWTtBQVdaQyxjQUFBQSxpQkFYWTtBQVlaQyxjQUFBQTtBQVpZLGFBQWQ7QUFlQSxtQkFBUTtBQUNOLGVBQUNULFFBQUQsR0FBWW1CO0FBRE4sYUFBUjtBQUdELFdBckNvQyxDQTdCUDs7QUFBQSxpREFvRWQsTUFBTSxhQUFhQyxDQUFELElBQU87QUFDdkMsZ0JBQUksS0FBS25DLEtBQUwsQ0FBV2lDLGFBQWYsRUFBOEI7QUFDNUIscUJBQU8sS0FBS2pDLEtBQUwsQ0FBV2lDLGFBQVgsR0FBMkJHLElBQTNCLENBQWdDRCxDQUFoQyxDQUFQO0FBQ0Q7O0FBQ0QsbUJBQU8sS0FBS0UsUUFBTCxDQUFjLEVBQWQsRUFBa0JGLENBQWxCLENBQVA7QUFDRCxXQUxxQixDQXBFUTs7QUFBQSxxREEyRVYsT0FBTztBQUN6QkcsWUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBRFU7QUFHekJDLFlBQUFBLGNBQWMsRUFBRSxLQUFLQSxjQUhJO0FBSXpCQyxZQUFBQSxhQUFhLEVBQUUsS0FBS0EsYUFKSztBQUt6QkMsWUFBQUEsY0FBYyxFQUFFLEtBQUtBLGNBTEk7QUFPekJDLFlBQUFBLGFBQWEsRUFBRSxLQUFLQSxhQVBLO0FBUXpCQyxZQUFBQSxjQUFjLEVBQUUsS0FBS0EsY0FSSTtBQVV6QkMsWUFBQUEsTUFBTSxFQUFFLEtBQUtBLE1BVlk7QUFXekJDLFlBQUFBLEtBQUssRUFBRSxLQUFLQSxLQVhhO0FBWXpCQyxZQUFBQSxXQUFXLEVBQUU7QUFaWSxXQUFQLENBM0VVOztBQUFBLGtEQTBGWkMsR0FBRCxJQUFTO0FBQ3hCLGFBQUMsR0FBRyxnQkFBZUEsR0FBZixDQUFKLEVBQXlCQyxPQUF6QixDQUFpQyxXQUFvQjtBQUFBO0FBQUEsa0JBQWxCL0IsS0FBa0I7QUFBQSxrQkFBWGdDLEtBQVc7O0FBQ25ELG1CQUFLSixLQUFMLENBQVdLLE1BQVgsQ0FBa0JqQyxLQUFsQixFQUF5QjtBQUFFZ0MsZ0JBQUFBO0FBQUYsZUFBekI7QUFDRCxhQUZEO0FBR0EsaUJBQUtaLFFBQUwsQ0FBYyxFQUFkO0FBQ0QsV0EvRjZCOztBQUFBLGtEQWlHWlUsR0FBRCxJQUFTO0FBQ3hCLGFBQUMsR0FBRyxnQkFBZUEsR0FBZixDQUFKLEVBQXlCQyxPQUF6QixDQUFpQyxXQUF1QjtBQUFBO0FBQUEsa0JBQXJCL0IsS0FBcUI7QUFBQSxrQkFBZGtDLFFBQWM7O0FBQ3RELG1CQUFLTixLQUFMLENBQVdLLE1BQVgsQ0FBa0JqQyxLQUFsQixFQUF5QjtBQUFFZSxnQkFBQUEsS0FBSyxFQUFFbUI7QUFBVCxlQUF6QjtBQUNELGFBRkQ7QUFJQSxpQkFBS2xCLGFBQUw7QUFDRCxXQXZHNkI7O0FBQUEsa0RBeUdiO0FBQUEsOENBQUltQixNQUFKO0FBQUlBLGNBQUFBLE1BQUo7QUFBQTs7QUFBQSxtQkFBZUEsTUFBTSxDQUFDeEIsR0FBUCxDQUFZWCxLQUFELElBQVc7QUFDcEQsb0JBQU1vQyxNQUFNLEdBQUcsS0FBSSxDQUFDUixLQUFMLENBQVdTLEdBQVgsQ0FBZXJDLEtBQWYsS0FBeUIsRUFBeEM7QUFDQSxxQkFBT29DLE1BQU0sQ0FBQ3JCLEtBQWQ7QUFDRCxhQUgrQixDQUFmO0FBQUEsV0F6R2E7O0FBQUEsaURBOEdkLFlBQWlEO0FBQUEsNEZBQVAsRUFBTztBQUFBLDJDQUE5Q3VCLFlBQThDO0FBQUEsZ0JBQTlDQSxZQUE4QyxtQ0FBL0IsSUFBK0I7QUFBQSxvQ0FBekJDLEtBQXlCO0FBQUEsZ0JBQXpCQSxLQUF5Qiw0QkFBakIsS0FBaUI7O0FBQy9ELGtCQUFNQyxjQUFjLEdBQUdoRSxTQUFTLENBQzlCLEtBQUksQ0FBQ29ELEtBQUwsQ0FBV1MsR0FBWCxFQUQ4QixFQUU5QixDQUNFckMsS0FERixFQUVFb0MsTUFGRixLQUdLO0FBQUEsb0JBQ0tLLE9BREwsR0FDd0JMLE1BRHhCLENBQ0tLLE9BREw7QUFBQSxvQkFDYzFCLEtBRGQsR0FDd0JxQixNQUR4QixDQUNjckIsS0FEZDtBQUVILHFCQUFPdUIsWUFBWSxHQUNmRyxPQUFPLEdBQUc7QUFBRSxpQkFBQ3pDLEtBQUQsR0FBU2U7QUFBWCxlQUFILEdBQXdCLEVBRGhCLEdBRWY7QUFBRSxpQkFBQ2YsS0FBRCxHQUFTZTtBQUFYLGVBRko7QUFHRCxhQVY2QixDQUFoQztBQWFBLGtCQUFNMkIsVUFBVSxHQUFHbEUsU0FBUyxDQUMxQixLQUFJLENBQUNXLE1BRHFCLEVBRTFCLENBQ0V3RCxTQURGLFlBT0s7QUFBQSxrQkFKRDNDLEtBSUMsU0FKREEsS0FJQztBQUFBLHlDQUhEUSxRQUdDO0FBQUEsa0JBSERBLFFBR0MsK0JBSFUsRUFHVjtBQUFBLGtCQUZEQyxNQUVDLFNBRkRBLE1BRUM7QUFDSCxvQkFBTW1DLE1BQU0sR0FBRyxFQUFmOztBQUVBLG1CQUFLLE1BQU1oQyxFQUFYLElBQWlCSCxNQUFqQixFQUF5QjtBQUN2QixzQkFBTVEsS0FBSyxHQUFHVCxRQUFRLENBQUNJLEVBQUQsQ0FBdEI7O0FBRUEsb0JBQUlqQyxVQUFVLENBQUNzQyxLQUFELENBQVYsSUFBcUJ0QyxVQUFVLENBQUNzQyxLQUFLLENBQUM0QixHQUFQLENBQW5DLEVBQWdEO0FBQzlDbkUsa0JBQUFBLFlBQVksQ0FBQyxNQUFNO0FBQ2pCLHdCQUFJNkQsS0FBSixFQUFXO0FBQ1RPLHNCQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYyxzREFBcUQvQyxLQUFNLFFBQU9ZLEVBQUcsRUFBbkY7QUFDRDtBQUNGLG1CQUpXLENBQVo7QUFLQTtBQUNEOztBQUNELHNCQUFNb0MsTUFBTSxHQUFHeEMsUUFBUSxDQUFDSSxFQUFELENBQVIsQ0FBYWlDLEdBQWIsQ0FBaUJwQixhQUFqQixDQUErQjtBQUFFYSxrQkFBQUE7QUFBRixpQkFBL0IsQ0FBZjtBQUNBTSxnQkFBQUEsTUFBTSxDQUFDSyxJQUFQLENBQVlELE1BQVo7QUFDRDs7QUFFRCxxQkFBTztBQUNMLGlCQUFDaEQsS0FBRCxHQUFTNEM7QUFESixlQUFQO0FBR0QsYUE5QnlCLENBQTVCO0FBaUNBLGtCQUFNTSxZQUFZLEdBQUcxRSxTQUFTLENBQzVCLEtBQUksQ0FBQ1ksUUFEdUIsRUFFNUIsQ0FBQ1UsUUFBRCxFQUFXcUQsT0FBWCxLQUF1QjtBQUFBLG9CQUNiTixHQURhLEdBQ0VNLE9BREYsQ0FDYk4sR0FEYTtBQUFBLG9CQUNSN0MsS0FEUSxHQUNFbUQsT0FERixDQUNSbkQsS0FEUTs7QUFHckIsa0JBQUksQ0FBQzZDLEdBQUwsRUFBVTtBQUNSbkUsZ0JBQUFBLFlBQVksQ0FBQyxNQUFNO0FBQ2pCLHNCQUFJNkQsS0FBSixFQUFXO0FBQ1RPLG9CQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYyxtREFBa0QvQyxLQUFNLEVBQXRFO0FBQ0Q7QUFDRixpQkFKVyxDQUFaO0FBS0EsdUJBQU87QUFDTCxtQkFBQ0EsS0FBRCxHQUFTO0FBREosaUJBQVA7QUFHRDs7QUFFRCxxQkFBTztBQUNMLGlCQUFDQSxLQUFELEdBQVM2QyxHQUFHLENBQUNwQixhQUFKLENBQWtCO0FBQUVhLGtCQUFBQTtBQUFGLGlCQUFsQjtBQURKLGVBQVA7QUFHRCxhQW5CMkIsQ0FBOUI7QUFzQkEscUNBQ0tFLGNBREwsRUFFS0UsVUFGTCxFQUdLUSxZQUhMO0FBS0QsV0F4TDZCOztBQUFBLGlEQTBMZCxrQkFBa0M7QUFBQSxnQkFBM0JOLE1BQTJCLHVFQUFsQixFQUFrQjtBQUFBLGdCQUFkUSxJQUFjLHVFQUFQLEVBQU87O0FBQ2hELGtCQUFNQyxVQUFVLEdBQUdyRCxLQUFLLElBQUksZUFDMUIsS0FBSSxDQUFDYixNQURxQixFQUUxQm1FLElBRjBCLENBRXJCckMsS0FBSyxJQUFJQSxLQUFLLENBQUNqQixLQUFOLEtBQWdCQSxLQUZKLENBQTVCOztBQUlBLGtCQUFNdUQsWUFBWSxHQUFHdkQsS0FBSyxJQUFJLGVBQzVCLEtBQUksQ0FBQ1osUUFEdUIsRUFFNUJrRSxJQUY0QixDQUV2QkgsT0FBTyxJQUFJQSxPQUFPLENBQUNuRCxLQUFSLEtBQWtCQSxLQUZOLENBQTlCOztBQUlBLGtCQUFNbkIsTUFBTSxHQUFHLE1BQU0sYUFBWXFDLENBQUMsSUFBSSxLQUFJLENBQUNFLFFBQUwsQ0FBYyxFQUFkLEVBQWtCRixDQUFsQixDQUFqQixDQUFyQjs7QUFFQSxrQkFBTTFDLFNBQVMsQ0FBQ29FLE1BQUQsRUFBUyxPQUFPNUMsS0FBUCxFQUFjZSxLQUFkLEtBQXdCO0FBQzlDLG9CQUFNRSxLQUFLLEdBQUdvQyxVQUFVLENBQUNyRCxLQUFELENBQXhCO0FBQ0Esb0JBQU1tRCxPQUFPLEdBQUdJLFlBQVksQ0FBQ3ZELEtBQUQsQ0FBNUI7O0FBRUEsa0JBQUltRCxPQUFKLEVBQWE7QUFBQSxzQkFDTUssYUFETixHQUN3QkosSUFEeEIsQ0FDRnBELEtBREU7QUFBQSxzQkFFSDZDLEdBRkcsR0FFS00sT0FGTCxDQUVITixHQUZHOztBQUlYLG9CQUFJLENBQUNBLEdBQUwsRUFBVTtBQUNSQyxrQkFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWMseUJBQXdCL0MsS0FBTSwrRkFBNUM7QUFDQTtBQUNEOztBQUVENkMsZ0JBQUFBLEdBQUcsQ0FBQ3RCLGFBQUosQ0FBa0JSLEtBQWxCLEVBQXlCeUMsYUFBekI7QUFDQTtBQUNEOztBQUVELGtCQUFJLENBQUN2QyxLQUFMLEVBQVk7QUFBRTtBQUFGLG9DQUMyQm1DLElBRDNCLENBQ0RwRCxLQURDO0FBQUEsc0JBQ095RCxNQURQLDRCQUNnQkMsQ0FBQyxJQUFJQSxDQURyQjs7QUFFVixnQkFBQSxLQUFJLENBQUM5QixLQUFMLENBQVdLLE1BQVgsQ0FBa0JqQyxLQUFsQixFQUF5QjtBQUFFZSxrQkFBQUEsS0FBSyxFQUFFMEMsTUFBTSxDQUFDMUMsS0FBRDtBQUFmLGlCQUF6Qjs7QUFDQTtBQUNEOztBQUVELGtCQUFJLENBQUMsZUFBY0EsS0FBZCxDQUFELElBQXlCQSxLQUFLLENBQUM0QyxNQUFOLEdBQWUsQ0FBNUMsRUFBK0MsT0F2QkQsQ0F5QjlDOztBQUNBMUMsY0FBQUEsS0FBSyxDQUFDUixNQUFOLEdBQWUsQ0FBQyxHQUFHLElBQUlDLEtBQUosQ0FBVUssS0FBSyxDQUFDNEMsTUFBaEIsQ0FBSixFQUE2QmhELEdBQTdCLENBQWlDLE1BQU0sS0FBSSxDQUFDQyxFQUFMLEVBQXZDLENBQWYsQ0ExQjhDLENBNEI5QztBQUNBOztBQUNBLG9CQUFNL0IsTUFBTSxFQUFaLENBOUI4QyxDQStCOUM7QUFFQTs7QUFqQzhDLG9CQWtDdEMyQixRQWxDc0MsR0FrQ1BTLEtBbENPLENBa0N0Q1QsUUFsQ3NDO0FBQUEsb0JBa0M1QkMsTUFsQzRCLEdBa0NQUSxLQWxDTyxDQWtDNUJSLE1BbEM0QjtBQUFBLG9CQWtDcEJYLFFBbENvQixHQWtDUG1CLEtBbENPLENBa0NwQm5CLFFBbENvQjtBQW9DOUMsb0JBQU1yQixjQUFjLENBQUNnQyxNQUFELEVBQVMsT0FBT21ELEtBQVAsRUFBY2hELEVBQWQsS0FBcUI7QUFDaEQsc0JBQU1pQyxHQUFHLEdBQUcsTUFBTXhELFdBQVcsQ0FBQyxNQUFNO0FBQUEsdUNBSzlCbUIsUUFMOEIsQ0FFL0JJLEVBRitCO0FBQUEsa0VBSTVCLEVBSjRCO0FBQUEsd0JBR3pCaUQsWUFIeUIsaUJBRzlCaEIsR0FIOEI7O0FBTWxDLHlCQUFPZ0IsWUFBUDtBQUNELGlCQVA0QixDQUE3Qjs7QUFTQSxvQkFBSSxDQUFDaEIsR0FBTCxFQUFVO0FBQ1JDLGtCQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYyxxQkFBb0JqRCxRQUFTLHFGQUEzQztBQUNBO0FBQ0Q7O0FBRUQsc0JBQU1nRSxjQUFjLEdBQUcvQyxLQUFLLENBQUM2QyxLQUFELENBQUwsSUFBZ0IsRUFBdkM7QUFmZ0QscUNBcUI1Q1IsSUFyQjRDLENBaUI3Q3BELEtBakI2QztBQUFBLHNCQWlCckMrRCxHQWpCcUMsNkJBaUIvQixPQUFPO0FBQ3BCQyxrQkFBQUEsTUFBTSxFQUFFLEVBRFk7QUFFcEJqRixrQkFBQUEsS0FBSyxFQUFFO0FBRmEsaUJBQVAsQ0FqQitCOztBQUFBLDZCQXVCWmdGLEdBQUcsQ0FBQ0QsY0FBRCxDQXZCUztBQUFBLHlDQXVCeENFLE1BdkJ3QztBQUFBLHNCQXVCeENBLE1BdkJ3Qyw0QkF1Qi9CLEVBdkIrQjtBQUFBLHdDQXVCM0JqRixLQXZCMkI7QUFBQSxzQkF1QjNCQSxLQXZCMkIsMkJBdUJuQixFQXZCbUI7O0FBeUJoRHlCLGdCQUFBQSxRQUFRLENBQUNJLEVBQUQsQ0FBUixDQUFhN0IsS0FBYixHQUFxQkEsS0FBckI7QUFFQThELGdCQUFBQSxHQUFHLENBQUN0QixhQUFKLENBQWtCdUMsY0FBbEIsRUFBa0NFLE1BQWxDO0FBQ0QsZUE1Qm1CLEVBNEJqQnZELE1BNUJpQixDQUFwQjtBQTZCRCxhQWpFYyxDQUFmOztBQW1FQSxZQUFBLEtBQUksQ0FBQ1csUUFBTCxDQUFjLEVBQWQ7QUFDRCxXQXpRNkI7O0FBQUEsMENBMlFyQjtBQUFBLDRGQUdMLEVBSEs7QUFBQSxvQ0FDUDZDLEtBRE87QUFBQSxnQkFDUEEsS0FETyw0QkFDQyxLQUREO0FBQUEscUNBRVBDLE1BRk87QUFBQSxnQkFFUEEsTUFGTyw2QkFFRSxJQUZGOztBQUFBLG1CQUlQLFNBQVFDLE9BQVIsR0FBa0JoRCxJQUFsQixDQUF1QixZQUFZO0FBQ2pDLGtCQUFJaUQsUUFBUSxHQUFHLEtBQWY7QUFDQSxvQkFBTTVCLGNBQWMsR0FBRyxNQUFNL0QsY0FBYyxDQUN6QyxLQUFJLENBQUNtRCxLQUFMLENBQVdTLEdBQVgsRUFEeUMsRUFFekMsT0FDRXJDLEtBREYsRUFFRW9DLE1BRkYsS0FFYTtBQUFBLHNDQUdQQSxNQUhPLENBRVRpQyxLQUZTO0FBQUEsc0JBRVRBLEtBRlMsOEJBRUQsRUFGQztBQUFBLHNCQUVHNUIsT0FGSCxHQUdQTCxNQUhPLENBRUdLLE9BRkg7QUFBQSxzQkFFWTFCLEtBRlosR0FHUHFCLE1BSE8sQ0FFWXJCLEtBRlo7QUFBQSxzQkFFbUJ1RCxLQUZuQixHQUdQbEMsTUFITyxDQUVtQmtDLEtBRm5COztBQUlYLG9CQUFJLENBQUM3QixPQUFMLEVBQWM7QUFBRSx5QkFBTyxFQUFQO0FBQVk7O0FBRTVCLHFCQUFLLE1BQU04QixJQUFYLElBQW1CRixLQUFuQixFQUEwQjtBQUN4Qix3QkFBTUcsTUFBTSxHQUFHLE1BQU1ELElBQUksQ0FBQ1IsR0FBTCxDQUFTaEQsS0FBVCxDQUFyQjs7QUFDQSxzQkFBSSxDQUFDeUQsTUFBTCxFQUFhO0FBQ1hKLG9CQUFBQSxRQUFRLEdBQUcsSUFBWDtBQUNBLDBCQUFNcEMsS0FBSyxHQUFHdUMsSUFBSSxDQUFDdkMsS0FBTCxDQUFXO0FBQUVzQyxzQkFBQUEsS0FBRjtBQUFTdEUsc0JBQUFBO0FBQVQscUJBQVgsQ0FBZDs7QUFDQSxvQkFBQSxLQUFJLENBQUN3QixjQUFMLENBQW9CO0FBQUUsdUJBQUN4QixLQUFELEdBQVNnQztBQUFYLHFCQUFwQjs7QUFDQTtBQUNEO0FBQ0Y7O0FBRUQsdUJBQU87QUFBRSxtQkFBQ2hDLEtBQUQsR0FBU2U7QUFBWCxpQkFBUDtBQUNELGVBckJ3QyxDQUEzQztBQXdCQSxvQkFBTTJCLFVBQVUsR0FBRyxNQUFNakUsY0FBYyxDQUNyQyxLQUFJLENBQUNVLE1BRGdDLEVBRXJDLE9BQ0V3RCxTQURGLGFBS1E7QUFBQSxvQkFGSjNDLEtBRUksVUFGSkEsS0FFSTtBQUFBLDZDQURKUSxRQUNJO0FBQUEsb0JBREpBLFFBQ0ksZ0NBRE8sRUFDUDtBQUFBLG9CQURXQyxNQUNYLFVBRFdBLE1BQ1g7QUFDTixzQkFBTW1DLE1BQU0sR0FBRyxFQUFmOztBQUVBLHFCQUFLLE1BQU1oQyxFQUFYLElBQWlCSCxNQUFqQixFQUF5QjtBQUN2QixzQkFBSSxDQUFDRCxRQUFRLENBQUNJLEVBQUQsQ0FBUixDQUFhaUMsR0FBbEIsRUFBdUI7QUFDckJDLG9CQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYyxzREFBcUQvQyxLQUFNLFFBQU9ZLEVBQUcsRUFBbkY7QUFDQTtBQUNEOztBQUNELHdCQUFNb0MsTUFBTSxHQUFHLE1BQU14QyxRQUFRLENBQUNJLEVBQUQsQ0FBUixDQUFhaUMsR0FBYixDQUFpQmxCLE1BQWpCLEVBQXJCO0FBQ0Esc0JBQUlxQixNQUFNLENBQUNvQixRQUFYLEVBQXFCQSxRQUFRLEdBQUcsSUFBWDtBQUNyQnhCLGtCQUFBQSxNQUFNLENBQUNLLElBQVAsQ0FBWUQsTUFBTSxDQUFDeUIsSUFBbkI7QUFDRDs7QUFFRCx1QkFBTztBQUNMLG1CQUFDekUsS0FBRCxHQUFTNEM7QUFESixpQkFBUDtBQUdELGVBdkJvQyxDQUF2QztBQTBCQSxvQkFBTU0sWUFBWSxHQUFHLE1BQU16RSxjQUFjLENBQ3ZDLEtBQUksQ0FBQ1csUUFEa0MsRUFFdkMsT0FBT1UsUUFBUCxFQUFpQnFELE9BQWpCLEtBQTZCO0FBQUEsc0JBQ25CTixHQURtQixHQUNKTSxPQURJLENBQ25CTixHQURtQjtBQUFBLHNCQUNkN0MsS0FEYyxHQUNKbUQsT0FESSxDQUNkbkQsS0FEYzs7QUFHM0Isb0JBQUksQ0FBQzZDLEdBQUwsRUFBVTtBQUNSQyxrQkFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWMsbURBQWtEL0MsS0FBTSxHQUF0RTtBQUNBLHlCQUFPO0FBQUUscUJBQUNBLEtBQUQsR0FBUztBQUFYLG1CQUFQO0FBQ0Q7O0FBTjBCLCtCQVFpQixNQUFNNkMsR0FBRyxDQUFDbEIsTUFBSixFQVJ2QjtBQUFBLHNCQVFuQjhDLElBUm1CLFVBUW5CQSxJQVJtQjtBQUFBLHNCQVFIQyxlQVJHLFVBUWJOLFFBUmE7O0FBUzNCQSxnQkFBQUEsUUFBUSxHQUFHTSxlQUFYO0FBQ0EsdUJBQU87QUFDTCxtQkFBQzFFLEtBQUQsR0FBU3lFO0FBREosaUJBQVA7QUFHRCxlQWZzQyxDQUF6QztBQWtCQSxxQkFBTztBQUNMTCxnQkFBQUEsUUFESztBQUVMSyxnQkFBQUEsSUFBSSxvQkFDQ2pDLGNBREQsRUFFQ0UsVUFGRCxFQUdDUSxZQUhEO0FBRkMsZUFBUDtBQVFELGFBOUVELENBSk87QUFBQSxXQTNRcUI7O0FBRzVCLGVBQUt0QixLQUFMLEdBQWE3RCxtQkFBbUIsRUFBaEMsQ0FINEIsQ0FJNUI7O0FBQ0EsZUFBS3FCLFFBQUwsR0FBZ0JuQixxQkFBcUIsQ0FBQztBQUFFbUIsWUFBQUEsUUFBRjtBQUFZNEIsWUFBQUEsYUFBYSxFQUFFLEtBQUtBO0FBQWhDLFdBQUQsQ0FBckM7QUFFQSxlQUFLSyxRQUFMLEdBQWdCckQsY0FBYyxDQUFDO0FBQzdCMkcsWUFBQUEsaUJBQWlCLEVBQUUsS0FBS0E7QUFESyxXQUFELENBQTlCO0FBSUEsZUFBS3pGLFNBQUwsR0FBaUJmLGVBQWUsQ0FBQztBQUMvQmUsWUFBQUEsU0FEK0I7QUFFL0J5RixZQUFBQSxpQkFBaUIsRUFBRSxLQUFLQTtBQUZPLFdBQUQsQ0FBaEM7QUFLQSxlQUFLL0QsRUFBTCxHQUFVLENBQVY7QUFDQSxlQUFLekIsTUFBTCxHQUFjLEtBQUt5RixZQUFMLENBQWtCekYsTUFBbEIsQ0FBZDtBQUVBLGVBQUswRixLQUFMLEdBQWE7QUFDWGpELFlBQUFBLEtBQUssRUFBRSxLQUFLQSxLQUREO0FBRVhQLFlBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUZKO0FBR1hULFlBQUFBLEVBQUUsRUFBRSxLQUFLQSxFQUhFO0FBSVgxQixZQUFBQSxTQUFTLEVBQUUsS0FBS0EsU0FKTDtBQUtYRSxZQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFMSjtBQU1YRCxZQUFBQSxNQUFNLEVBQUUsS0FBS0E7QUFORixXQUFiO0FBUUQ7O0FBc1VETixRQUFBQSxNQUFNLEdBQUc7QUFBQTs7QUFBQSw4QkFDb0MsS0FBS0UsS0FEekM7QUFBQSxtREFDQytGLFFBREQ7QUFBQSxnQkFDQ0EsUUFERCxxQ0FDWSxNQUFNLENBQUUsQ0FEcEI7QUFBQSxnQkFDeUJDLE1BRHpCOztBQUVQLGlCQUNFLG9CQUFDLElBQUQ7QUFDRSxZQUFBLEdBQUcsRUFBR0QsUUFEUjtBQUVFLFlBQUEsUUFBUSxvQkFDSCxLQUFLSCxpQkFBTCxFQURHO0FBRU43RixjQUFBQSxjQUFjLEVBQUU7QUFBQSxvQkFBQ0MsS0FBRCx1RUFBUyxFQUFUO0FBQUEsdUJBQ2Qsb0JBQUMsSUFBRCxlQUNPQSxLQURQO0FBRUUsa0JBQUEsUUFBUSxvQkFDSCxNQUFJLENBQUM0RixpQkFBTCxFQURHO0FBRU56RixvQkFBQUEsU0FBUyxFQUFFLE1BQUksQ0FBQ0EsU0FGVjtBQUdOQyxvQkFBQUEsTUFBTSxFQUFFZixTQUFTLENBQUM7QUFDaEJlLHNCQUFBQSxNQUFNLEVBQUUsTUFBSSxDQUFDQSxNQURHO0FBRWhCTixzQkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ21DLGFBRkc7QUFHaEJnRSxzQkFBQUEsS0FBSyxFQUFFLE1BQU0sTUFBSSxDQUFDcEUsRUFIRjtBQUloQnFFLHNCQUFBQSxLQUFLLEVBQUdyRSxFQUFELElBQVE7QUFBRSx3QkFBQSxNQUFJLENBQUNBLEVBQUwsR0FBVUEsRUFBVjtBQUFlO0FBSmhCLHFCQUFELENBSFg7QUFTTnhCLG9CQUFBQSxRQUFRLEVBQUVmLFdBQVcsQ0FBQztBQUFFZSxzQkFBQUEsUUFBUSxFQUFFLE1BQUksQ0FBQ0E7QUFBakIscUJBQUQ7QUFUZjtBQUZWLG1CQURjO0FBQUE7QUFGVjtBQUZWLGFBcUJPMkYsTUFyQlAsRUFERjtBQXlCRDs7QUE3WHFDLE9BQXhDO0FBK1hELEtBaFlEO0FBaVlELEdBbFlEO0FBbVlEOztBQUVELGVBQWU5RixVQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVEaW5vRm9ybVN0b3JlIGZyb20gJy4vRGlub0Zvcm1TdG9yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVGcm9tSXRlbSxcbiAgY3JlYXRlRGlub0Zvcm1TdWJGb3JtLFxuICBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCxcbiAgY3JlYXRlRnJhZ21lbnRzLFxuICBncm91cHNBUEksXG4gIHN1YkZvcm1zQVBJLFxuICBnZXRSZWYsXG59IGZyb20gJy4vRGlub0Zvcm1IZWxwZXInO1xuXG5pbXBvcnQge1xuICBzbGVlcCwgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYywgaXNQcm9kdWN0aW9uLFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgaXNOb3RFeGlzdCB9IGZyb20gJy4uL2VzJztcblxuY2xhc3MgV3JhcENvbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRpbm9Gb3JtOiB7IHJlbmRlckRpbm9Gb3JtIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtKHRoaXMucHJvcHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oe1xuICBmcmFnbWVudHMgPSB7fSxcbiAgZ3JvdXBzID0ge30sXG4gIHN1YkZvcm1zID0ge30sXG4gIGdldEdyb3VwUmVmID0gZ2V0UmVmLFxufSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGUoVmlldykge1xuICAgIHJldHVybiBmdW5jdGlvbiBiaW5kV3JhcChXcmFwID0gV3JhcENvbSkge1xuICAgICAgcmV0dXJuIGNsYXNzIERpbm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RydWN0b3JQcm9wcykge1xuICAgICAgICAgIHN1cGVyKGNvbnN0cnVjdG9yUHJvcHMpO1xuXG4gICAgICAgICAgdGhpcy5zdG9yZSA9IGNyZWF0ZURpbm9Gb3JtU3RvcmUoKTtcbiAgICAgICAgICAvLyB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHN1YkZvcm1zLCB0aGlzLnRvcEZvcm1SZW5kZXIpO1xuICAgICAgICAgIHRoaXMuc3ViRm9ybXMgPSBjcmVhdGVEaW5vRm9ybVN1YkZvcm0oeyBzdWJGb3JtcywgdG9wRm9ybVJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyIH0pO1xuXG4gICAgICAgICAgdGhpcy5Gcm9tSXRlbSA9IGNyZWF0ZUZyb21JdGVtKHtcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5mcmFnbWVudHMgPSBjcmVhdGVGcmFnbWVudHMoe1xuICAgICAgICAgICAgZnJhZ21lbnRzLFxuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLklEID0gMDtcbiAgICAgICAgICB0aGlzLmdyb3VwcyA9IHRoaXMuY3JlYXRlR3JvdXBzKGdyb3Vwcyk7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcbiAgICAgICAgICAgIElEOiB0aGlzLklELFxuICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgIHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlR3JvdXBzID0gZ3JvdXBzT2JqID0+IG1hcE9iamVjdChncm91cHNPYmosIChmb3JtTmFtZSwge1xuICAgICAgICAgIENvbSxcbiAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICBjb3VudCxcbiAgICAgICAgICBmb3JtUHJvcHMgPSB7fSxcbiAgICAgICAgICBuZWVkRHJhZyA9IGZhbHNlLFxuICAgICAgICAgIGNsZWFyTW90aW9ucyxcbiAgICAgICAgICBwcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICBub3RQcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICBjcmVhdGVTdHlsZSxcbiAgICAgICAgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgSURSZWZNYXAgPSB7fTtcbiAgICAgICAgICBjb25zdCBJRExpc3QgPSBbLi4ubmV3IEFycmF5KGNvdW50KV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG4gICAgICAgICAgY29uc3QgRm9ybSA9IGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwKHtcbiAgICAgICAgICAgIHNldElEUmVmTWFwOiAoSUQsIHZhbHVlKSA9PiB7IHRoaXMuZ3JvdXBzW2Zvcm1OYW1lXS5JRFJlZk1hcFtJRF0gPSB2YWx1ZTsgfSxcbiAgICAgICAgICAgIHRvcEZvcm1SZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwID0ge1xuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICBmb3JtUHJvcHMsXG4gICAgICAgICAgICBmb3JtTmFtZSxcbiAgICAgICAgICAgIG5lZWREcmFnLFxuICAgICAgICAgICAgSURSZWZNYXAsXG4gICAgICAgICAgICBJRExpc3QsXG4gICAgICAgICAgICBGb3JtLFxuICAgICAgICAgICAgY2xlYXJNb3Rpb25zLFxuICAgICAgICAgICAgcHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgICBub3RQcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICAgIGNyZWF0ZVN0eWxlLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgIFtmb3JtTmFtZV06IGdyb3VwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRvcEZvcm1SZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIoKS50aGVuKHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7fSwgcik7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGkgPSAoKSA9PiAoe1xuICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuXG4gICAgICAgICAgc2V0RmllbGRzVmFsdWU6IHRoaXMuc2V0RmllbGRzVmFsdWUsXG4gICAgICAgICAgc2V0RnVsbFZhbHVlczogdGhpcy5zZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIHNldEZpZWxkc0Vycm9yOiB0aGlzLnNldEZpZWxkc0Vycm9yLFxuXG4gICAgICAgICAgZ2V0RnVsbFZhbHVlczogdGhpcy5nZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIGdldEZpZWxkc1ZhbHVlOiB0aGlzLmdldEZpZWxkc1ZhbHVlLFxuXG4gICAgICAgICAgdmVyaWZ5OiB0aGlzLnZlcmlmeSxcbiAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICBkaW5vRm9ybVJlZjogdGhpcyxcbiAgICAgICAgfSlcblxuICAgICAgICBzZXRGaWVsZHNFcnJvciA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBlcnJvcl0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IGVycm9yIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RmllbGRzVmFsdWUgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgbmV3VmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbmV3VmFsdWUgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnRvcEZvcm1SZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlID0gKC4uLmZpZWxkcykgPT4gZmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWUgPSB0aGlzLnN0b3JlLmdldChmaWVsZCkgfHwge307XG4gICAgICAgICAgcmV0dXJuIHNjaGVtZS52YWx1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICBnZXRGdWxsVmFsdWVzID0gKHsgb25seUdldE1vdW50ID0gdHJ1ZSwgZGVidWcgPSBmYWxzZSB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZ2V0KCksXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICBzY2hlbWUsXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyBpc01vdW50LCB2YWx1ZSB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICByZXR1cm4gb25seUdldE1vdW50XG4gICAgICAgICAgICAgICAgPyBpc01vdW50ID8geyBbZmllbGRdOiB2YWx1ZSB9IDoge31cbiAgICAgICAgICAgICAgICA6IHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgSURSZWZNYXAgPSBbXSxcbiAgICAgICAgICAgICAgICBJRExpc3QsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cCA9IElEUmVmTWFwW0lEXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc05vdEV4aXN0KGdyb3VwKSB8fCBpc05vdEV4aXN0KGdyb3VwLnJlZikpIHtcbiAgICAgICAgICAgICAgICAgIGlzUHJvZHVjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZ3JvdXAgZnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0sIElEPSR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IElEUmVmTWFwW0lEXS5yZWYuZ2V0RnVsbFZhbHVlcyh7IG9ubHlHZXRNb3VudCB9KTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGlzUHJvZHVjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBzdWJGb3JtIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfWApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiB7fSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiByZWYuZ2V0RnVsbFZhbHVlcyh7IG9ubHlHZXRNb3VudCB9KSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZ1bGxWYWx1ZXMgPSBhc3luYyAodmFsdWVzID0ge30sIG1hcHMgPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbmRHcm91cHMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgKS5maW5kKGdyb3VwID0+IGdyb3VwLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCBmaW5kU3ViRm9ybXMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICApLmZpbmQoc3ViRm9ybSA9PiBzdWJGb3JtLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZShyID0+IHRoaXMuc2V0U3RhdGUoe30sIHIpKTtcblxuICAgICAgICAgIGF3YWl0IG1hcE9iamVjdCh2YWx1ZXMsIGFzeW5jIChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmluZEdyb3VwcyhmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtID0gZmluZFN1YkZvcm1zKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHN1YkZvcm0pIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBzdWJGb3JtTWFwT2JqIH0gPSBtYXBzO1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZmllbGQgaXMgJyR7ZmllbGR9JyBzdWJGb3JtIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIHN1YkZvcm0uYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXModmFsdWUsIHN1YkZvcm1NYXBPYmopO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ3JvdXApIHsgLy8gZnJhZ21lbnRcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBtYXBGdW4gPSBfID0+IF8gfSA9IG1hcHM7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBtYXBGdW4odmFsdWUpIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBkZWxldGUgSURMaXN0IGFuZCBhZGRcbiAgICAgICAgICAgIGdyb3VwLklETGlzdCA9IFsuLi5uZXcgQXJyYXkodmFsdWUubGVuZ3RoKV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG5cbiAgICAgICAgICAgIC8vIHJlbmRlclxuICAgICAgICAgICAgLy8gYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMudG9wRm9ybVJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIGF3YWl0IG1hcE9iamVjdEFzeW5jKElETGlzdCwgYXN5bmMgKGluZGV4LCBJRCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZWYgPSBhd2FpdCBnZXRHcm91cFJlZigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgW0lEXToge1xuICAgICAgICAgICAgICAgICAgICByZWY6IGdyb3VwRm9ybVJlZixcbiAgICAgICAgICAgICAgICAgIH0gPSB7fSxcbiAgICAgICAgICAgICAgICB9ID0gSURSZWZNYXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwRm9ybVJlZjtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGZvcm0gJyR7Zm9ybU5hbWV9JyBzaG91bGQgYmUgbW91bnRlZCBidXQgdGhlIFJlZiBpcyBub3QgcmVnaXN0ZXJlZCwgbWF5YmUgeW91IG5vdCByZW5kZXIgdGhpcyBncm91cC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1WYWx1ZSA9IHZhbHVlW2luZGV4XSB8fCBbXTtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IGZ1biA9ICgpID0+ICh7XG4gICAgICAgICAgICAgICAgICBtYXBPYmo6IHt9LFxuICAgICAgICAgICAgICAgICAgcHJvcHM6IHt9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB9ID0gbWFwcztcblxuICAgICAgICAgICAgICBjb25zdCB7IG1hcE9iaiA9IHt9LCBwcm9wcyA9IHt9IH0gPSBmdW4oZ3JvdXBJdGVtVmFsdWUpO1xuXG4gICAgICAgICAgICAgIElEUmVmTWFwW0lEXS5wcm9wcyA9IHByb3BzO1xuXG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKGdyb3VwSXRlbVZhbHVlLCBtYXBPYmopO1xuICAgICAgICAgICAgfSwgSURMaXN0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmVyaWZ5ID0gKHtcbiAgICAgICAgICBmaXJzdCA9IGZhbHNlLCAvLyB0b2RvXG4gICAgICAgICAgc2Nyb2xsID0gdHJ1ZSwgLy8gdG9kb1xuICAgICAgICB9ID0ge30pID0+IChcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIHNjaGVtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIHJ1bGVzID0gW10sIGlzTW91bnQsIHZhbHVlLCBsYWJlbCxcbiAgICAgICAgICAgICAgICB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICAgIGlmICghaXNNb3VudCkgeyByZXR1cm4ge307IH1cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNQYXNzID0gYXdhaXQgcnVsZS5mdW4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgaWYgKCFpc1Bhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHJ1bGUuZXJyb3IoeyBsYWJlbCwgZmllbGQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghSURSZWZNYXBbSURdLnJlZikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGdyb3VwIGZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LCBJRD0ke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IElEUmVmTWFwW0lEXS5yZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmhhc0Vycm9yKSBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAgIGFzeW5jIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIHN1YkZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LmApO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXToge30gfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGhhc0Vycm9yOiBzdWJGb3JtSGFzRXJyb3IgfSA9IGF3YWl0IHJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHN1YkZvcm1IYXNFcnJvcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogZGF0YSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaGFzRXJyb3IsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcblxuICAgICAgICApXG5cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIGNvbnN0IHsgY2F0Y2hSZWYgPSAoKSA9PiB7fSwgLi4ub3RoZXJzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8V3JhcFxuICAgICAgICAgICAgICByZWY9eyBjYXRjaFJlZiB9XG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICByZW5kZXJEaW5vRm9ybTogKHByb3BzID0ge30pID0+IChcbiAgICAgICAgICAgICAgICAgIDxWaWV3XG4gICAgICAgICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IGdyb3Vwc0FQSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJRDogKCkgPT4gdGhpcy5JRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldElEOiAoSUQpID0+IHsgdGhpcy5JRCA9IElEOyB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIHN1YkZvcm1zOiBzdWJGb3Jtc0FQSSh7IHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zIH0pLFxuICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgeyAuLi5vdGhlcnMgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRm9ybTtcbiJdfQ==