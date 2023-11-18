const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.post('/login', function (req, res) {
    let userID = req.body.userID
    let password = req.body.password
    const MongoClient = require("mongodb").MongoClient
    // const url = 'mongodb://localhost:27017/'
    const url = 'mongodb+srv://shalinibasker0326:SlnAW7Rj3IZdatnH@cluster0.vxmvgo2.mongodb.net/?retryWrites=true&w=majority'
    MongoClient.connect(url)
        .then(
            function (db) 
            {
                var dbo = db.db('movements')
                var query = {userID: userID}
                dbo.collection("credentials").findOne(query)
                    .then(function (result) {
                        if(result){
                            if(result.password === password){
                                res.send("<h1>Login success</h1>")
                            }
                            else{
                                res.send("<h1>Invalid credentials</h1>")
                                
                            }
                        }
                        else{
                            res.send("<h1>User doesn't exist</h1>")
                        }
                        db.close();
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.send("<h1>Login failure</h1>")
                    })
            }).
        catch(function (err) {
            console.log(err)
        })
})
app.post('/signup', function(req,res){
    let uname = req.body.uname
    let userID = req.body.userID
    let email = req.body.email
    let password = req.body.password
    const MongoClient = require('mongodb').MongoClient
    // const url = 'mongodb://localhost:27017/'
    const url = 'mongodb+srv://shalinibasker0326:SlnAW7Rj3IZdatnH@cluster0.vxmvgo2.mongodb.net/?retryWrites=true&w=majority'
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo = db.db('movements')
            var query = {userID:userID}
            var in_query = {uname:uname,userID:userID,email:email,password:password}
            dbo.collection("credentials").findOne(query)
            .then(function(result){
                if(result){
                    res.send("<h1>User ID_taken</h1>")
                    db.close()
                }
                else{
                    dbo.collection("credentials").insertOne(in_query)
                    .then(function(result){
                        res.send("<h1>success</h1>")
                        db.close()
                    })
                    .catch(function(err){
                        console.log(err)
                        res.send("<h1>Signup Failure</h1>")
                    })
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }
    )
    .catch(function(err){
        console.log(err)
    })
})

app.post('/InsertWhiteBlack' , function(req,res){
    let val = req.body.val
    let sno = req.body.sno
    const MongoClient = require("mongodb").MongoClient
    // const url = 'mongodb://localhost:27017/'
    const url = 'mongodb+srv://shalinibasker0326:SlnAW7Rj3IZdatnH@cluster0.vxmvgo2.mongodb.net/?retryWrites=true&w=majority'
    MongoClient.connect(url)
    .then(
        function(db)
        {
            var dbo = db.db('movements')
            var newval = { $set: { white: val } };
            var query = { sno: sno };
            dbo.collection("pvsc").updateOne(query,newval)
            .then(function(){
                console.log(val + " white updated");
                dbo.collection('pvsc').findOne(query)
                .then(function(result) {
                console.log(result);
                res.json({ message: 'updated', data: result });
                })
                .catch(function(err) {
                console.log(err);
                res.status(500).json({ message: 'Error fetching updated data' });
                });
            })
            .catch(function(err){
                console.log(err)
            })
        })
        .catch(function(err){
            console.log(err)
        })
})

app.post('/Insert' , function(req,res){
    let val = req.body.val
    let sno = req.body.sno
    const MongoClient = require("mongodb").MongoClient
    // const url = 'mongodb://localhost:27017/'
    const url = 'mongodb+srv://shalinibasker0326:SlnAW7Rj3IZdatnH@cluster0.vxmvgo2.mongodb.net/?retryWrites=true&w=majority'
    MongoClient.connect(url)
    .then(
        function(db)
        {
            var dbo = db.db('movements')
            var query = {sno:sno , white : val , black : ""}
            dbo.collection("pieceMovements").insertOne(query)
            .then(function(){
                console.log(val + " white updated");
                res.send("white updated")
            })
            .catch(function(err){
                console.log(err)
            })
        })
        .catch(function(err){
            console.log(err)
        })
})


app.post('/Update', function(req, res) {
    let val = req.body.val;
    let sno = req.body.sno;

    const MongoClient = require("mongodb").MongoClient;
    // const url = 'mongodb://localhost:27017/'
    const url = 'mongodb+srv://shalinibasker0326:SlnAW7Rj3IZdatnH@cluster0.vxmvgo2.mongodb.net/?retryWrites=true&w=majority'

    MongoClient.connect(url)
        .then(function(db) {
            var dbo = db.db('movements');
            var query = { sno: sno };
            var newval = { $set: { black: val } };

            dbo.collection("pieceMovements").updateOne(query, newval)
                .then(function() {
                    console.log(val + " black updated");
                    
                    // Fetch the updated document after the update
                    dbo.collection('pieceMovements').findOne(query)
                        .then(function(result) {
                            console.log(result);
                            res.json({ message: 'black updated', data: result });
                        })
                        .catch(function(err) {
                            console.log(err);
                            res.status(500).json({ message: 'Error fetching updated data' });
                        });
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(500).json({ message: 'Error updating black' });
                });
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json({ message: 'Error connecting to the database' });
        });
});


app.listen(5000,function(){
    console.log("Server is running on port 5000")
})