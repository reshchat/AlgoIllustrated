// console.log("Welcome to AlgoIllustrated")
const express = require('express'); //importing the express dependency
const app = express();              //instantiate an express app, the main work horse of this server
const port = 3030;                  //port number where server will be listening

app.set('view engine', 'ejs');      //set the view engine to ejs, this will allow us to use ejs templating

//expression in express to route and respond to a client request
// app.get('/', (req, res) => {        //get requests to the root ("/") will route here
//     res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
//                                                         //the .sendFile method needs the absolute path to the file 
// });

app.get('/', (req, res) => {       
    res.render('pages/home');    
                                                       
});
app.get('/graph_simulation', (req, res) => {       
    res.render('pages/graph_simulation');    
                                                       
});
app.get('/graph_interaction', (req, res) => {       
    res.render('pages/graph_interaction');    
                                                       
});
app.get('/shortpath_simulation', (req, res) => {
    res.render('pages/shortpath_simulation');

});
app.get('/shortpath_interaction', (req, res) => {
    res.render('pages/shortpath_interaction');

});
app.get('/dp_simulation', (req, res) => {       
    res.render('pages/dp_simulation');    
                                                       
});
app.get('/dp_interaction', (req, res) => {       
    res.render('pages/dp_interaction');    
                                                       
});
app.get('/stacks', (req, res) => {       
    res.render('pages/stacks');    
                                                       
});
app.get('/sorting_simulation', (req, res) => {       
    res.render('pages/sorting_simulation');    
                                                       
});
app.get('/sorting_interaction', (req, res) => {       
    res.render('pages/sorting_interaction');    
                                                       
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

//change this directory
//app.use(express.static("C:/Users/user/AlgoIllustrated"));
app.use(express.static('./'));
