var DataDate = require('../models/model.datadates')

module.exports = {
  getDataDates: getDataDates,
  postDataDate: postDataDate,
  getDataDate: getDataDate,
  deleteDataDate: deleteDataDate,
  updateDataDate: updateDataDate
}

function getDataDates(req, res) {
    let query = DataDate.find({});

    if(req.query.letter && req.query.frequency){
        query = DataDate.find({
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
        query = DataDate.find({
            letter: {$in: req.query.letter}
        })
    } else if(req.query.frequency){
        query = DataDate.find({
            frequency: {$in: req.query.frequency}
        })
    }

    query.exec((err, items) => {
        if (err) res.send(err);
        res.json(items);
    });
}

function postDataDate(req, res) {
    var newData = new DataDate(req.body);
    newData.save((err, item) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "Data date successfully added!", item });
        }
    });
}

function getDataDate(req, res) {
    DataDate.findById({ _id: req.params.id }, (err, item) => {
        res.json({ item });
    });
}

function deleteDataDate(req, res) {
    DataDate.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Data date successfully deleted!", result });
    });
}

function updateDataDate(req, res) {
    DataDate.findById({ _id: req.params.id }, (err, item) => {
        if (err) res.send(err);
        Object.assign(item, req.body).save((err, item) => {
            if (err) res.send(err);
            res.json({ message: 'Data date updated!', item });
        });
    });
}