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
        "type": "service_account",
        "project_id": "burj-al-arab-4e76e",
        "private_key_id": "b4fe3b0d62f09bacc0dff76e5f4bae5891bddcc3",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+2zdrL5Ctu3xM\nxq610tlIf4kwtOR6LwBTz2sAonFNVBpn7GYJO7/XSnKiDJWCPyWJ6JIOin+ygYBS\nX4o00sXcVR99HM9VMlBB9Batbj+XDlSxalsI9HZmrH6oiY3S8gN7gf8Mfty/WamK\nq/Efn245XIFOUww9dbxWTWpqXv30b4qK0Ow3oYpnwSwOeI/Bzf3GJl061/Sh87/M\nF4HKdqkDz/L7YmBhB0/2H7o+ZHtzunE7J7LodxODj5cKhJDZHyVlSr2ccHkYHmLZ\nLAXeF3WZ4H2rIZ2aldsIk7XkXe0Lrw+MYdKfxnxW1mochracyhhyWjzLPRnINsLQ\nFKLK1/ktAgMBAAECggEAK7ENl8kUyuDfzMezGUbCnTktE+xlXZ9C6OzT5xpI69X0\nEZRpq3V1LnkJkxVkaKPCGTcXsKJ+J0RENxdOEVerGgyWn9KnmC5jdyXEx0E054TN\nWKwrWPp13H1ipXyP7hmfOHgDBj5IlLmW+XrxQTcDSbhmlaKna653Rh6E3QMQChPU\nk3ttEGRkfZXELk644KGAdvtBuxIFWHA3KimZ3Xp2W+Q3GUeC0r6OPU7IZHrNE8rl\nkkl6yT3nNnNuusj8+LuLY9pxFjryz7TMTg7UeCKR25J1jKOjGvlmKRmQ2uo6WhJ/\nkZOVNR6mGMYwYZHWWiF3N7p3N/LQll3LExLDqgMFQQKBgQD/g6pDndqe/AbYkB+o\nUJI/ncHB+q7RhjcZimL6lKYXyjkzFVsZyo05wwx9pG8Wjsz5KIn00/pZcwktK44v\n1awJE+Zh+Tk6x7aTOI8U6VM0+frbPnewgmFRC/g7n4vVrvnBbtcs9Qb6G76I8UrS\nARrTX7LqzvSWw18W6ZTzeUJ2kQKBgQC/OBage0+zXk/N4xLFXGjj+pDbO3SZzz/1\nPGtpYd3Pp0L8e1JNFaSTEhvKYCC+CiSce4mJ0e3DW6S/usJOWd3A/RXZ183cLBFE\nGocXXbjWVc2OX5txnUo9vVdpvk9DQsHwJZNnfloZHS0wXRJuPatSf5LhHz7LLSOu\nRkKwLPi+3QKBgF90LZBTEVAhcOFIfjsf1nLjmXXBE7v8eusUssNP8viiOFooGT96\nVuYEQs9RNZrkwBg4l8kZw8XU3tG8GsMt/LXrdD6Xn1ShNUiscW9rdwUsehWbsZUE\nMBzZ7uM/SDsMwgsMQGBwLSoUYUrBcaUgeogKkUl9BQypcgWaP2Xxn+2xAoGAeETK\n1n04j9SN1S0xLTkGL/31Bi7LE8Kqs5Ag7tNDM8w78ZmPFjS6olYNbKgxb9XpWRLK\nWwjSxsDpSj4o4Cbdtvh3ueBl9kkxQuh8d1HXY9frxdSUbE1F2LcyN6wfJmrimCzK\nHZn3CTy0o2qmoPfgva7Hrxh74kat3nsKjsx6V3ECgYEAq28fexbT2vhwoAADpTK/\n/EhXyTNEAYggh3K2oIa2zWkH8TKgRo/kHQSNA57T+qcTdXCfXor0j2L9hyuZk9Lm\narGzw/lXntl78gLsVPcZUxErE/pdoRMQeFaRn4YPVm+npTqx/CgULQUsaLaV4eC9\n2Iz1qswuPtvGxMPNoOoslbc=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-b5f8x@burj-al-arab-4e76e.iam.gserviceaccount.com",
        "client_id": "105069366063229689986",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b5f8x%40burj-al-arab-4e76e.iam.gserviceaccount.com"
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

app.get('/', (req, res) => {
    res.send("it's working");
})

app.listen(process.env.PORT || port)