const User = require("./user");

const authenticator = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end()
    }

    const credentials = req.headers.authorization.split(' ')[1];
    console.log(credentials);
    const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");
    

    const hashPassword = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');

    console.log("logged in")

    const user = authenticate(username, hashPassword)
    console.log("user exists")
    if (!user) {
        return res.status(403).end()
    }
    req.user = user;
    
    next();

}
// If user is found in database, return user, if not return null
async function authenticate(username, password) {
    let response = await database.findUser(username, password);
    console.log(response);
    if (response){
        return response;
    }
    return null;
}


module.exports = authenticator