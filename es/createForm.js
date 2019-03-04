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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJnZXRSZWYiLCJzbGVlcCIsIm1hcE9iamVjdCIsIm1hcE9iamVjdEFzeW5jIiwiaXNQcm9kdWN0aW9uIiwiaXNOb3RFeGlzdCIsIldyYXBDb20iLCJyZW5kZXIiLCJyZW5kZXJEaW5vRm9ybSIsInByb3BzIiwiZGlub0Zvcm0iLCJjcmVhdGVGb3JtIiwiZnJhZ21lbnRzIiwiZ3JvdXBzIiwic3ViRm9ybXMiLCJnZXRHcm91cFJlZiIsImNyZWF0ZSIsIlZpZXciLCJiaW5kV3JhcCIsIldyYXAiLCJEaW5vRm9ybSIsImNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3JQcm9wcyIsImdyb3Vwc09iaiIsImZvcm1OYW1lIiwiQ29tIiwiZmllbGQiLCJjb3VudCIsImZvcm1Qcm9wcyIsIm5lZWREcmFnIiwiY2xlYXJNb3Rpb25zIiwicHJlc3NlZE1vdGlvbnMiLCJub3RQcmVzc2VkTW90aW9ucyIsImNyZWF0ZVN0eWxlIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJyIiwidGhlbiIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImRlYnVnIiwiZnJhZ21lbnRzRmllbGQiLCJpc01vdW50IiwiZ3JvdXBGaWVsZCIsImdyb3VwTmFtZSIsInZhbHVlcyIsInJlZiIsImNvbnNvbGUiLCJ3YXJuIiwicmVzdWx0IiwicHVzaCIsInN1YkZvcm1GaWVsZCIsInN1YkZvcm0iLCJtYXBzIiwiZmluZEdyb3VwcyIsImZpbmQiLCJmaW5kU3ViRm9ybXMiLCJzdWJGb3JtTWFwT2JqIiwibWFwRnVuIiwiXyIsImxlbmd0aCIsImluZGV4IiwiZ3JvdXBGb3JtUmVmIiwiZ3JvdXBJdGVtVmFsdWUiLCJmdW4iLCJtYXBPYmoiLCJmaXJzdCIsInNjcm9sbCIsInJlc29sdmUiLCJoYXNFcnJvciIsInJ1bGVzIiwibGFiZWwiLCJydWxlIiwiaXNQYXNzIiwiZGF0YSIsInN1YkZvcm1IYXNFcnJvciIsImNyZWF0ZURpbm9Gb3JtQXBpIiwiY3JlYXRlR3JvdXBzIiwic3RhdGUiLCJjYXRjaFJlZiIsIm90aGVycyIsImdldElEIiwic2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MsaUJBQWhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxxQkFGRixFQUdFQyx1QkFIRixFQUlFQyxlQUpGLEVBS0VDLFNBTEYsRUFNRUMsV0FORixFQU9FQyxNQVBGLFFBUU8sa0JBUlA7QUFVQSxTQUNFQyxLQURGLEVBQ1NDLFNBRFQsRUFDb0JDLGNBRHBCLEVBQ29DQyxZQURwQyxRQUVPLFFBRlA7QUFHQSxTQUFTQyxVQUFULFFBQTJCLE9BQTNCOztBQUVBLE1BQU1DLE9BQU4sU0FBc0JkLFNBQXRCLENBQWdDO0FBQzlCZSxFQUFBQSxNQUFNLEdBQUc7QUFBQSxVQUNhQyxjQURiLEdBQ2tDLEtBQUtDLEtBRHZDLENBQ0NDLFFBREQsQ0FDYUYsY0FEYjtBQUVQLFdBQU9BLGNBQWMsQ0FBQyxLQUFLQyxLQUFO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ekM7QUFBQSxtREFDQytGLFFBREQ7QUFBQSxnQkFDQ0EsUUFERCxxQ0FDWSxNQUFNLENBQUUsQ0FEcEI7QUFBQSxnQkFDeUJDLE1BRHpCOztBQUVQLGlCQUNFLG9CQUFDLElBQUQ7QUFDRSxZQUFBLEdBQUcsRUFBR0QsUUFEUjtBQUVFLFlBQUEsUUFBUSxvQkFDSCxLQUFLSCxpQkFBTCxFQURHO0FBRU43RixjQUFBQSxjQUFjLEVBQUU7QUFBQSxvQkFBQ0MsS0FBRCx1RUFBUyxFQUFUO0FBQUEsdUJBQ2Qsb0JBQUMsSUFBRCxlQUNPQSxLQURQO0FBRUUsa0JBQUEsUUFBUSxvQkFDSCxNQUFJLENBQUM0RixpQkFBTCxFQURHO0FBRU56RixvQkFBQUEsU0FBUyxFQUFFLE1BQUksQ0FBQ0EsU0FGVjtBQUdOQyxvQkFBQUEsTUFBTSxFQUFFZixTQUFTLENBQUM7QUFDaEJlLHNCQUFBQSxNQUFNLEVBQUUsTUFBSSxDQUFDQSxNQURHO0FBRWhCTixzQkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ21DLGFBRkc7QUFHaEJnRSxzQkFBQUEsS0FBSyxFQUFFLE1BQU0sTUFBSSxDQUFDcEUsRUFIRjtBQUloQnFFLHNCQUFBQSxLQUFLLEVBQUdyRSxFQUFELElBQVE7QUFBRSx3QkFBQSxNQUFJLENBQUNBLEVBQUwsR0FBVUEsRUFBVjtBQUFlO0FBSmhCLHFCQUFELENBSFg7QUFTTnhCLG9CQUFBQSxRQUFRLEVBQUVmLFdBQVcsQ0FBQztBQUFFZSxzQkFBQUEsUUFBUSxFQUFFLE1BQUksQ0FBQ0E7QUFBakIscUJBQUQ7QUFUZjtBQUZWLG1CQURjO0FBQUE7QUFGVjtBQUZWLGFBcUJPMkYsTUFyQlAsRUFERjtBQXlCRDs7QUE3WHFDLE9BQXhDO0FBK1hELEtBaFlEO0FBaVlELEdBbFlEO0FBbVlEOztBQUVELGVBQWU5RixVQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVEaW5vRm9ybVN0b3JlIGZyb20gJy4vRGlub0Zvcm1TdG9yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVGcm9tSXRlbSxcbiAgY3JlYXRlRGlub0Zvcm1TdWJGb3JtLFxuICBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCxcbiAgY3JlYXRlRnJhZ21lbnRzLFxuICBncm91cHNBUEksXG4gIHN1YkZvcm1zQVBJLFxuICBnZXRSZWYsXG59IGZyb20gJy4vRGlub0Zvcm1IZWxwZXInO1xuXG5pbXBvcnQge1xuICBzbGVlcCwgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYywgaXNQcm9kdWN0aW9uLFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgaXNOb3RFeGlzdCB9IGZyb20gJy4uL2VzJztcblxuY2xhc3MgV3JhcENvbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRpbm9Gb3JtOiB7IHJlbmRlckRpbm9Gb3JtIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHJlbmRlckRpbm9Gb3JtKHRoaXMucHJvcHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oe1xuICBmcmFnbWVudHMgPSB7fSxcbiAgZ3JvdXBzID0ge30sXG4gIHN1YkZvcm1zID0ge30sXG4gIGdldEdyb3VwUmVmID0gZ2V0UmVmLFxufSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGUoVmlldykge1xuICAgIHJldHVybiBmdW5jdGlvbiBiaW5kV3JhcChXcmFwID0gV3JhcENvbSkge1xuICAgICAgcmV0dXJuIGNsYXNzIERpbm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RydWN0b3JQcm9wcykge1xuICAgICAgICAgIHN1cGVyKGNvbnN0cnVjdG9yUHJvcHMpO1xuXG4gICAgICAgICAgdGhpcy5zdG9yZSA9IGNyZWF0ZURpbm9Gb3JtU3RvcmUoKTtcbiAgICAgICAgICAvLyB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHN1YkZvcm1zLCB0aGlzLnRvcEZvcm1SZW5kZXIpO1xuICAgICAgICAgIHRoaXMuc3ViRm9ybXMgPSBjcmVhdGVEaW5vRm9ybVN1YkZvcm0oeyBzdWJGb3JtcywgdG9wRm9ybVJlbmRlcjogdGhpcy50b3BGb3JtUmVuZGVyIH0pO1xuXG4gICAgICAgICAgdGhpcy5Gcm9tSXRlbSA9IGNyZWF0ZUZyb21JdGVtKHtcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5mcmFnbWVudHMgPSBjcmVhdGVGcmFnbWVudHMoe1xuICAgICAgICAgICAgZnJhZ21lbnRzLFxuICAgICAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGk6IHRoaXMuY3JlYXRlRGlub0Zvcm1BcGksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLklEID0gMDtcbiAgICAgICAgICB0aGlzLmdyb3VwcyA9IHRoaXMuY3JlYXRlR3JvdXBzKGdyb3Vwcyk7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcbiAgICAgICAgICAgIElEOiB0aGlzLklELFxuICAgICAgICAgICAgZnJhZ21lbnRzOiB0aGlzLmZyYWdtZW50cyxcbiAgICAgICAgICAgIHN1YkZvcm1zOiB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlR3JvdXBzID0gZ3JvdXBzT2JqID0+IG1hcE9iamVjdChncm91cHNPYmosIChmb3JtTmFtZSwge1xuICAgICAgICAgIENvbSxcbiAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICBjb3VudCxcbiAgICAgICAgICBmb3JtUHJvcHMgPSB7fSxcbiAgICAgICAgICBuZWVkRHJhZyA9IGZhbHNlLFxuICAgICAgICAgIGNsZWFyTW90aW9ucyxcbiAgICAgICAgICBwcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICBub3RQcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICBjcmVhdGVTdHlsZSxcbiAgICAgICAgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgSURSZWZNYXAgPSB7fTtcbiAgICAgICAgICBjb25zdCBJRExpc3QgPSBbLi4ubmV3IEFycmF5KGNvdW50KV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG4gICAgICAgICAgY29uc3QgRm9ybSA9IGNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwKHtcbiAgICAgICAgICAgIHNldElEUmVmTWFwOiAoSUQsIHZhbHVlKSA9PiB7IHRoaXMuZ3JvdXBzW2Zvcm1OYW1lXS5JRFJlZk1hcFtJRF0gPSB2YWx1ZTsgfSxcbiAgICAgICAgICAgIHRvcEZvcm1SZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwID0ge1xuICAgICAgICAgICAgQ29tLFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICBmb3JtUHJvcHMsXG4gICAgICAgICAgICBmb3JtTmFtZSxcbiAgICAgICAgICAgIG5lZWREcmFnLFxuICAgICAgICAgICAgSURSZWZNYXAsXG4gICAgICAgICAgICBJRExpc3QsXG4gICAgICAgICAgICBGb3JtLFxuICAgICAgICAgICAgY2xlYXJNb3Rpb25zLFxuICAgICAgICAgICAgcHJlc3NlZE1vdGlvbnMsXG4gICAgICAgICAgICBub3RQcmVzc2VkTW90aW9ucyxcbiAgICAgICAgICAgIGNyZWF0ZVN0eWxlLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgIFtmb3JtTmFtZV06IGdyb3VwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRvcEZvcm1SZW5kZXIgPSAoKSA9PiBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRvcEZvcm1SZW5kZXIoKS50aGVuKHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7fSwgcik7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY3JlYXRlRGlub0Zvcm1BcGkgPSAoKSA9PiAoe1xuICAgICAgICAgIEZyb21JdGVtOiB0aGlzLkZyb21JdGVtLFxuXG4gICAgICAgICAgc2V0RmllbGRzVmFsdWU6IHRoaXMuc2V0RmllbGRzVmFsdWUsXG4gICAgICAgICAgc2V0RnVsbFZhbHVlczogdGhpcy5zZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIHNldEZpZWxkc0Vycm9yOiB0aGlzLnNldEZpZWxkc0Vycm9yLFxuXG4gICAgICAgICAgZ2V0RnVsbFZhbHVlczogdGhpcy5nZXRGdWxsVmFsdWVzLFxuICAgICAgICAgIGdldEZpZWxkc1ZhbHVlOiB0aGlzLmdldEZpZWxkc1ZhbHVlLFxuXG4gICAgICAgICAgdmVyaWZ5OiB0aGlzLnZlcmlmeSxcbiAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgICBkaW5vRm9ybVJlZjogdGhpcyxcbiAgICAgICAgfSlcblxuICAgICAgICBzZXRGaWVsZHNFcnJvciA9IChvYmopID0+IHtcbiAgICAgICAgICBbLi4uT2JqZWN0LmVudHJpZXMob2JqKV0uZm9yRWFjaCgoW2ZpZWxkLCBlcnJvcl0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IGVycm9yIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RmllbGRzVmFsdWUgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgbmV3VmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyB2YWx1ZTogbmV3VmFsdWUgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnRvcEZvcm1SZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldEZpZWxkc1ZhbHVlID0gKC4uLmZpZWxkcykgPT4gZmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWUgPSB0aGlzLnN0b3JlLmdldChmaWVsZCkgfHwge307XG4gICAgICAgICAgcmV0dXJuIHNjaGVtZS52YWx1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICBnZXRGdWxsVmFsdWVzID0gKHsgb25seUdldE1vdW50ID0gdHJ1ZSwgZGVidWcgPSBmYWxzZSB9ID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZ2V0KCksXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICBzY2hlbWUsXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyBpc01vdW50LCB2YWx1ZSB9ID0gc2NoZW1lO1xuICAgICAgICAgICAgICByZXR1cm4gb25seUdldE1vdW50XG4gICAgICAgICAgICAgICAgPyBpc01vdW50ID8geyBbZmllbGRdOiB2YWx1ZSB9IDoge31cbiAgICAgICAgICAgICAgICA6IHsgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgSURSZWZNYXAgPSBbXSxcbiAgICAgICAgICAgICAgICBJRExpc3QsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBJRCBvZiBJRExpc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cCA9IElEUmVmTWFwW0lEXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc05vdEV4aXN0KGdyb3VwKSB8fCBpc05vdEV4aXN0KGdyb3VwLnJlZikpIHtcbiAgICAgICAgICAgICAgICAgIGlzUHJvZHVjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZ3JvdXAgZnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0sIElEPSR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGdyb3VwLnJlZi5nZXRGdWxsVmFsdWVzKHsgb25seUdldE1vdW50IH0pO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgaXNQcm9kdWN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtkaW5vLWZvcm1dIHN1YkZvcm0gcmVmIG5vdCByZWdpc3RlcmVkLCBmaWVsZCA9ICR7ZmllbGR9YCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIFtmaWVsZF06IHt9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHJlZi5nZXRGdWxsVmFsdWVzKHsgb25seUdldE1vdW50IH0pLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgLi4uZ3JvdXBGaWVsZCxcbiAgICAgICAgICAgIC4uLnN1YkZvcm1GaWVsZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RnVsbFZhbHVlcyA9IGFzeW5jICh2YWx1ZXMgPSB7fSwgbWFwcyA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmluZEdyb3VwcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICApLmZpbmQoZ3JvdXAgPT4gZ3JvdXAuZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IGZpbmRTdWJGb3JtcyA9IGZpZWxkID0+IE9iamVjdC52YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLnN1YkZvcm1zLFxuICAgICAgICAgICkuZmluZChzdWJGb3JtID0+IHN1YkZvcm0uZmllbGQgPT09IGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKHIgPT4gdGhpcy5zZXRTdGF0ZSh7fSwgcikpO1xuXG4gICAgICAgICAgYXdhaXQgbWFwT2JqZWN0KHZhbHVlcywgYXN5bmMgKGZpZWxkLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaW5kR3JvdXBzKGZpZWxkKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YkZvcm0gPSBmaW5kU3ViRm9ybXMoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoc3ViRm9ybSkge1xuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IHN1YkZvcm1NYXBPYmogfSA9IG1hcHM7XG4gICAgICAgICAgICAgIGNvbnN0IHsgcmVmIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgIGlmICghcmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbZGluby1mb3JtXSBmaWVsZCBpcyAnJHtmaWVsZH0nIHN1YkZvcm0gc2hvdWxkIGJlIG1vdW50ZWQgYnV0IHRoZSBSZWYgaXMgbm90IHJlZ2lzdGVyZWQsIG1heWJlIHlvdSBub3QgcmVuZGVyIHRoaXMgc3ViRm9ybS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZWYuc2V0RnVsbFZhbHVlcyh2YWx1ZSwgc3ViRm9ybU1hcE9iaik7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFncm91cCkgeyAvLyBmcmFnbWVudFxuICAgICAgICAgICAgICBjb25zdCB7IFtmaWVsZF06IG1hcEZ1biA9IF8gPT4gXyB9ID0gbWFwcztcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG1hcEZ1bih2YWx1ZSkgfSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBJRExpc3QgYW5kIGFkZFxuICAgICAgICAgICAgZ3JvdXAuSURMaXN0ID0gWy4uLm5ldyBBcnJheSh2YWx1ZS5sZW5ndGgpXS5tYXAoKCkgPT4gdGhpcy5JRCsrKTtcblxuICAgICAgICAgICAgLy8gcmVuZGVyXG4gICAgICAgICAgICAvLyBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIGF3YWl0IHJlbmRlcigpO1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG5cbiAgICAgICAgICAgIC8vIGdyb3VwIHNob3VsZCBtb3VudGVkXG4gICAgICAgICAgICBjb25zdCB7IElEUmVmTWFwLCBJRExpc3QsIGZvcm1OYW1lIH0gPSBncm91cDtcblxuICAgICAgICAgICAgYXdhaXQgbWFwT2JqZWN0QXN5bmMoSURMaXN0LCBhc3luYyAoaW5kZXgsIElEKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlZiA9IGF3YWl0IGdldEdyb3VwUmVmKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICBbSURdOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogZ3JvdXBGb3JtUmVmLFxuICAgICAgICAgICAgICAgICAgfSA9IHt9LFxuICAgICAgICAgICAgICAgIH0gPSBJRFJlZk1hcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXBGb3JtUmVmO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZm9ybSAnJHtmb3JtTmFtZX0nIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIGdyb3VwLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbVZhbHVlID0gdmFsdWVbaW5kZXhdIHx8IFtdO1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogZnVuID0gKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG1hcE9iajoge30sXG4gICAgICAgICAgICAgICAgICBwcm9wczoge30sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIH0gPSBtYXBzO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHsgbWFwT2JqID0ge30sIHByb3BzID0ge30gfSA9IGZ1bihncm91cEl0ZW1WYWx1ZSk7XG5cbiAgICAgICAgICAgICAgSURSZWZNYXBbSURdLnByb3BzID0gcHJvcHM7XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXMoZ3JvdXBJdGVtVmFsdWUsIG1hcE9iaik7XG4gICAgICAgICAgICB9LCBJRExpc3QpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFJRFJlZk1hcFtJRF0ucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZ3JvdXAgZnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0sIElEPSR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZWYpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gc3ViRnJvbSByZWYgbm90IHJlZ2lzdGVyZWQsIGZpZWxkID0gJHtmaWVsZH0uYCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB7fSB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19