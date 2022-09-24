import React from "react";

const Person = (props) => {
    return (
        <>
            <p>
                {props.person.id} {props.person.name} {props.person.number}
            </p>
            <button onClick={() => props.deletePerson(props.person.id)}>
                Delete
            </button>
        </>
    );
};

export default Person;
