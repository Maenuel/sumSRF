import express from 'express';
import ollama from 'ollama';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/sum', async (req, res) => {
    try {
        const jsonData = req.body.articleText;
        const response = await OllamaPrompt(jsonData);
        res.json({ message: response });
    } catch (error) {
        console.error(error);
        res.status(400).send('Invalid JSON');
    }
});

async function OllamaPrompt(articleText) {
    try {
        const response = await ollama.chat({
            model: 'llama3.2',
            messages: [
                { role: 'system', content: 'Sie sind ein nützlicher Helfer. Sie können kurz erklären, worum es in einem Artikel auf einer Nachrichtenwebsite geht. Schreibe nicht mehr als 3 oder 4 Sätze. Antworte auf Deutsch' },
                { role: 'user', content: articleText }
            ],
        });
        return response.message.content;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}