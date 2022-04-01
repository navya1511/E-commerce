const cloudinary = require("cloudinary")
const fs = require("fs")

const uploadImage = async (req , res)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({msg: 'No files were uploaded.'})
    }
    const file = req.files.file
    
    if(file.size > 1024*1024){
        removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})

        
    }
    console.log(file.mimetype)
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
        removeTmp(file.tempFilePath)
        return res.status(400).json({msg: "File format not supported"})
    }

    cloudinary.v2.uploader.upload(file.tempFilePath , {folder:"test"} , async (err , result)=>{
        if(err){
            throw err
            
        }
        removeTmp(file.tempFilePath)
        res.json({public_id:result.public_id  , url:result.secure_url})
    })
}
const removeImage = (req, res)=>{
    const {public_id} = req.body
    if(!public_id){
        return res.status(400).json({msg: "No images selected"})
    }
    cloudinary.v2.uploader.destroy(public_id , async (err , result)=>{
        if(err){
            throw err
        }
        res.json({msg:"Image deleted"})
    })
}

const removeTmp = (path)=>{
    fs.unlink(path , err =>{
        if(err){
            throw err
        }
    })
}

module.exports = {uploadImage , removeImage}