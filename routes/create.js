const express =require('express')
const router = express.Router()
const reg = require('../model/reg')






router.route("/")
.get( async (req,res)=> {

    try{

       const regs = await reg.find()
        res.json(regs)
        
        
            }catch(err){
                res.send('Error' + err)
        
            }
})




router.route("/")
.post( async (req,res) => {

    const re = new reg ({
             first_name:req.body.first_name,
               last_name:req.body.last_name,
             email:req.body.email,
              mobile: req.body.mobile
        
          })
          try{

               const r1 = await re.save()
                res.json(r1)
              
            }catch(err){
            
              res.send('error')
            }


})


module.exports = router