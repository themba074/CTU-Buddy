const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    try {
        const questionsFile = path.join(__dirname, 'questions.json');

        if (fs.existsSync(questionsFile)) {
            const questions = JSON.parse(fs.readFileSync(questionsFile));
            return {
                statusCode: 200,
                body: JSON.stringify(questions)
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify([])
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve questions' })
        };
    }
};
