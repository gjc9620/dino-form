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
                if (!IDRefMap[ID].ref) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJnZXRSZWYiLCJzbGVlcCIsIm1hcE9iamVjdCIsIm1hcE9iamVjdEFzeW5jIiwiaXNQcm9kdWN0aW9uIiwiV3JhcENvbSIsInJlbmRlciIsInJlbmRlckRpbm9Gb3JtIiwicHJvcHMiLCJkaW5vRm9ybSIsImNyZWF0ZUZvcm0iLCJmcmFnbWVudHMiLCJncm91cHMiLCJzdWJGb3JtcyIsImdldEdyb3VwUmVmIiwiY3JlYXRlIiwiVmlldyIsImJpbmRXcmFwIiwiV3JhcCIsIkRpbm9Gb3JtIiwiY29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvclByb3BzIiwiZ3JvdXBzT2JqIiwiZm9ybU5hbWUiLCJDb20iLCJmaWVsZCIsImNvdW50IiwiZm9ybVByb3BzIiwibmVlZERyYWciLCJjbGVhck1vdGlvbnMiLCJwcmVzc2VkTW90aW9ucyIsIm5vdFByZXNzZWRNb3Rpb25zIiwiY3JlYXRlU3R5bGUiLCJJRFJlZk1hcCIsIklETGlzdCIsIkFycmF5IiwibWFwIiwiSUQiLCJGb3JtIiwic2V0SURSZWZNYXAiLCJ2YWx1ZSIsInRvcEZvcm1SZW5kZXIiLCJncm91cCIsInIiLCJ0aGVuIiwic2V0U3RhdGUiLCJGcm9tSXRlbSIsInNldEZpZWxkc1ZhbHVlIiwic2V0RnVsbFZhbHVlcyIsInNldEZpZWxkc0Vycm9yIiwiZ2V0RnVsbFZhbHVlcyIsImdldEZpZWxkc1ZhbHVlIiwidmVyaWZ5Iiwic3RvcmUiLCJkaW5vRm9ybVJlZiIsIm9iaiIsImZvckVhY2giLCJlcnJvciIsInVwZGF0ZSIsIm5ld1ZhbHVlIiwiZmllbGRzIiwic2NoZW1lIiwiZ2V0Iiwib25seUdldE1vdW50IiwiZGVidWciLCJmcmFnbWVudHNGaWVsZCIsImlzTW91bnQiLCJncm91cEZpZWxkIiwiZ3JvdXBOYW1lIiwidmFsdWVzIiwicmVmIiwiY29uc29sZSIsIndhcm4iLCJyZXN1bHQiLCJwdXNoIiwic3ViRm9ybUZpZWxkIiwic3ViRm9ybSIsIm1hcHMiLCJmaW5kR3JvdXBzIiwiZmluZCIsImZpbmRTdWJGb3JtcyIsInN1YkZvcm1NYXBPYmoiLCJtYXBGdW4iLCJfIiwibGVuZ3RoIiwiaW5kZXgiLCJncm91cEZvcm1SZWYiLCJncm91cEl0ZW1WYWx1ZSIsImZ1biIsIm1hcE9iaiIsImZpcnN0Iiwic2Nyb2xsIiwicmVzb2x2ZSIsImhhc0Vycm9yIiwicnVsZXMiLCJsYWJlbCIsInJ1bGUiLCJpc1Bhc3MiLCJkYXRhIiwic3ViRm9ybUhhc0Vycm9yIiwiY3JlYXRlRGlub0Zvcm1BcGkiLCJjcmVhdGVHcm91cHMiLCJzdGF0ZSIsImNhdGNoUmVmIiwib3RoZXJzIiwiZ2V0SUQiLCJzZXRJRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxtQkFBUCxNQUFnQyxpQkFBaEM7QUFDQSxTQUNFQyxjQURGLEVBRUVDLHFCQUZGLEVBR0VDLHVCQUhGLEVBSUVDLGVBSkYsRUFLRUMsU0FMRixFQU1FQyxXQU5GLEVBT0VDLE1BUEYsUUFRTyxrQkFSUDtBQVVBLFNBQ0VDLEtBREYsRUFDU0MsU0FEVCxFQUNvQkMsY0FEcEIsRUFDb0NDLFlBRHBDLFFBRU8sUUFGUDs7QUFJQSxNQUFNQyxPQUFOLFNBQXNCYixTQUF0QixDQUFnQztBQUM5QmMsRUFBQUEsTUFBTSxHQUFHO0FBQUEsVUFDYUMsY0FEYixHQUNrQyxLQUFLQyxLQUR2QyxDQUNDQyxRQURELENBQ2FGLGNBRGI7QUFFUCxXQUFPQSxjQUFjLENBQUMsS0FBS0MsS0FBTixDQUFyQjtBQUNEOztBQUo2Qjs7QUFPaEMsU0FBU0UsVUFBVCxHQUtR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SUFBRDtBQUNFLFlBQUEsR0FBRyxFQUFHRCxRQURSO0FBRUUsWUFBQSxRQUFRLG9CQUNILEtBQUtILGlCQUFMLEVBREc7QUFFTjdGLGNBQUFBLGNBQWMsRUFBRTtBQUFBLG9CQUFDQyxLQUFELHVFQUFTLEVBQVQ7QUFBQSx1QkFDZCxvQkFBQyxJQUFELGVBQ09BLEtBRFA7QUFFRSxrQkFBQSxRQUFRLG9CQUNILE1BQUksQ0FBQzRGLGlCQUFMLEVBREc7QUFFTnpGLG9CQUFBQSxTQUFTLEVBQUUsTUFBSSxDQUFDQSxTQUZWO0FBR05DLG9CQUFBQSxNQUFNLEVBQUVkLFNBQVMsQ0FBQztBQUNoQmMsc0JBQUFBLE1BQU0sRUFBRSxNQUFJLENBQUNBLE1BREc7QUFFaEJOLHNCQUFBQSxNQUFNLEVBQUUsTUFBSSxDQUFDbUMsYUFGRztBQUdoQmdFLHNCQUFBQSxLQUFLLEVBQUUsTUFBTSxNQUFJLENBQUNwRSxFQUhGO0FBSWhCcUUsc0JBQUFBLEtBQUssRUFBR3JFLEVBQUQsSUFBUTtBQUFFLHdCQUFBLE1BQUksQ0FBQ0EsRUFBTCxHQUFVQSxFQUFWO0FBQWU7QUFKaEIscUJBQUQsQ0FIWDtBQVNOeEIsb0JBQUFBLFFBQVEsRUFBRWQsV0FBVyxDQUFDO0FBQUVjLHNCQUFBQSxRQUFRLEVBQUUsTUFBSSxDQUFDQTtBQUFqQixxQkFBRDtBQVRmO0FBRlYsbUJBRGM7QUFBQTtBQUZWO0FBRlYsYUFxQk8yRixNQXJCUCxFQURGO0FBeUJEOztBQTFYcUMsT0FBeEM7QUE0WEQsS0E3WEQ7QUE4WEQsR0EvWEQ7QUFnWUQ7O0FBRUQsZUFBZTlGLFVBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZURpbm9Gb3JtU3RvcmUgZnJvbSAnLi9EaW5vRm9ybVN0b3JlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUZyb21JdGVtLFxuICBjcmVhdGVEaW5vRm9ybVN1YkZvcm0sXG4gIGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwLFxuICBjcmVhdGVGcmFnbWVudHMsXG4gIGdyb3Vwc0FQSSxcbiAgc3ViRm9ybXNBUEksXG4gIGdldFJlZixcbn0gZnJvbSAnLi9EaW5vRm9ybUhlbHBlcic7XG5cbmltcG9ydCB7XG4gIHNsZWVwLCBtYXBPYmplY3QsIG1hcE9iamVjdEFzeW5jLCBpc1Byb2R1Y3Rpb24sXG59IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIFdyYXBDb20gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaW5vRm9ybTogeyByZW5kZXJEaW5vRm9ybSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybSh0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKHtcbiAgZnJhZ21lbnRzID0ge30sXG4gIGdyb3VwcyA9IHt9LFxuICBzdWJGb3JtcyA9IHt9LFxuICBnZXRHcm91cFJlZiA9IGdldFJlZixcbn0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlKFZpZXcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYmluZFdyYXAoV3JhcCA9IFdyYXBDb20pIHtcbiAgICAgIHJldHVybiBjbGFzcyBEaW5vRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yUHJvcHMpIHtcbiAgICAgICAgICBzdXBlcihjb25zdHJ1Y3RvclByb3BzKTtcblxuICAgICAgICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVEaW5vRm9ybVN0b3JlKCk7XG4gICAgICAgICAgLy8gdGhpcy5zdWJGb3JtcyA9IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybShzdWJGb3JtcywgdGhpcy50b3BGb3JtUmVuZGVyKTtcbiAgICAgICAgICB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHsgc3ViRm9ybXMsIHRvcEZvcm1SZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlciB9KTtcblxuICAgICAgICAgIHRoaXMuRnJvbUl0ZW0gPSBjcmVhdGVGcm9tSXRlbSh7XG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gY3JlYXRlRnJhZ21lbnRzKHtcbiAgICAgICAgICAgIGZyYWdtZW50cyxcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5JRCA9IDA7XG4gICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmNyZWF0ZUdyb3Vwcyhncm91cHMpO1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG4gICAgICAgICAgICBJRDogdGhpcy5JRCxcbiAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUdyb3VwcyA9IGdyb3Vwc09iaiA9PiBtYXBPYmplY3QoZ3JvdXBzT2JqLCAoZm9ybU5hbWUsIHtcbiAgICAgICAgICBDb20sXG4gICAgICAgICAgZmllbGQsXG4gICAgICAgICAgY291bnQsXG4gICAgICAgICAgZm9ybVByb3BzID0ge30sXG4gICAgICAgICAgbmVlZERyYWcgPSBmYWxzZSxcbiAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgcHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IElEUmVmTWFwID0ge307XG4gICAgICAgICAgY29uc3QgSURMaXN0ID0gWy4uLm5ldyBBcnJheShjb3VudCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuICAgICAgICAgIGNvbnN0IEZvcm0gPSBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCh7XG4gICAgICAgICAgICBzZXRJRFJlZk1hcDogKElELCB2YWx1ZSkgPT4geyB0aGlzLmdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdID0gdmFsdWU7IH0sXG4gICAgICAgICAgICB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBncm91cCA9IHtcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgICAgZm9ybU5hbWUsXG4gICAgICAgICAgICBuZWVkRHJhZyxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICAgIGNsZWFyTW90aW9ucyxcbiAgICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgICBjcmVhdGVTdHlsZSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBbZm9ybU5hbWVdOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0b3BGb3JtUmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKCkudGhlbihyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpID0gKCkgPT4gKHtcbiAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcblxuICAgICAgICAgIHNldEZpZWxkc1ZhbHVlOiB0aGlzLnNldEZpZWxkc1ZhbHVlLFxuICAgICAgICAgIHNldEZ1bGxWYWx1ZXM6IHRoaXMuc2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcjogdGhpcy5zZXRGaWVsZHNFcnJvcixcblxuICAgICAgICAgIGdldEZ1bGxWYWx1ZXM6IHRoaXMuZ2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBnZXRGaWVsZHNWYWx1ZTogdGhpcy5nZXRGaWVsZHNWYWx1ZSxcblxuICAgICAgICAgIHZlcmlmeTogdGhpcy52ZXJpZnksXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgZGlub0Zvcm1SZWY6IHRoaXMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzRXJyb3IgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyBlcnJvciB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIG5ld1ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSA9ICguLi5maWVsZHMpID0+IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gdGhpcy5zdG9yZS5nZXQoZmllbGQpIHx8IHt9O1xuICAgICAgICAgIHJldHVybiBzY2hlbWUudmFsdWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgZ2V0RnVsbFZhbHVlcyA9ICh7IG9ubHlHZXRNb3VudCA9IHRydWUsIGRlYnVnID0gZmFsc2UgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgc2NoZW1lLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaXNNb3VudCwgdmFsdWUgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ubHlHZXRNb3VudFxuICAgICAgICAgICAgICAgID8gaXNNb3VudCA/IHsgW2ZpZWxkXTogdmFsdWUgfSA6IHt9XG4gICAgICAgICAgICAgICAgOiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGlmICghSURSZWZNYXBbSURdLnJlZikge1xuICAgICAgICAgICAgICAgICAgaXNQcm9kdWN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBncm91cCBmcm9tIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfSwgSUQ9JHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSURSZWZNYXBbSURdLnJlZi5nZXRGdWxsVmFsdWVzKHsgb25seUdldE1vdW50IH0pO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgaXNQcm9kdWN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIHN1YkZvcm0gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9YCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHt9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHJlZi5nZXRGdWxsVmFsdWVzKHsgb25seUdldE1vdW50IH0pLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RnVsbFZhbHVlcyA9IGFzeW5jICh2YWx1ZXMgPSB7fSwgbWFwcyA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmluZEdyb3VwcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICApLmZpbmQoZ3JvdXAgPT4gZ3JvdXAuZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IGZpbmRTdWJGb3JtcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICkuZmluZChzdWJGb3JtID0+IHN1YkZvcm0uZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKHIgPT4gdGhpcy5zZXRTdGF0ZSh7fSwgcikpO1xuXG4gICAgICAgICAgYXdhaXQgbWFwT2JqZWN0KHZhbHVlcywgYXN5bmMgKGZpZWxkLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaW5kR3JvdXBzKGZpZWxkKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm0gPSBmaW5kU3ViRm9ybXMoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoc3ViRm9ybSkge1xuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IHN1YkZvcm1NYXBPYmogfSA9IG1hcHM7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBmaWVsZCBpcyAnJHtmaWVsZH0nIHN1YkZvcm0gc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgc3ViRm9ybS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyh2YWx1ZSwgc3ViRm9ybU1hcE9iaik7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFncm91cCkgeyAvLyBmcmFnbWVudFxuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IG1hcEZ1biA9IF8gPT4gXyB9ID0gbWFwcztcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG1hcEZ1bih2YWx1ZSkgfSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBJRExpc3QgYW5kIGFkZFxuICAgICAgICAgICAgZ3JvdXAuSURMaXN0ID0gWy4uLm5ldyBBcnJheSh2YWx1ZS5sZW5ndGgpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcblxuICAgICAgICAgICAgLy8gcmVuZGVyXG4gICAgICAgICAgICAvLyBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIGF3YWl0IHJlbmRlcigpO1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG5cbiAgICAgICAgICAgIC8vIGdyb3VwIHNob3VsZCBtb3VudGVkXG4gICAgICAgICAgICBjb25zdCB7IElEUmVmTWFwLCBJRExpc3QsIGZvcm1OYW1lIH0gPSBncm91cDtcblxuICAgICAgICAgICAgYXdhaXQgbWFwT2JqZWN0QXN5bmMoSURMaXN0LCBhc3luYyAoaW5kZXgsIElEKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlZiA9IGF3YWl0IGdldEdyb3VwUmVmKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICBbSURdOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogZ3JvdXBGb3JtUmVmLFxuICAgICAgICAgICAgICAgICAgfSA9IHt9LFxuICAgICAgICAgICAgICAgIH0gPSBJRFJlZk1hcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXBGb3JtUmVmO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZm9ybSAnJHtmb3JtTmFtZX0nIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIGdyb3VwLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbVZhbHVlID0gdmFsdWVbaW5kZXhdIHx8IFtdO1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogZnVuID0gKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG1hcE9iajoge30sXG4gICAgICAgICAgICAgICAgICBwcm9wczoge30sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIH0gPSBtYXBzO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHsgbWFwT2JqID0ge30sIHByb3BzID0ge30gfSA9IGZ1bihncm91cEl0ZW1WYWx1ZSk7XG5cbiAgICAgICAgICAgICAgSURSZWZNYXBbSURdLnByb3BzID0gcHJvcHM7XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXMoZ3JvdXBJdGVtVmFsdWUsIG1hcE9iaik7XG4gICAgICAgICAgICB9LCBJRExpc3QpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFJRFJlZk1hcFtJRF0ucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZ3JvdXAgZnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0sIElEPSR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gc3ViRnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0uYCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB7fSB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19