const express = require('express');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('./middleware');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('./utils');
const cors = require('cors')
var morgan = require('morgan')


const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan('tiny'));
const users = [
    {
        id: "1",
        name: "Mukesh",
        password: "12345678",
        isAdmin: true
    },
    {
        id: "1",
        name: "Omkar",
        password: "12345678",
        isAdmin: false
    },
]

const refreshTokens = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Ik11a2VzaCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzOTg0ODU2MiwiZXhwIjoxNjM5ODUzNTYyfQ.z8RH8BXSQAH-AMXsDg695yHHpGi4G0gdQ-pIm3nToEo'];

app.post('/api/login',async (req,res)=>{
    var waitTill = new Date(new Date().getTime() + 3 * 1000);
    while(waitTill > new Date()){}
    const { username, password } = req.body;
    const user = users.find(user => user.name === username && user.password === password);
    if(!user){
        return res.status(401).json({errorCode: "02", data: 'Invalid username / password'})
    }
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    return res.status(200).json({ data: { message: 'Login Success', accessToken, refreshToken } })
})

app.post("/api/token/refresh",async (req,res)=>{
    const refreshToken = req.body.token;
    if(!refreshToken) return res.status(403).json({errorCode: '05', message: 'UnAuthorized Access'})
    if(!refreshTokens.includes(refreshToken)) return res.status(403).json({errorCode: '05', message: 'UnAuthorized Access'})
    const user = await verifyRefreshToken(refreshToken);
    if(!user) return res.status(403).json({errorCode: '06', message: 'Token Expired'})
    const accessToken = await generateAccessToken(user);
    return res.status(201).json({data: { accessToken }})
})

app.get('/api/protect',isAuthenticated,(req,res)=>{
    return res.status(200).json({ data: {message: 'Granted Access'} })
})

app.use((req,res)=>{
    return res.status(404).json({ errorCode: '04', message: 'Not Found' })
})

app.listen(5000, ()=> console.log(`server up at http://localhost:${5000}`))