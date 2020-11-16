const User = require("./user");

const authenticator = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end()
    }

    const credentials = req.headers.authorization.split(' ')[1];
    const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

    const loginUser = new User(username, password);
    const user = authenticate(loginUser.username, loginUser.password)
    if (!user) {
        return res.status(403).end()
    }
    req.user = user;
    next();
}
// If user is found in database, return user, if not return null
async function authenticate(username, password) {
    let response = await database.findUser(username, password);
    if (response){
        return response;
    }
    //if( username === "kalleKlovn" && password === "rød nese1"){
       // return {user="kalleKlovn", email="kalle@magiskoy.no", userID:23};
   // }
    return null;
}


module.exports = authenticator