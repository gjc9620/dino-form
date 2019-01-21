import React from 'react';
import { render } from 'react-dom';
import ProjectsForm from './ProjectsForm.jsx';
import WorkHistoryForm from './WorkHistoryForm.jsx';

const App = () => (
  <div>
    <WorkHistoryForm />
    <hr />
    <hr />
    <hr />
    <hr />
    <ProjectsForm />
  </div>
);


const rootElement = document.getElementById('root');
render(
  <App />,
  rootElement,
);
