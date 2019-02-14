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

              if (!ref) {
                console.warn(`[dino-form] subForm ref not registered, field = ${field}`);
                return {
                  [field]: {}
                };
              }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJnZXRSZWYiLCJtYXBPYmplY3QiLCJtYXBPYmplY3RBc3luYyIsInNsZWVwIiwiV3JhcENvbSIsInJlbmRlciIsInJlbmRlckRpbm9Gb3JtIiwicHJvcHMiLCJkaW5vRm9ybSIsImNyZWF0ZUZvcm0iLCJmcmFnbWVudHMiLCJncm91cHMiLCJzdWJGb3JtcyIsImdldEdyb3VwUmVmIiwiY3JlYXRlIiwiVmlldyIsImJpbmRXcmFwIiwiV3JhcCIsIkRpbm9Gb3JtIiwiY29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvclByb3BzIiwiZ3JvdXBzT2JqIiwiZm9ybU5hbWUiLCJDb20iLCJmaWVsZCIsImNvdW50IiwiZm9ybVByb3BzIiwibmVlZERyYWciLCJjbGVhck1vdGlvbnMiLCJwcmVzc2VkTW90aW9ucyIsIm5vdFByZXNzZWRNb3Rpb25zIiwiY3JlYXRlU3R5bGUiLCJJRFJlZk1hcCIsIklETGlzdCIsIkFycmF5IiwibWFwIiwiSUQiLCJGb3JtIiwic2V0SURSZWZNYXAiLCJ2YWx1ZSIsInRvcEZvcm1SZW5kZXIiLCJncm91cCIsInIiLCJ0aGVuIiwic2V0U3RhdGUiLCJGcm9tSXRlbSIsInNldEZpZWxkc1ZhbHVlIiwic2V0RnVsbFZhbHVlcyIsInNldEZpZWxkc0Vycm9yIiwiZ2V0RnVsbFZhbHVlcyIsImdldEZpZWxkc1ZhbHVlIiwidmVyaWZ5Iiwic3RvcmUiLCJkaW5vRm9ybVJlZiIsIm9iaiIsImZvckVhY2giLCJlcnJvciIsInVwZGF0ZSIsIm5ld1ZhbHVlIiwiZmllbGRzIiwic2NoZW1lIiwiZ2V0Iiwib25seUdldE1vdW50IiwiZnJhZ21lbnRzRmllbGQiLCJpc01vdW50IiwiZ3JvdXBGaWVsZCIsImdyb3VwTmFtZSIsInZhbHVlcyIsInJlZiIsImNvbnNvbGUiLCJ3YXJuIiwicmVzdWx0IiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiZ3JvdXBGb3JtUmVmIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MsaUJBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixFQU9FQyxNQVBGLFFBUU8sa0JBUlA7QUFVQSxTQUFTQyxTQUFULEVBQW9CQyxjQUFwQixRQUEwQyxRQUExQztBQUNBLFNBQVNDLEtBQVQsUUFBc0IsUUFBdEI7O0FBRUEsTUFBTUMsT0FBTixTQUFzQlosU0FBdEIsQ0FBZ0M7QUFDOUJhLEVBQUFBLE1BQU0sR0FBRztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsV0FBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7QUFKNkI7O0FBT2hDLFNBQVNFLFVBQVQsR0FLUTtBQUFBLGlGQUFKLEVBQUk7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Q0FBQ21DLGFBRkc7QUFHaEIrRCxzQkFBQUEsS0FBSyxFQUFFLE1BQU0sTUFBSSxDQUFDbkUsRUFIRjtBQUloQm9FLHNCQUFBQSxLQUFLLEVBQUdwRSxFQUFELElBQVE7QUFBRSx3QkFBQSxNQUFJLENBQUNBLEVBQUwsR0FBVUEsRUFBVjtBQUFlO0FBSmhCLHFCQUFELENBSFg7QUFTTnhCLG9CQUFBQSxRQUFRLEVBQUViLFdBQVcsQ0FBQztBQUFFYSxzQkFBQUEsUUFBUSxFQUFFLE1BQUksQ0FBQ0E7QUFBakIscUJBQUQ7QUFUZjtBQUZWLG1CQURjO0FBQUE7QUFGVjtBQUZWLGFBcUJPMEYsTUFyQlAsRUFERjtBQXlCRDs7QUFqWHFDLE9BQXhDO0FBbVhELEtBcFhEO0FBcVhELEdBdFhEO0FBdVhEOztBQUVELGVBQWU3RixVQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVEaW5vRm9ybVN0b3JlIGZyb20gJy4vRGlub0Zvcm1TdG9yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVGcm9tSXRlbSxcbiAgY3JlYXRlRGlub0Zvcm1TdWJGb3JtLFxuICBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCxcbiAgY3JlYXRlRnJhZ21lbnRzLFxuICBncm91cHNBUEksXG4gIHN1YkZvcm1zQVBJLFxuICBnZXRSZWYsXG59IGZyb20gJy4vRGlub0Zvcm1IZWxwZXInO1xuXG5pbXBvcnQgeyBtYXBPYmplY3QsIG1hcE9iamVjdEFzeW5jIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgV3JhcENvbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRpbm9Gb3JtOiB7IHJlbmRlckRpbm9Gb3JtIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtKHRoaXMucHJvcHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oe1xuICBmcmFnbWVudHMgPSB7fSxcbiAgZ3JvdXBzID0ge30sXG4gIHN1YkZvcm1zID0ge30sXG4gIGdldEdyb3VwUmVmID0gZ2V0UmVmLFxufSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGUoVmlldykge1xuICAgIHJldHVybiBmdW5jdGlvbiBiaW5kV3JhcChXcmFwID0gV3JhcENvbSkge1xuICAgICAgcmV0dXJuIGNsYXNzIERpbm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RydWN0b3JQcm9wcykge1xuICAgICAgICAgIHN1cGVyKGNvbnN0cnVjdG9yUHJvcHMpO1xuXG4gICAgICAgICAgdGhpcy5zdG9yZSA9IGNyZWF0ZURpbm9Gb3JtU3RvcmUoKTtcbiAgICAgICAgICB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHN1YkZvcm1zKTtcblxuICAgICAgICAgIHRoaXMuRnJvbUl0ZW0gPSBjcmVhdGVGcm9tSXRlbSh7XG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gY3JlYXRlRnJhZ21lbnRzKHtcbiAgICAgICAgICAgIGZyYWdtZW50cyxcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5JRCA9IDA7XG4gICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmNyZWF0ZUdyb3Vwcyhncm91cHMpO1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG4gICAgICAgICAgICBJRDogdGhpcy5JRCxcbiAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUdyb3VwcyA9IGdyb3Vwc09iaiA9PiBtYXBPYmplY3QoZ3JvdXBzT2JqLCAoZm9ybU5hbWUsIHtcbiAgICAgICAgICBDb20sXG4gICAgICAgICAgZmllbGQsXG4gICAgICAgICAgY291bnQsXG4gICAgICAgICAgZm9ybVByb3BzID0ge30sXG4gICAgICAgICAgbmVlZERyYWcgPSBmYWxzZSxcbiAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgcHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IElEUmVmTWFwID0ge307XG4gICAgICAgICAgY29uc3QgSURMaXN0ID0gWy4uLm5ldyBBcnJheShjb3VudCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuICAgICAgICAgIGNvbnN0IEZvcm0gPSBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCh7XG4gICAgICAgICAgICBzZXRJRFJlZk1hcDogKElELCB2YWx1ZSkgPT4geyB0aGlzLmdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdID0gdmFsdWU7IH0sXG4gICAgICAgICAgICB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBncm91cCA9IHtcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgICAgZm9ybU5hbWUsXG4gICAgICAgICAgICBuZWVkRHJhZyxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICAgIGNsZWFyTW90aW9ucyxcbiAgICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgICBjcmVhdGVTdHlsZSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBbZm9ybU5hbWVdOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0b3BGb3JtUmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKCkudGhlbihyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpID0gKCkgPT4gKHtcbiAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcblxuICAgICAgICAgIHNldEZpZWxkc1ZhbHVlOiB0aGlzLnNldEZpZWxkc1ZhbHVlLFxuICAgICAgICAgIHNldEZ1bGxWYWx1ZXM6IHRoaXMuc2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcjogdGhpcy5zZXRGaWVsZHNFcnJvcixcblxuICAgICAgICAgIGdldEZ1bGxWYWx1ZXM6IHRoaXMuZ2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBnZXRGaWVsZHNWYWx1ZTogdGhpcy5nZXRGaWVsZHNWYWx1ZSxcblxuICAgICAgICAgIHZlcmlmeTogdGhpcy52ZXJpZnksXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgZGlub0Zvcm1SZWY6IHRoaXMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzRXJyb3IgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyBlcnJvciB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIG5ld1ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSA9ICguLi5maWVsZHMpID0+IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gdGhpcy5zdG9yZS5nZXQoZmllbGQpIHx8IHt9O1xuICAgICAgICAgIHJldHVybiBzY2hlbWUudmFsdWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgZ2V0RnVsbFZhbHVlcyA9ICh7IG9ubHlHZXRNb3VudCA9IHRydWUgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgc2NoZW1lLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaXNNb3VudCwgdmFsdWUgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ubHlHZXRNb3VudFxuICAgICAgICAgICAgICAgID8gaXNNb3VudCA/IHsgW2ZpZWxkXTogdmFsdWUgfSA6IHt9XG4gICAgICAgICAgICAgICAgOiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGlmICghSURSZWZNYXBbSURdLnJlZikge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBncm91cCBmcm9tIHJlZiBub3QgcmVnaXN0ZXJlZCwgZmllbGQgPSAke2ZpZWxkfSwgSUQ9JHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBJRFJlZk1hcFtJRF0ucmVmLmdldEZ1bGxWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gc3ViRm9ybSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXToge30sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogcmVmLmdldEZ1bGxWYWx1ZXMoKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZ1bGxWYWx1ZXMgPSBhc3luYyAodmFsdWVzID0ge30sIG1hcHMgPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbmRHcm91cHMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgKS5maW5kKGdyb3VwID0+IGdyb3VwLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCBmaW5kU3ViRm9ybXMgPSBmaWVsZCA9PiBPYmplY3QudmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICApLmZpbmQoc3ViRm9ybSA9PiBzdWJGb3JtLmZpZWxkID09PSBmaWVsZCk7XG5cbiAgICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZShyID0+IHRoaXMuc2V0U3RhdGUoe30sIHIpKTtcblxuICAgICAgICAgIGF3YWl0IG1hcE9iamVjdCh2YWx1ZXMsIGFzeW5jIChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmluZEdyb3VwcyhmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtID0gZmluZFN1YkZvcm1zKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHN1YkZvcm0pIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBzdWJGb3JtTWFwT2JqIH0gPSBtYXBzO1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZmllbGQgaXMgJyR7ZmllbGR9JyBzdWJGb3JtIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIHN1YkZvcm0uYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXModmFsdWUsIHN1YkZvcm1NYXBPYmopO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ3JvdXApIHsgLy8gZnJhZ21lbnRcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBtYXBGdW4gPSBfID0+IF8gfSA9IG1hcHM7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBtYXBGdW4odmFsdWUpIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBkZWxldGUgSURMaXN0IGFuZCBhZGRcbiAgICAgICAgICAgIGdyb3VwLklETGlzdCA9IFsuLi5uZXcgQXJyYXkodmFsdWUubGVuZ3RoKV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG5cbiAgICAgICAgICAgIC8vIHJlbmRlclxuICAgICAgICAgICAgLy8gYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMudG9wRm9ybVJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIGF3YWl0IG1hcE9iamVjdEFzeW5jKElETGlzdCwgYXN5bmMgKGluZGV4LCBJRCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZWYgPSBhd2FpdCBnZXRHcm91cFJlZigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgW0lEXToge1xuICAgICAgICAgICAgICAgICAgICByZWY6IGdyb3VwRm9ybVJlZixcbiAgICAgICAgICAgICAgICAgIH0gPSB7fSxcbiAgICAgICAgICAgICAgICB9ID0gSURSZWZNYXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwRm9ybVJlZjtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGZvcm0gJyR7Zm9ybU5hbWV9JyBzaG91bGQgYmUgbW91bnRlZCBidXQgdGhlIFJlZiBpcyBub3QgcmVnaXN0ZXJlZCwgbWF5YmUgeW91IG5vdCByZW5kZXIgdGhpcyBncm91cC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1WYWx1ZSA9IHZhbHVlW2luZGV4XSB8fCBbXTtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IGZ1biA9ICgpID0+ICh7XG4gICAgICAgICAgICAgICAgICBtYXBPYmo6IHt9LFxuICAgICAgICAgICAgICAgICAgcHJvcHM6IHt9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB9ID0gbWFwcztcblxuICAgICAgICAgICAgICBjb25zdCB7IG1hcE9iaiA9IHt9LCBwcm9wcyA9IHt9IH0gPSBmdW4oZ3JvdXBJdGVtVmFsdWUpO1xuXG4gICAgICAgICAgICAgIElEUmVmTWFwW0lEXS5wcm9wcyA9IHByb3BzO1xuXG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKGdyb3VwSXRlbVZhbHVlLCBtYXBPYmopO1xuICAgICAgICAgICAgfSwgSURMaXN0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmVyaWZ5ID0gKHtcbiAgICAgICAgICBmaXJzdCA9IGZhbHNlLCAvLyB0b2RvXG4gICAgICAgICAgc2Nyb2xsID0gdHJ1ZSwgLy8gdG9kb1xuICAgICAgICB9ID0ge30pID0+IChcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5nZXQoKSxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIHNjaGVtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIHJ1bGVzID0gW10sIGlzTW91bnQsIHZhbHVlLCBsYWJlbCxcbiAgICAgICAgICAgICAgICB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICAgIGlmICghaXNNb3VudCkgeyByZXR1cm4ge307IH1cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNQYXNzID0gYXdhaXQgcnVsZS5mdW4odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgaWYgKCFpc1Bhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHJ1bGUuZXJyb3IoeyBsYWJlbCwgZmllbGQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRzRXJyb3IoeyBbZmllbGRdOiBlcnJvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICBJRFJlZk1hcCA9IFtdLCBJRExpc3QsXG4gICAgICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghSURSZWZNYXBbSURdLnJlZikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGdyb3VwIGZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LCBJRD0ke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IElEUmVmTWFwW0lEXS5yZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmhhc0Vycm9yKSBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybUZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAgIGFzeW5jIChmb3JtTmFtZSwgc3ViRm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmLCBmaWVsZCB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIHN1YkZyb20gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9LmApO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgW2ZpZWxkXToge30gfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGhhc0Vycm9yOiBzdWJGb3JtSGFzRXJyb3IgfSA9IGF3YWl0IHJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHN1YkZvcm1IYXNFcnJvcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogZGF0YSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaGFzRXJyb3IsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAuLi5mcmFnbWVudHNGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcblxuICAgICAgICApXG5cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIGNvbnN0IHsgY2F0Y2hSZWYgPSAoKSA9PiB7fSwgLi4ub3RoZXJzIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8V3JhcFxuICAgICAgICAgICAgICByZWY9eyBjYXRjaFJlZiB9XG4gICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICByZW5kZXJEaW5vRm9ybTogKHByb3BzID0ge30pID0+IChcbiAgICAgICAgICAgICAgICAgIDxWaWV3XG4gICAgICAgICAgICAgICAgICAgIHsgLi4ucHJvcHMgfVxuICAgICAgICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IGdyb3Vwc0FQSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJRDogKCkgPT4gdGhpcy5JRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldElEOiAoSUQpID0+IHsgdGhpcy5JRCA9IElEOyB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIHN1YkZvcm1zOiBzdWJGb3Jtc0FQSSh7IHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zIH0pLFxuICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgeyAuLi5vdGhlcnMgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRm9ybTtcbiJdfQ==