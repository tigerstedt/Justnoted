const database = require("../../services/dataHandler");
const crypto = require('crypto');
const secret = process.env.hashSecret || require("../../../localenv").hashSecret;
/*
const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
*/
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        this.valid = false
    }
}

module.exports = User;