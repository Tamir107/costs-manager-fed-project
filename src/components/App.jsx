// import { useEffect, useState } from 'react';
// import '../App.css';
// import ChooseReport from './ChooseReport.jsx';
// import CostForm from './CostForm.jsx';
// import Table from './Table.jsx';
// import idb from '../idb.js';

// function App() {
//   const [costsRows, setCostRows] = useState([]);
//   const [db, setDb] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     idb.openCostsDB("CostsDB", 1).then(request => {
//       setDb(request);
//       setIsLoading(false);
//     });
//   }, []);



//   return (
//     <>
//       <h1 id="title">Costs Manager</h1>

//       <div className="container">
//         <div className="section">
//           <h2>Cost Form</h2>
//           <CostForm db={db} setCostRows={setCostRows} />
//         </div>
//         <div className="section">
//           <ChooseReport db={db} setCostRows={setCostRows}/>
//         </div>
//         <div className="section">
//           <h2>Table</h2>
//           <Table db={db} costRows={costsRows} setCostRows={setCostRows} isLoading={isLoading} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


//####################################

// App.jsx
import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import ChooseReport from './ChooseReport.jsx';
import CostForm from './CostForm.jsx';
import Table from './Table.jsx';
import idb from '../idb.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";


function App() {
  const [costsRows, setCostRows] = useState([]);
  const [db, setDb] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    idb.openCostsDB("CostsDB", 1).then(request => {
      setDb(request);
      setIsLoading(false);
    });
  }, []);

  return (<>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Typography variant="h4" id="title">Costs Manager</Typography>

        <Container>
            <CostForm db={db} setCostRows={setCostRows} />
            <ChooseReport db={db} setCostRows={setCostRows} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          {/* <Typography variant="h2">Table</Typography> */}
          <Table db={db} costRows={costsRows} setCostRows={setCostRows} isLoading={isLoading} />
        </Container>
      </Container>
    </LocalizationProvider>
  </>
  );
}

export default App;
