import React, { Component } from 'react';
import createForm from './createForm';
import {
  DinoInput, DinoInputNumber, DinoInputItem, DinoTimePicker,
} from './DinoComponents.jsx';

const ProjectsForm = createForm({
  fragments: {
    ProjectsName: {
      Com: DinoInput,
      required: true,
      label: 'projectsNameLabel',
      field: 'projectsNameField',
      rules: [{
        validateTrigger: ['onChange', 'onBlur'],
        fun: event => event.target.value === '12',
        error: (fieldName, label, field) => `${label} !== 12`,
      }],
    },
    Time1: {
      Com: DinoInputNumber,
      label: 'time1',
      field: 'time1',
    },
    Time2: {
      Com: DinoInputItem,
      label: 'time2',
      field: 'time2',
    },
    Time3: {
      Com: DinoTimePicker,
      required: true,
      label: 'time2',
      field: 'time2',
    },
  },
})((props) => {
  const {
    dinoForm,
    dinoForm: {
      setFields,
      getFields,
      verify,
      fragments: {
        ProjectsName,
        Time,
      },
    },
  } = props;

  return (
    <div>
      <div>
        <ProjectsName />
      </div>
      <div>
        <Time />
      </div>
    </div>
  );
});

export default ProjectsForm;
