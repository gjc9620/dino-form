import React from 'react';
import createForm from './createForm.jsx';
import ProjectsForm from './ProjectsForm.jsx';
import {
  DinoInput,
  DinoInputNumber,
  DinoInputItem,
  DinoTimePicker,
} from './DinoComponents.jsx';

const workHistoryForm = createForm({
  fragments: {
    CompanyName: {
      Com: DinoInput,
      required: true,
      label: 'companyName',
      field: 'companyName',
    },
    Time: {
      Com: DinoInput,
      label: 'time',
      field: 'time',
    },
  },
  groups: {
    projects: {
      Com: ProjectsForm,
      field: 'projects',
      count: 2,
      formProps: { aa: 1 },
    },
  },
})(class WorkHistory extends React.Component {
  componentDidMount() {
    const { dinoForm: { setFieldsValues } } = this.props;
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
    });
  }

  render() {
    const {
      dinoForm: {
        fragments: {
          CompanyName,
          Time,
        },
        groups: {
          projects: {
            render,
            map,
            addItem,
            deleteItem,
            copyItem,
          },
        },
        verify,
      },
    } = this.props;

    return (
      <div>
        <div>
          <CompanyName />
        </div>
        <div>
          <Time />
        </div>
        <div className="groups">
          {
            render(
              children => <div>{children}</div>,
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
        <div onClick={ async () => {
          const { hasError, data } = await verify();
          console.log(hasError, data);
          console.log(hasError, JSON.stringify(data));
        } }>提交
        </div>
      </div>
    );
  }
});

export default workHistoryForm;
