const userDataModel = require('./userModel')
const userAuthentication = require('../common/authenticator')
const uuid = require('uuid/v1')

const userAuthController = async (request) => {
    const userCredentials = request.payload
    try {
        if (userCredentials.username && userCredentials.password) {
            const userAuth = new userDataModel(userCredentials.username, userCredentials.password)
            const user = await userAuth.findUser()
            if (user[0]['_id']) {
                const userAuthToken = new userAuthentication()
                userAuthToken.setToken(uuid())
                return { login: "success", token: userAuthToken.getToken() }
            } else {
                return { login: "failure", status: "user not available" }
            }
        } else {
            return { login: "failure" }
        }
    } catch (e) {
        return e
    }
}

const userDataController = async (request) => {
    return "Hello"
} 

module.exports = { userAuthController, userDataController }