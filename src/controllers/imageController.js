const { getFileList, serviceGenerateSignedUrl } = require("../services/awsService");


const imageController = {};

imageController.generateSignedUrl = async (req, res, next) => {
  try {
    const fileList = await getFileList();
    const signedUrl = await serviceGenerateSignedUrl(fileList)
    console.log('Signed URL:', signedUrl);
    res.send('Signed URL generated. Check the console for the URL.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while generating the signed URL.');
  }
};

// imageController.listFiles = async (req, res, next) => {
//     try {
//       const fileList = await getFileList();
//       console.log('File List:', fileList);
//       res.send(fileList);
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).send('An error occurred while retrieving the file list.');
//     }
//   };



module.exports = imageController;