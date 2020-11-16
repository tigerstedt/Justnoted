class List {

    constructor(title, userId) {
        // Specify attributes here like these below
        this.title = title;
        this.shareable = false;
        this.userAccess = [userId];
    }
}

module.exports = List;