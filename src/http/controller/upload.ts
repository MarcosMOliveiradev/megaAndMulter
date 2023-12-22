import crypto from "node:crypto"
import multer from "multer";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storageTypes = {
  local: multer.diskStorage({
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err);

          const fileName = `${hash.toString('hex')}-${file.originalname}`;
          cb(null, fileName);
      })
  },
    destination: async (req, file, cb) => {
          const storage = resolve(__dirname, "..", "..", "temp", "uploads",)
          cb(null, resolve(storage));
        }
    })
}

const upload = {
    dest: resolve(__dirname, "..", "..", "temp", "uploads",),
    storage: storageTypes['local'],
    limits: { fileSize: 2 * 1024 * 1024 * 100 },
    fileFilter: (req: any, file: any, cb: any) => {
      const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
        "video/mp4",
      ];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type."));
      }
    },
};

export default upload
