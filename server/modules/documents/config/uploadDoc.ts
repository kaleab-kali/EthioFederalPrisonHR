import path from 'path';
import fileUpload from 'express-fileupload';
import fs from 'fs';

// Function to handle file upload
const uploadDocFile = (
  documentFile: fileUpload.UploadedFile,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadPath = path.join(
      __dirname,
      '../../../uploads',
      documentFile.name,
    );

    // Move the file to the uploads folder
    documentFile.mv(uploadPath, (err) => {
      if (err) {
        return reject('Error saving file');
      }
      resolve(`/uploads/${documentFile.name}`);
    });
  });
};

export { uploadDocFile };
