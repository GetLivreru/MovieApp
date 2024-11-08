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
                        topic: "Variables and Data Types",
                        description: "Review the core data types and how to declare variables in C++.",
                        recommendedTime: "1.5 hours",
                        advice: "Focus on understanding the differences between types (int, float, char, etc.) and the memory implications of each type. Practice by declaring variables of each type."
                    },
                    {
                        topic: "Control Structures",
                        description: "Strengthen knowledge on conditional statements and loops.",
                        recommendedTime: "2 hours",
                        advice: "Revise `if`, `else if`, `else` statements, as well as `for`, `while`, and `do-while` loops. Implement exercises that require you to use each of these structures."
                    },
                    {
                        topic: "Functions and Scope",
                        description: "Understand how to create functions, pass parameters, and the concept of scope.",
                        recommendedTime: "1.5 hours",
                        advice: "Review function declaration, parameter passing, and return values. Make sure you understand local vs global scope. Try writing functions that manipulate variables within different scopes."
                    },
                    {
                        topic: "Arrays and Pointers",
                        description: "Practice working with arrays and understand the basics of pointers.",
                        recommendedTime: "2 hours",
                        advice: "Focus on array declaration, accessing elements, and pointer arithmetic. Start with simple array manipulation tasks and pointer exercises to get comfortable with memory addresses."
                    },
                    {
                        topic: "Error Handling and Debugging",
                        description: "Learn basic debugging techniques and handle common errors.",
                        recommendedTime: "1 hour",
                        advice: "Identify common syntax and logic errors in C++ and practice using debugging tools. Go through examples with typical mistakes and try to fix them step-by-step."
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

