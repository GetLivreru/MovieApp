const UserLearningPlanModel = require('../db.js').UserLearningPlanModel;
const openai = require('openai');

exports.getOrCreateLearningPlan = async (req, res) => {
    const userId = req.session.userId;
    const scoreParam = req.query.results;
    let score;

    // Устанавливаем `score` либо из параметра, либо из последнего существующего плана
    if (scoreParam) {
        score = parseInt(scoreParam);
        if (isNaN(score)) {
            console.error("Score (results) parameter is invalid.");
            return res.status(400).send("Score must be a valid number.");
        }
    } else {
        // Если `results` не указан, ищем последний план обучения пользователя
        const lastPlan = await UserLearningPlanModel.findOne({ user: userId }).sort({ score: -1 });
        if (lastPlan) {
            score = lastPlan.score;
        } else {
            // Значение по умолчанию для нового пользователя без плана
            score = 0;
        }
    }

    try {
        console.log("Searching for learning plan with user ID:", userId, "and score:", score);

        // Ищем план обучения по `score`
        let learningPlan = await UserLearningPlanModel.findOne({ user: userId, score: score });

        if (!learningPlan) {
            console.log("Creating new learning plan for user:", userId);

            // Создаем новый план обучения
            learningPlan = await UserLearningPlanModel.create({
                user: userId,
                score: score,
                steps: [
                    {
                        topic: "Review Basics",
                        description: "Revise fundamental concepts to strengthen your knowledge.",
                        recommendedTime: "2 hours",
                        advice: "Take a short quiz after reviewing this topic."
                    },
                    {
                        topic: "Problem Solving",
                        description: "Practice solving problems related to the material covered.",
                        recommendedTime: "1 hour",
                        advice: "Complete exercises and solve sample problems."
                    }
                ]
            });
        }

        res.render('pages/my-learn', { learningPlan: learningPlan.steps });

    } catch (error) {
        console.error("Error fetching or creating learning plan:", error);
        res.status(500).send("An error occurred while retrieving the learning plan.");
    }
};

