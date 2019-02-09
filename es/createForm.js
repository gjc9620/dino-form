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
import { createFromItem, createDinoFormSubForm, createDinoFormGroupWrap, createFragments, groupsAPI, subFormsAPI, dinoFormGetGroupRef } from './DinoFormHelper';
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
      getGroupRef = _ref$getGroupRef === void 0 ? dinoFormGetGroupRef : _ref$getGroupRef;

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
                needDrag = _ref2$needDrag === void 0 ? false : _ref2$needDrag;

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
              Form
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

            await mapObjectAsync(values, async (field, value) => {
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
                const ref = await getGroupRef({
                  group,
                  index,
                  ID,
                  render: _this.render()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNyZWF0ZURpbm9Gb3JtU3RvcmUiLCJjcmVhdGVGcm9tSXRlbSIsImNyZWF0ZURpbm9Gb3JtU3ViRm9ybSIsImNyZWF0ZURpbm9Gb3JtR3JvdXBXcmFwIiwiY3JlYXRlRnJhZ21lbnRzIiwiZ3JvdXBzQVBJIiwic3ViRm9ybXNBUEkiLCJkaW5vRm9ybUdldEdyb3VwUmVmIiwibWFwT2JqZWN0IiwibWFwT2JqZWN0QXN5bmMiLCJzbGVlcCIsIldyYXBDb20iLCJyZW5kZXIiLCJyZW5kZXJEaW5vRm9ybSIsInByb3BzIiwiZGlub0Zvcm0iLCJjcmVhdGVGb3JtIiwiZnJhZ21lbnRzIiwiZ3JvdXBzIiwic3ViRm9ybXMiLCJnZXRHcm91cFJlZiIsImNyZWF0ZSIsIlZpZXciLCJiaW5kV3JhcCIsIldyYXAiLCJEaW5vRm9ybSIsImNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3JQcm9wcyIsImdyb3Vwc09iaiIsImZvcm1OYW1lIiwiQ29tIiwiZmllbGQiLCJjb3VudCIsImZvcm1Qcm9wcyIsIm5lZWREcmFnIiwiSURSZWZNYXAiLCJJRExpc3QiLCJBcnJheSIsIm1hcCIsIklEIiwiRm9ybSIsInNldElEUmVmTWFwIiwidmFsdWUiLCJ0b3BGb3JtUmVuZGVyIiwiZ3JvdXAiLCJyIiwidGhlbiIsInNldFN0YXRlIiwiRnJvbUl0ZW0iLCJzZXRGaWVsZHNWYWx1ZSIsInNldEZ1bGxWYWx1ZXMiLCJzZXRGaWVsZHNFcnJvciIsImdldEZ1bGxWYWx1ZXMiLCJnZXRGaWVsZHNWYWx1ZSIsInZlcmlmeSIsInN0b3JlIiwiZGlub0Zvcm1SZWYiLCJvYmoiLCJmb3JFYWNoIiwiZXJyb3IiLCJ1cGRhdGUiLCJuZXdWYWx1ZSIsImZpZWxkcyIsInNjaGVtZSIsImdldCIsIm9ubHlHZXRNb3VudCIsImZyYWdtZW50c0ZpZWxkIiwiaXNNb3VudCIsImdyb3VwRmllbGQiLCJncm91cE5hbWUiLCJ2YWx1ZXMiLCJyZXN1bHQiLCJyZWYiLCJwdXNoIiwic3ViRm9ybUZpZWxkIiwic3ViRm9ybSIsIm1hcHMiLCJmaW5kR3JvdXBzIiwiZmluZCIsImZpbmRTdWJGb3JtcyIsInN1YkZvcm1NYXBPYmoiLCJjb25zb2xlIiwid2FybiIsIm1hcEZ1biIsIl8iLCJsZW5ndGgiLCJpbmRleCIsImdyb3VwSXRlbVZhbHVlIiwiZnVuIiwibWFwT2JqIiwiZmlyc3QiLCJzY3JvbGwiLCJyZXNvbHZlIiwiaGFzRXJyb3IiLCJydWxlcyIsImxhYmVsIiwicnVsZSIsImlzUGFzcyIsImRhdGEiLCJzdWJGb3JtSGFzRXJyb3IiLCJjcmVhdGVEaW5vRm9ybUFwaSIsImNyZWF0ZUdyb3VwcyIsInN0YXRlIiwiY2F0Y2hSZWYiLCJvdGhlcnMiLCJnZXRJRCIsInNldElEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLG1CQUFQLE1BQWdDLGlCQUFoQztBQUNBLFNBQ0VDLGNBREYsRUFFRUMscUJBRkYsRUFHRUMsdUJBSEYsRUFJRUMsZUFKRixFQUtFQyxTQUxGLEVBTUVDLFdBTkYsRUFPRUMsbUJBUEYsUUFRTyxrQkFSUDtBQVVBLFNBQVNDLFNBQVQsRUFBb0JDLGNBQXBCLFFBQTBDLFFBQTFDO0FBQ0EsU0FBU0MsS0FBVCxRQUFzQixRQUF0Qjs7QUFFQSxNQUFNQyxPQUFOLFNBQXNCWixTQUF0QixDQUFnQztBQUM5QmEsRUFBQUEsTUFBTSxHQUFHO0FBQUEsVUFDYUMsY0FEYixHQUNrQyxLQUFLQyxLQUR2QyxDQUNDQyxRQURELENBQ2FGLGNBRGI7QUFFUCxXQUFPQSxjQUFjLENBQUMsS0FBS0MsS0FBTixDQUFyQjtBQUNEOztBQUo2Qjs7QUFPaEMsU0FBU0UsVUFBVCxHQUtRO0FBQUEsaUZBQUosRUFBSTtBQUFBLDRCQUpOQyxTQUlNO0FBQUEsTUFKTkEsU0FJTSwrQkFKTSxFQUlOO0FBQUEseUJBSE5DLE1BR007QUFBQSxN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TkMsb0JBQUFBLE1BQU0sRUFBRWIsU0FBUyxDQUFDO0FBQ2hCYSxzQkFBQUEsTUFBTSxFQUFFLE1BQUksQ0FBQ0EsTUFERztBQUVoQk4sc0JBQUFBLE1BQU0sRUFBRSxNQUFJLENBQUMrQixhQUZHO0FBR2hCOEQsc0JBQUFBLEtBQUssRUFBRSxNQUFNLE1BQUksQ0FBQ2xFLEVBSEY7QUFJaEJtRSxzQkFBQUEsS0FBSyxFQUFHbkUsRUFBRCxJQUFRO0FBQUUsd0JBQUEsTUFBSSxDQUFDQSxFQUFMLEdBQVVBLEVBQVY7QUFBZTtBQUpoQixxQkFBRCxDQUhYO0FBU05wQixvQkFBQUEsUUFBUSxFQUFFYixXQUFXLENBQUM7QUFBRWEsc0JBQUFBLFFBQVEsRUFBRSxNQUFJLENBQUNBO0FBQWpCLHFCQUFEO0FBVGY7QUFGVixtQkFEYztBQUFBO0FBRlY7QUFGVixhQXFCT3FGLE1BckJQLEVBREY7QUF5QkQ7O0FBMVVxQyxPQUF4QztBQTRVRCxLQTdVRDtBQThVRCxHQS9VRDtBQWdWRDs7QUFFRCxlQUFleEYsVUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlRGlub0Zvcm1TdG9yZSBmcm9tICcuL0Rpbm9Gb3JtU3RvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRnJvbUl0ZW0sXG4gIGNyZWF0ZURpbm9Gb3JtU3ViRm9ybSxcbiAgY3JlYXRlRGlub0Zvcm1Hcm91cFdyYXAsXG4gIGNyZWF0ZUZyYWdtZW50cyxcbiAgZ3JvdXBzQVBJLFxuICBzdWJGb3Jtc0FQSSxcbiAgZGlub0Zvcm1HZXRHcm91cFJlZixcbn0gZnJvbSAnLi9EaW5vRm9ybUhlbHBlcic7XG5cbmltcG9ydCB7IG1hcE9iamVjdCwgbWFwT2JqZWN0QXN5bmMgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuL3V0aWwnO1xuXG5jbGFzcyBXcmFwQ29tIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZGlub0Zvcm06IHsgcmVuZGVyRGlub0Zvcm0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gcmVuZGVyRGlub0Zvcm0odGhpcy5wcm9wcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9ybSh7XG4gIGZyYWdtZW50cyA9IHt9LFxuICBncm91cHMgPSB7fSxcbiAgc3ViRm9ybXMgPSB7fSxcbiAgZ2V0R3JvdXBSZWYgPSBkaW5vRm9ybUdldEdyb3VwUmVmLFxufSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGUoVmlldykge1xuICAgIHJldHVybiBmdW5jdGlvbiBiaW5kV3JhcChXcmFwID0gV3JhcENvbSkge1xuICAgICAgcmV0dXJuIGNsYXNzIERpbm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RydWN0b3JQcm9wcykge1xuICAgICAgICAgIHN1cGVyKGNvbnN0cnVjdG9yUHJvcHMpO1xuXG4gICAgICAgICAgdGhpcy5zdG9yZSA9IGNyZWF0ZURpbm9Gb3JtU3RvcmUoKTtcbiAgICAgICAgICB0aGlzLnN1YkZvcm1zID0gY3JlYXRlRGlub0Zvcm1TdWJGb3JtKHN1YkZvcm1zKTtcblxuICAgICAgICAgIHRoaXMuRnJvbUl0ZW0gPSBjcmVhdGVGcm9tSXRlbSh7XG4gICAgICAgICAgICBjcmVhdGVEaW5vRm9ybUFwaTogdGhpcy5jcmVhdGVEaW5vRm9ybUFwaSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gY3JlYXRlRnJhZ21lbnRzKHtcbiAgICAgICAgICAgIGZyYWdtZW50cyxcbiAgICAgICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpOiB0aGlzLmNyZWF0ZURpbm9Gb3JtQXBpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5JRCA9IDA7XG4gICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmNyZWF0ZUdyb3Vwcyhncm91cHMpO1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICAgICAgRnJvbUl0ZW06IHRoaXMuRnJvbUl0ZW0sXG4gICAgICAgICAgICBJRDogdGhpcy5JRCxcbiAgICAgICAgICAgIGZyYWdtZW50czogdGhpcy5mcmFnbWVudHMsXG4gICAgICAgICAgICBzdWJGb3JtczogdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUdyb3VwcyA9IGdyb3Vwc09iaiA9PiBtYXBPYmplY3QoZ3JvdXBzT2JqLCAoZm9ybU5hbWUsIHtcbiAgICAgICAgICBDb20sIGZpZWxkLCBjb3VudCwgZm9ybVByb3BzID0ge30sIG5lZWREcmFnID0gZmFsc2UsXG4gICAgICAgIH0gPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IElEUmVmTWFwID0ge307XG4gICAgICAgICAgY29uc3QgSURMaXN0ID0gWy4uLm5ldyBBcnJheShjb3VudCldLm1hcCgoKSA9PiB0aGlzLklEKyspO1xuICAgICAgICAgIGNvbnN0IEZvcm0gPSBjcmVhdGVEaW5vRm9ybUdyb3VwV3JhcCh7XG4gICAgICAgICAgICBzZXRJRFJlZk1hcDogKElELCB2YWx1ZSkgPT4geyB0aGlzLmdyb3Vwc1tmb3JtTmFtZV0uSURSZWZNYXBbSURdID0gdmFsdWU7IH0sXG4gICAgICAgICAgICB0b3BGb3JtUmVuZGVyOiB0aGlzLnRvcEZvcm1SZW5kZXIsXG4gICAgICAgICAgICBDb20sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBncm91cCA9IHtcbiAgICAgICAgICAgIENvbSxcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgZm9ybVByb3BzLFxuICAgICAgICAgICAgZm9ybU5hbWUsXG4gICAgICAgICAgICBuZWVkRHJhZyxcbiAgICAgICAgICAgIElEUmVmTWFwLFxuICAgICAgICAgICAgSURMaXN0LFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBbZm9ybU5hbWVdOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0b3BGb3JtUmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b3BGb3JtUmVuZGVyKCkudGhlbihyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNyZWF0ZURpbm9Gb3JtQXBpID0gKCkgPT4gKHtcbiAgICAgICAgICBGcm9tSXRlbTogdGhpcy5Gcm9tSXRlbSxcblxuICAgICAgICAgIHNldEZpZWxkc1ZhbHVlOiB0aGlzLnNldEZpZWxkc1ZhbHVlLFxuICAgICAgICAgIHNldEZ1bGxWYWx1ZXM6IHRoaXMuc2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBzZXRGaWVsZHNFcnJvcjogdGhpcy5zZXRGaWVsZHNFcnJvcixcblxuICAgICAgICAgIGdldEZ1bGxWYWx1ZXM6IHRoaXMuZ2V0RnVsbFZhbHVlcyxcbiAgICAgICAgICBnZXRGaWVsZHNWYWx1ZTogdGhpcy5nZXRGaWVsZHNWYWx1ZSxcblxuICAgICAgICAgIHZlcmlmeTogdGhpcy52ZXJpZnksXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgZGlub0Zvcm1SZWY6IHRoaXMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzRXJyb3IgPSAob2JqKSA9PiB7XG4gICAgICAgICAgWy4uLk9iamVjdC5lbnRyaWVzKG9iaildLmZvckVhY2goKFtmaWVsZCwgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShmaWVsZCwgeyBlcnJvciB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZpZWxkc1ZhbHVlID0gKG9iaikgPT4ge1xuICAgICAgICAgIFsuLi5PYmplY3QuZW50cmllcyhvYmopXS5mb3JFYWNoKChbZmllbGQsIG5ld1ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoZmllbGQsIHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy50b3BGb3JtUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRGaWVsZHNWYWx1ZSA9ICguLi5maWVsZHMpID0+IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gdGhpcy5zdG9yZS5nZXQoZmllbGQpIHx8IHt9O1xuICAgICAgICAgIHJldHVybiBzY2hlbWUudmFsdWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgZ2V0RnVsbFZhbHVlcyA9ICh7IG9ubHlHZXRNb3VudCA9IHRydWUgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnRzRmllbGQgPSBtYXBPYmplY3QoXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgc2NoZW1lLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaXNNb3VudCwgdmFsdWUgfSA9IHNjaGVtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ubHlHZXRNb3VudFxuICAgICAgICAgICAgICAgID8gaXNNb3VudCA/IHsgW2ZpZWxkXTogdmFsdWUgfSA6IHt9XG4gICAgICAgICAgICAgICAgOiB7IFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBncm91cEZpZWxkID0gbWFwT2JqZWN0KFxuICAgICAgICAgICAgdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IElEUmVmTWFwW0lEXS5yZWYuZ2V0RnVsbFZhbHVlcygpO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHN1YkZvcm1GaWVsZCA9IG1hcE9iamVjdChcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgICAoZm9ybU5hbWUsIHN1YkZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtmaWVsZF06IHJlZi5nZXRGdWxsVmFsdWVzKCksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZnJhZ21lbnRzRmllbGQsXG4gICAgICAgICAgICAuLi5ncm91cEZpZWxkLFxuICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGdWxsVmFsdWVzID0gYXN5bmMgKHZhbHVlcyA9IHt9LCBtYXBzID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBmaW5kR3JvdXBzID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzLFxuICAgICAgICAgICkuZmluZChncm91cCA9PiBncm91cC5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgZmluZFN1YkZvcm1zID0gZmllbGQgPT4gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuc3ViRm9ybXMsXG4gICAgICAgICAgKS5maW5kKHN1YkZvcm0gPT4gc3ViRm9ybS5maWVsZCA9PT0gZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UociA9PiB0aGlzLnNldFN0YXRlKHt9LCByKSk7XG5cbiAgICAgICAgICBhd2FpdCBtYXBPYmplY3RBc3luYyh2YWx1ZXMsIGFzeW5jIChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmluZEdyb3VwcyhmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtID0gZmluZFN1YkZvcm1zKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHN1YkZvcm0pIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBzdWJGb3JtTWFwT2JqIH0gPSBtYXBzO1xuICAgICAgICAgICAgICBjb25zdCB7IHJlZiB9ID0gc3ViRm9ybTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZmllbGQgaXMgJyR7ZmllbGR9JyBzdWJGb3JtIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIHN1YkZvcm0uYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXModmFsdWUsIHN1YkZvcm1NYXBPYmopO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ3JvdXApIHsgLy8gZnJhZ21lbnRcbiAgICAgICAgICAgICAgY29uc3QgeyBbZmllbGRdOiBtYXBGdW4gPSBfID0+IF8gfSA9IG1hcHM7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGZpZWxkLCB7IHZhbHVlOiBtYXBGdW4odmFsdWUpIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBkZWxldGUgSURMaXN0IGFuZCBhZGRcbiAgICAgICAgICAgIGdyb3VwLklETGlzdCA9IFsuLi5uZXcgQXJyYXkodmFsdWUubGVuZ3RoKV0ubWFwKCgpID0+IHRoaXMuSUQrKyk7XG5cbiAgICAgICAgICAgIC8vIHJlbmRlclxuICAgICAgICAgICAgLy8gYXdhaXQgcmVuZGVyKCk7XG4gICAgICAgICAgICBhd2FpdCByZW5kZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMudG9wRm9ybVJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyBncm91cCBzaG91bGQgbW91bnRlZFxuICAgICAgICAgICAgY29uc3QgeyBJRFJlZk1hcCwgSURMaXN0LCBmb3JtTmFtZSB9ID0gZ3JvdXA7XG5cbiAgICAgICAgICAgIGF3YWl0IG1hcE9iamVjdEFzeW5jKElETGlzdCwgYXN5bmMgKGluZGV4LCBJRCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZWYgPSBhd2FpdCBnZXRHcm91cFJlZih7XG4gICAgICAgICAgICAgICAgZ3JvdXAsIGluZGV4LCBJRCwgcmVuZGVyOiB0aGlzLnJlbmRlcigpLFxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoIXJlZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW2Rpbm8tZm9ybV0gZm9ybSAnJHtmb3JtTmFtZX0nIHNob3VsZCBiZSBtb3VudGVkIGJ1dCB0aGUgUmVmIGlzIG5vdCByZWdpc3RlcmVkLCBtYXliZSB5b3Ugbm90IHJlbmRlciB0aGlzIGdyb3VwLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbVZhbHVlID0gdmFsdWVbaW5kZXhdIHx8IFtdO1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW2ZpZWxkXTogZnVuID0gKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG1hcE9iajoge30sXG4gICAgICAgICAgICAgICAgICBwcm9wczoge30sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIH0gPSBtYXBzO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHsgbWFwT2JqID0ge30sIHByb3BzID0ge30gfSA9IGZ1bihncm91cEl0ZW1WYWx1ZSk7XG5cbiAgICAgICAgICAgICAgSURSZWZNYXBbSURdLnByb3BzID0gcHJvcHM7XG5cbiAgICAgICAgICAgICAgcmVmLnNldEZ1bGxWYWx1ZXMoZ3JvdXBJdGVtVmFsdWUsIG1hcE9iaik7XG4gICAgICAgICAgICB9LCBJRExpc3QpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnkgPSAoe1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2UsIC8vIHRvZG9cbiAgICAgICAgICBzY3JvbGwgPSB0cnVlLCAvLyB0b2RvXG4gICAgICAgIH0gPSB7fSkgPT4gKFxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudHNGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLmdldCgpLFxuICAgICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgc2NoZW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcnVsZXMgPSBbXSwgaXNNb3VudCwgdmFsdWUsIGxhYmVsLFxuICAgICAgICAgICAgICAgIH0gPSBzY2hlbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdW50KSB7IHJldHVybiB7fTsgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3MgPSBhd2FpdCBydWxlLmZ1bih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzUGFzcykge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcnVsZS5lcnJvcih7IGxhYmVsLCBmaWVsZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHNFcnJvcih7IFtmaWVsZF06IGVycm9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBGaWVsZCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKFxuICAgICAgICAgICAgICB0aGlzLmdyb3VwcyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgIElEUmVmTWFwID0gW10sIElETGlzdCxcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IElEIG9mIElETGlzdCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSURSZWZNYXBbSURdLnJlZi52ZXJpZnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJGb3JtRmllbGQgPSBhd2FpdCBtYXBPYmplY3RBc3luYyhcbiAgICAgICAgICAgICAgdGhpcy5zdWJGb3JtcyxcbiAgICAgICAgICAgICAgYXN5bmMgKGZvcm1OYW1lLCBzdWJGb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyByZWYsIGZpZWxkIH0gPSBzdWJGb3JtO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgaGFzRXJyb3I6IHN1YkZvcm1IYXNFcnJvciB9ID0gYXdhaXQgcmVmLnZlcmlmeSgpO1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gc3ViRm9ybUhhc0Vycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbZmllbGRdOiBkYXRhLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoYXNFcnJvcixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLmZyYWdtZW50c0ZpZWxkLFxuICAgICAgICAgICAgICAgIC4uLmdyb3VwRmllbGQsXG4gICAgICAgICAgICAgICAgLi4uc3ViRm9ybUZpZWxkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgIClcblxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgY29uc3QgeyBjYXRjaFJlZiA9ICgpID0+IHt9LCAuLi5vdGhlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxXcmFwXG4gICAgICAgICAgICAgIHJlZj17IGNhdGNoUmVmIH1cbiAgICAgICAgICAgICAgZGlub0Zvcm09eyB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jcmVhdGVEaW5vRm9ybUFwaSgpLFxuICAgICAgICAgICAgICAgIHJlbmRlckRpbm9Gb3JtOiAocHJvcHMgPSB7fSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFZpZXdcbiAgICAgICAgICAgICAgICAgICAgeyAuLi5wcm9wcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpbm9Gb3JtPXsge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlRGlub0Zvcm1BcGkoKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IHRoaXMuZnJhZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzQVBJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHRoaXMudG9wRm9ybVJlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldElEOiAoKSA9PiB0aGlzLklELFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SUQ6IChJRCkgPT4geyB0aGlzLklEID0gSUQ7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgc3ViRm9ybXM6IHN1YkZvcm1zQVBJKHsgc3ViRm9ybXM6IHRoaXMuc3ViRm9ybXMgfSksXG4gICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICB7IC4uLm90aGVycyB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGb3JtO1xuIl19