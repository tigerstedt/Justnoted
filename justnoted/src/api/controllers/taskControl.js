const database = require("../../services/dataHandler");

class TaskController {
    // All list item functions

    async createTask (task) {
        // Add a new list to the db
        try {
            console.log("Task: ", task);
            
            let response = await database.makeTask(task);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    }

    async getTasks() {
        try {
            let response = await database.getAllTasks();
            return response.rows[0].message;
        } catch (error) {
            console.error(error)
        }
    }

    async create () {
        // Add a new list item to the db
    }

    async update () {
        // Update an existing list item
        // Find the correct db row and update it
    }

    async delete() {
        // Delete an existing list item
        // Find the correct db row and delete it
    }
};

module.exports = TaskController;