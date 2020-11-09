const express = require('express')
const dotenv = require('dotenv').config()
const fetch = require('node-fetch')
const app = express()

app.use(express.json())

app.get('/login', async (req, res) => {
    const data = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/login',
        code: req.query.code,
        scope: 'identify guilds',
    };

    let response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    let user = await response.json()

    if (user) {
        let response = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${user.token_type} ${user.access_token}`
            }
        })
        res.json(await response.json())
    }
})

app.get('/test', (req, res) => {
    res.json([{username: "ahmed", password:"123456789"}, {username: "ilyes", password:"123dadadafzegfz"}])
})


app.listen(process.env.PORT)