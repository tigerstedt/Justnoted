const database = require("../../services/dataHandler");

class UserController {
    // All user functions

    // Get all users in the database
    async getUsers() {
        try {
            let response = await database.getAllUsers();
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // Create a new user in the database
    async createUser(username, email, password) {
        try {
            console.log("username: ", username);
            console.log("email: ", email);
            console.log("password: ", password);
            
            let response = await database.insertUser(username, email, password);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = UserController;