import {Alert} from "antd";

class Input {
  render (){
    const { FromItem, form } = this.props;
    
    return(
      <FromItem
        label=''
        field=""
        com={Input}
        comProps={{
          onChange: () => {},
        }}
      />
    )
  }
}

const ProjectsForm = createForm({
  fragments: {
    ProjectsName: (props)=> <Input
      label="projectsName"
      field="projectsName"
      {...props}
    />,
    Time: (props) => <Input
      label="time"
      field="time"
      {...props}
    />,
  },
})((props)=>{
  const {
    dinoForm: {
      ProjectsName,
      Time,
      setFields,
      getFields,
      verify,
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
  )
});

const workHistoryForm = createForm({
  fragments: {
    CompanyName: (props)=> <Input
      label="companyName"
      field="companyName"
      {...props}
    />,
    Time: (props) => <Input
      label="time"
      field="time"
      {...props}
    />,
  },
  groups: {
    projects: {
      Com: props => <ProjectsForm {...props} />,
      count: 1,
    }
  },
})(class {
  render(){
    const {
      dinoForm: {
        fragments: {
          CompanyName,
          Time,
        },
        groups: {
          projects
        }
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
        { projects.render() }
      </div>
    )
  }
});

const WorkHistoryForm = createForm({
  fragments: {
    CompanyName: (props)=> <Input
      label="companyName"
      field="companyName"
      {...props}
    />,
    Time: (props) => <Input
      label="time"
      field="time"
      {...props}
    />,
  },
  groups: {
    projects: {
      Com: ProjectsForm,
      field: "projects",
      count: 1,
    }
  },
})(class {
  render(){
    const {
      dinoForm: {
        fragments: {
          CompanyName,
          Time,
        },
        groups: {
          projects
        }
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
        <div>
          { projects.render() }
        </div>
      </div>
    )
  }
});

const createForm = createForm({
  fragments: {
    Name: (props)=> <Input
      label="companyName"
      field="companyName"
      {...props}
    />,
    Age: (props) => <Input
      label="age"
      field="age"
      {...props}
    />,
  },
  groups: {
    workHistory: {
      Com: WorkHistoryForm,
      field: "workHistory",
      count: 1,
    }
  },
}, class {
  render(){
    const {
      dinoForm: {
        fragments: {
          Name,
          Age,
        },
        groups: {
          workHistory
        }
      },
    } = this.props;
    return (
      <div>
        <div>
          <Name />
        </div>
        <div>
          <Age />
        </div>
        { workHistory.render() }
      </div>
    )
  }
})



const resume = {
  name: '',
  age: 11,
  workHistory:[
    {
      companyName: '',
      time: '',
      projects: [
        {
          projectsName: '',
          time: ''
        }
      ]
    }
  ],
  // eduHistory: [
  //   {
  //     schoolName: '',
  //     time: '',
  //     honours: [
  //       {
  //         honoursName: '',
  //         time: ''
  //       }
  //     ]
  //   }
  // ],
};
