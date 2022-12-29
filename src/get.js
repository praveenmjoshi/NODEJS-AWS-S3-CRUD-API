const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

module.exports.handler = async (event) => {
    console.log(event);

    const response = {
        isBase64Encoded: false,
        statusCode: 200,
    }

    try{
        const params = {
            Bucket: BUCKET_NAME,
            Key: decodeURIComponent(event.pathParameters.fileKey),
        }

        const data = await s3.getObject(params).promise();
        response.body = JSON.stringify({ message: "Successfully retrieved file from S3 bucket.", data   });

    }catch(error){
        console.error(error);
        response.body = JSON.stringify({ 'message': 'Failed to  retrieve file.', 'errorMessage': error });
        response.statusCode = 500;
    }

    return response;
};