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
    Sex2: {
      Com: DinoInputNumber,
      label: 'Sex2',
      field: 'gender2',
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


export class Resume extends Component {
  render() {
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
    return;
    debugger;
    setFieldsValues({
      name: '321',
      gender: 21321,
      workHistory: [{
        companyName: '123123',
        time: '12312',
        projects: [{
          projectsNameField: '12321',
          time: 1231,
          time1: '232132',
          time2: '2019-01-22T09:15:35.000Z',
          time3: '12321',
        }, {
          projectsNameField: '123',
          time: 1232132,
          time1: '21321231',
          time2: '2019-01-22T09:15:35.000Z',
          time3: '21321213',
        }],
      }, {
        companyName: '21321',
        time: '21321321',
        projects: [{
          projectsNameField: '21321',
          time: 12321,
          time1: '12321',
          time2: '2019-01-22T09:15:34.000Z',
          time3: '21321321',
        }, {
          projectsNameField: '124214321',
          time: 21321,
          time1: '12321',
          time2: '2019-01-22T09:15:34.000Z',
          time3: '21321321',
        }],
      }],
    }, {
      gender: value => (`${value}666`),
      workHistory: (workHistory) => {
        const { companyName } = workHistory;
        return {
          data: {
            ...workHistory,
            companyName: `${companyName}77777`,
            projects: project => ({
              ...project,
            }),
          },
          props: {},
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
