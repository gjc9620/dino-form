

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

const Form = createForm({ FieldFragment1, FieldFragment2 })(
  class Buss {
    didMount(){
      this.props.form.setFields({});
    }
    render(){
      const { FieldFragment1, FieldFragment2 } = this.props;
      return <div>
        <FieldFragment1/>
        <FieldFragment2/>
      </div>;
    }
  }
);


group
