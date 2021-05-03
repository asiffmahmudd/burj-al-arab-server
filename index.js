const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a3ov0.mongodb.net/burjAlArab?retryWrites=true&w=majority`;
const port = 4000;
const admin = require("firebase-admin");

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));
app.use(express.json()) 
app.use(bodyParser.json());




// var serviceAccount = require("./config/burj-al-arab-4e76e-firebase-adminsdk-b5f8x-b4fe3b0d62.json");
admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.JWT_TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
    }),
    databaseURL: process.env.DB_URL
  });

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("burjAlArab").collection("bookings");
    app.post('/addbooking', (req, res) => {
        const newBooking = req.body;
        
        collection.insertOne(newBooking)
        .then(function(result) {
            res.send(result.insertedCount > 0);
        })
    })

    app.get('/bookings', (req, res) => {
        const bearer = req.headers.authorization;
        if(bearer && bearer.startsWith('Bearer ')){
            const idToken = bearer.split(' ')[1];
            admin.auth().verifyIdToken(idToken)
            .then((decodedToken) => {
                const tokenEmail = decodedToken.email;
                const queryEmail = req.query.email;
                if(queryEmail == tokenEmail){
                    collection.find({email : queryEmail})
                    .toArray((err, documents) => {
                        res.status(200).send(documents);
                    });
                }
                else{
                    res.status(401).send("Unauthorized access");
                }
            })
            .catch((error) => {
                res.status(401).send('un-authorized access')
            });
        }
        else{
            res.status(401).send("Unauthorized access");
        }
        
    })
});

app.listen(process.env.PORT || port)