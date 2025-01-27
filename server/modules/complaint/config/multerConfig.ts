import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Saving file to uploads directory...");
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        console.log("Filename is being generated...");
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "application/pdf") {
        cb(null, true); 
    } else {
        console.error("Invalid file type. Only JPEG, PNG, and PDF files are allowed.");
        cb(null, false); 
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, 
});

export default upload;
