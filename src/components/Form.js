import React from "react";

const Form = (props) => {
    return (
        <>
            <h3>Add a new</h3>
            <form onSubmit={props.addUpdatePerson}>
                <div>
                    Name:{" "}
                    <input
                        value={props.newName}
                        onChange={props.handleInputNameChange}
                    />
                </div>
                <div>
                    Number:{" "}
                    <input
                        value={props.newNumber}
                        onChange={props.handleInputNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
};

export default Form;
