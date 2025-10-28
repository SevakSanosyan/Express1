const fs = require('fs').promises
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.set({
        'content-type': "text/html",
        "Cache-Control": "no-store"
    })
    res.status(200)
    res.sendFile(__dirname + '/index.html')
})

app.get('/users', (req, res) => {

    res.set({
        'content-type': "application/json",
        "Cache-Control": "no-store"
    })
    res.status(200)
    fs.readFile("DB/users.json", "utf-8")
        .then((data) => {
            res.json(JSON.parse(data))
        })

    const {name} = req.query
    const {age} = req.query
    if (name) {
        res.send(`hello ${name}`);
        return;
      } else if (age) {
        res.send(`Im ${age} years old`);
        return;
      }


})

app.get('/users/:id', (req, res) => {

    fs.readFile("DB/users.json", "utf-8")
    .then((data) => {
        const users = JSON.parse(data)
        const {id} = req.params
        const user = users.find((user) => user.id === id)
        res.json(user)
    })
//id համեմատության ժամանակ խնդիր կա string === number չեմ հիշում դզելու ձևը 

})



app.listen(3000, () => {
    console.log("Server ON");

})