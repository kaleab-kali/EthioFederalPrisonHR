import path from 'path';
import fileUpload from 'express-fileupload';
import fs from 'fs';

// Function to handle file uploads
const handleFileUpload = (
  files: fileUpload.FileArray | undefined,
  folder: string,
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!files) {
      return resolve([]);
    }

    const uploadPaths: string[] = [];
    const uploadFolder = path.join(__dirname, '../uploads/', folder);

    // Ensure upload directory exists
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    const fileEntries = Object.values(files);

    fileEntries.forEach((file) => {
      const uploadedFile = file as fileUpload.UploadedFile;
      const filePath = path.join(uploadFolder, uploadedFile.name);

      uploadedFile.mv(filePath, (err) => {
        if (err) {
          return reject(err);
        }
        uploadPaths.push(`/uploads/${folder}/${uploadedFile.name}`);
        if (uploadPaths.length === fileEntries.length) {
          resolve(uploadPaths);
        }
      });
    });
  });
};

export { handleFileUpload };
