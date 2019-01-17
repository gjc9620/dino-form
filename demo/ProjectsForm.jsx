import React, { Component } from 'react';
import createForm from './createForm';
import { DinoInput } from './DinoComponents.jsx';
//
// function DinoFragments({ Com, ...props } = {}) {
//   return runTimeProps => <Com {...props} {...runTimeProps} />;
// }

const ProjectsForm = createForm({
  fragments: {
    ProjectsName: {
      Com: DinoInput,
      label: "projectsName",
      field: "projectsName",
    },
    Time: {
      Com: DinoInput,
      label: "time",
      field: "time",
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
