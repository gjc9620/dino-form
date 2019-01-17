import React from 'react';
import { render } from 'react-dom';
import ProjectsForm from './ProjectsForm.jsx';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

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
