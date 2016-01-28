var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var userArr = [];

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var exist = false;
app.get('/api/users:name', function (req, res) {
    console.log("****GET****")
    console.log(req.params.name.substr(1));
    for (var i = 0; i < userArr.length; i++) {
        if (userArr[i]["username"] === req.params.name.substr(1)) {
            exist = true;
            res.send('User Name is ' + userArr[i]["username"]);

            break;
        }
    }
    if (!exist) {
        res.send("No User");
    }
    exist = false;
    console.log("***********\n");
});

app.post('/api/users', function (req, res) {
    if (req.body === undefined) {

    }
    else {
        userArr.push(req.body);
        console.log("****POST****");
        console.log(userArr);
        console.log("************\n");
    }
});

app.all("/*", function (req, res) {
   
    console.log("ALL");
    console.log(req.url);
    if (req.url.match("/api/users*") == null) {
        res.send("404 Page Not Found");
    }    
});

app.listen(3000, function () {
    console.log("Waiting");
});