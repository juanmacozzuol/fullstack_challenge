import multer from 'multer'
import __dirname from './dirname.js'
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,__dirname+'../../../public/img')
    },
    filename: function(req,file,cb){
        cb(null,req.body.email + '.jpg')
    }
})

export const uploader = multer({storage})