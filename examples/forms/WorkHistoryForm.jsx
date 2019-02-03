import React from 'react';
import createForm from '../../src';
import ProjectsForm from './ProjectsForm.jsx';
import {
  DinoInput,
  DinoInputNumber,
  DinoInputItem,
  DinoTimePicker,
} from '../DinoComponents.jsx';

const workHistoryForm = createForm({
  fragments: {
    CompanyName: {
      Com: DinoInput,
      required: true,
      label: 'companyName',
      field: 'companyName',
    },
    Time: {
      Com: DinoInput,
      label: 'time',
      field: 'time',
    },
  },
  groups: {
    projects: {
      Com: ProjectsForm,
      field: 'projects',
      count: 1,
      formProps: { aa: 1 },
    },
  },
})(class WorkHistory extends React.Component {
  render() {
    const {
      dinoForm: {
        fragments: {
          CompanyName,
          Time,
        },
        groups: {
          projects: {
            render,
            map,
            addItem,
            deleteItem,
            copyItem,
          },
        },
        verify,
      },
    } = this.props;

    return (
      <div>
        <div>
          <CompanyName />
        </div>
        <div>
          <Time />
        </div>
        { render() }
        {/*
        {
          render(
            children => <div style={ { marginLeft: 30 } }>{children}</div>,
            map(({
              Form: {
                FormCom,
                formProps,
              },
              ID,
              IDList,
              index,
              deleteIt,
              moveIt,
            }) => (
              <div>
                <div>{ID}</div>
                <FormCom { ...formProps } />
                <button onClick={ deleteIt }>删除</button>
                {
                  index !== 0
                  && <button onClick={ () => moveIt(-1) }>上</button>
                }
                {
                  index !== IDList.length - 1
                  && <button onClick={ () => moveIt(1) }>下</button>
                }
                <hr />
              </div>
            )),
          )
        }
*/}
        {/* <button onClick={ () => addItem() }>+</button> */}
      </div>
    );
  }
})();

export default workHistoryForm;
