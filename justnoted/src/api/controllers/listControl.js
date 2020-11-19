const database = require("../../services/dataHandler");

class ListController {
    // All list functions
    
    async createList (listTitle) {
        // Add a new list to the db
        try {
            console.log("Listname: ", listTitle);
            
            let response = await database.makeList(listTitle);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    }

    async update () {
        // Update an existing list
        // Find the correct db row and update it
    }

    async delete () {
        // Delete an existing list
        // Find the correct db row and delete it
    }
}

module.exports = ListController;