// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function ChooseReport({ db = {}, setCostRows }) {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const maxAllowedDate = new Date(); // Set max allowed date to today

//     const handleMonthly = async () => {
//         try {
//             const month = selectedDate.getMonth() + 1; // Month is zero-based, so we add 1
//             const year = selectedDate.getFullYear();

//             console.log("year is:" + year);
//             console.log("month is:" + month);

//             const costsData = await db.getCosts(month, year);

//             setCostRows(costsData);
//         } catch (error) {
//             console.error('Error reading data:', error); // Log any errors to the console
//         }



//         // Handle Monthly Report
//         console.log('Monthly Report for:', selectedDate);
//     };

//     const handleYearly = async () => {

//         try {
//             const year = selectedDate.getFullYear();
//             console.log("year is:" + year);

//             const costsData = await db.getCosts(null, year);

//             setCostRows(costsData);
//         } catch (error) {
//             console.error('Error reading data:', error); // Log any errors to the console
//         }

//         // Handle Yearly Report
//         console.log('Yearly Report for:', selectedDate);
//     };

//     return (
//         <div>
//             <h1>Report Component</h1>
//             <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 dateFormat="MM/yyyy" // Set the date format to show only month and year
//                 showMonthYearPicker // Show only month and year picker
//                 maxDate={maxAllowedDate} // Set the max allowed date to today
//             />
//             <br />
//             <button onClick={handleMonthly}>Monthly Report</button>
//             <button onClick={handleYearly}>Yearly Report</button>
//         </div>
//     );
// };


// export default ChooseReport;


//##############################

// ChooseReport.jsx
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function ChooseReport({ db = {}, setCostRows, selectedDate, setSelectedDate }) {

    const handleMonthly = async () => {
        try {
            // const month = selectedDate.getMonth() + 1; // Month is zero-based, so we add 1
            // const year = selectedDate.getFullYear();

            const FullDate = dayjs.unix(selectedDate / 1000); // dividing by 1000 to convert milliseconds to seconds
            // Extract the month and year
            const month = FullDate.month() + 1; // dayjs months are zero-based, so we add 1 to get the correct month
            const year = FullDate.year(); // extracting the last two digits of the year

            console.log("year is:" + year);
            console.log("month is:" + month);

            const costsData = await db.getCosts(month, year);
            console.log(costsData);
            setCostRows(costsData);
        } catch (error) {
            console.error('Error reading data:', error); // Log any errors to the console
        }

        console.log('Monthly Report for:', selectedDate);
    };

    const handleYearly = async () => {
        try {
            // const year = selectedDate.getFullYear();
            // console.log("year is:" + year);

            const FullDate = dayjs.unix(selectedDate / 1000); // dividing by 1000 to convert milliseconds to seconds
            // Extract the year
            const year = FullDate.year(); // extracting the last two digits of the year

            const costsData = await db.getCosts(null, year);

            setCostRows(costsData);
        } catch (error) {
            console.error('Error reading data:', error); // Log any errors to the console
        }

        console.log('Yearly Report for:', selectedDate);
    };

    return (
        <div className="section">
            {/* <Typography variant="h1">Report Component</Typography> */}
            <div id="container-date">
                <DatePicker
                    // value={selectedDate}
                    // onChange={(newValue) => setSelectedDate(newValue)}
                    // // renderInput={(params) => <TextField {...params} />}
                    // views={['year', 'month']}
                    // maxDate={maxAllowedDate}
                    sx={{ width: "35%" }} // Apply inline styles for width
                    slotProps={{ textField: { size: "small" } }} // Set properties for the input field
                    views={["month", "year"]} // Limit the DatePicker view to months and years only
                    value={selectedDate} // Bind the value to the selectedYear state
                    onChange={date => setSelectedDate(date)}// Set state when selected date
                    disableFuture // Disable selection of future dates
                />
                <Button variant="contained" onClick={handleMonthly}>Monthly Report</Button>
                <Button variant="contained" onClick={handleYearly}>Yearly Report</Button>
            </div>
        </div>
    );
};

export default ChooseReport;
