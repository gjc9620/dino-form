import React from 'react';
import { render } from 'react-dom';
import ProjectsForm from './ProjectsForm.jsx';

const App = () => (
  <div>
    {/*aaa*/}
    <ProjectsForm />
  </div>
);


const rootElement = document.getElementById('root');
render(
  <App />,
  rootElement,
);
