var fs = require('fs');
var mongoose = require('mongoose');
var DataDate = require('../models/dataDate');

mongoose.connect('mongodb://localhost:27017/cmsdb');

var list = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));

for(var i = 0; i < list.length; i++){
  list[i].letter = new Date(list[i].letter);
}

DataDate.collection.insert(list, function(err){
  if(err){
    console.log(err);
    process.exit(1);
  }
  console.log("berhasil seed data");
  process.exit();
});
