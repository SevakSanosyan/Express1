const fs = require('fs').promises
const express = require('express')
const app = express()
const { getNameMDLWR, getageMDLWR } = require('./middlewares/name.js');

app.get('/', (req, res) => {
    res.set({
        'content-type': "text/html",
        "Cache-Control": "no-store"
    })
    res.status(200)
    res.sendFile(__dirname + '/index.html')
})

app.get('/users', [getNameMDLWR, getageMDLWR], async (req, res) => {
    res.set({
        'content-type': "application/json",
        "Cache-Control": "no-store"
    });

    res.status(200);

    const data = await fs.readFile("DB/users.json", "utf-8");
    res.json(JSON.parse(data));
});

app.get('/users/:id', (req, res) => {

    fs.readFile("DB/users.json", "utf-8")
    .then((data) => {
        const users = JSON.parse(data)
        const {id} = req.params
        const user = users.find((user) => user.id === +id)
        res.json(user)
    })


})

app.use((req, res, next) => {
    res.send("<h1>Error</h1>")
})

app.listen(3000, () => {
    console.log("Server ON");

})