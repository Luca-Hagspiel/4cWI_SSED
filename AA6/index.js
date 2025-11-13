const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // folder to save uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Make uploads folder accessible
app.use('/uploads', express.static('uploads'));

// Serve a simple HTML form
app.get('/', (req, res) => {
    res.send(`
    <h2>File Upload Example</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="myfile" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// Handle file uploads
app.post('/upload', upload.single('myfile'), (req, res) => {
    if (!req.file) {
        return res.send('No file uploaded.');
    }
    res.send(`File uploaded successfully: <a href="/uploads/${req.file.filename}">${req.file.filename}</a>`);
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
