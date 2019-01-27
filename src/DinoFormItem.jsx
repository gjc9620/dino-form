import React, { Component, PropTypes } from 'react';
import { mapObject, getValueFromEvent, isEventObj, prefix } from './util';

class DinoFormItem extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // message: undefined,
  //   };
  // }

  componentDidMount() {
    this.syncToStore({ isMount: true });
  }

  componentWillUnmount() {
    const {
      dinoForm: {
        store,
        // getFieldsValue,
      },
      field,
      resetWhenUnmount = true,
    } = this.props;

    if (resetWhenUnmount) {
      store.update(field, {
        value: undefined,
        error: undefined,
      });
    }
    this.syncToStore({ isMount: false });
  }

  syncToStore = ({
    isMount = true,
  } = {}) => {
    const {
      dinoForm: {
        store,
        getFieldsValue,
      },
      field,
      rules,
      label,
      initValue,
    } = this.props;

    const [value] = getFieldsValue(field);

    store.update(field, {
      value,
      rules,
      label,
      initValue,
      formItem: this,
      comRef: this.com,
      isMount,
    });
  }

  onChange = (arg, ...others) => {
    const {
      dinoForm: {
        store,
        setFields,
        setFieldsValue,
      },
      field,
    } = this.props;

    const value = isEventObj(arg) ? getValueFromEvent(arg) : arg;

    setFieldsValue({
      [field]: value,
    });
  }

  clickLabel = () => {
    this.com && this.com.wakeUp && this.com.wakeUp();
  }

  setRule = () => {
    const {
      dinoForm: {
        store,
        getFieldsValue,
        setFieldsError,
      },
      label,
      field,
      fieldName,
      comProps = {},
      rules = [],
    } = this.props;

    const events = rules.reduceRight((trigger, rule) => {
      const { validateTrigger = [], fun, error } = rule;
      validateTrigger.forEach((eventName) => {
        const preTrigger = trigger[eventName] || (() => {});
        trigger[eventName] = async (firstArg, ...arg) => {
          const value = isEventObj(firstArg) ? getValueFromEvent(firstArg) : firstArg;
          if (await fun(value, ...arg)) {
            setFieldsError({ [field]: undefined });
            preTrigger(value, ...arg);
            return;
          }
          setFieldsError({ [field]: error({ label, field }) });
        };
      });
      return trigger;
    }, {});

    const mergeEventFormComProps = {
      ...events,
      ...mapObject(comProps, (propsKey, propsValue) => {
        const event = events[propsKey];
        if (event) {
          return {
            [propsKey](value, ...args) {
              propsValue();
              return event(value, ...args);
            },
          };
        }
        return {};
      }),
    };

    return {
      ...mergeEventFormComProps,
      onChange: (value, ...args) => {
        this.onChange(value, ...args);
        mergeEventFormComProps.onChange && mergeEventFormComProps.onChange(value, ...args);
      },
    };
  }

  defaultRender = ({
    label,
    error,
    renderCom,
  } = {}) => (
    <section className={ `${prefix('item')} ${error ? 'has-error' : ''}` }>
      <div
        onClick={ this.clickLabel }
        className={ `${prefix('item-label')}` }>
        { label }
      </div>
      <div className={ `${prefix('item-com-error')}` }>
        <div className={ `${prefix('item-com')}` }>
          { renderCom() }
        </div>
        { error && <div className={ `${prefix('item-error')}` }>{error}</div> }
      </div>
    </section>
  )

  render() {
    const {
      dinoForm: {
        setFields,
        getFields,
        getFieldsValue,
        verify,
        store,
      },
      label,
      field,
      Com,
      comProps = {},
      rules = [],
      renderDinoForm = this.defaultRender,
    } = this.props;

    this.syncToStore({ isMount: true });

    const { error } = store.get(field);
    const [value] = getFieldsValue(field);

    return renderDinoForm({
      label,
      error,
      renderCom: () => (
        <Com
          { ...comProps }
          value={ value }
          error={ error }
          {
            ...this.setRule()
          }
          ref={ (ref) => { this.com = ref; } }
          />
      ),
    });
  }
}

DinoFormItem.defaultProps = {

};

export default DinoFormItem;