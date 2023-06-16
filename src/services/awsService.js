const AWS = require('aws-sdk');

const s3Bucket_name = process.env.S3_BUCKET_NAME;
const s3Bucket_region = process.env.S3_REGION;
const access_id = process.env.ACCESS_KEY_ID;
const access_secret_key = process.env.SECRET_ACCESS_KEY;

const cloudfrontDistribution = process.env.CLOUDFRONT_DISTRIBUTION;
const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY
const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID

module.exports.serviceGenerateSignedUrl = (fileList) => {
  console.log("Reached the service", privateKey, keyPairId)
  const cloudFront = new AWS.CloudFront.Signer(keyPairId ,privateKey );
  const signedUrl = fileList.map((key) => {

    const paramsUrl = {
      url: `${cloudfrontDistribution}/${key}`,
      expires: Math.floor(Date.now() / 1000) + 300,
    };

    return new Promise((resolve, reject) => {
      cloudFront.getSignedUrl(paramsUrl, (error, url) => {
        if (error) {
          console.log(error)
          reject(error);
        } else {
          console.log(url)
          resolve(url);
        }
      })
    });


  })
  console.log(signedUrl)
  return Promise.all(signedUrl) 
}

module.exports.getFileList = () => {
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: access_id,
      secretAccessKey: access_secret_key,

    },
    region: s3Bucket_region
  });

  const params = {
    Bucket: s3Bucket_name,
  };

  return new Promise((resolve, reject) => {
    s3.listObjects(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        const fileList = data?.Contents?.map((file) => {
          return file.Key
        });
        console.log(fileList)
        resolve(fileList);
      }
    });
  });
}