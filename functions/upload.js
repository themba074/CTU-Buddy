const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    try {
        const fileName = event.headers['content-type'].split('=')[1];  // Extract file name
        const fileData = event.body;  // Extract file data

        // Ensure uploads directory exists
        const uploadsDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        // Save file to uploads folder
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, Buffer.from(fileData, 'binary'));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded successfully!' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to upload file' })
        };
    }
};
