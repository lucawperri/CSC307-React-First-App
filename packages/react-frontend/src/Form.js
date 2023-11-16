import React, {useState} from 'react';

function Form(props) {
  const [person, setPerson] = useState(
     {
        name: "",
        job: "",
        tag: "",
     }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job")
      setPerson(
         {name: person['name'], job: value, tag: person['tag']}
      );
    else if (name === "name")
       setPerson(
         {name: value, job: person['job'], tag: person['tag']}   
       );
    else
        setPerson(
          {name: person['name'], job: person['job'], tag: value}
        );
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({name: '', job: '', tag: ''});
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange} />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange} />
      <label htmlFor="tag">Tag</label>
      <select name="tag" id="tag" onChange={handleChange}>
        <option value="none" selected disabled hidden>Select an Option</option>
        <option value="School">School</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
);
}

export default Form;