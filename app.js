const express = require('express');
const bodyParser = require('body-parser')
var couchbase = require('couchbase')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var cluster = new couchbase.Cluster("couchbase://localhost");
cluster.authenticate('Administrator','cooper');
var bucket = cluster.openBucket("kanban");
module.exports.bucket = bucket;

var routes = require("./routes.js")(app)
var port = 4500;
var server = app.listen(port,function (){

     console.log(`listening on port ${port}`)
})// end 