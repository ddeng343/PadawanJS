import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { postResource } from '../actions/postResourceActions.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Button, Popup } from 'semantic-ui-react';

const validate = values => {
  const errors = {}
  const requiredFields = [ 'title', 'URL', 'category', 'description' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}/>
)

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup {...input} {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}/>
)

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}/>
)

const ResourceForm = props => {
  const { handleSubmit, pristine, reset, submitting, valid } = props
  return (
    <form style={{height: 500}} onSubmit={handleSubmit(postResource)}>
      Resource
      <div>
        <Field name="title" component={renderTextField} label="Title"/>
      </div>
      <div>
        <Field name="URL" component={renderTextField} label="URL" hintText="Link to Resource"/>
      </div>

      <div>
        <Field name="category" component={renderSelectField} label="Category">
          <MenuItem value="React" primaryText="React"/>
          <MenuItem value="Node" primaryText="Node"/>
          <MenuItem value="Redux" primaryText="Redux"/>
          <MenuItem value="TDD" primaryText="TDD"/>
          <MenuItem value="Angular" primaryText="Angular"/>
          <MenuItem value="Express" primaryText="Express"/>
        </Field>
      </div>
      <div>
        <Field name="description" component={renderTextField} label="Description" multiLine={true} rows={2}/>
      </div>
      <div>
        <Popup trigger={<Button type="submit" disabled={pristine || submitting} >Submit</Button>} content={!valid ? 'Please fill required fields': 'Submitted'} on="click" hideOnScroll />
        
      </div>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    mentor: state.selectedMentor,
    initialValues: {
      user_id: state.selectedMentor.id
    }
  };
}


export default reduxForm({
  form: 'ResourceForm',  // a unique identifier for this form
  validate,
}, mapStateToProps)(ResourceForm)