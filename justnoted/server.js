//server config
const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const server = express();
const port = (process.env.PORT || 3000);
//database config
const connectionString = `postgresql://postgres:pass@localhost:5432/postgres`
const {Pool} = require('./node_modules/pg/lib');
const db = new Pool({
  connectionString: connectionString
})

server.set('port', port);
server.use(express.static('public'));
server.use(bodyParser.json());

const getUsers = (req,res)=>{
  //where api is talking to database
  db.query("select * from users", (error, results) => {
    if (error) {
      //if status has an error then the error detected will return the error http code and the error message
      res.status(error.status).send(error.msg)
    }
    //if status is ok, then return all the rows
    res.status(200).json(results.rows)
  })
}

server.get("/", (req,res,next)=>{

  res.status(200).send("Hello World").end();

});

server.route("/users").get(getUsers);

server.listen(server.get('port'), function () {
     console.log('server running', server.get('port'));
});
