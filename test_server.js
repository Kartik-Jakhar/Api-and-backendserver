const express = require('express');
const app = express();

// Sample data for testing
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
];

// Root route
app.get('/', (req,res) => {
    res.send('Hello, Express!');
});

// Route to get list of users
app.get('/users', (req, res) => {
    res.json(users);
});

// Route to add a new user
app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = {
        id: users.length + 1,
        name: name,
    };
    users.push(newUser);

    res.status(201).json(newUser);
});

// middleware
app.use(express.json());

const port = 3000
app.listen(port, () =>{console.log(`Server is currently running on http://localhost:${port}`);});

//const openai = require('openai');
//openai.api_key = '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';

//const prompt = "Once upon a time...";

//openai.Completions.create(
//    {
//        engine: 'davinci',
//        prompt: prompt,
//        max_tokens: 100,
//    },
//    (error, response) => {
//        if (error) {
//            console.error('Error:', error);
//        } else {
//            const generated_text = response.choices[0].text;
//            console.log('Generated Text:');
//            console.log(generated_text);
//        }
//    }
//);

const axios = require('axios');

const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

async function generateText(prompt) {
    try {
        const response = await axios.post(
            apiUrl,
            {
                prompt: prompt,
                max_tokens: 100,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        return response.data.choices[0].text;
    } catch (error) {
        console.error('Error calling OpenAI API:', error.message);
        throw error;
    }
}

async function main() {
    try {
        const prompt = "Once upon a time...";
        const generatedText = await generateText(prompt);
        console.log('Generated Text:');
        console.log(generatedText);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();