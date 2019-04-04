const uuid = require('uuid/v1')

class userAuthentication {
    constructor(userAuthToken) {
        if (userAuthentication.isTrue) {
            return userAuthentication.instance
        }
        this._userAuthToken = userAuthToken
        console.log(userAuthToken)
        userAuthentication.instance = this
        userAuthentication.isTrue = true
    }
    getToken() {
        return this._userAuthToken
    }
    setToken(userAuthToken) {
        this._userAuthToken = userAuthToken
    }
}

module.exports = userAuthentication