import React from 'react';
import { render } from 'react-dom';
import Resume from './Resume.jsx';
// import ProjectsForm from './ProjectsForm.jsx';
// import WorkHistoryForm from './WorkHistoryForm.jsx';
import './style.css';

const App = () => (
  <div>
    <Resume />
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
