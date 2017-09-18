// Include fs (short for filesystem) at the top. No need to install via npm.
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

// tell your app to use the module
app.use(bodyParser.urlencoded({extended: false}));

// Express index route for animals (lists all animals)
app.get('/animals', function(req, res) {
  var animals = fs.readFileSync('./data.json');
  animals = JSON.parse(animals);
  res.render('animals/index', {myAnimals: animals});
});

//express show route for animals (shows one animal)
app.get('/animals/:idx', function(req, res) {
  // get animals
  var animals = fs.readFileSync('./data.json');
  animals = JSON.parse(animals);
  //get array index from url parameter
  var animalIndex = parseInt(req.params.idx);
  //render page with data of the specified animal
  res.render('animals/show', {myAnimal: animals[animalIndex], id: animalIndex});
});

// backend - express route
app.post('/animals', function(req, res) {

  // debug code (output request body)
  // console.log(req.body);
  // res.send(req.body);

  // read animals file
  var animals = fs.readFileSync('./data.json');
  animals = JSON.parse(animals);

  // add item to animals array
  animals.push(req.body);

  // save animals to the data.json file
  fs.writeFileSync('./data.json', JSON.stringify(animals));

  //redirect to the GET /animals route (index)
  res.redirect('/animals');
});

app.delete('/animals/:name', function(req, res) {
  var animalToDelete = req.params.name;

  // delete animal here
  // Read the file into an object
  var animals = fs.readFileSync('./data.json');
  animals = JSON.parse(animals);
  // Remove the element with the matching name
  animals = animals.filter(function(item) {
    return (item.name !== animalToDelete);
  });

  // Write the object back to the file
  fs.writeFileSync('./data.json', JSON.stringify(animals));
  res.send({message: 'success'});
  // res.redirect('/animals');
});

app.put('/animals/:id', function(req, res) {
  var animalId = req.params.id;
  // console.log(req.body.name);
  // console.log(req.body.type);
  // console.log(req.params.id);

  // Edit team here
  // Read the file into an object
  var animals = fs.readFileSync('./data.json');
  animals = JSON.parse(animals);

  animals[animalId].name = req.body.name;
  animals[animalId].type = req.body.type;
  console.log(animals);

  // Write the object back to the file
  fs.writeFileSync('./data.json', JSON.stringify(animals));
  res.send({message: 'success'});
});


app.listen(3000);
