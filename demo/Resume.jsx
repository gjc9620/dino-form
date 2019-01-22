import React, { Component } from 'react';
import createForm from './createForm.jsx';
import WorkHistoryForm from './WorkHistoryForm.jsx';
import {
  DinoInput,
  DinoInputNumber,
  DinoInputItem,
  DinoTimePicker,
} from './DinoComponents.jsx';

const config = {
  fragments: {
    Name: {
      Com: DinoInput,
      required: true,
      label: 'name',
      field: 'name',
    },
    Sex: {
      Com: DinoInputNumber,
      label: 'Sex',
      field: 'gender',
    },
  },
  groups: {
    WorkHistory: {
      Com: WorkHistoryForm,
      field: 'workHistory',
      count: 2,
      formProps: { aa: 1 },
    },
  },
};

class Resume extends Component {
  render() { // //todo rename
    const {
      dinoForm,
      dinoForm: {
        setFields,
        getFields,
        verify,
        fragments: {
          Name,
          Sex,
        },
        groups: {
          WorkHistory: {
            render,
            map,
          },
        },
      },
    } = this.props;

    return (
      <div>
        <div>
          <Name />
          <Sex />
        </div>
        <div>
          {
            render(
              children => <div style={ { marginLeft: 20 } }>{children}</div>,
              map(({
                Form: { FormCom, formProps }, ID, index, deleteIt, move, moveTo,
              }) => (
                <div key={ ID }>
                  <div>{ID}</div>
                  <FormCom { ...formProps } />
                  <button onClick={ deleteIt }>删除</button>
                  <button onClick={ () => move(-1) }>上</button>
                  <button onClick={ () => move(-2) }>下</button>
                  <hr />
                </div>
              )),
            )
          }
        </div>
      </div>
    );
  }
}

class BigForm extends Component {
  componentDidMount() {
    const { dinoForm: { setFieldsValues } } = this.props;
    return
    debugger;
    setFieldsValues({
      companyName: '123213',
      time: '2123414',
      projects: [{
        projectsNameField: '234123',
        time: 234123,
        time1: '23412',
        time2: '2019-01-22T03:43:36.000Z',
        time3: '12321',
      }, {
        projectsNameField: '23432121',
        time: 123,
        time1: '1312',
        time2: '2019-01-22T03:45:36.000Z',
        time3: '12321312',
      }],
    }, {
      companyName: companyName => (`${companyName}666`),
      projects: (project) => {
        const { time } = project;
        return {
          ...project,
          time: new Date(time),
        };
      },
    });
  }

  render() {
    const { dinoForm: { verify }, children } = this.props;
    return (
      <div>
        { children }
        <div onClick={ async () => {
          const { hasError, data } = await verify();
          console.log(hasError, data);
          console.log(hasError, JSON.stringify(data));
        } }>提交
        </div>
      </div>
    );
  }
}

const ResumeForm = createForm(config)(Resume)(BigForm);

export default ResumeForm;
