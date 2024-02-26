const mongoose = require('mongoose');

 
mongoose.connect('mongodb+srv://Lida:oayjqe2005@cluster0.ejidejg.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('Connected!'));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const User = new Schema({
    username: String,
    password: String,
    email: String,
    created_at: Date,
    updated_at: Date,
    is_admin: Boolean
});

const UserModel = mongoose.model('User', User);

 
const Logs = new Schema({
    user: ObjectId,
    request_type: String,
    request_data: String,
    status_code: String,
    timestamp: Date,
    response_data: String
});

const LogsModel = mongoose.model('Logs', Logs);

 
const Item = new Schema({
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
        created_at: { type: Date, required: true, default: Date.now},
        updated_at: { type: Date, required: true, default: Date.now},
        deleted_at: { type: Date, required: false, default: null},
    }
});

const ItemModel = mongoose.model('Item', Item);

const QuizQuestion = new Schema({
    question: String,
    answers: [String],
    correctAnswer: Number
});

const QuizQuestionModel = mongoose.model('QuizQuestion', QuizQuestion);

const questions = [
    {
        question: "Каким образом семья Ким проникает в дом семьи Пак?",
        answers: ["Они грабят дом семьи Пак, пока те находятся в отпуске", "Они шантажируют главу семьи Пак, чтобы он дал им работу", " Они устраиваются на работу к богатой семье, используя фальшивые рекомендации", "Они выдают себя за родственников семьи Пак"],
        correctAnswer: 2
    },
    {
        question: "Что происходит в кульминационный момент фильма?",
        answers: ["Семья Пак узнает, что семья Ким обманывает их", " Сын семьи Ким влюбляется в дочь семьи Пак", "Семья Ким попадает в ловушку, устроенную семьей Пак", "Семья Ким решает покинуть дом семьи Пак"],
        correctAnswer: 0
    },
    {
        question: "Как заканчивается фильм?",
        answers: ["Семья Ким и семья Пак становятся друзьями", "Семья Ким погибает", "Семья Ким бежит из страны", "Семья Ким остается жить в доме семьи Пак"],
        correctAnswer: 2
    },
    {
        question: "Какую социальную проблему поднимает фильм Паразиты ?",
        answers: ["Проблему безработицы", "Проблему классового неравенства", "Проблему коррупции", "Проблему преступности"],
        correctAnswer: 1
    },
    {
        question: "Как называется камень, который играет важную роль в фильме?",
        answers: ["Аметист", "Изумруд", "Алмаз", "Оникс"],
        correctAnswer: 3
    },
    {
        question: "В каком жанре снят фильм Паразиты ?",
        answers: ["Комедия", "Триллер", "Драма", "Черная Комедия"],
        correctAnswer: 3
    },
];

questions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel(questionData);
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});


module.exports = {
    UserModel,
    LogsModel,
    ItemModel,
    QuizQuestionModel
};