// api/getVideoUrl.js
const { exec } = require('child_process');

export default function handler(req, res) {
    const videoUrl = req.query.url; // Get the video URL from query parameters

    // Use yt-dlp to fetch the media URL
    exec(`yt-dlp -f best --get-url ${videoUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to fetch media URL' });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error fetching media URL' });
        }
        // Return the media URL
        res.status(200).json({ mediaUrl: stdout.trim() }); // Trim to remove extra whitespace
    });
}
