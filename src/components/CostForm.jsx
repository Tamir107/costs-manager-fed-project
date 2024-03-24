// import { useState } from "react";

// function CostForm({ db = {}, setCostRows }) {

//     const [sum, setSum] = useState(0);
//     const [category, setCategory] = useState("");
//     const [description, setDescription] = useState("");

//     const handleAddCost = async (event) => {
//         try {
//             const costItem = { "sum": sum, "category": category, "description": description };
//             await db.addCost(costItem);
//             const costRows = await db.getCosts();
//             setCostRows(costRows);
//         }
//         catch (e) {
//             console.error("Error adding cost:", e);
//         }

//     }
//     return (
//         <div>
//             <form onSubmit={handleAddCost}>
//                 <label htmlFor="sum">Sum: </label>
//                 <input type="text" id="sum" onChange={(e) => setSum(e.target.value)} />

//                 <label htmlFor="category">Category: </label>
//                 <select id="category" onChange={(e) => setCategory(e.target.value)}>
//                     <option value="">--Please choose a category--</option>
//                     <option value="FOOD">FOOD</option>
//                     <option value="HEALTH">HEALTH</option>
//                     <option value="EDUCATION">EDUCATION</option>
//                     <option value="TRAVEL">TRAVEL</option>
//                     <option value="HOUSING">HOUSING</option>
//                     <option value="OTHER">OTHER</option>
//                 </select>

//                 <label htmlFor="sum">Description: </label>
//                 <input type="text" id="description" onChange={(e) => setDescription(e.target.value)} />

//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default CostForm;

//###############################

// CostForm.jsx
// import { useState } from "react";
// import { Button, TextField, Typography, Select, MenuItem } from "@mui/material";

// function CostForm({ db = {}, setCostRows }) {

//     const [sum, setSum] = useState(0);
//     const [category, setCategory] = useState("");
//     const [description, setDescription] = useState("");

//     const handleAddCost = async (event) => {
//         try {
//             const costItem = { "sum": sum, "category": category, "description": description };
//             await db.addCost(costItem);
//             const costRows = await db.getCosts();
//             setCostRows(costRows);

//             event.preventDefault();
//         }
//         catch (e) {
//             console.error("Error adding cost:", e);
//         }
//     }

//     return (
//         <div>
//             {/* <Typography variant="h2">Cost Form</Typography> */}
//             <form onSubmit={handleAddCost}>
//                     <TextField
//                         id="sum"
//                         label="Sum"
//                         type="number"
//                         value={sum}
//                         onChange={(e) => setSum(e.target.value)}
//                     />
//                     <Select
//                         id="category"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         label="Category"
//                     >
//                         <MenuItem value="">--Please choose a category--</MenuItem>
//                         <MenuItem value="FOOD">FOOD</MenuItem>
//                         <MenuItem value="HEALTH">HEALTH</MenuItem>
//                         <MenuItem value="EDUCATION">EDUCATION</MenuItem>
//                         <MenuItem value="TRAVEL">TRAVEL</MenuItem>
//                         <MenuItem value="HOUSING">HOUSING</MenuItem>
//                         <MenuItem value="OTHER">OTHER</MenuItem>
//                     </Select>
//                     <TextField
//                         id="description"
//                         label="Description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                 <Button variant="contained" type="submit">Submit</Button>
//             </form >
//         </div >
//     );
// }

// export default CostForm;


// CostForm.jsx
import { useState } from "react";
import { Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import "../App.css"; // Import CSS file for styling

function CostForm({ db = {}, setCostRows }) {
    const [sum, setSum] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleAddCost = async (event) => {
        try {
            const costItem = { "sum": sum, "category": category, "description": description };
            await db.addCost(costItem);
            const costRows = await db.getCosts();
            setCostRows(costRows);

            event.preventDefault();
        } catch (e) {
            console.error("Error adding cost:", e);
        }
    }

    return (
        <>
            <form onSubmit={handleAddCost}>
                <div id="container">
                    <div className="input-group"> {/* Apply a CSS class for styling */}
                        <TextField
                            required
                            id="sum"
                            label="Sum"
                            type="number"
                            value={sum}
                            onChange={(e) => setSum(e.target.value)}
                            size="normal"
                        />
                        <TextField
                            id="category"
                            select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Select Category"
                            // helperText="Please select Category"
                            size="normal"
                        >
                            <MenuItem value="">--Please choose a category--</MenuItem>
                            <MenuItem value="FOOD">FOOD</MenuItem>
                            <MenuItem value="HEALTH">HEALTH</MenuItem>
                            <MenuItem value="EDUCATION">EDUCATION</MenuItem>
                            <MenuItem value="TRAVEL">TRAVEL</MenuItem>
                            <MenuItem value="HOUSING">HOUSING</MenuItem>
                            <MenuItem value="OTHER">OTHER</MenuItem>
                        </TextField>

                        <TextField
                            id="description"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            size="normal"
                        />
                    </div>

                    <Button variant="contained" type="submit">Submit</Button>
                </div>
            </form>
        </>

    );
}

export default CostForm;
