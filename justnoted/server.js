//server config
const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const server = express();
const port = (process.env.PORT || 3000);
//database config

//const {Pool} = require('./node_modules/pg/lib');
//const db = new Pool({
  //connectionString: connectionString
//})

server.set('port', port);
//server.use(express.static('public'));
server.use(express.static('public'))
server.use(bodyParser.json());

//modules
const User = require("./modules/user");
//const DataHandler = require('./modules/dataHandler');
//const db = new DataHandler(connectionString);



const getUsers = async (req,res)=>{

  await db.connect();
  //where api is talking to database
  db.query("select * from public.users", (error, results) => {
    if (error) {
      //if status has an error then the error detected will return the error http code and the error message
      //res.status(error.status).send(error.msg)
      console.log(error);
    }
    //if status is ok, then return all the rows
    //res.status(200).json(results.rows)
    console.log(results.rows);

  })
  
}

server.post('/user', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;


  const newUser = new User(username, password);

   await newUser.create();
   res.status(200).json(newUser).end();
 
});



server.get("/", (req,res,next)=>{
  console.log("heisann");
  getUsers();

  res.status(200).send("Hello World").end();

});

//server.route("/users").get(getUsers);

server.listen(server.get('port'), function () {
     console.log('server running', server.get('port'));
});
