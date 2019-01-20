import React from 'react';
import { render } from 'react-dom';
import ProjectsForm from './ProjectsForm.jsx';
import WorkHistoryForm from './WorkHistoryForm.jsx';

const App = () => (
  <div>
    <ProjectsForm />
    <WorkHistoryForm />
  </div>
);


const rootElement = document.getElementById('root');
render(
  <App />,
  rootElement,
);
