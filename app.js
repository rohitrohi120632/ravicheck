const express =require('express')
const mongoose = require ('mongoose')
const cors = require ('cors');


const port = process.env.PORT || 3000

require('dotenv/config');
const app = express()


mongoose.connect(
    process.env.DB_CONNECTION , 
 {useNewUrlParser: true,
     useUnifiedTopology: true },
 
 () => console.log('connected db')
 
 );

// con.on('open', function(){
//     console.log('connected')
// })

app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));

const registrationRouter = require ('./routes/regs')
app.use('/regs', registrationRouter)




//  const profile = require('./routes/profile')
//  app.use('/regs/profile', profile)




app.listen(port, ()=> {

    console.log('server started')
})