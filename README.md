# Product List - CRUD with React Hooks



The [product-react](https://github.com/kirkwg/hktv-product-reactfe) is using React functional components with hooks. It includes the implementation of useState() to replace constructor functions and state declarations and useEffect() to replace componentDidMount() and componentDidUpdate().

**Demo product list using React with Hooks** - this app connects with the [product-react API backend](https://github.com/kirkwg/hktv-product-reactfe-api.git). It can be easily edited and used as a starter frontend for any app that features get, post, put and delete requests or other API calls.

This **product-react** app uses Bootstrap styles with **reactstrap** (a Bootstrap component plugin) to create a responsive data table that displays all data from a table in a database. It has a Modal component with a form for adding and editing items, a delete and edit button in each item row, a button to download the entire database table into a CSV file, and a light Choose File button to import a CSV for storing data into database.

It uses **react-csv** to create the CSV download button. It uses **react-csv-reader** to import and read the CSV file.



## Instructions

**1. Clone this repo**

```
git clone https://github.com/kirkwg/hktv-product-reactfe.git
```

**2. NPM install React and dependencies and start**

```
cd hktv-product-reactfe
npm install
npm start
```



## Further Information

1. Back-end: NodeJS, ExpressJS, and PostgreSQL

2. Front-end: ReactJS with Hooks

3. Features for this demo:

   - CRUD: Get all records (GET)
   - CRUD: Edit/Update a record (PUT)
   - CRUD: Delete al record (DELECT)
   - CRUD: Add/Create a new record (POST)
   - Import CSV into database table (Partially done for this version)
   - Export DB data to CSV (Download CSV button)

4. Sample of exported CSV file:

   ```
   "id","name","code","weight","quantity","location"
   "17","test01","code-001","30","30","SSP"
   "18","test02","code-002","40","40","LK"
   "20","test01","code-001","30","30","SSP"
   "21","test02","code-002","40","40","LK"
   "22","test03","code-003","50","50","TWW"
   ```

   



