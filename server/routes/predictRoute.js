import express from "express";
import { spawn } from "child_process";
import fs from "fs";

const router = express.Router();

router.post("/predict", (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;

  const python = spawn("python", ["./ml/ml_model.py", filePath]);

  let output = "";
  let error = "";

  python.stdout.on("data", (data) => (output += data.toString()));
  python.stderr.on("data", (data) => (error += data.toString()));

  python.on("close", (code) => {
    try {
      if (code !== 0) throw new Error(error || "Python script failed");

      const parsed = JSON.parse(output);
      res.json(parsed);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Failed to parse model output" });
    } finally {
      try {
        fs.unlinkSync(filePath);
        console.log("🗑️ File deleted after processing completed");
      } catch (e) {
        console.log("⚠️ Could not delete file:", e.message);
      }
    }
  });
});

export default router;
