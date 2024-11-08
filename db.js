const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Lida:oayjqe2005@cluster0.ejidejg.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected!'))
    .catch(err => console.error("Database connection error:", err));

const Schema = mongoose.Schema;

// Определение схем и моделей
const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    created_at: Date,
    updated_at: Date,
    is_admin: Boolean
});
const UserModel = mongoose.model('User', UserSchema);

const LogsSchema = new Schema({
    user: Schema.Types.ObjectId,
    request_type: String,
    request_data: String,
    status_code: String,
    timestamp: Date,
    response_data: String
});
const LogsModel = mongoose.model('Logs', LogsSchema);

const ItemSchema = new Schema({
    names: {
        en: { type: String, required: true },
    },
    descriptions: {
        en: { type: String, required: true },
    },
    pictures: [{ type: String, required: true }],
    timestamps: {
        created_at: { type: Date, required: true, default: Date.now },
        updated_at: { type: Date, required: true, default: Date.now },
        deleted_at: { type: Date, default: null },
    },
    quizLink: String
});
const ItemModel = mongoose.model('Item', ItemSchema);

const QuizQuestionSchema = new Schema({
    topic: String,
    question: String,
    options: [String],
    correctAnswer: Number
});
const QuizQuestionModel = mongoose.model('QuizQuestion', QuizQuestionSchema);

const LearningStepSchema = new Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
    recommendedTime: { type: String, required: true },
    advice: { type: String, required: true }
});

const UserLearningPlanSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    steps: [LearningStepSchema]
});
const UserLearningPlanModel = mongoose.model('UserLearningPlan', UserLearningPlanSchema);

const cppQuestions = [
    {
        question: "What is the purpose of the 'int main()' function in a C++ program?",
        options: [
            "To declare global variables",
            "To handle user input",
            "To serve as the entry point of the program",
            "To define the standard output stream"
        ],
        correctAnswer: 2
    },
    {
        question: "Which operator is used to access members of a class through a pointer?",
        options: [
            "->",
            ".",
            "&",
            "::"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the result of the expression '5 / 2' in C++?",
        options: [
            "2",
            "2.5",
            "3",
            "2.0"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a valid C++ data type?",
        options: [
            "integer",
            "float",
            "text",
            "char*"
        ],
        correctAnswer: 1
    },
    {
        question: "How can we prevent a function from modifying an argument passed to it?",
        options: [
            "By passing it by value",
            "By using the const keyword",
            "By using the static keyword",
            "By using a void pointer"
        ],
        correctAnswer: 1
    }
];

const flQuestions = [
    {
        question: "Which language paradigm focuses on function composition?",
        options: [
            "Procedural",
            "Object-Oriented",
            "Functional",
            "Imperative"
        ],
        correctAnswer: 2
    },
    {
        question: "In functional programming, which term describes functions with no side effects?",
        options: [
            "Pure functions",
            "Impure functions",
            "Mutable functions",
            "Immutable functions"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the primary purpose of a lambda function?",
        options: [
            "To create a short function without a name",
            "To define a recursive function",
            "To initialize variables",
            "To manage memory"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of these is a core principle in functional programming?",
        options: [
            "Inheritance",
            "Polymorphism",
            "Immutability",
            "Encapsulation"
        ],
        correctAnswer: 2
    },
    {
        question: "Which function allows combining multiple functions in functional programming?",
        options: [
            "Compose",
            "Map",
            "Filter",
            "Reduce"
        ],
        correctAnswer: 0
    }
];

const ictQuestions = [
    {
        question: "What does ICT stand for?",
        options: [
            "Internet Communication Technology",
            "Information and Communication Technology",
            "Information Computation Technology",
            "Integrated Circuit Technology"
        ],
        correctAnswer: 1
    },
    {
        question: "Which device is considered an input device?",
        options: [
            "Monitor",
            "Printer",
            "Keyboard",
            "Projector"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the main function of a firewall?",
        options: [
            "To store data",
            "To enhance network speed",
            "To block unauthorized access",
            "To manage network resources"
        ],
        correctAnswer: 2
    },
    {
        question: "What does HTTP stand for?",
        options: [
            "HyperText Transfer Protocol",
            "HyperText Transmission Process",
            "High Transfer Technology Process",
            "Host Text Transfer Protocol"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of the following is an example of cloud storage?",
        options: [
            "Dropbox",
            "USB flash drive",
            "Local hard drive",
            "RAM"
        ],
        correctAnswer: 0
    }
];



cppQuestions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, topic: 'Introduction to C++' });
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});
flQuestions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, topic: 'Foreign Language' });
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});
ictQuestions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, topic: 'ICT' });
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});

// Экспорт всех моделей
module.exports = {
    UserModel,
    LogsModel,
    ItemModel,
    QuizQuestionModel,
    UserLearningPlanModel,
    cppQuestions,
    flQuestions,
    ictQuestions
};
