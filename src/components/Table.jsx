import React from 'react';
import { useEffect } from 'react';

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

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Sum</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {costRows.map(row => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.sum}</td>
                        <td>{row.category}</td>
                        <td>{row.description}</td>
                        <td>{`${row.day}/${row.month}/${row.year}`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
