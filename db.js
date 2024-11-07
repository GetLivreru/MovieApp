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
        ru: { type: String, required: true },
        kz: { type: String, required: true },
    },
    descriptions: {
        en: { type: String, required: true },
        ru: { type: String, required: true },
        kz: { type: String, required: true },
    },
    pictures: [{ type: String, required: true }],
    creationDate: { type: Date, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    budget: { type: Number, required: true },
    timestamps: {
        created_at: { type: Date, required: true, default: Date.now },
        updated_at: { type: Date, required: true, default: Date.now },
        deleted_at: { type: Date, default: null },
    },
    quizLink: String
});
const ItemModel = mongoose.model('Item', ItemSchema);

const QuizQuestionSchema = new Schema({
    movie: String,
    question: String,
    answers: [String],
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

// Экспорт всех моделей
module.exports = {
    UserModel,
    LogsModel,
    ItemModel,
    QuizQuestionModel,
    UserLearningPlanModel
};
