import { useEffect, useState } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        personService
            .getAll()
            .then((initialPersons) => setPersons(initialPersons));
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
            const newPerson = {
                name: newName,
                number: newNumber,
            };

            personService.create(newPerson).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
            });

            setNewName("");
            setNewNumber("");
        }
    };

    const deletePerson = (id) => {
        if (window.confirm(`Delete ?`)) {
            personService
                .delPerson(id)
                .then(() =>
                    setPersons(persons.filter((person) => person.id !== id))
                );
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
            <Persons
                persons={persons}
                deletePerson={deletePerson}
                newFilter={newFilter}
            />
        </div>
    );
};

export default App;
