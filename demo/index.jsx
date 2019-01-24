import React from 'react';
import { render } from 'react-dom';
import ResumeForm from './Resume.jsx';
// import ProjectsForm from './ProjectsForm.jsx';
// import WorkHistoryForm from './WorkHistoryForm.jsx';
import './style.css';

const App = () => (
  <div>
    <ResumeForm />
    {/* <hr /> */}
    {/* <hr /> */}
    {/* <hr /> */}
    {/* <hr /> */}
    {/* <ProjectsForm /> */}
  </div>
);


const rootElement = document.getElementById('root');
render(
  <App />,
  rootElement,
);
