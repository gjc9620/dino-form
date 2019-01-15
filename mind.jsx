

class FieldFragment1 {
  render (){
    const { FromItem, form } = this.props;
    
    return(
      <div>
        <FromItem
          label='name'
          field=""
          com={Input}
          comProps={{
            onChange: ()=>{}
          }}
        />
      </div>
    )
  }
}

class FieldFragment2 {
  render (){
    const { FromItem, form } = this.props;
    
    return(
      <div>
        <FromItem
          label='name'
          field=""
          com={Input}
          comProps={{
            onChange: ()=>{}
          }}
        />
      </div>
    )
  }
}

const resumeify = createForm({
  fragments: { 
    FieldFragment1,
    FieldFragment2,
  },
  groupFragments: { WorkHistory, EduHistory },
});

resumeify(
  class B{
    did(){}
    render(){ 
      const { 
        dinoForm: { 
          fragments: {
            FieldFragment1,
            FieldFragment2
          },
          group: {
            WorkHistory,
            EduHistory
          },
        },
      } = this.props;
      
      return (
        <div>
          <div className="part1">
            <FieldFragment1  />     
          </div>
          
        </div>
      )
    }
  }
)

