const multer = require("multer");
const upload = multer({dest:'uploads/'});

module.exports = (req,res,next)=>{
    upload.single('image');
    next();
    
}