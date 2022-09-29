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
    const [message, setMessage] = useState({
        type: "",
        content: "",
    });

    const handleInputNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleInputNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    };

    const addUpdatePerson = (event) => {
        event.preventDefault();

        const found = persons.find(
            (person) => person.name === newName && person.number !== newNumber
        );

        const alradyExist = persons.find((person) => person.name === newName);

        if (found) {
            if (
                window.confirm(
                    `${found.name} is already added to the phonebook. Replace the old number with the new one ?`
                )
            ) {
                personService
                    .modify(found.id, newNumber)
                    .then(() =>
                        setPersons(
                            persons.map((person) =>
                                person.id === found.id
                                    ? { ...person, number: newNumber }
                                    : person
                            )
                        )
                    );
                setMessage({
                    type: "success",
                    content: `The number of ${newName} was updated`,
                });
                setNewName("");
                setNewNumber("");
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            };

            personService.create(newPerson).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
            });
            setMessage({
                type: "success",
                content: `Added ${newPerson.name}`,
            });
            setNewName("");
            setNewNumber("");
        }
    };

    const deletePerson = (id) => {
        if (window.confirm(`Delete ?`)) {
            personService
                .remove(id)
                .then(() =>
                    setPersons(persons.filter((person) => person.id !== id))
                );
            setMessage({
                type: "success",
                content: `Deleted succesfully`,
            });
        }
    };

    let classMessage = "";
    if (message.type === "") {
        classMessage = "";
    } else if (message.type === "success") {
        classMessage = "success";
    } else if (message.type === "error") {
        classMessage = "error";
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div className={classMessage}>{message?.content}</div>
            <Filter
                newFilter={newFilter}
                handleFilterChange={handleFilterChange}
            />
            <Form
                newName={newName}
                handleInputNameChange={handleInputNameChange}
                newNumber={newNumber}
                handleInputNumberChange={handleInputNumberChange}
                addUpdatePerson={addUpdatePerson}
            />
            <Persons
                newFilter={newFilter}
                persons={persons}
                deletePerson={deletePerson}
            />
        </div>
    );
};

export default App;
