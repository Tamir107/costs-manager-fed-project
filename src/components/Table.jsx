// import React from 'react';
// import { useEffect } from 'react';

// const Table = ({ isLoading, db = {}, costRows, setCostRows }) => {
//     useEffect(() => {
//         // Check if data is still loading
//         if (isLoading) {
//             return; // If so, do nothing and wait
//         } else {
//             // If not, read data from the database and update the rows state
//             db.getCosts().then((result) => setCostRows(result));
//         }
//     }, [db, isLoading]); // Re-run the effect when db or isLoading changes

//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Sum</th>
//                     <th>Category</th>
//                     <th>Description</th>
//                     <th>Date</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {costRows.map(row => (
//                     <tr key={row.id}>
//                         <td>{row.id}</td>
//                         <td>{row.sum}</td>
//                         <td>{row.category}</td>
//                         <td>{row.description}</td>
//                         <td>{`${row.day}/${row.month}/${row.year}`}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default Table;

//#############################

// Table.jsx
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ isLoading, db = {}, costRows, setCostRows }) => {
    useEffect(() => {
        // Check if data is still loading
        if (isLoading) {
            return; // If so, do nothing and wait
        } else {
            // If not, read data from the database and update the rows state
            db.getCosts().then((result) => setCostRows(result));
        }
    }, [db, isLoading]); // Re-run the effect when db or isLoading changes

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'sum', headerName: 'Sum', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'date', headerName: 'Date', width: 150, valueGetter: (params) => `${params.row.day}/${params.row.month}/${params.row.year}` },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={costRows}
                columns={columns}
                pageSize={5}
                checkboxSelection
            />
        </div>
    );
};

export default Table;
