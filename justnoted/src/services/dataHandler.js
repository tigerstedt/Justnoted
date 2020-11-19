const pg = require("pg");
const dbCredentials = process.env.DATABASE_URL || require("../../localenv").connectionString;

class DataHandler {

    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    // --- User queries ---

    async insertUser(username, email, password) {
        // Connect to database
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."users"("username", "email", "password") VALUES($1, $2, $3) RETURNING *;', [username, email, password]);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    //LAGA
    async getAllUsers() {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT * FROM "public"."users";');
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    async findUser(username, email, password) {

        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT * FROM "public"."users" WHERE username = $1 AND email = $2 AND password = $3;', [username, email, password]);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;

    }

    async makeList(listTitle) {
        // Connect to database
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."lists"("listTitle") VALUES($1) RETURNING *;', [listTitle]);
            results = results.rows[0]
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    async makeTask(task) {
        // Connect to database
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."tasks"("task") VALUES($1) RETURNING *;', [task]);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }
//LAGA
    async getAllTasks() {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT * FROM "public"."tasks"');
            results = results.rows[0].message;
            console.log(results);
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
   //async insert(...params) {
        //const client = new pg.Client(this.credentials);
        //let results = null;
        //try {
            //await client.connect();
            //results = await client.query('INSERT INTO "public"."$1"("username", "email", "password") VALUES($3, $4) RETURNING *;', params);
            //results = results.rows[0].message;
            //client.end();
        //} catch (err) {
           // client.end();
           // results = err;
       // }

        //return results;
   // }
}

module.exports = new DataHandler(dbCredentials);
