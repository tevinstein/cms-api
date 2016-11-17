var Data = require('../models/model.datas')

module.exports = {
  getDatas: getDatas,
  postData: postData,
  getData: getData,
  deleteData: deleteData,
  updateData: updateData
}

function getDatas(req, res) {
    let query = Data.find({});

    if(req.query.letter && req.query.frequency){

        query = Data.find({
            $and: [
            {
                letter: {$in: req.query.letter}
            },
            {
                frequency: {$in: req.query.frequency}
            }
            ]
        })
    } else if(req.query.letter){
        query = Data.find({
            letter: {$in: req.query.letter}
        })  
    } else if(req.query.frequency){
        query = Data.find({
            frequency: {$in: req.query.frequency}
        })
    }

    query.exec((err, items) => {
        if (err) res.send(err);
        res.json(items);
    });
}

function postData(req, res) {
    var newData = new Data(req.body);
    newData.save((err, item) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "Data successfully added!", item });
        }
    });
}

function getData(req, res) {
    Data.findById({ _id: req.params.id }, (err, item) => {
        res.json({ item });
    });
}

function deleteData(req, res) {
    Data.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Data successfully deleted!", result });
    });
}

function updateData(req, res) {
    Data.findById({ _id: req.params.id }, (err, item) => {
        if (err) res.send(err);
        Object.assign(item, req.body).save((err, item) => {
            if (err) res.send(err);
            res.json({ message: 'Data updated!', item });
        });
    });
}