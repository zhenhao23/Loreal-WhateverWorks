const express = require("express");
const { spawn } = require("child_process");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Keep original filename with timestamp to avoid conflicts
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}_${timestamp}${ext}`);
  },
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".csv", ".xlsx", ".xls", ".json"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV, Excel, and JSON files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// In-memory store for uploaded files (resets on server restart)
let uploadedFiles = [];

// Upload endpoint
router.post("/upload", upload.array("file", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const fileInfos = req.files.map((file) => ({
      id: Date.now() + Math.random(), // Simple unique ID
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      uploadDate: new Date().toISOString(),
      path: file.path,
    }));

    // Add to in-memory store
    uploadedFiles.push(...fileInfos);

    res.json({
      message: "Files uploaded successfully",
      files: fileInfos.map((f) => ({
        id: f.id,
        originalName: f.originalName,
        filename: f.filename,
        size: f.size,
        uploadDate: f.uploadDate,
      })),
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload files" });
  }
});

// Get list of uploaded files
router.get("/files", (req, res) => {
  res.json({
    files: uploadedFiles.map((f) => ({
      id: f.id,
      originalName: f.originalName,
      filename: f.filename,
      size: f.size,
      uploadDate: f.uploadDate,
    })),
  });
});

// Delete uploaded file
router.delete("/files/:id", (req, res) => {
  const fileId = parseFloat(req.params.id);
  const fileIndex = uploadedFiles.findIndex((f) => f.id === fileId);

  if (fileIndex === -1) {
    return res.status(404).json({ error: "File not found" });
  }

  const file = uploadedFiles[fileIndex];

  // Delete file from filesystem
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  });

  // Remove from in-memory store
  uploadedFiles.splice(fileIndex, 1);

  res.json({ message: "File deleted successfully" });
});

router.get("/run-script", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const process = spawn("py", ["../python/clean_data.py"]);

  process.stdout.on("data", (data) => {
    res.write(`data: ${data.toString().trim()}\n\n`);
  });

  process.stderr.on("data", (data) => {
    res.write(`data: ERROR: ${data.toString().trim()}\n\n`);
  });

  process.on("close", (code) => {
    res.write(`data: SCRIPT FINISHED with code ${code}\n\n`);
    res.end();
  });
});

module.exports = router;
