import { useEffect, useState } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then((response) => setPersons(response.data));
    }, []);

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    const handleInputNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleInputNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();

        const found = persons.find(
            (person) => person.name === newName || person.number === newNumber
        );

        if (found) {
            return alert(
                `the name : ${newName} or the number : ${newNumber} is already added to phonebook`
            );
        } else {
            setPersons(
                persons.concat({
                    name: newName,
                    number: newNumber,
                    id: persons.length + 1,
                })
            );
            setNewName("");
            setNewNumber("");
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                newFilter={newFilter}
                handleFilterChange={handleFilterChange}
            />
            <Form
                addPerson={addPerson}
                newName={newName}
                handleInputNameChange={handleInputNameChange}
                newNumber={newNumber}
                handleInputNumberChange={handleInputNumberChange}
            />
            <Persons persons={persons} newFilter={newFilter} />
        </div>
    );
};

export default App;
