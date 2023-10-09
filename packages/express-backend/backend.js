import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       },
       {
        "id": "qwe123",
        "job": "Zookeeper",
        "name": "Cindy"
        }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => {
    return users['users_list']
        .filter( (user) => user['job'] === job);
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job === undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if (name === undefined && job != undefined){
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined && job != undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    res.send(users)
});

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      

const generateUniqueId = () => {
    const min = 100000;
    const max = 999999;
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

const addUser = (user) => {
    let newId = generateUniqueId();
    do {
        newId = generateUniqueId();
    } while (users['users_list'].some(obj => obj.id === newId));
    user['id'] = newId.toString();
    users['users_list'].push(user);
    return user;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const user = addUser(userToAdd);
    res.status(201).send(user);
});

const delUser = (id) => {
    users['users_list'] = users['users_list'].filter((user) => user['id'] !== id);
}

app.delete('/users/:id', (req, res) => {
    const idToDel = req.body['id'];
    if(users['users_list'].some(obj => obj.id === idToDel)){
        delUser(idToDel);
        res.status(204).send();
    }
    res.status(404);
});
