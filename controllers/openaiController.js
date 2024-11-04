const OpenAI = require('openai'); // Импортируйте OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Инициализация клиента

exports.getMyLearn = async (req, res) => {
    try {
        const quizResults = req.query.results;
        if (!quizResults || quizResults.trim().length === 0) {
            console.log("Quiz results are missing");
            return res.status(400).send('Quiz results are required');
        }
        console.log("Quiz results received:", quizResults);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Based on the quiz score of ${quizResults}, provide feedback on what topics to focus on to improve.`
                }
            ],
            max_tokens: 2000,
            temperature: 0.7,
            top_p: 1,
        });

        if (!response.choices || response.choices.length === 0) {
            throw new Error("No response choices from OpenAI API");
        }

        const feedback = response.choices[0].message.content.trim();
        res.render('pages/my-learn', { feedback });
    } catch (error) {
        console.error("Error generating feedback:", error);
        res.status(500).send('Error generating feedback');
    }
};
