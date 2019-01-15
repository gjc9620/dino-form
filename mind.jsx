

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


const workHistoryify = createForm({ FieldFragment1, FieldFragment2 });

const WorkHistory = workHistoryify(
  class {
    didMount(){
      this.props.form.setFields({});
    }
    render(){
      const { FieldFragment1, FieldFragment2 } = this.props;
      return (
        <div>
          <FieldFragment1/>
          <FieldFragment2/>
        </div>
      );
    }
  }
);


const workHistoryGroupIfy = createFormGroup({ WorkHistory, EduHistory });

const workHistoryGroup = workHistoryGroupIfy(
  class {
    render(){
      const { renderForms } = this.props;
      return (
        <div>
          {
            renderForms(({ F, ID, onDelete, move })=>{
              return (
                <div>
                  <F />
                  <div>Delete</div>
                </div>
              )
            })
          }
          <button>Add</button>
        </div>
      );
    }
  }
)
