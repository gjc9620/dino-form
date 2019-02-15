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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJnZXRSZWYiLCJtYXBPYmplY3QiLCJtYXBPYmplY3RBc3luYyIsInNsZWVwIiwiV3JhcENvbSIsInJlbmRlciIsInJlbmRlckRpbm9Gb3JtIiwicHJvcHMiLCJkaW5vRm9ybSIsImNyZWF0ZUZvcm0iLCJmcmFnbWVudHMiLCJncm91cHMiLCJzdWJGb3JtcyIsImdldEdyb3VwUmVmIiwiY3JlYXRlIiwiVmlldyIsImJpbmRXcmFwIiwiV3JhcCIsIkRpbm9Gb3JtIiwiY29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvclByb3BzIiwiZ3JvdXBzT2JqIiwiZm9ybU5hbWUiLCJDb20iLCJmaWVsZCIsImNvdW50IiwiZm9ybVByb3BzIiwibmVlZERyYWciLCJjbGVhck1vdGlvbnMiLCJwcmVzc2VkTW90aW9ucyIsIm5vdFByZXNzZWRNb3Rpb25zIiwiY3JlYXRlU3R5bGUiLCJJRFJlZk1hcCIsIklETGlzdCIsIkFycmF5IiwibWFwIiwiSUQiLCJGb3JtIiwic2V0SURSZWZNYXAiLCJ2YWx1ZSIsInRvcEZvcm1SZW5kZXIiLCJncm91cCIsInIiLCJ0aGVuIiwic2V0U3RhdGUiLCJGcm9tSXRlbSIsInNldEZpZWxkc1ZhbHVlIiwic2V0RnVsbFZhbHVlcyIsInNldEZpZWxkc0Vycm9yIiwiZ2V0RnVsbFZhbHVlcyIsImdldEZpZWxkc1ZhbHVlIiwidmVyaWZ5Iiwic3RvcmUiLCJkaW5vRm9ybVJlZiIsIm9iaiIsImZvckVhY2giLCJlcnJvciIsInVwZGF0ZSIsIm5ld1ZhbHVlIiwiZmllbGRzIiwic2NoZW1lIiwiZ2V0Iiwib25seUdldE1vdW50IiwiZnJhZ21lbnRzRmllbGQiLCJpc01vdW50IiwiZ3JvdXBGaWVsZCIsImdyb3VwTmFtZSIsInZhbHVlcyIsInJlZiIsImNvbnNvbGUiLCJ3YXJuIiwicmVzdWx0IiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiZ3JvdXBGb3JtUmVmIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MsaUJBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixFQU9FQyxNQVBGLFFBUU8sa0JBUlA7QUFVQSxTQUFTQyxTQUFULEVBQW9CQyxjQUFwQixRQUEwQyxRQUExQztBQUNBLFNBQVNDLEtBQVQsUUFBc0IsUUFBdEI7O0FBRUEsTUFBTUMsT0FBTixTQUFzQlosU0FBdEIsQ0FBZ0M7QUFDOUJhLEVBQUFBLE1BQU0sR0FBRztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsV0FBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7QUFKNkI7O0FBT2hDLFNBQVNFLFVBQVQsR0FLUTtBQUFBLGlGQUFKLEVBQUk7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QkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ0EsTUFERztBQUVoQk4sc0JBQUFBLE1BQU0sRUFBRSxNQUFJLENBQUNtQyxhQUZHO0FBR2hCK0Qsc0JBQUFBLEtBQUssRUFBRSxNQUFNLE1BQUksQ0FBQ25FLEVBSEY7QUFJaEJvRSxzQkFBQUEsS0FBSyxFQUFHcEUsRUFBRCxJQUFRO0FBQUUsd0JBQUEsTUFBSSxDQUFDQSxFQUFMLEdBQVVBLEVBQVY7QUFBZTtBQUpoQixxQkFBRCxDQUhYO0FBU054QixvQkFBQUEsUUFBUSxFQUFFYixXQUFXLENBQUM7QUFBRWEsc0JBQUFBLFFBQVEsRUFBRSxNQUFJLENBQUNBO0FBQWpCLHFCQUFEO0FBVGY7QUFGVixtQkFEYztBQUFBO0FBRlY7QUFGVixhQXFCTzBGLE1BckJQLEVBREY7QUF5QkQ7O0FBalhxQyxPQUF4QztBQW1YRCxLQXBYRDtBQXFYRCxHQXRYRDtBQXVYRDs7QUFFRCxlQUFlN0YsVUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlRGlub0Zvcm1TdG9yZSBmcm9tICcuL0Rpbm9Gb3JtU3RvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRnJvbUl0ZW0sXG4gIGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSxcbiAgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAsXG4gIGNyZWF0ZUZyYWdtZW50cyxcbiAgZ3JvdXBzQVBJLFxuICBzdWJGb3Jtc0FQSSxcbiAgZ2V0UmVmLFxufSBmcm9tICcuL0Rpbm9Gb3JtSGVscGVyJztcblxuaW1wb3J0IHsgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYyB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIFdyYXBDb20gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaW5vRm9ybTogeyByZW5kZXJEaW5vRm9ybSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiByZW5kZXJEaW5vRm9ybSh0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKHtcbiAgZnJhZ21lbnRzID0ge30sXG4gIGdyb3VwcyA9IHt9LFxuICBzdWJGb3JtcyA9IHt9LFxuICBnZXRHcm91cFJlZiA9IGdldFJlZixcbn0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlKFZpZXcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYmluZFdyYXAoV3JhcCA9IFdyYXBDb20pIHtcbiAgICAgIHJldHVybiBjbGFzcyBEaW5vRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yUHJvcHMpIHtcbiAgICAgICAgICBzdXBlcihjb25zdHJ1Y3RvclByb3BzKTtcblxuICAgICAgICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVEaW5vRm9ybVN0b3JlKCk7XG4gICAgICAgICAgdGhpcy5zdWJGb3JtcyA9IGNyZWF0ZURpbm9Gb3JtU3ViRm9ybShzdWJGb3Jtcyk7XG5cbiAgICAgICAgICB0aGlzLkZyb21JdGVtID0gY3JlYXRlRnJvbUl0ZW0oe1xuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmZyYWdtZW50cyA9IGNyZWF0ZUZyYWdtZW50cyh7XG4gICAgICAgICAgICBmcmFnbWVudHMsXG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuSUQgPSAwO1xuICAgICAgICAgIHRoaXMuZ3JvdXBzID0gdGhpcy5jcmVhdGVHcm91cHMoZ3JvdXBzKTtcblxuICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuICAgICAgICAgICAgSUQ6IHRoaXMuSUQsXG4gICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVHcm91cHMgPSBncm91cHNPYmogPT4gbWFwT2JqZWN0KGdyb3Vwc09iaiwgKGZvcm1OYW1lLCB7XG4gICAgICAgICAgQ29tLFxuICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgIGNvdW50LFxuICAgICAgICAgIGZvcm1Qcm9wcyA9IHt9LFxuICAgICAgICAgIG5lZWREcmFnID0gZmFsc2UsXG4gICAgICAgICAgY2xlYXJNb3Rpb25zLFxuICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgIGNyZWF0ZVN0eWxlLFxuICAgICAgICB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBJRFJlZk1hcCA9IHt9O1xuICAgICAgICAgIGNvbnN0IElETGlzdCA9IFsuLi5uZXcgQXJyYXkoY291bnQpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcbiAgICAgICAgICBjb25zdCBGb3JtID0gY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAoe1xuICAgICAgICAgICAgc2V0SURSZWZNYXA6IChJRCwgdmFsdWUpID0+IHsgdGhpcy5ncm91cHNbZm9ybU5hbWVdLklEUmVmTWFwW0lEXSA9IHZhbHVlOyB9LFxuICAgICAgICAgICAgdG9wRm9ybVJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgIGZvcm1Qcm9wcyxcbiAgICAgICAgICAgIGZvcm1OYW1lLFxuICAgICAgICAgICAgbmVlZERyYWcsXG4gICAgICAgICAgICBJRFJlZk1hcCxcbiAgICAgICAgICAgIElETGlzdCxcbiAgICAgICAgICAgIEZvcm0sXG4gICAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgICBwcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICAgIG5vdFByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgW2Zvcm1OYW1lXTogZ3JvdXAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdG9wRm9ybVJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9wRm9ybVJlbmRlcigpLnRoZW4ocik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHt9LCByKTtcbiAgICAgICAgfSlcblxuICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaSA9ICgpID0+ICh7XG4gICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG5cbiAgICAgICAgICBzZXRGaWVsZHNWYWx1ZTogdGhpcy5zZXRGaWVsZHNWYWx1ZSxcbiAgICAgICAgICBzZXRGdWxsVmFsdWVzOiB0aGlzLnNldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgc2V0RmllbGRzRXJyb3I6IHRoaXMuc2V0RmllbGRzRXJyb3IsXG5cbiAgICAgICAgICBnZXRGdWxsVmFsdWVzOiB0aGlzLmdldEZ1bGxWYWx1ZXMsXG4gICAgICAgICAgZ2V0RmllbGRzVmFsdWU6IHRoaXMuZ2V0RmllbGRzVmFsdWUsXG5cbiAgICAgICAgICB2ZXJpZnk6IHRoaXMudmVyaWZ5LFxuICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgIGRpbm9Gb3JtUmVmOiB0aGlzLFxuICAgICAgICB9KVxuXG4gICAgICAgIHNldEZpZWxkc0Vycm9yID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIGVycm9yXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgZXJyb3IgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGaWVsZHNWYWx1ZSA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBuZXdWYWx1ZV0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMudG9wRm9ybVJlbmRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0RmllbGRzVmFsdWUgPSAoLi4uZmllbGRzKSA9PiBmaWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtZSA9IHRoaXMuc3RvcmUuZ2V0KGZpZWxkKSB8fCB7fTtcbiAgICAgICAgICByZXR1cm4gc2NoZW1lLnZhbHVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIGdldEZ1bGxWYWx1ZXMgPSAoeyBvbmx5R2V0TW91bnQgPSB0cnVlIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgIHNjaGVtZSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IGlzTW91bnQsIHZhbHVlIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgIHJldHVybiBvbmx5R2V0TW91bnRcbiAgICAgICAgICAgICAgICA/IGlzTW91bnQgPyB7IFtmaWVsZF06IHZhbHVlIH0gOiB7fVxuICAgICAgICAgICAgICAgIDogeyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUlEUmVmTWFwW0lEXS5yZWYpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZ3JvdXAgZnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0sIElEPSR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSURSZWZNYXBbSURdLnJlZi5nZXRGdWxsVmFsdWVzKHsgb25seUdldE1vdW50IH0pO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBzdWJGb3JtIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiB7fSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiByZWYuZ2V0RnVsbFZhbHVlcyh7IG9ubHlHZXRNb3VudCB9KSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZ1bGxWYWx1ZXMgPSBhc3luYyAodmFsdWVzID0ge30sIG1hcHMgPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbmRHcm91cHMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgKS5maW5kKGdyb3VwID0+IGdyb3VwLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCBmaW5kU3ViRm9ybXMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICApLmZpbmQoc3ViRm9ybSA9PiBzdWJGb3JtLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZShyID0+IHRoaXMuc2V0U3RhdGUoe30sIHIpKTtcblxuICAgICAgICAgIGF3YWl0IG1hcE9iamVjdCh2YWx1ZXMsIGFzeW5jIChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmluZEdyb3VwcyhmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtID0gZmluZFN1YkZvcm1zKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHN1YkZvcm0pIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBzdWJGb3JtTWFwT2JqIH0gPSBtYXBzO1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZmllbGQgaXMgJyR7ZmllbGR9JyBzdWJGb3JtIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIHN1YkZvcm0uYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXModmFsdWUsIHN1YkZvcm1NYXBPYmopO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ3JvdXApIHsgLy8gZnJhZ21lbnRcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBtYXBGdW4gPSBfID0+IF8gfSA9IG1hcHM7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBtYXBGdW4odmFsdWUpIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBkZWxldGUgSURMaXN0IGFuZCBhZGRcbiAgICAgICAgICAgIGdyb3VwLklETGlzdCA9IFsuLi5uZXcgQXJyYXkodmFsdWUubGVuZ3RoKV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG5cbiAgICAgICAgICAgIC8vIHJlbmRlclxuICAgICAgICAgICAgLy8gYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMudG9wRm9ybVJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIGF3YWl0IG1hcE9iamVjdEFzeW5jKElETGlzdCwgYXN5bmMgKGluZGV4LCBJRCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZWYgPSBhd2FpdCBnZXRHcm91cFJlZigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgW0lEXToge1xuICAgICAgICAgICAgICAgICAgICByZWY6IGdyb3VwRm9ybVJlZixcbiAgICAgICAgICAgICAgICAgIH0gPSB7fSxcbiAgICAgICAgICAgICAgICB9ID0gSURSZWZNYXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwRm9ybVJlZjtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGZvcm0gJyR7Zm9ybU5hbWV9JyBzaG91bGQgYmUgbW91bnRlZCBidXQgdGhlIFJlZiBpcyBub3QgcmVnaXN0ZXJlZCwgbWF5YmUgeW91IG5vdCByZW5kZXIgdGhpcyBncm91cC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1WYWx1ZSA9IHZhbHVlW2luZGV4XSB8fCBbXTtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IGZ1biA9ICgpID0+ICh7XG4gICAgICAgICAgICAgICAgICBtYXBPYmo6IHt9LFxuICAgICAgICAgICAgICAgICAgcHJvcHM6IHt9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB9ID0gbWFwcztcblxuICAgICAgICAgICAgICBjb25zdCB7IG1hcE9iaiA9IHt9LCBwcm9wcyA9IHt9IH0gPSBmdW4oZ3JvdXBJdGVtVmFsdWUpO1xuXG4gICAgICAgICAgICAgIElEUmVmTWFwW0lEXS5wcm9wcyA9IHByb3BzO1xuXG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKGdyb3VwSXRlbVZhbHVlLCBtYXBPYmopO1xuICAgICAgICAgICAgfSwgSURMaXN0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmVyaWZ5ID0gKHtcbiAgICAgICAgICBmaXJzdCA9IGZhbHNlLCAvLyB0b2RvXG4gICAgICAgICAgc2Nyb2xsID0gdHJ1ZSwgLy8gdG9kb1xuICAgICAgICB9ID0ge30pID0+IChcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIHNjaGVtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIHJ1bGVzID0gW10sIGlzTW91bnQsIHZhbHVlLCBsYWJlbCxcbiAgICAgICAgICAgICAgICB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICAgIGlmICghaXNNb3VudCkgeyByZXR1cm4ge307IH1cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNQYXNzID0gYXdhaXQgcnVsZS5mdW4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgaWYgKCFpc1Bhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHJ1bGUuZXJyb3IoeyBsYWJlbCwgZmllbGQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghSURSZWZNYXBbSURdLnJlZikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGdyb3VwIGZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LCBJRD0ke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IElEUmVmTWFwW0lEXS5yZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmhhc0Vycm9yKSBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAgIGFzeW5jIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIHN1YkZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LmApO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXToge30gfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGhhc0Vycm9yOiBzdWJGb3JtSGFzRXJyb3IgfSA9IGF3YWl0IHJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHN1YkZvcm1IYXNFcnJvcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogZGF0YSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaGFzRXJyb3IsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcblxuICAgICAgICApXG5cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIGNvbnN0IHsgY2F0Y2hSZWYgPSAoKSA9PiB7fSwgLi4ub3RoZXJzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8V3JhcFxuICAgICAgICAgICAgICByZWY9eyBjYXRjaFJlZiB9XG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICByZW5kZXJEaW5vRm9ybTogKHByb3BzID0ge30pID0+IChcbiAgICAgICAgICAgICAgICAgIDxWaWV3XG4gICAgICAgICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IGdyb3Vwc0FQSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJRDogKCkgPT4gdGhpcy5JRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldElEOiAoSUQpID0+IHsgdGhpcy5JRCA9IElEOyB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIHN1YkZvcm1zOiBzdWJGb3Jtc0FQSSh7IHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zIH0pLFxuICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgeyAuLi5vdGhlcnMgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRm9ybTtcbiJdfQ==