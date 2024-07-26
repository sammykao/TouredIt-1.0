require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
exports.uploadFile = (file) {
  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: file.originalname,
  };

  return s3.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;

// gets the URL of an S3 object
function getFileUrl(fileKey) {
  return `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
}
exports.getFileUrl = getFileUrl;
