var express = require('express');
var data = require('./Dataset/notes.json');
var bodyParser = require('body-parser');
const fs = require('fs');

var app = express();


//Middleware Section
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Gets All notes
app.get("/api/", (req, res) => {
    res.status(200);
    res.json(data);
});

//Gets Note by ID
app.get("/api/note/:id", (req, res) => {
    console.log("Hit note id");
    let noteId = req.params.id;

    let found = data.filter(x => {
        return x.id == noteId;
    });

    if (found) {
        res.status(200);
        res.json(found[0])
    }
    else {
        res.status(404);
        res.json("Note does not exist !")
    }

});

//Create new note
app.post("/api/create", (req, res) => {
    let rawData = req.body;
    let postedNote = {
        "id": new Date().getTime(),
        "title": req.body.title,
        "timestamp": Date().toString().slice(4, 24),
        "author": req.body.author,
        "note": req.body.note
    }
    let returnval = postedNote;

    fs.readFile('Dataset/notes.json', function (err, notes) {
        if (err) {
            console.log(err);
            res.status(400);
            returnval = "Problem with API..Please try again later.";
        };
        var notes_JSON = JSON.parse(notes);
        notes_JSON.push(postedNote);

        fs.writeFile('Dataset/notes.json', JSON.stringify(notes_JSON), (err, result) => {
            if (err) {
                console.log(err);
                res.status(400);
                returnval = "Problem with API..Please try again later.";
            }
            else {
                res.status(200);
            }
        });
    });

    return res.json(returnval);
});

//Edit note by id
app.put("/api/note/:id", (req, res) => {

});

//Delete note by id
app.delete("/api/note/:id", (req, res) => {

});




//Runs Server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
}).on('error', console.log);