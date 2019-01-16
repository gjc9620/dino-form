import React, { Component } from 'react';
import createForm from './createForm';
import DinoInput from '../../components/DinoInput';

function DinoFragments({ Com, ...props } = {}) {
  return runTimeProps => <Com {...props} {...runTimeProps} />;
}

const ProjectsForm = createForm({
  fragments: {
    ProjectsName: <DinoFragments
      Com={DinoInput}
      label="projectsName"
      field="projectsName"
      />,
    Time: <DinoFragments
      Com={DinoInput}
      label="time"
      field="time"
      />,
  },
})((props) => {
  const {
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
