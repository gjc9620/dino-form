import React, { Component } from 'react';
import createForm from '../../src/createForm.jsx';
import {
  DinoInput,
  DinoInputNumber,
  DinoInputItem,
  DinoTimePicker,
} from '../DinoComponents.jsx';

const ProjectsForm = createForm({
  fragments: {
    ProjectsName: {
      Com: DinoInput,
      required: true,
      label: 'projectsNameLabel',
      field: 'projectsNameField',
      rules: [{
        validateTrigger: ['onChange', 'onBlur'],
        fun: value => Promise.resolve().then(() => value === '12'),
        // fun: value => value === '12',
        error: ({ label, field }) => `${label} !== 12`,
      }],
    },
    Time: {
      Com: DinoInputNumber,
      label: 'time',
      field: 'time',
      rules: [{
        validateTrigger: ['onBlur'],
        fun: value => +value !== 100,
        error: ({ label, field }) => `${label} !== 100`,
      }],
    },
    Time1: {
      Com: DinoInputItem,
      label: 'time1',
      field: 'time1',
    },
    Time2: {
      Com: DinoTimePicker,
      required: true,
      label: 'time2',
      field: 'time2',
    },
    Time3: {
      Com: DinoInputItem,
      required: true,
      label: 'time3',
      field: 'time3',
      onErrorClick: () => console.log('DDDDD'),
    },
  },
})(
  class Projects extends Component {
    render() {
      const {
        dinoForm,
        dinoForm: {
          setFields,
          getFields,
          verify,
          fragments: {
            ProjectsName,
            Time,
            Time1,
            Time2,
            Time3,
          },
        },
      } = this.props;

      return (
        <div>
          <div>
            <ProjectsName />
          </div>
          <div>
            <Time />
            <Time1 />
            <Time2 />
            <Time3 />
          </div>
        </div>
      );
    }
  },
)();

export default ProjectsForm;
