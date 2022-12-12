const express = require('express')
const path= require("path");
const colors=require('colors')
const dotenv = require('dotenv').config()
const {errorHandler}= require('./middleware/errorMiddleware')
const  connectDB=require('./config/db')
const cors = require("cors");
const bodyParser=  require("body-parser")

const port=process.env.PORT || 5000


connectDB()

const app =express()

app.use(express.json())
app.use(cors());//added new
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json({limit: '5mb'}));

app.use(bodyParser.urlencoded(
    { extended:true }
))

app.use('/api/goals', require('./routes/movieRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/comment', require('./routes/commentRoutes'))
app.use('/api/list', require('./routes/listRoutes'))
app.use('/api/vote', require('./routes/voteRoutes'))
app.use('/api/upload', require('./routes/uploadRoutes'))
app.use('/api/profile', require('./routes/profileRoutes'))

app.use('/api/activity', require('./routes/activityRoutes'))

app.use(errorHandler)

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req,res)=>res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}
else{
    app.get('/', (req,res)=>res.send('set!'))
}


app.listen(port, ()=>console.log(`server started on port ${port}`))