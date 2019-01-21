import React, { Component, PropTypes } from 'react';
import { mapObject, getValueFromEvent } from '../../util';
import { isEventObj } from '../../util';

// 注册规则
// 卸载标记
class DinoFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // message: undefined,
    };
  }

  componentDidMount() {
    this.syncToStore({ isMount: true });
  }

  componentWillUnmount() {
    this.syncToStore({ isMount: false });
  }

  syncToStore = ({
    isMount = true,
  } = {}) => {
    const {
      dinoForm: {
        store,
        getFieldsValues,
      },
      field,
      rules,
      label,
      initValue,
    } = this.props;

    const [value] = getFieldsValues(field);

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
        setFieldsValues,
      },
      field,
    } = this.props;

    const value = isEventObj(arg) ? getValueFromEvent(arg) : arg;

    setFieldsValues({
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
        getFieldsValues,
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
        trigger[eventName] = (firstArg, ...arg) => {
          const value = isEventObj(firstArg) ? getValueFromEvent(firstArg) : firstArg;
          if (fun(value, ...arg)) {
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

  render() {
    const {
      dinoForm: {
        setFields,
        getFields,
        getFieldsValues,
        verify,
        store,
      },
      label,
      field,
      Com,
      comProps = {},
      rules = [],
    } = this.props;

    this.syncToStore({ isMount: true });

    const { error } = store.get(field);
    const [value] = getFieldsValues(field);

    return (
      <section className="dino-form-item">
        <div onClick={ this.clickLabel }>{ label }</div>
        <div>
          <div className={ `${error ? 'has-error' : ''}` }>
            <Com
              { ...comProps }
              value={ value }
              error={ error }
              {
                ...this.setRule()
              }
              ref={ ref => this.com = ref }
              />
          </div>
          { error && <div>{error}</div> }
        </div>
      </section>
    );
  }
}

DinoFormItem.defaultProps = {

};

export default DinoFormItem;
