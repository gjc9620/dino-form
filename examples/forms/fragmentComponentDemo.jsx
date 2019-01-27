import React, { Component } from 'react';
import createForm from '../../src/createForm.jsx';
import WorkHistoryForm from './WorkHistoryForm.jsx';
import { Resume } from './Resume.jsx';
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
      label: 'Sex',
      field: 'gender',
    },
    Sex2: {
      Com: DinoInputNumber,
      label: 'Sex2',
      field: 'gender2',
    },
    ResumeCom: {
      Com: Resume,
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

const ResumeForm = createForm(config)((props) => {
  const {
    dinoForm,
    dinoForm: {
      fragments,
      groups,
      verify,
      fragments: {
        Name,
        Sex,
        Sex2,
        ResumeCom,
      },
      groups: {
        WorkHistory: {
          render,
          map,
        },
      },
    },
  } = props;

  return (
    <div>
      <div>12131</div>
      <Sex2 />
      <ResumeCom dinoForm={ dinoForm } />
      <div onClick={ async () => {
        const { hasError, data } = await verify();
        console.log(hasError, data);
        console.log(hasError, JSON.stringify(data));
      } }>提交
      </div>
    </div>
  );
})();

export default ResumeForm;
