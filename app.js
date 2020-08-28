const express =require('express')
const mongoose = require ('mongoose')
const url = 'https://ravi-api-check.herokuapp.com/Ravidbapi'
const app = express()


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const con = mongoose.connection

con.on('open', function(){
    console.log('connected')
})

app.use(express.json());

const registrationRouter = require ('./routes/regs')
app.use('/regs', registrationRouter)






app.listen(3000, ()=> {

    console.log('server started')
})