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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJnZXRSZWYiLCJtYXBPYmplY3QiLCJtYXBPYmplY3RBc3luYyIsInNsZWVwIiwiV3JhcENvbSIsInJlbmRlciIsInJlbmRlckRpbm9Gb3JtIiwicHJvcHMiLCJkaW5vRm9ybSIsImNyZWF0ZUZvcm0iLCJmcmFnbWVudHMiLCJncm91cHMiLCJzdWJGb3JtcyIsImdldEdyb3VwUmVmIiwiY3JlYXRlIiwiVmlldyIsImJpbmRXcmFwIiwiV3JhcCIsIkRpbm9Gb3JtIiwiY29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvclByb3BzIiwiZ3JvdXBzT2JqIiwiZm9ybU5hbWUiLCJDb20iLCJmaWVsZCIsImNvdW50IiwiZm9ybVByb3BzIiwibmVlZERyYWciLCJjbGVhck1vdGlvbnMiLCJwcmVzc2VkTW90aW9ucyIsIm5vdFByZXNzZWRNb3Rpb25zIiwiY3JlYXRlU3R5bGUiLCJJRFJlZk1hcCIsIklETGlzdCIsIkFycmF5IiwibWFwIiwiSUQiLCJGb3JtIiwic2V0SURSZWZNYXAiLCJ2YWx1ZSIsInRvcEZvcm1SZW5kZXIiLCJncm91cCIsInIiLCJ0aGVuIiwic2V0U3RhdGUiLCJGcm9tSXRlbSIsInNldEZpZWxkc1ZhbHVlIiwic2V0RnVsbFZhbHVlcyIsInNldEZpZWxkc0Vycm9yIiwiZ2V0RnVsbFZhbHVlcyIsImdldEZpZWxkc1ZhbHVlIiwidmVyaWZ5Iiwic3RvcmUiLCJkaW5vRm9ybVJlZiIsIm9iaiIsImZvckVhY2giLCJlcnJvciIsInVwZGF0ZSIsIm5ld1ZhbHVlIiwiZmllbGRzIiwic2NoZW1lIiwiZ2V0Iiwib25seUdldE1vdW50IiwiZnJhZ21lbnRzRmllbGQiLCJpc01vdW50IiwiZ3JvdXBGaWVsZCIsImdyb3VwTmFtZSIsInZhbHVlcyIsInJlc3VsdCIsInJlZiIsInB1c2giLCJzdWJGb3JtRmllbGQiLCJzdWJGb3JtIiwibWFwcyIsImZpbmRHcm91cHMiLCJmaW5kIiwiZmluZFN1YkZvcm1zIiwic3ViRm9ybU1hcE9iaiIsImNvbnNvbGUiLCJ3YXJuIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiZ3JvdXBGb3JtUmVmIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MsaUJBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixFQU9FQyxNQVBGLFFBUU8sa0JBUlA7QUFVQSxTQUFTQyxTQUFULEVBQW9CQyxjQUFwQixRQUEwQyxRQUExQztBQUNBLFNBQVNDLEtBQVQsUUFBc0IsUUFBdEI7O0FBRUEsTUFBTUMsT0FBTixTQUFzQlosU0FBdEIsQ0FBZ0M7QUFDOUJhLEVBQUFBLE1BQU0sR0FBRztBQUFBLFVBQ2FDLGNBRGIsR0FDa0MsS0FBS0MsS0FEdkMsQ0FDQ0MsUUFERCxDQUNhRixjQURiO0FBRVAsV0FBT0EsY0FBYyxDQUFDLEtBQUtDLEtBQU4sQ0FBckI7QUFDRDs7QUFKNkI7O0FBT2hDLFNBQVNFLFVBQVQsR0FLUTtBQUFBLGlGQUFKLEVBQUk7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OztBQUVQLGlCQUNFLG9CQUFDLElBQUQ7QUFDRSxZQUFBLEdBQUcsRUFBR0QsUUFEUjtBQUVFLFlBQUEsUUFBUSxvQkFDSCxLQUFLSCxpQkFBTCxFQURHO0FBRU41RixjQUFBQSxjQUFjLEVBQUU7QUFBQSxvQkFBQ0MsS0FBRCx1RUFBUyxFQUFUO0FBQUEsdUJBQ2Qsb0JBQUMsSUFBRCxlQUNPQSxLQURQO0FBRUUsa0JBQUEsUUFBUSxvQkFDSCxNQUFJLENBQUMyRixpQkFBTCxFQURHO0FBRU54RixvQkFBQUEsU0FBUyxFQUFFLE1BQUksQ0FBQ0EsU0FGVjtBQUdOQyxvQkFBQUEsTUFBTSxFQUFFYixTQUFTLENBQUM7QUFDaEJhLHNCQUFBQSxNQUFNLEVBQUUsTUFBSSxDQUFDQSxNQURHO0FBRWhCTixzQkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ21DLGFBRkc7QUFHaEIrRCxzQkFBQUEsS0FBSyxFQUFFLE1BQU0sTUFBSSxDQUFDbkUsRUFIRjtBQUloQm9FLHNCQUFBQSxLQUFLLEVBQUdwRSxFQUFELElBQVE7QUFBRSx3QkFBQSxNQUFJLENBQUNBLEVBQUwsR0FBVUEsRUFBVjtBQUFlO0FBSmhCLHFCQUFELENBSFg7QUFTTnhCLG9CQUFBQSxRQUFRLEVBQUViLFdBQVcsQ0FBQztBQUFFYSxzQkFBQUEsUUFBUSxFQUFFLE1BQUksQ0FBQ0E7QUFBakIscUJBQUQ7QUFUZjtBQUZWLG1CQURjO0FBQUE7QUFGVjtBQUZWLGFBcUJPMEYsTUFyQlAsRUFERjtBQXlCRDs7QUEzVnFDLE9BQXhDO0FBNlZELEtBOVZEO0FBK1ZELEdBaFdEO0FBaVdEOztBQUVELGVBQWU3RixVQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVEaW5vRm9ybVN0b3JlIGZyb20gJy4vRGlub0Zvcm1TdG9yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVGcm9tSXRlbSxcbiAgY3JlYXRlRGlub0Zvcm1TdWJGb3JtLFxuICBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCxcbiAgY3JlYXRlRnJhZ21lbnRzLFxuICBncm91cHNBUEksXG4gIHN1YkZvcm1zQVBJLFxuICBnZXRSZWYsXG59IGZyb20gJy4vRGlub0Zvcm1IZWxwZXInO1xuXG5pbXBvcnQgeyBtYXBPYmplY3QsIG1hcE9iamVjdEFzeW5jIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi91dGlsJztcblxuY2xhc3MgV3JhcENvbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRpbm9Gb3JtOiB7IHJlbmRlckRpbm9Gb3JtIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtKHRoaXMucHJvcHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oe1xuICBmcmFnbWVudHMgPSB7fSxcbiAgZ3JvdXBzID0ge30sXG4gIHN1YkZvcm1zID0ge30sXG4gIGdldEdyb3VwUmVmID0gZ2V0UmVmLFxufSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGUoVmlldykge1xuICAgIHJldHVybiBmdW5jdGlvbiBiaW5kV3JhcChXcmFwID0gV3JhcENvbSkge1xuICAgICAgcmV0dXJuIGNsYXNzIERpbm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RydWN0b3JQcm9wcykge1xuICAgICAgICAgIHN1cGVyKGNvbnN0cnVjdG9yUHJvcHMpO1xuXG4gICAgICAgICAgdGhpcy5zdG9yZSA9IGNyZWF0ZURpbm9Gb3JtU3RvcmUoKTtcbiAgICAgICAgICB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHN1YkZvcm1zKTtcblxuICAgICAgICAgIHRoaXMuRnJvbUl0ZW0gPSBjcmVhdGVGcm9tSXRlbSh7XG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gY3JlYXRlRnJhZ21lbnRzKHtcbiAgICAgICAgICAgIGZyYWdtZW50cyxcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5JRCA9IDA7XG4gICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmNyZWF0ZUdyb3Vwcyhncm91cHMpO1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG4gICAgICAgICAgICBJRDogdGhpcy5JRCxcbiAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUdyb3VwcyA9IGdyb3Vwc09iaiA9PiBtYXBPYmplY3QoZ3JvdXBzT2JqLCAoZm9ybU5hbWUsIHtcbiAgICAgICAgICBDb20sXG4gICAgICAgICAgZmllbGQsXG4gICAgICAgICAgY291bnQsXG4gICAgICAgICAgZm9ybVByb3BzID0ge30sXG4gICAgICAgICAgbmVlZERyYWcgPSBmYWxzZSxcbiAgICAgICAgICBjbGVhck1vdGlvbnMsXG4gICAgICAgICAgcHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgY3JlYXRlU3R5bGUsXG4gICAgICAgIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IElEUmVmTWFwID0ge307XG4gICAgICAgICAgY29uc3QgSURMaXN0ID0gWy4uLm5ldyBBcnJheShjb3VudCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuICAgICAgICAgIGNvbnN0IEZvcm0gPSBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCh7XG4gICAgICAgICAgICBzZXRJRFJlZk1hcDogKElELCB2YWx1ZSkgPT4geyB0aGlzLmdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdID0gdmFsdWU7IH0sXG4gICAgICAgICAgICB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBncm91cCA9IHtcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgICAgZm9ybU5hbWUsXG4gICAgICAgICAgICBuZWVkRHJhZyxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICAgIGNsZWFyTW90aW9ucyxcbiAgICAgICAgICAgIHByZXNzZWRNb3Rpb25zLFxuICAgICAgICAgICAgbm90UHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgICBjcmVhdGVTdHlsZSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBbZm9ybU5hbWVdOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0b3BGb3JtUmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKCkudGhlbihyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpID0gKCkgPT4gKHtcbiAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcblxuICAgICAgICAgIHNldEZpZWxkc1ZhbHVlOiB0aGlzLnNldEZpZWxkc1ZhbHVlLFxuICAgICAgICAgIHNldEZ1bGxWYWx1ZXM6IHRoaXMuc2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcjogdGhpcy5zZXRGaWVsZHNFcnJvcixcblxuICAgICAgICAgIGdldEZ1bGxWYWx1ZXM6IHRoaXMuZ2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBnZXRGaWVsZHNWYWx1ZTogdGhpcy5nZXRGaWVsZHNWYWx1ZSxcblxuICAgICAgICAgIHZlcmlmeTogdGhpcy52ZXJpZnksXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgZGlub0Zvcm1SZWY6IHRoaXMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzRXJyb3IgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyBlcnJvciB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIG5ld1ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSA9ICguLi5maWVsZHMpID0+IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gdGhpcy5zdG9yZS5nZXQoZmllbGQpIHx8IHt9O1xuICAgICAgICAgIHJldHVybiBzY2hlbWUudmFsdWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgZ2V0RnVsbFZhbHVlcyA9ICh7IG9ubHlHZXRNb3VudCA9IHRydWUgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgc2NoZW1lLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaXNNb3VudCwgdmFsdWUgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ubHlHZXRNb3VudFxuICAgICAgICAgICAgICAgID8gaXNNb3VudCA/IHsgW2ZpZWxkXTogdmFsdWUgfSA6IHt9XG4gICAgICAgICAgICAgICAgOiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IElEUmVmTWFwW0lEXS5yZWYuZ2V0RnVsbFZhbHVlcygpO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHJlZi5nZXRGdWxsVmFsdWVzKCksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGdWxsVmFsdWVzID0gYXN5bmMgKHZhbHVlcyA9IHt9LCBtYXBzID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmaW5kR3JvdXBzID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICkuZmluZChncm91cCA9PiBncm91cC5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgZmluZFN1YkZvcm1zID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgKS5maW5kKHN1YkZvcm0gPT4gc3ViRm9ybS5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UociA9PiB0aGlzLnNldFN0YXRlKHt9LCByKSk7XG5cbiAgICAgICAgICBhd2FpdCBtYXBPYmplY3QodmFsdWVzLCBhc3luYyAoZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpbmRHcm91cHMoZmllbGQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViRm9ybSA9IGZpbmRTdWJGb3JtcyhmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmIChzdWJGb3JtKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogc3ViRm9ybU1hcE9iaiB9ID0gbWFwcztcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYgfSA9IHN1YkZvcm07XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIGZpZWxkIGlzICcke2ZpZWxkfScgc3ViRm9ybSBzaG91bGQgYmUgbW91bnRlZCBidXQgdGhlIFJlZiBpcyBub3QgcmVnaXN0ZXJlZCwgbWF5YmUgeW91IG5vdCByZW5kZXIgdGhpcyBzdWJGb3JtLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJlZi5zZXRGdWxsVmFsdWVzKHZhbHVlLCBzdWJGb3JtTWFwT2JqKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdyb3VwKSB7IC8vIGZyYWdtZW50XG4gICAgICAgICAgICAgIGNvbnN0IHsgW2ZpZWxkXTogbWFwRnVuID0gXyA9PiBfIH0gPSBtYXBzO1xuICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbWFwRnVuKHZhbHVlKSB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA8IDEpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZGVsZXRlIElETGlzdCBhbmQgYWRkXG4gICAgICAgICAgICBncm91cC5JRExpc3QgPSBbLi4ubmV3IEFycmF5KHZhbHVlLmxlbmd0aCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuXG4gICAgICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgICAgIC8vIGF3YWl0IHJlbmRlcigpO1xuICAgICAgICAgICAgYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICAvLyBhd2FpdCB0aGlzLnRvcEZvcm1SZW5kZXIoKTtcblxuICAgICAgICAgICAgLy8gZ3JvdXAgc2hvdWxkIG1vdW50ZWRcbiAgICAgICAgICAgIGNvbnN0IHsgSURSZWZNYXAsIElETGlzdCwgZm9ybU5hbWUgfSA9IGdyb3VwO1xuXG4gICAgICAgICAgICBhd2FpdCBtYXBPYmplY3RBc3luYyhJRExpc3QsIGFzeW5jIChpbmRleCwgSUQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcmVmID0gYXdhaXQgZ2V0R3JvdXBSZWYoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIFtJRF06IHtcbiAgICAgICAgICAgICAgICAgICAgcmVmOiBncm91cEZvcm1SZWYsXG4gICAgICAgICAgICAgICAgICB9ID0ge30sXG4gICAgICAgICAgICAgICAgfSA9IElEUmVmTWFwO1xuICAgICAgICAgICAgICAgIHJldHVybiBncm91cEZvcm1SZWY7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBmb3JtICcke2Zvcm1OYW1lfScgc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgZ3JvdXAuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJdGVtVmFsdWUgPSB2YWx1ZVtpbmRleF0gfHwgW107XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBbZmllbGRdOiBmdW4gPSAoKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgbWFwT2JqOiB7fSxcbiAgICAgICAgICAgICAgICAgIHByb3BzOiB7fSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgfSA9IG1hcHM7XG5cbiAgICAgICAgICAgICAgY29uc3QgeyBtYXBPYmogPSB7fSwgcHJvcHMgPSB7fSB9ID0gZnVuKGdyb3VwSXRlbVZhbHVlKTtcblxuICAgICAgICAgICAgICBJRFJlZk1hcFtJRF0ucHJvcHMgPSBwcm9wcztcblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyhncm91cEl0ZW1WYWx1ZSwgbWFwT2JqKTtcbiAgICAgICAgICAgIH0sIElETGlzdCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZlcmlmeSA9ICh7XG4gICAgICAgICAgZmlyc3QgPSBmYWxzZSwgLy8gdG9kb1xuICAgICAgICAgIHNjcm9sbCA9IHRydWUsIC8vIHRvZG9cbiAgICAgICAgfSA9IHt9KSA9PiAoXG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50c0ZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUuZ2V0KCksXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICBzY2hlbWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICBydWxlcyA9IFtdLCBpc01vdW50LCB2YWx1ZSwgbGFiZWwsXG4gICAgICAgICAgICAgICAgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91bnQpIHsgcmV0dXJuIHt9OyB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUGFzcyA9IGF3YWl0IHJ1bGUuZnVuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGlmICghaXNQYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBydWxlLmVycm9yKHsgbGFiZWwsIGZpZWxkIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZpZWxkc0Vycm9yKHsgW2ZpZWxkXTogZXJyb3IgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gYXdhaXQgbWFwT2JqZWN0QXN5bmMoXG4gICAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgSURSZWZNYXAgPSBbXSwgSURMaXN0LFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgSUQgb2YgSURMaXN0KSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBJRFJlZk1hcFtJRF0ucmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNFcnJvcikgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiB2YWx1ZXMsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgICBhc3luYyAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHJlZiwgZmllbGQgfSA9IHN1YkZvcm07XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBoYXNFcnJvcjogc3ViRm9ybUhhc0Vycm9yIH0gPSBhd2FpdCByZWYudmVyaWZ5KCk7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3IgPSBzdWJGb3JtSGFzRXJyb3I7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IGRhdGEsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGhhc0Vycm9yLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgICAgICAuLi5zdWJGb3JtRmllbGQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgKVxuXG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICBjb25zdCB7IGNhdGNoUmVmID0gKCkgPT4ge30sIC4uLm90aGVycyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFdyYXBcbiAgICAgICAgICAgICAgcmVmPXsgY2F0Y2hSZWYgfVxuICAgICAgICAgICAgICBkaW5vRm9ybT17IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmNyZWF0ZURpbm9Gb3JtQXBpKCksXG4gICAgICAgICAgICAgICAgcmVuZGVyRGlub0Zvcm06IChwcm9wcyA9IHt9KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Vmlld1xuICAgICAgICAgICAgICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgICAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiBncm91cHNBUEkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SUQ6ICgpID0+IHRoaXMuSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJRDogKElEKSA9PiB7IHRoaXMuSUQgPSBJRDsgfSxcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBzdWJGb3Jtczogc3ViRm9ybXNBUEkoeyBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgIHsgLi4ub3RoZXJzIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZvcm07XG4iXX0=