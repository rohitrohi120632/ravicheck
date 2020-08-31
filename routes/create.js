const express =require('express')
const router = express.Router()
const reg = require('../model/reg')

const multer = require('multer');


const storage =multer.diskStorage({
  destination: function (req, file, cb){
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }

});

const upload = multer({storage: storage});








module.exports = router