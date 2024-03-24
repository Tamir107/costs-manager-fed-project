import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ChooseReport({ db = {}, setCostRows }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const maxAllowedDate = new Date(); // Set max allowed date to today

    const handleMonthly = async () => {
        try {
            const month = selectedDate.getMonth() + 1; // Month is zero-based, so we add 1
            const year = selectedDate.getFullYear();

            console.log("year is:" + year);
            console.log("month is:" + month);

            const costsData = await db.getCosts(month, year);

            setCostRows(costsData);
        } catch (error) {
            console.error('Error reading data:', error); // Log any errors to the console
        }



        // Handle Monthly Report
        console.log('Monthly Report for:', selectedDate);
    };

    const handleYearly = async () => {

        try {
            const year = selectedDate.getFullYear();
            console.log("year is:" + year);

            const costsData = await db.getCosts(null, year);

            setCostRows(costsData);
        } catch (error) {
            console.error('Error reading data:', error); // Log any errors to the console
        }

        // Handle Yearly Report
        console.log('Yearly Report for:', selectedDate);
    };

    return (
        <div>
            <h1>Report Component</h1>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MM/yyyy" // Set the date format to show only month and year
                showMonthYearPicker // Show only month and year picker
                maxDate={maxAllowedDate} // Set the max allowed date to today
            />
            <br />
            <button onClick={handleMonthly}>Monthly Report</button>
            <button onClick={handleYearly}>Yearly Report</button>
        </div>
    );
};


export default ChooseReport;
