const express = require("express");
var bodyParser = require("body-parser");
const app = express();

doctors = [];
var docID = 1;
var revID = 1;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("Hello, world!"));

app.listen(3000, ()=>console.log("Listening on port 3000!"));

app.post('/doctors', function(req,res) {
  res.send("got em");
  var doc = req.body.doctor;
  doc.id = docID;
  doc.reviews = [];
  docID++;
  doctors.push(doc);
  console.log(doctors);
});

app.post('/doctors/:id/reviews', function(req, res) {
  var review = req.body.review;
  var doc;
  for (var i = 0; i<doctors.length; i++) {
    if (doctors[i].id == req.params.id && doctors[i]!=null) {
      doc = doctors[i];
      var rev = {};
      rev.id = revID;
      rev.description = req.body.review.description;
      rev.doctor_id = req.params.id;
      revID++;
      doc.reviews.push(rev);
      res.send("Added review");
      return;
    }
  }
  res.send("No doc found with that ID");
});

app.get('/doctors/:id', function(req, res) {
  for (var i = 0; i<doctors.length; i++) {
    if (doctors[i].id == req.params.id && doctors[i]!=null) {
      res.send(doctors[i]);
      return;
    }
  }
  res.send("Not found");
});

app.get('/doctors', function(req, res){
  res.send(doctors);
});

app.get('/doctors/:id/reviews', function(req, res) {
  var docID = req.params.id;
  for (var i = 0; i<doctors.length; i++) {
    if (doctors[i].id == docID && doctors[i]!=null) {
      res.send(doctors[i].reviews);
      return;
    }
  }
  res.send("Couldn't find that doc");
});

app.delete('/doctors/:id/reviews/:rID', function(req, res) {
  var docID = req.params.id;
  var revID = req.params.rID;
  for (var a = 0; a<doctors.length; a++) {
    if (doctors[a].id == docID && doctors[a]!=null) {
      for (var b = 0; b<doctors[a].reviews.length; b++) {
        if (doctors[a].reviews[b].id == revID && doctors[a].reviews[b]!=null) {
          delete doctors[a].reviews[b];
          res.send("succesfully deleted");
          return;
        }
      }
    }
  }
  res.send("Couldn't find that review");
});

app.delete('/doctors/:id', function(req, res) {
    var docID = req.params.id;
    for (var i = 0; i<doctors.length; i++) {
      if (doctors[i].id == docID && doctors[i]!=null) {
        delete doctors[i];
        res.send("Succesfully deleted");
        return;
      }
    }
    res.send("Couldn't find that doc");
    return;
});
