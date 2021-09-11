const S3 = require('aws-sdk/clients/s3')
require("dotenv").config();
const fs = require('fs')

// Uploads a file to S3
const s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

module.exports = {
    async uploadFileS3(req,res) {
        const fileStream = fs.createReadStream(req.path)    
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME+"/Posts",
            Body: fileStream,
            Key: req.filename
        }
    
        return s3.upload(uploadParams).promise()
        
    },

    async downloadFileS3(req,res) {
        const fileKey = req.params.key
        const filePath = req.params.path
        const downloadParams = {
            Key: fileKey,
            Bucket: process.env.AWS_BUCKET_NAME+'/'+filePath
        }
        return s3.getObject(downloadParams).createReadStream()
    }
}

// Downloads a file from S3