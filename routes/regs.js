const express =require('express')
const router = express.Router()
const reg = require('../model/reg')
const multer = require  ('multer')








router.route("/")
.get( async (req,res)=> {

    try{

       const regs = await reg.find()
        res.json(regs)
        
        
            }catch(err){
                res.send('Error' + err)
        
            }
})




router.get('/:id', async(req,res)=> {

    try{
 
 const re = await reg.findById(req.params.id,'_id productImage')
 res.json(re)
 
 
    }catch(err){
        res.send('Error' + err)
 
    }
 })



router.post('/create', async (req,res) => {
 
console.log(req.file);
    const re = new reg ({
             first_name:req.body.first_name,
               last_name:req.body.last_name,
             email:req.body.email,
              mobile: req.body.mobile,
           
        
          })
          try{

               const r1 = await re.save()
                res.json(r1 )
              
            }catch(err){
            
              res.send('error')
            }


})



















router.patch('/:id', async (req, res) => {

try{
    const re =await reg.findById(req.params.id)
    re.first_name = req.body.first_name
    re.last_name = req.body.last_name
    re.mobile=req.body.mobile
    re.email = req.body.email
    const r1 = await re.save()
    res.json(r1)
}catch(err){
    res.send('error')

}

})




    
router.delete('/:id', async (req, res) => {
    try{
        const re = await reg.remove({_id: req.params.id});
       
        res.json(re);
    }catch (err){
        res.json({message: err});
    }
    });

module.exports = router
