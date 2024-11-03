require('dotenv').config();
const OpenAI = require('openai'); // Импортируем OpenAI

// Создание экземпляра OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Используйте переменную окружения для безопасности
});

exports.getMyLearn = async (req, res) => {
    try {
        const quizResults = req.query.results; 
        if (!quizResults) {
            return res.status(400).send('Quiz results are required');
        }

        // Используем chat.completions.create для взаимодействия с моделью
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // или используйте другую подходящую модель
            messages: [
                {
                    role: "user",
                    content: `Based on the following quiz results, provide feedback on what to learn and where to learn it: ${quizResults}`
                }
            ],
            max_tokens: 150,
        });

        if (!response.choices || response.choices.length === 0) {
            throw new Error("No response choices from OpenAI API");
        }

        const feedback = response.choices[0].message.content.trim();
        res.render('my-learn', { feedback });
    } catch (error) {
        console.error("Error generating feedback:", error);
        res.status(500).send('Error generating feedback');
    }
};
