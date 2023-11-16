import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form"

function MyApp() {
  var [characters, setCharacters] = useState([]);
  var [filteredCharacters, setFilteredCharacters] = useState([]);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person)
    });

    return promise
  }

  function deleteUser(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
    });

    return promise;
  }

  function removeCharacter(id) {
    deleteUser(id)
      .then((res) => {
        if (res.status === 204)
        console.log("inside");
        setCharacters(characters.filter((character, i) => character._id !== id));
        characters = characters.filter((character, i) => character._id !== id);
      })
      .catch((error) => console.log(error));
      sleep(500).then(() => { filterCharacters(); });
  }

  function addCharacter(person) {
    postUser(person)
      .then((res) => res.status === 201 ? res.json() : undefined)
      .then((json) => { if (json) setCharacters([...characters, json]); characters = [...characters, json];
       })
      .catch((error) => console.log(error));
      sleep(500).then(() => { filterCharacters(); });
  }

  function filterCharacters(){
    var value = document.getElementById("filter").value;
    console.log(value);
    if(value !== "All"){
      setFilteredCharacters(characters.filter((character) => character.tag === value));
      filteredCharacters = characters.filter((character) => character.tag === value);
      console.log(filteredCharacters);
    }
    else{
      setFilteredCharacters(characters);
      filteredCharacters = characters;
      console.log(filteredCharacters);
    }
  }
  
  useEffect(() => {
    console.log('hi')
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); })
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setFilteredCharacters(json["users_list"]))
      .catch((error) => { console.log(error); })
  }, [] );
  
  return (
    <div className="container">
      <label htmlFor="filter">Filter</label>
      <select name="filter" id="filter" onChange={filterCharacters}>
        <option value="All">All Items</option>
        <option value="School">School</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <div id="table">
        <Table characterData={filteredCharacters} removeCharacter={removeCharacter} title="People"/>
      </div>
      <Form handleSubmit={addCharacter}/>
    </div>
  );
}

export default MyApp;