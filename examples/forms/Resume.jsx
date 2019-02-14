import React, { Component } from 'react';
import moment from 'moment';
import createForm from '../../src';
import WorkHistoryForm from './WorkHistoryForm.jsx';

import {
  DinoInput,
  DinoInputNumber,
  DinoInputItem,
  DinoTimePicker,
} from '../DinoComponents.jsx';


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
      required: true,
      label: 'Sex',
      field: 'gender',
    },
    Sex2: {
      Com: DinoInputNumber,
      label: 'Sex2',
      field: 'gender2',
    },
  },
  subForms: {
    JustForm: {
      Form: WorkHistoryForm,
      field: 'workHistorySubForm',
      formProps: { withPig: true },
    },
    JustForm2: {
      Form: WorkHistoryForm,
      field: 'workHistorySubForm1231',
      formProps: { withPig: true },
    },
  },
  groups: {
    workHistory: {
      Com: WorkHistoryForm,
      field: 'workHistory',
      count: 0,
      formProps: { aa: 1 },
      needDrag: true,
    },
  },
};


export class Resume extends Component {
  render() {
    const {
      dinoForm,
      dinoForm: {
        setFields,
        getFieldsValue,
        verify,
        fragments: {
          Name,
          Sex,
        },
        subForms: {
          JustForm,
        },
        groups: {
          workHistory: {
            render,
            map,
            addItem,
            doAction,
          },
        },
      },
    } = this.props;

    const [name] = getFieldsValue(Name.field);

    return (
      <div>
        <div>JustForm</div>
        <JustForm />
        <div>JustForm</div>
        <div>
          <Name />
          { name === 'asd' && <Sex /> }
        </div>
        <div>
          { render() }
          {/*
          {
            render(
              children => <div style={ { marginLeft: 20 } }>{children}</div>,
              map(({
                Form: {
                  FormCom,
                  formProps,
                },
                ID,
                IDList,
                index,
                deleteIt,
                moveIt,
              }) => (
                <div>
                  <div>{ID}</div>
                  <FormCom { ...formProps } />
                  <button onClick={ deleteIt }>删除</button>
                  {
                    index !== 0
                    && <button onClick={ () => moveIt(-1) }>上</button>
                  }
                  {
                    index !== IDList.length - 1
                    && <button onClick={ () => moveIt(1) }>下</button>
                  }
                  <hr />
                </div>
              )),
            )
          }
*/}
          {/* <button onClick={ () => addItem() }>+</button> */}

        </div>
      </div>
    );
  }
}

const ifValue = (value, fun) => {
  if (value !== undefined) return fun(value);
  return undefined;
};

const runFun = fun => fun();

class BigForm extends Component {
  clickSetData = () => {
    const { dinoForm: { setFullValues } } = this.props;
    // return;
    // debugger;
    setFullValues({
      name: '321',
      gender: 21321,
      workHistorySubForm: {
        companyName: '123',
        time: '123',
        projects: [{
          projectsNameField: '213',
          time: 3333,
          time1: '4444',
          time2: '2019-01-25T06:39:11.000Z',
          time3: '475456',
        }],
      },
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
      gender: value => ifValue(value, () => `${value}666`),
      workHistorySubForm: {
        companyName: value => ifValue(value, () => `${value}yeah`),
        projects: project => ({
          mapObj: {
            time2: value => ifValue(value, () => moment(project.time2)),
          },
          props: { very: 'good' },
        }),
      },
      workHistory: (workHistory) => {
        const { companyName } = workHistory;
        return {
          mapObj: {
            companyName: value => ifValue(value, () => `${value}77777`),
            projects: project => ({
              mapObj: {
                time2: value => ifValue(value, () => moment(project.time2)),
              },
              props: runFun(() => {
                if (project.time1 === '12321') { return { gg: 1 }; }
                return {};
              }),
            }),
          },
          props: { AA: 33 },
        };
      },
    });
  }

  render() {
    const { dinoForm: { verify, getFullValues, renderDinoForm } } = this.props;
    return (
      <div>
        <style>  {
          `
            .body {
              margin-bottom: 100px;
            }
            footer {
              position: fixed;
              z-index: 9999;
              bottom: 0px;
              width: 100%;
              background: white;
            }
          
          `
        }
        </style>
        <div onClick={ this.clickSetData }>set</div>
        <div className="body">
          { renderDinoForm() }
        </div>
        <footer>
          <div onClick={ async () => {
            const { hasError, data } = await verify();
            console.log(hasError, data);
            console.log(hasError, JSON.stringify(data));
          } }>submit
          </div>
          <div onClick={ () => {
            const data = getFullValues();
            console.log(data);
          } }>
            Get full value (only mounted)
          </div>
          <div onClick={ () => {
            const data = getFullValues({ onlyGetMount: false });
            console.log(data);
          } }>
            Get full value
          </div>
        </footer>
      </div>
    );
  }
}

const ResumeForm = createForm(config)(Resume)(BigForm);

export default ResumeForm;
