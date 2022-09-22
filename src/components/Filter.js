import React from "react";

const Filter = (props) => {
    return (
        <form>
            <div>
                Filter shown with:{" "}
                <input
                    value={props.newFilter}
                    onChange={props.handleFilterChange}
                />
            </div>
        </form>
    );
};

export default Filter;
