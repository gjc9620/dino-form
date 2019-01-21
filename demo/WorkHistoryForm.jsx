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
      count: 3,
      formProps: { aa: 1 },
    },
  },
})(class extends React.Component {
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
          },
        },
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
                Form, ID, index, deleteIt, move, moveTo, aa,
              }) => (
                <div key={ ID }>
                  <Form />
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
});

export default workHistoryForm;
