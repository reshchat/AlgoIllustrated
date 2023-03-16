// console.log("Welcome to AlgoIllustrated")
const express = require('express'); //importing the express dependency
const app = express();              //instantiate an express app, the main work horse of this server
const port = 3030;                  //port number where server will be listening

//expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file 
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

//change this directory
//app.use(express.static("C:/Users/user/AlgoIllustrated"));
app.use(express.static('./'));
