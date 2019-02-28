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
import { mapObject, mapObjectAsync } from './util';
import { sleep } from './util';

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
                if (!IDRefMap[ID].ref) {
                  console.warn(`[dino-form] group from ref not registered, field = ${field}, ID=${ID}`);
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
                console.warn(`[dino-form] subForm ref not registered, field = ${field}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJnZXRSZWYiLCJtYXBPYmplY3QiLCJtYXBPYmplY3RBc3luYyIsInNsZWVwIiwiV3JhcENvbSIsInJlbmRlciIsInJlbmRlckRpbm9Gb3JtIiwicHJvcHMiLCJkaW5vRm9ybSIsImNyZWF0ZUZvcm0iLCJmcmFnbWVudHMiLCJncm91cHMiLCJzdWJGb3JtcyIsImdldEdyb3VwUmVmIiwiY3JlYXRlIiwiVmlldyIsImJpbmRXcmFwIiwiV3JhcCIsIkRpbm9Gb3JtIiwiY29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvclByb3BzIiwiZ3JvdXBzT2JqIiwiZm9ybU5hbWUiLCJDb20iLCJmaWVsZCIsImNvdW50IiwiZm9ybVByb3BzIiwibmVlZERyYWciLCJjbGVhck1vdGlvbnMiLCJwcmVzc2VkTW90aW9ucyIsIm5vdFByZXNzZWRNb3Rpb25zIiwiY3JlYXRlU3R5bGUiLCJJRFJlZk1hcCIsIklETGlzdCIsIkFycmF5IiwibWFwIiwiSUQiLCJGb3JtIiwic2V0SURSZWZNYXAiLCJ2YWx1ZSIsInRvcEZvcm1SZW5kZXIiLCJncm91cCIsInIiLCJ0aGVuIiwic2V0U3RhdGUiLCJGcm9tSXRlbSIsInNldEZpZWxkc1ZhbHVlIiwic2V0RnVsbFZhbHVlcyIsInNldEZpZWxkc0Vycm9yIiwiZ2V0RnVsbFZhbHVlcyIsImdldEZpZWxkc1ZhbHVlIiwidmVyaWZ5Iiwic3RvcmUiLCJkaW5vRm9ybVJlZiIsIm9iaiIsImZvckVhY2giLCJlcnJvciIsInVwZGF0ZSIsIm5ld1ZhbHVlIiwiZmllbGRzIiwic2NoZW1lIiwiZ2V0Iiwib25seUdldE1vdW50IiwiZnJhZ21lbnRzRmllbGQiLCJpc01vdW50IiwiZ3JvdXBGaWVsZCIsImdyb3VwTmFtZSIsInZhbHVlcyIsInJlZiIsImNvbnNvbGUiLCJ3YXJuIiwicmVzdWx0IiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiZ3JvdXBGb3JtUmVmIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MsaUJBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixFQU9FQyxNQVBGLFFBUU8sa0JBUlA7QUFVQSxTQUFTQyxTQUFULEVBQW9CQyxjQUFwQixRQUEwQyxRQUExQztBQUNBLFNBQVNDLEtBQVQsUUFBc0IsUUFBdEI7O0FBRUEsTUFBTUMsT0FBTixTQUFzQlosU0FBdEIsQ0FBZ0M7QUFDOUJhLEVBQUFBLE1BQU0sR0FBRztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsV0FBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7QUFKNkI7O0FBT2hDLFNBQVNFLFVBQVQsR0FLUTtBQUFBLGlGQUFKLEVBQUk7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RUFBRSxNQUFJLENBQUNBLFNBRlY7QUFHTkMsb0JBQUFBLE1BQU0sRUFBRWIsU0FBUyxDQUFDO0FBQ2hCYSxzQkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ0EsTUFERztBQUVoQk4sc0JBQUFBLE1BQU0sRUFBRSxNQUFJLENBQUNtQyxhQUZHO0FBR2hCK0Qsc0JBQUFBLEtBQUssRUFBRSxNQUFNLE1BQUksQ0FBQ25FLEVBSEY7QUFJaEJvRSxzQkFBQUEsS0FBSyxFQUFHcEUsRUFBRCxJQUFRO0FBQUUsd0JBQUEsTUFBSSxDQUFDQSxFQUFMLEdBQVVBLEVBQVY7QUFBZTtBQUpoQixxQkFBRCxDQUhYO0FBU054QixvQkFBQUEsUUFBUSxFQUFFYixXQUFXLENBQUM7QUFBRWEsc0JBQUFBLFFBQVEsRUFBRSxNQUFJLENBQUNBO0FBQWpCLHFCQUFEO0FBVGY7QUFGVixtQkFEYztBQUFBO0FBRlY7QUFGVixhQXFCTzBGLE1BckJQLEVBREY7QUF5QkQ7O0FBbFhxQyxPQUF4QztBQW9YRCxLQXJYRDtBQXNYRCxHQXZYRDtBQXdYRDs7QUFFRCxlQUFlN0YsVUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlRGlub0Zvcm1TdG9yZSBmcm9tICcuL0Rpbm9Gb3JtU3RvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRnJvbUl0ZW0sXG4gIGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSxcbiAgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAsXG4gIGNyZWF0ZUZyYWdtZW50cyxcbiAgZ3JvdXBzQVBJLFxuICBzdWJGb3Jtc0FQSSxcbiAgZ2V0UmVmLFxufSBmcm9tICcuL0Rpbm9Gb3JtSGVscGVyJztcblxuaW1wb3J0IHsgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYyB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIFdyYXBDb20gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaW5vRm9ybTogeyByZW5kZXJEaW5vRm9ybSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybSh0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKHtcbiAgZnJhZ21lbnRzID0ge30sXG4gIGdyb3VwcyA9IHt9LFxuICBzdWJGb3JtcyA9IHt9LFxuICBnZXRHcm91cFJlZiA9IGdldFJlZixcbn0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlKFZpZXcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYmluZFdyYXAoV3JhcCA9IFdyYXBDb20pIHtcbiAgICAgIHJldHVybiBjbGFzcyBEaW5vRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yUHJvcHMpIHtcbiAgICAgICAgICBzdXBlcihjb25zdHJ1Y3RvclByb3BzKTtcblxuICAgICAgICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVEaW5vRm9ybVN0b3JlKCk7XG4gICAgICAgICAgLy8gdGhpcy5zdWJGb3JtcyA9IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybShzdWJGb3JtcywgdGhpcy50b3BGb3JtUmVuZGVyKTtcbiAgICAgICAgICB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHsgc3ViRm9ybXMsIHRvcEZvcm1SZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlciB9KTtcblxuICAgICAgICAgIHRoaXMuRnJvbUl0ZW0gPSBjcmVhdGVGcm9tSXRlbSh7XG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gY3JlYXRlRnJhZ21lbnRzKHtcbiAgICAgICAgICAgIGZyYWdtZW50cyxcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5JRCA9IDA7XG4gICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmNyZWF0ZUdyb3Vwcyhncm91cHMpO1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG4gICAgICAgICAgICBJRDogdGhpcy5JRCxcbiAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUdyb3VwcyA9IGdyb3Vwc09iaiA9PiBtYXBPYmplY3QoZ3JvdXBzT2JqLCAoZm9ybU5hbWUsIHtcbiAgICAgICAgICBDb20sXG4gICAgICAgICAgZmllbGQsXG4gICAgICAgICAgY291bnQsXG4gICAgICAgICAgZm9ybVByb3BzID0ge30sXG4gICAgICAgICAgbmVlZERyYWcgPSBmYWxzZSxcbiAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgcHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IElEUmVmTWFwID0ge307XG4gICAgICAgICAgY29uc3QgSURMaXN0ID0gWy4uLm5ldyBBcnJheShjb3VudCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuICAgICAgICAgIGNvbnN0IEZvcm0gPSBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCh7XG4gICAgICAgICAgICBzZXRJRFJlZk1hcDogKElELCB2YWx1ZSkgPT4geyB0aGlzLmdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdID0gdmFsdWU7IH0sXG4gICAgICAgICAgICB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBncm91cCA9IHtcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgICAgZm9ybU5hbWUsXG4gICAgICAgICAgICBuZWVkRHJhZyxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICAgIGNsZWFyTW90aW9ucyxcbiAgICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgICBjcmVhdGVTdHlsZSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBbZm9ybU5hbWVdOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0b3BGb3JtUmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKCkudGhlbihyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpID0gKCkgPT4gKHtcbiAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcblxuICAgICAgICAgIHNldEZpZWxkc1ZhbHVlOiB0aGlzLnNldEZpZWxkc1ZhbHVlLFxuICAgICAgICAgIHNldEZ1bGxWYWx1ZXM6IHRoaXMuc2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcjogdGhpcy5zZXRGaWVsZHNFcnJvcixcblxuICAgICAgICAgIGdldEZ1bGxWYWx1ZXM6IHRoaXMuZ2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBnZXRGaWVsZHNWYWx1ZTogdGhpcy5nZXRGaWVsZHNWYWx1ZSxcblxuICAgICAgICAgIHZlcmlmeTogdGhpcy52ZXJpZnksXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgZGlub0Zvcm1SZWY6IHRoaXMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzRXJyb3IgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyBlcnJvciB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIG5ld1ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSA9ICguLi5maWVsZHMpID0+IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gdGhpcy5zdG9yZS5nZXQoZmllbGQpIHx8IHt9O1xuICAgICAgICAgIHJldHVybiBzY2hlbWUudmFsdWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgZ2V0RnVsbFZhbHVlcyA9ICh7IG9ubHlHZXRNb3VudCA9IHRydWUgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgc2NoZW1lLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaXNNb3VudCwgdmFsdWUgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ubHlHZXRNb3VudFxuICAgICAgICAgICAgICAgID8gaXNNb3VudCA/IHsgW2ZpZWxkXTogdmFsdWUgfSA6IHt9XG4gICAgICAgICAgICAgICAgOiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGlmICghSURSZWZNYXBbSURdLnJlZikge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBncm91cCBmcm9tIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfSwgSUQ9JHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBJRFJlZk1hcFtJRF0ucmVmLmdldEZ1bGxWYWx1ZXMoeyBvbmx5R2V0TW91bnQgfSk7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiwgZmllbGQgfSA9IHN1YkZvcm07XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIHN1YkZvcm0gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHt9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHJlZi5nZXRGdWxsVmFsdWVzKHsgb25seUdldE1vdW50IH0pLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RnVsbFZhbHVlcyA9IGFzeW5jICh2YWx1ZXMgPSB7fSwgbWFwcyA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmluZEdyb3VwcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICApLmZpbmQoZ3JvdXAgPT4gZ3JvdXAuZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IGZpbmRTdWJGb3JtcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICkuZmluZChzdWJGb3JtID0+IHN1YkZvcm0uZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKHIgPT4gdGhpcy5zZXRTdGF0ZSh7fSwgcikpO1xuXG4gICAgICAgICAgYXdhaXQgbWFwT2JqZWN0KHZhbHVlcywgYXN5bmMgKGZpZWxkLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaW5kR3JvdXBzKGZpZWxkKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm0gPSBmaW5kU3ViRm9ybXMoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoc3ViRm9ybSkge1xuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IHN1YkZvcm1NYXBPYmogfSA9IG1hcHM7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBmaWVsZCBpcyAnJHtmaWVsZH0nIHN1YkZvcm0gc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgc3ViRm9ybS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyh2YWx1ZSwgc3ViRm9ybU1hcE9iaik7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFncm91cCkgeyAvLyBmcmFnbWVudFxuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IG1hcEZ1biA9IF8gPT4gXyB9ID0gbWFwcztcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG1hcEZ1bih2YWx1ZSkgfSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBJRExpc3QgYW5kIGFkZFxuICAgICAgICAgICAgZ3JvdXAuSURMaXN0ID0gWy4uLm5ldyBBcnJheSh2YWx1ZS5sZW5ndGgpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcblxuICAgICAgICAgICAgLy8gcmVuZGVyXG4gICAgICAgICAgICAvLyBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIGF3YWl0IHJlbmRlcigpO1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG5cbiAgICAgICAgICAgIC8vIGdyb3VwIHNob3VsZCBtb3VudGVkXG4gICAgICAgICAgICBjb25zdCB7IElEUmVmTWFwLCBJRExpc3QsIGZvcm1OYW1lIH0gPSBncm91cDtcblxuICAgICAgICAgICAgYXdhaXQgbWFwT2JqZWN0QXN5bmMoSURMaXN0LCBhc3luYyAoaW5kZXgsIElEKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlZiA9IGF3YWl0IGdldEdyb3VwUmVmKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICBbSURdOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogZ3JvdXBGb3JtUmVmLFxuICAgICAgICAgICAgICAgICAgfSA9IHt9LFxuICAgICAgICAgICAgICAgIH0gPSBJRFJlZk1hcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXBGb3JtUmVmO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZm9ybSAnJHtmb3JtTmFtZX0nIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIGdyb3VwLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbVZhbHVlID0gdmFsdWVbaW5kZXhdIHx8IFtdO1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogZnVuID0gKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG1hcE9iajoge30sXG4gICAgICAgICAgICAgICAgICBwcm9wczoge30sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIH0gPSBtYXBzO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHsgbWFwT2JqID0ge30sIHByb3BzID0ge30gfSA9IGZ1bihncm91cEl0ZW1WYWx1ZSk7XG5cbiAgICAgICAgICAgICAgSURSZWZNYXBbSURdLnByb3BzID0gcHJvcHM7XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXMoZ3JvdXBJdGVtVmFsdWUsIG1hcE9iaik7XG4gICAgICAgICAgICB9LCBJRExpc3QpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFJRFJlZk1hcFtJRF0ucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZ3JvdXAgZnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0sIElEPSR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gc3ViRnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0uYCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB7fSB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19