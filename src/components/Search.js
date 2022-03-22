import React from "react";
const Search = ({ setSearch, setCurrency }) => {
    return (
        <>
            <div className="form py-4 bg-light d-flex justify-content-center align-items-center gap-4 sm:flex-column">
                <div className="form-container w-50 ">
                    <input type="search" className="form-control   mx-auto" placeholder="search" id="search" onInput={(event) => setSearch(event.target.value)} />
                </div>
                <div className="dropdowns">
                    <select
                        id="regions"
                        onChange={(e) => {
                            setCurrency(e.target.value);
                        }}
                    >
                        <option value="inr">INR</option>
                        <option value="usd">USD</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default Search;
