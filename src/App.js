import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import CSVReader from "react-csv-reader";
import { CSVLink } from "react-csv"
import "./App.css"

function App(props) {

  const [items, setItems] = useState([])
  const [uploadData, setUploadData] = useState([])
/*  const [upload, setUpload] = useState({
	  loading: false, 
	  showTable: false,
	  error: false,
	  tabledata: {}
  }) */

  const getItems= () => {
    fetch('http://localhost:3000/crud')
      .then(response => response.json())	
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }
  
  
  const addItemToState = (item) => {
    setItems([...items, item])
	console.log("**addItems= " + JSON.stringify(items))
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
	console.log("**newArray= " + JSON.stringify(newArray))
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  //------- Select csv file -------
  const handleCSV = (data, fileInfo) => {
	//setUploadData({...upload, loading: true})
	//setUploadData(data)
	//console.log("**upload.loading= " + upload.loading )
	console.log("**data= " + JSON.stringify(data))
	//console.log("**uploadData= " + JSON.stringify(uploadData))
	console.log("**fileInfo= " + JSON.stringify(fileInfo))
	
   fetch('http://localhost:3000/bulk', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) /*JSON.stringify({
		id: form.id,
        name: data.name,
        code: data.code,
        weight: data.weight,
        quantity: data.quantity,
        location: data.location */
      
      })  //-end fetch()
      .then(response => {
		    //setUpload({loading: false})
			if (response.ok) { 
				window.alert("CSV data added to DB successfully..<br/>Pls refresh the screen manually")
				return response.json()
			
			} else {
			  console.log('Data error when putting from csv to DB?')
			  //throw new Error('Data error when putting from csv to DB?')
			}
      })
      .catch(err => console.log(err))
	  
	
  }
  
  //------- for importing all data from CSV to DB Table -------  
  const loadClickHandler = e => {
	//e.preventDefault();
	//console.log("**e= " + e.target.value)

	
  }
  
  // ------- CSV parser -------
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_")
  }
  //---------------------------




  useEffect(() => {
    getItems()
  }, []);

  return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>HKTV-Demo-01 Product Items</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={items}>
              Download CSV (db.csv)
            </CSVLink>
            <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}/>
          </Col>
        </Row>
        <Row>
          <Col>
		    <div className="importCSV">
				<CSVReader			  
				  cssClass="react-csv-input"
				  label="Import/Select CSV: ----> "
				  onFileLoaded={handleCSV}			
				  parserOptions={papaparseOptions} 
				/>
			    <button className="btn btn-secondary" onClick={loadClickHandler}> 
				  <span>Load Table </span>
			    </button>   				
			</div>
          </Col>
        </Row>

          
  

      </Container>

  )
}

export default App