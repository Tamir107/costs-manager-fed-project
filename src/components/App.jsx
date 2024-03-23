import { useEffect, useState } from 'react';
import '../App.css';
import ChooseReport from './ChooseReport.jsx';
import CostForm from './CostForm.jsx';
import Table from './Table.jsx';
import idb from '../idb.js';

function App() {

  const [db, setDb] = useState([]);

  useEffect(() => {
    idb.openCostsDB("CostsDB", 1).then(request => setDb(request));
  }, []);



  return (
    <>
      <h1 id="title">Costs Manager</h1>

      <div className="container">
        <div className="section">
          <h2>Cost Form</h2>
          <CostForm db={db} />
        </div>
        <div className="section">
          <h2>Choose Report</h2>
          <ChooseReport />
        </div>
        <div className="section">
          <h2>Table</h2>
          <Table />
        </div>
      </div>
    </>
  );
}

export default App;
