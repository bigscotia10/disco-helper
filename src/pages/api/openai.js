import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const prompt = req.body.prompt;

            // console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

            const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
                prompt,
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.8,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            });

            const aiResponse = response.data.choices[0].text.trim();
            res.status(200).json({ valueHighlight: aiResponse, followUpQuestions: [] });
        } catch (error) {
            console.error('Error fetching data from OpenAI API:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
