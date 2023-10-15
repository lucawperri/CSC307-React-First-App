import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function removeOneCharacter (index) {
    const promise = await fetch("Http://localhost:8000/users/:id", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characters[index]),
    });
    if(promise.status === 204){
      const updated = characters.filter((character, i) => {
	      return i !== index
	  });	  setCharacters(updated);
      return promise;
    }
}

function updateList(person) { 
  postUser(person)
    .then(() => {
      // Fetch the updated user list from the server
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  async function postUser(person) {
    const promise = await fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    if(promise.status === 201){
      return promise;
    }
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );
    
  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList}/>
    </div>
  )  
}

export default MyApp;