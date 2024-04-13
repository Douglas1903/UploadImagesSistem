import multer from "multer";
import { storage } from "./multerConfig";

const upload = multer({ storage: storage });

export const uploadFileMiddleware = upload.single('file');