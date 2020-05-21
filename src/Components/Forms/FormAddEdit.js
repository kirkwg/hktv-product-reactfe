import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {
  const[form, setValues] = useState({
    id: 0,
    name: '',
    code: '',
    weight: '',
    quantity: '',
    location: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        code: form.code,
        weight: form.weight,
        quantity: form.quantity,
        location: form.location
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          props.addItemToState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: form.id,
        name: form.name,
        code: form.code,
        weight: form.weight,
        quantity: form.quantity,
        location: form.location
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          props.updateState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(props.item){
      const { id,  name, code, weight, quantity, location  } = props.item
      setValues({ id,  name, code, weight, quantity, location  })
    }
  }, false)

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="name">Item Name</Label>
        <Input type="text" name="name" id="name" onChange={onChange} value={form.name === null ? '' : form.name} />
      </FormGroup>
      <FormGroup>
        <Label for="code">Code </Label>
        <Input type="text" name="code" id="code" onChange={onChange} value={form.code === null ? '' : form.code}  placeholder="eg. FM-xxx01"/>
      </FormGroup>
      <FormGroup>
        <Label for="weight">Weight (gram)</Label>
        <Input type="weight" name="weight" id="weight" onChange={onChange} value={form.weight === null ? '' : form.weight}  />
      </FormGroup>
      <FormGroup>
        <Label for="quantity">Quantity</Label>
        <Input type="text" name="quantity" id="quantity" onChange={onChange} value={form.quantity === null ? '' : form.quantity}   />
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location" onChange={onChange} value={form.location === null ? '' : form.location}  placeholder="eg. XXX" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default AddEditForm