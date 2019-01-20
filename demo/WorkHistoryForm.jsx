import React from 'react';
import createForm from './createForm';
import ProjectsForm from './ProjectsForm';
import DinoInput from '../../components/DinoInput';

const workHistoryForm = createForm({
  fragments: {
    CompanyName: props => (
      <DinoInput
        label="companyName"
        field="companyName"
        { ...props }
      />
    ),
    Time: props => (
      <DinoInput
        label="time"
        field="time"
        { ...props }
      />
    ),
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
        { projects.render() }
      </div>
    );
  }
});

export default workHistoryForm;
