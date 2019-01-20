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
      com: DinoInput,
      label: 'companyName',
      field: 'companyName',
    },
    Time: {
      com: DinoInput,
      label: 'time',
      field: 'time',
    },
  },
  groups: {
    ProjectsForm: {
      Com: ProjectsForm,
      field: 'projects',
      count: 1,
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
          projects,
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
      </div>
    );
  }
});

export default workHistoryForm;
