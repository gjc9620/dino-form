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
import { sleep, mapObject, mapObjectAsync, isProduction, isNotExist } from './util';

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

                const result = group.ref.getFullValues({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJnZXRSZWYiLCJzbGVlcCIsIm1hcE9iamVjdCIsIm1hcE9iamVjdEFzeW5jIiwiaXNQcm9kdWN0aW9uIiwiaXNOb3RFeGlzdCIsIldyYXBDb20iLCJyZW5kZXIiLCJyZW5kZXJEaW5vRm9ybSIsInByb3BzIiwiZGlub0Zvcm0iLCJjcmVhdGVGb3JtIiwiZnJhZ21lbnRzIiwiZ3JvdXBzIiwic3ViRm9ybXMiLCJnZXRHcm91cFJlZiIsImNyZWF0ZSIsIlZpZXciLCJiaW5kV3JhcCIsIldyYXAiLCJEaW5vRm9ybSIsImNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3JQcm9wcyIsImdyb3Vwc09iaiIsImZvcm1OYW1lIiwiQ29tIiwiZmllbGQiLCJjb3VudCIsImZvcm1Qcm9wcyIsIm5lZWREcmFnIiwiY2xlYXJNb3Rpb25zIiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJyIiwidGhlbiIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImRlYnVnIiwiZnJhZ21lbnRzRmllbGQiLCJpc01vdW50IiwiZ3JvdXBGaWVsZCIsImdyb3VwTmFtZSIsInZhbHVlcyIsInJlZiIsImNvbnNvbGUiLCJ3YXJuIiwicmVzdWx0IiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiZ3JvdXBGb3JtUmVmIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MsaUJBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixFQU9FQyxNQVBGLFFBUU8sa0JBUlA7QUFVQSxTQUNFQyxLQURGLEVBQ1NDLFNBRFQsRUFDb0JDLGNBRHBCLEVBQ29DQyxZQURwQyxFQUNrREMsVUFEbEQsUUFFTyxRQUZQOztBQUlBLE1BQU1DLE9BQU4sU0FBc0JkLFNBQXRCLENBQWdDO0FBQzlCZSxFQUFBQSxNQUFNLEdBQUc7QUFBQSxVQUNhQyxjQURiLEdBQ2tDLEtBQUtDLEtBRHZDLENBQ0NDLFFBREQsQ0FDYUYsY0FEYjtBQUVQLFdBQU9BLGNBQWMsQ0FBQyxLQUFLQyxLQUFOLENBQXJCO0FBQ0Q7O0FBSjZCOztBQU9oQyxTQUFTRSxVQUFULEdBS1E7QUFBQSxpRkFBSixFQUFJO0FBQUEsNEJBSk5DLFNBSU07QUFBQSxNQUpOQSxTQUlNLCtCQUpNLEVBSU47QUFBQSx5QkFITkMsTUFHTTtBQUFBLE1BSE5BLE1BR00sNEJBSEcsRUFHSDtBQUFBLDJCQUZOQyxRQUVNO0FBQUEsTUFGTkEsUUFFTSw4QkFGSyxFQUVMO0FBQUEsOEJBRE5DLFdBQ007QUFBQSxNQUROQSxXQUNNLGlDQURRZixNQUNSOztBQUNOLFNBQU8sU0FBU2dCLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCO0FBQzNCLFdBQU8sU0FBU0MsUUFBVCxHQUFrQztBQUFBOztBQUFBLFVBQWhCQyxJQUFnQix1RUFBVGIsT0FBUztBQUN2QyxxQkFBTyxNQUFNYyxRQUFOLFNBQXVCNUIsU0FBdkIsQ0FBaUM7QUFDdEM2QixRQUFBQSxXQUFXLENBQUNDLGdCQUFELEVBQW1CO0FBQUE7O0FBQzVCLGdCQUFNQSxnQkFBTixDQUQ0QjtBQUFBOztBQUFBLGdEQTZCZkMsU0FBUyxJQUFJckIsU0FBUyxDQUFDcUIsU0FBRCxFQUFZLFVBQUNDLFFBQUQsRUFVdEM7QUFBQSw0RkFBUCxFQUFPO0FBQUEsZ0JBVFRDLEdBU1MsU0FUVEEsR0FTUztBQUFBLGdCQVJUQyxLQVFTLFNBUlRBLEtBUVM7QUFBQSxnQkFQVEMsS0FPUyxTQVBUQSxLQU9TO0FBQUEsd0NBTlRDLFNBTVM7QUFBQSxnQkFOVEEsU0FNUyxnQ0FORyxFQU1IO0FBQUEsdUNBTFRDLFFBS1M7QUFBQSxnQkFMVEEsUUFLUywrQkFMRSxLQUtGO0FBQUEsZ0JBSlRDLFlBSVMsU0FKVEEsWUFJUztBQUFBLGdCQUhUQyxjQUdTLFNBSFRBLGNBR1M7QUFBQSxnQkFGVEMsaUJBRVMsU0FGVEEsaUJBRVM7QUFBQSxnQkFEVEMsV0FDUyxTQURUQSxXQUNTOztBQUNULGtCQUFNQyxRQUFRLEdBQUcsRUFBakI7QUFDQSxrQkFBTUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJQyxLQUFKLENBQVVULEtBQVYsQ0FBSixFQUFzQlUsR0FBdEIsQ0FBMEIsTUFBTSxLQUFJLENBQUNDLEVBQUwsRUFBaEMsQ0FBZjtBQUNBLGtCQUFNQyxJQUFJLEdBQUczQyx1QkFBdUIsQ0FBQztBQUNuQzRDLGNBQUFBLFdBQVcsRUFBRSxDQUFDRixFQUFELEVBQUtHLEtBQUwsS0FBZTtBQUFFLGdCQUFBLEtBQUksQ0FBQzVCLE1BQUwsQ0FBWVcsUUFBWixFQUFzQlUsUUFBdEIsQ0FBK0JJLEVBQS9CLElBQXFDRyxLQUFyQztBQUE2QyxlQUR4QztBQUVuQ0MsY0FBQUEsYUFBYSxFQUFFLEtBQUksQ0FBQ0EsYUFGZTtBQUduQ2pCLGNBQUFBO0FBSG1DLGFBQUQsQ0FBcEM7QUFNQSxrQkFBTWtCLEtBQUssR0FBRztBQUNabEIsY0FBQUEsR0FEWTtBQUVaQyxjQUFBQSxLQUZZO0FBR1pFLGNBQUFBLFNBSFk7QUFJWkosY0FBQUEsUUFKWTtBQUtaSyxjQUFBQSxRQUxZO0FBTVpLLGNBQUFBLFFBTlk7QUFPWkMsY0FBQUEsTUFQWTtBQVFaSSxjQUFBQSxJQVJZO0FBU1pULGNBQUFBLFlBVFk7QUFVWkMsY0FBQUEsY0FWWTtBQVdaQyxjQUFBQSxpQkFYWTtBQVlaQyxjQUFBQTtBQVpZLGFBQWQ7QUFlQSxtQkFBUTtBQUNOLGVBQUNULFFBQUQsR0FBWW1CO0FBRE4sYUFBUjtBQUdELFdBckNvQyxDQTdCUDs7QUFBQSxpREFvRWQsTUFBTSxhQUFhQyxDQUFELElBQU87QUFDdkMsZ0JBQUksS0FBS25DLEtBQUwsQ0FBV2lDLGFBQWYsRUFBOEI7QUFDNUIscUJBQU8sS0FBS2pDLEtBQUwsQ0FBV2lDLGFBQVgsR0FBMkJHLElBQTNCLENBQWdDRCxDQUFoQyxDQUFQO0FBQ0Q7O0FBQ0QsbUJBQU8sS0FBS0UsUUFBTCxDQUFjLEVBQWQsRUFBa0JGLENBQWxCLENBQVA7QUFDRCxXQUxxQixDQXBFUTs7QUFBQSxxREEyRVYsT0FBTztBQUN6QkcsWUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBRFU7QUFHekJDLFlBQUFBLGNBQWMsRUFBRSxLQUFLQSxjQUhJO0FBSXpCQyxZQUFBQSxhQUFhLEVBQUUsS0FBS0EsYUFKSztBQUt6QkMsWUFBQUEsY0FBYyxFQUFFLEtBQUtBLGNBTEk7QUFPekJDLFlBQUFBLGFBQWEsRUFBRSxLQUFLQSxhQVBLO0FBUXpCQyxZQUFBQSxjQUFjLEVBQUUsS0FBS0EsY0FSSTtBQVV6QkMsWUFBQUEsTUFBTSxFQUFFLEtBQUtBLE1BVlk7QUFXekJDLFlBQUFBLEtBQUssRUFBRSxLQUFLQSxLQVhhO0FBWXpCQyxZQUFBQSxXQUFXLEVBQUU7QUFaWSxXQUFQLENBM0VVOztBQUFBLGtEQTBGWkMsR0FBRCxJQUFTO0FBQ3hCLGFBQUMsR0FBRyxnQkFBZUEsR0FBZixDQUFKLEVBQXlCQyxPQUF6QixDQUFpQyxXQUFvQjtBQUFBO0FBQUEsa0JBQWxCL0IsS0FBa0I7QUFBQSxrQkFBWGdDLEtBQVc7O0FBQ25ELG1CQUFLSixLQUFMLENBQVdLLE1BQVgsQ0FBa0JqQyxLQUFsQixFQUF5QjtBQUFFZ0MsZ0JBQUFBO0FBQUYsZUFBekI7QUFDRCxhQUZEO0FBR0EsaUJBQUtaLFFBQUwsQ0FBYyxFQUFkO0FBQ0QsV0EvRjZCOztBQUFBLGtEQWlHWlUsR0FBRCxJQUFTO0FBQ3hCLGFBQUMsR0FBRyxnQkFBZUEsR0FBZixDQUFKLEVBQXlCQyxPQUF6QixDQUFpQyxXQUF1QjtBQUFBO0FBQUEsa0JBQXJCL0IsS0FBcUI7QUFBQSxrQkFBZGtDLFFBQWM7O0FBQ3RELG1CQUFLTixLQUFMLENBQVdLLE1BQVgsQ0FBa0JqQyxLQUFsQixFQUF5QjtBQUFFZSxnQkFBQUEsS0FBSyxFQUFFbUI7QUFBVCxlQUF6QjtBQUNELGFBRkQ7QUFJQSxpQkFBS2xCLGFBQUw7QUFDRCxXQXZHNkI7O0FBQUEsa0RBeUdiO0FBQUEsOENBQUltQixNQUFKO0FBQUlBLGNBQUFBLE1BQUo7QUFBQTs7QUFBQSxtQkFBZUEsTUFBTSxDQUFDeEIsR0FBUCxDQUFZWCxLQUFELElBQVc7QUFDcEQsb0JBQU1vQyxNQUFNLEdBQUcsS0FBSSxDQUFDUixLQUFMLENBQVdTLEdBQVgsQ0FBZXJDLEtBQWYsS0FBeUIsRUFBeEM7QUFDQSxxQkFBT29DLE1BQU0sQ0FBQ3JCLEtBQWQ7QUFDRCxhQUgrQixDQUFmO0FBQUEsV0F6R2E7O0FBQUEsaURBOEdkLFlBQWlEO0FBQUEsNEZBQVAsRUFBTztBQUFBLDJDQUE5Q3VCLFlBQThDO0FBQUEsZ0JBQTlDQSxZQUE4QyxtQ0FBL0IsSUFBK0I7QUFBQSxvQ0FBekJDLEtBQXlCO0FBQUEsZ0JBQXpCQSxLQUF5Qiw0QkFBakIsS0FBaUI7O0FBQy9ELGtCQUFNQyxjQUFjLEdBQUdoRSxTQUFTLENBQzlCLEtBQUksQ0FBQ29ELEtBQUwsQ0FBV1MsR0FBWCxFQUQ4QixFQUU5QixDQUNFckMsS0FERixFQUVFb0MsTUFGRixLQUdLO0FBQUEsb0JBQ0tLLE9BREwsR0FDd0JMLE1BRHhCLENBQ0tLLE9BREw7QUFBQSxvQkFDYzFCLEtBRGQsR0FDd0JxQixNQUR4QixDQUNjckIsS0FEZDtBQUVILHFCQUFPdUIsWUFBWSxHQUNmRyxPQUFPLEdBQUc7QUFBRSxpQkFBQ3pDLEtBQUQsR0FBU2U7QUFBWCxlQUFILEdBQXdCLEVBRGhCLEdBRWY7QUFBRSxpQkFBQ2YsS0FBRCxHQUFTZTtBQUFYLGVBRko7QUFHRCxhQVY2QixDQUFoQztBQWFBLGtCQUFNMkIsVUFBVSxHQUFHbEUsU0FBUyxDQUMxQixLQUFJLENBQUNXLE1BRHFCLEVBRTFCLENBQ0V3RCxTQURGLFlBT0s7QUFBQSxrQkFKRDNDLEtBSUMsU0FKREEsS0FJQztBQUFBLHlDQUhEUSxRQUdDO0FBQUEsa0JBSERBLFFBR0MsK0JBSFUsRUFHVjtBQUFBLGtCQUZEQyxNQUVDLFNBRkRBLE1BRUM7QUFDSCxvQkFBTW1DLE1BQU0sR0FBRyxFQUFmOztBQUVBLG1CQUFLLE1BQU1oQyxFQUFYLElBQWlCSCxNQUFqQixFQUF5QjtBQUN2QixzQkFBTVEsS0FBSyxHQUFHVCxRQUFRLENBQUNJLEVBQUQsQ0FBdEI7O0FBRUEsb0JBQUlqQyxVQUFVLENBQUNzQyxLQUFELENBQVYsSUFBcUJ0QyxVQUFVLENBQUNzQyxLQUFLLENBQUM0QixHQUFQLENBQW5DLEVBQWdEO0FBQzlDbkUsa0JBQUFBLFlBQVksQ0FBQyxNQUFNO0FBQ2pCLHdCQUFJNkQsS0FBSixFQUFXO0FBQ1RPLHNCQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYyxzREFBcUQvQyxLQUFNLFFBQU9ZLEVBQUcsRUFBbkY7QUFDRDtBQUNGLG1CQUpXLENBQVo7QUFLQTtBQUNEOztBQUNELHNCQUFNb0MsTUFBTSxHQUFHL0IsS0FBSyxDQUFDNEIsR0FBTixDQUFVcEIsYUFBVixDQUF3QjtBQUFFYSxrQkFBQUE7QUFBRixpQkFBeEIsQ0FBZjtBQUNBTSxnQkFBQUEsTUFBTSxDQUFDSyxJQUFQLENBQVlELE1BQVo7QUFDRDs7QUFFRCxxQkFBTztBQUNMLGlCQUFDaEQsS0FBRCxHQUFTNEM7QUFESixlQUFQO0FBR0QsYUE5QnlCLENBQTVCO0FBaUNBLGtCQUFNTSxZQUFZLEdBQUcxRSxTQUFTLENBQzVCLEtBQUksQ0FBQ1ksUUFEdUIsRUFFNUIsQ0FBQ1UsUUFBRCxFQUFXcUQsT0FBWCxLQUF1QjtBQUFBLG9CQUNiTixHQURhLEdBQ0VNLE9BREYsQ0FDYk4sR0FEYTtBQUFBLG9CQUNSN0MsS0FEUSxHQUNFbUQsT0FERixDQUNSbkQsS0FEUTs7QUFHckIsa0JBQUksQ0FBQzZDLEdBQUwsRUFBVTtBQUNSbkUsZ0JBQUFBLFlBQVksQ0FBQyxNQUFNO0FBQ2pCLHNCQUFJNkQsS0FBSixFQUFXO0FBQ1RPLG9CQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYyxtREFBa0QvQyxLQUFNLEVBQXRFO0FBQ0Q7QUFDRixpQkFKVyxDQUFaO0FBS0EsdUJBQU87QUFDTCxtQkFBQ0EsS0FBRCxHQUFTO0FBREosaUJBQVA7QUFHRDs7QUFFRCxxQkFBTztBQUNMLGlCQUFDQSxLQUFELEdBQVM2QyxHQUFHLENBQUNwQixhQUFKLENBQWtCO0FBQUVhLGtCQUFBQTtBQUFGLGlCQUFsQjtBQURKLGVBQVA7QUFHRCxhQW5CMkIsQ0FBOUI7QUFzQkEscUNBQ0tFLGNBREwsRUFFS0UsVUFGTCxFQUdLUSxZQUhMO0FBS0QsV0F4TDZCOztBQUFBLGlEQTBMZCxrQkFBa0M7QUFBQSxnQkFBM0JOLE1BQTJCLHVFQUFsQixFQUFrQjtBQUFBLGdCQUFkUSxJQUFjLHVFQUFQLEVBQU87O0FBQ2hELGtCQUFNQyxVQUFVLEdBQUdyRCxLQUFLLElBQUksZUFDMUIsS0FBSSxDQUFDYixNQURxQixFQUUxQm1FLElBRjBCLENBRXJCckMsS0FBSyxJQUFJQSxLQUFLLENBQUNqQixLQUFOLEtBQWdCQSxLQUZKLENBQTVCOztBQUlBLGtCQUFNdUQsWUFBWSxHQUFHdkQsS0FBSyxJQUFJLGVBQzVCLEtBQUksQ0FBQ1osUUFEdUIsRUFFNUJrRSxJQUY0QixDQUV2QkgsT0FBTyxJQUFJQSxPQUFPLENBQUNuRCxLQUFSLEtBQWtCQSxLQUZOLENBQTlCOztBQUlBLGtCQUFNbkIsTUFBTSxHQUFHLE1BQU0sYUFBWXFDLENBQUMsSUFBSSxLQUFJLENBQUNFLFFBQUwsQ0FBYyxFQUFkLEVBQWtCRixDQUFsQixDQUFqQixDQUFyQjs7QUFFQSxrQkFBTTFDLFNBQVMsQ0FBQ29FLE1BQUQsRUFBUyxPQUFPNUMsS0FBUCxFQUFjZSxLQUFkLEtBQXdCO0FBQzlDLG9CQUFNRSxLQUFLLEdBQUdvQyxVQUFVLENBQUNyRCxLQUFELENBQXhCO0FBQ0Esb0JBQU1tRCxPQUFPLEdBQUdJLFlBQVksQ0FBQ3ZELEtBQUQsQ0FBNUI7O0FBRUEsa0JBQUltRCxPQUFKLEVBQWE7QUFBQSxzQkFDTUssYUFETixHQUN3QkosSUFEeEIsQ0FDRnBELEtBREU7QUFBQSxzQkFFSDZDLEdBRkcsR0FFS00sT0FGTCxDQUVITixHQUZHOztBQUlYLG9CQUFJLENBQUNBLEdBQUwsRUFBVTtBQUNSQyxrQkFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWMseUJBQXdCL0MsS0FBTSwrRkFBNUM7QUFDQTtBQUNEOztBQUVENkMsZ0JBQUFBLEdBQUcsQ0FBQ3RCLGFBQUosQ0FBa0JSLEtBQWxCLEVBQXlCeUMsYUFBekI7QUFDQTtBQUNEOztBQUVELGtCQUFJLENBQUN2QyxLQUFMLEVBQVk7QUFBRTtBQUFGLG9DQUMyQm1DLElBRDNCLENBQ0RwRCxLQURDO0FBQUEsc0JBQ095RCxNQURQLDRCQUNnQkMsQ0FBQyxJQUFJQSxDQURyQjs7QUFFVixnQkFBQSxLQUFJLENBQUM5QixLQUFMLENBQVdLLE1BQVgsQ0FBa0JqQyxLQUFsQixFQUF5QjtBQUFFZSxrQkFBQUEsS0FBSyxFQUFFMEMsTUFBTSxDQUFDMUMsS0FBRDtBQUFmLGlCQUF6Qjs7QUFDQTtBQUNEOztBQUVELGtCQUFJLENBQUMsZUFBY0EsS0FBZCxDQUFELElBQXlCQSxLQUFLLENBQUM0QyxNQUFOLEdBQWUsQ0FBNUMsRUFBK0MsT0F2QkQsQ0F5QjlDOztBQUNBMUMsY0FBQUEsS0FBSyxDQUFDUixNQUFOLEdBQWUsQ0FBQyxHQUFHLElBQUlDLEtBQUosQ0FBVUssS0FBSyxDQUFDNEMsTUFBaEIsQ0FBSixFQUE2QmhELEdBQTdCLENBQWlDLE1BQU0sS0FBSSxDQUFDQyxFQUFMLEVBQXZDLENBQWYsQ0ExQjhDLENBNEI5QztBQUNBOztBQUNBLG9CQUFNL0IsTUFBTSxFQUFaLENBOUI4QyxDQStCOUM7QUFFQTs7QUFqQzhDLG9CQWtDdEMyQixRQWxDc0MsR0FrQ1BTLEtBbENPLENBa0N0Q1QsUUFsQ3NDO0FBQUEsb0JBa0M1QkMsTUFsQzRCLEdBa0NQUSxLQWxDTyxDQWtDNUJSLE1BbEM0QjtBQUFBLG9CQWtDcEJYLFFBbENvQixHQWtDUG1CLEtBbENPLENBa0NwQm5CLFFBbENvQjtBQW9DOUMsb0JBQU1yQixjQUFjLENBQUNnQyxNQUFELEVBQVMsT0FBT21ELEtBQVAsRUFBY2hELEVBQWQsS0FBcUI7QUFDaEQsc0JBQU1pQyxHQUFHLEdBQUcsTUFBTXhELFdBQVcsQ0FBQyxNQUFNO0FBQUEsdUNBSzlCbUIsUUFMOEIsQ0FFL0JJLEVBRitCO0FBQUEsa0VBSTVCLEVBSjRCO0FBQUEsd0JBR3pCaUQsWUFIeUIsaUJBRzlCaEIsR0FIOEI7O0FBTWxDLHlCQUFPZ0IsWUFBUDtBQUNELGlCQVA0QixDQUE3Qjs7QUFTQSxvQkFBSSxDQUFDaEIsR0FBTCxFQUFVO0FBQ1JDLGtCQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYyxxQkFBb0JqRCxRQUFTLHFGQUEzQztBQUNBO0FBQ0Q7O0FBRUQsc0JBQU1nRSxjQUFjLEdBQUcvQyxLQUFLLENBQUM2QyxLQUFELENBQUwsSUFBZ0IsRUFBdkM7QUFmZ0QscUNBcUI1Q1IsSUFyQjRDLENBaUI3Q3BELEtBakI2QztBQUFBLHNCQWlCckMrRCxHQWpCcUMsNkJBaUIvQixPQUFPO0FBQ3BCQyxrQkFBQUEsTUFBTSxFQUFFLEVBRFk7QUFFcEJqRixrQkFBQUEsS0FBSyxFQUFFO0FBRmEsaUJBQVAsQ0FqQitCOztBQUFBLDZCQXVCWmdGLEdBQUcsQ0FBQ0QsY0FBRCxDQXZCUztBQUFBLHlDQXVCeENFLE1BdkJ3QztBQUFBLHNCQXVCeENBLE1BdkJ3Qyw0QkF1Qi9CLEVBdkIrQjtBQUFBLHdDQXVCM0JqRixLQXZCMkI7QUFBQSxzQkF1QjNCQSxLQXZCMkIsMkJBdUJuQixFQXZCbUI7O0FBeUJoRHlCLGdCQUFBQSxRQUFRLENBQUNJLEVBQUQsQ0FBUixDQUFhN0IsS0FBYixHQUFxQkEsS0FBckI7QUFFQThELGdCQUFBQSxHQUFHLENBQUN0QixhQUFKLENBQWtCdUMsY0FBbEIsRUFBa0NFLE1BQWxDO0FBQ0QsZUE1Qm1CLEVBNEJqQnZELE1BNUJpQixDQUFwQjtBQTZCRCxhQWpFYyxDQUFmOztBQW1FQSxZQUFBLEtBQUksQ0FBQ1csUUFBTCxDQUFjLEVBQWQ7QUFDRCxXQXpRNkI7O0FBQUEsMENBMlFyQjtBQUFBLDRGQUdMLEVBSEs7QUFBQSxvQ0FDUDZDLEtBRE87QUFBQSxnQkFDUEEsS0FETyw0QkFDQyxLQUREO0FBQUEscUNBRVBDLE1BRk87QUFBQSxnQkFFUEEsTUFGTyw2QkFFRSxJQUZGOztBQUFBLG1CQUlQLFNBQVFDLE9BQVIsR0FBa0JoRCxJQUFsQixDQUF1QixZQUFZO0FBQ2pDLGtCQUFJaUQsUUFBUSxHQUFHLEtBQWY7QUFDQSxvQkFBTTVCLGNBQWMsR0FBRyxNQUFNL0QsY0FBYyxDQUN6QyxLQUFJLENBQUNtRCxLQUFMLENBQVdTLEdBQVgsRUFEeUMsRUFFekMsT0FDRXJDLEtBREYsRUFFRW9DLE1BRkYsS0FFYTtBQUFBLHNDQUdQQSxNQUhPLENBRVRpQyxLQUZTO0FBQUEsc0JBRVRBLEtBRlMsOEJBRUQsRUFGQztBQUFBLHNCQUVHNUIsT0FGSCxHQUdQTCxNQUhPLENBRUdLLE9BRkg7QUFBQSxzQkFFWTFCLEtBRlosR0FHUHFCLE1BSE8sQ0FFWXJCLEtBRlo7QUFBQSxzQkFFbUJ1RCxLQUZuQixHQUdQbEMsTUFITyxDQUVtQmtDLEtBRm5COztBQUlYLG9CQUFJLENBQUM3QixPQUFMLEVBQWM7QUFBRSx5QkFBTyxFQUFQO0FBQVk7O0FBRTVCLHFCQUFLLE1BQU04QixJQUFYLElBQW1CRixLQUFuQixFQUEwQjtBQUN4Qix3QkFBTUcsTUFBTSxHQUFHLE1BQU1ELElBQUksQ0FBQ1IsR0FBTCxDQUFTaEQsS0FBVCxDQUFyQjs7QUFDQSxzQkFBSSxDQUFDeUQsTUFBTCxFQUFhO0FBQ1hKLG9CQUFBQSxRQUFRLEdBQUcsSUFBWDtBQUNBLDBCQUFNcEMsS0FBSyxHQUFHdUMsSUFBSSxDQUFDdkMsS0FBTCxDQUFXO0FBQUVzQyxzQkFBQUEsS0FBRjtBQUFTdEUsc0JBQUFBO0FBQVQscUJBQVgsQ0FBZDs7QUFDQSxvQkFBQSxLQUFJLENBQUN3QixjQUFMLENBQW9CO0FBQUUsdUJBQUN4QixLQUFELEdBQVNnQztBQUFYLHFCQUFwQjs7QUFDQTtBQUNEO0FBQ0Y7O0FBRUQsdUJBQU87QUFBRSxtQkFBQ2hDLEtBQUQsR0FBU2U7QUFBWCxpQkFBUDtBQUNELGVBckJ3QyxDQUEzQztBQXdCQSxvQkFBTTJCLFVBQVUsR0FBRyxNQUFNakUsY0FBYyxDQUNyQyxLQUFJLENBQUNVLE1BRGdDLEVBRXJDLE9BQ0V3RCxTQURGLGFBS1E7QUFBQSxvQkFGSjNDLEtBRUksVUFGSkEsS0FFSTtBQUFBLDZDQURKUSxRQUNJO0FBQUEsb0JBREpBLFFBQ0ksZ0NBRE8sRUFDUDtBQUFBLG9CQURXQyxNQUNYLFVBRFdBLE1BQ1g7QUFDTixzQkFBTW1DLE1BQU0sR0FBRyxFQUFmOztBQUVBLHFCQUFLLE1BQU1oQyxFQUFYLElBQWlCSCxNQUFqQixFQUF5QjtBQUN2QixzQkFBSSxDQUFDRCxRQUFRLENBQUNJLEVBQUQsQ0FBUixDQUFhaUMsR0FBbEIsRUFBdUI7QUFDckJDLG9CQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYyxzREFBcUQvQyxLQUFNLFFBQU9ZLEVBQUcsRUFBbkY7QUFDQTtBQUNEOztBQUNELHdCQUFNb0MsTUFBTSxHQUFHLE1BQU14QyxRQUFRLENBQUNJLEVBQUQsQ0FBUixDQUFhaUMsR0FBYixDQUFpQmxCLE1BQWpCLEVBQXJCO0FBQ0Esc0JBQUlxQixNQUFNLENBQUNvQixRQUFYLEVBQXFCQSxRQUFRLEdBQUcsSUFBWDtBQUNyQnhCLGtCQUFBQSxNQUFNLENBQUNLLElBQVAsQ0FBWUQsTUFBTSxDQUFDeUIsSUFBbkI7QUFDRDs7QUFFRCx1QkFBTztBQUNMLG1CQUFDekUsS0FBRCxHQUFTNEM7QUFESixpQkFBUDtBQUdELGVBdkJvQyxDQUF2QztBQTBCQSxvQkFBTU0sWUFBWSxHQUFHLE1BQU16RSxjQUFjLENBQ3ZDLEtBQUksQ0FBQ1csUUFEa0MsRUFFdkMsT0FBT1UsUUFBUCxFQUFpQnFELE9BQWpCLEtBQTZCO0FBQUEsc0JBQ25CTixHQURtQixHQUNKTSxPQURJLENBQ25CTixHQURtQjtBQUFBLHNCQUNkN0MsS0FEYyxHQUNKbUQsT0FESSxDQUNkbkQsS0FEYzs7QUFHM0Isb0JBQUksQ0FBQzZDLEdBQUwsRUFBVTtBQUNSQyxrQkFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWMsbURBQWtEL0MsS0FBTSxHQUF0RTtBQUNBLHlCQUFPO0FBQUUscUJBQUNBLEtBQUQsR0FBUztBQUFYLG1CQUFQO0FBQ0Q7O0FBTjBCLCtCQVFpQixNQUFNNkMsR0FBRyxDQUFDbEIsTUFBSixFQVJ2QjtBQUFBLHNCQVFuQjhDLElBUm1CLFVBUW5CQSxJQVJtQjtBQUFBLHNCQVFIQyxlQVJHLFVBUWJOLFFBUmE7O0FBUzNCQSxnQkFBQUEsUUFBUSxHQUFHTSxlQUFYO0FBQ0EsdUJBQU87QUFDTCxtQkFBQzFFLEtBQUQsR0FBU3lFO0FBREosaUJBQVA7QUFHRCxlQWZzQyxDQUF6QztBQWtCQSxxQkFBTztBQUNMTCxnQkFBQUEsUUFESztBQUVMSyxnQkFBQUEsSUFBSSxvQkFDQ2pDLGNBREQsRUFFQ0UsVUFGRCxFQUdDUSxZQUhEO0FBRkMsZUFBUDtBQVFELGFBOUVELENBSk87QUFBQSxXQTNRcUI7O0FBRzVCLGVBQUt0QixLQUFMLEdBQWE3RCxtQkFBbUIsRUFBaEMsQ0FINEIsQ0FJNUI7O0FBQ0EsZUFBS3FCLFFBQUwsR0FBZ0JuQixxQkFBcUIsQ0FBQztBQUFFbUIsWUFBQUEsUUFBRjtBQUFZNEIsWUFBQUEsYUFBYSxFQUFFLEtBQUtBO0FBQWhDLFdBQUQsQ0FBckM7QUFFQSxlQUFLSyxRQUFMLEdBQWdCckQsY0FBYyxDQUFDO0FBQzdCMkcsWUFBQUEsaUJBQWlCLEVBQUUsS0FBS0E7QUFESyxXQUFELENBQTlCO0FBSUEsZUFBS3pGLFNBQUwsR0FBaUJmLGVBQWUsQ0FBQztBQUMvQmUsWUFBQUEsU0FEK0I7QUFFL0J5RixZQUFBQSxpQkFBaUIsRUFBRSxLQUFLQTtBQUZPLFdBQUQsQ0FBaEM7QUFLQSxlQUFLL0QsRUFBTCxHQUFVLENBQVY7QUFDQSxlQUFLekIsTUFBTCxHQUFjLEtBQUt5RixZQUFMLENBQWtCekYsTUFBbEIsQ0FBZDtBQUVBLGVBQUswRixLQUFMLEdBQWE7QUFDWGpELFlBQUFBLEtBQUssRUFBRSxLQUFLQSxLQUREO0FBRVhQLFlBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUZKO0FBR1hULFlBQUFBLEVBQUUsRUFBRSxLQUFLQSxFQUhFO0FBSVgxQixZQUFBQSxTQUFTLEVBQUUsS0FBS0EsU0FKTDtBQUtYRSxZQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFMSjtBQU1YRCxZQUFBQSxNQUFNLEVBQUUsS0FBS0E7QUFORixXQUFiO0FBUUQ7O0FBc1VETixRQUFBQSxNQUFNLEdBQUc7QUFBQTs7QUFBQSw4QkFDb0MsS0FBS0UsS0FEekM7QUFBQSxtREFDQytGLFFBREQ7QUFBQSxnQkFDQ0EsUUFERCxxQ0FDWSxNQUFNLENBQUUsQ0FEcEI7QUFBQSxnQkFDeUJDLE1BRHpCOztBQUVQLGlCQUNFLG9CQUFDLElBQUQ7QUFDRSxZQUFBLEdBQUcsRUFBR0QsUUFEUjtBQUVFLFlBQUEsUUFBUSxvQkFDSCxLQUFLSCxpQkFBTCxFQURHO0FBRU43RixjQUFBQSxjQUFjLEVBQUU7QUFBQSxvQkFBQ0MsS0FBRCx1RUFBUyxFQUFUO0FBQUEsdUJBQ2Qsb0JBQUMsSUFBRCxlQUNPQSxLQURQO0FBRUUsa0JBQUEsUUFBUSxvQkFDSCxNQUFJLENBQUM0RixpQkFBTCxFQURHO0FBRU56RixvQkFBQUEsU0FBUyxFQUFFLE1BQUksQ0FBQ0EsU0FGVjtBQUdOQyxvQkFBQUEsTUFBTSxFQUFFZixTQUFTLENBQUM7QUFDaEJlLHNCQUFBQSxNQUFNLEVBQUUsTUFBSSxDQUFDQSxNQURHO0FBRWhCTixzQkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ21DLGFBRkc7QUFHaEJnRSxzQkFBQUEsS0FBSyxFQUFFLE1BQU0sTUFBSSxDQUFDcEUsRUFIRjtBQUloQnFFLHNCQUFBQSxLQUFLLEVBQUdyRSxFQUFELElBQVE7QUFBRSx3QkFBQSxNQUFJLENBQUNBLEVBQUwsR0FBVUEsRUFBVjtBQUFlO0FBSmhCLHFCQUFELENBSFg7QUFTTnhCLG9CQUFBQSxRQUFRLEVBQUVmLFdBQVcsQ0FBQztBQUFFZSxzQkFBQUEsUUFBUSxFQUFFLE1BQUksQ0FBQ0E7QUFBakIscUJBQUQ7QUFUZjtBQUZWLG1CQURjO0FBQUE7QUFGVjtBQUZWLGFBcUJPMkYsTUFyQlAsRUFERjtBQXlCRDs7QUE3WHFDLE9BQXhDO0FBK1hELEtBaFlEO0FBaVlELEdBbFlEO0FBbVlEOztBQUVELGVBQWU5RixVQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVEaW5vRm9ybVN0b3JlIGZyb20gJy4vRGlub0Zvcm1TdG9yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVGcm9tSXRlbSxcbiAgY3JlYXRlRGlub0Zvcm1TdWJGb3JtLFxuICBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCxcbiAgY3JlYXRlRnJhZ21lbnRzLFxuICBncm91cHNBUEksXG4gIHN1YkZvcm1zQVBJLFxuICBnZXRSZWYsXG59IGZyb20gJy4vRGlub0Zvcm1IZWxwZXInO1xuXG5pbXBvcnQge1xuICBzbGVlcCwgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYywgaXNQcm9kdWN0aW9uLCBpc05vdEV4aXN0LFxufSBmcm9tICcuL3V0aWwnO1xuXG5jbGFzcyBXcmFwQ29tIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZGlub0Zvcm06IHsgcmVuZGVyRGlub0Zvcm0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gcmVuZGVyRGlub0Zvcm0odGhpcy5wcm9wcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9ybSh7XG4gIGZyYWdtZW50cyA9IHt9LFxuICBncm91cHMgPSB7fSxcbiAgc3ViRm9ybXMgPSB7fSxcbiAgZ2V0R3JvdXBSZWYgPSBnZXRSZWYsXG59ID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZShWaWV3KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJpbmRXcmFwKFdyYXAgPSBXcmFwQ29tKSB7XG4gICAgICByZXR1cm4gY2xhc3MgRGlub0Zvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb25zdHJ1Y3RvclByb3BzKSB7XG4gICAgICAgICAgc3VwZXIoY29uc3RydWN0b3JQcm9wcyk7XG5cbiAgICAgICAgICB0aGlzLnN0b3JlID0gY3JlYXRlRGlub0Zvcm1TdG9yZSgpO1xuICAgICAgICAgIC8vIHRoaXMuc3ViRm9ybXMgPSBjcmVhdGVEaW5vRm9ybVN1YkZvcm0oc3ViRm9ybXMsIHRoaXMudG9wRm9ybVJlbmRlcik7XG4gICAgICAgICAgdGhpcy5zdWJGb3JtcyA9IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSh7IHN1YkZvcm1zLCB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIgfSk7XG5cbiAgICAgICAgICB0aGlzLkZyb21JdGVtID0gY3JlYXRlRnJvbUl0ZW0oe1xuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmZyYWdtZW50cyA9IGNyZWF0ZUZyYWdtZW50cyh7XG4gICAgICAgICAgICBmcmFnbWVudHMsXG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuSUQgPSAwO1xuICAgICAgICAgIHRoaXMuZ3JvdXBzID0gdGhpcy5jcmVhdGVHcm91cHMoZ3JvdXBzKTtcblxuICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuICAgICAgICAgICAgSUQ6IHRoaXMuSUQsXG4gICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVHcm91cHMgPSBncm91cHNPYmogPT4gbWFwT2JqZWN0KGdyb3Vwc09iaiwgKGZvcm1OYW1lLCB7XG4gICAgICAgICAgQ29tLFxuICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgIGNvdW50LFxuICAgICAgICAgIGZvcm1Qcm9wcyA9IHt9LFxuICAgICAgICAgIG5lZWREcmFnID0gZmFsc2UsXG4gICAgICAgICAgY2xlYXJNb3Rpb25zLFxuICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIGNyZWF0ZVN0eWxlLFxuICAgICAgICB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBJRFJlZk1hcCA9IHt9O1xuICAgICAgICAgIGNvbnN0IElETGlzdCA9IFsuLi5uZXcgQXJyYXkoY291bnQpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcbiAgICAgICAgICBjb25zdCBGb3JtID0gY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAoe1xuICAgICAgICAgICAgc2V0SURSZWZNYXA6IChJRCwgdmFsdWUpID0+IHsgdGhpcy5ncm91cHNbZm9ybU5hbWVdLklEUmVmTWFwW0lEXSA9IHZhbHVlOyB9LFxuICAgICAgICAgICAgdG9wRm9ybVJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgIGZvcm1Qcm9wcyxcbiAgICAgICAgICAgIGZvcm1OYW1lLFxuICAgICAgICAgICAgbmVlZERyYWcsXG4gICAgICAgICAgICBJRFJlZk1hcCxcbiAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgIEZvcm0sXG4gICAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgICBwcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgW2Zvcm1OYW1lXTogZ3JvdXAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdG9wRm9ybVJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcigpLnRoZW4ocik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHt9LCByKTtcbiAgICAgICAgfSlcblxuICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaSA9ICgpID0+ICh7XG4gICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG5cbiAgICAgICAgICBzZXRGaWVsZHNWYWx1ZTogdGhpcy5zZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgICBzZXRGdWxsVmFsdWVzOiB0aGlzLnNldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgc2V0RmllbGRzRXJyb3I6IHRoaXMuc2V0RmllbGRzRXJyb3IsXG5cbiAgICAgICAgICBnZXRGdWxsVmFsdWVzOiB0aGlzLmdldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgZ2V0RmllbGRzVmFsdWU6IHRoaXMuZ2V0RmllbGRzVmFsdWUsXG5cbiAgICAgICAgICB2ZXJpZnk6IHRoaXMudmVyaWZ5LFxuICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgIGRpbm9Gb3JtUmVmOiB0aGlzLFxuICAgICAgICB9KVxuXG4gICAgICAgIHNldEZpZWxkc0Vycm9yID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIGVycm9yXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgZXJyb3IgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGaWVsZHNWYWx1ZSA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBuZXdWYWx1ZV0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMudG9wRm9ybVJlbmRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0RmllbGRzVmFsdWUgPSAoLi4uZmllbGRzKSA9PiBmaWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtZSA9IHRoaXMuc3RvcmUuZ2V0KGZpZWxkKSB8fCB7fTtcbiAgICAgICAgICByZXR1cm4gc2NoZW1lLnZhbHVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIGdldEZ1bGxWYWx1ZXMgPSAoeyBvbmx5R2V0TW91bnQgPSB0cnVlLCBkZWJ1ZyA9IGZhbHNlIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgIHNjaGVtZSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IGlzTW91bnQsIHZhbHVlIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgIHJldHVybiBvbmx5R2V0TW91bnRcbiAgICAgICAgICAgICAgICA/IGlzTW91bnQgPyB7IFtmaWVsZF06IHZhbHVlIH0gOiB7fVxuICAgICAgICAgICAgICAgIDogeyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLFxuICAgICAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gSURSZWZNYXBbSURdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzTm90RXhpc3QoZ3JvdXApIHx8IGlzTm90RXhpc3QoZ3JvdXAucmVmKSkge1xuICAgICAgICAgICAgICAgICAgaXNQcm9kdWN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBncm91cCBmcm9tIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfSwgSUQ9JHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZ3JvdXAucmVmLmdldEZ1bGxWYWx1ZXMoeyBvbmx5R2V0TW91bnQgfSk7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiwgZmllbGQgfSA9IHN1YkZvcm07XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBpc1Byb2R1Y3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gc3ViRm9ybSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH1gKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXToge30sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogcmVmLmdldEZ1bGxWYWx1ZXMoeyBvbmx5R2V0TW91bnQgfSksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGdWxsVmFsdWVzID0gYXN5bmMgKHZhbHVlcyA9IHt9LCBtYXBzID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmaW5kR3JvdXBzID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICkuZmluZChncm91cCA9PiBncm91cC5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgZmluZFN1YkZvcm1zID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgKS5maW5kKHN1YkZvcm0gPT4gc3ViRm9ybS5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UociA9PiB0aGlzLnNldFN0YXRlKHt9LCByKSk7XG5cbiAgICAgICAgICBhd2FpdCBtYXBPYmplY3QodmFsdWVzLCBhc3luYyAoZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpbmRHcm91cHMoZmllbGQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybSA9IGZpbmRTdWJGb3JtcyhmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmIChzdWJGb3JtKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogc3ViRm9ybU1hcE9iaiB9ID0gbWFwcztcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYgfSA9IHN1YkZvcm07XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGZpZWxkIGlzICcke2ZpZWxkfScgc3ViRm9ybSBzaG91bGQgYmUgbW91bnRlZCBidXQgdGhlIFJlZiBpcyBub3QgcmVnaXN0ZXJlZCwgbWF5YmUgeW91IG5vdCByZW5kZXIgdGhpcyBzdWJGb3JtLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKHZhbHVlLCBzdWJGb3JtTWFwT2JqKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdyb3VwKSB7IC8vIGZyYWdtZW50XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogbWFwRnVuID0gXyA9PiBfIH0gPSBtYXBzO1xuICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbWFwRnVuKHZhbHVlKSB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA8IDEpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZGVsZXRlIElETGlzdCBhbmQgYWRkXG4gICAgICAgICAgICBncm91cC5JRExpc3QgPSBbLi4ubmV3IEFycmF5KHZhbHVlLmxlbmd0aCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuXG4gICAgICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgICAgIC8vIGF3YWl0IHJlbmRlcigpO1xuICAgICAgICAgICAgYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICAvLyBhd2FpdCB0aGlzLnRvcEZvcm1SZW5kZXIoKTtcblxuICAgICAgICAgICAgLy8gZ3JvdXAgc2hvdWxkIG1vdW50ZWRcbiAgICAgICAgICAgIGNvbnN0IHsgSURSZWZNYXAsIElETGlzdCwgZm9ybU5hbWUgfSA9IGdyb3VwO1xuXG4gICAgICAgICAgICBhd2FpdCBtYXBPYmplY3RBc3luYyhJRExpc3QsIGFzeW5jIChpbmRleCwgSUQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcmVmID0gYXdhaXQgZ2V0R3JvdXBSZWYoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIFtJRF06IHtcbiAgICAgICAgICAgICAgICAgICAgcmVmOiBncm91cEZvcm1SZWYsXG4gICAgICAgICAgICAgICAgICB9ID0ge30sXG4gICAgICAgICAgICAgICAgfSA9IElEUmVmTWFwO1xuICAgICAgICAgICAgICAgIHJldHVybiBncm91cEZvcm1SZWY7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBmb3JtICcke2Zvcm1OYW1lfScgc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgZ3JvdXAuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJdGVtVmFsdWUgPSB2YWx1ZVtpbmRleF0gfHwgW107XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiBmdW4gPSAoKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgbWFwT2JqOiB7fSxcbiAgICAgICAgICAgICAgICAgIHByb3BzOiB7fSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgfSA9IG1hcHM7XG5cbiAgICAgICAgICAgICAgY29uc3QgeyBtYXBPYmogPSB7fSwgcHJvcHMgPSB7fSB9ID0gZnVuKGdyb3VwSXRlbVZhbHVlKTtcblxuICAgICAgICAgICAgICBJRFJlZk1hcFtJRF0ucHJvcHMgPSBwcm9wcztcblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyhncm91cEl0ZW1WYWx1ZSwgbWFwT2JqKTtcbiAgICAgICAgICAgIH0sIElETGlzdCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZlcmlmeSA9ICh7XG4gICAgICAgICAgZmlyc3QgPSBmYWxzZSwgLy8gdG9kb1xuICAgICAgICAgIHNjcm9sbCA9IHRydWUsIC8vIHRvZG9cbiAgICAgICAgfSA9IHt9KSA9PiAoXG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUuZ2V0KCksXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBzY2hlbWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICBydWxlcyA9IFtdLCBpc01vdW50LCB2YWx1ZSwgbGFiZWwsXG4gICAgICAgICAgICAgICAgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91bnQpIHsgcmV0dXJuIHt9OyB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUGFzcyA9IGF3YWl0IHJ1bGUuZnVuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGlmICghaXNQYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBydWxlLmVycm9yKHsgbGFiZWwsIGZpZWxkIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogZXJyb3IgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgSURSZWZNYXAgPSBbXSwgSURMaXN0LFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgSUQgb2YgSURMaXN0KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIUlEUmVmTWFwW0lEXS5yZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBncm91cCBmcm9tIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfSwgSUQ9JHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBJRFJlZk1hcFtJRF0ucmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNFcnJvcikgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgICBhc3luYyAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHJlZiwgZmllbGQgfSA9IHN1YkZvcm07XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBzdWJGcm9tIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfS5gKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IFtmaWVsZF06IHt9IH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBoYXNFcnJvcjogc3ViRm9ybUhhc0Vycm9yIH0gPSBhd2FpdCByZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3IgPSBzdWJGb3JtSGFzRXJyb3I7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IGRhdGEsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGhhc0Vycm9yLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgKVxuXG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICBjb25zdCB7IGNhdGNoUmVmID0gKCkgPT4ge30sIC4uLm90aGVycyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFdyYXBcbiAgICAgICAgICAgICAgcmVmPXsgY2F0Y2hSZWYgfVxuICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgcmVuZGVyRGlub0Zvcm06IChwcm9wcyA9IHt9KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Vmlld1xuICAgICAgICAgICAgICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgICAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiBncm91cHNBUEkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SUQ6ICgpID0+IHRoaXMuSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJRDogKElEKSA9PiB7IHRoaXMuSUQgPSBJRDsgfSxcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBzdWJGb3Jtczogc3ViRm9ybXNBUEkoeyBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgIHsgLi4ub3RoZXJzIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZvcm07XG4iXX0=