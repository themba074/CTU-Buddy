const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    try {
        const { email } = JSON.parse(event.body);
        const subscribersFile = path.join(__dirname, 'subscribers.json');
        let subscribers = [];

        if (fs.existsSync(subscribersFile)) {
            subscribers = JSON.parse(fs.readFileSync(subscribersFile));
        }

        subscribers.push({ email });
        fs.writeFileSync(subscribersFile, JSON.stringify(subscribers));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Subscribed successfully!' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to subscribe' })
        };
    }
};
