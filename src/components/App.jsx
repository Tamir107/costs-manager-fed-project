import { useEffect, useState } from 'react';
import '../App.css';
import ChooseReport from './ChooseReport.jsx';
import CostForm from './CostForm.jsx';
import Table from './Table.jsx';
import idb from '../idb.js';

function App() {
  const [costsRows, setCostRows] = useState([]);
  const [db, setDb] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    idb.openCostsDB("CostsDB", 1).then(request => {
      setDb(request);
      setIsLoading(false);
    });
  }, []);



  return (
    <>
      <h1 id="title">Costs Manager</h1>

      <div className="container">
        <div className="section">
          <h2>Cost Form</h2>
          <CostForm db={db} setCostRows={setCostRows} />
        </div>
        <div className="section">
          <ChooseReport db={db} setCostRows={setCostRows}/>
        </div>
        <div className="section">
          <h2>Table</h2>
          <Table db={db} costRows={costsRows} setCostRows={setCostRows} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

export default App;
