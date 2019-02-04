import React from 'react';
import { render } from 'react-dom';
import ResumeForm from './forms/Resume.jsx';
import  '../src/Drag';
// import ProjectsForm from './ProjectsForm.jsx';
// import WorkHistoryForm from './WorkHistoryForm.jsx';
import './style.css';

const App = () => (
  <div>
    <ResumeForm />
  </div>
);


const rootElement = document.getElementById('root');
render(
  <App />,
  rootElement,
);
