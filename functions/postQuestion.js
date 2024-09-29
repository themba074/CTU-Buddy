const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    try {
        const { name, question } = JSON.parse(event.body);

        const questionsFile = path.join(__dirname, 'questions.json');
        let questions = [];

        if (fs.existsSync(questionsFile)) {
            questions = JSON.parse(fs.readFileSync(questionsFile));
        }

        questions.push({ name, question });
        fs.writeFileSync(questionsFile, JSON.stringify(questions));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Question posted successfully!' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to post question' })
        };
    }
};
