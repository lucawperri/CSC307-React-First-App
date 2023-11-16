import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    const tag = req.query.tag;
    const promise = userServices.getUsers(name, job, tag);
    promise.then(result => {
        res.send({"users_list": result.map(user => {
            return {
                name: user.name,
                job: user.job,
                _id: user._id,
                tag: user.tag,
            };
        })});
    }).catch(error => console.log(error));;
}); 
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    userServices.findUserById(id).then(user => {
        if (user === undefined) {
            res.status(404).send('Resource not found.')
        } else {
            res.send(user);
        }
    }).catch(error => console.log(error));;
});

app.post('/users', (req, res) => {
    const userToAdd = req.body
    userServices.addUser(userToAdd).then(user => {
        let resultingUser = {
            name: user.name,
            job: user.job,
            _id: user._id,
            tag: user.tag,
        }
        res.status(201).send(resultingUser);
    }).catch(error => console.log(error));
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    userServices.deleteUserById(id).then(result => {
        if (result) {
            console.log(result);
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    }).catch(error => console.log(error));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      