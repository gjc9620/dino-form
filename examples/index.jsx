import React from 'react';
import { render } from 'react-dom';
import ResumeForm from './forms/Resume.jsx';
import { Simple, SimpleScroller } from '../src/Drag';
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
    <Simple />
    <SimpleScroller />
    {/* <ProjectsForm /> */}
  </div>
);


const rootElement = document.getElementById('root');
render(
  <App />,
  rootElement,
);
