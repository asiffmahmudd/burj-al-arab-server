const express = require('express')
const cors = require('cors');

const app = express()
// app.use(cors);
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));
app.use(express.json())

const port = 5000

app.get('/', (req, res) => {
    res.send(true)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})