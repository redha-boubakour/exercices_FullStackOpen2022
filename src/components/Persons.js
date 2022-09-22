import React from "react";
import Person from "./Person";

const Persons = (props) => {
    const filteredPersons = props.persons.filter((person) =>
        person.name.toLowerCase().includes(props.newFilter.toLowerCase())
    );

    return (
        <>
            <h3>Numbers</h3>
            {filteredPersons.map((person) => (
                <Person person={person} />
            ))}
        </>
    );
};

export default Persons;
