import express from "express";
import cors from "cors";
import multer from "multer";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
app.use(express.json());

// ✅ Enable CORS so React can call it
app.use(
  cors({
    origin: "https://demand-flux-ai-by-mactans.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Import routes
import predictRoute from "./routes/predictRoute.js";
app.use("/api", upload.single("file"), predictRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
