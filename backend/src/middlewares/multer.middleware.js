import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = new URL(".", import.meta.url).pathname;

// Ensure the public/temp directory exists
const tempDirectory = path.join(__dirname, '../public', 'temp');
if (!fs.existsSync(tempDirectory)) {
  fs.mkdirSync(tempDirectory, { recursive: true }); // Create the directory if it doesn't exist
}

const storage = multer.diskStorage({
  // cb is basicall next function or callback
  destination: function (req, file, cb) {
    cb(null, tempDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
