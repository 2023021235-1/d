const connection = require('../config/db');
const fs = require('fs');
const path = require('path');

// Initialize marquee data
let header_marquee_data = null;

// Fetch marquee data on startup
function initializeMarqueeData() {
  const query = 'SELECT * FROM railway.news_events_marquee ORDER BY ID DESC;';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching marquee details:', error);
    } else {
      header_marquee_data = results;
    }
  });
}

// Call initialization
initializeMarqueeData();

module.exports = {
  // Get marquee data for homepage
  getMarqueeData: (req, res) => {
    res.json({ header_marquee_data });
  },

  // Get all news (public)
  getAllNews: (req, res) => {
    connection.query(
      'SELECT * FROM railway.news_events_marquee WHERE Type="News" ORDER BY ID DESC',
      (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ 
          send: data,
          header_marquee_data 
        });
      }
    );
  },

  // Get all events (public)
  getAllEvents: (req, res) => {
    connection.query(
      'SELECT * FROM railway.news_events_marquee WHERE Type="Events" ORDER BY ID DESC',
      (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ 
          send: data,
          header_marquee_data 
        });
      }
    );
  },

  // Get news for admin view
  getNewsForAdmin: (req, res) => {
    connection.query(
      'SELECT * FROM railway.news_events_marquee ORDER BY Type, ID DESC',
      (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({
          send: data,
          headerMarquee: header_marquee_data || null
        });
      }
    );
  },

  // Upload news (admin only)
  uploadNews: (req, res) => {
    try {
      const { type, title } = req.body;
      const fname = req.file ? req.file.filename : '';

      connection.query(
        'INSERT INTO railway.news_events_marquee (Title, Type, Link) VALUES (?, ?, ?)',
        [title, type, fname],
        (err) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
          }
          
          // Refresh marquee data after update
          initializeMarqueeData();
          
          res.status(200).json({
            message: "File uploaded successfully"
          });
        }
      );
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  },

  // Delete news (admin only)
  deleteNews: (req, res) => {
    const Id = req.params.id;
    const file = req.params.file;

    connection.query(
      'DELETE FROM railway.news_events_marquee WHERE Id = ?',
      [Id],
      (err) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }

        // Clean up file if exists
        if (file) {
          const deleteFile = path.join(__dirname, '../public/docs/', file);
          if (fs.existsSync(deleteFile)) {
            fs.unlink(deleteFile, err => {
              if (err) console.error('File deletion error:', err);
            });
          }
        }

        // Refresh marquee data after deletion
        initializeMarqueeData();

        res.status(200).json({ message: "Deleted successfully" });
      }
    );
  },

  // Get upload news page (admin only)
  getUploadNewsPage: (req, res) => {
    res.status(200).json({ 
      header_marquee_data 
    });
  }
};