import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

function DataTable(props){
  const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/crud', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
      })
      .then(response => response.json())
      .then(item => {
        props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
	}
 }


  const items = props.items.map(item => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.code}</td>
        <td>{item.weight}</td>
        <td>{item.quantity}</td>
        <td>{item.location}</td>
        <td>
          <div style={{width:"110px"}}>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState}/>
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
          </div>
        </td>
      </tr>
      )
    })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Code</th>
          <th>Weight</th>
          <th>Quantity</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable