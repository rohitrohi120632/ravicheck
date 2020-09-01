const express =require('express')
const router = express.Router()
const reg = require('../model/reg')
const multer = require  ('multer')
const path = require ('path')
const fs = require ('fs')
const { db } = require('../model/reg')






const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads')
    },
    filename: function (req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
})


const upload = multer({
    storage:storage
})




//single file upload

router.post('/uploadimage', upload.single('profileImage'), (req,res,next) => {

    const file =req.file;
    if(!file) {
        const error =new Error ("please upload")
        error.httpStatusCode = 400
        return next (error);
    }
    res.send (file);
})

// multiple files
router.post('/uploadmultiple', upload.array('profileImages', 12), (req, res,next)=> {

    const files = req.files;

    if(!files){
        const error = new Error ("please upload files");
        error.httpStatusCode = 400;
        return next (error);
    }
    res.send(files);
})


//configuring image upload to db

router.post('/uploadphoto', upload.single('myImage'), (req,res)=> {

    const img = fs.readFileSync(req.file.path);
    const encode_img = img.toString('base64');

    //define a json object for the image

    const finalImg = {
        contentType:req.file.mimetype,
        path:req.file.path,
        image:new Buffer(encode_img, 'base64')
    };

    //insert the image to the db

     db.collection('imagestore').insertOne(finalImg,(err,result)=>{
         console.log(result);
          if(err) return console.log(err);

          console.log('saved to db');

     //fetching img in another window

     res.contentType(finalImg.contentType);
     res.send(finalImg.image);
         


     })

})






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



router.post('/create',
//upload.single('profImg'), 
async (req,res) => {
 
console.log(req.file);
    const re = new reg ({
               first_name:req.body.first_name,
               last_name:req.body.last_name,
               email:req.body.email,
               mobile: req.body.mobile,
              //with image and details
             // profileimage:req.file.filename
           
        
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
