var express = require('express');
var app = express();
var dblink = "mongodb+srv://keerthana:hello123@cluster0.k3akd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var mongoose = require('mongoose');
mongoose.connect(dblink,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});


const connection = mongoose.connection;
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/relish',function(req,res){
  console.log("Get request");

mongoose.connect(dblink, function(err, db) {  
  if (err) throw err;  
  db.collection("contacts").find({}).toArray(function(err, result) {  
    if (err) throw err;  
    console.log(result); 
    res.json(result); 
      });  
    });  
}); 

app.post('/relish',function(req,res){
	console.log(req.body);
	connection.collection('contacts').insertOne(req.body,function(err,doc){
		res.json(doc);
	});
}); 

app.delete('/relish/:id', function(req,res){
var id = req.params.id;
console.log(id);

connection.collection('contacts').deleteOne({_id:mongoose.mongo.ObjectId(id)}, function(err,obj){
if(err) throw err;
console.log(obj.result.n+" record deleted");
res.json(obj);
});
}); 

app.get('/relish/:name',function(req,res){
  var id=req.params.name;
  console.log(id); 
  
  mongoose.connect(dblink, function(err, db) {  
   
  db.collection("contacts").find({name:id}).toArray(function(err, result) {  
    console.log(result); 
    res.json(result); 
      });  
    }); 
     
});

app.get('/relish/edit/:id', function(req,res){
var id=req.params.id;
console.log(id);
connection.collection('contacts').findOne({_id:mongoose.mongo.ObjectId(id)}, function(err,doc){
res.json(doc);
console.log(doc);
});
});


app.put('/relish/:id',function(req,res){
 var id= req.params.id;
 console.log(req.body.name);
 connection.collection('contacts').findOneAndUpdate({_id:mongoose.mongo.ObjectId(id)}, {$set:{name:req.body.name, prep:req.body.prep, ingre: req.body.ingre, method: req.body.method}}, {new: true}, function(err,doc){
       res.json(doc);
 	});
});

app.listen(1000);
console.log("Server running on port 1000");
