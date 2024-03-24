import { useState } from "react";

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
        }
        catch (e) {
            console.error("Error adding cost:", e);
        }

    }
    return (
        <div>
            <form onSubmit={handleAddCost}>
                <label htmlFor="sum">Sum: </label>
                <input type="text" id="sum" onChange={(e) => setSum(e.target.value)} />

                <label htmlFor="category">Category: </label>
                <select id="category" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">--Please choose a category--</option>
                    <option value="FOOD">FOOD</option>
                    <option value="HEALTH">HEALTH</option>
                    <option value="EDUCATION">EDUCATION</option>
                    <option value="TRAVEL">TRAVEL</option>
                    <option value="HOUSING">HOUSING</option>
                    <option value="OTHER">OTHER</option>
                </select>

                <label htmlFor="sum">Description: </label>
                <input type="text" id="description" onChange={(e) => setDescription(e.target.value)} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CostForm;
