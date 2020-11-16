const pg = require("pg");
const dbCredentials = process.env.DATABASE_URL || require("../localenv").credentials;
const connectionString = `postgres://pqkgtsczwiwksp:2c9feaa70553f9a7ba683155029571a7ce66ba131e9087d4a732d2e7ac534040@ec2-34-253-148-186.eu-west-1.compute.amazonaws.com:5432/dadiq9r6dkjahd`;

class DataHandler {

    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    async insertUser(username, password) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."users"("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
    async insert(...params) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."$1"("username", "password") VALUES($2, $3) RETURNING *;', params);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            results = err;
        }

        return results;
    }


}

module.exports = new DataHandler(connectionString);
