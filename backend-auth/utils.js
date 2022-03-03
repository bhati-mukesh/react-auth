const jwt = require('jsonwebtoken')
const refreshTokenKey = 'mySecKey-refresh'
const accessTokenKey = 'mySecKey-access'

const generateAccessToken = async(user) => {
    const accessToken = jwt.sign({ id: user.id, username: user.name, isAdmin: user.isAdmin }, accessTokenKey, {
        expiresIn: '30s'
    } )
    return accessToken
}

const generateRefreshToken = async(user) => {
    const refreshToken = jwt.sign({ id: user.id, username: user.name, isAdmin: user.isAdmin }, refreshTokenKey, {
        expiresIn: '1m'
    } )
    return refreshToken
}

const verifyRefreshToken = async(token) => {
    try{
        const user = await jwt.verify(token, refreshTokenKey)
        return user
        }catch(error){
            console.log(error)
            return null
        }
}


const verifyAccessToken = async(token) => {
    try{
        const user = await jwt.verify(token, accessTokenKey)
        return user
        }catch(error){
            console.log(error)
            return null
        }
}

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken,verifyAccessToken }