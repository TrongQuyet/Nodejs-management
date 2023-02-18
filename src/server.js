
import express from 'express'
import initwebroute from'./route/web.js'
import initapi from './route/api.js'
// import connectdb from './configs/connectDB'
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3005

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

initwebroute(app)
initapi(app)

app.use(express.static('./src/public'))
app.set("view engine", "ejs");
app.set("views","./src/views");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})